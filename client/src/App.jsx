import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Toaster } from '@/components/ui/sonner';

// --- Placeholder Pages (we can build these next) ---
function HomePage() {
  return <h1 className="text-3xl font-bold">Welcome to AgrolinkHubAfrica</h1>;
}

function DashboardPage() {
  return <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>;
  // We will build this out with Farmer/Buyer/Admin views
}

function BlogPage() {
  return <h1 className="text-3xl font-bold">Blog</h1>;
}

function BrowseProducePage() {
  return <h1 className="text-3xl font-bold">Browse Produce</h1>;
}
// ----------------------------------------------------

function App() {
  // You can clear out src/App.css
  return (
    <>
      <Routes>
        {/* Routes with Navbar and Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/browse" element={<BrowseProducePage />} />
          
          {/* --- Protected Routes --- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          {/* Add other protected routes here (e.g., /create-produce) */}
        </Route>

        {/* Routes without Navbar/Footer (e.g., auth pages) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;