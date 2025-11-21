import { useAuth } from '../contexts/AuthContext';
import { FarmerDashboard } from './Dashboard/FarmerDashboard';
import { BuyerDashboard } from './Dashboard/BuyerDashboard';
import { AdminDashboard } from './Dashboard/AdminDashboard';
import { ExpertDashboard } from './Dashboard/ExpertDashboard'; // <--- Import this

export function DashboardPage() {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  switch (user.role) {
    case 'Farmer':
      return <FarmerDashboard />;
    case 'Buyer':
      return <BuyerDashboard />;
    case 'Admin':
      return <AdminDashboard />;
    case 'Expert': // <--- Add this case
      return <ExpertDashboard />;
    default:
      return <div>Invalid user role.</div>;
  }
}