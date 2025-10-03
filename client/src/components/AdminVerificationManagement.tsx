import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  FileText, 
  User, 
  MapPin, 
  Phone, 
  Mail 
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useGetPendingVerificationsQuery, useApproveVerificationMutation, useRejectVerificationMutation } from '@/state/api';

interface LandlordVerification {
  cognitoId: string;
  name: string;
  email: string;
  phoneNumber: string;
  nidNumber?: string;
  address?: string;
  nidDocumentUrl?: string;
  addressProofUrl?: string;
  verifiedAt?: string;
  rejectedAt?: string;
  adminNotes?: string;
}

interface AdminVerificationManagementProps {
  isAdmin: boolean;
}

const AdminVerificationManagement: React.FC<AdminVerificationManagementProps> = ({ isAdmin }) => {
  const [selectedLandlord, setSelectedLandlord] = useState<LandlordVerification | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  // RTK Query hooks
  const { 
    data: pendingVerifications = [], 
    isLoading, 
    error: fetchError 
  } = useGetPendingVerificationsQuery(undefined, {
    skip: !isAdmin,
  });
  
  const [approveVerification, { isLoading: approveLoading }] = useApproveVerificationMutation();
  const [rejectVerification, { isLoading: rejectLoading }] = useRejectVerificationMutation();
  
  const actionLoading = approveLoading || rejectLoading;

  const handleApprove = async (cognitoId: string) => {
    try {
      await approveVerification({
        cognitoId,
        adminNotes: adminNotes || undefined
      }).unwrap();

      setSelectedLandlord(null);
      setAdminNotes('');
      setError(null);
    } catch (error: any) {
      console.error('Approve error:', error);
      setError(error?.data?.message || 'Failed to approve verification');
    }
  };

  const handleReject = async (cognitoId: string) => {
    if (!adminNotes.trim()) {
      setError('Please provide a reason for rejection');
      return;
    }

    try {
      await rejectVerification({
        cognitoId,
        adminNotes
      }).unwrap();

      setSelectedLandlord(null);
      setAdminNotes('');
      setError(null);
    } catch (error: any) {
      console.error('Reject error:', error);
      setError(error?.data?.message || 'Failed to reject verification');
    }
  };

  const openDocument = (url: string) => {
    window.open(url, '_blank');
  };

  if (!isAdmin) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <XCircle className="w-4 h-4 text-red-600" />
        <AlertDescription className="text-red-800">
          Access denied. Admin privileges required.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Clock className="w-8 h-8 mx-auto mb-2 animate-spin text-gray-400" />
          <p className="text-gray-600">Loading verifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Verification Management
            <Badge className="bg-blue-100 text-blue-800">
              {pendingVerifications.length} Pending
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="border-red-200 bg-red-50 mb-4">
              <XCircle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {pendingVerifications.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">All Caught Up!</h3>
              <p className="text-gray-600">No pending verifications at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Landlord List */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Pending Verifications</h3>
                {pendingVerifications.map((landlord) => (
                  <Card 
                    key={landlord.cognitoId} 
                    className={`cursor-pointer transition-colors ${
                      selectedLandlord?.cognitoId === landlord.cognitoId 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedLandlord(landlord)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-semibold">{landlord.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-3 h-3" />
                            <span>{landlord.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span>{landlord.phoneNumber}</span>
                          </div>
                          {landlord.address && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-3 h-3" />
                              <span>{landlord.address}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {landlord.nidDocumentUrl && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              NID
                            </Badge>
                          )}
                          {landlord.addressProofUrl && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              Address
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Verification Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Verification Details</h3>
                {selectedLandlord ? (
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      {/* Landlord Info */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Landlord Information</h4>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div><span className="font-medium">Name:</span> {selectedLandlord.name}</div>
                          <div><span className="font-medium">Email:</span> {selectedLandlord.email}</div>
                          <div><span className="font-medium">Phone:</span> {selectedLandlord.phoneNumber}</div>
                          {selectedLandlord.nidNumber && (
                            <div><span className="font-medium">NID Number:</span> {selectedLandlord.nidNumber}</div>
                          )}
                          {selectedLandlord.address && (
                            <div><span className="font-medium">Address:</span> {selectedLandlord.address}</div>
                          )}
                        </div>
                      </div>

                      {/* Documents */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Uploaded Documents</h4>
                        <div className="space-y-2">
                          {selectedLandlord.nidDocumentUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openDocument(selectedLandlord.nidDocumentUrl!)}
                              className="w-full justify-start"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              View National ID
                              <Eye className="w-4 h-4 ml-auto" />
                            </Button>
                          )}
                          {selectedLandlord.addressProofUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openDocument(selectedLandlord.addressProofUrl!)}
                              className="w-full justify-start"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              View Address Proof
                              <Eye className="w-4 h-4 ml-auto" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Admin Notes */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Admin Notes</h4>
                        <Textarea
                          placeholder="Add notes about this verification (required for rejection)..."
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                          className="min-h-20"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleApprove(selectedLandlord.cognitoId)}
                          disabled={actionLoading}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {actionLoading ? 'Processing...' : 'Approve'}
                        </Button>
                        <Button
                          onClick={() => handleReject(selectedLandlord.cognitoId)}
                          disabled={actionLoading || !adminNotes.trim()}
                          variant="destructive"
                          className="flex-1"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          {actionLoading ? 'Processing...' : 'Reject'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center text-gray-500">
                      Select a landlord from the list to view verification details
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVerificationManagement;