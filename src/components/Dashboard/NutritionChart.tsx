
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const nutritionData = [
  { name: 'Protein', value: 80, color: '#3B82F6' },
  { name: 'Carbs', value: 230, color: '#10B981' },
  { name: 'Fat', value: 55, color: '#F59E0B' },
];

const NutritionChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Macronutrient Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={nutritionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {nutritionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} g`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-2 text-sm text-muted-foreground">
          Total: 1,720 calories
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionChart;
