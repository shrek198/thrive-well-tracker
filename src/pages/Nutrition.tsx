
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PieChart, Plus, Utensils, Check, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import MacroCard from '@/components/Nutrition/MacroCard';
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
import { Meal, FoodItem, MealPlan } from '@/types';
import { getMealsByDate, saveMeal, getMealPlans, saveMealPlan } from '@/utils/storage';

const Nutrition = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("meals");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<string>('');
  const [newMeal, setNewMeal] = useState({
    name: '',
    time: '',
    foodItems: [] as FoodItem[],
  });
  const [newFoodItem, setNewFoodItem] = useState({
    name: '',
    amount: '',
    unit: 'g',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
  });
  const [newMealPlan, setNewMealPlan] = useState({
    name: '',
    description: '',
    meals: [] as { name: string; time: string; items: FoodItem[] }[],
  });

  // Summary data
  const [dailySummary, setDailySummary] = useState({
    caloriesConsumed: 0,
    caloriesGoal: 2000,
    waterIntake: 0,
    waterGoal: 2.5,
    protein: 0,
    proteinGoal: 120,
    carbs: 0,
    carbsGoal: 250,
    fat: 0,
    fatGoal: 65,
  });

  // Load data on component mount
  useEffect(() => {
    // Load today's meals
    const todaysMeals = getMealsByDate(new Date());
    setMeals(todaysMeals);
    
    // Calculate daily totals
    const totals = todaysMeals.reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fat += meal.fat;
        return acc;
      }, 
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
    
    setDailySummary(prev => ({
      ...prev,
      caloriesConsumed: totals.calories,
      protein: totals.protein,
      carbs: totals.carbs,
      fat: totals.fat
    }));
    
    // Load existing food items
    try {
      const storedItems = localStorage.getItem('fitness-app-food-items');
      if (storedItems) {
        setFoodItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error loading food items:', error);
    }
    
    // Load meal plans
    const plans = getMealPlans();
    setMealPlans(plans);
    
  }, []);

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.time) {
      toast({
        title: "Missing Information",
        description: "Please provide a meal name and time",
        variant: "destructive"
      });
      return;
    }

    // Calculate totals
    const totals = newMeal.foodItems.reduce(
      (acc, item) => {
        acc.calories += item.calories;
        acc.protein += item.protein;
        acc.carbs += item.carbs;
        acc.fat += item.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    // Create a new meal
    const meal: Meal = {
      id: Date.now().toString(),
      name: newMeal.name,
      type: selectedMealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      calories: totals.calories,
      protein: totals.protein,
      carbs: totals.carbs,
      fat: totals.fat,
      date: new Date(),
      items: newMeal.foodItems,
    };

    // Save and update state
    saveMeal(meal);
    setMeals([...meals, meal]);
    
    // Update daily totals
    setDailySummary(prev => ({
      ...prev,
      caloriesConsumed: prev.caloriesConsumed + meal.calories,
      protein: prev.protein + meal.protein,
      carbs: prev.carbs + meal.carbs,
      fat: prev.fat + meal.fat
    }));
    
    // Reset form and close dialog
    setNewMeal({
      name: '',
      time: '',
      foodItems: [],
    });
    setIsAddMealOpen(false);
    
    toast({
      title: "Meal Added",
      description: `${meal.name} has been added to your meal log`,
    });
  };

  const handleAddFoodItem = () => {
    if (!newFoodItem.name || !newFoodItem.calories) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a food name and calories",
        variant: "destructive"
      });
      return;
    }

    // Create a new food item
    const foodItem: FoodItem = {
      id: Date.now().toString(),
      name: newFoodItem.name,
      servingSize: `${newFoodItem.amount || '1'} ${newFoodItem.unit}`,
      calories: Number(newFoodItem.calories),
      protein: Number(newFoodItem.protein) || 0,
      carbs: Number(newFoodItem.carbs) || 0,
      fat: Number(newFoodItem.fat) || 0,
    };

    // Add to current meal
    setNewMeal({
      ...newMeal,
      foodItems: [...newMeal.foodItems, foodItem],
    });
    
    // Save to food item library
    const updatedFoodItems = [...foodItems, foodItem];
    setFoodItems(updatedFoodItems);
    localStorage.setItem('fitness-app-food-items', JSON.stringify(updatedFoodItems));
    
    // Reset form
    setNewFoodItem({
      name: '',
      amount: '',
      unit: 'g',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
    });
    
    setIsAddFoodOpen(false);
    
    toast({
      title: "Food Item Added",
      description: `${foodItem.name} has been added to your meal`,
    });
  };

  const handleCreateMealPlan = () => {
    if (!newMealPlan.name) {
      toast({
        title: "Missing Information",
        description: "Please provide a name for your meal plan",
        variant: "destructive"
      });
      return;
    }

    // Create a new meal plan
    const mealPlan: MealPlan = {
      id: Date.now().toString(),
      name: newMealPlan.name,
      description: newMealPlan.description,
      meals: newMealPlan.meals,
    };

    // Save and update state
    saveMealPlan(mealPlan);
    setMealPlans([...mealPlans, mealPlan]);
    
    // Reset form and close dialog
    setNewMealPlan({
      name: '',
      description: '',
      meals: [],
    });
    setIsCreatePlanOpen(false);
    
    toast({
      title: "Meal Plan Created",
      description: `${mealPlan.name} has been created`,
    });
  };

  const handleGetStartedWithMealPlan = () => {
    if (mealPlans.length === 0) {
      setIsCreatePlanOpen(true);
    } else {
      toast({
        title: "Getting Started",
        description: "Let's create your first meal plan",
      });
    }
  };

  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Nutrition</h1>
          <p className="text-muted-foreground">Track your meals and nutrition intake</p>
        </div>
        <Dialog open={isAddMealOpen} onOpenChange={setIsAddMealOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} /> Add Meal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a Meal</DialogTitle>
              <DialogDescription>Log your meal intake</DialogDescription>
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
                  value={selectedMealType}
                  onChange={(e) => setSelectedMealType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meal-time">Time</Label>
                <Input 
                  id="meal-time" 
                  type="time"
                  value={newMeal.time}
                  onChange={(e) => setNewMeal({...newMeal, time: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Food Items</Label>
                  <Dialog open={isAddFoodOpen} onOpenChange={setIsAddFoodOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus size={14} className="mr-1" /> Add Food
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Food Item</DialogTitle>
                        <DialogDescription>Add a food item to your meal</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="food-name">Food Name</Label>
                          <Input 
                            id="food-name" 
                            placeholder="e.g. Apple, Chicken Breast"
                            value={newFoodItem.name}
                            onChange={(e) => setNewFoodItem({...newFoodItem, name: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="food-amount">Amount</Label>
                            <Input 
                              id="food-amount" 
                              placeholder="e.g. 100"
                              value={newFoodItem.amount}
                              onChange={(e) => setNewFoodItem({...newFoodItem, amount: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="food-unit">Unit</Label>
                            <select 
                              id="food-unit"
                              className="w-full p-2 border border-input rounded-md bg-background"
                              value={newFoodItem.unit}
                              onChange={(e) => setNewFoodItem({...newFoodItem, unit: e.target.value})}
                            >
                              <option value="g">grams</option>
                              <option value="oz">oz</option>
                              <option value="ml">ml</option>
                              <option value="cup">cup</option>
                              <option value="tbsp">tbsp</option>
                              <option value="serving">serving</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="food-calories">Calories</Label>
                            <Input 
                              id="food-calories" 
                              placeholder="e.g. 150" 
                              type="number"
                              value={newFoodItem.calories}
                              onChange={(e) => setNewFoodItem({...newFoodItem, calories: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="food-protein">Protein (g)</Label>
                            <Input 
                              id="food-protein" 
                              placeholder="e.g. 20" 
                              type="number"
                              value={newFoodItem.protein}
                              onChange={(e) => setNewFoodItem({...newFoodItem, protein: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="food-carbs">Carbs (g)</Label>
                            <Input 
                              id="food-carbs" 
                              placeholder="e.g. 30" 
                              type="number"
                              value={newFoodItem.carbs}
                              onChange={(e) => setNewFoodItem({...newFoodItem, carbs: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="food-fat">Fat (g)</Label>
                            <Input 
                              id="food-fat" 
                              placeholder="e.g. 5" 
                              type="number"
                              value={newFoodItem.fat}
                              onChange={(e) => setNewFoodItem({...newFoodItem, fat: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsAddFoodOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleAddFoodItem}>Add Food</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                {newMeal.foodItems.length > 0 ? (
                  <div className="space-y-2">
                    {newMeal.foodItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.servingSize} • {item.calories} kcal
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            const updatedItems = [...newMeal.foodItems];
                            updatedItems.splice(index, 1);
                            setNewMeal({...newMeal, foodItems: updatedItems});
                          }}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No food items added yet
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setNewMeal({ name: '', time: '', foodItems: [] });
                  setIsAddMealOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddMeal}>Save Meal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Daily summary */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Daily Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Calories Consumed</div>
              <div className="text-2xl font-bold">{dailySummary.caloriesConsumed} <span className="text-sm font-normal text-muted-foreground">/ {dailySummary.caloriesGoal} kcal</span></div>
              <Progress value={(dailySummary.caloriesConsumed / dailySummary.caloriesGoal) * 100} className="mt-2" />
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-1">Water Intake</div>
              <div className="text-2xl font-bold">{dailySummary.waterIntake} <span className="text-sm font-normal text-muted-foreground">/ {dailySummary.waterGoal} L</span></div>
              <Progress value={(dailySummary.waterIntake / dailySummary.waterGoal) * 100} className="mt-2" />
            </div>
            
            <div className="col-span-2">
              <div className="text-sm text-muted-foreground mb-3">Macronutrients</div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <MacroCard type="protein" current={dailySummary.protein} target={dailySummary.proteinGoal} />
                </div>
                <div className="flex-1">
                  <MacroCard type="carbs" current={dailySummary.carbs} target={dailySummary.carbsGoal} />
                </div>
                <div className="flex-1">
                  <MacroCard type="fat" current={dailySummary.fat} target={dailySummary.fatGoal} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="meals">Meals</TabsTrigger>
          <TabsTrigger value="log">Food Log</TabsTrigger>
          <TabsTrigger value="plans">Meal Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="meals" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Breakfast", "Lunch", "Dinner", "Snacks"].map((mealType) => {
              const mealData = meals.find(
                m => m.type.toLowerCase() === mealType.toLowerCase()
              );
              
              return (
                <Card key={mealType}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{mealType}</CardTitle>
                      <Utensils className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {mealData ? (
                      <div className="space-y-3">
                        {mealData.items.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{item.name}</span>
                            <span className="text-muted-foreground">{item.calories} kcal</span>
                          </div>
                        ))}
                        <div className="pt-2 border-t">
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>{mealData.calories} kcal</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => {
                              setSelectedMealType(mealType.toLowerCase());
                              setIsAddMealOpen(true);
                            }}
                          >
                            <Plus size={16} className="mr-2" /> Add Food Items
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="log">
          <Card>
            <CardHeader>
              <CardTitle>Food Log History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["Today", "Yesterday", "May 9, 2025", "May 8, 2025"].map((day, index) => (
                  <div key={day} className="space-y-4">
                    <h3 className="font-medium">{day}</h3>
                    {index <= 1 ? (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <div>
                            <span className="font-medium">Breakfast</span>
                            <p className="text-sm text-muted-foreground">8:30 AM</p>
                          </div>
                          <span className="text-sm">475 kcal</span>
                        </div>
                        {day === "Today" && (
                          <div className="flex justify-between items-center pb-2 border-b">
                            <div>
                              <span className="font-medium">Lunch</span>
                              <p className="text-sm text-muted-foreground">12:45 PM</p>
                            </div>
                            <span className="text-sm">720 kcal</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">Daily Total</span>
                          </div>
                          <span className="text-sm">{day === "Today" ? "1,195" : "475"} kcal</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-2 text-muted-foreground text-sm">
                        No data for this day
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full mt-4" 
                  onClick={() => toast({ title: "Food Log", description: "Loading more history..." })}
                >
                  Load More History
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plans">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Meal Plans</CardTitle>
              <Dialog open={isCreatePlanOpen} onOpenChange={setIsCreatePlanOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus size={16} className="mr-2" /> Create Plan
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create Meal Plan</DialogTitle>
                    <DialogDescription>Design a structured meal plan</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="plan-name">Plan Name</Label>
                      <Input 
                        id="plan-name" 
                        placeholder="e.g. Weight Loss Plan, Muscle Gain, etc." 
                        value={newMealPlan.name}
                        onChange={(e) => setNewMealPlan({...newMealPlan, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plan-description">Description (optional)</Label>
                      <Input 
                        id="plan-description" 
                        placeholder="A brief description of your meal plan" 
                        value={newMealPlan.description}
                        onChange={(e) => setNewMealPlan({...newMealPlan, description: e.target.value})}
                      />
                    </div>
                    
                    {/* This would typically have more controls for adding multiple meals and food items */}
                    <p className="text-sm text-muted-foreground">
                      You'll be able to add meals to this plan after creation.
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsCreatePlanOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateMealPlan}>Create Plan</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {mealPlans.length > 0 ? (
                <div className="space-y-4">
                  {mealPlans.map((plan) => (
                    <Card key={plan.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        {plan.description && (
                          <p className="text-sm text-muted-foreground">
                            {plan.description}
                          </p>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {plan.meals.length > 0 ? (
                            plan.meals.map((meal, index) => (
                              <div key={index} className="text-sm">
                                <div className="font-medium">{meal.name} - {meal.time}</div>
                                <div className="text-muted-foreground">
                                  {meal.items.length} items
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              No meals added to this plan yet
                            </p>
                          )}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm">Edit Plan</Button>
                          <Button size="sm" className="ml-auto">Apply Plan</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Meal Plans Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Create your first meal plan to help structure your nutrition
                  </p>
                  <Button onClick={handleGetStartedWithMealPlan}>
                    Get Started
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Nutrition;
