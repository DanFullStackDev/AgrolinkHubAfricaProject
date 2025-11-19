import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // We'll add this component in a sec
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ProductCard({ product }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="relative h-48 w-full bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-white/90 text-black hover:bg-white/90">
          {product.category}
        </Badge>
      </div>

      {/* Content Section */}
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg line-clamp-1">{product.title}</h3>
        </div>
        <div className="flex items-center text-muted-foreground text-xs mt-1">
          <MapPin className="size-3 mr-1" />
          {product.location}
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
          {product.description}
        </p>
        <div className="font-bold text-primary text-lg">
          KSh {product.price} <span className="text-sm font-normal text-muted-foreground">/ {product.unit}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Available: {product.quantity} {product.unit}
        </p>
      </CardContent>

      {/* Footer / Actions */}
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link to={`/produce/${product._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}