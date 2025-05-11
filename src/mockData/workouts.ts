
import { Workout } from '@/types';

export const workoutData: Workout[] = [
  {
    id: '1',
    name: 'Upper Body Strength',
    type: 'strength',
    duration: 45,
    calories: 320,
    date: new Date(2023, 5, 20),
    exercises: [
      {
        id: '101',
        name: 'Bench Press',
        sets: 3,
        reps: 10,
        weight: 135,
      },
      {
        id: '102',
        name: 'Shoulder Press',
        sets: 3,
        reps: 12,
        weight: 65,
      },
      {
        id: '103',
        name: 'Lat Pulldown',
        sets: 3,
        reps: 12,
        weight: 120,
      },
      {
        id: '104',
        name: 'Bicep Curls',
        sets: 3,
        reps: 15,
        weight: 30,
      },
    ],
  },
  {
    id: '2',
    name: 'Morning Run',
    type: 'cardio',
    duration: 30,
    calories: 280,
    date: new Date(2023, 5, 19),
    exercises: [
      {
        id: '201',
        name: 'Outdoor Run',
        duration: 30,
        distance: 3.5,
      },
    ],
  },
  {
    id: '3',
    name: 'Full Body HIIT',
    type: 'strength',
    duration: 25,
    calories: 240,
    date: new Date(2023, 5, 17),
    exercises: [
      {
        id: '301',
        name: 'Burpees',
        sets: 3,
        reps: 15,
      },
      {
        id: '302',
        name: 'Mountain Climbers',
        sets: 3,
        reps: 20,
      },
      {
        id: '303',
        name: 'Push-ups',
        sets: 3,
        reps: 12,
      },
      {
        id: '304',
        name: 'Bodyweight Squats',
        sets: 3,
        reps: 20,
      },
    ],
  },
];
