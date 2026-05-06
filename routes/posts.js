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

const router = express.Router();

// CREATE POST
router.post('/', createPost);

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

// DELETE POST
router.delete('/:id', deletePost);

export default router;
