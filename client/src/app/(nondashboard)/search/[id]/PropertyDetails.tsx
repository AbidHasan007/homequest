import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AmenityIcons, HighlightIcons } from "@/lib/constants";
import { formatEnumString } from "@/lib/utils";
import { useGetPropertyQuery } from "@/state/api";
import { ArrowLeft, HelpCircle, MapPin, Calendar, Users, PawPrint, Car, Shield, Banknote, CheckCircle, XCircle, Info, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const PropertyDetails = ({ propertyId }: PropertyDetailsProps) => {
  const router = useRouter();
  const {
    data: property,
    isError,
    isLoading,
  } = useGetPropertyQuery(propertyId);

  const handleBackToSearch = () => {
    router.push('/search');
  };

  if (isLoading) return <>Loading...</>;
  if (isError || !property) {
    return <>Property not Found</>;
  }

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handleBackToSearch}
          variant="outline"
          className="flex items-center gap-2 hover:bg-slate-50 border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Button>
        
        {/* Quick Info Pills */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            <MapPin size={14} />
            <span>{property.propertyType}</span>
          </div>
          <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            <Star size={14} />
            <span>Premium</span>
          </div>
        </div>
      </div>

      {/* Property Highlights Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Star size={16} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-500">Property Highlights</h2>
        </div>
        
        {property.highlights && property.highlights.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {property.highlights.map((highlight: HighlightEnum) => {
              const Icon = HighlightIcons[highlight as HighlightEnum] || Star;
              return (
                <div
                  key={highlight}
                  className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">
                      {formatEnumString(highlight)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Info size={24} className="mx-auto mb-2 opacity-50" />
            <p>No highlights available for this property</p>
          </div>
        )}
      </div>

      {/* Amenities Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
            <CheckCircle size={16} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-500">Amenities</h2>
        </div>
        
        {property.amenities && property.amenities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {property.amenities.map((amenity: AmenityEnum) => {
              const Icon = AmenityIcons[amenity as AmenityEnum] || CheckCircle;
              return (
                <div
                  key={amenity}
                  className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">
                      {formatEnumString(amenity)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Info size={24} className="mx-auto mb-2 opacity-50" />
            <p>No amenities listed for this property</p>
          </div>
        )}
      </div>

      {/* Policies and Fees Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center space-x-2 p-6 bg-slate-50 border-b border-slate-200">
          <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Shield size={16} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-500">Policies & Fees</h2>
        </div>
        
        <div className="p-6">
          
          <Tabs defaultValue="fees" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-slate-100">
              <TabsTrigger value="fees" className="flex items-center space-x-2">
                <Banknote size={16} />
                <span>Fees</span>
              </TabsTrigger>
              <TabsTrigger value="pets" className="flex items-center space-x-2">
                <PawPrint size={16} />
                <span>Pets</span>
              </TabsTrigger>
              <TabsTrigger value="parking" className="flex items-center space-x-2">
                <Car size={16} />
                <span>Parking</span>
              </TabsTrigger>
              <TabsTrigger value="bachelor" className="flex items-center space-x-2">
                <Users size={16} />
                <span>Bachelor</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fees" className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>One-time Move-in Fees</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 px-4 bg-white rounded-lg border border-slate-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Shield size={14} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Security Deposit</p>
                        <p className="text-xs text-slate-500">Refundable upon lease completion</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-slate-800">৳{property.securityDeposit}</p>
                      <p className="text-xs text-slate-500">BDT</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pets" className="space-y-4">
              <div className={`p-6 rounded-lg border-2 ${
                property.isPetsAllowed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-3">
                  {property.isPetsAllowed ? (
                    <CheckCircle size={24} className="text-green-600" />
                  ) : (
                    <XCircle size={24} className="text-red-600" />
                  )}
                  <div>
                    <h4 className={`font-semibold text-lg ${
                      property.isPetsAllowed ? 'text-green-800' : 'text-red-800'
                    }`}>
                      Pets are {property.isPetsAllowed ? 'Welcome' : 'Not Allowed'}
                    </h4>
                    <p className={`text-sm ${
                      property.isPetsAllowed ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {property.isPetsAllowed 
                        ? 'This property allows pets. Additional pet deposits may apply.'
                        : 'This property does not allow pets of any kind.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="parking" className="space-y-4">
              <div className={`p-6 rounded-lg border-2 ${
                property.isParkingIncluded 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-amber-50 border-amber-200'
              }`}>
                <div className="flex items-center space-x-3">
                  {property.isParkingIncluded ? (
                    <CheckCircle size={24} className="text-green-600" />
                  ) : (
                    <Info size={24} className="text-amber-600" />
                  )}
                  <div>
                    <h4 className={`font-semibold text-lg ${
                      property.isParkingIncluded ? 'text-green-800' : 'text-amber-800'
                    }`}>
                      Parking is {property.isParkingIncluded ? 'Included' : 'Not Included'}
                    </h4>
                    <p className={`text-sm ${
                      property.isParkingIncluded ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {property.isParkingIncluded 
                        ? 'Free parking space is included with this rental.'
                        : 'Parking is not included. Street parking or paid parking may be available.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bachelor" className="space-y-4">
              <div className={`p-6 rounded-lg border-2 ${
                property.isBachelorFriendly 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-3">
                  {property.isBachelorFriendly ? (
                    <CheckCircle size={24} className="text-green-600" />
                  ) : (
                    <XCircle size={24} className="text-red-600" />
                  )}
                  <div>
                    <h4 className={`font-semibold text-lg ${
                      property.isBachelorFriendly ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {property.isBachelorFriendly ? 'Bachelor-Friendly' : 'Family Only'}
                    </h4>
                    <p className={`text-sm ${
                      property.isBachelorFriendly ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {property.isBachelorFriendly 
                        ? 'This property welcomes bachelor tenants and working professionals.'
                        : 'This property is reserved for families only. Bachelor tenants are not permitted.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;