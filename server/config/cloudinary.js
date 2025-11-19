import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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
/*
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// DIRECTLY PASTE YOUR KEYS HERE FOR TESTING
// (Make sure there are NO spaces inside the quotes!)
cloudinary.config({
  cloud_name: 'dkvuxxgv8', 
  api_key: '385687331632163', 
  api_secret: 'IWzDlz1voBTI3SWBs_wvCo7hBZ8', 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'AgrolinkHubAfrica',
    format: async (req, file) => 'jpg',
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
  },
});

export { cloudinary, storage };*/