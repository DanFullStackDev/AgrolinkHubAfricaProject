import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowLeft, User, ShoppingCart, MessageCircle } from 'lucide-react'; // Added MessageCircle
import { toast } from 'sonner';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext'; // Import Auth
import { Star } from 'lucide-react';
import { ChatBox } from '../components/ChatBox'; // Import ChatBox

export function ProduceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produce, setProduce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false); // Chat state
  const { addToCart } = useCart();
  const { user } = useAuth(); // Get current user

  useEffect(() => {
    const fetchProduceDetails = async () => {
      try {
        const response = await api.get(`/api/produce/${id}`);
        setProduce(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
        toast.error('Could not load produce details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduceDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (produce) {
      addToCart(produce, 1);
    }
  };

  // Helper to generate a unique room ID for this buyer-farmer pair
  const getRoomId = (userId, farmerId) => {
    // Sort IDs so room "A_B" is the same as "B_A"
    return [userId, farmerId].sort().join("_");
  };

  if (loading) {
    return <div className="container mx-auto py-10 text-center"><p>Loading details...</p></div>;
  }

  if (!produce) {
    return <div className="container mx-auto py-10 text-center"><h2>Produce not found</h2></div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <Button variant="ghost" onClick={() => navigate('/browse')} className="mb-6 pl-0 hover:pl-2 transition-all">
        <ArrowLeft className="mr-2 size-4" /> Back to Browse
      </Button>

      <div className="flex items-center justify-between mb-6">
        <p className="font-semibold text-lg">{produce.farmerId?.name}</p>
        <div className="flex items-center text-yellow-500">
          <span className="font-bold mr-1">{produce.farmerId?.rating?.toFixed(1) || "New"}</span>
          <Star className="fill-current size-4" />
          <span className="text-muted-foreground text-xs ml-1">({produce.farmerId?.numReviews || 0} reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl border bg-muted relative">
            <img src={produce.images[0]} alt={produce.title} className="h-full w-full object-cover" />
            <Badge className="absolute top-4 right-4 text-sm px-3 py-1">{produce.category}</Badge>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{produce.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-2 size-4" />
              <span>{produce.location}</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 pb-4 border-b">
            <span className="text-3xl font-bold text-primary">KSh {produce.price}</span>
            <span className="text-lg text-muted-foreground">/ {produce.unit}</span>
          </div>

          <p className="text-gray-600 leading-relaxed">{produce.description}</p>

          {/* Farmer Card */}
          <Card className="bg-muted/50 border-none">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <User className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Farmer</p>
                <p className="font-semibold text-lg">{produce.farmerId?.name || "Unknown Farmer"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-auto pt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Availability:</span>
              <span className={produce.quantity > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                {produce.quantity > 0 ? `${produce.quantity} ${produce.unit} in stock` : 'Out of Stock'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {user && user._id !== produce.farmerId?._id && (
                <Button variant="outline" size="lg" className="gap-2" onClick={() => setShowChat(!showChat)}>
                  <MessageCircle className="size-5" />
                  Chat with Farmer
                </Button>
              )}
              
              <Button size="lg" className={user && user._id !== produce.farmerId?._id ? "gap-2" : "w-full gap-2 col-span-2"} disabled={produce.quantity <= 0} onClick={handleAddToCart}>
                <ShoppingCart className="size-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Box Overlay */}
      {showChat && user && (
        <ChatBox 
  roomId={getRoomId(user._id, produce.farmerId._id)} 
  username={user.name}
  userId={user._id}                 // <--- Pass this
  recipientId={produce.farmerId._id} // <--- Pass this
  onClose={() => setShowChat(false)} 
/>
      )}
    </div>
  );
}