
import { Meal, Workout, MealPlan } from '@/types';

// Local storage keys
const MEALS_KEY = 'fitness-app-meals';
const WORKOUTS_KEY = 'fitness-app-workouts';
const MEAL_PLANS_KEY = 'fitness-app-meal-plans';

// Meals
export const getMeals = (): Meal[] => {
  try {
    const storedMeals = localStorage.getItem(MEALS_KEY);
    if (storedMeals) {
      const parsedMeals = JSON.parse(storedMeals);
      return parsedMeals.map((meal: any) => ({
        ...meal,
        date: new Date(meal.date)
      }));
    }
    return [];
  } catch (error) {
    console.error('Error retrieving meals:', error);
    return [];
  }
};

export const saveMeal = (meal: Meal): void => {
  try {
    const currentMeals = getMeals();
    const newMeals = [...currentMeals, meal];
    localStorage.setItem(MEALS_KEY, JSON.stringify(newMeals));
  } catch (error) {
    console.error('Error saving meal:', error);
  }
};

export const getMealsByDate = (date: Date): Meal[] => {
  const meals = getMeals();
  return meals.filter(meal => 
    meal.date.toDateString() === date.toDateString()
  );
};

// Workouts
export const getWorkouts = (): Workout[] => {
  try {
    const storedWorkouts = localStorage.getItem(WORKOUTS_KEY);
    if (storedWorkouts) {
      const parsedWorkouts = JSON.parse(storedWorkouts);
      return parsedWorkouts.map((workout: any) => ({
        ...workout,
        date: new Date(workout.date)
      }));
    }
    return [];
  } catch (error) {
    console.error('Error retrieving workouts:', error);
    return [];
  }
};

export const saveWorkout = (workout: Workout): void => {
  try {
    const currentWorkouts = getWorkouts();
    const newWorkouts = [...currentWorkouts, workout];
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(newWorkouts));
  } catch (error) {
    console.error('Error saving workout:', error);
  }
};

export const getRecentWorkouts = (limit = 3): Workout[] => {
  const workouts = getWorkouts();
  return workouts
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
};

// Filter workouts
export const filterWorkouts = (
  workouts: Workout[],
  types: string[] = [],
  durations: string[] = [],
  sortBy: string = 'recent'
): Workout[] => {
  let filtered = [...workouts];
  
  // Filter by type
  if (types.length > 0) {
    filtered = filtered.filter(workout => types.includes(workout.type));
  }
  
  // Filter by duration
  if (durations.length > 0) {
    filtered = filtered.filter(workout => {
      if (durations.includes('< 15 min')) {
        if (workout.duration < 15) return true;
      }
      if (durations.includes('15-30 min')) {
        if (workout.duration >= 15 && workout.duration <= 30) return true;
      }
      if (durations.includes('30-60 min')) {
        if (workout.duration > 30 && workout.duration <= 60) return true;
      }
      if (durations.includes('> 60 min')) {
        if (workout.duration > 60) return true;
      }
      return false;
    });
  }
  
  // Sort
  switch(sortBy) {
    case 'oldest':
      filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
      break;
    case 'duration-shortest':
      filtered.sort((a, b) => a.duration - b.duration);
      break;
    case 'duration-longest':
      filtered.sort((a, b) => b.duration - a.duration);
      break;
    case 'recent':
    default:
      filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
      break;
  }
  
  return filtered;
};

// Meal Plans
export const getMealPlans = (): MealPlan[] => {
  try {
    const storedPlans = localStorage.getItem(MEAL_PLANS_KEY);
    if (storedPlans) {
      return JSON.parse(storedPlans);
    }
    return [];
  } catch (error) {
    console.error('Error retrieving meal plans:', error);
    return [];
  }
};

export const saveMealPlan = (plan: MealPlan): void => {
  try {
    const currentPlans = getMealPlans();
    const newPlans = [...currentPlans, plan];
    localStorage.setItem(MEAL_PLANS_KEY, JSON.stringify(newPlans));
  } catch (error) {
    console.error('Error saving meal plan:', error);
  }
};
