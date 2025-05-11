
import React from 'react';
import AuthForm from '@/components/Auth/AuthForm';
import { Activity } from 'lucide-react';

const Auth = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
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
  );
};

export default Auth;
