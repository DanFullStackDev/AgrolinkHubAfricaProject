import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import produceRoutes from './routes/produceRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'; // Import Categories
import blogRoutes from './routes/blogRoutes.js';         // Import Blogs
import userRoutes from './routes/userRoutes.js'; // <--- Import
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/produce', produceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes); // Mount Categories
app.use('/api/blogs', blogRoutes);          // Mount Blogs

// Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", JSON.stringify(err, null, 2));
  res.status(500).json({ 
    message: "Server Error", 
    error: err.message || "Unknown Error",
    details: err 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});