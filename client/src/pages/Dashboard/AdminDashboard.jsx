import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PenTool, Loader2, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';

export function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Users on Component Mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/auth/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
        toast.error("Failed to load user list");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 2. Function to Delete a User (Optional but useful)
  const handleDeleteUser = async (id) => {
    if(!window.confirm("Are you sure you want to remove this user?")) return;
    
    try {
      // Note: You'll need a delete route on the backend for this to work perfectly,
      // but for now, let's just update the UI or add the route later.
      // await api.delete(`/api/auth/users/${id}`); 
      
      // For now, just show a toast since we haven't built the DELETE route yet
      toast.info("Delete functionality requires a backend update.");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link to="/blog/new">
            <PenTool className="mr-2 size-4" /> Write Article
          </Link>
        </Button>
      </div>

      {/* Analytics Section */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold">{users.length}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
              <div className="text-2xl font-bold">
                {users.filter(u => u.role === 'Farmer').length}
              </div>
              <div className="text-sm text-muted-foreground">Active Farmers</div>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg">
              <div className="text-2xl font-bold">
                {users.filter(u => u.role === 'Buyer').length}
              </div>
              <div className="text-sm text-muted-foreground">Active Buyers</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Management Table */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin size-8 text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                           <User className="size-4" />
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}