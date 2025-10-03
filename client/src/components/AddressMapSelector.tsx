import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Search, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const DEFAULT_CENTER: [number, number] = [90.4125, 23.8103]; // Dhaka, Bangladesh
const DEFAULT_ZOOM = 11;

interface AddressData {
  address: string;
  latitude: number;
  longitude: number;
}

interface AddressMapSelectorProps {
  onAddressSelect: (addressData: AddressData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const AddressMapSelector: React.FC<AddressMapSelectorProps> = ({
  onAddressSelect,
  onCancel,
  isLoading = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [manualAddress, setManualAddress] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<AddressData | null>(null);
  
  // Map refs and state
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const [showDefaultLocationInfo, setShowDefaultLocationInfo] = useState(false);

  // Reverse geocoding - get address from coordinates
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    setIsReverseGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error('Reverse geocoding service unavailable');
      }

      const data = await response.json();
      
      if (data.display_name) {
        return data.display_name;
      } else {
        // Fallback: create a generic address
        return `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      // Fallback: create a generic address
      return `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } finally {
      setIsReverseGeocoding(false);
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Check for MapTiler API key
    if (!process.env.NEXT_PUBLIC_MAPTILER_KEY) {
      setError('MapTiler API key is missing. Please configure NEXT_PUBLIC_MAPTILER_KEY.');
      return;
    }

    try {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      });

      map.on('load', () => {
        setMapLoaded(true);
        setError(null);
      });

      map.on('error', (e) => {
        console.error('Map error:', e);
        setError('Failed to load map. Please check your internet connection.');
      });

      // Add click handler for manual coordinate selection
      map.on('click', async (e) => {
        const { lng, lat } = e.lngLat;
        setCoordinates({ lat, lng });
        setShowDefaultLocationInfo(false); // Clear info message when user clicks
        
        // Update marker position
        if (markerRef.current) {
          markerRef.current.setLngLat([lng, lat]);
        } else {
          markerRef.current = new maplibregl.Marker({ color: '#dc2626' })
            .setLngLat([lng, lat])
            .addTo(map);
        }

        // Get address from coordinates using reverse geocoding
        const address = await reverseGeocode(lat, lng);
        
        const addressData: AddressData = {
          address: manualAddress.trim() || address,
          latitude: lat,
          longitude: lng
        };
        setSelectedLocation(addressData);
      });

      mapRef.current = map;

      return () => {
        if (markerRef.current) {
          markerRef.current.remove();
          markerRef.current = null;
        }
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    } catch (err) {
      console.error('Failed to initialize map:', err);
      setError('Failed to initialize map. Please try again.');
    }
  }, [manualAddress, reverseGeocode]);

