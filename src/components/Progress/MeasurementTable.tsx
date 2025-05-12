
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import { Progress } from '@/types';

interface MeasurementTableProps {
  data: Progress[];
  columns: string[];
}

const MeasurementTable: React.FC<MeasurementTableProps> = ({ data, columns }) => {
  // Sort measurements by date (newest first)
  const sortedMeasurements = [...data]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (sortedMeasurements.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No measurement data available
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.includes('date') && <TableHead>Date</TableHead>}
            {columns.includes('weight') && <TableHead>Weight (kg)</TableHead>}
            {columns.includes('bodyFat') && <TableHead>Body Fat (%)</TableHead>}
            {columns.includes('chest') && <TableHead>Chest (cm)</TableHead>}
            {columns.includes('waist') && <TableHead>Waist (cm)</TableHead>}
            {columns.includes('hips') && <TableHead>Hips (cm)</TableHead>}
            {columns.includes('biceps') && <TableHead>Biceps (cm)</TableHead>}
            {columns.includes('thighs') && <TableHead>Thighs (cm)</TableHead>}
            {columns.length > 1 && <TableHead>Change</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMeasurements.map((measurement, index) => {
            // Calculate change from previous measurement
            const prevMeasurement = sortedMeasurements[index + 1];
            let change: number | undefined;
            let changeFormatted = '';
            let isPositive = false;
            
            if (columns.includes('weight') && prevMeasurement?.weight && measurement.weight) {
              change = measurement.weight - prevMeasurement.weight;
              isPositive = change > 0;
              changeFormatted = `${change > 0 ? '+' : ''}${change.toFixed(1)} kg`;
            } else if (columns.includes('bodyFat') && prevMeasurement?.bodyFat && measurement.bodyFat) {
              change = measurement.bodyFat - prevMeasurement.bodyFat;
              isPositive = change > 0;
              changeFormatted = `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
            }
            
            return (
              <TableRow key={measurement.date.toString()}>
                {columns.includes('date') && (
                  <TableCell>{format(new Date(measurement.date), 'MMM d, yyyy')}</TableCell>
                )}
                
                {columns.includes('weight') && (
                  <TableCell>{measurement.weight} kg</TableCell>
                )}
                
                {columns.includes('bodyFat') && (
                  <TableCell>{measurement.bodyFat}%</TableCell>
                )}
                
                {columns.includes('chest') && (
                  <TableCell>{measurement.measurements?.chest || '-'} cm</TableCell>
                )}
                
                {columns.includes('waist') && (
                  <TableCell>{measurement.measurements?.waist || '-'} cm</TableCell>
                )}
                
                {columns.includes('hips') && (
                  <TableCell>{measurement.measurements?.hips || '-'} cm</TableCell>
                )}
                
                {columns.includes('biceps') && (
                  <TableCell>{measurement.measurements?.biceps || '-'} cm</TableCell>
                )}
                
                {columns.includes('thighs') && (
                  <TableCell>{measurement.measurements?.thighs || '-'} cm</TableCell>
                )}
                
                {columns.length > 1 && (
                  <TableCell className={
                    change === undefined ? 'text-muted-foreground' :
                    (columns.includes('weight') || columns.includes('bodyFat')) ? 
                      (isPositive ? 'text-red-500' : 'text-green-500') : 
                      'text-blue-500'
                  }>
                    {change === undefined ? '-' : changeFormatted}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MeasurementTable;
