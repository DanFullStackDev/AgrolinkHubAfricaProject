import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
import { Leaf, Menu, X } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
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
    <nav className="bg-card shadow-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Main Nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary">
              <Leaf className="size-5" />
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
            {user ? (
              <UserMenu user={user} logout={logout} getInitials={getInitials} />
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Collapsible) */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 border-t">
          {navLinks.map((link) => (
            <Button key={link.to} asChild variant="ghost" className="w-full justify-start">
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}
          <div className="pt-2 border-t">
            {user ? (
              <UserMenu user={user} logout={logout} getInitials={getInitials} mobile />
            ) : (
              <AuthButtons mobile />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Helper component for Auth Buttons
const AuthButtons = ({ mobile }) => (
  <>
    <Button asChild variant={mobile ? 'outline' : 'ghost'} className={mobile ? 'w-full' : ''}>
      <Link to="/login">Login</Link>
    </Button>
    <Button asChild className={mobile ? 'w-full' : ''}>
      <Link to="/register">Register</Link>
    </Button>
  </>
);

// Helper component for User Menu
const UserMenu = ({ user, logout, getInitials, mobile }) => {
  if (mobile) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 p-2">
          <Avatar className="size-8">
            <AvatarImage src={user.profileImage} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/dashboard">Dashboard</Link>
        </Button>
        <Button variant="outline" className="w-full" onClick={logout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
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
        <DropdownMenuItem asChild>
          <Link to="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};