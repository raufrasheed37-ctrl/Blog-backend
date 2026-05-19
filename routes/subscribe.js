import express from 'express';
import { toggleSubscribe } from '../controllers/subscribeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/subscribe - toggle subscribe/unsubscribe to an author
router.post('/', authMiddleware, toggleSubscribe);

export default router;
