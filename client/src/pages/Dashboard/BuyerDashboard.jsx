import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BuyerDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Buyer Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>My Order History</CardTitle>
        </CardHeader>
        <CardContent>
          {/* We will map over and show recent orders here */}
          <p>You have not placed any orders yet.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Wishlist</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You have no items in your wishlist.</p>
        </CardContent>
      </Card>
    </div>
  );
}