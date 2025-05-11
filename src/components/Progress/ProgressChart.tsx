
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const progressData = [
  { date: 'Week 1', weight: 175, bodyFat: 24 },
  { date: 'Week 2', weight: 173, bodyFat: 23.5 },
  { date: 'Week 3', weight: 172, bodyFat: 23 },
  { date: 'Week 4', weight: 170, bodyFat: 22.5 },
  { date: 'Week 5', weight: 168, bodyFat: 22 },
  { date: 'Week 6', weight: 167, bodyFat: 21.2 },
  { date: 'Week 7', weight: 166, bodyFat: 21 },
];

const ProgressChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Progress Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={progressData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
              <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="weight"
                stroke="#3B82F6"
                name="Weight (lbs)"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="bodyFat" 
                stroke="#10B981" 
                name="Body Fat (%)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
