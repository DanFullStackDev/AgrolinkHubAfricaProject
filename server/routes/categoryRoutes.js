import express from 'express';
import {
  createCategory,
  getCategories,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories);

router.post(
  '/',
  protect,
  authorize('Admin'), // Only Admins can create
  createCategory
);

router.delete(
  '/:id',
  protect,
  authorize('Admin'), // Only Admins can delete
  deleteCategory
);

export default router;