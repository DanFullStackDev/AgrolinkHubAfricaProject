import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http'; // 1. Import http
import { Server } from 'socket.io'; // 2. Import Socket.io
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import produceRoutes from './routes/produceRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import userRoutes from './routes/userRoutes.js';
import Message from './models/Message.js';
import chatRoutes from './routes/chatRoutes.js';
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // 3. Wrap app in http server

// 4. Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Allow connections from anywhere (Update this to your Vercel URL for production security later)
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// ... Routes ...
app.use('/api/auth', authRoutes);
app.use('/api/produce', produceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
// 5. Socket Logic
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('send_message', async (data) => {
    // data = { room, author, authorId, recipientId, message, time }
    
    // 1. Send to Recipient (Real-time)
    socket.to(data.room).emit('receive_message', data);

    // 2. Save to Database (Persistence)
    try {
      if (data.authorId && data.recipientId) {
        await Message.create({
          chatRoomId: data.room,
          sender: data.authorId,
          recipient: data.recipientId,
          text: data.message,
        });
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

// 6. Listen on SERVER, not app
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});