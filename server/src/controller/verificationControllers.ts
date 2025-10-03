import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ocrService } from '../services/ocrService';
import fs from 'fs';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

const resolveS3Location = (key: string, location?: string) => {
  if (location) return location;
  const bucket = process.env.S3_BUCKET_NAME;
  const region = process.env.AWS_REGION || 'us-east-1';
  if (!bucket) {
    throw new Error('S3_BUCKET_NAME is not configured');
  }
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

const uploadVerificationFileToS3 = async (file: Express.Multer.File, keyPrefix: string) => {
  const bucketName = process.env.S3_BUCKET_NAME;
  if (!bucketName) {
    throw new Error('S3 bucket name not configured');
  }

  const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const key = `${keyPrefix}/${Date.now()}-${sanitizedOriginalName}`;

  const uploadResult = await new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: key,
      Body: fs.createReadStream(file.path),
      ContentType: file.mimetype,
    }
  }).done();

  return {
    key,
    location: resolveS3Location(key, (uploadResult as any)?.Location)
  };
};

const removeLocalFile = async (filePath: string) => {
  if (!filePath) return;
  try {
    await fs.promises.unlink(filePath);
  } catch (error: any) {
    if (error?.code !== 'ENOENT') {
      console.warn('Failed to remove local file after upload:', filePath, error);
    }
  }
};

