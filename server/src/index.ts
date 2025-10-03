import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { createServer } from "http";
import SocketServer from "./socket/socketServer";
import { authMiddleware } from "./middleware/authMiddleware";



// Import routes
import tenantRoutes from "./routes/tenantRoutes";
import landlordRoutes from "./routes/landlordRoutes";
import adminRoutes from "./routes/adminRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import leaseRoutes from "./routes/leaseRoutes"
import applicationRoutes from "./routes/applicationRoutes"
import reviewRoutes from "./routes/reviewRoutes"
import safetyRoutes from "./routes/safetyRoutes"
import safetyReviewRoutes from "./routes/safetyReviewRoutes"
import tourRoutes from "./routes/tourRoutes"
import verificationRoutes from "./routes/verificationRoutes"
import { getLandlordProfile, testVerifyLandlord } from "./controller/landlordControllers"; // Import the function

//Configuration
dotenv.config();
const app = express();

// Conditional parsing - skip body parsing for multipart content
app.use((req, res, next) => {
  const contentType = req.get('Content-Type') || '';
  
  // Skip ALL body parsing for multipart data - let multer handle it
  if (contentType.includes('multipart/form-data')) {
    console.log('Skipping body parsing for multipart/form-data');
    return next();
  }
  
  // Apply appropriate parsing based on content type
  if (contentType.includes('application/json')) {
    console.log('Applying JSON parsing');
    return express.json()(req, res, next);
  }
  
  if (contentType.includes('application/x-www-form-urlencoded')) {
    console.log('Applying URL encoded parsing');
    return bodyParser.urlencoded({ extended: false })(req, res, next);
  }
  
  // For requests without content-type or other types, don't parse the body
  console.log('No body parsing applied for content type:', contentType);
  next();
});

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// Configure CORS
const corsOptions = {
  origin: [
    "http://localhost:3000", // Next.js client (default port)
    "http://localhost:3001", // Next.js client (alternative port)
    "http://127.0.0.1:3000", // Alternative localhost
    "http://127.0.0.1:3001", // Alternative localhost (port 3001)
    process.env.CLIENT_URL || "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-cognito-id"],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Debug middleware for CORS and content type
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  console.log(`Content-Type: ${req.get('Content-Type')}`);
  next();
});

//Routes

app.get("/", (req, res) => {
  res.send("This is the home page");
});

// CORS test endpoint
app.get("/test", (req, res) => {
  res.json({ 
    message: "CORS is working!", 
    origin: req.headers.origin,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});
//Admin routes
app.use("/admins", authMiddleware(["admin"]), adminRoutes);
//Tenant routes
app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes);
//Landlord routes
app.use("/landlords", authMiddleware(["landlord"]), landlordRoutes);

//  non-protected routes
app.use("/properties", propertyRoutes);
app.use("/leases", leaseRoutes)
app.use("/applications", applicationRoutes)
app.use("/reviews", reviewRoutes)
app.use("/safety", safetyRoutes)
app.use("/safety-reviews", safetyReviewRoutes)
// Tours need authentication for sender information
app.use("/tours", authMiddleware(["landlord", "tenant"]), tourRoutes)
// Verification routes need authentication
app.use("/verification", verificationRoutes)
// Serve uploaded files
app.use('/uploads', express.static('uploads'));
app.get("/view/profile/:id", getLandlordProfile); // Public landlord profile route
app.post("/test/verify-landlord/:cognitoId", testVerifyLandlord); // Test endpoint to verify landlord


//server
const port = process.env.PORT || 3002;
const server = createServer(app);

// Initialize Socket.io
const socketServer = new SocketServer(server);

// Make socket server available globally for use in controllers
declare global {
  var socketServer: SocketServer;
}
global.socketServer = socketServer;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Socket.io server is ready for connections`);
});