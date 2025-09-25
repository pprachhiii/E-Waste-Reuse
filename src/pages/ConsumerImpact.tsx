import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { ImpactCard } from '@/components/ImpactCard';
import { mockConsumerImpact, mockComponents } from '@/data/mockData';

export const ConsumerImpact: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const userImpact = mockConsumerImpact[user.id] || { ewasteSavedKg: 0, co2ReducedKg: 0, successfulReuses: 0 };
  const userComponents = mockComponents.filter(c => c.consumerId === user.id);

  const milestones = [
    { title: 'First Upload', description: 'Listed your first component', achieved: userComponents.length > 0 },
    { title: 'Eco Warrior', description: 'Saved 5kg of e-waste', achieved: userImpact.ewasteSavedKg >= 5 },
    { title: 'Carbon Saver', description: 'Reduced 3kg of CO₂', achieved: userImpact.co2ReducedKg >= 3 },
    { title: 'Reuse Champion', description: '5 successful reuses', achieved: userImpact.successfulReuses >= 5 }
  ];

  const impactHistory = [
    { date: '2025-09-22', component: 'iPhone 12 Logic Board', impact: { ewaste: 0.8, co2: 0.5 }, status: 'Reused' },
    { date: '2025-09-15', component: 'MacBook Pro Motherboard', impact: { ewaste: 2.1, co2: 1.4 }, status: 'Listed' },
    { date: '2025-09-10', component: 'Dell RAM Module', impact: { ewaste: 0.3, co2: 0.2 }, status: 'Reused' }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Environmental Impact</h1>
        <p className="text-muted-foreground">Track your contribution to a sustainable future</p>
      </div>

      <ImpactCard impact={userImpact} role="consumer" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Milestones */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Your sustainability milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex justify-between items-center p-2 border rounded-md">
                <div>
                  <p className="font-medium">{m.title}</p>
                  <p className="text-sm text-muted-foreground">{m.description}</p>
                </div>
                <span className={`text-sm font-medium ${m.achieved ? 'text-success' : 'text-muted-foreground'}`}>
                  {m.achieved ? 'Achieved' : 'Locked'}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Impact Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Impact Breakdown</CardTitle>
            <CardDescription>How your actions make a difference</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { label: 'E-waste Diverted', value: userImpact.ewasteSavedKg, goal: 10, color: 'bg-success' },
              { label: 'Carbon Footprint Reduced', value: userImpact.co2ReducedKg, goal: 7, color: 'bg-primary' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value} kg</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className={`${item.color} rounded-full h-2`} style={{ width: `${Math.min((item.value / item.goal) * 100, 100)}%` }} />
                </div>
              </div>
            ))}

            <div className="p-3 bg-muted/10 rounded-md text-sm text-muted-foreground">
              Every 1kg of e-waste recycled saves approximately 0.67kg of CO₂ emissions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact History */}
      <Card>
        <CardHeader>
          <CardTitle>Impact History</CardTitle>
          <CardDescription>Timeline of your contributions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {impactHistory.map((entry, i) => (
            <div key={i} className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <p className="font-medium">{entry.component}</p>
                <p className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right text-sm">
                <p>{entry.impact.ewaste}kg e-waste • {entry.impact.co2}kg CO₂</p>
                <span className={`font-medium ${entry.status === 'Reused' ? 'text-success' : 'text-muted-foreground'}`}>
                  {entry.status}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
