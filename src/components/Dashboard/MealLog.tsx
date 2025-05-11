
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const meals = [
  {
    id: '1',
    name: 'Breakfast',
    calories: 420,
    protein: 25,
    carbs: 45,
    fat: 15,
    items: ['Greek Yogurt with Berries', 'Whole Grain Toast']
  },
  {
    id: '2',
    name: 'Lunch',
    calories: 650,
    protein: 35,
    carbs: 70,
    fat: 20,
    items: ['Grilled Chicken Salad', 'Quinoa', 'Avocado']
  },
  {
    id: '3',
    name: 'Dinner',
    calories: 550,
    protein: 30,
    carbs: 45,
    fat: 22,
    items: ['Baked Salmon', 'Sweet Potato', 'Broccoli']
  },
];

const MealLog = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Today's Meals</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {meals.map((meal) => (
            <div key={meal.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{meal.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {meal.items.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-medium">{meal.calories} kcal</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center p-4">
        <Button variant="outline" className="w-full">Log Meal</Button>
      </CardFooter>
    </Card>
  );
};

export default MealLog;
