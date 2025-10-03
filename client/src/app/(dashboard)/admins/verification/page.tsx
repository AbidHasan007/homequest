'use client';

import React from 'react';
import AdminVerificationManagement from '@/components/AdminVerificationManagement';

const AdminVerificationPage = () => {
  // In a real app, you'd check if the user is actually an admin
  // For now, we'll assume they are if they're on this page
  const isAdmin = true;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Verification Management
        </h1>
        <p className="text-gray-600">
          Review and manage landlord identity verification requests.
        </p>
      </div>
      
      <AdminVerificationManagement isAdmin={isAdmin} />
    </div>
  );
};

export default AdminVerificationPage;