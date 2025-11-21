import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Sprout, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function HomePage() {
  const { user } = useAuth();

  // Debugging: Check the console to see if user is detected
  console.log("Current User in HomePage:", user);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-900 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empowering Africa's Farmers
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
            Directly connecting smallholder farmers with buyers. 
            Better prices, fresher produce, and zero hunger.
          </p>
          
          {/* DYNAMIC BUTTONS SECTION */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              // --- OPTION A: NOT LOGGED IN ---
              <>
                <Button asChild size="lg" className="text-lg px-8 bg-green-500 hover:bg-green-600 text-white border-none">
                  <Link to="/login">Buy Produce</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-green-900">
                  <Link to="/register">Join as Farmer</Link>
                </Button>
              </>
            ) : (
              // --- OPTION B: LOGGED IN ---
              <>
                {user.role === 'Farmer' && (
                  <Button asChild size="lg" className="text-lg px-8 bg-green-500 hover:bg-green-600 text-white border-none">
                    <Link to="/dashboard">Visit My Farmer Dashboard</Link>
                  </Button>
                )}
                {user.role === 'Expert' && (
                  <Button asChild size="lg" className="text-lg px-8 bg-blue-500 hover:bg-blue-600 text-white border-none">
                    <Link to="/dashboard">Visit My Expert Dashboard</Link>
                  </Button>
                )}
                {user.role === 'Buyer' && (
                  <Button asChild size="lg" className="text-lg px-8 bg-green-500 hover:bg-green-600 text-white border-none">
                    <Link to="/browse">Explore Best Produce</Link>
                  </Button>
                )}
                {user.role === 'Admin' && (
                  <Button asChild size="lg" className="text-lg px-8 bg-purple-600 hover:bg-purple-700 text-white border-none">
                    <Link to="/dashboard">Admin Panel</Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Impact Goals</h2>
            <p className="text-muted-foreground mt-2">Aligned with UN Sustainable Development Goals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-lg bg-green-50/50">
              <CardContent className="pt-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="size-8 text-green-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">SDG 1: No Poverty</h3>
                <p className="text-gray-600">
                  Increasing smallholder farmer incomes by removing middlemen and opening new markets.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg bg-green-50/50">
              <CardContent className="pt-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sprout className="size-8 text-green-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">SDG 2: Zero Hunger</h3>
                <p className="text-gray-600">
                  Reducing post-harvest losses and ensuring efficient food distribution chains.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg bg-green-50/50">
              <CardContent className="pt-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="size-8 text-green-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community First</h3>
                <p className="text-gray-600">
                  Building a transparent digital community where farmers and buyers thrive together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to support local agriculture?</h2>
          <Button asChild size="lg" variant="secondary">
            <Link to="/browse" className="gap-2">
              <ShoppingCart className="size-5" /> Start Shopping Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}