
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PieChart, Plus, Utensils } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import MacroCard from '@/components/Nutrition/MacroCard';

const Nutrition = () => {
  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Nutrition</h1>
          <p className="text-muted-foreground">Track your meals and nutrition intake</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} /> Add Meal
        </Button>
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
      
      <Tabs defaultValue="meals" className="mb-6">
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
                    <Button variant="outline" className="w-full">
                      <Plus size={16} className="mr-2" /> Add Food Items
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="log">
          <div className="text-center p-8 text-muted-foreground">
            Your food log history will appear here
          </div>
        </TabsContent>
        
        <TabsContent value="plans">
          <div className="text-center p-8 text-muted-foreground">
            Create and view your meal plans here
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Nutrition;
