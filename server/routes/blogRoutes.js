import express from 'express';
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  createBlogComment,
} from '../controllers/blogController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// --- PUBLIC ROUTES (Anyone can see these) ---
router.get('/', getBlogs); // Fetch all blogs
router.get('/:id', getBlogById); // Fetch single blog

// --- PROTECTED ROUTES (Must be logged in) ---

// Commenting (Any logged-in user)
router.post('/:id/comments', protect, createBlogComment);

// Expert & Admin Actions (Create, Update, Delete)
router.post(
  '/',
  protect,
  authorize('Expert', 'Admin'),
  upload.array('images', 1),
  createBlog
);

router.put(
  '/:id',
  protect,
  authorize('Expert', 'Admin'),
  updateBlog
);

router.delete(
  '/:id',
  protect,
  authorize('Expert', 'Admin'),
  deleteBlog
);

export default router;