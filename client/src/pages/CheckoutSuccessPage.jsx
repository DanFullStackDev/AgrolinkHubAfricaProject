import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto py-20 text-center space-y-6 max-w-md">
      <div className="flex justify-center">
        <CheckCircle className="size-24 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold text-primary">Order Placed Successfully!</h1>
      <p className="text-muted-foreground text-lg">
        Thank you for supporting local farmers. Your order has been received and is being processed.
      </p>
      <div className="pt-6 flex flex-col gap-3">
        <Button asChild size="lg">
          <Link to="/dashboard">View My Orders</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/browse">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}