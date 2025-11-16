import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Leaf className="size-5 text-primary" />
            AgrolinkHubAfrica
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
              About Us
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">
          © {new Date().getFullYear()} AgrolinkHubAfrica. All rights reserved.
        </p>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Aligning with SDG 1 (No Poverty) and SDG 2 (Zero Hunger).
        </p>
      </div>
    </footer>
  );
}