
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Activity, Plus, Calendar, Filter, Heart, Eye } from 'lucide-react';
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
import { Workout, Exercise, WorkoutFilters } from '@/types';
import { getWorkouts, saveWorkout, filterWorkouts } from '@/utils/storage';

const Workouts = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [favoriteWorkouts, setFavoriteWorkouts] = useState<string[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<WorkoutFilters>({
    types: [],
    durations: [],
    sortBy: 'recent'
  });
  const [newWorkout, setNewWorkout] = useState<{
    name: string;
    type: string;
    duration: number;
    exercises: { name: string; sets: number; reps: number; weight?: number }[];
  }>({
    name: '',
    type: 'strength',
    duration: 30,
    exercises: []
  });
  
  // Load workouts from storage on mount
  useEffect(() => {
    const storedWorkouts = getWorkouts();
    setWorkouts(storedWorkouts);
    setFilteredWorkouts(storedWorkouts);
    
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('fitness-app-favorite-workouts');
    if (storedFavorites) {
      setFavoriteWorkouts(JSON.parse(storedFavorites));
    }
  }, []);

  // Apply filters when activeTab or filters change
  useEffect(() => {
    let filtered = workouts;
    
    // Filter by tab
    if (activeTab === 'favorites') {
      filtered = workouts.filter(workout => favoriteWorkouts.includes(workout.id));
    } else if (activeTab === 'recent') {
      filtered = workouts.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
    }
    
    // Apply other filters
    if (filters.types.length > 0 || filters.durations.length > 0 || filters.sortBy !== 'recent') {
      filtered = filterWorkouts(filtered, filters.types, filters.durations, filters.sortBy);
    }
    
    setFilteredWorkouts(filtered);
  }, [activeTab, filters, workouts, favoriteWorkouts]);

  const handleNewWorkout = () => {
    if (!newWorkout.name) {
      toast({
        title: "Missing Information",
        description: "Please provide a workout name",
        variant: "destructive"
      });
      return;
    }

    // Create a new workout
    const workout: Workout = {
      id: Date.now().toString(),
      name: newWorkout.name,
      type: newWorkout.type as 'strength' | 'cardio' | 'flexibility',
      duration: newWorkout.duration,
      calories: Math.floor(newWorkout.duration * 8.5), // Simple calorie calculation
      date: new Date(),
      exercises: newWorkout.exercises.map(ex => ({
        id: Date.now().toString() + Math.random().toString(),
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        weight: ex.weight
      }))
    };

    // Save workout
    saveWorkout(workout);
    setWorkouts([...workouts, workout]);
    
    // Reset form and close dialog
    setNewWorkout({
      name: '',
      type: 'strength',
      duration: 30,
      exercises: []
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Workout Created",
      description: `${workout.name} has been added to your workout history`
    });
  };

  const handleFilterApply = () => {
    setIsFilterOpen(false);
    toast({
      title: "Filters Applied",
      description: "Your workout filters have been applied",
    });
  };

  const handleToggleFavorite = (id: string) => {
    setFavoriteWorkouts(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
    
    // Save to localStorage
    const updatedFavorites = favoriteWorkouts.includes(id) 
      ? favoriteWorkouts.filter(item => item !== id)
      : [...favoriteWorkouts, id];
    
    localStorage.setItem('fitness-app-favorite-workouts', JSON.stringify(updatedFavorites));
    
    toast({
      title: favoriteWorkouts.includes(id) ? "Removed from Favorites" : "Added to Favorites",
      description: favoriteWorkouts.includes(id) 
        ? "Workout removed from your favorites" 
        : "Workout added to your favorites",
    });
  };

  const handleViewDetails = (workout: Workout) => {
    setSelectedWorkout(workout);
    toast({
      title: "View Workout Details",
      description: "Opening workout details for " + workout.name,
    });
  };

  const handleToggleFilter = (type: 'types' | 'durations', value: string) => {
    setFilters(prev => {
      const currentValues = prev[type];
      return {
        ...prev,
        [type]: currentValues.includes(value) 
          ? currentValues.filter(v => v !== value) 
          : [...currentValues, value]
      };
    });
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      sortBy: e.target.value
    }));
  };

  const addExercise = () => {
    setNewWorkout(prev => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        { name: '', sets: 3, reps: 10 }
      ]
    }));
  };

  const updateExercise = (index: number, field: string, value: any) => {
    setNewWorkout(prev => {
      const exercises = [...prev.exercises];
      exercises[index] = { 
        ...exercises[index], 
        [field]: field === 'name' ? value : Number(value)
      };
      return { ...prev, exercises };
    });
  };

  const removeExercise = (index: number) => {
    setNewWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Workouts</h1>
          <p className="text-muted-foreground">Track and manage your workout routines</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                <Input 
                  id="workout-name" 
                  placeholder="e.g. Upper Body Strength" 
                  value={newWorkout.name}
                  onChange={(e) => setNewWorkout({...newWorkout, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workout-type">Workout Type</Label>
                <select 
                  id="workout-type"
                  className="w-full p-2 border border-input rounded-md bg-background"
                  value={newWorkout.type}
                  onChange={(e) => setNewWorkout({...newWorkout, type: e.target.value})}
                >
                  <option value="">Select Type</option>
                  <option value="strength">Strength</option>
                  <option value="cardio">Cardio</option>
                  <option value="flexibility">Flexibility</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Duration (minutes)</Label>
                <Input 
                  type="number" 
                  min="5" 
                  max="180" 
                  value={newWorkout.duration}
                  onChange={(e) => setNewWorkout({...newWorkout, duration: parseInt(e.target.value) || 30})}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Exercises</Label>
                  <Button variant="outline" size="sm" onClick={addExercise}>
                    <Plus size={14} className="mr-1" /> Add Exercise
                  </Button>
                </div>
                
                {newWorkout.exercises.length > 0 ? (
                  <div className="space-y-4">
                    {newWorkout.exercises.map((exercise, index) => (
                      <div key={index} className="space-y-3 p-3 border rounded-md">
                        <div className="flex justify-between">
                          <Label>Exercise {index + 1}</Label>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeExercise(index)}
                          >
                            Remove
                          </Button>
                        </div>
                        <Input 
                          placeholder="Exercise name" 
                          value={exercise.name}
                          onChange={(e) => updateExercise(index, 'name', e.target.value)}
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Label htmlFor={`sets-${index}`}>Sets</Label>
                            <Input 
                              id={`sets-${index}`}
                              type="number" 
                              min="1" 
                              value={exercise.sets}
                              onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`reps-${index}`}>Reps</Label>
                            <Input 
                              id={`reps-${index}`}
                              type="number" 
                              min="1" 
                              value={exercise.reps}
                              onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`weight-${index}`}>Weight (kg)</Label>
                            <Input 
                              id={`weight-${index}`}
                              type="number" 
                              min="0" 
                              value={exercise.weight || ''}
                              onChange={(e) => updateExercise(index, 'weight', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No exercises added yet
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setNewWorkout({
                    name: '',
                    type: 'strength',
                    duration: 30,
                    exercises: []
                  });
                  setIsDialogOpen(false);
                }}
              >
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
          
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
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
                    <Toggle 
                      variant="outline" 
                      size="sm"
                      pressed={filters.types.includes('strength')}
                      onPressedChange={() => handleToggleFilter('types', 'strength')}
                    >
                      Strength
                    </Toggle>
                    <Toggle 
                      variant="outline" 
                      size="sm"
                      pressed={filters.types.includes('cardio')}
                      onPressedChange={() => handleToggleFilter('types', 'cardio')}
                    >
                      Cardio
                    </Toggle>
                    <Toggle 
                      variant="outline" 
                      size="sm"
                      pressed={filters.types.includes('flexibility')}
                      onPressedChange={() => handleToggleFilter('types', 'flexibility')}
                    >
                      Flexibility
                    </Toggle>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <div className="flex flex-wrap gap-2">
                    <Toggle 
                      variant="outline" 
                      size="sm"
                      pressed={filters.durations.includes('< 15 min')}
                      onPressedChange={() => handleToggleFilter('durations', '< 15 min')}
                    >
                      &lt; 15 min
                    </Toggle>
                    <Toggle 
                      variant="outline" 
                      size="sm"
                      pressed={filters.durations.includes('15-30 min')}
                      onPressedChange={() => handleToggleFilter('durations', '15-30 min')}
                    >
                      15-30 min
                    </Toggle>
                    <Toggle 
                      variant="outline" 
                      size="sm"
                      pressed={filters.durations.includes('30-60 min')}
                      onPressedChange={() => handleToggleFilter('durations', '30-60 min')}
                    >
                      30-60 min
                    </Toggle>
                    <Toggle 
                      variant="outline" 
                      size="sm"
                      pressed={filters.durations.includes('> 60 min')}
                      onPressedChange={() => handleToggleFilter('durations', '> 60 min')}
                    >
                      &gt; 60 min
                    </Toggle>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <select 
                    className="w-full p-2 border border-input rounded-md bg-background"
                    value={filters.sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="recent">Recent First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="duration-shortest">Duration (shortest)</option>
                    <option value="duration-longest">Duration (longest)</option>
                  </select>
                </div>
                
                <Button className="w-full" onClick={handleFilterApply}>Apply Filters</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.length > 0 ? (
              filteredWorkouts.map((workout) => (
                <Card key={workout.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {workout.name}
                        </CardTitle>
                        <CardDescription>{workout.date.toLocaleDateString()}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => handleToggleFavorite(workout.id)}
                        >
                          <Heart 
                            className="h-5 w-5" 
                            fill={favoriteWorkouts.includes(workout.id) ? "currentColor" : "none"} 
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
                      <span className="font-semibold">Duration:</span> {workout.duration} min
                    </div>
                    <div className="text-sm mb-4">
                      <span className="font-semibold">Exercises:</span> {workout.exercises.length} exercises
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleViewDetails(workout)}
                    >
                      <Eye size={14} className="mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 text-muted-foreground">
                <Activity className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg mb-2">No workouts found</p>
                <p className="mb-6">Create your first workout to get started</p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus size={16} className="mr-2" /> New Workout
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.length > 0 ? (
              filteredWorkouts.map((workout) => (
                <Card key={workout.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {workout.name}
                        </CardTitle>
                        <CardDescription>{workout.date.toLocaleDateString()}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => handleToggleFavorite(workout.id)}
                        >
                          <Heart 
                            className="h-5 w-5" 
                            fill={favoriteWorkouts.includes(workout.id) ? "currentColor" : "none"} 
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
                      <span className="font-semibold">Duration:</span> {workout.duration} min
                    </div>
                    <div className="text-sm mb-4">
                      <span className="font-semibold">Exercises:</span> {workout.exercises.length} exercises
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleViewDetails(workout)}
                    >
                      <Eye size={14} className="mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center p-8 text-muted-foreground">
                Your recent workouts will appear here
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="favorites">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.length > 0 ? (
              filteredWorkouts.map((workout) => (
                <Card key={workout.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {workout.name}
                        </CardTitle>
                        <CardDescription>{workout.date.toLocaleDateString()}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="text-primary transition-colors"
                          onClick={() => handleToggleFavorite(workout.id)}
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
                      <span className="font-semibold">Duration:</span> {workout.duration} min
                    </div>
                    <div className="text-sm mb-4">
                      <span className="font-semibold">Exercises:</span> {workout.exercises.length} exercises
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleViewDetails(workout)}
                    >
                      <Eye size={14} className="mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center p-8 text-muted-foreground">
                Your favorite workouts will appear here
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Workout Details Dialog */}
      {selectedWorkout && (
        <Dialog open={!!selectedWorkout} onOpenChange={() => setSelectedWorkout(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedWorkout.name}</DialogTitle>
              <DialogDescription>
                {selectedWorkout.date.toLocaleDateString()} • {selectedWorkout.duration} min
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="capitalize">{selectedWorkout.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Calories</p>
                  <p>{selectedWorkout.calories} kcal</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Exercises</h3>
                {selectedWorkout.exercises.length > 0 ? (
                  <div className="space-y-2">
                    {selectedWorkout.exercises.map((exercise, index) => (
                      <div key={index} className="bg-muted/30 p-3 rounded-md">
                        <div className="font-medium">{exercise.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {exercise.sets && exercise.reps ? (
                            <span>
                              {exercise.sets} sets × {exercise.reps} reps
                              {exercise.weight && ` @ ${exercise.weight} kg`}
                            </span>
                          ) : exercise.duration ? (
                            <span>{exercise.duration} min</span>
                          ) : exercise.distance ? (
                            <span>{exercise.distance} km</span>
                          ) : (
                            <span>Completed</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No exercises recorded
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline"
                  onClick={() => handleToggleFavorite(selectedWorkout.id)}
                >
                  {favoriteWorkouts.includes(selectedWorkout.id) ? (
                    <>Remove from Favorites</>
                  ) : (
                    <>Add to Favorites</>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AppLayout>
  );
};

export default Workouts;
