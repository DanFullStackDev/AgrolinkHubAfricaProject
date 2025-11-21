import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    chatRoomId: { type: String, required: true }, // The unique "room" ID (buyerId_farmerId)
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;