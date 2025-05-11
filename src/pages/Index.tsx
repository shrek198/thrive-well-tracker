
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import StatCard from '@/components/Dashboard/StatCard';
import ActivityChart from '@/components/Dashboard/ActivityChart';
import NutritionChart from '@/components/Dashboard/NutritionChart';
import RecentWorkouts from '@/components/Dashboard/RecentWorkouts';
import MealLog from '@/components/Dashboard/MealLog';
import GoalProgress from '@/components/Dashboard/GoalProgress';
import { Button } from '@/components/ui/button'; 
import { Activity, PieChart, Calendar, Weight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();

  const handleLogMeal = () => {
    toast({
      title: "Add Meal",
      description: "Log your meal intake",
    });
  };

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

      {/* Quick Actions */}
      <div className="flex gap-4 mb-6">
        <Button asChild variant="outline" className="gap-2">
          <Link to="/workouts">
            <Activity className="w-4 h-4" /> View All Workouts
          </Link>
        </Button>
        <Button variant="outline" className="gap-2" onClick={handleLogMeal}>
          <Plus className="w-4 h-4" /> Log Meal
        </Button>
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
