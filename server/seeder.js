import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seedCategories = async () => {
  try {
    // 1. Clear existing categories
    await Category.deleteMany();

    // 2. Define categories WITH slugs manually
    const categories = [
      { name: 'Farming Tips', slug: 'farming-tips' },
      { name: 'Market Trends', slug: 'market-trends' },
      { name: 'Success Stories', slug: 'success-stories' },
      { name: 'Agri-Tech', slug: 'agri-tech' },
      { name: 'Livestock Management', slug: 'livestock-management' },
      { name: 'Crop Protection', slug: 'crop-protection' },
      { name: 'Sustainable Practices', slug: 'sustainable-practices' }
    ];

    // 3. Insert them
    await Category.insertMany(categories);

    console.log('✅ Categories Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

seedCategories();