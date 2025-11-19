import Blog from '../models/Blog.js';
import mongoose from 'mongoose';

// @desc    Fetch all blog posts
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate('categories', 'name slug')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single blog post
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Blog ID' });
  }

  try {
    const blog = await Blog.findById(req.params.id).populate(
      'categories',
      'name slug'
    );

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Expert or Admin
const createBlog = async (req, res) => {
  try {
    const { title, content, categories } = req.body;
const files = req.files || [];
    const images = files.map((file) => file.path || file.secure_url).filter(Boolean);
    const blog = new Blog({
      title,
      content,
      images,
      categories,
      authorId: req.user._id,
      authorName: req.user.name,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', details: error.message });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Expert or Admin
const updateBlog = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Blog ID' });
  }
  
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if user is the author or an Admin
    if (
      blog.authorId.toString() !== req.user._id.toString() &&
      req.user.role !== 'Admin'
    ) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { title, content, images, categories } = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.images = images || blog.images;
    blog.categories = categories || blog.categories;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: 'Update failed', details: error.message });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Expert or Admin
const deleteBlog = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Blog ID' });
  }
  
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if user is the author or an Admin
    if (
      blog.authorId.toString() !== req.user._id.toString() &&
      req.user.role !== 'Admin'
    ) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await blog.deleteOne();
    res.json({ message: 'Blog post removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a comment to a blog post
// @route   POST /api/blogs/:id/comments
// @access  Private
const createBlogComment = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Blog ID' });
  }
  
  try {
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const newComment = {
      userId: req.user._id,
      name: req.user.name,
      comment: comment,
    };

    blog.comments.push(newComment);
    await blog.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: 'Comment creation failed', details: error.message });
  }
};

export {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  createBlogComment,
};