import Order from '../models/Order.js';
import Produce from '../models/Produce.js';
import mongoose from 'mongoose';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const { orderItems, farmerId, deliveryInfo, total } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  try {
    // Note: In a real app, you'd also want to lock product quantities
    // or use a transaction here to prevent race conditions.

    const order = new Order({
      buyerId: req.user._id, // from 'protect' middleware
      farmerId: farmerId,
      items: orderItems,
      total: total,
      deliveryInfo: deliveryInfo,
    });

    const createdOrder = await order.save();

    // Optionally: update produce stock quantities here
    for (const item of orderItems) {
      await Produce.findByIdAndUpdate(item.produceId, {
        $inc: { quantity: -item.qty },
      });
     }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', details: error.message });
  }
};

// @desc    Get logged in user's orders (as buyer)
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user._id })
      .populate('farmerId', 'name')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user's sales (as farmer)
// @route   GET /api/orders/sales
// @access  Private/Farmer
const getMySales = async (req, res) => {
  try {
    const orders = await Order.find({ farmerId: req.user._id })
      .populate('buyerId', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (to processing, shipped, delivered)
// @route   PUT /api/orders/:id/status
// @access  Private/Farmer or Admin
const updateOrderStatus = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Order ID' });
  }

  const { status } = req.body;
  if (!['Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is the farmer for this order OR an admin
    if (
      order.farmerId.toString() !== req.user._id.toString() &&
      req.user.role !== 'Admin'
    ) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    order.status = status;
    if (status === 'Delivered') {
      order.deliveredAt = Date.now();
    }
    // You could add payment logic here, e.g., setting paidAt
    // if (status === 'Paid') { order.paidAt = Date.now(); }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createOrder, getMyOrders, getMySales, updateOrderStatus };