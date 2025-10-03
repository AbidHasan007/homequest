import { Router } from "express";
import {
  calculateSafetyIndicators,
  getSafetyIndicator,
  getAllSafetyIndicators,
  updateSafetyIndicator
} from "../controller/safetyControllers";

const router = Router();

// Calculate safety indicators for all locations
router.post("/calculate", calculateSafetyIndicators);

// Get safety indicator for a specific location
router.get("/location/:locationId", getSafetyIndicator);

// Get all safety indicators (admin)
router.get("/", getAllSafetyIndicators);

// Update safety indicator (admin)
router.put("/location/:locationId", updateSafetyIndicator);

export default router;