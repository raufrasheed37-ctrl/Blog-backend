import express from "express";
import { getPublicAuthorProfile } from "../controllers/authorController.js";

const router = express.Router();

router.get("/:authorId", getPublicAuthorProfile);

export default router;