import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MapPin, Calendar, MessageCircle } from 'lucide-react';
import { Component } from '@/data/mockData';

interface ComponentCardProps {
  component: Component;
  showActions?: boolean;
  onInterestClick?: (componentId: string) => void;
  onViewClick?: (componentId: string) => void;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  showActions = true,
  onInterestClick,
  onViewClick
}) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'bg-success text-success-foreground';
      case 'Good': return 'bg-primary text-primary-foreground';
      case 'Fair': return 'bg-warning text-warning-foreground';
      case 'Poor': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Reserved': return 'bg-warning text-warning-foreground';
      case 'Sold': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {component.title}
          </CardTitle>
          <Badge className={getStatusColor(component.status)}>
            {component.status}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {component.location}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {component.views} views
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(component.uploadDate).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
          <img 
            src={component.images[0]} 
            alt={component.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {component.description}
        </p>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline">{component.category}</Badge>
          <Badge className={getConditionColor(component.condition)}>
            {component.condition}
          </Badge>
        </div>

        <div className="bg-accent/10 p-3 rounded-lg">
          <p className="text-sm font-medium text-accent">AI Analysis</p>
          <p className="text-sm text-muted-foreground">{component.aiCategory}</p>
        </div>

        <div className="text-sm text-muted-foreground">
          Listed by: <span className="font-medium">{component.consumerName}</span>
        </div>

        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onViewClick?.(component.id)}
            >
              View Details
            </Button>
            <Button 
              size="sm" 
              className="flex-1 flex items-center justify-center gap-1"
              onClick={() => onInterestClick?.(component.id)}
            >
              <MessageCircle className="w-4 h-4" />
              Express Interest
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
