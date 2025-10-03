
"use client";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useAppSelector, useAppDispatch } from "@/state/redux";
import { useGetPropertiesQuery } from "@/state/api";
import { Property } from "@/types/prismaTypes";
import { setFilters } from "@/state";
import { Search, X } from "lucide-react";

// Types
interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
interface PropertyMarker {
  id: number;
  marker: maplibregl.Marker;
  popup?: maplibregl.Popup;
  property: Property;
}
interface MapState {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  lastCenter: [number, number] | null;
  lastZoom: number | null;
  currentBounds: MapBounds | null;
  isBoundsFilterActive: boolean;
  styleLoaded: boolean;
}

// Constants
const DEFAULT_CENTER: [number, number] = [90.399452, 23.777176]; // Dhaka
const DEFAULT_ZOOM = 8;
const SEARCH_ZOOM = 12;
const MAP_LOAD_TIMEOUT = 10000; // 10s max wait

const MAPTILER_STYLE = `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`;

const Map = () => {
  // Refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<PropertyMarker[]>([]);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const boundsUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const markerUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Robust init control to prevent infinite loading and race conditions
  const isMountedRef = useRef(true); // avoid setState after unmount
  const initAttemptIdRef = useRef(0); // current init attempt id
  const initResolvedRef = useRef(false); // has this attempt resolved (success/error/timeout)
  const initTimeoutRef = useRef<NodeJS.Timeout | null>(null); // map load timeout handle
  const containerWaitTriesRef = useRef(0); // retry a few frames until ref attaches

  // State
  const [mapState, setMapState] = useState<MapState>({
    isInitialized: false,
    isLoading: true,
    error: null,
    lastCenter: null,
    lastZoom: null,
    currentBounds: null,
    isBoundsFilterActive: false,
    styleLoaded: false,
  });

  // Redux
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.global.filters);
  const isFiltersFullOpen = useAppSelector((state) => state.global.isFiltersFullOpen);
  const { data: properties, isLoading, isError } = useGetPropertiesQuery(filters);

  // Valid properties only
  const validProperties = useMemo(() => {
    if (!properties) {
      console.log('🔍 No properties data available');
      return [];
    }
    
    console.log(`🔍 Total properties received: ${properties.length}`);
    
    const valid = properties.filter((property) => {
      const coords = property.location?.coordinates;
      if (!coords) {
        console.log(`❌ Property ${property.id} has no coordinates object`);
        return false;
      }
      
      if (!coords.latitude || !coords.longitude) {
        console.log(`❌ Property ${property.id} missing lat/lng:`, coords);
        return false;
      }
      
      const lat = Number(coords.latitude);
      const lng = Number(coords.longitude);
      
      if (isNaN(lat) || isNaN(lng)) {
        console.log(`❌ Property ${property.id} has NaN coordinates:`, { lat, lng });
        return false;
      }
      
      if (lat === 0 && lng === 0) {
        console.log(`❌ Property ${property.id} has zero coordinates`);
        return false;
      }
      
      // Check for reasonable coordinate ranges (Bangladesh bounds approximately)
      const isInBangladesh = lat >= 20.0 && lat <= 27.0 && lng >= 88.0 && lng <= 93.0;
      if (!isInBangladesh) {
        console.log(`⚠️ Property ${property.id} coordinates outside Bangladesh:`, { lat, lng });
      }
      
      console.log(`✅ Property ${property.id} has valid coordinates:`, { lat, lng });
      return true;
    });
    
    console.log(`✅ Valid properties for map: ${valid.length}/${properties.length}`);
    return valid;
  }, [properties]);

  // Bounds detection
  const setupBoundsDetection = useCallback((map: maplibregl.Map) => {
    const updateBounds = () => {
      if (!map.isMoving()) {
        const bounds = map.getBounds();
        setMapState((prev) => ({
          ...prev,
          currentBounds: {
            north: bounds.getNorth(),
            south: bounds.getSouth(),
            east: bounds.getEast(),
            west: bounds.getWest(),
          },
        }));
      }
    };
    const debouncedUpdateBounds = () => {
      if (boundsUpdateTimeoutRef.current) {
        clearTimeout(boundsUpdateTimeoutRef.current);
      }
      boundsUpdateTimeoutRef.current = setTimeout(updateBounds, 500);
    };
    map.on("moveend", debouncedUpdateBounds);
    map.on("zoomend", debouncedUpdateBounds);
  }, []);

  // Finalize an init attempt exactly once (success/error/timeout)
  const finalizeInit = useCallback(
    (attemptId: number, payload: { success?: boolean; error?: string | null }) => {
      if (!isMountedRef.current) return;
      if (attemptId !== initAttemptIdRef.current) return; // stale event
      if (initResolvedRef.current) return; // already resolved
      initResolvedRef.current = true;

      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
        initTimeoutRef.current = null;
      }

      setMapState((prev) => ({
        ...prev,
        isInitialized: !!payload.success,
        isLoading: false,
        styleLoaded: !!payload.success,
        error: payload.error ?? null,
      }));
    },
    []
  );

  // Initialize map
  const initializeMap = useCallback(() => {
    // Start a new attempt
    initAttemptIdRef.current += 1;
    const attemptId = initAttemptIdRef.current;
    initResolvedRef.current = false;

    // Always enter loading state at the beginning of an attempt
    setMapState((prev) => ({ ...prev, isLoading: true, error: null }));

    // Early validation: API key
    if (!process.env.NEXT_PUBLIC_MAPTILER_KEY) {
      finalizeInit(attemptId, {
        error:
          "MapTiler API key is missing. Please set NEXT_PUBLIC_MAPTILER_KEY in your environment variables.",
      });
      return;
    }

    // Early validation: container exists (retry briefly instead of failing)
    if (!mapContainerRef.current) {
      if (containerWaitTriesRef.current < 5) {
        containerWaitTriesRef.current += 1;
        requestAnimationFrame(() => {
          if (attemptId === initAttemptIdRef.current && !initResolvedRef.current) {
            initializeMap();
          }
        });
        return;
      }
      finalizeInit(attemptId, { error: "Map container not available. Please try again." });
      return;
    }
    containerWaitTriesRef.current = 0;

    // Strict timeout for the attempt
    if (initTimeoutRef.current) clearTimeout(initTimeoutRef.current);
    initTimeoutRef.current = setTimeout(() => {
      console.warn("⏱ Map loading taking too long");
      finalizeInit(attemptId, {
        error: "Map is taking too long to load. Please check your internet connection.",
      });
    }, MAP_LOAD_TIMEOUT);

    // Construct map safely
    let map: maplibregl.Map | null = null;
    try {
      map = new maplibregl.Map({
        container: mapContainerRef.current!,
        style: MAPTILER_STYLE,
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      });
    } catch (e: any) {
      finalizeInit(attemptId, {
        error: `Failed to initialize map: ${e?.message || "Unknown error"}. Please try again.`,
      });
      return;
    }

    mapRef.current = map;

    // Persistent error listener: catch style/tile/network errors reliably
    const onError = (e: any) => {
      finalizeInit(attemptId, {
        error: `Failed to load map: ${e?.error?.message || e?.message || "Unknown error"}. Please try again.`,
      });
    };

    const onLoad = () => {
      // Success path
      finalizeInit(attemptId, { success: true, error: null });
      setupBoundsDetection(map!);
    };

    // Fallback: 'idle' indicates at least one render; helps if 'load' is missed
    const onIdle = () => {
      if (!initResolvedRef.current) {
        finalizeInit(attemptId, { success: true, error: null });
        setupBoundsDetection(map!);
      }
    };

    map.on("error", onError); // listen for any errors during/after style load
    map.once("load", onLoad);
    map.once("idle", onIdle);
  }, [finalizeInit, setupBoundsDetection]);


  const createMarkerElement = useCallback((property: Property): HTMLElement => {
    const el = document.createElement("div");
    el.className =
      "property-marker bg-white rounded-[8px]  shadow-lg border-2 border-teal-500 cursor-pointer hover:scale-110 transition-transform duration-200";
    el.style.width = "60px";
    el.style.height = "60px";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.overflow = "hidden"; // ensure image is clipped to circle

    const img = document.createElement("img");
    const src =
      (Array.isArray((property as any).images) && (property as any).images[0]) ||
      (property as any).imageUrl ||
      (property as any).image ||
      "/placeholder.jpg";
    img.src = src;
    img.alt = property.name || "Property";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.borderRadius = "6px";
    img.referrerPolicy = "no-referrer"; // safer for third-party images
    img.onerror = () => {
      img.src = "/placeholder.jpg";
    };

    el.appendChild(img);
    return el;
  }, []);

  const createPopup = useCallback((property: Property): maplibregl.Popup => {
    return new maplibregl.Popup({ offset: 25, closeButton: true, closeOnClick: false }).setHTML(`
      <div class="p-4 min-w-[250px]">
        <h3 class="text-lg font-bold text-gray-900 mb-1">${property.name || "Property"}</h3>
        <div class="text-2xl font-bold text-teal-600 mb-2">
          BDT ${property.pricePerMonth?.toLocaleString() || 0}/month
        </div>
        <p class="text-sm text-gray-600 mb-3">
          ${property.location?.address || "Address not available"}
        </p>
        <a href="/search/${property.id}" target="_blank"
           class="inline-flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700">
          View Details
        </a>
      </div>
    `);
  }, []);

  // Marker updates
  const updateMarkers = useCallback(() => {
    if (!mapRef.current || !mapState.isInitialized || !properties) return;

    markersRef.current.forEach(({ marker, popup }) => {
      marker.remove();
      if (popup) popup.remove();
    });

    const newMarkers: PropertyMarker[] = [];
    validProperties.forEach((property) => {
      const coords = property.location?.coordinates;
      if (!coords?.latitude || !coords?.longitude) return;
      const lat = Number(coords.latitude);
      const lng = Number(coords.longitude);
      if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) return;
      const el = createMarkerElement(property);
      const marker = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([lng, lat])
        .addTo(mapRef.current!);
      el.addEventListener("click", () => {
        marker.setPopup(createPopup(property));
      });
      newMarkers.push({ id: property.id, marker, property });
    });
    markersRef.current = newMarkers;
    console.log(`✅ Updated ${newMarkers.length} markers`);
  }, [
    mapState.isInitialized,
    properties,
    validProperties,
    createMarkerElement,
    createPopup,
  ]);

  // Center update with Dhaka fallback
  const updateMapCenter = useCallback(() => {
    if (!mapRef.current || !mapState.isInitialized) return;
    if (filters.coordinates && filters.coordinates[0] && filters.coordinates[1]) {
      const [lng, lat] = filters.coordinates;
      const newCenter: [number, number] = [lng, lat];
      const centerChanged =
        !mapState.lastCenter ||
        Math.abs(mapState.lastCenter[0] - lng) > 0.001 ||
        Math.abs(mapState.lastCenter[1] - lat) > 0.001;
      if (centerChanged) {
        console.log("🎯 Flying to:", newCenter);
        mapRef.current.flyTo({
          center: newCenter,
          zoom: SEARCH_ZOOM,
          speed: 1.2,
          curve: 1.42,
          easing: (t) => t * (2 - t),
        });
        setMapState((prev) => ({ ...prev, lastCenter: newCenter, lastZoom: SEARCH_ZOOM }));
      }
    } else {
      // ✅ Always fallback to Dhaka
      mapRef.current.setCenter(DEFAULT_CENTER);
      mapRef.current.setZoom(DEFAULT_ZOOM);
    }
  }, [filters.coordinates, mapState.isInitialized, mapState.lastCenter]);

  // Area filter handlers
  const handleSearchThisArea = useCallback(() => {
    if (!mapState.currentBounds) return;
    dispatch(setFilters({ ...filters, bounds: mapState.currentBounds }));
    setMapState((prev) => ({ ...prev, isBoundsFilterActive: true }));
  }, [mapState.currentBounds, filters, dispatch]);
  const handleClearBoundsFilter = useCallback(() => {
    dispatch(setFilters({ ...filters, bounds: null }));
    setMapState((prev) => ({ ...prev, isBoundsFilterActive: false }));
  }, [filters, dispatch]);

  // Effects
  useEffect(() => {
    // Ensure ref timing issues don't leave spinner stuck
    isMountedRef.current = true;

    // Defer a tick to ensure the ref is attached before init
    const raf = requestAnimationFrame(() => {
      initializeMap();
    });

    return () => {
      isMountedRef.current = false;

      // Invalidate current attempt so late events are ignored
      initAttemptIdRef.current += 1;
      initResolvedRef.current = true;

      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
        initTimeoutRef.current = null;
      }

      cancelAnimationFrame(raf);

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const boundsTimeout = boundsUpdateTimeoutRef.current;
      if (boundsTimeout) {
        clearTimeout(boundsTimeout);
        boundsUpdateTimeoutRef.current = null;
      }

      const markerTimeout = markerUpdateTimeoutRef.current;
      if (markerTimeout) {
        clearTimeout(markerTimeout);
        markerUpdateTimeoutRef.current = null;
      }

      const resizeTimeout = resizeTimeoutRef.current;
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
        resizeTimeoutRef.current = null;
      }
    };
  }, [initializeMap]);

  useEffect(() => {
    if (mapState.isInitialized && !isLoading && !isError) {
      updateMarkers();
    }
  }, [validProperties, mapState.isInitialized, isLoading, isError, updateMarkers]);

  useEffect(() => {
    if (mapState.isInitialized) updateMapCenter();
  }, [filters.coordinates, mapState.isInitialized, updateMapCenter]);

  useEffect(() => {
    setMapState((prev) => ({ ...prev, isBoundsFilterActive: filters.bounds !== null }));
  }, [filters.bounds]);

  useEffect(() => {
    if (mapRef.current && mapState.isInitialized) {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        mapRef.current?.resize();
      }, 300);
    }
  }, [isFiltersFullOpen, mapState.isInitialized]);

  // Retry handler
  const handleRetry = useCallback(() => {
    // Reset loading and error; start a new init attempt cleanly
    setMapState((prev) => ({ ...prev, isLoading: true, error: null }));

    // Invalidate and dispose current map before re-init to avoid event leakage
    initAttemptIdRef.current += 1;
    initResolvedRef.current = true;

    if (initTimeoutRef.current) {
      clearTimeout(initTimeoutRef.current);
      initTimeoutRef.current = null;
    }
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    setTimeout(() => initializeMap(), 100);
  }, [initializeMap]);

  // Render: always render map container; overlay loading/error UI
  return (
    <div className="relative rounded-xl h-full w-full min-h-0">
      <div
        className="map-container rounded-xl w-full h-full bg-gray-100"
        ref={mapContainerRef}
      />

      {mapState.currentBounds && !mapState.error && (
        <div className="absolute top-4 left-4">
          <button
            onClick={mapState.isBoundsFilterActive ? handleClearBoundsFilter : handleSearchThisArea}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all duration-200 ${
              mapState.isBoundsFilterActive
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {mapState.isBoundsFilterActive ? (
              <>
                <X className="w-4 h-4" />
                Clear Area Filter
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Search this area
              </>
            )}
          </button>
        </div>
      )}

      {validProperties.length > 0 && !mapState.error && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
          <p className="text-sm font-medium text-gray-700">
            {validProperties.length} propert{validProperties.length === 1 ? "y" : "ies"} found
          </p>
        </div>
      )}

      {isLoading && !mapState.error && (
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
            <span className="text-sm text-gray-700">Loading properties...</span>
          </div>
        </div>
      )}

      {mapState.isLoading && !mapState.error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {mapState.error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-xl">
          <div className="text-center text-red-600">
            <p className="mb-2">{mapState.error}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
