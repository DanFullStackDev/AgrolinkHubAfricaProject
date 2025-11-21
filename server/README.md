
# AgrolinkHubAfrica - Server 🚀

The backend API for **AgrolinkHubAfrica**, a digital marketplace connecting smallholder farmers with buyers. This RESTful API handles authentication, data persistence, file uploads, and real-time communication.

## 🛠️ Tech Stack

	* **Runtime:** [Node.js](https://nodejs.org/)
	* **Framework:** [Express.js](https://expressjs.com/)
	* **Database:** [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/))
	* **Authentication:** JSON Web Tokens (JWT) & Bcryptjs
	* **File Storage:** [Cloudinary](https://cloudinary.com/) (via Multer)
	* **Real-Time:** [Socket.io](https://socket.io/) (WebSockets)
	* **Validation:** Custom middleware & Regex

-----

## ⚡ Prerequisites

	* **Node.js** (v16 or higher)
	* **MongoDB Atlas Account** (Connection string)
	* **Cloudinary Account** (API Key & Secret)

-----

## 🚀 Setup & Installation

1.  **Navigate to the server directory:**

		```bash
		cd server
		```

2.  **Install dependencies:**

		```bash
		npm install
		```

3.  **Configure Environment Variables:**
		Create a `.env` file in the `server/` root directory.

		```env
		NODE_ENV=development
		PORT=5000

		# Database
		MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/agrolink?retryWrites=true&w=majority

		# Security
		JWT_SECRET=your_super_secret_random_string

		# Image Uploads (Cloudinary)
		CLOUDINARY_CLOUD_NAME=your_cloud_name
		CLOUDINARY_API_KEY=your_api_key
		CLOUDINARY_API_SECRET=your_api_secret
		```

4.  **Run the Server:**

			* **Development (with Nodemon):**
				```bash
				npm run dev
				```
			* **Production:**
				```bash
				npm start
				```

		The server will run on `http://localhost:5000`.

-----

## 📂 Project Structure

```text
server/
├── config/             # Database & Cloudinary configuration
├── controllers/        # Request handlers (Logic layer)
│   ├── authController.js
│   ├── produceController.js
│   ├── orderController.js
│   ├── chatController.js
│   └── ...
├── middleware/         # Custom middleware (Auth, Error handling)
├── models/             # Mongoose Data Schemas
│   ├── User.js
│   ├── Produce.js
│   ├── Order.js
│   ├── Message.js
│   └── ...
├── routes/             # API Route definitions
├── utils/              # Helper functions (Token generation)
└── server.js           # Application entry point
```

-----

## 📡 API Endpoints

### 🔐 Authentication

	* `POST /api/auth/register` - Register a new user (Buyer/Farmer)
	* `POST /api/auth/login` - Login and get JWT
	* `GET /api/auth/me` - Get current user profile
	* `PUT /api/auth/profile` - Update profile & photo

### 🥕 Produce (Marketplace)

	* `GET /api/produce` - Get all items (Supports `?keyword=`, `?category=`, `?page=`)
	* `GET /api/produce/:id` - Get single item details
	* `POST /api/produce` - Create listing (Farmer only, with image)
	* `PUT /api/produce/:id` - Update listing
	* `DELETE /api/produce/:id` - Delete listing

### 📦 Orders

	* `POST /api/orders` - Create a new order
	* `GET /api/orders/myorders` - Get logged-in buyer's history
	* `GET /api/orders/sales` - Get logged-in farmer's sales
	* `PUT /api/orders/:id/status` - Update status (Pending → Delivered)

### 📝 Blog

	* `GET /api/blogs` - Get expert articles
	* `POST /api/blogs` - Publish article (Expert/Admin)
	* `POST /api/blogs/:id/comments` - Add a comment

### 💬 Chat (Real-Time)

	* `GET /api/chat/conversations` - Get list of active chats
	* `GET /api/chat/:roomId` - Get message history for a room

-----

## 🔌 Real-Time Features (Socket.io)

The server listens for WebSocket connections to enable:

1.  **Live Chat:** Private messaging between Buyers and Farmers.
2.  **Events:**
			* `join_room`: Connects a user to a specific order/chat channel.
			* `send_message`: Transmits message payload.
			* `receive_message`: Broadcasts message to the recipient.

-----

## 🚢 Deployment

This backend is optimized for deployment on **Render** or **Heroku**.

1.  **Build Command:** `npm install` (or `npm install --legacy-peer-deps` if using older Cloudinary/Multer versions).
2.  **Start Command:** `node server.js`
3.  **Environment Variables:** Ensure all variables from `.env` are added to your hosting dashboard.

