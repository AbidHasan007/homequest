import { Router } from "express";
import {
  createSafetyReview,
  getTenantSafetyReviews,
  getLocationSafetyReviews
} from "../controller/safetyReviewControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Create safety review (tenant only)
router.post("/", authMiddleware(["tenant"]), createSafetyReview);

// Get tenant's own safety reviews (tenant only)
router.get("/my-reviews", authMiddleware(["tenant"]), getTenantSafetyReviews);

// Get all safety reviews for a location (public)
router.get("/location/:locationId", getLocationSafetyReviews);

export default router;