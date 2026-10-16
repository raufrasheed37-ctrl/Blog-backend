import express from "express";

import {
  getActivity,
  markActivityRead,
  markAllActivityRead,
} from "../controllers/activityController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All activity routes require authentication.
router.use(protect);

router.get("/", getActivity);

router.patch("/read-all", markAllActivityRead);

router.patch("/:id/read", markActivityRead);

export default router;
