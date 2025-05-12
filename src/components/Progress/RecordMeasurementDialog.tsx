import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Plus, Upload } from 'lucide-react';

type MeasurementType = 'weight' | 'bodyFat' | 'measurements' | 'photos';

interface MeasurementData {
  date: Date;
  weight?: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thighs?: number;
  };
  photos?: string[];
}

const RecordMeasurementDialog = ({ onMeasurementAdded }: { onMeasurementAdded: (data: MeasurementData) => void }) => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<MeasurementType>('weight');
  const [measurementData, setMeasurementData] = useState<MeasurementData>({
    date: new Date(),
    weight: undefined,
    bodyFat: undefined,
    measurements: {
      chest: undefined,
      waist: undefined,
      hips: undefined,
      biceps: undefined,
      thighs: undefined
    },
    photos: []
  });
  
  const handleInputChange = (type: MeasurementType, field: string, value: string) => {
    const numValue = value ? parseFloat(value) : undefined;
    
    if (type === 'measurements') {
      setMeasurementData({
        ...measurementData,
        measurements: {
          ...measurementData.measurements,
          [field]: numValue
        }
      });
    } else {
      setMeasurementData({
        ...measurementData,
        [field]: numValue
      });
    }
  };
  
  const handleSubmit = () => {
    // Validate data based on selected tab
    if (selectedTab === 'weight' && !measurementData.weight) {
      toast({
        title: "Weight required",
        description: "Please enter your current weight",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedTab === 'bodyFat' && !measurementData.bodyFat) {
      toast({
        title: "Body fat percentage required",
        description: "Please enter your current body fat percentage",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedTab === 'measurements' && 
        !measurementData.measurements?.chest && 
        !measurementData.measurements?.waist && 
        !measurementData.measurements?.hips && 
        !measurementData.measurements?.biceps && 
        !measurementData.measurements?.thighs) {
      toast({
        title: "Measurements required",
        description: "Please enter at least one body measurement",
        variant: "destructive"
      });
      return;
    }

    // Save the data and notify parent component
    onMeasurementAdded(measurementData);
    
    // Close the dialog
    toast({
      title: "Measurement recorded",
      description: "Your progress has been saved successfully",
    });
    
    // Reset the form data
    setMeasurementData({
      date: new Date(),
      weight: undefined,
      bodyFat: undefined,
      measurements: {
        chest: undefined,
        waist: undefined,
        hips: undefined,
        biceps: undefined,
        thighs: undefined
      },
      photos: []
    });
    
    // Close dialog by clicking the close button
    document.querySelector<HTMLButtonElement>('[data-state="open"] [role="dialog"] button[aria-label="Close"]')?.click();
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={16} /> Record Measurement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Record New Measurement</DialogTitle>
          <DialogDescription>Track your progress by recording your latest measurements</DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          
          <Tabs defaultValue="weight" value={selectedTab} onValueChange={(value) => setSelectedTab(value as MeasurementType)}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="weight">Weight</TabsTrigger>
              <TabsTrigger value="bodyFat">Body Fat</TabsTrigger>
              <TabsTrigger value="measurements">Measurements</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weight" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Current Weight</Label>
                <div className="flex gap-2">
                  <Input 
                    id="weight"
                    type="number"
                    placeholder="Enter weight"
                    value={measurementData.weight || ''}
                    onChange={(e) => handleInputChange('weight', 'weight', e.target.value)}
                  />
                  <select 
                    className="p-2 border border-input rounded-md bg-background w-24"
                    defaultValue="lbs"
                  >
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                  </select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bodyFat" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bodyFat">Current Body Fat %</Label>
                <div className="flex gap-2">
                  <Input 
                    id="bodyFat"
                    type="number"
                    placeholder="Enter body fat"
                    min="1"
                    max="50"
                    step="0.1"
                    value={measurementData.bodyFat || ''}
                    onChange={(e) => handleInputChange('bodyFat', 'bodyFat', e.target.value)}
                  />
                  <span className="flex items-center">%</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="measurements" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chest">Chest</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="chest"
                      type="number"
                      placeholder="Enter chest"
                      value={measurementData.measurements?.chest || ''}
                      onChange={(e) => handleInputChange('measurements', 'chest', e.target.value)}
                    />
                    <span className="flex items-center">in</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="waist">Waist</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="waist"
                      type="number"
                      placeholder="Enter waist"
                      value={measurementData.measurements?.waist || ''}
                      onChange={(e) => handleInputChange('measurements', 'waist', e.target.value)}
                    />
                    <span className="flex items-center">in</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hips">Hips</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="hips"
                      type="number"
                      placeholder="Enter hips"
                      value={measurementData.measurements?.hips || ''}
                      onChange={(e) => handleInputChange('measurements', 'hips', e.target.value)}
                    />
                    <span className="flex items-center">in</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="biceps">Biceps</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="biceps"
                      type="number"
                      placeholder="Enter biceps"
                      value={measurementData.measurements?.biceps || ''}
                      onChange={(e) => handleInputChange('measurements', 'biceps', e.target.value)}
                    />
                    <span className="flex items-center">in</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="thighs">Thighs</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="thighs"
                      type="number"
                      placeholder="Enter thighs"
                      value={measurementData.measurements?.thighs || ''}
                      onChange={(e) => handleInputChange('measurements', 'thighs', e.target.value)}
                    />
                    <span className="flex items-center">in</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="photos" className="mt-4">
              <div className="space-y-4">
                <div className="text-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium mb-1">Drag and drop photos</p>
                    <p className="text-xs text-muted-foreground mb-3">or click to upload</p>
                    <Button size="sm" variant="secondary">Upload Photos</Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload front, side, and back views for best progress tracking
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline"
            onClick={() => document.querySelector<HTMLButtonElement>('[data-state="open"] [role="dialog"] button[aria-label="Close"]')?.click()}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Measurement</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordMeasurementDialog;
