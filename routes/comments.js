import express from "express";
import {
  createComment,
  getComments,
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

// CREATE
router.post("/", createComment);

// GET BY POST
router.get("/:postId", getComments);

// DELETE
router.delete("/:id", deleteComment);

// UPDATE (edit)
router.put("/:id", updateComment);

export default router;
