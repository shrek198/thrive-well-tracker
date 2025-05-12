
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import { Progress } from '@/types';

interface MeasurementTableProps {
  measurements: Progress[];
  type: 'weight' | 'bodyFat' | 'measurements';
}

const MeasurementTable: React.FC<MeasurementTableProps> = ({ measurements, type }) => {
  // Sort measurements by date (newest first)
  const sortedMeasurements = [...measurements]
    .filter(m => {
      if (type === 'weight') return m.weight !== undefined;
      if (type === 'bodyFat') return m.bodyFat !== undefined;
      if (type === 'measurements') return m.measurements !== undefined;
      return false;
    })
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
            <TableHead>Date</TableHead>
            {type === 'weight' && <TableHead>Weight</TableHead>}
            {type === 'bodyFat' && <TableHead>Body Fat %</TableHead>}
            {type === 'measurements' && (
              <>
                <TableHead>Chest</TableHead>
                <TableHead>Waist</TableHead>
                <TableHead>Hips</TableHead>
                <TableHead>Biceps</TableHead>
                <TableHead>Thighs</TableHead>
              </>
            )}
            <TableHead>Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMeasurements.map((measurement, index) => {
            // Calculate change from previous measurement
            const prevMeasurement = sortedMeasurements[index + 1];
            let change: number | undefined;
            let changeFormatted = '';
            let isPositive = false;
            
            if (type === 'weight' && prevMeasurement?.weight && measurement.weight) {
              change = measurement.weight - prevMeasurement.weight;
              isPositive = change > 0;
              changeFormatted = `${change > 0 ? '+' : ''}${change.toFixed(1)} lbs`;
            } else if (type === 'bodyFat' && prevMeasurement?.bodyFat && measurement.bodyFat) {
              change = measurement.bodyFat - prevMeasurement.bodyFat;
              isPositive = change > 0;
              changeFormatted = `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
            }
            
            return (
              <TableRow key={measurement.date.toString()}>
                <TableCell>{format(new Date(measurement.date), 'MMM d, yyyy')}</TableCell>
                
                {type === 'weight' && (
                  <TableCell>{measurement.weight} lbs</TableCell>
                )}
                
                {type === 'bodyFat' && (
                  <TableCell>{measurement.bodyFat}%</TableCell>
                )}
                
                {type === 'measurements' && (
                  <>
                    <TableCell>{measurement.measurements?.chest || '-'} in</TableCell>
                    <TableCell>{measurement.measurements?.waist || '-'} in</TableCell>
                    <TableCell>{measurement.measurements?.hips || '-'} in</TableCell>
                    <TableCell>{measurement.measurements?.biceps || '-'} in</TableCell>
                    <TableCell>{measurement.measurements?.thighs || '-'} in</TableCell>
                  </>
                )}
                
                <TableCell className={
                  change === undefined ? 'text-muted-foreground' :
                  (type === 'weight' || type === 'bodyFat') ? 
                    (isPositive ? 'text-red-500' : 'text-green-500') : 
                    'text-blue-500'
                }>
                  {change === undefined ? '-' : changeFormatted}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MeasurementTable;
