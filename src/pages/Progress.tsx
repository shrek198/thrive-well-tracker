
import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, LineChart, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import ProgressChart from '@/components/Progress/ProgressChart';

const Progress = () => {
  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Progress</h1>
          <p className="text-muted-foreground">Track your fitness journey over time</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} /> Record Measurement
        </Button>
      </div>
      
      {/* Progress highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Current Weight</p>
                <h3 className="text-2xl font-bold">165 lbs</h3>
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>1.2 lbs</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Body Fat</p>
                <h3 className="text-2xl font-bold">21%</h3>
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>0.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Muscle Mass</p>
                <h3 className="text-2xl font-bold">120 lbs</h3>
              </div>
              <div className="flex items-center text-emerald-500 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>0.8 lbs</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Workouts</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <div className="flex items-center text-blue-500 text-sm">
                <span>This Month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="photos">Progress Photos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weight and Body Fat Chart */}
            <ProgressChart />
            
            {/* Recent Measurements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: 'May 10, 2025', weight: '165 lbs', body_fat: '21%' },
                    { date: 'May 3, 2025', weight: '166.2 lbs', body_fat: '21.5%' },
                    { date: 'Apr 26, 2025', weight: '167.5 lbs', body_fat: '22%' }
                  ].map((entry, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{entry.date}</span>
                      </div>
                      <div className="flex gap-4">
                        <span>{entry.weight}</span>
                        <span>{entry.body_fat}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4" size="sm">
                  View All Measurements
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="weight">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div>
                  <h3 className="font-medium mb-2">Weight Progress</h3>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Detailed weight chart will appear here
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="measurements">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div>
                  <h3 className="font-medium mb-2">Body Measurements</h3>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Body measurement charts and logs will appear here
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="photos">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div>
                  <h3 className="font-medium mb-2">Progress Photos</h3>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Your progress photos will appear here
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Progress;
