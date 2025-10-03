import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createReview, getReviews } from "../controller/reviewControllers";

const router = express.Router();

// Tenants and landlords can create reviews
router.post("/", authMiddleware(["tenant", "landlord"]), createReview);

// Fetch reviews
router.get("/", getReviews);


export default router;

