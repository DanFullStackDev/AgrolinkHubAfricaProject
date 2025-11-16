import mongoose from 'mongoose';

const produceSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // Array of URLs
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    unit: {
      type: String, // e.g., 'kg', 'bundle', 'item'
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Available', 'Sold Out', 'Pending'],
      default: 'Available',
    },
  },
  {
    timestamps: true,
  }
);

const Produce = mongoose.model('Produce', produceSchema);

export default Produce;