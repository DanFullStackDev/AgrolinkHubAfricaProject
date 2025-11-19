import User from '../models/User.js';

// @desc    Create a new review
// @route   POST /api/users/:id/reviews
// @access  Private
const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  
  try {
    const userToReview = await User.findById(req.params.id);

    if (userToReview) {
      // Check if already reviewed
      const alreadyReviewed = userToReview.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'You have already reviewed this farmer' });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      userToReview.reviews.push(review);

      // Update average
      userToReview.numReviews = userToReview.reviews.length;
      userToReview.rating =
        userToReview.reviews.reduce((acc, item) => item.rating + acc, 0) /
        userToReview.reviews.length;

      await userToReview.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createReview };