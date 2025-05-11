import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Workout } from '@/types';
import { Calendar, Clock, Weight, Activity } from 'lucide-react';

interface WorkoutCardProps {
  workout: Workout;
  onSelect: (workout: Workout) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onSelect }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'strength':
        return <Weight className="h-5 w-5 text-fitness-primary" />;
      case 'cardio':
        return <Activity className="h-5 w-5 text-fitness-secondary" />;
      default:
        return <Activity className="h-5 w-5 text-fitness-accent" />;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{workout.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="text-xs bg-muted px-2 py-1 rounded-full capitalize">
                {workout.type}
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {workout.duration} min
              </div>
            </div>
          </div>
          <div>{getTypeIcon(workout.type)}</div>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(workout.date)}</span>
        </div>
        
        <div className="mt-4">
          <div className="text-sm font-medium">Exercises:</div>
          <ul className="text-sm text-muted-foreground mt-1">
            {workout.exercises.slice(0, 3).map((exercise) => (
              <li key={exercise.id} className="line-clamp-1">
                • {exercise.name}
              </li>
            ))}
            {workout.exercises.length > 3 && (
              <li className="text-xs text-muted-foreground">
                + {workout.exercises.length - 3} more
              </li>
            )}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="mt-auto pt-0">
        <Button 
          variant="outline" 
          className="w-full text-fitness-primary"
          onClick={() => onSelect(workout)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
