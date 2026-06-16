import express from "express";
import { getActivities , getPersonalActivities,} from "../controllers/activityController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getActivities);
router.get("/personal", protect, getPersonalActivities);

export default router;
