import express from "express";
import { getProperties, getProperty, createProperty, deleteProperty } from "../controller/propertyControllers";
import multer from "multer";
import { authMiddleware } from "../middleware/authMiddleware";


const storage = multer.memoryStorage();
const Upload = multer({ storage: storage });
const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getProperty);
router.post("/",authMiddleware(["landlord"]),Upload.array("photos"), createProperty);
router.delete("/:id", authMiddleware(["landlord"]), deleteProperty);

export default router;