import express from 'express';
import {
  createOrder,
  getMyOrders,
  getMySales,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes here are protected
router.use(protect);

router.post('/', createOrder);
router.get('/myorders', getMyOrders); // For buyers

router.get(
  '/sales',
  authorize('Farmer', 'Admin'), // For farmers
  getMySales
);

router.put(
  '/:id/status',
  authorize('Farmer', 'Admin'), // For farmers or admin
  updateOrderStatus
);

export default router;