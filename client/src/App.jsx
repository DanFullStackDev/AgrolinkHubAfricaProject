import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateProducePage } from './pages/Dashboard/CreateProducePage';
import { BrowseProducePage } from './pages/BrowseProducePage';
import { ProduceDetailsPage } from './pages/ProduceDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailsPage } from './pages/BlogDetailsPage';
import { CreateBlogPage } from './pages/Dashboard/CreateBlogPage';
import { EditProducePage } from './pages/Dashboard/EditProducePage';
import { SettingsPage } from './pages/SettingsPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Toaster } from '@/components/ui/sonner';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

// --- Placeholder Pages ---
function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-900 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empowering Africa's Farmers
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
            Directly connecting smallholder farmers with buyers. 
            Better prices, fresher produce, and zero hunger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 bg-green-500 hover:bg-green-600 text-white border-none">
              <Link to="/browse">Buy Produce</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-green-900">
              <Link to="/register">Join as Farmer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900 text-white mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to support local agriculture?</h2>
          <Button asChild size="lg" variant="secondary">
            <Link to="/browse" className="gap-2">
              <ShoppingCart className="size-5" /> Start Shopping Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
// -------------------------

function App() {
  return (
    <>
      <Routes>
        {/* Routes with Navbar and Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailsPage />} />
          
          {/* Produce Routes */}
          <Route path="/browse" element={<BrowseProducePage />} />
          <Route path="/produce/:id" element={<ProduceDetailsPage />} />
          
          {/* Cart Route */}
          <Route path="/cart" element={<CartPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
           <Route
            path="/produce/new"
            element={
              <ProtectedRoute>
                <CreateProducePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/new"
            element={
              <ProtectedRoute>
                <CreateBlogPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/checkout-success" 
            element={
              <ProtectedRoute>
                <CheckoutSuccessPage />
              </ProtectedRoute>
            } 
          />
          
          {/* MOVED INSIDE LAYOUT so Navbar appears */}
          <Route 
            path="/produce/edit/:id" 
            element={
              <ProtectedRoute>
                <EditProducePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Routes without Navbar/Footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;