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
import upload from '../middleware/uploadMiddleware.js'; // Import Multer

const router = express.Router();

// ... existing public routes ...
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/:id/comments', protect, createBlogComment);

// Private/Expert & Admin routes
router.post(
  '/',
  protect,
  authorize('Expert', 'Admin'),
  upload.array('images', 1), // Add this line!
  createBlog
);

// ... existing put/delete routes ...
router.put('/:id', protect, authorize('Expert', 'Admin'), updateBlog);
router.delete('/:id', protect, authorize('Expert', 'Admin'), deleteBlog);

export default router;