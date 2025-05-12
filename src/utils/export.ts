
import { Progress } from '@/types';
import { format } from 'date-fns';

export const exportMeasurements = (measurements: Progress[], type: string): string => {
  // Create headers
  let headers = ['Date'];
  if (type === 'weight') {
    headers.push('Weight (kg)');
  } else if (type === 'bodyFat') {
    headers.push('Body Fat (%)');
  } else if (type === 'measurements') {
    headers.push('Chest (cm)', 'Waist (cm)', 'Hips (cm)', 'Biceps (cm)', 'Thighs (cm)');
  }
  
  // Format data
  const csvData = measurements.map(measurement => {
    const date = format(new Date(measurement.date), 'yyyy-MM-dd');
    
    if (type === 'weight' && measurement.weight) {
      return [date, measurement.weight.toString()];
    } else if (type === 'bodyFat' && measurement.bodyFat) {
      return [date, measurement.bodyFat.toString()];
    } else if (type === 'measurements' && measurement.measurements) {
      return [
        date,
        measurement.measurements.chest?.toString() || '',
        measurement.measurements.waist?.toString() || '',
        measurement.measurements.hips?.toString() || '',
        measurement.measurements.biceps?.toString() || '',
        measurement.measurements.thighs?.toString() || ''
      ];
    }
    return [];
  }).filter(row => row.length > 0);
  
  // Combine headers and data
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.join(','))
  ].join('\n');
  
  return csvContent;
};

export const downloadCSV = (data: string, filename: string): void => {
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);
  
  // Set link properties
  link.href = url;
  link.setAttribute('download', filename);
  
  // Append to the document, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
