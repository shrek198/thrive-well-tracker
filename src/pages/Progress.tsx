
import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, LineChart, Plus, ArrowUp, ArrowDown, Download } from 'lucide-react';
import ProgressChart from '@/components/Progress/ProgressChart';
import RecordMeasurementDialog from '@/components/Progress/RecordMeasurementDialog';
import MeasurementChart from '@/components/Progress/MeasurementChart';
import MeasurementTable from '@/components/Progress/MeasurementTable';
import PhotoProgress from '@/components/Progress/PhotoProgress';
import { useMeasurements } from '@/hooks/useMeasurements';
import { useToast } from '@/hooks/use-toast';
import { Progress as ProgressType } from '@/types';

const Progress = () => {
  const { toast } = useToast();
  const { measurements, loading, addMeasurement, getMeasurementsByType } = useMeasurements();
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleMeasurementAdded = (data: ProgressType) => {
    addMeasurement(data);
    toast({
      title: "Measurement Recorded",
      description: "Your progress has been updated successfully",
    });
  };
  
  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify(measurements, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'fitness-progress-data.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: "Data Exported",
        description: "Your progress data has been exported successfully",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data",
        variant: "destructive"
      });
    }
  };
  
  // Get the latest measurements
  const weightMeasurements = getMeasurementsByType('weight');
  const bodyFatMeasurements = getMeasurementsByType('bodyFat');
  
  const latestWeight = weightMeasurements.length > 0 ? 
    weightMeasurements[weightMeasurements.length - 1].weight : null;
  
  const previousWeight = weightMeasurements.length > 1 ? 
    weightMeasurements[weightMeasurements.length - 2].weight : null;
  
  const weightChange = latestWeight && previousWeight ? 
    (latestWeight - previousWeight) : null;
  
  const latestBodyFat = bodyFatMeasurements.length > 0 ? 
    bodyFatMeasurements[bodyFatMeasurements.length - 1].bodyFat : null;
  
  const previousBodyFat = bodyFatMeasurements.length > 1 ? 
    bodyFatMeasurements[bodyFatMeasurements.length - 2].bodyFat : null;
  
  const bodyFatChange = latestBodyFat && previousBodyFat ? 
    (latestBodyFat - previousBodyFat) : null;

  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Progress</h1>
          <p className="text-muted-foreground">Track your fitness journey over time</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleExportData}>
            <Download size={16} /> Export Data
          </Button>
          <RecordMeasurementDialog onMeasurementAdded={handleMeasurementAdded} />
        </div>
      </div>
      
      {/* Progress highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Current Weight</p>
                <h3 className="text-2xl font-bold">
                  {latestWeight ? `${latestWeight} lbs` : '–'}
                </h3>
              </div>
              {weightChange !== null && (
                <div className={`flex items-center text-sm ${weightChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {weightChange < 0 ? (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  )}
                  <span>{Math.abs(weightChange).toFixed(1)} lbs</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Body Fat</p>
                <h3 className="text-2xl font-bold">
                  {latestBodyFat ? `${latestBodyFat}%` : '–'}
                </h3>
              </div>
              {bodyFatChange !== null && (
                <div className={`flex items-center text-sm ${bodyFatChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {bodyFatChange < 0 ? (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  )}
                  <span>{Math.abs(bodyFatChange).toFixed(1)}%</span>
                </div>
              )}
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="photos">Progress Photos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weight and Body Fat Chart */}
            {weightMeasurements.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progress Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <MeasurementChart 
                    data={weightMeasurements}
                    dataKey="weight"
                    name="Weight"
                    color="#3b82f6"
                    unit="lbs"
                  />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progress Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProgressChart />
                </CardContent>
              </Card>
            )}
            
            {/* Recent Measurements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                {measurements.length > 0 ? (
                  <div className="space-y-4">
                    {measurements
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 3)
                      .map((entry, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {new Date(entry.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex gap-4">
                            {entry.weight && <span>{entry.weight} lbs</span>}
                            {entry.bodyFat && <span>{entry.bodyFat}%</span>}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <LineChart className="h-12 w-12 mx-auto opacity-20 mb-2" />
                    <p>No measurement data recorded yet</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-4" 
                      onClick={() => document.querySelector('button[class*="gap-2"]:has(svg[data-lucide="plus"])')?.click()}
                    >
                      Record Your First Measurement
                    </Button>
                  </div>
                )}
                
                {measurements.length > 0 && (
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4" 
                    size="sm" 
                    onClick={() => setActiveTab("weight")}
                  >
                    View All Measurements
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="weight">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Weight Progress</CardTitle>
                <RecordMeasurementDialog onMeasurementAdded={handleMeasurementAdded} />
              </CardHeader>
              <CardContent>
                {weightMeasurements.length > 0 ? (
                  <div className="space-y-6">
                    <MeasurementChart 
                      data={weightMeasurements}
                      dataKey="weight"
                      name="Weight"
                      color="#3b82f6"
                      unit="lbs"
                    />
                    
                    <MeasurementTable 
                      measurements={measurements}
                      type="weight"
                    />
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <LineChart className="h-16 w-16 mx-auto opacity-20 mb-2" />
                    <p className="mb-4">No weight data recorded yet</p>
                    <Button 
                      onClick={() => document.querySelector('button[class*="gap-2"]:has(svg[data-lucide="plus"])')?.click()}
                    >
                      Record Weight
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Body Fat Progress</CardTitle>
                <RecordMeasurementDialog onMeasurementAdded={handleMeasurementAdded} />
              </CardHeader>
              <CardContent>
                {bodyFatMeasurements.length > 0 ? (
                  <div className="space-y-6">
                    <MeasurementChart 
                      data={bodyFatMeasurements}
                      dataKey="bodyFat"
                      name="Body Fat"
                      color="#f43f5e"
                      unit="%"
                    />
                    
                    <MeasurementTable 
                      measurements={measurements}
                      type="bodyFat"
                    />
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <LineChart className="h-16 w-16 mx-auto opacity-20 mb-2" />
                    <p className="mb-4">No body fat data recorded yet</p>
                    <Button 
                      onClick={() => document.querySelector('button[class*="gap-2"]:has(svg[data-lucide="plus"])')?.click()}
                    >
                      Record Body Fat
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="measurements">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Body Measurements</CardTitle>
              <RecordMeasurementDialog onMeasurementAdded={handleMeasurementAdded} />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <MeasurementTable 
                  measurements={measurements}
                  type="measurements"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="photos">
          <PhotoProgress />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Progress;
