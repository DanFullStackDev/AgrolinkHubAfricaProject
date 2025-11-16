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
  authorize('Expert', 'Admin'),
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