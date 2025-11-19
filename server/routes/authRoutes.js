import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  updateUserProfile // <--- 1. Added this import
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/authMiddleware.js'; // <--- 2. Added 'authorize' here
import validateRequest from '../middleware/validationMiddleware.js'; 
import { registerSchema, loginSchema } from '../validations/authValidation.js';
import upload from '../middleware/uploadMiddleware.js';
const router = express.Router();

router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', validateRequest(loginSchema), loginUser);
router.get('/me', protect, getMe);

// This was the line causing the error
router.get('/users', protect, authorize('Admin'), getUsers);
router.put(
  '/profile', 
  protect, 
  upload.single('profileImage'), 
  updateUserProfile
);
export default router;