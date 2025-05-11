
import React from 'react';
import AuthForm from '@/components/Auth/AuthForm';
import { Activity, PieChart, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

const Auth = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 shadow-sm z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/">
                <Activity className="h-8 w-8 text-fitness-primary" />
                <span className="text-xl font-bold">FitTracker</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavigationMenu>
                <NavigationMenuList>
                  <Link to="/" className={navigationMenuTriggerStyle()}>
                    Home
                  </Link>
                  <a href="/#features" className={navigationMenuTriggerStyle()}>
                    Features
                  </a>
                  <a href="/#testimonials" className={navigationMenuTriggerStyle()}>
                    Testimonials
                  </a>
                </NavigationMenuList>
              </NavigationMenu>
              
              <div className="ml-4">
                <Button asChild variant="outline">
                  <Link to="/auth">Log In</Link>
                </Button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu />
              </Button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 pt-2">
              <div className="flex flex-col space-y-2">
                <Link to="/" className="px-3 py-2 rounded-md hover:bg-gray-100">
                  Home
                </Link>
                <a href="/#features" className="px-3 py-2 rounded-md hover:bg-gray-100">
                  Features
                </a>
                <a href="/#testimonials" className="px-3 py-2 rounded-md hover:bg-gray-100">
                  Testimonials
                </a>
                <Link to="/auth" className="px-3 py-2 rounded-md hover:bg-gray-100 text-fitness-primary">
                  Log In
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Auth Form Section with padding for navbar */}
      <div className="flex flex-col md:flex-row pt-20">
        {/* Hero Section */}
        <div className="bg-fitness-primary flex-1 flex flex-col justify-center items-center p-6 md:p-12 text-white">
          <div className="max-w-md text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-6">
              <Activity className="h-12 w-12" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">FitTracker</h1>
            <p className="text-xl mb-6">Your personalized fitness companion for tracking workouts, nutrition, and progress.</p>
            
            <div className="hidden md:block space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Track Workouts</h3>
                  <p className="text-sm text-white/80">Log exercises, sets, reps, and duration</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <PieChart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Monitor Nutrition</h3>
                  <p className="text-sm text-white/80">Track calories and macronutrient intake</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Visualize Progress</h3>
                  <p className="text-sm text-white/80">See your fitness journey with detailed charts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Auth Form Section */}
        <div className="flex-1 flex items-center justify-center p-6">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Auth;
