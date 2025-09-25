import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Heart } from 'lucide-react';
import { ComponentCard } from '@/components/ComponentCard';
import { mockComponents } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export const BusinessMarketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [conditionFilter, setConditionFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { toast } = useToast();

  const activeComponents = mockComponents.filter(c => c.status === 'Active');

  const filteredComponents = activeComponents.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || c.location.includes(locationFilter);
    const matchesCondition = conditionFilter === 'all' || c.condition === conditionFilter;
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    return matchesSearch && matchesLocation && matchesCondition && matchesCategory;
  });

  const handleInterestClick = (id: string) => {
    toast({
      title: "Interest expressed!",
      description: "The component owner will be notified.",
    });
  };

  const handleViewClick = (id: string) => {
    toast({
      title: "Component details",
      description: "Detailed view would open here.",
    });
  };

  // Unique filter options
  const locations = [...new Set(mockComponents.map(c => c.location))];
  const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];
  const categories = [...new Set(mockComponents.map(c => c.category))];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Component Marketplace</h1>
          <p className="text-muted-foreground">Discover reusable components</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Input
            placeholder="Search components..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px]"
          />
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Location" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={conditionFilter} onValueChange={setConditionFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Condition" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              {conditions.map(cond => <SelectItem key={cond} value={cond}>{cond}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="bg-accent/10 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {['Motherboards', 'RAM Modules', 'Logic Boards'].map(item => (
            <Badge key={item} variant="outline" className="border-accent text-accent">{item}</Badge>
          ))}
        </CardContent>
      </Card>

      {/* Components Grid */}
      {filteredComponents.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No components found</h3>
            <p className="text-muted-foreground">
              Adjust your filters or check back later for new listings.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map(c => (
            <ComponentCard
              key={c.id}
              component={c}
              onInterestClick={() => handleInterestClick(c.id)}
              onViewClick={() => handleViewClick(c.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
