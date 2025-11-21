# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

 # AgrolinkHubAfrica - Client 🌾💻

 The frontend application for **AgrolinkHubAfrica**, a digital marketplace connecting smallholder farmers with buyers. This single-page application (SPA) allows users to browse produce, manage listings, chat in real-time, and read expert agricultural blogs.

 ## 🛠️ Tech Stack

	 * **Core:** [React](https://react.dev/) (v18) via [Vite](https://vitejs.dev/)
	 * **Styling:** [Tailwind CSS](https://tailwindcss.com/)
	 * **UI Library:** [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
	 * **State Management:** React Context API (`AuthContext`, `CartContext`)
	 * **Routing:** [React Router DOM](https://reactrouter.com/) (v6)
	 * **Data Fetching:** [Axios](https://axios-http.com/)
	 * **Real-Time:** [Socket.io-client](https://socket.io/)
	 * **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
	 * **Icons:** [Lucide React](https://lucide.dev/)
	 * **Notifications:** [Sonner](https://www.google.com/search?q=https://sonner.emilkowal.ski/)

 -----

 ## ⚡ Prerequisites

	 * **Node.js** (v16 or higher)
	 * **npm** or **yarn**
	 * A running instance of the **AgrolinkHub Server** (locally or deployed).

 -----

 ## 🚀 Setup & Installation

 1.  **Navigate to the client directory:**

		 ```bash
		 cd client
		 ```

 2.  **Install dependencies:**

		 ```bash
		 npm install
		 ```

 3.  **Configure Environment Variables:**
		 Create a `.env` file in the `client/` root directory.

		 ```env
		 # URL of your backend API
		 # For local development:
		 VITE_API_URL=http://localhost:5000/api

		 # For production (e.g., Render/Vercel):
		 # VITE_API_URL=https://your-backend-url.onrender.com/api
		 ```

 4.  **Run the Development Server:**

		 ```bash
		 npm run dev
		 ```

		 The app will be available at `http://localhost:5173`.

 -----

 ## 📂 Project Structure

 ```text
 client/
 ├── public/                 # Static assets
 ├── src/
 │   ├── components/         # Reusable UI components
 │   │   ├── ui/             # Shadcn primitive components (Button, Card, etc.)
 │   │   ├── ChatBox.jsx     # Real-time chat widget
 │   │   ├── Navbar.jsx      # Main navigation
 │   │   └── ...
 │   ├── contexts/           # Global State Providers
 │   │   ├── AuthContext.jsx # User login/register state
 │   │   └── CartContext.jsx # Shopping cart logic
 │   ├── lib/                # Utilities (Tailwind class merger)
 │   ├── pages/              # Main Application Pages
 │   │   ├── Dashboard/      # Role-based dashboards (Farmer, Admin, etc.)
 │   │   ├── BlogPage.jsx    # Blog listing
 │   │   ├── HomePage.jsx    # Landing page
 │   │   └── ...
 │   ├── services/           # API Configuration (Axios instance)
 │   ├── App.jsx             # Main Router setup
 │   └── main.jsx            # Entry point
 ├── index.html              # HTML template
 ├── tailwind.config.js      # Tailwind configuration
 └── vite.config.js          # Vite configuration
 ```

 -----

 ## ✨ Key Features

 ### 🔐 Authentication & Security

	 * **Protected Routes:** Certain pages (`/dashboard`, `/checkout`) utilize the `<ProtectedRoute>` wrapper to ensure only logged-in users can access them.
	 * **Role-Based UI:** The `Navbar` and `Dashboard` dynamically render different options based on the user's role (`Buyer`, `Farmer`, `Expert`, `Admin`).

 ### 🛒 E-Commerce Flow

	 * **Cart Management:** Users can add items, update quantities, and remove items. State is persisted in `localStorage` via `CartContext`.
	 * **Order Placement:** Sends structured order data to the backend, including delivery details.

 ### 💬 Real-Time Communication

	 * **Socket.io Integration:** The `ChatBox` component establishes a WebSocket connection to the server.
	 * **Room Logic:** Creates unique chat rooms based on `buyerId_farmerId` to ensure private conversations.

 ### 📝 Blog & Comments

	 * **Rich Content:** Displays articles with categories and images.
	 * **Interaction:** Authenticated users can post comments, which triggers a live refresh of the comment section.

 -----

 ## 📜 Available Scripts

	 * `npm run dev`: Starts the development server.
	 * `npm run build`: Builds the app for production to the `dist` folder.
	 * `npm run lint`: Runs ESLint to check for code quality issues.
	 * `npm run preview`: Locally previews the production build.

 -----

 ## 🚢 Deployment

 This project is optimized for deployment on **Vercel** or **Netlify**.

 1.  Push your code to GitHub.
 2.  Connect your repository to Vercel.
 3.  **Important:** Set the `VITE_API_URL` environment variable in your Vercel project settings to point to your live backend URL.
 4.  Deploy! 🚀

