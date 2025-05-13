
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Progress } from '@/types';
import { format } from 'date-fns';

interface PhotoComparisonProps {
  photos: Progress[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PhotoComparison: React.FC<PhotoComparisonProps> = ({ photos, open, onOpenChange }) => {
  const [selectedBefore, setSelectedBefore] = useState<number>(photos.length > 1 ? photos.length - 1 : 0);
  const [selectedAfter, setSelectedAfter] = useState<number>(0);

  if (photos.length < 1) {
    return null;
  }

  // Sort photos by date (oldest to newest)
  const sortedPhotos = [...photos].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  const beforePhoto = sortedPhotos[selectedBefore];
  const afterPhoto = sortedPhotos[selectedAfter];

  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM d, yyyy');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Photo Comparison</DialogTitle>
          <DialogDescription>
            Compare your progress photos over time
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-center">Before: {formatDate(beforePhoto.date)}</h3>
            <div className="aspect-square overflow-hidden rounded-md bg-muted">
              {beforePhoto.photos && beforePhoto.photos.length > 0 ? (
                <img 
                  src={beforePhoto.photos[0]} 
                  alt="Before photo" 
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">No photo available</div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm">Select before photo:</label>
              <select 
                className="w-full p-2 rounded border border-input bg-background" 
                value={selectedBefore}
                onChange={(e) => setSelectedBefore(Number(e.target.value))}
              >
                {sortedPhotos.map((photo, index) => (
                  <option key={index} value={index} disabled={index === selectedAfter}>
                    {formatDate(photo.date)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-center">After: {formatDate(afterPhoto.date)}</h3>
            <div className="aspect-square overflow-hidden rounded-md bg-muted">
              {afterPhoto.photos && afterPhoto.photos.length > 0 ? (
                <img 
                  src={afterPhoto.photos[0]} 
                  alt="After photo" 
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">No photo available</div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm">Select after photo:</label>
              <select 
                className="w-full p-2 rounded border border-input bg-background" 
                value={selectedAfter}
                onChange={(e) => setSelectedAfter(Number(e.target.value))}
              >
                {sortedPhotos.map((photo, index) => (
                  <option key={index} value={index} disabled={index === selectedBefore}>
                    {formatDate(photo.date)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoComparison;
