// "use client";

// import Header from "@/components/Header";
// import ReviewList from "@/components/ReviewList";
// import ReviewForm from "@/components/ReviewForm";
// import { useGetAuthUserQuery, useGetLeasesQuery } from "@/state/api";
// import React, { useMemo, useState } from "react";

// const TenantProfilePage = () => {
//   const { data: auth } = useGetAuthUserQuery();
//   const userId = auth?.cognitoInfo?.userId as string | undefined;

//   const { data: leases } = useGetLeasesQuery(0);
//   const myLeases = useMemo(() => {
//     return (leases || []).filter((l: any) => l.tenantCognitoId === userId);
//   }, [leases, userId]);

//   const [selectedLeaseId, setSelectedLeaseId] = useState<number | null>(
//     myLeases?.[0]?.id ?? null
//   );

//   return (
//     <div className="dashboard-container">
//       <Header title="My Profile" subtitle="Your reviews and ratings" />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Reviews by this tenant */}
//         <div className="bg-white rounded-xl p-6">
//           <h2 className="text-lg font-semibold mb-4">Reviews Given By Me</h2>
//           {myLeases.length > 0 && (
//             <ReviewList
//               propertyId={myLeases[0]?.propertyId}
//               type="tenant"
//             />
//           )}
//         </div>

//         {/* Write new review */}
//         <div className="bg-white rounded-xl p-6">
//           <h2 className="text-lg font-semibold mb-4">Write a Review</h2>
//           {myLeases.length === 0 ? (
//             <p className="text-sm text-gray-600">No leases found for your account.</p>
//           ) : (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm mb-1">Select Lease</label>
//                 <select
//                   className="w-full border border-gray-200 rounded-md p-2"
//                   value={selectedLeaseId ?? ""}
//                   onChange={(e) => setSelectedLeaseId(Number(e.target.value))}
//                 >
//                   {myLeases.map((l: any) => (
//                     <option key={l.id} value={l.id}>
//                       {l.property?.name || `Lease #${l.id}`}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {selectedLeaseId && (
//                 <ReviewForm
//                   leaseId={selectedLeaseId}
//                   locationId={myLeases.find((l: any) => l.id === selectedLeaseId)?.property?.locationId}
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TenantProfilePage;

"use client";

