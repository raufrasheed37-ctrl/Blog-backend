import express from 'express';
import {  updateUserProfile, getCurrentUserProfile, sendContactEmail, } from '../controllers/contactController.js';
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Public contact form email endpoint
router.post("/send-email", sendContactEmail);

// Update logged-in user profile
router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  updateUserProfile
);

// Get logged-in user profile
router.get("/profile", authMiddleware, getCurrentUserProfile);

export default router;
