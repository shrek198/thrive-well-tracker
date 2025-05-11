
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const goals = [
  {
    id: '1',
    name: 'Weekly Workouts',
    current: 4,
    target: 5,
    unit: 'sessions',
    progress: (4 / 5) * 100,
    color: 'bg-fitness-primary',
  },
  {
    id: '2',
    name: 'Daily Steps',
    current: 8500,
    target: 10000,
    unit: 'steps',
    progress: (8500 / 10000) * 100,
    color: 'bg-fitness-secondary',
  },
  {
    id: '3',
    name: 'Water Intake',
    current: 2000,
    target: 2500,
    unit: 'ml',
    progress: (2000 / 2500) * 100,
    color: 'bg-fitness-accent',
  },
];

const GoalProgress = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{goal.name}</span>
                <span className="text-sm text-muted-foreground">
                  {goal.current} / {goal.target} {goal.unit}
                </span>
              </div>
              <Progress value={goal.progress} className={goal.color} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalProgress;
