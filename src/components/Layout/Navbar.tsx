
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
  LogOut
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Nav */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <Link to="/dashboard" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50">
            <Activity className="w-5 h-5 text-fitness-primary" />
            <span className="text-xs text-gray-500">Home</span>
          </Link>
          
          <Link to="/workouts" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50">
            <List className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-500">Workouts</span>
          </Link>
          
          <Link to="/nutrition" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50">
            <PieChart className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-500">Nutrition</span>
          </Link>
          
          <Link to="/progress" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-500">Progress</span>
          </Link>
          
          <Link to="/profile" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50">
            <User className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-500">Profile</span>
          </Link>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-fitness-primary" />
              <span className="text-xl font-bold">FitTracker</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-gray-100 text-fitness-text">Dashboard</Link>
            <Link to="/workouts" className="px-3 py-2 rounded-md hover:bg-gray-100 text-fitness-text">Workouts</Link>
            <Link to="/nutrition" className="px-3 py-2 rounded-md hover:bg-gray-100 text-fitness-text">Nutrition</Link>
            <Link to="/progress" className="px-3 py-2 rounded-md hover:bg-gray-100 text-fitness-text">Progress</Link>
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
                  <Link to="/settings">App Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Notifications</DropdownMenuItem>
                <DropdownMenuItem>Appearance</DropdownMenuItem>
                <DropdownMenuItem>Help & Support</DropdownMenuItem>
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
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
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
