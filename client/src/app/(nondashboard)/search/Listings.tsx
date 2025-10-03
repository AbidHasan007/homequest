"use client";
import {
  useAddFavoritePropertyMutation,
  useGetAuthUserQuery,
  useGetPropertiesQuery,
  useGetTenantQuery,
  useRemoveFavoritePropertyMutation,
} from "@/state/api";
import { useAppSelector } from "@/state/redux";
import { Property } from "@/types/prismaTypes";
import Card from "@/components/Card";
import CardCompact from "@/components/CardCompact";
import React, { useMemo, useCallback } from "react";
import { MapPin, Loader2, AlertCircle, Home } from "lucide-react";

// Types for better TypeScript support
interface ListingsProps {
  className?: string;
}

interface PropertyStats {
  total: number;
  inRadius: number;
  averagePrice: number;
  priceRange: [number, number];
}

const Listings: React.FC<ListingsProps> = ({ className = "" }) => {
  // Redux selectors
  const filters = useAppSelector((state) => state.global.filters);
  const viewMode = useAppSelector((state) => state.global.viewMode);

  // API queries
  const { data: authUser, error: authError } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );
  const {
    data: properties,
    isLoading,
    isError,
    error,
  } = useGetPropertiesQuery(filters);

  // Mutations
  const [addFavorite] = useAddFavoritePropertyMutation();
  const [removeFavorite] = useRemoveFavoritePropertyMutation();

  // Memoized property statistics
  const propertyStats = useMemo((): PropertyStats => {
    if (!properties || properties.length === 0) {
      return { total: 0, inRadius: 0, averagePrice: 0, priceRange: [0, 0] };
    }

    const prices = properties
      .map(p => p.pricePerMonth)
      .filter(price => price && price > 0)
      .sort((a, b) => a - b);

    const averagePrice = prices.length > 0 
      ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length)
      : 0;

    const priceRange: [number, number] = prices.length > 0 
      ? [prices[0], prices[prices.length - 1]]
      : [0, 0];

    // Count properties within radius (if coordinates are set)
    const inRadius = filters.coordinates && filters.coordinates[0] !== 0 && filters.coordinates[1] !== 0
      ? properties.length // All returned properties are within radius due to server filtering
      : properties.length;

    return {
      total: properties.length,
      inRadius,
      averagePrice,
      priceRange,
    };
  }, [properties, filters.coordinates]);

  // Memoized location display text
  const locationText = useMemo(() => {
    if (filters.location === "any") return "all locations";
    if (filters.coordinates && filters.coordinates[0] !== 0 && filters.coordinates[1] !== 0) {
      return `${filters.location} (within ${filters.radius}km)`;
    }
    return filters.location;
  }, [filters.location, filters.coordinates, filters.radius]);

  // Handle favorite toggle with optimistic updates
  const handleFavoriteToggle = useCallback(async (propertyId: number) => {
    if (!authUser || authError) return;

    const isFavorite = tenant?.favorites?.some(
      (fav: Property) => fav.id === propertyId
    );

    try {
      if (isFavorite) {
        await removeFavorite({
          cognitoId: authUser.cognitoInfo.userId,
          propertyId,
        }).unwrap();
      } else {
        await addFavorite({
          cognitoId: authUser.cognitoInfo.userId,
          propertyId,
        }).unwrap();
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      // You could add a toast notification here
    }
  }, [authUser, authError, tenant, addFavorite, removeFavorite]);

  // Loading state
  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-2" />
            <p className="text-gray-600">Loading properties...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    const errorMessage = error && 'data' in error && error.data 
      ? (error.data as any)?.message || 'Server error occurred'
      : error && 'message' in error 
      ? error.message 
      : 'Network error - please check your connection';

    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center text-red-600">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p className="mb-2">Failed to fetch properties</p>
            <p className="text-sm text-gray-500 mb-4">
              {errorMessage}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!properties || properties.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center text-gray-500">
            <Home className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No properties found</h3>
            <p className="text-sm">
              Try adjusting your filters or search in a different location
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Header with statistics */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {propertyStats.total} propert{propertyStats.total === 1 ? 'y' : 'ies'} found
            </h3>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              in {locationText}
            </p>
          </div>
          
          {/* Price statistics */}
          {propertyStats.averagePrice > 0 && (
            <div className="text-right text-sm text-gray-600">
              <p className="font-medium">
                Avg: ৳{propertyStats.averagePrice.toLocaleString()}/month
              </p>
              {propertyStats.priceRange[0] !== propertyStats.priceRange[1] && (
                <p className="text-xs">
                  Range: ৳{propertyStats.priceRange[0].toLocaleString()} - ৳{propertyStats.priceRange[1].toLocaleString()}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Filter summary */}
        <div className="mt-2 flex flex-wrap gap-2">
          {filters.priceRange[0] && (
            <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
              Min: ৳{filters.priceRange[0].toLocaleString()}
            </span>
          )}
          {filters.priceRange[1] && (
            <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
              Max: ৳{filters.priceRange[1].toLocaleString()}
            </span>
          )}
          {filters.beds !== "any" && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {filters.beds} bed{filters.beds !== "1" ? 's' : ''}
            </span>
          )}
          {filters.baths !== "any" && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {filters.baths} bath{filters.baths !== "1" ? 's' : ''}
            </span>
          )}
          {filters.propertyType !== "any" && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              {filters.propertyType}
            </span>
          )}
          {filters.coordinates && filters.coordinates[0] !== 0 && filters.coordinates[1] !== 0 && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Within {filters.radius}km
            </span>
          )}
        </div>
      </div>

      {/* Properties list */}
      <div className="flex">
        <div className="p-4 w-full">
          <div className={viewMode === "grid" ? "flex flex-col space-y-4" : "space-y-4"}>
            {properties.map((property) => (
              viewMode === "grid" ? (
                <Card
                  key={property.id}
                  property={property}
                  isFavorite={
                    tenant?.favorites?.some(
                      (fav: Property) => fav.id === property.id
                    ) || false
                  }
                  onFavoriteToggle={() => handleFavoriteToggle(property.id)}
                  showFavoriteButton={!!authUser && !authError}
                  propertyLink={`/search/${property.id}`}
                />
              ) : (
                <CardCompact
                  key={property.id}
                  property={property}
                  isFavorite={
                    tenant?.favorites?.some(
                      (fav: Property) => fav.id === property.id
                    ) || false
                  }
                  onFavoriteToggle={() => handleFavoriteToggle(property.id)}
                  showFavoriteButton={!!authUser && !authError}
                  propertyLink={`/search/${property.id}`}
                />
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;