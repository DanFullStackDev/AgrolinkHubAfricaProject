import express from 'express';
import { getConversations, getMessages } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/conversations', protect, getConversations);
router.get('/:roomId', protect, getMessages);

export default router;