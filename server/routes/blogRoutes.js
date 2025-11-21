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

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlogById);

// Private route for commenting
router.post('/:id/comments', protect, createBlogComment);

// Private/Expert & Admin routes
router.post(
  '/',
  protect,
  authorize('Expert', 'Admin'), // Allow Experts
  upload.array('images', 1),
  createBlog
);

router.put(
  '/:id',
  protect,
  authorize('Expert', 'Admin'), // Allow Experts
  updateBlog
);

router.delete(
  '/:id',
  protect,
  authorize('Expert', 'Admin'), // Allow Experts
  deleteBlog
);

export default router;