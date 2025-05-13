
import { useState, useEffect } from 'react';

export interface ProfileData {
  name: string;
  bio: string;
  avatar?: string;
  workouts: number;
  activeDays: number;
  achievements: number;
  goalsCompleted: number;
  goals: {
    id: string;
    name: string;
    progress: number;
    target: string;
    current: string;
  }[];
  completedGoals: {
    goal: string;
    date: string;
  }[];
}

const STORAGE_KEY = 'fitness-app-profile';

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Alex Smith',
    bio: 'Fitness Enthusiast',
    avatar: '',
    workouts: 48,
    activeDays: 86,
    achievements: 12,
    goalsCompleted: 5,
    goals: [
      {
        id: '1',
        name: 'Lose 10 lbs',
        progress: 70,
        target: '10 lbs',
        current: '7 lbs lost, 3 lbs to go'
      },
      {
        id: '2',
        name: 'Run 5K in under 25 minutes',
        progress: 40,
        target: '25:00',
        current: 'Current best: 28:15'
      },
      {
        id: '3',
        name: 'Do 10 pull-ups in a row',
        progress: 60,
        target: '10',
        current: 'Current best: 6 pull-ups'
      }
    ],
    completedGoals: [
      { goal: "Work out 3 times a week for a month", date: "March 2025" },
      { goal: "Complete a 10K run", date: "February 2025" },
      { goal: "Bench press 150 lbs", date: "January 2025" },
      { goal: "Maintain food log for 30 days straight", date: "December 2024" },
      { goal: "Complete a 30-day yoga challenge", date: "November 2024" }
    ]
  });
  const [loading, setLoading] = useState(true);

  // Load profile from localStorage on mount
  useEffect(() => {
    const loadProfile = () => {
      try {
        const savedProfile = localStorage.getItem(STORAGE_KEY);
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading profile:', error);
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    }
  }, [profile, loading]);

  // Update profile data
  const updateProfile = (newData: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...newData }));
  };

  // Add a new goal
  const addGoal = (goal: { name: string; target: string; progress: number; current: string }) => {
    const newGoal = {
      id: Date.now().toString(),
      name: goal.name,
      progress: goal.progress,
      target: goal.target,
      current: goal.current
    };
    
    setProfile(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  // Update a goal's progress
  const updateGoal = (id: string, progress: number, current: string) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.map(goal => 
        goal.id === id ? { ...goal, progress, current } : goal
      )
    }));
  };

  // Complete a goal (move from active goals to completed goals)
  const completeGoal = (id: string) => {
    const goalToComplete = profile.goals.find(goal => goal.id === id);
    
    if (!goalToComplete) return;
    
    const today = new Date();
    const monthYear = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal.id !== id),
      completedGoals: [
        { goal: goalToComplete.name, date: monthYear },
        ...prev.completedGoals
      ],
      goalsCompleted: prev.goalsCompleted + 1
    }));
  };

  return {
    profile,
    loading,
    updateProfile,
    addGoal,
    updateGoal,
    completeGoal
  };
};
