import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { PlusCircle, Package, DollarSign, Loader2, Trash2, Edit, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function FarmerDashboard() {
  const [sales, setSales] = useState([]);
  const [myProduce, setMyProduce] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Fetch Orders (Sales)
      const salesRes = await api.get('/api/orders/sales');
      setSales(salesRes.data);

      // Fetch My Produce
      const produceRes = await api.get('/api/produce'); 
      
      // --- FIX START ---
      // The API now returns an object { produce: [], page: 1, ... }
      // So we access .produce to get the array
      const allProduce = produceRes.data.produce || []; 
      
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const myItems = allProduce.filter(item => 
          (item.farmerId._id === user._id) || (item.farmerId === user._id)
        );
        setMyProduce(myItems);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProduce = async (id) => {
    try {
      await api.delete(`/api/produce/${id}`);
      toast.success("Produce deleted successfully");
      fetchData(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete produce");
    }
  };

  const totalEarnings = sales.reduce((acc, order) => acc + order.total, 0);

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Farmer Dashboard</h1>
      
      {/* 2. Add this Button Group */}
      <div className="flex gap-3">
        <Button asChild variant="outline">
          <Link to="/messages">
            <MessageSquare className="mr-2 size-4" /> Messages
          </Link>
        </Button>
        
        <Button asChild>
          <Link to="/produce/new">
            <PlusCircle className="mr-2 size-4" /> Add New Produce
          </Link>
        </Button>
      </div>
    </div>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {totalEarnings.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myProduce.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* My Listings Table */}
      <Card>
        <CardHeader>
          <CardTitle>My Produce Listings</CardTitle>
        </CardHeader>
        <CardContent>
          {myProduce.length === 0 ? (
            <p className="text-muted-foreground py-4 text-center">You haven't listed any produce yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myProduce.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <img src={item.images[0]} alt={item.title} className="w-10 h-10 rounded object-cover" />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>KSh {item.price} / {item.unit}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    
                    {/* COMBINED ACTIONS CELL */}
                    <TableCell className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        asChild 
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Link to={`/produce/edit/${item._id}`}>
                          <Edit className="size-4" />
                        </Link>
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete your listing for <strong>{item.title}</strong>.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-red-600 hover:bg-red-700" 
                              onClick={() => handleDeleteProduce(item._id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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