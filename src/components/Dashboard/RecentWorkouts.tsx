
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Weight, Eye } from 'lucide-react';
import { Workout, Exercise } from '@/types';
import { getRecentWorkouts } from '@/utils/storage';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const RecentWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchedWorkouts = getRecentWorkouts(3);
    setWorkouts(fetchedWorkouts);
  }, []);

  const handleViewDetails = (workout: Workout) => {
    setSelectedWorkout(workout);
    setIsDialogOpen(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Recent Workouts</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {workouts.length > 0 ? (
          <div className="divide-y">
            {workouts.map((workout) => (
              <div key={workout.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{workout.name}</h4>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {workout.date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{workout.duration} min</div>
                    <div className="text-sm text-muted-foreground">{workout.calories} cal</div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-2" 
                  onClick={() => handleViewDetails(workout)}
                >
                  <Eye size={14} className="mr-2" />
                  View Details
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
            <Weight className="h-12 w-12 mb-2 opacity-40" />
            <p className="mb-4">No recent workouts</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center p-4">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/workouts">View All Workouts</Link>
        </Button>
      </CardFooter>

      {/* Workout Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedWorkout?.name}</DialogTitle>
          </DialogHeader>
          {selectedWorkout && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>
                    {selectedWorkout.date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="capitalize">{selectedWorkout.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p>{selectedWorkout.duration} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Calories Burned</p>
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default RecentWorkouts;
