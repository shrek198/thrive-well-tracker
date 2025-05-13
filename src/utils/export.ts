
/**
 * Export progress measurements to CSV format
 * @param data Array of progress measurements
 * @param type Type of data being exported
 * @returns CSV formatted string
 */
export const exportMeasurements = (data: any[], type: 'weight' | 'bodyFat' | 'measurements') => {
  if (!data || data.length === 0) return '';
  
  let headers: string[] = ['Date'];
  let rows: string[][] = [];
  
  // Format the date for each entry
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };
  
  // Build headers and rows based on type
  switch(type) {
    case 'weight':
      headers.push('Weight (kg)', 'Change');
      rows = data.map((entry, i) => {
        const prevEntry = i < data.length - 1 ? data[i + 1] : null;
        const change = prevEntry && entry.weight && prevEntry.weight ? 
          (entry.weight - prevEntry.weight).toFixed(1) : '';
        return [
          formatDate(entry.date),
          entry.weight?.toString() || '',
          change
        ];
      });
      break;
      
    case 'bodyFat':
      headers.push('Body Fat (%)', 'Change');
      rows = data.map((entry, i) => {
        const prevEntry = i < data.length - 1 ? data[i + 1] : null;
        const change = prevEntry && entry.bodyFat && prevEntry.bodyFat ? 
          (entry.bodyFat - prevEntry.bodyFat).toFixed(1) : '';
        return [
          formatDate(entry.date),
          entry.bodyFat?.toString() || '',
          change
        ];
      });
      break;
      
    case 'measurements':
      headers.push('Chest (cm)', 'Waist (cm)', 'Hips (cm)', 'Biceps (cm)', 'Thighs (cm)');
      rows = data.map(entry => [
        formatDate(entry.date),
        entry.measurements?.chest?.toString() || '',
        entry.measurements?.waist?.toString() || '',
        entry.measurements?.hips?.toString() || '',
        entry.measurements?.biceps?.toString() || '',
        entry.measurements?.thighs?.toString() || ''
      ]);
      break;
  }
  
  // Convert to CSV
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  return csvContent;
};

/**
 * Download data as a CSV file
 * @param csvContent CSV formatted string
 * @param filename Name of the file to download
 */
export const downloadCSV = (csvContent: string, filename: string) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Set link properties
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  // Add to document, trigger click, and clean up
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
