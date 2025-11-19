import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowLeft, User, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../contexts/CartContext';
import { Star } from 'lucide-react';

export function ProduceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produce, setProduce] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

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

  // Define the handler BEFORE any return statements that might use it
  const handleAddToCart = () => {
    if (produce) {
      addToCart(produce, 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-lg text-muted-foreground">Loading details...</p>
      </div>
    );
  }

  if (!produce) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold">Produce not found</h2>
        <Button onClick={() => navigate('/browse')} className="mt-4">
          Back to Browse
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate('/browse')} 
        className="mb-6 pl-0 hover:pl-2 transition-all"
      >
        <ArrowLeft className="mr-2 size-4" /> Back to Browse
      </Button>
<div className="flex items-center justify-between">
  <p className="font-semibold text-lg">
    {produce.farmerId?.name}
  </p>
  <div className="flex items-center text-yellow-500">
    <span className="font-bold mr-1">{produce.farmerId?.rating || 0}</span>
    <Star className="fill-current size-4" />
    <span className="text-muted-foreground text-xs ml-1">
      ({produce.farmerId?.numReviews || 0} reviews)
    </span>
  </div>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Image */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl border bg-muted relative">
            <img
              src={produce.images[0]}
              alt={produce.title}
              className="h-full w-full object-cover"
            />
            <Badge className="absolute top-4 right-4 text-sm px-3 py-1">
              {produce.category}
            </Badge>
          </div>
        </div>

        {/* Right Column: Details */}
        {/* Right Column: Details */}
<div className="flex flex-col gap-6">
  <div>
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
      {produce.title}
    </h1>
    <div className="flex items-center text-muted-foreground">
      <MapPin className="mr-2 size-4" />
      <span>{produce.location}</span>
    </div>
  </div>

  <div className="flex items-baseline gap-2 pb-4 border-b">
    <span className="text-3xl font-bold text-primary">
      KSh {produce.price}
    </span>
    <span className="text-lg text-muted-foreground">
      / {produce.unit}
    </span>
  </div>

  <div className="space-y-4">
    <h3 className="font-semibold text-lg">Description</h3>
    <p className="text-gray-600 leading-relaxed">
      {produce.description}
    </p>
  </div>

  {/* Optimized Farmer Card with Ratings moved here */}
  <Card className="bg-muted/50 border-none">
    <CardContent className="p-4 flex items-center gap-4">
      <div className="bg-primary/10 p-3 rounded-full">
        <User className="size-6 text-primary" />
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-muted-foreground">Farmer</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">
            {produce.farmerId?.name || "Unknown Farmer"}
          </p>
          {/* Star Rating Display */}
          <div className="flex items-center text-yellow-500 bg-white px-2 py-1 rounded-full shadow-sm">
            <span className="font-bold mr-1">{produce.farmerId?.rating?.toFixed(1) || "New"}</span>
            <Star className="fill-current size-3" />
            <span className="text-muted-foreground text-xs ml-1 border-l pl-1 border-gray-300">
              {produce.farmerId?.numReviews || 0} reviews
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Action Buttons */}
  <div className="flex flex-col gap-3 mt-auto pt-6">
     <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-muted-foreground">Availability:</span>
        <span className={produce.quantity > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
          {produce.quantity > 0 ? `${produce.quantity} ${produce.unit} in stock` : 'Out of Stock'}
        </span>
     </div>
    
    <Button 
      size="lg" 
      className="w-full text-lg gap-2" 
      disabled={produce.quantity <= 0}
      onClick={handleAddToCart}
    >
      <ShoppingCart className="size-5" />
      Add to Cart
    </Button>
  </div>
</div>
      </div>
    </div>
  );
}