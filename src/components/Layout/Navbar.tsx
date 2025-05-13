
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Activity, 
  User, 
  Calendar, 
  List, 
  PieChart, 
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Nav */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border md:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <Link to="/dashboard" className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-xs text-foreground">Home</span>
          </Link>
          
          <Link to="/workouts" className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted">
            <List className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-foreground">Workouts</span>
          </Link>
          
          <Link to="/nutrition" className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted">
            <PieChart className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-foreground">Nutrition</span>
          </Link>
          
          <Link to="/progress" className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-foreground">Progress</span>
          </Link>
          
          <Link to="/profile" className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted">
            <User className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-foreground">Profile</span>
          </Link>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">FitTracker</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <ThemeToggle />
            <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-muted text-foreground">Dashboard</Link>
            <Link to="/workouts" className="px-3 py-2 rounded-md hover:bg-muted text-foreground">Workouts</Link>
            <Link to="/nutrition" className="px-3 py-2 rounded-md hover:bg-muted text-foreground">Nutrition</Link>
            <Link to="/progress" className="px-3 py-2 rounded-md hover:bg-muted text-foreground">Progress</Link>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings?tab=account">App Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings?tab=notifications">Notifications</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings?tab=appearance">Appearance</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings?tab=help">Help & Support</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings?tab=account">Account Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/" className="text-red-500 flex items-center gap-2">
                    <LogOut className="h-4 w-4" /> Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
