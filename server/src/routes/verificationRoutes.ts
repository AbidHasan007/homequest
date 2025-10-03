import express from 'express';
import multer from 'multer';
import path from 'path';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  uploadVerificationDocuments,
  getVerificationStatus,
  getPendingVerifications,
  approveVerification,
  rejectVerification,
  getAllVerifications,
  previewVerificationDocuments
} from '../controller/verificationControllers';
import { updateVerificationAddress } from '../controller/addressUpdateController';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads', 'verification');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  // Accept images and PDFs
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only images and PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 2 // Maximum 2 files (NID + address proof)
  }
});

// OCR Preview route (no auth required for preview)
router.post(
  '/preview',
  upload.fields([
    { name: 'nidDocument', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 }
  ]),
  previewVerificationDocuments
);

// Landlord routes
router.post(
  '/upload/:cognitoId',
  authMiddleware(['landlord']),
  upload.fields([
    { name: 'nidDocument', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 }
  ]),
  uploadVerificationDocuments
);

router.get('/status/:cognitoId', authMiddleware(['landlord', 'admin']), getVerificationStatus);

// Update address with coordinates
router.put('/address/:cognitoId', authMiddleware(['landlord']), updateVerificationAddress);

// Admin routes
router.get('/admin/pending', authMiddleware(['admin']), getPendingVerifications);
router.get('/admin/all', authMiddleware(['admin']), getAllVerifications);
router.post('/admin/approve/:cognitoId', authMiddleware(['admin']), approveVerification);
router.post('/admin/reject/:cognitoId', authMiddleware(['admin']), rejectVerification);

// Error handling middleware for multer
router.use((error: any, req: any, res: any, next: any) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 2 files allowed.'
      });
    }
  }
  
  if (error.message === 'Only images and PDF files are allowed') {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  next(error);
});

// Test OCR functionality
router.get('/test-ocr', async (req, res) => {
  try {
    const { ocrService } = await import('../services/ocrService');
    const isWorking = await ocrService.testTesseract();
    res.json({ 
      success: true, 
      tesseractWorking: isWorking,
      message: isWorking ? 'OCR is working' : 'OCR test failed'
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: `OCR test error: ${error.message}`,
      error: error.stack
    });
  }
});

// Test file upload endpoint (for debugging)
router.post('/test-upload', upload.single('testFile'), (req, res) => {
  try {
    console.log('=== TEST UPLOAD ===');
    console.log('File received:', req.file);
    console.log('Body:', req.body);
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    const fs = require('fs');
    const fileExists = fs.existsSync(req.file.path);
    const stats = fileExists ? fs.statSync(req.file.path) : null;
    
    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        exists: fileExists,
        actualSize: stats?.size
      }
    });
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Upload test failed: ${error.message}`
    });
  }
});

export default router;