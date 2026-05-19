import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByAuthor,
  getFeaturedPosts,
  toggleLikePost,
  toggleRestackPost,
} from '../controllers/postController.js';
import { upload } from '../utils/multerConfig.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// CREATE POST (requires auth)
router.post('/', protect, upload.single('coverImage'), createPost);

// GET ALL POSTS (published)
router.get('/', getAllPosts);

// GET FEATURED POSTS
router.get('/featured/list', getFeaturedPosts);

// GET POSTS BY AUTHOR
router.get('/author/:authorId', getPostsByAuthor);

// GET POST BY ID OR SLUG
router.get('/:id', getPostById);

// LIKE POST
router.put('/:id/like', protect, toggleLikePost);

// RESTACK POST
router.put('/:id/restack', protect, toggleRestackPost);

// UPDATE POST (requires auth)
router.put('/:id', protect, updatePost);

// DELETE POST (requires auth)
router.delete('/:id', protect, deletePost);

export default router;
