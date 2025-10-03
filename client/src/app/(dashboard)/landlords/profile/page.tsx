// "use client";

// import React, { useMemo, useState } from "react";
// import Header from "@/components/Header";
// import ReviewList from "@/components/ReviewList";
// import ReviewForm from "@/components/ReviewForm";
// import { useGetAuthUserQuery, useGetLeasesQuery } from "@/state/api";

// const LandlordProfilePage = () => {
//   const { data: auth } = useGetAuthUserQuery();
//   const landlordId = auth?.cognitoInfo?.userId;

//   // Fetch all leases where this landlord owns the property
//   const { data: leases } = useGetLeasesQuery(0);
//   const myLeases = useMemo(() => {
//     return (leases || []).filter((lease: any) => lease.property.landlordCognitoId === landlordId);
//   }, [leases, landlordId]);

//   const [selectedLeaseId, setSelectedLeaseId] = useState<number | null>(
//     myLeases?.[0]?.id ?? null
//   );

//   return (
//     <div className="dashboard-container">
//       <Header title="My Profile" subtitle="Reviews from tenants and your feedback" />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Section 1: Reviews tenants left about this landlord */}
//         <div className="bg-white rounded-xl p-6">
//           <h2 className="text-lg font-semibold mb-4">Reviews About Me</h2>
//           {landlordId && <ReviewList propertyId={myLeases[0]?.property.id} type="tenant" />}
//         </div>

//         {/* Section 2: Landlord writes reviews for tenants */}
//         <div className="bg-white rounded-xl p-6">
//           <h2 className="text-lg font-semibold mb-4">Write a Review for Tenant</h2>
//           {myLeases.length === 0 ? (
//             <p className="text-sm text-gray-600">No tenants found for your properties.</p>
//           ) : (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm mb-1">Select Lease / Tenant</label>
//                 <select
//                   className="w-full border border-gray-200 rounded-md p-2"
//                   value={selectedLeaseId ?? ""}
//                   onChange={(e) => setSelectedLeaseId(Number(e.target.value))}
//                 >
//                   {myLeases.map((lease: any) => (
//                     <option key={lease.id} value={lease.id}>
//                       {lease.tenant.name} - {lease.property.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {selectedLeaseId && (
//                       <ReviewForm
//                        leaseId={selectedLeaseId}
//                         locationId={myLeases.find(l => l.id === selectedLeaseId)?.property.locationId!}
//                       />
//                     )}
//                 </div>
//               )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandlordProfilePage;


"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Star, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  Edit3,
  Award,
  TrendingUp,
  Users,
  Building2,
  CheckCircle,
  AlertCircle,
  PenTool,
  Eye,
  Filter,
  Bed,
  Bath
} from "lucide-react";
import ReviewList from "@/components/ReviewList";
import ReviewForm from "@/components/ReviewForm";
import { 
  useGetAuthUserQuery, 
  useGetLeasesQuery, 
  useGetLandlordQuery,
  useGetLandlordPropertiesQuery,
  useGetReviewsQuery 
} from "@/state/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


