import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createComment,
  getComments,
  deleteComment,
  updateComment,
  toggleCommentLike,
} from "../controllers/commentController.js";

const router = express.Router();

// CREATE
router.post("/", authMiddleware, createComment);

// GET BY POST
router.get("/:postId", getComments);

// LIKE COMMENT
router.put("/:id/like", authMiddleware, toggleCommentLike);

// DELETE
router.delete("/:id", authMiddleware, deleteComment);

// UPDATE (edit)
router.put("/:id", authMiddleware, updateComment);


export default router;
