import { FiltersState, initialState, setFilters } from "@/state";
import { useAppSelector } from "@/state/redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { cleanParams, cn, formatEnumString } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { AmenityIcons, PropertyTypeIcons } from "@/lib/constants";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const FiltersFull = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const filters = useAppSelector((state) => state.global.filters);
  const [localFilters, setLocalFilters] = useState(filters);
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  );

  React.useEffect(() => {
    if (isFiltersFullOpen) {
      setLocalFilters(filters);
    }
  }, [isFiltersFullOpen, filters]);

 const updateURL = debounce((newFilters: FiltersState) => {
    try {
      console.log("Updating URL with filters:", newFilters);
      const cleanFilters = cleanParams(newFilters);
      console.log("Clean filters for URL:", cleanFilters);
      
      const updatedSearchParams = new URLSearchParams();

      Object.entries(cleanFilters).forEach(([key, value]) => {
        const stringValue = Array.isArray(value) ? value.join(",") : value.toString();
        console.log(`Setting URL param ${key}:`, stringValue);
        updatedSearchParams.set(key, stringValue);
      });

      const newURL = `${pathname}?${updatedSearchParams.toString()}`;
      console.log("Navigating to:", newURL);
      router.push(newURL);
    } catch (error) {
      console.error("Error updating URL:", error);
    }
  }, 300);

  const handleSubmit = () => {
    try {
      // Create a copy of localFilters for validation and processing
      const processedFilters = { ...localFilters };
      
      // Validate and format date if provided
      if (processedFilters.availableFrom && processedFilters.availableFrom !== "any") {
        const date = new Date(processedFilters.availableFrom);
        if (isNaN(date.getTime())) {
          console.error("Invalid date format:", processedFilters.availableFrom);
          alert("Please enter a valid date format");
          return;
        }
        // Ensure the date is in the correct ISO format for the API
        processedFilters.availableFrom = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      }
      
      console.log("Applying filters:", processedFilters);
      dispatch(setFilters(processedFilters));
      updateURL(processedFilters);
    } catch (error) {
      console.error("Error applying filters:", error);
      alert("An error occurred while applying filters. Please try again.");
    }
  };

  const handleReset = () => {
    setLocalFilters(initialState.filters);
    dispatch(setFilters(initialState.filters));
    updateURL(initialState.filters);
  };

  const handleAmenityChange = (amenity: AmenityEnum) => {
    setLocalFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

const handleLocationSearch = async () => {
  if (!localFilters.location || localFilters.location === "any") {
    alert("Please enter a location to search");
    return;
  }

  try {
    console.log('🔍 Searching for location:', localFilters.location);
    
    // Try MapTiler first with Bangladesh focus
    const maptilerResponse = await fetch(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(
        localFilters.location
      )}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}&country=BD&type=place,address,locality&limit=5`
    );

    let coordinates = null;
    let foundLocation = null;

    if (maptilerResponse.ok) {
      const data = await maptilerResponse.json();
      
      if (data.features && data.features.length > 0) {
        // Prefer Bangladesh results
        const bestMatch = data.features.find((feature: any) => 
          feature.properties.country === 'BD' || 
          feature.properties.country_code === 'BD'
        ) || data.features[0];

        const [lng, lat] = bestMatch.center;
        coordinates = [lng, lat];
        foundLocation = bestMatch.place_name || localFilters.location;
        console.log('✅ MapTiler found:', foundLocation, coordinates);
      }
    }

    // Fallback to Nominatim if MapTiler fails
    if (!coordinates) {
      console.log('🔄 Trying Nominatim fallback...');
      const nominatimResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?${new URLSearchParams({
          q: localFilters.location,
          countrycodes: 'bd',
          format: 'json',
          limit: '1',
          addressdetails: '1'
        }).toString()}`,
        {
          headers: {
            'User-Agent': 'RealEstateApp (contact@example.com)'
          }
        }
      );

      if (nominatimResponse.ok) {
        const data = await nominatimResponse.json();
        if (data && data.length > 0) {
          coordinates = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
          foundLocation = data[0].display_name || localFilters.location;
          console.log('✅ Nominatim found:', foundLocation, coordinates);
        }
      }
    }

    if (coordinates) {
      setLocalFilters((prev) => ({
        ...prev,
        coordinates: coordinates as [number, number],
        radius: 5 // Set default radius when location is found
      }));
      console.log('📍 Updated local filters with coordinates:', coordinates);
    } else {
      alert("Location not found. Please try a different search term or check the spelling.");
      console.log('❌ No location found for:', localFilters.location);
    }
  } catch (err) {
    console.error("Error searching location:", err);
    alert("Error searching location. Please try again.");
  }
};

  if (!isFiltersFullOpen) return null;

  return (
    <div className="bg-white rounded-lg px-4 h-full overflow-auto pb-10">
      <div className="flex flex-col space-y-6">
        {/* Location */}
        <div>
          <h4 className="font-bold mb-2">Location</h4>
          <div className="flex items-center">
            <Input
              placeholder="Enter location"
              value={localFilters.location === "any" ? "" : localFilters.location}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              className="rounded-l-xl rounded-r-none border-r-0"
            />
            <Button
              onClick={handleLocationSearch}
              className="rounded-r-xl rounded-l-none border-l-none border-teal-500 shadow-none border hover:bg-teal-700 hover:text-primary-50"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <h4 className="font-bold mb-2">House Type</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
              <div
                key={type}
                className={cn(
                  "flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer",
                  localFilters.propertyType === type
                    ? "border-teal-600"
                    : "border-gray-200"
                )}
                onClick={() =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    propertyType: type as PropertyTypeEnum,
                  }))
                }
              >
                <Icon className="w-6 h-6 mb-2" />
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-bold mb-2">Price Range (Monthly)</h4>
          <Slider
           className=""
            min={0}
            max={10000}
            step={100}
            value={[
              localFilters.priceRange[0] ?? 0,
              localFilters.priceRange[1] ?? 10000,
            ]}
            onValueChange={(value: any) =>
              setLocalFilters((prev) => ({
                ...prev,
                priceRange: value as [number, number],
              }))
            }
          />
          <div className="flex justify-between mt-2">
            <span>&#2547;{localFilters.priceRange[0] ?? 0}</span>
            <span>&#2547;{localFilters.priceRange[1] ?? 10000}</span>
          </div>
        </div>

        {/* Beds and Baths */}
        <div className="flex gap-4">
          <div className="flex-1">
            <h4 className="font-bold mb-2">Beds</h4>
            <Select
              value={localFilters.beds || "any"}
              onValueChange={(value) =>
                setLocalFilters((prev) => ({ ...prev, beds: value }))
              }
            >
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any beds</SelectItem>
                <SelectItem value="1">1 bed</SelectItem>
                <SelectItem value="2">2 beds</SelectItem>
                <SelectItem value="3">3 beds</SelectItem>
                <SelectItem value="4">4 beds</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <h4 className="font-bold mb-2">Baths</h4>
            <Select
              value={localFilters.baths || "any"}
              onValueChange={(value) =>
                setLocalFilters((prev) => ({ ...prev, baths: value }))
              }
            >
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Baths" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any baths</SelectItem>
                <SelectItem value="1">1 bath</SelectItem>
                <SelectItem value="2">2 baths</SelectItem>
                <SelectItem value="3">3 baths</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Square Feet */}
        <div>
          <h4 className="font-bold mb-2">Square Feet</h4>
          <Slider
            min={0}
            max={5000}
            step={100}
            value={[
              localFilters.squareFeet[0] ?? 0,
              localFilters.squareFeet[1] ?? 5000,
            ]}
            onValueChange={(value) =>
              setLocalFilters((prev) => ({
                ...prev,
                squareFeet: value as [number, number],
              }))
            }
            className="[&>.bar]:bg-primary-700"
          />
          <div className="flex justify-between mt-2">
            <span>{localFilters.squareFeet[0] ?? 0} sq ft</span>
            <span>{localFilters.squareFeet[1] ?? 5000} sq ft</span>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="font-bold mb-2">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(AmenityIcons).map(([amenity, Icon]) => (
              <div
                key={amenity}
                className={cn(
                  "flex items-center space-x-2 p-2 border rounded-lg hover:cursor-pointer",
                  localFilters.amenities.includes(amenity as AmenityEnum)
                    ? "border-teal-600"
                    : "border-gray-200"
                )}
                onClick={() => handleAmenityChange(amenity as AmenityEnum)}
              >
                <Icon className="w-5 h-5 hover:cursor-pointer" />
                <Label className="hover:cursor-pointer">
                  {formatEnumString(amenity)}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Available From */}
        <div>
          <h4 className="font-bold mb-2">Available From</h4>
          <Input
            type="date"
            value={
              localFilters.availableFrom !== "any"
                ? localFilters.availableFrom
                : ""
            }
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                availableFrom: e.target.value ? e.target.value : "any",
              }))
            }
            className="rounded-xl"
          />
        </div>

        {/* Apply and Reset buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-teal-700 text-white rounded-xl hover:bg-teal-800"
          >
            APPLY
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 rounded-xl hover:bg-gray-50"
          >
            Reset Filters
          </Button>
        </div>
        
        {/* Show All Properties Button */}
        <div className="mt-4">
          <Button
            onClick={() => {
              const allPropertiesFilters = {
                ...initialState.filters,
                location: "any",
                coordinates: null,
                bounds: null
              };
              setLocalFilters(allPropertiesFilters);
              dispatch(setFilters(allPropertiesFilters));
              updateURL(allPropertiesFilters);
            }}
            variant="outline"
            className="w-full rounded-xl border-teal-500 text-teal-700 hover:bg-teal-50"
          >
            Show All Properties
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersFull;