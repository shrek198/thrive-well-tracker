
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
import { Progress } from '@/types';
import { format } from 'date-fns';

interface ProgressChartProps {
  data: Progress[];
  height?: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, height = 300 }) => {
  // Format data for chart display
  const chartData = data.map(item => {
    const date = format(new Date(item.date), 'MMM d');
    
    return {
      date,
      weight: item.weight,
      bodyFat: item.bodyFat,
      chest: item.measurements?.chest,
      waist: item.measurements?.waist,
      hips: item.measurements?.hips,
      biceps: item.measurements?.biceps,
      thighs: item.measurements?.thighs,
    };
  });

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {chartData.some(d => d.weight !== undefined) && (
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#3B82F6"
              name="Weight (kg)"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          )}
          {chartData.some(d => d.bodyFat !== undefined) && (
            <Line 
              type="monotone" 
              dataKey="bodyFat" 
              stroke="#10B981" 
              name="Body Fat (%)"
              strokeWidth={2}
            />
          )}
          {chartData.some(d => d.chest !== undefined) && (
            <Line 
              type="monotone" 
              dataKey="chest" 
              stroke="#F59E0B" 
              name="Chest (cm)"
              strokeWidth={1.5}
            />
          )}
          {chartData.some(d => d.waist !== undefined) && (
            <Line 
              type="monotone" 
              dataKey="waist" 
              stroke="#EC4899" 
              name="Waist (cm)"
              strokeWidth={1.5}
            />
          )}
          {chartData.some(d => d.hips !== undefined) && (
            <Line 
              type="monotone" 
              dataKey="hips" 
              stroke="#8B5CF6" 
              name="Hips (cm)"
              strokeWidth={1.5}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
