
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Activity } from 'lucide-react';

type AuthMode = 'login' | 'register';

const AuthForm = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - would connect to backend in real app
    console.log('Form submitted:', formData);
    
    // Simulate successful login/registration
    navigate('/dashboard');
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <Card className="w-full max-w-md bg-card text-card-foreground">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="flex items-center justify-center mb-2 bg-primary/10 p-2 rounded-full">
          <Activity className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl text-foreground">
          {mode === 'login' ? 'Welcome back' : 'Create an account'}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {mode === 'login'
            ? 'Enter your credentials to access your account'
            : 'Enter your information to create an account'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-background text-foreground"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-background text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="bg-background text-foreground"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full bg-fitness-primary hover:bg-blue-600 text-white">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <Button variant="link" type="button" onClick={toggleMode} className="p-0 text-primary">
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;
