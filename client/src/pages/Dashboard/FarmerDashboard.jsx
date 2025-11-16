import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FarmerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
        <Button asChild>
          <Link to="/produce/new">
            <PlusCircle className="mr-2 size-4" /> Add New Produce
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Produce Listings</CardTitle>
        </CardHeader>
        <CardContent>
          {/* We will map over and show produce items here */}
          <p>You have no produce listings yet.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders (Sales)</CardTitle>
        </CardHeader>
        <CardContent>
          {/* We will show a list of recent sales here */}
          <p>You have no new orders.</p>
        </CardContent>
      </Card>
    </div>
  );
}