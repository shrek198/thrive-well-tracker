
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Calendar, ArrowLeftRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/types';
import { format } from 'date-fns';

interface PhotoProgressProps {
  photos?: Progress[];
}

const PhotoProgress: React.FC<PhotoProgressProps> = ({ photos = [] }) => {
  const { toast } = useToast();
  
  const handleUploadPhoto = () => {
    toast({
      title: "Upload Photos",
      description: "Photo upload functionality will be implemented soon",
    });
  };
  
  const handleComparePhotos = () => {
    toast({
      title: "Compare Photos",
      description: "Photo comparison functionality will be implemented soon",
    });
  };

  const lastUploadDate = photos.length > 0 
    ? format(new Date(photos[0].date), 'MMM d, yyyy')
    : 'Never';
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-medium mb-2">Progress Photos</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Upload photos to track your visual progress over time
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div 
                key={index} 
                className="aspect-square bg-muted/50 rounded-md flex flex-col items-center justify-center"
                onClick={handleUploadPhoto}
              >
                {photos.length > 0 && photos[0].photos && photos[0].photos[index - 1] ? (
                  <img 
                    src={photos[0].photos[index - 1]} 
                    alt={`Progress photo ${index}`}
                    className="object-cover w-full h-full rounded-md"
                  />
                ) : (
                  <button className="flex flex-col items-center justify-center w-full h-full">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">
                      {index === 1 ? "Front View" : index === 2 ? "Side View" : "Back View"}
                    </p>
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <Button 
              className="flex-1" 
              variant="outline" 
              onClick={handleUploadPhoto}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Photos
            </Button>
            
            <Button 
              className="flex-1" 
              variant="outline" 
              onClick={handleComparePhotos}
            >
              <ArrowLeftRight className="mr-2 h-4 w-4" /> Compare Progress
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground pt-2">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1 inline" />
              Last upload: {lastUploadDate}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoProgress;
