import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create subdirectories for different document types
const nidDir = path.join(uploadsDir, 'nid');
const addressProofDir = path.join(uploadsDir, 'address-proof');

if (!fs.existsSync(nidDir)) {
  fs.mkdirSync(nidDir, { recursive: true });
}
if (!fs.existsSync(addressProofDir)) {
  fs.mkdirSync(addressProofDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = uploadsDir;
    
    if (file.fieldname === 'nidDocument') {
      uploadPath = nidDir;
    } else if (file.fieldname === 'addressProof') {
      uploadPath = addressProofDir;
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  }
});

// File filter for documents
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
  }
};

// Create multer upload middleware
export const uploadDocuments = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Helper function to get file URL
export const getFileUrl = (filePath: string): string => {
  const relativePath = path.relative(uploadsDir, filePath);
  // Use environment variable or default to port 3001 (commonly used for backend)
  const serverPort = process.env.PORT || 3001;
  const serverUrl = process.env.SERVER_URL || `http://localhost:${serverPort}`;
  return `${serverUrl}/uploads/${relativePath}`;
};