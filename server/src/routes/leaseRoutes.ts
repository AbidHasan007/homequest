import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { 
  getLeases, 
  getLeasesPayment, 
  createTerminationRequest,
  getTenantTerminationRequests,
  getLandlordTerminationRequests,
  updateTerminationRequestStatus
} from "../controller/leaseControllers";


const router = express.Router();

router.get("/", authMiddleware(["landlord","tenant"]), getLeases);
router.get("/:id/payments", authMiddleware(["landlord","tenant"]), getLeasesPayment);

// Termination request routes
router.post("/:leaseId/termination-request", authMiddleware(["tenant"]), createTerminationRequest);
router.get("/termination-requests/tenant", authMiddleware(["tenant"]), getTenantTerminationRequests);
router.get("/termination-requests/landlord", authMiddleware(["landlord"]), getLandlordTerminationRequests);
router.put("/termination-requests/:requestId/status", authMiddleware(["landlord"]), updateTerminationRequestStatus);

export default router;