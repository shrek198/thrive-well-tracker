
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/types';
import { useMeasurements } from '@/hooks/useMeasurements';
import { useToast } from '@/hooks/use-toast';

const RecordMeasurementDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("weight");
  const { addMeasurement } = useMeasurements();
  const { toast } = useToast();

  // Form states for different types of measurements
  const [weightData, setWeightData] = useState({
    weight: '',
  });

  const [bodyFatData, setBodyFatData] = useState({
    bodyFat: '',
  });

  const [measurementsData, setMeasurementsData] = useState({
    chest: '',
    waist: '',
    hips: '',
    biceps: '',
    thighs: '',
  });

  const [photoData, setPhotoData] = useState({
    photoUrl: '',
    notes: '',
  });

  const handleSubmit = () => {
    const now = new Date();
    let newMeasurement: Progress = {
      date: now,
    };

    let successMessage = '';

    // Add the appropriate measurement data based on activeTab
    switch (activeTab) {
      case 'weight':
        if (!weightData.weight) {
          toast({
            title: "Missing Information",
            description: "Please enter a weight value",
            variant: "destructive"
          });
          return;
        }
        newMeasurement.weight = parseFloat(weightData.weight);
        successMessage = `Weight of ${weightData.weight}kg recorded`;
        setWeightData({ weight: '' });
        break;

      case 'bodyfat':
        if (!bodyFatData.bodyFat) {
          toast({
            title: "Missing Information",
            description: "Please enter a body fat percentage",
            variant: "destructive"
          });
          return;
        }
        newMeasurement.bodyFat = parseFloat(bodyFatData.bodyFat);
        successMessage = `Body fat of ${bodyFatData.bodyFat}% recorded`;
        setBodyFatData({ bodyFat: '' });
        break;

      case 'measurements':
        // Check if at least one measurement is provided
        const hasMeasurement = Object.values(measurementsData).some(value => !!value);
        if (!hasMeasurement) {
          toast({
            title: "Missing Information",
            description: "Please enter at least one body measurement",
            variant: "destructive"
          });
          return;
        }
        
        // Convert string values to numbers where provided
        newMeasurement.measurements = {
          chest: measurementsData.chest ? parseFloat(measurementsData.chest) : undefined,
          waist: measurementsData.waist ? parseFloat(measurementsData.waist) : undefined,
          hips: measurementsData.hips ? parseFloat(measurementsData.hips) : undefined,
          biceps: measurementsData.biceps ? parseFloat(measurementsData.biceps) : undefined,
          thighs: measurementsData.thighs ? parseFloat(measurementsData.thighs) : undefined,
        };
        successMessage = 'Body measurements recorded';
        setMeasurementsData({
          chest: '',
          waist: '',
          hips: '',
          biceps: '',
          thighs: '',
        });
        break;

      case 'photos':
        if (!photoData.photoUrl) {
          toast({
            title: "Missing Information",
            description: "Please provide a photo URL",
            variant: "destructive"
          });
          return;
        }
        newMeasurement.photos = [photoData.photoUrl];
        successMessage = 'Progress photo recorded';
        setPhotoData({ photoUrl: '', notes: '' });
        break;
    }

    // Save the measurement
    addMeasurement(newMeasurement);
    
    // Close dialog and show success toast
    setIsDialogOpen(false);
    toast({
      title: "Measurement Recorded",
      description: successMessage,
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={16} /> Record Measurement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Record New Measurement</DialogTitle>
          <DialogDescription>
            Track your progress by recording new measurements
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="bodyfat">Body Fat</TabsTrigger>
            <TabsTrigger value="measurements">Measurements</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weight" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="e.g. 70.5"
                value={weightData.weight}
                onChange={(e) => setWeightData({ weight: e.target.value })}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Record your current weight to track progress over time
            </div>
          </TabsContent>
          
          <TabsContent value="bodyfat" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bodyfat">Body Fat Percentage (%)</Label>
              <Input
                id="bodyfat"
                type="number"
                step="0.1"
                placeholder="e.g. 15.5"
                value={bodyFatData.bodyFat}
                onChange={(e) => setBodyFatData({ bodyFat: e.target.value })}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Record your current body fat percentage using calipers, bioimpedance scale, or other measurement methods
            </div>
          </TabsContent>
          
          <TabsContent value="measurements" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chest">Chest (cm)</Label>
                <Input
                  id="chest"
                  type="number"
                  step="0.1"
                  placeholder="e.g. 100"
                  value={measurementsData.chest}
                  onChange={(e) => setMeasurementsData({ ...measurementsData, chest: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waist">Waist (cm)</Label>
                <Input
                  id="waist"
                  type="number"
                  step="0.1"
                  placeholder="e.g. 80"
                  value={measurementsData.waist}
                  onChange={(e) => setMeasurementsData({ ...measurementsData, waist: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hips">Hips (cm)</Label>
                <Input
                  id="hips"
                  type="number"
                  step="0.1"
                  placeholder="e.g. 90"
                  value={measurementsData.hips}
                  onChange={(e) => setMeasurementsData({ ...measurementsData, hips: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="biceps">Biceps (cm)</Label>
                <Input
                  id="biceps"
                  type="number"
                  step="0.1"
                  placeholder="e.g. 35"
                  value={measurementsData.biceps}
                  onChange={(e) => setMeasurementsData({ ...measurementsData, biceps: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thighs">Thighs (cm)</Label>
                <Input
                  id="thighs"
                  type="number"
                  step="0.1"
                  placeholder="e.g. 55"
                  value={measurementsData.thighs}
                  onChange={(e) => setMeasurementsData({ ...measurementsData, thighs: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="photos" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="photo-url">Photo URL</Label>
              <Input
                id="photo-url"
                placeholder="e.g. https://example.com/my-progress-photo.jpg"
                value={photoData.photoUrl}
                onChange={(e) => setPhotoData({ ...photoData, photoUrl: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo-notes">Notes (Optional)</Label>
              <Input
                id="photo-notes"
                placeholder="Add any notes about this photo"
                value={photoData.notes}
                onChange={(e) => setPhotoData({ ...photoData, notes: e.target.value })}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Upload your progress photos to visually track your transformation over time
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Measurement</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordMeasurementDialog;
