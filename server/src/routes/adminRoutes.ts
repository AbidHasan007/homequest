import express from "express";
import { createAdmin, getAdmin, updateAdmin, getAllUsers, updateUser, deleteUser } from "../controller/adminControllers";

const router = express.Router();

// User management routes (must come before parameterized routes)
router.get("/users", getAllUsers);
router.put("/users/:cognitoId", updateUser);
router.delete("/users/:cognitoId", deleteUser);

// Admin profile routes
router.get("/:cognitoId", getAdmin);
router.put("/:cognitoId", updateAdmin);
router.post("/", createAdmin);

export default router;