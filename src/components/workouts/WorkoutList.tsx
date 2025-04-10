
import React from 'react';
import WorkoutCard, { WorkoutType } from './WorkoutCard';

interface WorkoutListProps {
  workouts: WorkoutType[];
  emptyMessage?: string;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ 
  workouts, 
  emptyMessage = "Nenhum treino encontrado" 
}) => {
  if (workouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg text-gray-500 mb-4">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
};

export default WorkoutList;
