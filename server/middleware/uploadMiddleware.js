import multer from 'multer';
import { storage } from '../config/cloudinary.js';

// Initialize multer with the Cloudinary storage
const upload = multer({ storage: storage });

export default upload;