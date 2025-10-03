import { useGetPropertyQuery, useGetSafetyIndicatorQuery } from "@/state/api";
import { MapPin, Star } from "lucide-react";
import React from "react";
import SafetyBadge from "@/components/SafetyBadge";

const PropertyOverview = ({ propertyId }: PropertyOverviewProps) => {
  const {
    data: property,
    isError,
    isLoading,
  } = useGetPropertyQuery(propertyId);

  // Get safety indicator for this location
  const {
    data: safetyIndicator,
    isLoading: safetyLoading,
  } = useGetSafetyIndicatorQuery(property?.location?.id || 0, {
    skip: !property?.location?.id,
  });



  if (isLoading) return <>Loading...</>;
  if (isError || !property) {
    return <>Property not Found</>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">
          {property.location?.country}/{" "}
          <span className="font-semibold text-gray-600">
            {property.location?.city}
          </span>
        </div>
        <h1 className="text-3xl font-bold my-5">{property.name}</h1>
        <div className="flex justify-between items-center">
          <span className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1 text-gray-700" />
            <span className="mr-3">
              {property.location?.address},{" "},{property.location?.city}
            </span>
            {/* Safety Badge */}
            {!safetyLoading && safetyIndicator && (
              <SafetyBadge 
                level={safetyIndicator.level} 
                reason={safetyIndicator.reason}
                size="sm"
              />
            )}
          </span>
          
          <div className="flex justify-between items-center gap-3">
            <span className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 mr-1 fill-current" />
              {property.averageRating.toFixed(1)} ({property.numberOfReviews}{" "}
              Reviews)
            </span>
            <span className="text-green-600">Verified</span>

          </div>
        </div>
      </div>

      {/* Details */}
      <div className="border border-primary-200 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center gap-4 px-5">
          <div>
            <div className="text-sm text-gray-500">Monthly Rent</div>
            <div className="font-semibold">
              {property.pricePerMonth.toLocaleString()} BDT
            </div>
          </div>
          <div className="border-l border-gray-300 h-10"></div>
          <div>
            <div className="text-sm text-gray-500">Bedrooms</div>
            <div className="font-semibold">{property.beds} bed</div>
          </div>
          <div className="border-l border-gray-300 h-10"></div>
          <div>
            <div className="text-sm text-gray-500">Bathrooms</div>
            <div className="font-semibold">{property.baths} bath</div>
          </div>
          <div className="border-l border-gray-300 h-10"></div>
          <div>
            <div className="text-sm text-gray-500">Square Feet</div>
            <div className="font-semibold">
              {property.squareFeet.toLocaleString()} sq ft
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="my-16">
        <h2 className="text-xl font-semibold mb-5">About {property.name}</h2>
        <p className="text-gray-500 leading-7">
          {property.description}
        2 Bedroom Fully Furnished Apartment for Rent in Niketon,Gulshan Area, Dhaka

Location: Block C, Niketon,Gulshan Area, Dhaka.

Property Features:

Size: 1,200 sq. ft.

Bedrooms: 2

Bathrooms: 2 (1 attached, 1 common)

Drawing & Dining space

Balcony with open view

Floor: 6th floor (with lift access)

Parking: 1 reserved car parking

Facing: South (good natural light and ventilation)

Facilities & Amenities:

24/7 Security with CCTV

Lift & Generator backup

Gas, Electricity & Water supply available

High-speed Wi-Fi coverage in the area

Nearby groceries, mosque, school and shopping mall

Rent & Deposit:

Monthly Rent: BDT 28,000

Service Charge: BDT 3,000 (for security, lift, generator, etc.)

Security Deposit: 2 months rent

Advance: 1 month

Availability: From October 2025

        </p>
      </div>
    </div>
  );
};

export default PropertyOverview;