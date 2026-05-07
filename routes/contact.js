import express from 'express';
import { saveContact, getContacts } from '../controllers/contactController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 Protect all contact routes (requires login)
router.use(authMiddleware);

// Save contact 
router.post("/", saveContact);

// Get logged-in user's contacts (dashboard)
router.get("/", getContacts);

export default router;

