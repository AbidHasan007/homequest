"use client";
import {
  FiltersState,
  setFilters,
  setViewMode,
  toggleFiltersFullOpen,
} from "@/state";
import { useAppSelector } from "@/state/redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useCallback, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { cleanParams, cn, formatPriceValue } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List, Search, MapPin, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyTypeIcons } from "@/lib/constants";

// Types for better TypeScript support
interface LocationSearchResult {
  coordinates: [number, number];
  location: string;
  source: 'maptiler' | 'nominatim';
}

interface RangeFilter {
  min: number | null;
  max: number | null;
}

// Constants
const DEBOUNCE_DELAY = 300;
const LOCATION_SEARCH_TIMEOUT = 10000; // 10 seconds
const DEFAULT_RADIUS = 5; // 5km

// Price and square feet options
const PRICE_OPTIONS = {
  min: [1000, 1500, 2000, 3000, 5000, 10000, 15000],
  max: [7000, 9000, 11000, 13000, 16000, 20000, 25000],
};

const SQUARE_FEET_OPTIONS = {
  min: [500, 750, 1000, 1250, 1500, 2000],
  max: [1000, 1250, 1500, 2000, 2500, 3000],
};

const FiltersBar = () => {
  // Redux and routing
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  
  // Redux selectors
  const filters = useAppSelector((state) => state.global.filters);
  const isFiltersFullOpen = useAppSelector((state) => state.global.isFiltersFullOpen);
  const viewMode = useAppSelector((state) => state.global.viewMode);
  
  // Local state
  const [searchInput, setSearchInput] = useState(filters.location === "any" ? "" : filters.location);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // Refs for debouncing
  const updateURLRef = useRef<ReturnType<typeof debounce> | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize search input when filters change
  React.useEffect(() => {
    setSearchInput(filters.location === "any" ? "" : filters.location);
  }, [filters.location]);

  // Create debounced URL update function
  const createUpdateURL = useCallback(() => {
    if (updateURLRef.current) {
      updateURLRef.current.cancel();
    }
    
    updateURLRef.current = debounce((newFilters: FiltersState) => {
      const cleanFilters = cleanParams(newFilters);
      const updatedSearchParams = new URLSearchParams();

      console.log('🔄 Updating URL with filters:', newFilters);

      Object.entries(cleanFilters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            if (value.length > 0 && value.some(v => v !== null)) {
              updatedSearchParams.set(key, value.join(","));
            }
          } else {
            updatedSearchParams.set(key, value.toString());
          }
        }
      });

      const newURL = `${pathname}?${updatedSearchParams.toString()}`;
      console.log('📍 New URL:', newURL);
      router.push(newURL);
    }, DEBOUNCE_DELAY);
    
    return updateURLRef.current;
  }, [pathname, router]);

  // Validate range filters (min <= max)
  const validateRange = useCallback((range: RangeFilter, type: 'price' | 'squareFeet'): RangeFilter => {
    const { min, max } = range;
    
    if (min !== null && max !== null && min > max) {
      console.warn(`⚠️ Invalid ${type} range: min (${min}) > max (${max}). Swapping values.`);
      return { min: max, max: min };
    }
    
    return range;
  }, []);

  // Enhanced filter change handler with validation
  const handleFilterChange = useCallback((
    key: string,
    value: any,
    isMin: boolean | null = null
  ) => {
    let newValue = value;

    if (key === "priceRange" || key === "squareFeet") {
      const currentArrayRange = [...filters[key]] as [number | null, number | null];
      
      if (isMin !== null) {
        const index = isMin ? 0 : 1;
        currentArrayRange[index] = value === "any" ? null : Number(value);
      }
      
      // Validate range
      const validatedRange = validateRange(
        { min: currentArrayRange[0], max: currentArrayRange[1] },
        key as 'price' | 'squareFeet'
      );
      
      newValue = [validatedRange.min, validatedRange.max];
      
      console.log(`🔧 ${key} filter changed:`, { 
        key, 
        value, 
        isMin, 
        newValue, 
        currentFilters: filters 
      });
    } else if (key === "coordinates") {
      newValue = value === "any" ? [0, 0] : value.map(Number);
    } else if (key === "bounds") {
      // Handle bounds filter - this will be set by the map component
      newValue = value;
    } else {
      newValue = value === "any" ? "any" : value;
    }

    const newFilters = { ...filters, [key]: newValue };
    console.log('📤 Dispatching new filters:', newFilters);
    
    dispatch(setFilters(newFilters));
    
    // Update URL with debouncing
    const updateURL = createUpdateURL();
    updateURL(newFilters);
  }, [filters, dispatch, validateRange, createUpdateURL]);

  // Search location with MapTiler and Nominatim fallback
  const searchLocationWithFallback = useCallback(async (query: string): Promise<LocationSearchResult | null> => {
    const timeoutPromise = new Promise<never>((_, reject) => {
      searchTimeoutRef.current = setTimeout(() => reject(new Error('Search timeout')), LOCATION_SEARCH_TIMEOUT);
    });

    const searchPromise = async (): Promise<LocationSearchResult | null> => {
      // Try MapTiler first
      try {
        const response = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}&country=BD&type=place,address,locality&limit=5`
        );

        if (!response.ok) throw new Error('MapTiler request failed');

        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const bestMatch = data.features.find((feature: any) => 
            feature.properties.country === 'BD' || 
            feature.properties.country_code === 'BD'
          ) || data.features[0];

          const [lng, lat] = bestMatch.center;
          return {
            coordinates: [lng, lat],
            location: query,
            source: 'maptiler'
          };
        }
      } catch (error) {
        console.warn('⚠️ MapTiler search failed:', error);
      }

      // Fallback to Nominatim
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${new URLSearchParams({
            q: query,
            countrycodes: 'bd',
            format: 'json',
            limit: '1',
            addressdetails: '1'
          }).toString()}`,
          {
            headers: {
              'User-Agent': 'RealEstateApp (justsomedummyemail@gmail.com)'
            }
          }
        );

        if (!response.ok) throw new Error('Nominatim request failed');

        const data = await response.json();
        
        if (data && data.length > 0) {
          const [lng, lat] = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
          return {
            coordinates: [lng, lat],
            location: query,
            source: 'nominatim'
          };
        }
      } catch (error) {
        console.warn('⚠️ Nominatim search failed:', error);
      }

      return null;
    };

    try {
      const result = await Promise.race([searchPromise(), timeoutPromise]);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
      return result;
    } catch (error) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
      throw error;
    }
  }, []);

  // Enhanced location search with better error handling and fallback
  const handleLocationSearch = useCallback(async (): Promise<void> => {
    if (!searchInput.trim()) {
      setSearchError("Please enter a location to search");
      return;
    }
    
    setIsSearching(true);
    setSearchError(null);
    
    console.log('🔍 Starting location search for:', searchInput);
    
    try {
      const result = await searchLocationWithFallback(searchInput);
      
      if (result) {
        const newFilters: FiltersState = {
          ...filters,
          location: searchInput,
          coordinates: result.coordinates,
          radius: DEFAULT_RADIUS, // Set default radius when searching
          bounds: null, // Clear bounds filter when searching new location
        };
        
        console.log('✅ Setting new filters with coordinates:', newFilters);
        dispatch(setFilters(newFilters));
        
        const updateURL = createUpdateURL();
        updateURL(newFilters);
      } else {
        setSearchError("Location not found. Please try a different search term.");
      }
    } catch (error) {
      console.error("❌ Error searching location:", error);
      setSearchError("Failed to search location. Please try again.");
    } finally {
      setIsSearching(false);
    }
  }, [searchInput, filters, dispatch, createUpdateURL, searchLocationWithFallback]);

  // Handle Enter key press for location search
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLocationSearch();
    }
  }, [handleLocationSearch]);

  // Memoized price range options to prevent recreation
  const priceMinOptions = useMemo(() => PRICE_OPTIONS.min, []);
  const priceMaxOptions = useMemo(() => PRICE_OPTIONS.max, []);
  const squareFeetMinOptions = useMemo(() => SQUARE_FEET_OPTIONS.min, []);
  const squareFeetMaxOptions = useMemo(() => SQUARE_FEET_OPTIONS.max, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (updateURLRef.current) {
        updateURLRef.current.cancel();
      }
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex justify-between items-center w-full py-1 -mt-10">
      {/* Filters */}
      <div className="flex justify-between items-center gap-4 p-2">
        {/* All Filters Toggle */}
        <Button
          variant="outline"
          className={cn(
            "gap-2 rounded-xl border-teal-400 hover:bg-teal-600 hover:text-primary-100 transition-colors",
            isFiltersFullOpen && "bg-teal-700 text-primary-100"
          )}
          onClick={() => dispatch(toggleFiltersFullOpen())}
        >
          <Filter className="w-4 h-4" />
          <span>All Filters</span>
        </Button>

        {/* Location Search */}
        <div className="flex items-center">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search location"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-48 pl-10 pr-8 rounded-l-xl rounded-r-none border-teal-400 border-r-0 focus:ring-2 focus:ring-teal-500"
              disabled={isSearching}
            />
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput("");
                  const newFilters = {
                    ...filters,
                    location: "any",
                    coordinates: null,
                    bounds: null,
                  };
                  dispatch(setFilters(newFilters));
                  const updateURL = createUpdateURL();
                  updateURL(newFilters);
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button
            onClick={handleLocationSearch}
            disabled={isSearching || !searchInput.trim()}
            className="rounded-r-xl rounded-l-none border-l-none border-teal-400 shadow-none border hover:bg-teal-700 hover:text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Search Error */}
        {searchError && (
          <div className="text-red-500 text-sm bg-red-50 px-3 py-1 rounded-lg">
            {searchError}
          </div>
        )}

        {/* Price Range */}
        <div className="flex gap-1">
          {/* Minimum Price */}
          <Select
            value={filters.priceRange[0]?.toString() || "any"}
            onValueChange={(value) => handleFilterChange("priceRange", value, true)}
          >
            <SelectTrigger className="w-24 rounded-xl border-teal-400 focus:ring-2 focus:ring-teal-500">
              <SelectValue placeholder={formatPriceValue(filters.priceRange[0], true)} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Min</SelectItem>
              {priceMinOptions.map((price) => (
                <SelectItem key={price} value={price.toString()}>
                  <span className="text-xs">BDT </span> {price / 1000} k+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Maximum Price */}
          <Select
            value={filters.priceRange[1]?.toString() || "any"}
            onValueChange={(value) => handleFilterChange("priceRange", value, false)}
          >
            <SelectTrigger className="w-24 rounded-xl border-teal-400 focus:ring-2 focus:ring-teal-500">
              <SelectValue placeholder={formatPriceValue(filters.priceRange[1], false)} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Max</SelectItem>
              {priceMaxOptions.map((price) => (
                <SelectItem key={price} value={price.toString()}>
                  <span className="text-xs">BDT </span> {price / 1000} k
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Beds and Baths */}
        <div className="flex gap-1">
          {/* Beds */}
          <Select
            value={filters.beds}
            onValueChange={(value) => handleFilterChange("beds", value, null)}
          >
            <SelectTrigger className="w-24 rounded-xl border-teal-400 focus:ring-2 focus:ring-teal-500">
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Beds</SelectItem>
              {[1, 2, 3, 4].map((beds) => (
                <SelectItem key={beds} value={beds.toString()}>
                  {beds} bed{beds !== 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Baths */}
          <Select
            value={filters.baths}
            onValueChange={(value) => handleFilterChange("baths", value, null)}
          >
            <SelectTrigger className="w-24 rounded-xl border-teal-400 focus:ring-2 focus:ring-teal-500">
              <SelectValue placeholder="Baths" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="any">Any Baths</SelectItem>
              {[1, 2, 3].map((baths) => (
                <SelectItem key={baths} value={baths.toString()}>
                  {baths} bath{baths !== 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <Select
          value={filters.propertyType || "any"}
          onValueChange={(value) => handleFilterChange("propertyType", value, null)}
        >
          <SelectTrigger className="w-32 rounded-xl border-teal-400 focus:ring-2 focus:ring-teal-500">
            <SelectValue placeholder="Home Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="any">Any Property Type</SelectItem>
            {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
              <SelectItem key={type} value={type}>
                <div className="flex items-center">
                  <Icon className="w-4 h-4 mr-2" />
                  <span>{type}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-between items-center gap-4 p-2">
        <div className="flex border rounded-xl">
          <Button
            variant="ghost"
            className={cn(
              "px-3 py-1 rounded-none rounded-l-xl hover:bg-teal-600 hover:text-primary-50 transition-colors",
              viewMode === "list" ? "bg-teal-700 text-primary-50" : ""
            )}
            onClick={() => dispatch(setViewMode("list"))}
          >
            <List className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "px-3 py-1 rounded-none rounded-r-xl hover:bg-teal-600 hover:text-primary-50 transition-colors",
              viewMode === "grid" ? "bg-teal-700 text-primary-50" : ""
            )}
            onClick={() => dispatch(setViewMode("grid"))}
          >
            <Grid className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;