
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import StatCard from '@/components/Dashboard/StatCard';
import ActivityChart from '@/components/Dashboard/ActivityChart';
import NutritionChart from '@/components/Dashboard/NutritionChart';
import RecentWorkouts from '@/components/Dashboard/RecentWorkouts';
import MealLog from '@/components/Dashboard/MealLog';
import GoalProgress from '@/components/Dashboard/GoalProgress';
import { Button } from '@/components/ui/card';
import { Activity, PieChart, Calendar, Weight } from 'lucide-react';

const Index = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Alex</h1>
        <p className="text-muted-foreground">Here's your fitness summary for today</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Calories Burned" 
          value="320" 
          icon={<Activity className="w-5 h-5" />} 
          color="primary"
        />
        <StatCard 
          title="Calories Consumed" 
          value="1,720" 
          icon={<PieChart className="w-5 h-5" />} 
          color="secondary"
        />
        <StatCard 
          title="Active Minutes" 
          value="45" 
          icon={<Calendar className="w-5 h-5" />}
          color="accent" 
        />
        <StatCard 
          title="Steps" 
          value="8,500" 
          icon={<Activity className="w-5 h-5" />} 
          color="primary"
        />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <ActivityChart />
        <NutritionChart />
      </div>

      {/* Recent Activities and Goals */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <GoalProgress />
        </div>
        <div className="md:col-span-1">
          <RecentWorkouts />
        </div>
        <div className="md:col-span-1">
          <MealLog />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
