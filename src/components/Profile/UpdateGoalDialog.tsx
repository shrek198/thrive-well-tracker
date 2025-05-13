
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

interface Goal {
  id: string;
  name: string;
  progress: number;
  target: string;
  current: string;
}

interface UpdateGoalDialogProps {
  goal: Goal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateGoal: (id: string, progress: number, current: string) => void;
  onCompleteGoal: (id: string) => void;
}

const UpdateGoalDialog: React.FC<UpdateGoalDialogProps> = ({
  goal,
  open,
  onOpenChange,
  onUpdateGoal,
  onCompleteGoal
}) => {
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState('');
  const { toast } = useToast();

  // Update state when the goal changes
  useEffect(() => {
    if (goal) {
      setProgress(goal.progress);
      setCurrent(goal.current);
    }
  }, [goal]);

  const handleUpdate = () => {
    if (!goal || !current.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in the current status",
        variant: "destructive"
      });
      return;
    }

    onUpdateGoal(goal.id, progress, current);
    
    toast({
      title: "Goal Updated",
      description: "Your progress has been updated"
    });
    
    onOpenChange(false);
  };

  const handleComplete = () => {
    if (!goal) return;
    
    onCompleteGoal(goal.id);
    
    toast({
      title: "Goal Completed",
      description: "Congratulations on achieving your goal!",
      variant: "success"
    });
    
    onOpenChange(false);
  };

  if (!goal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Goal Progress</DialogTitle>
          <DialogDescription>
            Track your progress for: {goal.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label>Goal</Label>
              <span className="text-muted-foreground">{goal.name}</span>
            </div>
          </div>
          
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label>Target</Label>
              <span className="text-muted-foreground">{goal.target}</span>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="current">Current Status</Label>
            <Input
              id="current"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="e.g., 7 lbs lost, best time: 28 mins"
            />
          </div>
          
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="progress">Current Progress (%)</Label>
              <span>{progress}%</span>
            </div>
            <Slider
              id="progress"
              min={0}
              max={100}
              step={1}
              value={[progress]}
              onValueChange={(value) => setProgress(value[0])}
              className="py-2"
            />
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="sm:order-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpdate}
            className="sm:order-2"
          >
            Update Progress
          </Button>
          {progress === 100 && (
            <Button 
              variant="default"
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700 sm:order-3"
            >
              Mark as Complete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGoalDialog;
