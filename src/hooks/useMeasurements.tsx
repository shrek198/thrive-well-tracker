
import { useState, useEffect } from 'react';
import { Progress } from '@/types';

const STORAGE_KEY = 'fitness-app-measurements';

// Generate sample data for the first use
const generateSampleData = (): Progress[] => {
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  
  return [
    {
      date: now,
      weight: 78.5,
      bodyFat: 18.2,
      measurements: {
        chest: 105,
        waist: 85,
        hips: 98,
        biceps: 36,
        thighs: 58
      },
      photos: ['https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1740&auto=format&fit=crop&w=300&h=300']
    },
    {
      date: new Date(now.getTime() - (oneDay * 7)),
      weight: 79.2,
      bodyFat: 18.6,
      measurements: {
        chest: 104,
        waist: 86,
        hips: 99,
        biceps: 35,
        thighs: 58
      }
    },
    {
      date: new Date(now.getTime() - (oneDay * 14)),
      weight: 79.8,
      bodyFat: 19.1,
      measurements: {
        chest: 104,
        waist: 87,
        hips: 100,
        biceps: 34,
        thighs: 57
      }
    },
    {
      date: new Date(now.getTime() - (oneDay * 21)),
      weight: 80.5,
      bodyFat: 19.5,
      measurements: {
        chest: 103,
        waist: 88,
        hips: 101,
        biceps: 34,
        thighs: 57
      }
    },
    {
      date: new Date(now.getTime() - (oneDay * 28)),
      weight: 81.2,
      bodyFat: 20.1,
      measurements: {
        chest: 102,
        waist: 89,
        hips: 101,
        biceps: 33,
        thighs: 56
      }
    }
  ];
};

export const useMeasurements = () => {
  const [measurements, setMeasurements] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  // Load measurements from localStorage on component mount
  useEffect(() => {
    const loadMeasurements = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          
          // Convert string dates back to Date objects
          const formattedData = parsedData.map((item: any) => ({
            ...item,
            date: new Date(item.date)
          }));
          
          setMeasurements(formattedData);
        } else {
          // If no measurements exist, create sample data
          const sampleData = generateSampleData();
          setMeasurements(sampleData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
        }
      } catch (error) {
        console.error('Error loading measurements:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMeasurements();
  }, []);

  // Add a new measurement
  const addMeasurement = (measurement: Progress): void => {
    const newMeasurements = [...measurements, measurement];
    setMeasurements(newMeasurements);
    
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMeasurements));
    } catch (error) {
      console.error('Error saving measurements:', error);
    }
  };

  // Get measurements filtered by type (weight, bodyFat, etc.)
  const getMeasurementsByType = (type: keyof Progress): Progress[] => {
    return measurements
      .filter(m => {
        if (type === 'measurements') {
          return m.measurements !== undefined;
        } else if (type === 'photos') {
          return m.photos !== undefined && m.photos.length > 0;
        } else {
          return m[type] !== undefined;
        }
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Get all measurements
  const getAllMeasurements = (): Progress[] => {
    return [...measurements].sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  // Delete a measurement
  const deleteMeasurement = (id: string): void => {
    // Our Progress type doesn't have an id, but we can add one for deletion logic
    // For now, we'll use the date as a unique identifier
    const updatedMeasurements = measurements.filter(
      m => m.date.getTime().toString() !== id
    );
    
    setMeasurements(updatedMeasurements);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMeasurements));
  };

  return {
    measurements,
    loading,
    addMeasurement,
    getMeasurementsByType,
    getAllMeasurements,
    deleteMeasurement
  };
};
