
import React, { useState } from 'react';
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

interface AddGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: (goal: { name: string; target: string; progress: number; current: string }) => void;
}

const AddGoalDialog: React.FC<AddGoalDialogProps> = ({
  open,
  onOpenChange,
  onAddGoal
}) => {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    if (!name.trim() || !target.trim() || !current.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the required fields",
        variant: "destructive"
      });
      return;
    }

    onAddGoal({
      name,
      target,
      progress,
      current
    });
    
    // Reset the form
    setName('');
    setTarget('');
    setProgress(0);
    setCurrent('');
    
    toast({
      title: "Goal Added",
      description: "Your new fitness goal has been added"
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
          <DialogDescription>
            Set a new fitness goal to track your progress
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="goal-name">Goal Name</Label>
            <Input
              id="goal-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Lose 10 lbs"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="target">Target</Label>
            <Input
              id="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., 10 lbs, 25 minutes, 10 reps"
            />
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
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Add Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalDialog;
