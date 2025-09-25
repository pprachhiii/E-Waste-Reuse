import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, Upload, List, MessageCircle, TrendingUp, 
  Search, Heart, History, LogOut, Leaf 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const consumerNav = [
    { path: '/consumer/dashboard', label: 'Dashboard', icon: Home },
    { path: '/consumer/upload', label: 'Upload', icon: Upload },
    { path: '/consumer/listings', label: 'My Listings', icon: List },
    { path: '/consumer/matches', label: 'Matches', icon: MessageCircle },
    { path: '/consumer/impact', label: 'Impact', icon: TrendingUp }
  ];

  const businessNav = [
    { path: '/business/dashboard', label: 'Dashboard', icon: Home },
    { path: '/business/marketplace', label: 'Marketplace', icon: Search },
    { path: '/business/wishlist', label: 'Wishlist', icon: Heart },
    { path: '/business/transactions', label: 'Transactions', icon: History },
    { path: '/business/impact', label: 'Impact', icon: TrendingUp }
  ];

  const navItems = user.role === 'consumer' ? consumerNav : businessNav;

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">re-mate</span>
          </Link>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button
                  variant={isActive(path) ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'flex items-center space-x-2',
                    isActive(path) && 'bg-primary text-primary-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center space-x-4">
            <Link to="/chat">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden md:inline">Chat</span>
              </Button>
            </Link>

            <div className="flex items-center space-x-2">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role} {user.verified && '✓'}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};
