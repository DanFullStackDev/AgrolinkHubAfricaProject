import express from 'express';
import {
  getProduce,
  getProduceById,
  createProduce,
  updateProduce,
  deleteProduce,
} from '../controllers/produceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validationMiddleware.js'; // 1. Import
import {
  produceSchema,
  updateProduceSchema,
} from '../validations/produceValidation.js'; // 2. Import
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getProduce);
router.get('/:id', getProduceById);

router.post(
  '/',
  protect,
  authorize('Farmer', 'Admin'),
  //validateRequest(produceSchema), // 3. Add middleware
  upload.array('images', 5),
  createProduce
);

router.put(
  '/:id',
  protect,
  authorize('Farmer', 'Admin'),
  validateRequest(updateProduceSchema), // 4. Add middleware
  updateProduce
);

router.delete(
  '/:id',
  protect,
  authorize('Farmer', 'Admin'),
  deleteProduce
);

export default router;