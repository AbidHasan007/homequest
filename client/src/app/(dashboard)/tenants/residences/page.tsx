"use client";

import React, { useState } from "react";
import ResidenceCard from "@/components/ResidenceCard";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  Plus,
  Grid3X3,
  List
} from "lucide-react";
import {
  useGetAuthUserQuery,
  useGetCurrentResidencesQuery,
  useGetTenantQuery,
} from "@/state/api";

const Residences = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { data: authUser } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );

  const {
    data: currentResidences,
    isLoading,
    error,
  } = useGetCurrentResidencesQuery(authUser?.cognitoInfo?.userId || "", {
    skip: !authUser?.cognitoInfo?.userId,
  });

  // Deduplicate on client side as a fallback
  const uniqueResidences = currentResidences?.filter(
    (property, index, self) => property && property.id && index === self.findIndex(p => p && p.id === property.id)
  ) || [];

  // Transform data for ResidenceCard component
  const transformedResidences = uniqueResidences.map(property => ({
    id: String(property.id) || '',
    title: property.title || property.name || 'Untitled Property',
    address: property.location?.address || 'No address available',
    city: property.location?.city || 'Unknown city',
    state: property.location?.state || property.location?.country || '',
    images: property.images || property.photoUrls || ["/placeholder.jpg"],
    lease: property.lease ? {
      id: property.lease.id,
      rent: property.lease.rent || 0,
      startDate: property.lease.startDate,
      deposit: property.lease.deposit || 0,
      status: property.lease.status || 'active',
      daysLived: property.lease.daysLived,
      daysUntilStart: property.lease.daysUntilStart
    } : null,
    landlord: property.landlord ? {
      name: property.landlord.name || '',
      email: property.landlord.email || '',
      phoneNumber: property.landlord.phoneNumber || ''
    } : null
  }));

  const filteredResidences = transformedResidences || [];

  if (isLoading) return <Loading />;
  
  if (error) {
    console.error("Error loading current residences:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200">
          <div className="text-red-600 text-center">
            <h2 className="text-lg font-semibold mb-2">Error Loading Residences</h2>
            <p>{(error as any)?.message || "Unknown error occurred"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="container mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Residences</h1>
              <p className="text-gray-600">Manage your current leases and properties</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="hidden sm:flex items-center gap-2 border-teal-200 text-teal-700 hover:bg-teal-50"
                onClick={() => window.location.href = '/search'}
              >
                <Plus className="h-4 w-4" />
                Find New Property
              </Button>
              <div className="flex border border-gray-200 rounded-lg p-1 bg-white">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-teal-600 hover:bg-teal-700' : 'hover:bg-gray-100'}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-teal-600 hover:bg-teal-700' : 'hover:bg-gray-100'}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>


        </div>

        <Separator className="mb-8" />

        {/* Content Area */}
        {transformedResidences?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <div className="relative mb-6">
              <div className="h-20 w-20 bg-teal-100 rounded-full flex items-center justify-center">
                <Home className="h-10 w-10 text-teal-600" />
              </div>
              <div className="absolute -top-1 -right-1 h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center">
                <Plus className="h-3 w-3 text-gray-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Residences</h3>
            <p className="text-gray-500 mb-6 text-center max-w-md leading-relaxed">
              You don&apos;t have any active leases at the moment. Browse our available properties to find your perfect home.
            </p>
            <Button 
              className="bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => window.location.href = '/search'}
            >
              <Plus className="h-4 w-4 mr-2" />
              Browse Properties
            </Button>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredResidences?.length} {filteredResidences?.length === 1 ? 'Property' : 'Properties'}
                </h2>
              </div>
            </div>

            {/* Residences Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredResidences?.map((residence) => (
                <ResidenceCard key={residence.id} residence={residence} />
              ))}
            </div>
            

          </>
        )}
      </div>
    </div>
  );
};

export default Residences;