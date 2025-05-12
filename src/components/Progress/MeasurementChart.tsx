
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Progress } from '@/types';
import { format } from 'date-fns';

interface MeasurementChartProps {
  data: Progress[];
  dataKey: string;
  name: string;
  color: string;
  unit: string;
}

const MeasurementChart: React.FC<MeasurementChartProps> = ({ data, dataKey, name, color, unit }) => {
  // Format the data for the chart
  const chartData = data.map(item => ({
    date: format(new Date(item.date), 'MMM d'),
    [dataKey]: item[dataKey as keyof Progress],
    fullDate: format(new Date(item.date), 'MMM d, yyyy')
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            unit={unit}
            tick={{ fontSize: 12 }}
            width={45}
          />
          <Tooltip
            labelFormatter={(value) => `Date: ${value}`}
            formatter={(value) => [`${value} ${unit}`, name]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            name={name}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MeasurementChart;
