
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Weight } from 'lucide-react';

const workouts = [
  {
    id: '1',
    name: 'Upper Body Strength',
    type: 'strength',
    duration: 45,
    calories: 320,
    date: new Date(2023, 5, 20),
  },
  {
    id: '2',
    name: 'Morning Run',
    type: 'cardio',
    duration: 30,
    calories: 280,
    date: new Date(2023, 5, 19),
  },
  {
    id: '3',
    name: 'Full Body HIIT',
    type: 'strength',
    duration: 25,
    calories: 240,
    date: new Date(2023, 5, 17),
  },
];

const RecentWorkouts = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Recent Workouts</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
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
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center p-4">
        <Button variant="outline" className="w-full">View All Workouts</Button>
      </CardFooter>
    </Card>
  );
};

export default RecentWorkouts;
