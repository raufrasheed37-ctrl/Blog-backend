import express from 'express';
import { saveContact, getContacts, sendContactEmail } from '../controllers/contactController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public contact form email endpoint
router.post("/", sendContactEmail);

// Authenticated contact book endpoints
router.post("/save", authMiddleware, saveContact);

// Get logged-in user's contacts (dashboard)
router.get("/", authMiddleware, getContacts);

export default router;
