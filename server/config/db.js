import mongoose from 'mongoose'; // Was: const mongoose = require('mongoose');
import dotenv from 'dotenv';     // Was: const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error)
 {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;