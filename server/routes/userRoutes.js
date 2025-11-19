import express from 'express';
import { createReview } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id/reviews', protect, createReview);

export default router;