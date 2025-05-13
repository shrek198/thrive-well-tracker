
import React, { useState, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';

const samplePhotos = [
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1740&auto=format&fit=crop&w=300&h=300',
  'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1740&auto=format&fit=crop&w=300&h=300',
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1740&auto=format&fit=crop&w=300&h=300',
  'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1740&auto=format&fit=crop&w=300&h=300'
];

interface RecordMeasurementDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultTab?: 'weight' | 'bodyfat' | 'measurements' | 'photos';
  onSave?: () => void;
}

const RecordMeasurementDialog: React.FC<RecordMeasurementDialogProps> = ({ 
  open, 
  onOpenChange,
  defaultTab = 'weight',
  onSave
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const { addMeasurement } = useMeasurements();
  const { toast } = useToast();

  // Sync internal state with props
  useEffect(() => {
    if (open !== undefined) {
      setIsDialogOpen(open);
    }
  }, [open]);

  // Set active tab when defaultTab changes
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

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
    selectedSampleIndex: -1,
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
        let photoUrl = '';
        
        if (photoData.selectedSampleIndex >= 0) {
          photoUrl = samplePhotos[photoData.selectedSampleIndex];
        } else if (photoData.photoUrl) {
          photoUrl = photoData.photoUrl;
        }
        
        if (!photoUrl) {
          toast({
            title: "Missing Information",
            description: "Please provide a photo URL or select a sample photo",
            variant: "destructive"
          });
          return;
        }
        
        newMeasurement.photos = [photoUrl];
        successMessage = 'Progress photo recorded';
        setPhotoData({ photoUrl: '', notes: '', selectedSampleIndex: -1 });
        break;
    }

    // Save the measurement
    addMeasurement(newMeasurement);
    
    // Notify parent component that measurement was saved
    if (onSave) {
      onSave();
    }
    
    // Close dialog and show success toast
    handleDialogChange(false);
    toast({
      title: "Measurement Recorded",
      description: successMessage,
    });
  };

  const selectSamplePhoto = (index: number) => {
    setPhotoData({
      ...photoData,
      selectedSampleIndex: photoData.selectedSampleIndex === index ? -1 : index
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
      {/* Dialog Trigger Button - Now only rendered when not controlled by props */}
      {open === undefined && (
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus size={16} /> Record Measurement
          </Button>
        </DialogTrigger>
      )}
      
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Sample Photos (click to select)</Label>
                <div className="grid grid-cols-4 gap-2">
                  {samplePhotos.map((photo, index) => (
                    <div 
                      key={index}
                      className={`aspect-square relative overflow-hidden rounded-md cursor-pointer border-2 ${photoData.selectedSampleIndex === index ? 'border-primary' : 'border-transparent'}`}
                      onClick={() => selectSamplePhoto(index)}
                    >
                      <img 
                        src={photo} 
                        alt={`Sample photo ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center text-muted-foreground text-sm">- or -</div>
              
              <div className="space-y-2">
                <Label htmlFor="photo-url">Custom Photo URL</Label>
                <Input
                  id="photo-url"
                  placeholder="e.g. https://example.com/my-progress-photo.jpg"
                  value={photoData.photoUrl}
                  onChange={(e) => setPhotoData({ ...photoData, photoUrl: e.target.value })}
                  disabled={photoData.selectedSampleIndex >= 0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo-notes">Notes (Optional)</Label>
                <Textarea
                  id="photo-notes"
                  placeholder="Add any notes about this photo"
                  value={photoData.notes}
                  onChange={(e) => setPhotoData({ ...photoData, notes: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => handleDialogChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Measurement</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordMeasurementDialog;
