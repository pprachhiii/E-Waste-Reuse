import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, User, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'consumer' | 'business'>('consumer');

  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password, activeTab);
      if (success) {
        toast({
          title: 'Welcome back!',
          description: 'You have been successfully logged in.',
        });
        navigate(activeTab === 'consumer' ? '/consumer/dashboard' : '/business/dashboard');
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid credentials. Try the demo accounts below.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during login.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Updated demo accounts to match mockUsers
  const demoAccounts = {
    consumer: { email: 'aarav.mehta@gmail.com', password: 'demo123' },
    business: { email: 'contact@ecoreclaim.in', password: 'demo123' },
  };

  const handleDemoLogin = (type: 'consumer' | 'business') => {
    const account = demoAccounts[type];
    setEmail(account.email);
    setPassword(account.password);
    setActiveTab(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-eco">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            re-mate
          </h1>
          <p className="text-muted-foreground mt-2">
            Giving electronics a second life, one connection at a time
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-eco">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Tabs for Consumer / Business */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'consumer' | 'business')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="consumer" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Consumer
                </TabsTrigger>
                <TabsTrigger value="business" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Business
                </TabsTrigger>
              </TabsList>

              {/* Consumer Demo */}
              <TabsContent value="consumer" className="space-y-4">
                <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <p className="text-sm text-success font-medium">Demo Consumer Account</p>
                  <p className="text-xs text-muted-foreground mt-1">aarav.mehta@gmail.com / demo123</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleDemoLogin('consumer')}
                  >
                    Use Demo Account
                  </Button>
                </div>
              </TabsContent>

              {/* Business Demo */}
              <TabsContent value="business" className="space-y-4">
                <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm text-accent font-medium">Demo Business Account</p>
                  <p className="text-xs text-muted-foreground mt-1">contact@ecoreclaim.in / demo123</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleDemoLogin('business')}
                  >
                    Use Demo Account
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
