
export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface Workout {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility';
  duration: number; // in minutes
  calories: number;
  date: Date;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number; // in minutes
  distance?: number; // in km or miles
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: Date;
  items: FoodItem[];
}

export interface FoodItem {
  id: string;
  name: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Progress {
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

export interface DailyStats {
  caloriesBurned: number;
  caloriesConsumed: number;
  workoutMinutes: number;
  waterIntake: number;
  stepsCount: number;
}
