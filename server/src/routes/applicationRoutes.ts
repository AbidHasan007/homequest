import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createApplication, listApplication, updateApplicationStatus, checkExistingApplication } from "../controller/applicationControllers";


const router = express.Router();

router.post("/", authMiddleware(["tenant"]), createApplication);
router.put("/:id/status", authMiddleware(["landlord"]), updateApplicationStatus);
router.get("/", authMiddleware(["landlord","tenant"]), listApplication);
router.get("/check/:propertyId", authMiddleware(["tenant"]), checkExistingApplication);



export default router;