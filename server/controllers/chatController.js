import Message from '../models/Message.js';
import User from '../models/User.js';

// @desc    Get all conversations for the logged-in user
// @route   GET /api/chat/conversations
const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all unique chat rooms where user is either sender or recipient
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: '$chatRoomId',
          lastMessage: { $first: '$$ROOT' },
        },
      },
    ]);

    // Populate user details for the "other person"
    const populatedConversations = await Promise.all(
      conversations.map(async (convo) => {
        // Determine who the "other" person is
        const otherUserId = 
          convo.lastMessage.sender.toString() === userId.toString()
            ? convo.lastMessage.recipient
            : convo.lastMessage.sender;

        const otherUser = await User.findById(otherUserId).select('name profileImage');
        
        return {
          ...convo,
          otherUser,
        };
      })
    );

    res.json(populatedConversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get messages for a specific room
// @route   GET /api/chat/:roomId
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chatRoomId: req.params.roomId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getConversations, getMessages };