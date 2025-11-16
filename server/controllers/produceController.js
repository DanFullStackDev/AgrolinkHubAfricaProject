import Produce from '../models/Produce.js';
import mongoose from 'mongoose';

// @desc    Fetch all produce
// @route   GET /api/produce
// @access  Public
const getProduce = async (req, res) => {
  try {
    // Add logic for search, filters, pagination here later
    const produce = await Produce.find({})
      .populate('farmerId', 'name location')
      .sort({ createdAt: -1 });
    res.json(produce);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single produce
// @route   GET /api/produce/:id
// @access  Public
const getProduceById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Produce ID' });
    }
    const produce = await Produce.findById(req.params.id).populate(
      'farmerId',
      'name location ratings'
    );

    if (produce) {
      res.json(produce);
    } else {
      res.status(404).json({ message: 'Produce not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a produce listing
// @route   POST /api/produce
// @access  Private/Farmer
const createProduce = async (req, res) => {
  try {
    const {
      title,
      description,
      images,
      price,
      quantity,
      unit,
      category,
      location,
    } = req.body;

    // We get req.user from the 'protect' middleware
    const farmerId = req.user._id;

    // Basic validation
    if (!images || images.length === 0) {
        return res.status(400).json({ message: 'Please add at least one image URL.' });
    }

    const produce = new Produce({
      farmerId,
      title,
      description,
      images, // For now, we assume images is an array of URLs. We will integrate file uploads later.
      price,
      quantity,
      unit,
      category,
      location,
    });

    const createdProduce = await produce.save();
    res.status(201).json(createdProduce);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', details: error.message });
  }
};

// @desc    Update a produce listing
// @route   PUT /api/produce/:id
// @access  Private/Farmer
const updateProduce = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Produce ID' });
  }

  try {
    const produce = await Produce.findById(req.params.id);

    if (!produce) {
      return res.status(404).json({ message: 'Produce not found' });
    }

    // Check if the user updating is the farmer who created it
    if (produce.farmerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const {
      title,
      description,
      images,
      price,
      quantity,
      unit,
      category,
      location,
      status,
    } = req.body;

    produce.title = title || produce.title;
    produce.description = description || produce.description;
    produce.images = images || produce.images;
    produce.price = price ?? produce.price;
    produce.quantity = quantity ?? produce.quantity;
    produce.unit = unit || produce.unit;
    produce.category = category || produce.category;
    produce.location = location || produce.location;
    produce.status = status || produce.status;

    const updatedProduce = await produce.save();
    res.json(updatedProduce);
  } catch (error) {
    res.status(400).json({ message: 'Update failed', details: error.message });
  }
};

// @desc    Delete a produce listing
// @route   DELETE /api/produce/:id
// @access  Private/Farmer
const deleteProduce = async (req, res) => {
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Produce ID' });
  }
  
  try {
    const produce = await Produce.findById(req.params.id);

    if (!produce) {
      return res.status(404).json({ message: 'Produce not found' });
    }

    // Check if the user deleting is the farmer
    if (produce.farmerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await produce.deleteOne(); // Use .deleteOne() on the document
    res.json({ message: 'Produce removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getProduce,
  getProduceById,
  createProduce,
  updateProduce,
  deleteProduce,
};