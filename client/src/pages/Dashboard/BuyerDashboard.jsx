import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // <--- ADDED THIS
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner'; // <--- ADDED THIS
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"; 
import { Textarea } from "@/components/ui/textarea";

export function BuyerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleReview = async (farmerId, rating, comment) => {
    try {
      await api.post(`/api/users/${farmerId}/reviews`, { rating, comment });
      toast.success("Review submitted!");
      // Optional: Close dialog or refresh orders here if you want to prevent double reviews visually
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/api/orders/myorders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error("Failed to load order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Buyer Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>My Order History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          ) : orders.length === 0 ? (
            <p className="text-muted-foreground py-4">You have not placed any orders yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead> {/* Added header for the button column */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-mono text-xs">
                      #{order._id.slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="text-sm">
                            {item.qty}x {item.title}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-bold">
                      KSh {order.total}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        order.status === 'Delivered' ? 'default' : 
                        order.status === 'Cancelled' ? 'destructive' : 'secondary'
                      }>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.status === 'Delivered' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">Rate Farmer</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Rate this Farmer</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.target);
                              handleReview(order.farmerId._id, formData.get('rating'), formData.get('comment'));
                            }} className="space-y-4">
                              <select name="rating" className="w-full p-2 border rounded bg-background">
                                <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                                <option value="4">⭐⭐⭐⭐ (4)</option>
                                <option value="3">⭐⭐⭐ (3)</option>
                                <option value="2">⭐⭐ (2)</option>
                                <option value="1">⭐ (1)</option>
                              </select>
                              <Textarea name="comment" placeholder="How was the produce?" required />
                              <Button type="submit" className="w-full">Submit Review</Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="opacity-50 pointer-events-none">
        <CardHeader>
          <CardTitle>My Wishlist (Coming Soon)</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Save your favorite produce for later.</p>
        </CardContent>
      </Card>
    </div>
  );
}