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
import { HomePage } from './pages/HomePage'; // <--- ADDED THIS IMPORT
import { MessagesPage } from './pages/MessagesPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Toaster } from '@/components/ui/sonner';

// DELETED THE PLACEHOLDER HOMEPAGE FUNCTION THAT WAS HERE

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
            <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
        {/* Routes without Navbar/Footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;