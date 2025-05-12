
import { useState, useEffect } from 'react';
import { Progress } from '@/types';

const STORAGE_KEY = 'fitness-app-measurements';

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
  const addMeasurement = (measurement: Progress) => {
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
  const getMeasurementsByType = (type: keyof Progress) => {
    return measurements
      .filter(m => m[type] !== undefined)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  return {
    measurements,
    loading,
    addMeasurement,
    getMeasurementsByType
  };
};