// Upload NID and utility bill documents
export const uploadVerificationDocuments = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('=== UPLOAD VERIFICATION DOCUMENTS ===');
    console.log('User:', req.user);
    console.log('CognitoId from params:', req.params.cognitoId);
    console.log('Files:', req.files);
    console.log('Body:', req.body);
    
    const { cognitoId } = req.params;
    const { address, latitude, longitude, extractedName, extractedNidNumber } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!files || !files.nidDocument || !files.addressProof) {
      console.log('Both documents required');
      res.status(400).json({ 
        success: false, 
        message: 'Both NID document and address proof are required' 
      });
      return;
    }

    // Address selection from map is now required
    if (!address || !latitude || !longitude) {
      console.log('Address and coordinates required');
      res.status(400).json({ 
        success: false, 
        message: 'Address and coordinates from map selection are required' 
      });
      return;
    }

    // Find the landlord
    const landlord = await prisma.landlord.findUnique({
      where: { cognitoId }
    });

    if (!landlord) {
      res.status(404).json({ 
        success: false, 
        message: 'Landlord not found' 
      });
      return;
    }

    let updateData: any = {};

    // Process NID document
    if (files.nidDocument && files.nidDocument[0]) {
      const nidFile = files.nidDocument[0];
      try {
        const { location } = await uploadVerificationFileToS3(
          nidFile,
          `verification/${cognitoId}/nid`
        );
        updateData.nidDocumentUrl = location;
        console.log('✅ NID document uploaded to S3:', location);
      } catch (uploadError) {
        console.error('Failed to upload NID document to S3:', uploadError);
        res.status(500).json({
          success: false,
          message: 'Failed to upload NID document. Please try again.'
        });
        await removeLocalFile(nidFile.path);
        return;
      }

      // Use extracted data from frontend OCR processing
      if (extractedNidNumber) {
        updateData.nidNumber = extractedNidNumber;
        console.log('Using extracted NID number:', extractedNidNumber);
      }
      if (extractedName) {
        updateData.name = extractedName;
        console.log('Using extracted name:', extractedName);
      }

      // Fallback: Perform OCR on NID if no extracted data
      if (!extractedNidNumber || !extractedName) {
        try {
          const ocrResult = await ocrService.extractNIDData(nidFile.path);
          if (ocrResult.nidNumber && !extractedNidNumber) {
            updateData.nidNumber = ocrResult.nidNumber;
          }
          if (ocrResult.name && !extractedName) {
            updateData.name = ocrResult.name;
          }
        } catch (ocrError) {
          console.error('OCR processing failed:', ocrError);
          // Continue with upload even if OCR fails
        }
      }

      await removeLocalFile(nidFile.path);
    }

    // Process address proof document
    if (files.addressProof && files.addressProof[0]) {
      const addressFile = files.addressProof[0];
      try {
        const { location } = await uploadVerificationFileToS3(
          addressFile,
          `verification/${cognitoId}/address`
        );
        updateData.addressProofUrl = location;
        console.log('✅ Address proof uploaded to S3:', location);
      } catch (uploadError) {
        console.error('Failed to upload address proof to S3:', uploadError);
        res.status(500).json({
          success: false,
          message: 'Failed to upload address proof document. Please try again.'
        });
        await removeLocalFile(addressFile.path);
        return;
      }

      // Set address and coordinates from map selection
      updateData.address = address;
      updateData.latitude = parseFloat(latitude);
      updateData.longitude = parseFloat(longitude);
      console.log('✅ Setting address from map selection:', address);
      console.log('✅ Setting coordinates:', latitude, longitude);

      await removeLocalFile(addressFile.path);
    }

    // Reset verification status
    updateData.verifiedAt = null;
    updateData.rejectedAt = null;
    updateData.adminNotes = null;

    // Update landlord with document URLs and extracted data
    const updatedLandlord = await prisma.landlord.update({
      where: { cognitoId },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Complete verification package uploaded successfully',
      data: {
        name: updatedLandlord.name,
        nidNumber: updatedLandlord.nidNumber,
        address: updatedLandlord.address,
        latitude: updatedLandlord.latitude,
        longitude: updatedLandlord.longitude,
        nidDocumentUrl: updatedLandlord.nidDocumentUrl,
        addressProofUrl: updatedLandlord.addressProofUrl
      }
    });

  } catch (error) {
    console.error('Error uploading verification documents:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// Get verification status
export const getVerificationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('=== GET VERIFICATION STATUS ===');
    console.log('User:', req.user);
    console.log('CognitoId from params:', req.params.cognitoId);
    
    const { cognitoId } = req.params;

    const landlord = await prisma.landlord.findUnique({
      where: { cognitoId },
      select: {
        name: true,
        nidNumber: true,
        address: true,
        latitude: true,
        longitude: true,
        nidDocumentUrl: true,
        addressProofUrl: true,
        verifiedAt: true,
        rejectedAt: true,
        adminNotes: true
      }
    });

    console.log('Found landlord:', landlord);

    if (!landlord) {
      res.status(404).json({ 
        success: false, 
        message: 'Landlord not found' 
      });
      return;
    }

    let status = 'pending';
    if (landlord.verifiedAt) {
      status = 'verified';
    } else if (landlord.rejectedAt) {
      status = 'rejected';
    } else if (!landlord.nidDocumentUrl && !landlord.addressProofUrl) {
      status = 'not_submitted';
    }

    res.json({
      success: true,
      data: {
        status,
        name: landlord.name,
        nidNumber: landlord.nidNumber,
        address: landlord.address,
        latitude: landlord.latitude,
        longitude: landlord.longitude,
        nidDocumentUrl: landlord.nidDocumentUrl,
        addressProofUrl: landlord.addressProofUrl,
        verifiedAt: landlord.verifiedAt,
        rejectedAt: landlord.rejectedAt,
        adminNotes: landlord.adminNotes
      }
    });

  } catch (error) {
    console.error('Error getting verification status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// Admin: Get all pending verifications
export const getPendingVerifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const pendingLandlords = await prisma.landlord.findMany({
      where: {
        OR: [
          { nidDocumentUrl: { not: null } },
          { addressProofUrl: { not: null } }
        ],
        verifiedAt: null,
        rejectedAt: null
      },
      select: {
        cognitoId: true,
        name: true,
        email: true,
        phoneNumber: true,
        nidNumber: true,
        address: true,
        nidDocumentUrl: true,
        addressProofUrl: true
      }
    });

    res.json({
      success: true,
      data: pendingLandlords
    });

  } catch (error) {
    console.error('Error getting pending verifications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// Admin: Approve verification
export const approveVerification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { adminNotes } = req.body;

    const updatedLandlord = await prisma.landlord.update({
      where: { cognitoId },
      data: {
        verifiedAt: new Date(),
        rejectedAt: null,
        adminNotes: adminNotes || 'Verification approved'
      }
    });

    res.json({
      success: true,
      message: 'Verification approved successfully',
      data: {
        cognitoId: updatedLandlord.cognitoId,
        verifiedAt: updatedLandlord.verifiedAt,
        adminNotes: updatedLandlord.adminNotes
      }
    });

  } catch (error) {
    console.error('Error approving verification:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// Admin: Reject verification
export const rejectVerification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { adminNotes } = req.body;

    if (!adminNotes) {
      res.status(400).json({ 
        success: false, 
        message: 'Admin notes are required for rejection' 
      });
      return;
    }

    const updatedLandlord = await prisma.landlord.update({
      where: { cognitoId },
      data: {
        verifiedAt: null,
        rejectedAt: new Date(),
        adminNotes
      }
    });

    res.json({
      success: true,
      message: 'Verification rejected',
      data: {
        cognitoId: updatedLandlord.cognitoId,
        rejectedAt: updatedLandlord.rejectedAt,
        adminNotes: updatedLandlord.adminNotes
      }
    });

  } catch (error) {
    console.error('Error rejecting verification:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// Admin: Get all verifications (approved and rejected)
export const getAllVerifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    let whereClause: any = {
      OR: [
        { nidDocumentUrl: { not: null } },
        { addressProofUrl: { not: null } }
      ]
    };

    if (status === 'verified') {
      whereClause.verifiedAt = { not: null };
    } else if (status === 'rejected') {
      whereClause.rejectedAt = { not: null };
    } else if (status === 'pending') {
      whereClause.verifiedAt = null;
      whereClause.rejectedAt = null;
    }

    const [landlords, total] = await Promise.all([
      prisma.landlord.findMany({
        where: whereClause,
        select: {
          cognitoId: true,
          name: true,
          email: true,
          phoneNumber: true,
          nidNumber: true,
          address: true,
          nidDocumentUrl: true,
          addressProofUrl: true,
          verifiedAt: true,
          rejectedAt: true,
          adminNotes: true
        },
        skip,
        take: limitNum,
        orderBy: { id: 'desc' }
      }),
      prisma.landlord.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      data: {
        landlords,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });

  } catch (error) {
    console.error('Error getting all verifications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// Preview verification documents with OCR (no database save) - Step by step processing
// Update landlord address with coordinates
export const updateVerificationAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('=== UPDATE VERIFICATION ADDRESS ===');
    console.log('CognitoId from params:', req.params.cognitoId);
    console.log('Body:', req.body);
    
    const { cognitoId } = req.params;
    const { address, latitude, longitude } = req.body;

    if (!address || latitude === undefined || longitude === undefined) {
      res.status(400).json({ 
        success: false, 
        message: 'Address, latitude, and longitude are required' 
      });
      return;
    }

    // Find the landlord
    const landlord = await prisma.landlord.findUnique({
      where: { cognitoId }
    });

    if (!landlord) {
      res.status(404).json({ 
        success: false, 
        message: 'Landlord not found' 
      });
      return;
    }

    // Update address and coordinates
    const updatedLandlord = await prisma.landlord.update({
      where: { cognitoId },
      data: {
        address,
        latitude: parseFloat(latitude.toString()),
        longitude: parseFloat(longitude.toString()),
      }
    });

    console.log('✅ Address updated successfully');

    res.json({ 
      success: true, 
      message: 'Address updated successfully',
      data: {
        address: updatedLandlord.address,
        latitude: updatedLandlord.latitude,
        longitude: updatedLandlord.longitude
      }
    });

  } catch (error: any) {
    console.error('=== UPDATE ADDRESS ERROR ===');
    console.error('Error:', error);
    console.error('=============================');
    
    res.status(500).json({ 
      success: false, 
      message: `Failed to update address: ${error?.message || 'Unknown error'}` 
    });
  }
};

export const previewVerificationDocuments = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('=== STEP-BY-STEP PREVIEW VERIFICATION DOCUMENTS ===');
    console.log('Files received:', req.files);

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!files || (!files.nidDocument && !files.addressProof)) {
      res.status(400).json({ 
        success: false, 
        message: 'At least one document (NID or address proof) is required' 
      });
      return;
    }

    let extractedData = {
      name: null as string | null,
      nidNumber: null as string | null,
      address: null as string | null,
      steps: [] as Array<{
        step: string;
        status: 'processing' | 'completed' | 'failed';
        message: string;
        data?: any;
      }>
    };

    // STEP 1: Process NID document for name and NID number
    if (files.nidDocument && files.nidDocument[0]) {
      const nidFile = files.nidDocument[0];
      console.log('=== STEP 1: SCANNING NID DOCUMENT ===');
      console.log('NID file details:', {
        originalname: nidFile.originalname,
        mimetype: nidFile.mimetype,
        size: nidFile.size,
        path: nidFile.path
      });

      extractedData.steps.push({
        step: 'nid_scan',
        status: 'processing',
        message: 'Scanning NID document for name and NID number...'
      });
      
      try {
        console.log('Starting NID OCR processing for name and NID number...');
        const nidData = await ocrService.extractNIDData(nidFile.path);
        
        extractedData.name = nidData.name || null;
        extractedData.nidNumber = nidData.nidNumber || null;
        
        console.log('✅ NID extraction completed:', nidData);
        
        const stepIndex = extractedData.steps.length - 1;
        const defaultMessage = `NID scan completed. Found: ${nidData.name ? 'Name' : 'No name'}, ${nidData.nidNumber ? 'NID Number' : 'No NID number'}`;
  const invalidMessage = 'nid not valid please reupload fresh nid front part';

        extractedData.steps[stepIndex] = {
          step: 'nid_scan',
          status: nidData.isValid ? 'completed' : 'failed',
          message: nidData.isValid ? defaultMessage : invalidMessage,
          data: {
            ...nidData
          }
        };

        if (!nidData.isValid) {
          extractedData.name = null;
          extractedData.nidNumber = null;
        } else if (!nidData.name && !nidData.nidNumber) {
          extractedData.steps[stepIndex].status = 'failed';
          extractedData.steps[stepIndex].message = 'No readable text found in NID document. Please ensure the document is clear and readable.';
        }

      } catch (ocrError: any) {
        console.error('❌ NID OCR ERROR:', ocrError?.message);
        extractedData.steps[extractedData.steps.length - 1] = {
          step: 'nid_scan',
          status: 'failed',
          message: `NID scan failed: ${ocrError?.message || 'Unknown error'}`
        };
      }

      console.log('=== END STEP 1 ===\n');
    }

    // STEP 2: Process address proof for address
    if (files.addressProof && files.addressProof[0]) {
      const addressFile = files.addressProof[0];
      console.log('=== STEP 2: SCANNING UTILITIES BILL ===');
      console.log('Address file details:', {
        originalname: addressFile.originalname,
        mimetype: addressFile.mimetype,
        size: addressFile.size,
        path: addressFile.path
      });

      extractedData.steps.push({
        step: 'address_verification',
        status: 'processing',
        message: 'Verifying utilities bill document...'
      });
      
      try {
        console.log('Verifying utilities bill document...');
        // Only verify the document is valid, don't extract address
        await ocrService.extractAddressData(addressFile.path);
        
        // Address will be null - will be provided via map selection
        extractedData.address = null;
        
        console.log('✅ Utility bill verified. Address will be selected from map.');
        
        extractedData.steps[extractedData.steps.length - 1] = {
          step: 'address_verification',
          status: 'completed',
          message: 'Utilities bill verified. Please select property address from map to continue.',
          data: {
            requiresMapSelection: true,
            message: 'Landlord must select address from map with coordinates for accurate location search'
          }
        };

      } catch (verificationError: any) {
        console.error('❌ UTILITY BILL VERIFICATION ERROR:', verificationError?.message);
        extractedData.steps[extractedData.steps.length - 1] = {
          step: 'address_verification',
          status: 'failed',
          message: `Utilities bill verification failed: ${verificationError?.message || 'Unknown error'}`
        };
      }

      console.log('=== END STEP 2 ===\n');
    }

    // Clean up uploaded files (since this is just preview)
    if (files.nidDocument && files.nidDocument[0]) {
      try {
        fs.unlinkSync(files.nidDocument[0].path);
      } catch (cleanupError) {
        console.error('Error cleaning up NID file:', cleanupError);
      }
    }
    if (files.addressProof && files.addressProof[0]) {
      try {
        fs.unlinkSync(files.addressProof[0].path);
      } catch (cleanupError) {
        console.error('Error cleaning up address file:', cleanupError);
      }
    }

    console.log('=== FINAL PREVIEW RESULTS ===');
    console.log('Extracted data:', {
      name: extractedData.name,
      nidNumber: extractedData.nidNumber,
      address: extractedData.address
    });
    console.log('Processing steps:', extractedData.steps);
    console.log('=============================');

    // Check if any processing was successful
    const hasResults = extractedData.name || extractedData.nidNumber || extractedData.address;
    const completedSteps = extractedData.steps.filter(step => step.status === 'completed').length;
    const failedSteps = extractedData.steps.filter(step => step.status === 'failed').length;

    res.json({
      success: true,
      message: `Processing completed: ${completedSteps} successful, ${failedSteps} failed`,
      name: extractedData.name,
      nidNumber: extractedData.nidNumber,
      address: extractedData.address,
      steps: extractedData.steps,
      summary: {
        totalSteps: extractedData.steps.length,
        completedSteps,
        failedSteps,
        hasResults
      }
    });

  } catch (error: any) {
    console.error('=== PREVIEW ERROR ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error?.message);
    console.error('Full error:', error);
    console.error('==================');
    
    res.status(500).json({ 
      success: false, 
      message: `Preview failed: ${error?.message || 'Unknown error'}` 
    });
  }
};