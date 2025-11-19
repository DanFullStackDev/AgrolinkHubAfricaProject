import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Leaf, Menu, X, ShoppingCart } from 'lucide-react'; // Consolidated import

export function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const navLinks = [
    { to: '/browse', label: 'Browse Produce' },
    { to: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Main Nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary">
              <Leaf className="size-6" />
              AgrolinkHub
            </Link>
            <div className="hidden md:flex gap-4">
              {navLinks.map((link) => (
                <Button key={link.to} asChild variant="ghost">
                  <Link to={link.to}>{link.label}</Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Auth Buttons / User Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {/* Cart Icon */}
            <Button asChild variant="ghost" size="icon" className="relative mr-2">
              <Link to="/cart">
                <ShoppingCart className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

            {user ? (
              <UserMenu user={user} logout={logout} getInitials={getInitials} />
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Cart Icon */}
            <Link to="/cart" className="relative">
               <ShoppingCart className="size-5" />
               {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white font-bold">
                    {cartCount}
                  </span>
                )}
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Collapsible) */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 border-t bg-background">
          {navLinks.map((link) => (
            <Button key={link.to} asChild variant="ghost" className="w-full justify-start">
              <Link to={link.to} onClick={() => setIsMobileMenuOpen(false)}>
                {link.label}
              </Link>
            </Button>
          ))}
          <div className="pt-2 border-t">
            {user ? (
              <UserMenu 
                user={user} 
                logout={logout} 
                getInitials={getInitials} 
                mobile 
                closeMenu={() => setIsMobileMenuOpen(false)}
              />
            ) : (
              <AuthButtons mobile closeMenu={() => setIsMobileMenuOpen(false)} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Helper component for Auth Buttons
const AuthButtons = ({ mobile, closeMenu }) => (
  <>
    <Button 
      asChild 
      variant={mobile ? 'outline' : 'ghost'} 
      className={mobile ? 'w-full' : ''}
      onClick={closeMenu}
    >
      <Link to="/login">Login</Link>
    </Button>
    <Button 
      asChild 
      className={mobile ? 'w-full' : ''}
      onClick={closeMenu}
    >
      <Link to="/register">Register</Link>
    </Button>
  </>
);

// Helper component for User Menu
// ... keep the rest of the file the same ...

const UserMenu = ({ user, logout, getInitials, mobile, closeMenu }) => {
  if (mobile) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-2">
          <Avatar className="size-10">
            <AvatarImage src={user.profileImage} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button asChild variant="secondary" className="w-full justify-start" onClick={closeMenu}>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
        {/* ADDED SETTINGS LINK HERE */}
        <Button asChild variant="outline" className="w-full justify-start" onClick={closeMenu}>
          <Link to="/settings">Settings</Link>
        </Button>
        <Button variant="destructive" className="w-full" onClick={() => { logout(); closeMenu(); }}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.profileImage} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        {/* ADDED SETTINGS LINK HERE */}
        <DropdownMenuItem asChild>
          <Link to="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};