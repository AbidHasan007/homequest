'use client';

import React from 'react';
import VerificationDocuments from '@/components/VerificationDocuments';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGetAuthUserQuery } from '@/state/api';

const VerifyLandlordPage = () => {
  const { data: authUser, isLoading, error } = useGetAuthUserQuery();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Error loading user information. Please try refreshing the page.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!authUser) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>Please log in to access verification.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Landlord Identity Verification
          </h1>
          <p className="text-gray-600">
            Complete your identity verification to start posting properties on our platform.
            This process helps ensure the safety and security of all users.
          </p>
        </div>
        
        <VerificationDocuments 
          landlordId={authUser.cognitoInfo?.userId || ''} 
          onUploadComplete={() => {
            console.log('Verification documents uploaded successfully');
          }}
        />
      </div>
    </div>
  );
};

export default VerifyLandlordPage;