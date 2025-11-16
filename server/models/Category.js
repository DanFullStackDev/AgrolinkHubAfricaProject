import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// We'll add a pre-save hook to generate the slug from the name
categorySchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    return next();
  }
  // Simple slug generation
  this.slug = this.name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;