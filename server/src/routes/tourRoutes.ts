import express from "express";
import {
  scheduleTour,
  getTourByApplication,
  updateTour,
  completeTour,
  cancelTour,
  getLandlordTours,
  getTenantTours
} from "../controller/tourControllers";

const router = express.Router();

// Schedule a tour for an application
router.post("/applications/:applicationId/schedule", scheduleTour);

// Get tour by application ID
router.get("/applications/:applicationId", getTourByApplication);

// Update tour (reschedule)
router.put("/:tourId", updateTour);

// Complete tour
router.post("/:tourId/complete", completeTour);

// Cancel tour
router.post("/:tourId/cancel", cancelTour);

// Get all tours for a landlord
router.get("/landlord/:landlordCognitoId", getLandlordTours);

// Get all tours for a tenant
router.get("/tenant/:tenantCognitoId", getTenantTours);

export default router;