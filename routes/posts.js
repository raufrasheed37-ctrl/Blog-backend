import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByAuthor,
  getFeaturedPosts,
  likePost,
  restackPost,
} from '../controllers/postController.js';

const router = express.Router();

// CREATE POST
router.post('/', authMiddleware, createPost);

// GET ALL POSTS (published)
router.get('/', getAllPosts);

// GET FEATURED POSTS
router.get('/featured/list', getFeaturedPosts);

// LIKE POST
router.post("/:id/like", authMiddleware, likePost);

// RESTACK POST
router.post("/:id/restack", authMiddleware, restackPost);

// GET POSTS BY AUTHOR
router.get('/author/:authorId', getPostsByAuthor);

// GET POST BY ID OR SLUG
router.get('/:id', getPostById);

// UPDATE POST
router.put('/:id', updatePost);

// DELETE POST
router.delete('/:id', deletePost);

export default router;
