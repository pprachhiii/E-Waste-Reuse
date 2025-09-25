import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Heart, MessageSquare, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ImpactCard } from '@/components/ImpactCard';
import { mockComponents, mockBusinessImpact, mockWishlist, mockTransactions } from '@/data/mockData';

export const BusinessDashboard: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const businessImpact = mockBusinessImpact[user.id] || { ewasteSavedKg: 0, co2ReducedKg: 0, successfulReuses: 0, totalComponents: 0 };
  const userWishlist = mockWishlist[user.id] || [];
  const userTransactions = mockTransactions.filter(t => t.businessId === user.id);
  const recommendedComponents = mockComponents.filter(c => c.status === 'Active').slice(0, 3);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome back, {user.name}{' '}
            {user.verified && <Shield className="inline w-5 h-5 text-success ml-1" />}
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your impact and manage your reuse activity
          </p>
        </div>
        <Link to="/business/marketplace">
          <Button>
            <Search className="w-4 h-4 mr-2" />
            Browse Marketplace
          </Button>
        </Link>
      </div>

      {/* Impact */}
      <div>
        <h2 className="text-lg font-medium mb-3">Your Environmental Impact</h2>
        <ImpactCard impact={businessImpact} role="business" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recommended Components */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Components</CardTitle>
              <CardDescription>Based on your wishlist and activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedComponents.map((component) => (
                <div
                  key={component.id}
                  className="border rounded-lg p-4 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{component.title}</h3>
                    <Badge variant="outline">{component.condition}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{component.location}</p>
                  <p className="text-sm line-clamp-2 mt-1">{component.description}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      View
                    </Button>
                    <Button size="sm" className="flex-1">
                      Express Interest
                    </Button>
                  </div>
                </div>
              ))}

              {recommendedComponents.length === 0 && (
                <p className="text-sm text-muted-foreground">No new recommendations yet</p>
              )}
            </CardContent>
          </Card>

          {/* Transactions Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Your recent reuse activity</CardDescription>
            </CardHeader>
            <CardContent>
              {userTransactions.length > 0 ? (
                <ul className="space-y-3">
                  {userTransactions.slice(0, 5).map((t) => (
                    <li key={t.id} className="flex justify-between text-sm">
                      <span>{t.componentTitle}</span>
                      <span className="text-muted-foreground">{t.date}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No transactions yet</p>
              )}
              <Link to="/business/transactions">
                <Button variant="outline" size="sm" className="mt-3">
                  View All
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/business/wishlist">
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Manage Wishlist
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Wishlist Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {userWishlist.length > 0 ? (
                userWishlist.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{item}</span>
                    <Badge variant="outline" className="text-xs">
                      Tracking
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No items in wishlist</p>
              )}
              <Link to="/business/wishlist">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View Wishlist
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
