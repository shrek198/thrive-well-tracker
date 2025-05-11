
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Activity, Plus, Calendar, Filter, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';

const Workouts = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [favoriteWorkouts, setFavoriteWorkouts] = useState<number[]>([]);

  const handleNewWorkout = () => {
    toast({
      title: "New Workout",
      description: "Create a new workout routine",
    });
  };

  const handleFilterApply = () => {
    toast({
      title: "Filters Applied",
      description: "Your workout filters have been applied",
    });
  };

  const handleToggleFavorite = (id: number) => {
    setFavoriteWorkouts(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
    
    toast({
      title: favoriteWorkouts.includes(id) ? "Removed from Favorites" : "Added to Favorites",
      description: favoriteWorkouts.includes(id) 
        ? "Workout removed from your favorites" 
        : "Workout added to your favorites",
    });
  };

  const handleViewDetails = () => {
    toast({
      title: "View Workout Details",
      description: "Opening workout details",
    });
  };

  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Workouts</h1>
          <p className="text-muted-foreground">Track and manage your workout routines</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} /> New Workout
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workout</DialogTitle>
              <DialogDescription>Design your custom workout routine</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="workout-name">Workout Name</Label>
                <Input id="workout-name" placeholder="e.g. Upper Body Strength" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workout-type">Workout Type</Label>
                <select 
                  id="workout-type"
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="">Select Type</option>
                  <option value="strength">Strength</option>
                  <option value="cardio">Cardio</option>
                  <option value="hiit">HIIT</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="recovery">Recovery</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Duration (minutes)</Label>
                <Input type="number" min="5" max="180" defaultValue="30" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => document.querySelector<HTMLButtonElement>('[data-state="open"] [role="dialog"] button[aria-label="Close"]')?.click()}>
                Cancel
              </Button>
              <Button onClick={handleNewWorkout}>Create Workout</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Workouts</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter size={16} /> Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <h3 className="font-medium">Filter Workouts</h3>
                
                <div className="space-y-2">
                  <Label>Workout Type</Label>
                  <div className="flex flex-wrap gap-2">
                    <Toggle variant="outline" size="sm">Strength</Toggle>
                    <Toggle variant="outline" size="sm">Cardio</Toggle>
                    <Toggle variant="outline" size="sm">HIIT</Toggle>
                    <Toggle variant="outline" size="sm">Recovery</Toggle>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <div className="flex flex-wrap gap-2">
                    <Toggle variant="outline" size="sm">&lt; 15 min</Toggle>
                    <Toggle variant="outline" size="sm">15-30 min</Toggle>
                    <Toggle variant="outline" size="sm">30-60 min</Toggle>
                    <Toggle variant="outline" size="sm">&gt; 60 min</Toggle>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <select className="w-full p-2 border border-input rounded-md bg-background">
                    <option>Recent First</option>
                    <option>Oldest First</option>
                    <option>Duration (shortest)</option>
                    <option>Duration (longest)</option>
                  </select>
                </div>
                
                <Button className="w-full" onClick={handleFilterApply}>Apply Filters</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {["Upper Body", "Lower Body", "Full Body", "Cardio", "HIIT", "Recovery"][i % 6]} Workout
                      </CardTitle>
                      <CardDescription>{new Date().toLocaleDateString()}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => handleToggleFavorite(i)}
                      >
                        <Heart 
                          className="h-5 w-5" 
                          fill={favoriteWorkouts.includes(i) ? "currentColor" : "none"} 
                        />
                      </button>
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-sm mb-2">
                    <span className="font-semibold">Duration:</span> {(30 + i * 5)} min
                  </div>
                  <div className="text-sm mb-4">
                    <span className="font-semibold">Exercises:</span> {(4 + i % 3)} exercises
                  </div>
                  <Button variant="outline" className="w-full" onClick={handleViewDetails}>View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="text-center p-8 text-muted-foreground">
            Your recent workouts will appear here
          </div>
        </TabsContent>
        
        <TabsContent value="favorites">
          {favoriteWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteWorkouts.map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {["Upper Body", "Lower Body", "Full Body", "Cardio", "HIIT", "Recovery"][i % 6]} Workout
                        </CardTitle>
                        <CardDescription>{new Date().toLocaleDateString()}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="text-primary transition-colors"
                          onClick={() => handleToggleFavorite(i)}
                        >
                          <Heart className="h-5 w-5" fill="currentColor" />
                        </button>
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Activity className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="text-sm mb-2">
                      <span className="font-semibold">Duration:</span> {(30 + i * 5)} min
                    </div>
                    <div className="text-sm mb-4">
                      <span className="font-semibold">Exercises:</span> {(4 + i % 3)} exercises
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleViewDetails}>View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              Your favorite workouts will appear here
            </div>
          )}
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Workouts;
