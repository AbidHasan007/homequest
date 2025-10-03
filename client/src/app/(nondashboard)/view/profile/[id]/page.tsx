"use client";

import React from "react";
import { useGetLandlordProfileQuery } from "@/state/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  MapPin, 
  Building2,
  Users,
  Award,
  CheckCircle,
  AlertCircle,
  Calendar,
  MessageCircle,
  TrendingUp,
  Shield
} from "lucide-react";

interface SingleLandlordProfilePageProps {
  params: Promise<{ id: string }>;
}

const SingleLandlordProfilePage: React.FC<SingleLandlordProfilePageProps> = ({ params }) => {
  const { id: landlordId } = React.use(params);

  const { data: profile, isLoading, error } = useGetLandlordProfileQuery(landlordId);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString?: string, options?: Intl.DateTimeFormatOptions) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      return date.toLocaleDateString('en-US', options);
    } catch {
      return 'Invalid date';
    }
  };

  const formatMemberSince = (dateString?: string, dateType?: string) => {
    if (!dateString) return { year: '--', fullText: 'Member date unknown' };
    
    const formattedDate = formatDate(dateString, { year: 'numeric', month: 'long' });
    if (formattedDate === 'Unknown date' || formattedDate === 'Invalid date') {
      return { year: '--', fullText: 'Member date unknown' };
    }
    
    try {
      const date = new Date(dateString);
      // Provide context based on what date we're using
      let prefix = 'Member since';
      if (dateType === 'verified') prefix = 'Verified';
      if (dateType === 'property') prefix = 'Active since';
      
      return {
        year: date.getFullYear().toString(),
        fullText: `${prefix} ${formattedDate}`
      };
    } catch {
      return { year: '--', fullText: 'Member date unknown' };
    }
  };

  const getVerificationStatus = () => {
    // Only use verifiedAt - ignore nidStatus completely
    if (profile?.verifiedAt) {
      return { icon: CheckCircle, color: 'text-green-600 bg-green-100', label: 'Verified' };
    } else {
      return { icon: AlertCircle, color: 'text-gray-600 bg-gray-100', label: 'Unverified' };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-lg p-4 h-24"></div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm h-64"></div>
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm h-64"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-md mx-auto bg-red-50 border-red-200">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-red-900 mb-2">Profile Not Found</h3>
              <p className="text-red-700 text-sm">
                The landlord profile you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const verificationStatus = getVerificationStatus();
  const VerificationIcon = verificationStatus.icon;

  // Calculate stats with fallbacks
  const stats = {
    propertyCount: profile?.propertyCount ?? profile?.properties?.length ?? 0,
    tenantCount: profile?.tenantCount ?? 0,
    reviewCount: profile?.reviewCount ?? profile?.reviews?.length ?? 0,
    averageRating: profile?.averageRating ?? 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Statistics Overview */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          {/* Hero Banner */}
          <div className="h-32 bg-gradient-to-r from-teal-600 to-cyan-600 relative">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>
          
          {/* Profile Header */}
          <div className="px-8 py-6">
            <div className="flex items-start gap-6 -mt-16 relative z-10">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg bg-white">
                <AvatarFallback className="bg-teal-100 text-teal-600 text-2xl font-bold">
                  {profile?.name?.charAt(0).toUpperCase() || "L"}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 pt-16">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {profile?.name || "Unknown Landlord"}
                    </h1>
                    <div className="flex items-center gap-3">
                      <Badge className={`${verificationStatus.color} text-xs px-2 py-1`}>
                        <VerificationIcon className="h-3 w-3 mr-1" />
                        {verificationStatus.label}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {stats.averageRating > 0 ? (
                          <>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < Math.round(stats.averageRating)
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">
                              {stats.averageRating.toFixed(1)} ({stats.reviewCount} reviews)
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">No reviews yet</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
                <CardContent className="p-4 text-center">
                  <Building2 className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.propertyCount}
                  </div>
                  <div className="text-sm text-gray-600">Properties</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.tenantCount}
                  </div>
                  <div className="text-sm text-gray-600">Current Tenants</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '--'}
                  </div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {(() => {
                      // Fallback logic: use verifiedAt if no createdAt, or earliest property date
                      if (profile?.createdAt) {
                        return formatMemberSince(profile.createdAt, 'created').year;
                      } else if (profile?.verifiedAt) {
                        return formatMemberSince(profile.verifiedAt, 'verified').year;
                      } else if (profile?.properties?.[0]?.postedDate) {
                        return formatMemberSince(profile.properties[0].postedDate, 'property').year;
                      } else {
                        return '--';
                      }
                    })()}
                  </div>
                  <div className="text-sm text-gray-600">Since</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Profile Details */}
            <Card className="shadow-md border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-teal-600" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  
                  <div className="space-y-3">
                    
                    {profile?.address && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-sm text-gray-700">{profile.address}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {(() => {
                          // Fallback logic: use verifiedAt if no createdAt, or earliest property date
                          if (profile?.createdAt) {
                            return formatMemberSince(profile.createdAt, 'created').fullText;
                          } else if (profile?.verifiedAt) {
                            return formatMemberSince(profile.verifiedAt, 'verified').fullText;
                          } else if (profile?.properties?.[0]?.postedDate) {
                            return formatMemberSince(profile.properties[0].postedDate, 'property').fullText;
                          } else {
                            return 'Member date unknown';
                          }
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rating Breakdown */}
            <Card className="shadow-md border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                  Rating Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '--'}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={
                            i < Math.round(stats.averageRating)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      Based on {stats.reviewCount} review{stats.reviewCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  {stats.reviewCount > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = profile?.reviews?.filter((r: any) => Math.round(r.rating) === star).length || 0;
                          const percentage = stats.reviewCount > 0 ? (count / stats.reviewCount) * 100 : 0;
                          
                          return (
                            <div key={star} className="flex items-center gap-2">
                              <span className="text-sm w-2">{star}</span>
                              <Star className="h-3 w-3 text-yellow-400" />
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-yellow-400 h-2 rounded-full transition-all duration-500" 
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500 w-8">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle & Right Columns - Reviews and Properties */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Reviews Section */}
            <Card className="shadow-md border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-teal-600" />
                  Tenant Reviews ({stats.reviewCount})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {profile?.reviews && profile.reviews.length > 0 ? (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {profile.reviews.map((review: any) => (
                      <div key={review.id} className="border border-gray-200 p-4 rounded-lg bg-white hover:shadow-sm transition-shadow">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12 flex-shrink-0">
                            <AvatarFallback className="bg-teal-100 text-teal-600 font-medium">
                              {getInitials(review.tenant?.name || 'Tenant')}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            {/* Header with name, rating and date */}
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {review.tenant?.name || 'Anonymous Tenant'}
                                </h4>
                                <div className="flex items-center gap-1 mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={14}
                                      className={
                                        i < review.rating
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-gray-300"
                                      }
                                    />
                                  ))}
                                  <span className="text-sm text-gray-600 ml-1">
                                    ({review.rating}/5)
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xs text-gray-400">
                                  {formatDate(review.createdAt, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            </div>

                            {/* Review comment */}
                            {review.comment && (
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {review.comment}
                              </p>
                            )}

                            {/* Property reference if available */}
                            {review.property && (
                              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                <Building2 className="h-3 w-3" />
                                <span>Property: {review.property.name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
                    <p className="text-gray-600 text-sm max-w-sm mx-auto">
                      This landlord hasn&apos;t received any reviews from tenants yet. Be the first to share your experience!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Properties Section (if available in profile data) */}
            {profile?.properties && profile.properties.length > 0 && (
              <Card className="shadow-md border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-teal-600" />
                    Available Properties ({stats.propertyCount})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.properties.slice(0, 6).map((property: any) => (
                      <div key={property.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900 truncate">
                            {property.name || `Property #${property.id}`}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {property.propertyType || 'Property'}
                          </Badge>
                        </div>
                        
                        {property.address && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{property.address}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-lg font-bold text-teal-600">
                            ৳{property.pricePerMonth?.toLocaleString()}/mo
                          </span>
                          <div className="flex items-center gap-3 text-gray-500">
                            {property.beds && (
                              <span>{property.beds} bed</span>
                            )}
                            {property.baths && (
                              <span>{property.baths} bath</span>
                            )}
                          </div>
                        </div>
                        
                        {property.averageRating && (
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">
                              {property.averageRating.toFixed(1)} ({property.reviewCount || 0} reviews)
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {profile.properties.length > 6 && (
                    <div className="text-center mt-4">
                      <Button variant="outline" size="sm">
                        View All Properties ({stats.propertyCount})
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleLandlordProfilePage;