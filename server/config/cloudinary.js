import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'AgrolinkHubAfrica', // A folder name in your Cloudinary account
    format: async (req, file) => 'jpg', // Supports 'jpg', 'png', etc.
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
  },
});

export { cloudinary, storage };