  // Geocoding search using Nominatim (OpenStreetMap)
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setError('Please enter an address to search');
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      // Use Nominatim (OpenStreetMap) for free geocoding
      const query = encodeURIComponent(`${searchQuery}, Bangladesh`);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=10&countrycodes=bd&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error('Search service unavailable');
      }

      const data = await response.json();
      
      const results = data.map((item: any) => ({
        address: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        type: item.type || 'Location',
        importance: item.importance || 0
      }));

      if (results.length === 0) {
        setError('No locations found. Try a different search term.');
      } else {
        setSearchResults(results);
      }
    } catch (err) {
      console.error('Geocoding error:', err);
      setError('Failed to search for address. Please try again.');
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleLocationSelect = (result: any) => {
    const addressData: AddressData = {
      address: result.address,
      latitude: result.latitude,
      longitude: result.longitude
    };
    setSelectedLocation(addressData);
    setSearchResults([]);
    setCoordinates({ lat: result.latitude, lng: result.longitude });

    // Update map view and marker
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [result.longitude, result.latitude],
        zoom: 15,
        speed: 1.5
      });

      // Remove existing marker and add new one
      if (markerRef.current) {
        markerRef.current.remove();
      }
      
      markerRef.current = new maplibregl.Marker({ color: '#dc2626' })
        .setLngLat([result.longitude, result.latitude])
        .addTo(mapRef.current);
    }
  };

  const handleManualEntry = async () => {
    if (!manualAddress.trim()) {
      setError('Please enter a complete address');
      return;
    }

    setError(null);
    setIsSearching(true);

    try {
      // Try to geocode the manual address
      const query = encodeURIComponent(`${manualAddress}, Bangladesh`);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&countrycodes=bd&addressdetails=1`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const result = data[0];
          const lat = parseFloat(result.lat);
          const lng = parseFloat(result.lon);
          
          setCoordinates({ lat, lng });
          
          const addressData: AddressData = {
            address: manualAddress,
            latitude: lat,
            longitude: lng
          };
          
          setSelectedLocation(addressData);
          setShowDefaultLocationInfo(false);
          
          // Update map view and marker
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: [lng, lat],
              zoom: 15,
              speed: 1.5
            });

            // Remove existing marker and add new one
            if (markerRef.current) {
              markerRef.current.remove();
            }
            
            markerRef.current = new maplibregl.Marker({ color: '#dc2626' })
              .setLngLat([lng, lat])
              .addTo(mapRef.current);
          }
          
          setIsSearching(false);
          return;
        }
      }
    } catch (geocodeError) {
      console.log('Geocoding failed, using default coordinates');
    }

    // Fallback: Use default Dhaka coordinates if geocoding fails
    const defaultLat = DEFAULT_CENTER[1];
    const defaultLng = DEFAULT_CENTER[0];
    
    setCoordinates({ lat: defaultLat, lng: defaultLng });
    
    const addressData: AddressData = {
      address: manualAddress,
      latitude: defaultLat,
      longitude: defaultLng
    };
    
    setSelectedLocation(addressData);
    
    // Show info message about default coordinates
    setShowDefaultLocationInfo(true);
    console.log('Used default coordinates for address:', manualAddress);
    
    // Update map view and marker to default location
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [defaultLng, defaultLat],
        zoom: DEFAULT_ZOOM,
        speed: 1.5
      });

      // Remove existing marker and add new one
      if (markerRef.current) {
        markerRef.current.remove();
      }
      
      markerRef.current = new maplibregl.Marker({ color: '#dc2626' })
        .setLngLat([defaultLng, defaultLat])
        .addTo(mapRef.current);
    }
    
    setIsSearching(false);
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onAddressSelect(selectedLocation);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Select Property Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Instructions */}
        <Alert className="border-blue-200 bg-blue-50">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Search for an address or click directly on the map to get the exact location. 
            The system will automatically detect the address from map coordinates.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Panel - Search & Manual Entry */}
          <div className="space-y-4">
            
            {/* Address Search */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">🔍 Search Address</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter address (e.g., House 123, Road 5, Dhanmondi)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch} 
                  disabled={isSearching || !searchQuery.trim()}
                  className="px-4"
                >
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleLocationSelect(result)}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-sm">{result.address}</div>
                      <div className="text-xs text-gray-500">
                        {result.type} • {result.latitude.toFixed(4)}, {result.longitude.toFixed(4)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="text-center text-gray-400 text-sm">OR</div>

            {/* Manual Address Entry */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">✏️ Enter Address Manually</Label>
              <Input
                placeholder="Type complete address here..."
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                className="w-full"
              />
              <Button 
                onClick={handleManualEntry}
                variant="outline"
                disabled={!manualAddress.trim() || isSearching}
                className="w-full"
              >
                {isSearching ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2" />
                    Locating Address...
                  </div>
                ) : (
                  'Use This Address'
                )}
              </Button>
            </div>
          </div>

          {/* Right Panel - Real Map */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">🗺️ Interactive Map</Label>
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white min-h-[300px] relative">
              
              {/* Real MapLibre GL JS Map */}
              <div 
                ref={mapContainerRef}
                className="w-full h-[300px]"
              />
              
              {/* Map Loading Overlay */}
              {!mapLoaded && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50/90">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
              
              {/* Map Error Overlay */}
              {error && error.includes('map') && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-50/90">
                  <div className="text-center text-red-600 p-4">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}
              
              {/* Coordinates Display */}
              {coordinates && (
                <div className="absolute bottom-2 left-2 bg-white/95 px-2 py-1 rounded text-xs text-gray-600 border shadow-sm">
                  📍 {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                  {isReverseGeocoding && (
                    <span className="ml-2 text-blue-600">
                      <div className="inline-block animate-spin rounded-full h-3 w-3 border-b border-blue-600"></div>
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              💡 Click anywhere on the map to refine the exact location, or use manual address entry above
            </p>
          </div>
        </div>

        {/* Selected Location Display */}
        {selectedLocation && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-green-800">Selected Location</h4>
                <p className="text-sm text-green-700 mt-1">{selectedLocation.address}</p>
                <p className="text-xs text-green-600 mt-1">
                  Coordinates: {selectedLocation.latitude.toFixed(6)}, {selectedLocation.longitude.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        )}

          {/* Default Location Info */}
          {showDefaultLocationInfo && selectedLocation && (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Address saved with approximate coordinates. Click on the map to set the exact location if needed.
              </AlertDescription>
            </Alert>
          )}

          {/* Error Display */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          {onCancel && (
            <Button 
              onClick={onCancel}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              ← Back to Documents
            </Button>
          )}
          <Button 
            onClick={handleConfirm}
            disabled={!selectedLocation || isLoading}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </div>
            ) : (
              '✓ Confirm Address & Complete Verification'
            )}
          </Button>
        </div>

        {/* Integration Note */}
        <div className="text-xs text-gray-400 text-center mt-2">
          📍 Powered by MapTiler & OpenStreetMap • Free geocoding with Nominatim
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressMapSelector;
