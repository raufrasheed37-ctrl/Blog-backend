import express from 'express';
import { saveContact } from '../controllers/contactController.js';

const router = express.Router();

// Save contact route
router.post("/", saveContact);

export default router;

