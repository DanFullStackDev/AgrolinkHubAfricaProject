import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import api from '../services/api'; // Import your API instance
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, ArrowLeft, ShoppingBag, Loader2 } from 'lucide-react'; // Added Loader2
import { toast } from 'sonner'; // Import toast for notifications

export function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false); // Add loading state

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);

    try {
      // 1. Group items by Farmer
      // In a complex app, you might create separate orders per farmer.
      // For this MVP, we'll just take the first item's farmer ID to simplify, 
      // OR we need to handle mixed carts. 
      // Ideally, the backend should handle splitting orders, but let's keep it simple:
      // We will create ONE order per Farmer if the cart has mixed items.
      
      // Let's check if we have items from multiple farmers.
      const farmers = [...new Set(cartItems.map(item => 
  typeof item.farmerId === 'object' ? item.farmerId._id : item.farmerId
))];
      
      for (const farmerId of farmers) {
        const itemsForThisFarmer = cartItems.filter(
          item => (item.farmerId._id || item.farmerId) === farmerId
        );
        
        const totalForThisFarmer = itemsForThisFarmer.reduce(
            (acc, item) => acc + item.price * item.qty, 0
        );

        const orderData = {
          orderItems: itemsForThisFarmer.map(item => ({
            produceId: item._id,
            title: item.title,
            qty: item.qty,
            image: item.images[0],
            price: item.price,
          })),
          farmerId: farmerId,
          total: totalForThisFarmer,
          deliveryInfo: {
            address: "123 Nairobi Road", // Mock address for now
            city: "Nairobi",
            postalCode: "00100",
            country: "Kenya"
          }
        };

        // 2. Send request to backend
        await api.post('/api/orders', orderData);
      }

      // 3. Success!
      toast.success("Order placed successfully!");
      clearCart();
      navigate('/checkout-success');

    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error(error.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center space-y-6">
        <div className="bg-muted/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="size-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-muted-foreground">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild size="lg">
          <Link to="/browse">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ShoppingBag className="size-8" /> Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <CardContent className="p-4 flex gap-4 items-center">
                {/* Image */}
                <div className="h-24 w-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.category} • {item.location}
                  </p>
                  <div className="font-medium text-primary">
                    KSh {item.price} / {item.unit}
                  </div>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <label htmlFor={`qty-${item._id}`} className="sr-only">Quantity</label>
                    <Input
                      id={`qty-${item._id}`}
                      type="number"
                      min="1"
                      max={item.quantity} 
                      value={item.qty}
                      onChange={(e) => updateQuantity(item._id, e.target.value)}
                      className="w-16 h-8 text-center p-1"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 h-8 px-2"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <Trash2 className="size-4 mr-1" /> Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button variant="outline" asChild className="mt-4">
            <Link to="/browse">
              <ArrowLeft className="mr-2 size-4" /> Continue Shopping
            </Link>
          </Button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>KSh {cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping Estimate</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>KSh {cartTotal}</span>
              </div>

              <Button 
                size="lg" 
                className="w-full mt-4" 
                onClick={handleCheckout}
                disabled={isCheckingOut} // Disable while loading
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  'Proceed to Checkout'
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Secure checkout powered by AgrolinkHub
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}