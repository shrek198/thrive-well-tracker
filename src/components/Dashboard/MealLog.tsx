
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Meal, FoodItem } from '@/types';
import { getMealsByDate, saveMeal } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

const MealLog = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [newMeal, setNewMeal] = useState({
    name: '',
    type: 'breakfast',
    items: [] as string[]
  });
  const [newItem, setNewItem] = useState('');
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Load meals for today when the component mounts
    const todaysMeals = getMealsByDate(new Date());
    setMeals(todaysMeals);
  }, []);

  const handleAddItem = () => {
    if (newItem.trim()) {
      setNewMeal({
        ...newMeal,
        items: [...newMeal.items, newItem.trim()]
      });
      setNewItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...newMeal.items];
    updatedItems.splice(index, 1);
    setNewMeal({ ...newMeal, items: updatedItems });
  };

  const handleSubmit = () => {
    if (!newMeal.name || newMeal.items.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide a meal name and at least one food item",
        variant: "destructive"
      });
      return;
    }

    // Create a new meal entry
    const meal: Meal = {
      id: Date.now().toString(),
      name: newMeal.name,
      type: newMeal.type as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      calories: Math.floor(Math.random() * 400) + 200, // Simulated for now
      protein: Math.floor(Math.random() * 30) + 10,
      carbs: Math.floor(Math.random() * 50) + 20,
      fat: Math.floor(Math.random() * 20) + 5,
      date: new Date(),
      items: newMeal.items.map(name => ({
        id: Date.now().toString() + Math.random().toString(),
        name,
        servingSize: '1 serving',
        calories: Math.floor(Math.random() * 100) + 50,
        protein: Math.floor(Math.random() * 10) + 2,
        carbs: Math.floor(Math.random() * 15) + 5,
        fat: Math.floor(Math.random() * 8) + 1
      }))
    };

    // Save and update state
    saveMeal(meal);
    setMeals([...meals, meal]);
    
    // Reset form and close dialog
    setNewMeal({ name: '', type: 'breakfast', items: [] });
    setIsDialogOpen(false);
    
    toast({
      title: "Meal Logged",
      description: `${meal.name} has been added to your meal log`
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Today's Meals</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <div key={meal.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{meal.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {meal.items.map(item => item.name).join(', ')}
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
            ))
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              No meals logged today
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center p-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">Log Meal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log a Meal</DialogTitle>
              <DialogDescription>Record what you've eaten</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="meal-name">Meal Name</Label>
                <Input 
                  id="meal-name" 
                  placeholder="e.g. Breakfast, Lunch, Dinner, Snack" 
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meal-type">Meal Type</Label>
                <select 
                  id="meal-type"
                  className="w-full p-2 border border-input rounded-md bg-background"
                  value={newMeal.type}
                  onChange={(e) => setNewMeal({...newMeal, type: e.target.value})}
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label>Food Items</Label>
                {newMeal.items.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {newMeal.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                        <span>{item}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveItem(index)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Add food item" 
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                  />
                  <Button variant="outline" size="icon" onClick={handleAddItem}>
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setNewMeal({ name: '', type: 'breakfast', items: [] });
                  setIsDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Save Meal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default MealLog;
