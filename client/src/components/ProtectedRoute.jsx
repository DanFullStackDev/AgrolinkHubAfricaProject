import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location
    // so we can send them back after they log in.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}