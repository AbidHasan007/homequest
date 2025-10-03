import express from "express";
import { createLandlord, getLandlord, getLandlordProfile, getLandlordProperties, updateLandlord } from "../controller/landlordControllers";

const router = express.Router();

// Protected routes
router.get("/:cognitoId", getLandlord);
router.put("/:cognitoId", updateLandlord);
router.get("/:cognitoId/properties", getLandlordProperties);
router.post("/", createLandlord);

// Removed: router.get("/view/profile/:id", getLandlordProfile);

export default router;