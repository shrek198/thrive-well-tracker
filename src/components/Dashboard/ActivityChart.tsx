
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityData {
  name: string;
  workouts: number;
  calories: number;
}

const activityData: ActivityData[] = [
  { name: 'Mon', workouts: 1, calories: 320 },
  { name: 'Tue', workouts: 0, calories: 0 },
  { name: 'Wed', workouts: 1, calories: 450 },
  { name: 'Thu', workouts: 1, calories: 280 },
  { name: 'Fri', workouts: 2, calories: 590 },
  { name: 'Sat', workouts: 0, calories: 0 },
  { name: 'Sun', workouts: 1, calories: 400 },
];

const ActivityChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={activityData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
              <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="workouts" fill="#3B82F6" name="Workouts" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="calories" fill="#10B981" name="Calories Burned" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
