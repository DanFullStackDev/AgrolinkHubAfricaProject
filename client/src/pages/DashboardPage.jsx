import { useAuth } from '../contexts/AuthContext';
import { FarmerDashboard } from './Dashboard/FarmerDashboard';
import { BuyerDashboard } from './Dashboard/BuyerDashboard';
import { AdminDashboard } from './Dashboard/AdminDashboard';

export function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    // This should theoretically not be hit due to ProtectedRoute,
    // but it's good practice.
    return <div>Loading...</div>;
  }

  // Render the dashboard based on the user's role
  switch (user.role) {
    case 'Farmer':
      return <FarmerDashboard />;
    case 'Buyer':
      return <BuyerDashboard />;
    case 'Admin':
      return <AdminDashboard />;
    // Note: You can add an 'Expert' role here later
    default:
      return <div>Invalid user role.</div>;
  }
}