import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import ReviewList from "@/components/ReviewList";
import ReviewForm from "@/components/ReviewForm";
import { useGetAuthUserQuery, useGetLeasesQuery, useGetReviewsQuery } from "@/state/api";
import { Tenant } from "@/types/prismaTypes";
import { 
  User, 
  MapPin, 
  Calendar, 
  Star, 
  Edit3, 
  Camera, 
  Mail, 
  Phone, 
  Home, 
  CreditCard, 
  Shield, 
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Settings,
  Bell,
  Heart,
  TrendingUp,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TenantProfilePage = () => {
  const { data: auth, isLoading: authLoading, error: authError } = useGetAuthUserQuery();
  const userId = auth?.cognitoInfo?.userId;
  const tenantInfo = auth?.userInfo as Tenant;

  const { data: leases, isLoading: leasesLoading } = useGetLeasesQuery(0);
  
  // Fetch reviews for the tenant (reviews received from landlords)
  const { data: tenantReviews } = useGetReviewsQuery(
    { userId: userId, type: "LANDLORD_TO_TENANT" },
    { skip: !userId }
  );

  const myLeases = useMemo(
    () => (leases || []).filter((l: any) => l.tenantCognitoId === userId),
    [leases, userId]
  );

  // Log when data is available
  React.useEffect(() => {
    if (tenantInfo) {
      console.log('✅ Tenant Profile Data Loaded:', {
        name: tenantInfo.name,
        email: tenantInfo.email,
        phone: tenantInfo.phoneNumber,
        id: tenantInfo.id
      });
    }
    if (myLeases.length > 0) {
      console.log('✅ Leases Data Loaded:', myLeases.length, 'leases');
      console.log('🏠 First lease property structure:', myLeases[0]?.property);
    }
    if (tenantReviews) {
      console.log('⭐ Reviews Data:', tenantReviews.length, 'reviews', tenantReviews);
    }
  }, [tenantInfo, myLeases, tenantReviews]);

  const [selectedLeaseId, setSelectedLeaseId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  
  // Set the first lease as selected when leases data becomes available
  React.useEffect(() => {
    if (myLeases.length > 0 && !selectedLeaseId) {
      // Prefer active leases, then most recent lease
      const activeLease = myLeases.find(l => l.status === 'ACTIVE');
      const targetLease = activeLease || myLeases[0];
      setSelectedLeaseId(targetLease.id);
    }
  }, [myLeases, selectedLeaseId]);

  const selectedLease = myLeases.find(l => l.id === selectedLeaseId);
  
  // Calculate profile statistics
  const profileStats = useMemo(() => {
    const totalLeases = myLeases.length;
    const activeLeases = myLeases.filter(l => l.status === 'ACTIVE').length;
    const completedLeases = myLeases.filter(l => l.status === 'COMPLETED').length;
    
    // Calculate actual average rating from reviews
    const averageRating = tenantReviews && tenantReviews.length > 0 
      ? tenantReviews.reduce((sum: number, review: any) => sum + review.rating, 0) / tenantReviews.length
      : null; // No rating if no reviews
    
    // Calculate member since from oldest lease or current year
    const oldestLease = myLeases.reduce((oldest, lease) => {
      const leaseDate = new Date(lease.startDate);
      const oldestDate = new Date(oldest);
      return leaseDate < oldestDate ? lease.startDate : oldest;
    }, new Date().toISOString());
    
    const memberSince = new Date(oldestLease).getFullYear().toString();
    
    return {
      totalLeases,
      activeLeases,
      completedLeases,
      averageRating,
      memberSince,
      verificationStatus: "verified" // This should come from actual verification status
    };
  }, [myLeases, tenantReviews]);

  // Show loading state
  if (authLoading || leasesLoading) {
    return (
      <div className="dashboard-container">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-gray-600">Loading profile...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (authError || (auth && !tenantInfo)) {
    return (
      <div className="dashboard-container">
        <div className="text-center py-12">
          <XCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Profile</h2>
          <p className="text-gray-600">
            {authError ? 'Authentication error.' : 'User profile data not found.'} Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  // Show no data message if no auth data
  if (!auth || !tenantInfo) {
    return (
      <div className="dashboard-container">
        <div className="text-center py-12">
          <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Profile Data Available</h2>
          <p className="text-gray-600">Please ensure you are logged in as a tenant.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container space-y-8">
      {/* Profile Header Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Image & Basic Info */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {tenantInfo?.name?.[0]?.toUpperCase() || 'T'}
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <Camera size={16} />
              </button>
            </div>
            
            <div className="mt-4 text-center lg:text-left">
              <h1 className="text-2xl font-bold text-gray-800">
                {tenantInfo?.name || 'Tenant Name'}
              </h1>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <Mail size={16} />
                {tenantInfo?.email || 'tenant@example.com'}
              </p>
              {tenantInfo?.phoneNumber && (
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Phone size={16} />
                  {tenantInfo.phoneNumber}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  profileStats.verificationStatus === 'verified' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {profileStats.verificationStatus === 'verified' ? (
                    <CheckCircle size={14} />
                  ) : (
                    <AlertCircle size={14} />
                  )}
                  {profileStats.verificationStatus === 'verified' ? 'Verified Tenant' : 'Pending Verification'}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Statistics */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Home size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{profileStats.totalLeases}</p>
                  <p className="text-sm text-gray-600">Total Leases</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-green-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{profileStats.activeLeases}</p>
                  <p className="text-sm text-gray-600">Active</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-yellow-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star size={20} className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {profileStats.averageRating ? profileStats.averageRating.toFixed(1) : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {profileStats.averageRating ? 'Rating' : 'No Reviews'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{profileStats.memberSince}</p>
                  <p className="text-sm text-gray-600">Member Since</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6 pt-6 border-t border-blue-100">
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Edit3 size={16} />
            Edit Profile
          </Button>
          <Button variant="outline" className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
            <Settings size={16} />
            Settings
          </Button>
          <Button variant="outline" className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
            <Bell size={16} />
            Notifications
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity size={16} />
            Overview
          </TabsTrigger>
          <TabsTrigger value="leases" className="flex items-center gap-2">
            <FileText size={16} />
            My Leases
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Star size={16} />
            Reviews
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Heart size={16} />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Lease Status */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Home size={20} className="text-blue-600" />
                Current Residence
              </h3>
              {myLeases.length > 0 && selectedLease ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{selectedLease.property?.name || 'Property Name'}</h4>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin size={14} />
                        {selectedLease.property?.location?.address || 'Property Address'}
                      </p>
                      <p className={`text-sm mt-2 flex items-center gap-1 ${
                        selectedLease.status === 'ACTIVE' ? 'text-green-700' : 'text-blue-700'
                      }`}>
                        <Calendar size={14} />
                        Lease {selectedLease.status} • Expires: {new Date(selectedLease.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Monthly Rent</p>
                      <p className="text-lg font-bold text-blue-600">৳{selectedLease.property?.pricePerMonth || 'N/A'}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Security Deposit</p>
                      <p className="text-lg font-bold text-green-600">৳{selectedLease.property?.securityDeposit || 'N/A'}</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">Lease Duration</p>
                      <p className="text-lg font-bold text-purple-600">12 Months</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Home size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">
                    {myLeases.length === 0 ? 'No Lease History' : 'Loading Lease Information...'}
                  </p>
                  <p className="text-sm mt-1">
                    {myLeases.length === 0 
                      ? 'You don\'t have any rental agreements yet.' 
                      : 'Please wait while we load your lease details.'
                    }
                  </p>
                  {myLeases.length === 0 && (
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                      Browse Properties
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-green-600" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Pay Rent</p>
                    <p className="text-xs text-gray-600">Make monthly payment</p>
                  </div>
                </button>
                
                <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Submit Request</p>
                    <p className="text-xs text-gray-600">Maintenance or issues</p>
                  </div>
                </button>
                
                <button className="w-full p-3 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors duration-200 flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star size={16} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Write Review</p>
                    <p className="text-xs text-gray-600">Rate your experience</p>
                  </div>
                </button>
                
                <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Lease Renewal</p>
                    <p className="text-xs text-gray-600">Extend your stay</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Leases Tab */}
        <TabsContent value="leases" className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                My Lease History
              </h3>
              <p className="text-sm text-gray-600 mt-1">Complete history of all your rental agreements</p>
            </div>
            
            <div className="p-6">
              {myLeases.length > 0 ? (
                <div className="space-y-4">
                  {myLeases.map((lease: any) => (
                    <div key={lease.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{lease.property?.name || `Lease #${lease.id}`}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <MapPin size={14} />
                            {lease.property?.location?.address || 'Address not available'}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="flex items-center gap-1 text-gray-600">
                              <Calendar size={14} />
                              {new Date(lease.startDate).toLocaleDateString()} - {new Date(lease.endDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1 text-blue-600">
                              <CreditCard size={14} />
                              ৳{lease.property?.pricePerMonth}/month
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            lease.status === 'ACTIVE' 
                              ? 'bg-green-100 text-green-700' 
                              : lease.status === 'COMPLETED'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}>
                            {lease.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No Lease History</p>
                  <p className="text-sm mt-1">You haven&apos;t signed any leases yet.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reviews Given */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Star size={20} className="text-yellow-600" />
                  Reviews Given By Me
                </h3>
                <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                  {myLeases.length} Total
                </div>
              </div>
              {userId && selectedLease?.property?.id ? (
                <ReviewList
                  propertyId={selectedLease.property.id}
                  type="TENANT_TO_LANDLORD"
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Star size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No reviews available</p>
                </div>
              )}
            </div>

            {/* Write Review */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Edit3 size={20} className="text-green-600" />
                Write a Review
              </h3>
              {myLeases.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="font-medium">No Active Leases</p>
                  <p className="text-sm mt-1">You need an active lease to write reviews.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Property to Review</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedLeaseId ?? ""}
                      onChange={e => setSelectedLeaseId(Number(e.target.value))}
                    >
                      {myLeases.map((l: any) => (
                        <option key={l.id} value={l.id}>
                          {l.property?.name || `Lease #${l.id}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedLeaseId && selectedLease && (
                    <div className="pt-4 border-t border-gray-200">
                      <ReviewForm
                        leaseId={selectedLeaseId}
                        locationId={selectedLease.property.locationId}
                        type="TENANT_TO_LANDLORD"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Heart size={20} className="text-red-600" />
              Rental Preferences
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Budget Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number" 
                      placeholder="Min Budget" 
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input 
                      type="number" 
                      placeholder="Max Budget" 
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Areas</label>
                  <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Dhanmondi</option>
                    <option>Gulshan</option>
                    <option>Banani</option>
                    <option>Uttara</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <div className="space-y-2">
                    {['Apartment', 'House', 'Studio', 'Sublet'].map(type => (
                      <label key={type} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Save Preferences
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TenantProfilePage;
