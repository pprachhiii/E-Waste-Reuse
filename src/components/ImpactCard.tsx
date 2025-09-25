import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Leaf, Recycle } from 'lucide-react';
import { Impact } from '@/data/mockData';

interface ImpactCardProps {
  impact: Impact;
  role: 'consumer' | 'business';
}

export const ImpactCard: React.FC<ImpactCardProps> = ({ impact, role }) => {
  const cards = [
    {
      title: 'E-waste Saved',
      value: `${impact.ewasteSavedKg} kg`,
      description: role === 'consumer' 
        ? 'Components diverted from landfill' 
        : 'Components reused',
      icon: <Recycle className="w-5 h-5 text-success" />,
      gradient: 'from-success/5 to-success/10',
      border: 'border-success/20',
      textColor: 'text-success'
    },
    {
      title: 'CO₂ Reduced',
      value: `${impact.co2ReducedKg} kg`,
      description: 'Carbon footprint reduction',
      icon: <Leaf className="w-5 h-5 text-primary" />,
      gradient: 'from-primary/5 to-primary/10',
      border: 'border-primary/20',
      textColor: 'text-primary'
    },
    {
      title: role === 'consumer' ? 'Successful Reuses' : 'Components Acquired',
      value: role === 'consumer' ? impact.successfulReuses : impact.totalComponents || 0,
      description: role === 'consumer' 
        ? 'Components successfully reused' 
        : 'Total components sourced',
      icon: <TrendingUp className="w-5 h-5 text-accent" />,
      gradient: 'from-accent/5 to-accent/10',
      border: 'border-accent/20',
      textColor: 'text-accent'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <Card key={idx} className={`${card.border} bg-gradient-to-br ${card.gradient}`}>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.textColor}`}>{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
