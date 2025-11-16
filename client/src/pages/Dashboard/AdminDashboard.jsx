import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Platform Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Analytics charts will go here.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p>User management table will go here.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage All Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Produce listing moderation table will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}