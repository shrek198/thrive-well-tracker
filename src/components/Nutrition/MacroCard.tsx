
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface MacroCardProps {
  type: 'protein' | 'carbs' | 'fat';
  current: number;
  target: number;
}

const MacroCard: React.FC<MacroCardProps> = ({ type, current, target }) => {
  const progress = (current / target) * 100;
  
  const macroDetails = {
    protein: {
      title: 'Protein',
      color: 'bg-fitness-primary',
      unit: 'g',
    },
    carbs: {
      title: 'Carbs',
      color: 'bg-fitness-secondary',
      unit: 'g',
    },
    fat: {
      title: 'Fat',
      color: 'bg-fitness-accent',
      unit: 'g',
    }
  };

  const { title, color, unit } = macroDetails[type];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">{title}</h3>
          <span className="text-sm">
            {current} / {target} {unit}
          </span>
        </div>
        <Progress value={progress} className={color} />
      </CardContent>
    </Card>
  );
};

export default MacroCard;
