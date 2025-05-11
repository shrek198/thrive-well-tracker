
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Activity, Plus, Calendar, Filter } from 'lucide-react';

const Workouts = () => {
  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Workouts</h1>
          <p className="text-muted-foreground">Track and manage your workout routines</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} /> New Workout
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Workouts</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Filter size={16} /> Filter
          </Button>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example workout cards */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {["Upper Body", "Lower Body", "Full Body", "Cardio", "HIIT", "Recovery"][i % 6]} Workout
                      </CardTitle>
                      <CardDescription>{new Date().toLocaleDateString()}</CardDescription>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-sm mb-2">
                    <span className="font-semibold">Duration:</span> {(30 + i * 5)} min
                  </div>
                  <div className="text-sm mb-4">
                    <span className="font-semibold">Exercises:</span> {(4 + i % 3)} exercises
                  </div>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="text-center p-8 text-muted-foreground">
            Your recent workouts will appear here
          </div>
        </TabsContent>
        
        <TabsContent value="favorites">
          <div className="text-center p-8 text-muted-foreground">
            Your favorite workouts will appear here
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Workouts;
