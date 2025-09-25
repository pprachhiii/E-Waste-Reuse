import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Eye, MessageCircle, Plus } from 'lucide-react';
import { ImpactCard } from '@/components/ImpactCard';
import { mockConsumerImpact, mockChats } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

interface ConsumerDashboardProps {
  components: any[];
}

export const ConsumerDashboard: React.FC<ConsumerDashboardProps> = ({ components }) => {
  const { user } = useAuth();
  if (!user) return null;

  const userComponents = components.filter(c => c.consumerId === user.id);
  const userImpact = mockConsumerImpact[user.id] || { ewasteSavedKg: 0, co2ReducedKg: 0, successfulReuses: 0 };
  const userChats = mockChats.filter(c => c.participants.includes(user.id));

  const recentActivity = [
    { text: "Your MacBook Pro Motherboard was viewed 3 times today", time: "2 hours ago" },
    { text: "EcoReclaim Pvt Ltd expressed interest in your iPhone Logic Board", time: "4 hours ago" },
    { text: "You uploaded a new component: MacBook Pro Motherboard", time: "1 day ago" }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground mt-1">
            Track your listings and sustainability impact
          </p>
        </div>
        <Link to="/consumer/upload">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Upload Component
          </Button>
        </Link>
      </div>

      {/* Impact */}
      <div>
        <h2 className="text-lg font-medium mb-3">Your Environmental Impact</h2>
        <ImpactCard impact={userImpact} role="consumer" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Active Listings</p>
              <p className="text-2xl font-semibold">
                {userComponents.filter(c => c.status === 'Active').length}
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-2xl font-semibold">
                {userComponents.reduce((sum, c) => sum + c.views, 0)}
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Active Chats</p>
              <p className="text-2xl font-semibold">{userChats.length}</p>
            </div>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>What’s been happening with your components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/consumer/upload">
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Component
                </Button>
              </Link>
              <Link to="/consumer/listings">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  View My Listings
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Messages
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* My Components Preview */}
          <Card>
            <CardHeader>
              <CardTitle>My Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {userComponents.slice(0, 3).map((component) => (
                <div key={component.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{component.title}</p>
                    <p className="text-xs text-muted-foreground">{component.views} views</p>
                  </div>
                  <Badge
                    variant={component.status === 'Active' ? 'default' : 'secondary'}
                    className="ml-2"
                  >
                    {component.status}
                  </Badge>
                </div>
              ))}
              {userComponents.length === 0 && (
                <p className="text-sm text-muted-foreground">No components listed yet</p>
              )}
              <Link to="/consumer/listings">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View All
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
