import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByAuthor,
  getFeaturedPosts,
} from '../controllers/postController.js';
import { upload } from '../utils/multerConfig.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// CREATE POST (requires auth)
router.post('/', authMiddleware, upload.single('coverImage'), createPost);

// GET ALL POSTS (published)
router.get('/', getAllPosts);

// GET FEATURED POSTS
router.get('/featured/list', getFeaturedPosts);

// GET POST BY ID OR SLUG
router.get('/:id', getPostById);

// GET POSTS BY AUTHOR
router.get('/author/:authorId', getPostsByAuthor);

// UPDATE POST
router.put('/:id', updatePost);

// DELETE POST (requires auth)
router.delete('/:id', authMiddleware, deletePost);

export default router;
