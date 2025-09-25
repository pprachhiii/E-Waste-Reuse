import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockWishlist } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export const BusinessWishlist: React.FC = () => {
  const { user } = useAuth();
  const [newItem, setNewItem] = useState('');
  const { toast } = useToast();

  if (!user) return null;

  const userWishlist = mockWishlist[user.id] || [];

  const handleAdd = () => {
    if (!newItem.trim()) return;
    toast({
      title: 'Added to wishlist',
      description: `"${newItem}" has been added to your wishlist.`,
    });
    setNewItem('');
  };

  const handleRemove = (item: string) => {
    toast({
      title: 'Removed from wishlist',
      description: `"${item}" has been removed from your wishlist.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1 text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
        <p className="text-gray-500">Track components and items you’re interested in</p>
      </div>

      {/* Add New Item Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="w-5 h-5 text-indigo-500" />
            Add New Item
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="e.g., Capacitors, RAM Modules..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            className="flex-1"
          />
          <Button onClick={handleAdd} className="bg-indigo-500 hover:bg-indigo-600 text-white">
            Add
          </Button>
        </CardContent>
      </Card>

      {/* Wishlist Items Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="w-5 h-5 text-pink-500" />
            Your Wishlist ({userWishlist.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userWishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Heart className="w-12 h-12 mb-4" />
              <p>No items added yet. Start by adding something above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {userWishlist.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-pink-500" />
                    <span className="font-medium text-gray-800">{item}</span>
                    <Badge variant="outline" className="text-gray-500 border-gray-300">
                      Tracking
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemove(item)}
                    className="text-red-500 hover:text-red-600 border-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
