import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ImpactCard } from '@/components/ImpactCard';
import { mockBusinessImpact } from '@/data/mockData';

export const BusinessImpact: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const businessImpact =
    mockBusinessImpact[user.id] || { ewasteSavedKg: 0, co2ReducedKg: 0, successfulReuses: 0, totalComponents: 0 };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold">Environmental Impact</h1>
        <p className="text-muted-foreground mt-1">
          Your business contribution to a sustainable future
        </p>
      </div>

      {/* Visual Impact */}
      <ImpactCard impact={businessImpact} role="business" />

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Impact Summary
          </CardTitle>
          <CardDescription>
            How your business supports the circular economy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-success/10 rounded-lg space-y-2">
            <p className="font-medium text-success">Environmental Benefits</p>
            <p className="text-sm text-muted-foreground">
              By reusing <span className="font-semibold">{businessImpact.totalComponents}</span> components, 
              you’ve prevented <span className="font-semibold">{businessImpact.ewasteSavedKg}kg</span> of e-waste 
              from entering landfills and reduced <span className="font-semibold">{businessImpact.co2ReducedKg}kg</span> 
              of CO₂ emissions.
            </p>
            <p className="text-sm text-muted-foreground">
              Successful reuses: <span className="font-semibold">{businessImpact.successfulReuses}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
