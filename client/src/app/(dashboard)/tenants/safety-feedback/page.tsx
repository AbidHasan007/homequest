"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Shield, Plus, Clock, Star } from 'lucide-react';
import SafetyReviewForm from '@/components/SafetyReviewForm';
import { useGetAuthUserQuery, useGetLeasesQuery, useGetTenantSafetyReviewsQuery } from '@/state/api';

const SafetyFeedbackPage = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const { data: authUser } = useGetAuthUserQuery();
  const { data: allLeases, isLoading: loadingLeases } = useGetLeasesQuery(0);
  
  // Filter to get only the current user's leases
  const residences = useMemo(() => {
    if (!allLeases || !authUser?.cognitoInfo?.userId) return [];
    return allLeases.filter((lease: any) => lease.tenantCognitoId === authUser.cognitoInfo.userId);
  }, [allLeases, authUser?.cognitoInfo?.userId]);
  
  const loadingResidences = loadingLeases;
  const { data: myReviews, isLoading: loadingReviews } = useGetTenantSafetyReviewsQuery();

  const handleLocationSelect = (lease: any) => {
    const location = lease?.property?.location;
    const locationId = location?.id || lease?.property?.locationId;
    
    if (!locationId) {
      console.error('Cannot select location: lease property location data is incomplete', {
        lease,
        property: lease?.property,
        location: lease?.property?.location
      });
      return;
    }
    
    const address = location?.address || lease?.property?.address || 'Unknown Address';
    const city = location?.city || lease?.property?.city || 'Unknown City';
    const state = location?.state || lease?.property?.state || 'Unknown State';
    
    setSelectedLocation({
      id: locationId,
      address: `${address}, ${city}, ${state}`,
      lease: lease
    });
    setShowForm(true);
  };

  const handleFormSubmit = (success: boolean) => {
    if (success) {
      setShowForm(false);
      setSelectedLocation(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (showForm && selectedLocation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Submit Safety Feedback</h1>
          <Button 
            variant="outline" 
            onClick={() => {
              setShowForm(false);
              setSelectedLocation(null);
            }}
          >
            ← Back to Locations
          </Button>
        </div>
        <SafetyReviewForm
          locationId={selectedLocation.id}
          locationAddress={selectedLocation.address}
          onSubmit={handleFormSubmit}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Shield className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold">Safety Feedback</h1>
          <p className="text-gray-600">Help make our community safer by sharing your experiences</p>
        </div>
      </div>

      {/* Your Residences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Your Residential Areas</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            You can provide safety feedback for areas where you have lived
          </p>
        </CardHeader>
        <CardContent>
          {loadingResidences ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : residences && residences.length > 0 ? (
            <div className="space-y-4">
              {residences.map((lease: any) => {
                // Add safety checks for the lease data structure
                if (!lease?.property) {
                  console.warn('Lease missing property data:', lease);
                  return null;
                }



                const hasReviewed = myReviews?.some(
                  (review) => review.locationId === lease.property?.locationId
                );

                return (
                  <div
                    key={lease.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">
                          {lease.property?.location?.address || lease.property?.address || 'Address not available'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {lease.property?.location?.city || lease.property?.city || 'City not available'}, {lease.property?.location?.state || lease.property?.state || 'State not available'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Lease: {formatDate(lease.startDate)} - {formatDate(lease.endDate)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {hasReviewed ? (
                        <div className="flex items-center space-x-2 text-green-600">
                          <Shield className="w-4 h-4" />
                          <span className="text-sm font-medium">Reviewed</span>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleLocationSelect(lease)}
                          size="sm"
                          className="flex items-center space-x-1"
                          disabled={!lease.property?.location?.id && !lease.property?.locationId}
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Feedback</span>
                        </Button>
                      )}
                    </div>
                  </div>
                );
              }).filter(Boolean)}
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No residential history found</p>
              <p className="text-sm text-gray-500 mt-1">
                You need to have a lease to provide safety feedback
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Your Previous Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Your Safety Reviews</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingReviews ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : myReviews && myReviews.length > 0 ? (
            <div className="space-y-4">
              {myReviews.map((review: any) => (
                <div key={review.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">
                          {review.location.address}, {review.location.city}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">
                          ({review.rating}/5)
                        </span>
                      </div>
                      {review.comment && !review.comment.startsWith('[SAFETY_REVIEW]') && (
                        <p className="text-gray-700 text-sm mt-2">
                          {review.comment.replace('[SAFETY_REVIEW] ', '')}
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No safety reviews yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Submit feedback for areas where you have lived
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyFeedbackPage;