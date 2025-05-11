
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PieChart, Plus, Utensils } from 'lucide-react';
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

const Nutrition = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("meals");

  const handleAddMeal = () => {
    toast({
      title: "Meal Added",
      description: "Your meal has been logged successfully",
    });
  };

  const handleAddFoodItem = () => {
    toast({
      title: "Food Item Added",
      description: "Your food item has been added to the meal",
    });
  };

  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Nutrition</h1>
          <p className="text-muted-foreground">Track your meals and nutrition intake</p>
        </div>
        <Dialog>
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
                <Input id="meal-name" placeholder="e.g. Breakfast, Lunch, Dinner, Snack" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meal-time">Time</Label>
                <Input id="meal-time" type="time" />
              </div>
              <div className="space-y-2">
                <Label>Food Items</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input placeholder="Food item" className="flex-1" />
                    <Input placeholder="Calories" type="number" className="w-24" />
                    <Button variant="ghost" size="icon">+</Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Plus size={14} className="mr-1" /> Add Another Item
                </Button>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => document.querySelector<HTMLButtonElement>('[data-state="open"] [role="dialog"] button[aria-label="Close"]')?.click()}>
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
              <div className="text-2xl font-bold">1,450 <span className="text-sm font-normal text-muted-foreground">/ 2,000 kcal</span></div>
              <Progress value={72.5} className="mt-2" />
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-1">Water Intake</div>
              <div className="text-2xl font-bold">1.2 <span className="text-sm font-normal text-muted-foreground">/ 2.5 L</span></div>
              <Progress value={48} className="mt-2" />
            </div>
            
            <div className="col-span-2">
              <div className="text-sm text-muted-foreground mb-3">Macronutrients</div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <MacroCard type="protein" current={65} target={120} />
                </div>
                <div className="flex-1">
                  <MacroCard type="carbs" current={180} target={250} />
                </div>
                <div className="flex-1">
                  <MacroCard type="fat" current={45} target={65} />
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
            {["Breakfast", "Lunch", "Dinner", "Snacks"].map((meal) => (
              <Card key={meal}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{meal}</CardTitle>
                    <Utensils className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  {meal === "Breakfast" ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Oatmeal with fruits</span>
                        <span className="text-muted-foreground">320 kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Greek Yogurt</span>
                        <span className="text-muted-foreground">150 kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coffee</span>
                        <span className="text-muted-foreground">5 kcal</span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>475 kcal</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Plus size={16} className="mr-2" /> Add Food Items
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Food to {meal}</DialogTitle>
                          <DialogDescription>Add food items to your {meal.toLowerCase()}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="food-name">Food Item</Label>
                            <Input id="food-name" placeholder="e.g. Apple, Chicken Breast" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="food-amount">Amount</Label>
                              <Input id="food-amount" placeholder="e.g. 100" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="food-unit">Unit</Label>
                              <select 
                                id="food-unit"
                                className="w-full p-2 border border-input rounded-md bg-background"
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
                              <Input id="food-calories" placeholder="e.g. 150" type="number" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="food-protein">Protein (g)</Label>
                              <Input id="food-protein" placeholder="e.g. 20" type="number" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="food-carbs">Carbs (g)</Label>
                              <Input id="food-carbs" placeholder="e.g. 30" type="number" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="food-fat">Fat (g)</Label>
                              <Input id="food-fat" placeholder="e.g. 5" type="number" />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => document.querySelector<HTMLButtonElement>('[data-state="open"] [role="dialog"] button[aria-label="Close"]')?.click()}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddFoodItem}>Add Food</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="log">
          <Card>
            <CardHeader>
              <CardTitle>Food Log History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["Today", "Yesterday", "May 9, 2025", "May 8, 2025"].map((day) => (
                  <div key={day} className="space-y-4">
                    <h3 className="font-medium">{day}</h3>
                    {day === "Today" || day === "Yesterday" ? (
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
                <Button variant="outline" className="w-full mt-4" onClick={() => toast({ title: "Food Log", description: "Loading more history..." })}>
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
              <Button size="sm" variant="outline" onClick={() => toast({ title: "New Meal Plan", description: "Create a structured meal plan" })}>
                <Plus size={16} className="mr-2" /> Create Plan
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Meal Plans Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first meal plan to help structure your nutrition
                </p>
                <Button onClick={() => toast({ title: "Getting Started", description: "Let's create your first meal plan" })}>
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Nutrition;