// Component to show all reviews for a landlord
const ReviewListForLandlord = ({ userId }: { userId: string }) => {
  const { data: reviews, isLoading, error } = useGetReviewsQuery({ 
    userId, 
    type: "TENANT_TO_LANDLORD" 
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="border border-gray-200 p-3 rounded-lg animate-pulse">
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-600 bg-red-50 rounded-lg border border-red-200">
        <p className="text-sm">Error loading reviews. Please try again later.</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
        <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <h4 className="font-medium text-gray-700 mb-1">No Reviews Yet</h4>
        <p className="text-sm text-gray-500">
          Reviews from your tenants will appear here once they submit feedback.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((review: any) => (
        <div key={review.id} className="border border-gray-200 p-4 rounded-lg bg-white hover:shadow-sm transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="text-yellow-500 text-sm">
                {"★".repeat(review.rating)}
                <span className="text-gray-300">{"★".repeat(5 - review.rating)}</span>
              </div>
              <span className="text-xs text-gray-500">({review.rating}/5)</span>
            </div>
            <div className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          {review.comment && (
            <p className="text-gray-700 text-sm mb-3 leading-relaxed">{review.comment}</p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              <span className="font-medium">Tenant: </span>
              {review.tenant?.name || "Anonymous"}
            </div>
            <div className="text-xs text-gray-400">
              {review.lease?.property?.name || `Property #${review.lease?.propertyId}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const LandlordProfilePage = () => {
  const { data: auth, isLoading: authLoading } = useGetAuthUserQuery();
  const userId = auth?.cognitoInfo?.userId;
  
  const { data: landlord, isLoading: landlordLoading } = useGetLandlordQuery(userId || "", {
    skip: !userId,
  });
  
  // Get landlord's properties directly
  const { data: landlordProperties, isLoading: propertiesLoading } = useGetLandlordPropertiesQuery(userId || "", {
    skip: !userId,
  });
  
  // Get all leases for calculating tenant statistics
  const { data: leases, isLoading: leasesLoading } = useGetLeasesQuery(0);
  const myPropertyLeases = useMemo(
    () => (leases || []).filter(l => l.property?.landlordCognitoId === userId),
    [leases, userId]
  );

  // Get reviews for calculating rating statistics
  const { data: landlordReviews } = useGetReviewsQuery({
    userId: userId || "",
    type: "TENANT_TO_LANDLORD"
  }, {
    skip: !userId
  });

  const [selectedLeaseId, setSelectedLeaseId] = useState<number | null>(
    myPropertyLeases?.[0]?.id ?? null
  );
  const [activeTab, setActiveTab] = useState("overview");

  const selectedLease = myPropertyLeases.find(l => l.id === selectedLeaseId);

  // Calculate profile statistics using real data
  const profileStats = useMemo(() => {
    // Total properties from landlord's properties
    const totalProperties = landlordProperties?.length || 0;
    
    // Calculate tenant statistics from leases
    const activeTenants = myPropertyLeases.filter(l => l.status === 'ACTIVE').length;
    const completedLeases = myPropertyLeases.filter(l => l.status === 'TERMINATED').length;
    const pendingTenants = myPropertyLeases.filter(l => l.status === 'PENDING_START').length;
    
    // Calculate review statistics
    const totalReviews = landlordReviews?.length || 0;
    let averageRating = 0;
    
    if (totalReviews > 0 && landlordReviews) {
      const totalRating = landlordReviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0);
      averageRating = Math.round((totalRating / totalReviews) * 10) / 10; // Round to 1 decimal place
    }
    
    // Calculate occupancy rate
    const occupancyRate = totalProperties > 0 ? Math.round((activeTenants / totalProperties) * 100) : 0;
    
    return {
      totalProperties,
      activeTenants,
      completedLeases,
      pendingTenants,
      averageRating,
      totalReviews,
      occupancyRate,
      isVerified: !!landlord?.verifiedAt
    };
  }, [landlordProperties, myPropertyLeases, landlordReviews, landlord?.verifiedAt]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getVerificationStatus = () => {
    // Check verifiedAt column - if it has a date, landlord is verified
    if (landlord?.verifiedAt) {
      return { icon: CheckCircle, color: 'text-green-600 bg-green-100', label: 'Active' };
    } else if (landlord?.nidStatus === 'PENDING' && !landlord?.rejectedAt) {
      return { icon: AlertCircle, color: 'text-yellow-600 bg-yellow-100', label: 'Pending' };
    } else if (landlord?.rejectedAt) {
      return { icon: AlertCircle, color: 'text-red-600 bg-red-100', label: 'Rejected' };
    } else {
      return { icon: AlertCircle, color: 'text-gray-600 bg-gray-100', label: 'Unverified' };
    }
  };

  const verificationStatus = getVerificationStatus();

  // Loading state
  if (authLoading || landlordLoading || leasesLoading || propertiesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100">
      <div className="container mx-auto px-4 py-6 space-y-6">
        
        {/* Profile Header Card */}
        <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-r from-teal-600 to-cyan-600">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              
              {/* Profile Avatar & Basic Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                  <AvatarImage src="/placeholder.jpg" />
                  <AvatarFallback className="text-xl font-bold bg-white text-teal-600">
                    {getInitials(landlord?.name || 'Landlord')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">
                      {landlord?.name || 'Landlord'}
                    </h1>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${verificationStatus.color}`}>
                      <verificationStatus.icon className="h-3 w-3" />
                      {verificationStatus.label}
                      {landlord?.verifiedAt && (
                        <span className="hidden sm:inline ml-1">
                          • Since {new Date(landlord.verifiedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-teal-100">
                    {landlord?.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{landlord.email}</span>
                      </div>
                    )}
                    {landlord?.phoneNumber && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{landlord.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Actions */}
              <div className="sm:ml-auto flex gap-3 w-full sm:w-auto">
                <Button variant="secondary" size="sm" className="bg-white/20 border-white/20 text-white hover:bg-white/30 flex-1 sm:flex-initial">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Properties</p>
                  <p className="text-3xl font-bold text-gray-900">{profileStats.totalProperties}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {profileStats.activeTenants} occupied • {profileStats.totalProperties - profileStats.activeTenants} vacant
                  </p>
                </div>
                <div className="p-3 bg-teal-100 rounded-xl">
                  <Building2 className="h-6 w-6 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Tenants</p>
                  <p className="text-3xl font-bold text-gray-900">{profileStats.activeTenants}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {profileStats.pendingTenants} pending • {profileStats.completedLeases} completed
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Average Rating</p>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold text-gray-900">
                      {profileStats.averageRating > 0 ? profileStats.averageRating.toFixed(1) : '--'}
                    </p>
                    {profileStats.averageRating > 0 && (
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {profileStats.totalReviews} review{profileStats.totalReviews !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Occupancy Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{profileStats.occupancyRate}%</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {profileStats.totalProperties > 0 ? 'Properties occupied' : 'No properties'}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900">Profile Management</CardTitle>
              <Badge variant="outline" className="text-xs">
                {myPropertyLeases.length} Active Lease{myPropertyLeases.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-gray-100 p-1 rounded-lg h-auto">
                <TabsTrigger 
                  value="overview" 
                  className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white px-2 py-2 text-xs sm:text-sm"
                >
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Overview</span>
                  <span className="sm:hidden">Info</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="properties" 
                  className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white px-2 py-2 text-xs sm:text-sm"
                >
                  <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Properties</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white px-2 py-2 text-xs sm:text-sm"
                >
                  <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Reviews</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="write-review" 
                  className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white px-2 py-2 text-xs sm:text-sm"
                >
                  <PenTool className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Write Review</span>
                  <span className="sm:hidden">Write</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Profile Information */}
                  <Card className="shadow-md border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-teal-600" />
                        Profile Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Full Name</label>
                          <p className="text-gray-900 font-medium">{landlord?.name || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email</label>
                          <p className="text-gray-900 font-medium">{landlord?.email || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Phone</label>
                          <p className="text-gray-900 font-medium">{landlord?.phoneNumber || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">NID Number</label>
                          <p className="text-gray-900 font-medium">{landlord?.nidNumber || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Address</label>
                          <p className="text-gray-900 font-medium">{landlord?.address || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Account Status</label>
                          <div className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium w-fit ${verificationStatus.color}`}>
                            <verificationStatus.icon className="h-3 w-3" />
                            {verificationStatus.label}
                          </div>
                          {landlord?.verifiedAt && (
                            <p className="text-xs text-gray-400 mt-1">
                              Verified on {new Date(landlord.verifiedAt).toLocaleDateString()}
                            </p>
                          )}
                          {landlord?.rejectedAt && (
                            <p className="text-xs text-red-500 mt-1">
                              Rejected on {new Date(landlord.rejectedAt).toLocaleDateString()}
                              {landlord?.adminNotes && (
                                <span className="block text-gray-600">
                                  Note: {landlord.adminNotes}
                                </span>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Business Statistics */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Business Overview</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-teal-50 rounded-lg">
                            <p className="text-2xl font-bold text-teal-600">{profileStats.totalProperties}</p>
                            <p className="text-xs text-gray-600">Properties</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">{profileStats.activeTenants}</p>
                            <p className="text-xs text-gray-600">Active Tenants</p>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 rounded-lg">
                            <p className="text-2xl font-bold text-yellow-600">{profileStats.averageRating > 0 ? profileStats.averageRating.toFixed(1) : '--'}</p>
                            <p className="text-xs text-gray-600">Avg Rating</p>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <p className="text-2xl font-bold text-purple-600">{profileStats.occupancyRate}%</p>
                            <p className="text-xs text-gray-600">Occupancy</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="shadow-md border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-teal-600" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Show recent leases activity */}
                        {myPropertyLeases.slice(0, 3).map((lease) => (
                          <div key={lease.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="p-2 bg-teal-100 rounded-lg">
                              <Building2 className="h-4 w-4 text-teal-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">
                                {lease.property?.name || `Property #${lease.property?.id}`}
                              </p>
                              <p className="text-xs text-gray-500">
                                Tenant: {lease.tenant?.name} • Started: {new Date(lease.startDate).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-400">
                                Rent: ৳{lease.rent?.toLocaleString()}/month
                              </p>
                            </div>
                            <Badge 
                              variant={lease.status === 'ACTIVE' ? 'default' : lease.status === 'PENDING_START' ? 'secondary' : 'outline'} 
                              className="text-xs"
                            >
                              {lease.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        ))}
                        
                        {/* Show properties without leases */}
                        {landlordProperties && myPropertyLeases.length < 3 && (
                          landlordProperties
                            .filter(property => !myPropertyLeases.some(lease => lease.property?.id === property.id))
                            .slice(0, 3 - myPropertyLeases.length)
                            .map((property) => (
                              <div key={property.id} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                  <Building2 className="h-4 w-4 text-yellow-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900 text-sm">
                                    {property.name || `Property #${property.id}`}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    No active lease • Available for rent
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    Price: ৳{property.pricePerMonth?.toLocaleString()}/month
                                  </p>
                                </div>
                                <Badge variant="outline" className="text-xs text-yellow-700 border-yellow-300">
                                  VACANT
                                </Badge>
                              </div>
                            ))
                        )}
                        
                        {myPropertyLeases.length === 0 && (!landlordProperties || landlordProperties.length === 0) && (
                          <div className="text-center py-8 text-gray-500">
                            <Building2 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p className="text-sm font-medium">No properties found</p>
                            <p className="text-xs text-gray-400">Add your first property to get started</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="properties" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Properties List */}
                  <div className="lg:col-span-2">
                    <Card className="shadow-md border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-teal-600" />
                          Property Portfolio ({profileStats.totalProperties})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {propertiesLoading ? (
                          <div className="space-y-3">
                            {[1,2,3].map((i) => (
                              <div key={i} className="animate-pulse bg-gray-200 h-20 rounded-md"></div>
                            ))}
                          </div>
                        ) : landlordProperties && landlordProperties.length > 0 ? (
                          <div className="space-y-4">
                            {landlordProperties.map((property) => {
                              const propertyLeases = myPropertyLeases.filter(lease => lease.property?.id === property.id);
                              const activeLeases = propertyLeases.filter(lease => lease.status === 'ACTIVE');
                              const isOccupied = activeLeases.length > 0;
                              
                              return (
                                <div key={property.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <h3 className="font-semibold text-gray-900">{property.name || property.title}</h3>
                                      <p className="text-gray-600 text-sm mt-1">{property.address}</p>
                                      <div className="flex items-center gap-4 mt-2 text-sm">
                                        <span className="flex items-center gap-1">
                                          <Bed className="h-4 w-4" />
                                          {property.beds || 0} bed
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Bath className="h-4 w-4" />
                                          {property.baths || 0} bath
                                        </span>
                                        <span className="text-green-600 font-medium">
                                          ৳{property.pricePerMonth?.toLocaleString()}/month
                                        </span>
                                      </div>
                                      
                                      {/* Tenant Information */}
                                      {isOccupied && activeLeases.length > 0 && (
                                        <div className="mt-3 p-2 bg-teal-50 rounded-md">
                                          <p className="text-xs font-medium text-teal-700">Current Tenant(s):</p>
                                          {activeLeases.map((lease) => (
                                            <div key={lease.id} className="text-xs text-teal-600">
                                              {lease.tenant?.name || 'Unknown'} • Lease until {new Date(lease.endDate).toLocaleDateString()}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-right">
                                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        isOccupied 
                                          ? 'bg-green-100 text-green-700' 
                                          : 'bg-yellow-100 text-yellow-700'
                                      }`}>
                                        {isOccupied ? 'Occupied' : 'Vacant'}
                                      </div>
                                      <p className="text-xs text-gray-500 mt-1">
                                        {activeLeases.length} active lease(s)
                                      </p>
                                      {property.averageRating > 0 && (
                                        <div className="flex items-center gap-1 mt-1 justify-end">
                                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                          <span className="text-xs text-gray-600">{property.averageRating.toFixed(1)}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>No properties found</p>
                            <p className="text-xs text-gray-400 mt-1">Add your first property to get started</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Property Statistics Sidebar */}
                  <div className="space-y-4">
                    <Card className="shadow-md border-0">
                      <CardHeader>
                        <CardTitle className="text-sm">Portfolio Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total Properties</span>
                          <span className="font-semibold">{profileStats.totalProperties}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Occupied Units</span>
                          <span className="font-semibold text-green-600">
                            {landlordProperties?.filter(p => myPropertyLeases.some(l => l.property?.id === p.id && l.status === 'ACTIVE')).length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Vacant Units</span>
                          <span className="font-semibold text-yellow-600">
                            {landlordProperties?.filter(p => !myPropertyLeases.some(l => l.property?.id === p.id && l.status === 'ACTIVE')).length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total Monthly Income</span>
                          <span className="font-semibold text-teal-600">
                            ৳{myPropertyLeases.filter(l => l.status === 'ACTIVE')
                              .reduce((sum, l) => sum + (l.rent || 0), 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Occupancy Rate</span>
                          <span className="font-semibold">{profileStats.occupancyRate}%</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Recent Property Activity */}
                    <Card className="shadow-md border-0">
                      <CardHeader>
                        <CardTitle className="text-sm">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {landlordProperties && landlordProperties.length > 0 ? (
                          <div className="space-y-3 text-sm">
                            {landlordProperties.slice(0, 3).map((property) => {
                              const propertyLeases = myPropertyLeases.filter(l => l.property?.id === property.id);
                              const isOccupied = propertyLeases.some(l => l.status === 'ACTIVE');
                              
                              return (
                                <div key={property.id} className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                    isOccupied ? 'bg-green-500' : 'bg-yellow-500'
                                  }`}></div>
                                  <div className="flex-1">
                                    <p className="text-gray-900 truncate font-medium">{property.name || property.title}</p>
                                    <p className="text-xs text-gray-500">
                                      {isOccupied ? 'Currently occupied' : 'Available for rent'}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      ৳{property.pricePerMonth?.toLocaleString()}/month
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No recent activity</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card className="shadow-md border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-teal-600" />
                        Reviews from Tenants
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <Select>
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue placeholder="Filter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Reviews</SelectItem>
                            <SelectItem value="recent">Recent</SelectItem>
                            <SelectItem value="highest">Highest Rated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {userId ? (
                      <div className="space-y-4">
                        {/* Show all tenant-to-landlord reviews */}
                        <ReviewListForLandlord userId={userId} />
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">No reviews available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="write-review" className="space-y-6">
                <Card className="shadow-md border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PenTool className="h-5 w-5 text-teal-600" />
                      Write a Review for Tenant
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {myPropertyLeases.length === 0 ? (
                      <div className="text-center py-12">
                        <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Tenants Found</h3>
                        <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                          You don&apos;t have any active tenants to review yet. Once you have tenants in your properties, you&apos;ll be able to write reviews for them here.
                        </p>
                        <Button variant="outline">
                          Manage Properties
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Tenant Selection */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Select Tenant to Review
                          </label>
                          <Select
                            value={selectedLeaseId?.toString() || ""}
                            onValueChange={(value) => setSelectedLeaseId(Number(value))}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choose a tenant lease..." />
                            </SelectTrigger>
                            <SelectContent>
                              {myPropertyLeases.map((lease) => (
                                <SelectItem key={lease.id} value={lease.id.toString()}>
                                  <div className="flex items-center justify-between w-full">
                                    <span className="font-medium">{lease.tenant?.name}</span>
                                    <span className="text-sm text-gray-500 ml-2">
                                      {lease.property?.name || `Property #${lease.property?.id}`}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <Separator />

                        {/* Selected Tenant Info */}
                        {selectedLease && (
                          <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarFallback className="bg-teal-100 text-teal-600">
                                  {getInitials(selectedLease.tenant?.name || 'T')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-gray-900">{selectedLease.tenant?.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {selectedLease.property?.name || `Property #${selectedLease.property?.id}`}
                                </p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Started: {new Date(selectedLease.startDate).toLocaleDateString()}
                                  </span>
                                  <Badge variant={selectedLease.status === 'ACTIVE' ? 'default' : 'secondary'} className="text-xs">
                                    {selectedLease.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Review Form */}
                        {selectedLeaseId && selectedLease && (
                          <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-gray-50 to-white">
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Share Your Experience</h4>
                              <p className="text-sm text-gray-600">
                                Your honest feedback helps other landlords and improves the rental experience for everyone.
                              </p>
                            </div>
                            <ReviewForm
                              leaseId={selectedLeaseId}
                              locationId={selectedLease.property?.locationId || 0}
                              type="LANDLORD_TO_TENANT"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandlordProfilePage;
