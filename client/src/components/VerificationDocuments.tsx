import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Upload, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useGetVerificationStatusQuery, useUploadVerificationDocumentsMutation, usePreviewVerificationDocumentsMutation, useUpdateVerificationAddressMutation } from '@/state/api';
import AddressMapSelector from './AddressMapSelector';

interface VerificationDocumentsProps {
  landlordId: string;
  onUploadComplete?: () => void;
}

interface VerificationStatus {
  status: 'not_submitted' | 'pending' | 'verified' | 'rejected';
  name?: string;
  nidNumber?: string;
  address?: string;
  nidDocumentUrl?: string;
  addressProofUrl?: string;
  verifiedAt?: string;
  rejectedAt?: string;
  adminNotes?: string;
}

const VerificationDocuments: React.FC<VerificationDocumentsProps> = ({ 
  landlordId, 
  onUploadComplete 
}) => {
  const [nidFile, setNidFile] = useState<File | null>(null);
  const [addressFile, setAddressFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Address selection state
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<{
    address: string;
    latitude: number;
    longitude: number;
  } | null>(null);
  const [requiresMapSelection, setRequiresMapSelection] = useState(false);
  
  // OCR Preview state
  const [showPreview, setShowPreview] = useState(false);
  const [ocrData, setOcrData] = useState<{
    nidNumber?: string;
    name?: string;
    address?: string;
    steps?: Array<{
      step: string;
      status: 'processing' | 'completed' | 'failed';
      message: string;
      data?: any;
    }>;
    summary?: {
      totalSteps: number;
      completedSteps: number;
      failedSteps: number;
      hasResults: boolean;
    };
  }>({});
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);
  const [ocrError, setOcrError] = useState<string | null>(null);

  // RTK Query hooks
  const { 
    data: verificationStatus, 
    isLoading: statusLoading, 
    error: statusError,
    refetch: refetchStatus 
  } = useGetVerificationStatusQuery(landlordId, {
    skip: !landlordId,
  });
  
  const [uploadDocuments, { isLoading: isUploading }] = useUploadVerificationDocumentsMutation();
  const [previewDocuments, { isLoading: isPreviewLoading }] = usePreviewVerificationDocumentsMutation();
  const [updateAddress, { isLoading: isAddressUpdating }] = useUpdateVerificationAddressMutation();

  const onNidDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setNidFile(acceptedFiles[0]);
      setUploadError(null);
    }
  }, []);

  const onAddressDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setAddressFile(acceptedFiles[0]);
      setUploadError(null);
    }
  }, []);

  const nidDropzone = useDropzone({
    onDrop: onNidDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: verificationStatus?.status === 'verified'
  });

  const addressDropzone = useDropzone({
    onDrop: onAddressDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: verificationStatus?.status === 'verified'
  });

  const handlePreview = async () => {
    if (!nidFile || !addressFile) {
      setUploadError('Please upload both National ID and Utility Bill documents to proceed');
      return;
    }

    setOcrError(null);
    setIsProcessingOcr(true);
    // Always require map selection for address verification
    setRequiresMapSelection(true);

    try {
      const formData = new FormData();
      if (nidFile) {
        formData.append('nidDocument', nidFile);
      }
      if (addressFile) {
        formData.append('addressProof', addressFile);
      }

      const result = await previewDocuments({ formData }).unwrap();
      
      setOcrData({
        nidNumber: result.nidNumber,
        name: result.name,
        address: result.address,
        steps: result.steps || [],
        summary: result.summary
      });
      
      // Address selection from map is ALWAYS required
      setRequiresMapSelection(true);
      
      setShowPreview(true);
    } catch (error: any) {
      console.error('=== OCR PREVIEW ERROR ===');
      console.error('Error object:', error);
      console.error('Error data:', error?.data);
      console.error('Error message:', error?.message);
      console.error('Error status:', error?.status);
      console.error('========================');
      
      setOcrError(error?.data?.message || error?.message || 'Failed to process documents');
    } finally {
      setIsProcessingOcr(false);
    }
  };

  const handleUpload = async () => {
    if (!nidFile || !addressFile) {
      setUploadError('Please upload both National ID and Utility Bill documents to complete verification');
      return;
    }

    // Address from map is ALWAYS required
    if (!selectedAddress) {
      setUploadError('Please select your property address from the map to complete verification');
      return;
    }

    setUploadError(null);

    try {
      const formData = new FormData();
      if (nidFile) {
        formData.append('nidDocument', nidFile);
      }
      if (addressFile) {
        formData.append('addressProof', addressFile);
      }

      // Add extracted OCR data to formData to ensure everything is updated together
      if (ocrData.name) {
        formData.append('extractedName', ocrData.name);
      }
      if (ocrData.nidNumber) {
        formData.append('extractedNidNumber', ocrData.nidNumber);
      }

      await uploadDocuments({
        cognitoId: landlordId,
        formData,
        address: selectedAddress.address,
        latitude: selectedAddress.latitude,
        longitude: selectedAddress.longitude
      }).unwrap();

      // Reset files and state
      setNidFile(null);
      setAddressFile(null);
      setSelectedAddress(null);
      setShowPreview(false);
      setShowAddressSelector(false);
      setRequiresMapSelection(false);
      setOcrData({});
      
      // Refresh verification status
      refetchStatus();
      
      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error?.data?.message || 'Upload failed');
    }
  };

  const handleAddressSelect = async (addressData: { address: string; latitude: number; longitude: number }) => {
    setSelectedAddress(addressData);
    setShowAddressSelector(false);
    setUploadError(null);
    
    // Only allow standalone address updates if both documents are already uploaded and verified
    if (verificationStatus?.addressProofUrl && verificationStatus?.nidDocumentUrl && !nidFile && !addressFile) {
      try {
        await updateAddress({
          cognitoId: landlordId,
          address: addressData.address,
          latitude: addressData.latitude,
          longitude: addressData.longitude
        }).unwrap();
        
        toast.success("Address updated successfully!");
        
        // Refresh verification status
        refetchStatus();
        
        if (onUploadComplete) {
          onUploadComplete();
        }
      } catch (error: any) {
        console.error('Address update error:', error);
        toast.error(error?.data?.message || 'Failed to update address');
        setUploadError(error?.data?.message || 'Failed to update address');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 flex items-center gap-1"><CheckCircle className="w-4 h-4" />Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1"><Clock className="w-4 h-4" />Pending Review</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 flex items-center gap-1"><XCircle className="w-4 h-4" />Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 flex items-center gap-1"><AlertCircle className="w-4 h-4" />Not Submitted</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Identity Verification
            {verificationStatus && getStatusBadge(verificationStatus.status)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Information */}
          {verificationStatus?.status === 'verified' && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Your identity has been verified! You can now post properties on the platform.
              </AlertDescription>
            </Alert>
          )}

          {verificationStatus?.status === 'rejected' && (
            <Alert className="border-red-200 bg-red-50">
              <XCircle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                Your verification was rejected. {verificationStatus.adminNotes && `Reason: ${verificationStatus.adminNotes}`}
                Please upload new documents.
              </AlertDescription>
            </Alert>
          )}

          {verificationStatus?.status === 'pending' && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <Clock className="w-4 h-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Your documents are under review. This typically takes 1-2 business days.
              </AlertDescription>
            </Alert>
          )}

          {verificationStatus?.status === 'not_submitted' && (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Complete Verification Required:</strong> Upload BOTH National ID and Utility Bill documents, then select your exact property address from the map. All data (name, NID, address, coordinates, document URLs) will be updated together in the database.
              </AlertDescription>
            </Alert>
          )}

          {/* Upload Areas - only show if not verified */}
          {verificationStatus?.status !== 'verified' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NID Upload */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">National ID Card</h3>
                <div
                  {...nidDropzone.getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    nidDropzone.isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  } ${nidFile ? 'border-green-500 bg-green-50' : ''}`}
                >
                  <input {...nidDropzone.getInputProps()} />
                  {nidFile ? (
                    <div className="space-y-2">
                      <FileText className="w-8 h-8 mx-auto text-green-600" />
                      <p className="text-sm font-medium text-green-800">{nidFile.name}</p>
                      <p className="text-xs text-green-600">Ready to upload</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Drop your NID here or <span className="text-blue-600">browse</span>
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or PDF up to 10MB</p>
                    </div>
                  )}
                </div>
                {verificationStatus?.nidDocumentUrl && (
                  <p className="text-xs text-green-600">✓ Previously uploaded</p>
                )}
              </div>

              {/* Address Proof Upload */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Address Proof (Utility Bill)</h3>
                <div
                  {...addressDropzone.getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    addressDropzone.isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  } ${addressFile ? 'border-green-500 bg-green-50' : ''}`}
                >
                  <input {...addressDropzone.getInputProps()} />
                  {addressFile ? (
                    <div className="space-y-2">
                      <FileText className="w-8 h-8 mx-auto text-green-600" />
                      <p className="text-sm font-medium text-green-800">{addressFile.name}</p>
                      <p className="text-xs text-green-600">Ready to upload</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Drop your utility bill here or <span className="text-blue-600">browse</span>
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or PDF up to 10MB</p>
                    </div>
                  )}
                </div>
                {verificationStatus?.addressProofUrl && (
                  <p className="text-xs text-green-600">✓ Previously uploaded</p>
                )}
              </div>
            </div>
          )}

          {/* Extracted Information Display */}
          {verificationStatus && (verificationStatus.nidNumber || verificationStatus.address || verificationStatus.addressProofUrl) && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Verification Information</h4>
                {verificationStatus.status !== 'verified' && verificationStatus.addressProofUrl && verificationStatus.nidDocumentUrl && (
                  <Button
                    onClick={() => setShowAddressSelector(true)}
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    📍 {verificationStatus.address ? 'Update Address' : 'Select Address'}
                  </Button>
                )}
              </div>
              {verificationStatus.name && (
                <p className="text-sm">
                  <span className="font-medium">Name:</span> {verificationStatus.name}
                </p>
              )}
              {verificationStatus.nidNumber && (
                <p className="text-sm">
                  <span className="font-medium">NID Number:</span> {verificationStatus.nidNumber}
                </p>
              )}
              {verificationStatus.address ? (
                <p className="text-sm">
                  <span className="font-medium">Property Address:</span> {verificationStatus.address}
                </p>
              ) : verificationStatus.addressProofUrl ? (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-700 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span className="font-medium">Address Selection Required:</span>
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    Please select your property address from the map to complete verification
                  </p>
                </div>
              ) : null}
            </div>
          )}

          {/* Address Selection UI */}
          {showAddressSelector && (
            <AddressMapSelector
              onAddressSelect={handleAddressSelect}
              onCancel={() => setShowAddressSelector(false)}
              isLoading={isUploading}
            />
          )}

          {/* Selected Address Display */}
          {selectedAddress && !showAddressSelector && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-sm text-green-800 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Selected Property Address
              </h4>
              <p className="text-sm text-green-700">{selectedAddress.address}</p>
              <p className="text-xs text-green-600 mt-1">
                Coordinates: {selectedAddress.latitude.toFixed(6)}, {selectedAddress.longitude.toFixed(6)}
              </p>
              <Button
                onClick={() => setShowAddressSelector(true)}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Change Address
              </Button>
            </div>
          )}

          {/* OCR Preview Section */}
          {showPreview && !showAddressSelector && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-sm text-blue-800 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Step-by-Step OCR Results - Please Review
              </h4>

              {/* Processing Steps */}
              {ocrData.steps && ocrData.steps.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-medium text-xs text-blue-700 mb-2">Processing Steps:</h5>
                  <div className="space-y-2">
                    {ocrData.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${
                          step.status === 'completed' ? 'bg-green-500' :
                          step.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className={`text-xs font-medium ${
                            step.status === 'completed' ? 'text-green-700' :
                            step.status === 'failed' ? 'text-red-700' : 'text-yellow-700'
                          }`}>
                            Step {index + 1}: {step.step === 'nid_scan' ? 'NID Document Scan' : 'Utilities Bill Scan'}
                          </div>
                          <div className="text-xs text-gray-600">{step.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extracted Data */}
              <div className="space-y-2">
                <h5 className="font-medium text-xs text-blue-700 mb-2">Extracted Information:</h5>
                {ocrData.name && (
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">Name:</span>
                    <span className="text-sm bg-white px-2 py-1 rounded max-w-xs text-right">{ocrData.name}</span>
                  </div>
                )}
                {ocrData.nidNumber && (
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">NID Number:</span>
                    <span className="text-sm bg-white px-2 py-1 rounded max-w-xs text-right">{ocrData.nidNumber}</span>
                  </div>
                )}
                {ocrData.address && (
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">Address:</span>
                    <span className="text-sm bg-white px-2 py-1 rounded max-w-xs text-right">{ocrData.address}</span>
                  </div>
                )}

                {/* Summary */}
                {ocrData.summary && (
                  <div className="mt-3 p-2 bg-white rounded border">
                    <div className="text-xs text-gray-600">
                      Summary: {ocrData.summary.completedSteps} of {ocrData.summary.totalSteps} steps completed
                      {ocrData.summary.failedSteps > 0 && `, ${ocrData.summary.failedSteps} failed`}
                    </div>
                  </div>
                )}

                {!ocrData.name && !ocrData.nidNumber && !ocrData.address && (
                  <Alert className="border-amber-200 bg-amber-50">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      No data could be extracted from the documents. Please ensure the documents are clear and readable.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          )}

          {/* Upload Error */}
          {uploadError && (
            <Alert className="border-red-200 bg-red-50">
              <XCircle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {uploadError}
              </AlertDescription>
            </Alert>
          )}

          {/* OCR Error */}
          {ocrError && (
            <Alert className="border-red-200 bg-red-50">
              <XCircle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {ocrError}
              </AlertDescription>
            </Alert>
          )}

          {/* Document Requirement Warning */}
          {verificationStatus?.status !== 'verified' && (nidFile || addressFile) && !(nidFile && addressFile) && !showAddressSelector && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Both National ID and Utility Bill are required for verification. Please upload the missing document to continue.
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          {verificationStatus?.status !== 'verified' && (nidFile && addressFile) && !showAddressSelector && (
            <div className="space-y-3">
              {!showPreview ? (
                <Button 
                  onClick={handlePreview} 
                  disabled={isProcessingOcr}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  variant="default"
                >
                  {isProcessingOcr ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Documents...
                    </div>
                  ) : (
                    'Preview & Verify Information'
                  )}
                </Button>
              ) : (
                <div className="space-y-3">
                  {/* Address Selection Required */}
                  {!selectedAddress && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Address Selection Required:</strong> Please select your exact property location from the map. This ensures all verification data (name, NID, address, document URLs) are updated together in the database.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => {
                        setShowPreview(false);
                        setOcrData({});
                        setOcrError(null);
                        setRequiresMapSelection(false);
                        setSelectedAddress(null);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      ← Back to Edit
                    </Button>
                    
                    {!selectedAddress ? (
                      <Button 
                        onClick={() => setShowAddressSelector(true)}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                      >
                        📍 Select Address from Map (Required)
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleUpload} 
                        disabled={isUploading || !selectedAddress}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        {isUploading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Uploading All Verification Data...
                          </div>
                        ) : (
                          '✓ Upload Complete Verification Package'
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationDocuments;