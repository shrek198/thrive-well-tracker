import React, { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Camera, ArrowUpRight, Download, Weight, Ruler } from 'lucide-react';
import { useMeasurements } from '@/hooks/useMeasurements';
import MeasurementChart from '@/components/Progress/MeasurementChart';
import MeasurementTable from '@/components/Progress/MeasurementTable';
import PhotoProgress from '@/components/Progress/PhotoProgress';
import ProgressChart from '@/components/Progress/ProgressChart';
import RecordMeasurementDialog from '@/components/Progress/RecordMeasurementDialog';
import { Progress as ProgressType } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { exportMeasurements, downloadCSV } from '@/utils/export';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Progress = () => {
  const { measurements, loading, getMeasurementsByType, getAllMeasurements } = useMeasurements();
  const [activeTab, setActiveTab] = useState('overview');
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [viewType, setViewType] = useState<'weight' | 'bodyFat' | 'measurements'>('weight');
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false);
  const [recordType, setRecordType] = useState<'weight' | 'bodyfat' | 'measurements' | 'photos'>('weight');
  const { toast } = useToast();
  
  // This state keeps track of when data has been refreshed
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Use the refreshTrigger state to force the component to get fresh data
  const weightData = getMeasurementsByType('weight');
  const bodyFatData = getMeasurementsByType('bodyFat');
  const measurementsData = getMeasurementsByType('measurements');
  const photosData = getMeasurementsByType('photos');
  
  const handleOpenViewAll = (type: 'weight' | 'bodyFat' | 'measurements') => {
    setViewType(type);
    setIsViewAllOpen(true);
  };

  const handleExportData = (type: 'weight' | 'bodyFat' | 'measurements') => {
    let data: ProgressType[] = [];
    let filename = '';
    
    switch(type) {
      case 'weight':
        data = weightData;
        filename = 'weight-progress.csv';
        break;
      case 'bodyFat':
        data = bodyFatData;
        filename = 'bodyfat-progress.csv';
        break;
      case 'measurements':
        data = measurementsData;
        filename = 'body-measurements.csv';
        break;
    }
    
    if (data.length === 0) {
      toast({
        title: "No Data to Export",
        description: "You don't have any data to export yet",
        variant: "destructive"
      });
      return;
    }
    
    const csvContent = exportMeasurements(data, type);
    downloadCSV(csvContent, filename);
    
    toast({
      title: "Export Successful",
      description: `Your data has been exported to ${filename}`
    });
  };

  // This function will be called after a measurement is saved
  const handleMeasurementSaved = () => {
    // Increment the refresh trigger to force a re-render with fresh data
    setRefreshTrigger(prev => prev + 1);
  };

  const getTitleForViewType = () => {
    switch(viewType) {
      case 'weight': return 'Weight History';
      case 'bodyFat': return 'Body Fat History';
      case 'measurements': return 'Body Measurements History';
      default: return 'Measurement History';
    }
  };
  
  const handleOpenRecordDialog = (type?: 'weight' | 'bodyfat' | 'measurements' | 'photos') => {
    if (type) {
      setRecordType(type);
    }
    setIsRecordDialogOpen(true);
  };

  const renderEmptyState = (type: string, buttonText: string, recordType: 'weight' | 'bodyfat' | 'measurements' | 'photos') => (
    <div className="text-center p-8">
      <LineChart className="h-16 w-16 mx-auto opacity-20 mb-2" />
      <p className="mb-4">No {type} data recorded yet</p>
      <Button 
        onClick={() => handleOpenRecordDialog(recordType)}
      >
        {buttonText}
      </Button>
    </div>
  );

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Progress Tracking</h1>
          <p className="text-muted-foreground">Monitor your fitness journey</p>
        </div>
        <Button className="gap-2" onClick={() => handleOpenRecordDialog()}>
          <LineChart size={16} /> Record Measurement
        </Button>
      </div>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Weight Tracking</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleOpenViewAll('weight')}
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> View All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleExportData('weight')}
                  >
                    <Download className="h-3.5 w-3.5 mr-1" /> Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {weightData.length > 0 ? (
                  <MeasurementChart 
                    data={weightData} 
                    dataKey="weight" 
                    name="Weight" 
                    color="#9b87f5" 
                    unit="kg"
                  />
                ) : (
                  <div className="h-[300px] flex flex-col items-center justify-center">
                    <Weight className="h-16 w-16 mx-auto opacity-20 mb-2" />
                    <p className="mb-4">No weight data recorded yet</p>
                    <Button onClick={() => handleOpenRecordDialog('weight')}>
                      Record Weight
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Body Fat Tracking</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleOpenViewAll('bodyFat')}
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> View All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleExportData('bodyFat')}
                  >
                    <Download className="h-3.5 w-3.5 mr-1" /> Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {bodyFatData.length > 0 ? (
                  <MeasurementChart 
                    data={bodyFatData} 
                    dataKey="bodyFat" 
                    name="Body Fat" 
                    color="#f97316" 
                    unit="%"
                  />
                ) : (
                  <div className="h-[300px] flex flex-col items-center justify-center">
                    <LineChart className="h-16 w-16 mx-auto opacity-20 mb-2" />
                    <p className="mb-4">No body fat data recorded yet</p>
                    <Button onClick={() => handleOpenRecordDialog('bodyfat')}>
                      Record Body Fat
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Body Measurements</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleOpenViewAll('measurements')}
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> View All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleExportData('measurements')}
                  >
                    <Download className="h-3.5 w-3.5 mr-1" /> Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {measurementsData.length > 0 ? (
                  <ProgressChart 
                    data={measurementsData.slice(-5)} 
                    height={300}
                  />
                ) : (
                  <div className="h-[300px] flex flex-col items-center justify-center">
                    <Ruler className="h-16 w-16 mx-auto opacity-20 mb-2" />
                    <p className="mb-4">No measurements recorded yet</p>
                    <Button 
                      onClick={() => handleOpenRecordDialog('measurements')}
                    >
                      Record Your First Measurement
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Photos</CardTitle>
              </CardHeader>
              <CardContent>
                {photosData.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {photosData.slice(0, 4).map((entry, index) => (
                      <div key={index} className="aspect-square relative overflow-hidden rounded-md bg-muted">
                        {entry.photos && entry.photos.length > 0 && (
                          <img 
                            src={entry.photos[0]} 
                            alt={`Progress photo ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[200px] flex flex-col items-center justify-center">
                    <Camera className="h-16 w-16 mx-auto opacity-20 mb-2" />
                    <p className="mb-4 text-center">No progress photos uploaded yet</p>
                    <Button 
                      onClick={() => handleOpenRecordDialog('photos')}
                    >
                      Upload Photos
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="weight">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Weight History</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExportData('weight')}
                >
                  <Download className="h-4 w-4 mr-1" /> Export Data
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {weightData.length > 0 ? (
                <div className="space-y-6">
                  <MeasurementChart 
                    data={weightData} 
                    dataKey="weight" 
                    name="Weight" 
                    color="#9b87f5" 
                    unit="kg"
                  />
                  <div className="border rounded-md overflow-hidden">
                    <MeasurementTable 
                      data={weightData} 
                      columns={['date', 'weight']} 
                    />
                  </div>
                </div>
              ) : (
                renderEmptyState('weight', 'Record Weight', 'weight')
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="measurements">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Body Measurements</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExportData('measurements')}
              >
                <Download className="h-4 w-4 mr-1" /> Export Data
              </Button>
            </CardHeader>
            <CardContent>
              {measurementsData.length > 0 ? (
                <div className="space-y-6">
                  <ProgressChart 
                    data={measurementsData} 
                    height={300}
                  />
                  <div className="border rounded-md overflow-hidden">
                    <MeasurementTable 
                      data={measurementsData} 
                      columns={['date', 'chest', 'waist', 'hips', 'biceps', 'thighs']} 
                    />
                  </div>
                </div>
              ) : (
                renderEmptyState('body measurement', 'Record Measurements', 'measurements')
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="photos">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Progress Photos</CardTitle>
            </CardHeader>
            <CardContent>
              {photosData.length > 0 ? (
                <PhotoProgress 
                  photos={photosData}
                  onUploadPhoto={() => handleOpenRecordDialog('photos')}
                />
              ) : (
                <div className="text-center p-8">
                  <Camera className="h-16 w-16 mx-auto opacity-20 mb-2" />
                  <p className="mb-4">No progress photos uploaded yet</p>
                  <Button onClick={() => handleOpenRecordDialog('photos')}>
                    Upload Your First Photo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* View All Measurements Dialog */}
      <Dialog open={isViewAllOpen} onOpenChange={setIsViewAllOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{getTitleForViewType()}</DialogTitle>
            <DialogDescription>
              View and analyze all your recorded measurements
            </DialogDescription>
          </DialogHeader>
          
          {viewType === 'weight' && (
            <div className="space-y-6">
              {weightData.length > 0 ? (
                <>
                  <MeasurementChart 
                    data={weightData} 
                    dataKey="weight" 
                    name="Weight" 
                    color="#9b87f5" 
                    unit="kg" 
                  />
                  <div className="border rounded-md overflow-hidden">
                    <MeasurementTable 
                      data={weightData} 
                      columns={['date', 'weight']}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsViewAllOpen(false)}>
                      Close
                    </Button>
                    <Button onClick={() => handleExportData('weight')}>
                      <Download className="h-4 w-4 mr-1" /> Export Data
                    </Button>
                  </div>
                </>
              ) : (
                renderEmptyState('weight', 'Record Weight', 'weight')
              )}
            </div>
          )}
          
          {viewType === 'bodyFat' && (
            <div className="space-y-6">
              {bodyFatData.length > 0 ? (
                <>
                  <MeasurementChart 
                    data={bodyFatData} 
                    dataKey="bodyFat" 
                    name="Body Fat" 
                    color="#f97316" 
                    unit="%" 
                  />
                  <div className="border rounded-md overflow-hidden">
                    <MeasurementTable 
                      data={bodyFatData} 
                      columns={['date', 'bodyFat']}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsViewAllOpen(false)}>
                      Close
                    </Button>
                    <Button onClick={() => handleExportData('bodyFat')}>
                      <Download className="h-4 w-4 mr-1" /> Export Data
                    </Button>
                  </div>
                </>
              ) : (
                renderEmptyState('body fat', 'Record Body Fat', 'bodyfat')
              )}
            </div>
          )}
          
          {viewType === 'measurements' && (
            <div className="space-y-6">
              {measurementsData.length > 0 ? (
                <>
                  <ProgressChart 
                    data={measurementsData} 
                    height={300}
                  />
                  <div className="border rounded-md overflow-hidden">
                    <MeasurementTable 
                      data={measurementsData} 
                      columns={['date', 'chest', 'waist', 'hips', 'biceps', 'thighs']}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsViewAllOpen(false)}>
                      Close
                    </Button>
                    <Button onClick={() => handleExportData('measurements')}>
                      <Download className="h-4 w-4 mr-1" /> Export Data
                    </Button>
                  </div>
                </>
              ) : (
                renderEmptyState('measurements', 'Record Measurements', 'measurements')
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Record Measurement Dialog with the selected type */}
      <RecordMeasurementDialog 
        open={isRecordDialogOpen}
        onOpenChange={setIsRecordDialogOpen}
        defaultTab={recordType}
        onSave={handleMeasurementSaved}
      />
    </AppLayout>
  );
};

export default Progress;
