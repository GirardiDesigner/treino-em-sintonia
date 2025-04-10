
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, ChevronRight, Dumbbell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface WorkoutType {
  id: string;
  title: string;
  description: string;
  exercises: number;
  createdAt: string;
  type: string;
}

interface WorkoutCardProps {
  workout: WorkoutType;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const navigate = useNavigate();

  return (
    <Card className="h-full hover:shadow-md transition-all">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-gym-purple">{workout.title}</CardTitle>
            <CardDescription className="mt-1">
              <Badge variant="outline" className="mr-2">{workout.type}</Badge>
              <span className="text-sm flex items-center mt-2">
                <CalendarDays className="h-4 w-4 mr-1" />
                {new Date(workout.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </CardDescription>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            <Dumbbell className="h-5 w-5 text-gym-purple" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">{workout.description}</p>
        <div className="mt-3 flex items-center">
          <span className="text-sm font-medium">{workout.exercises} exercícios</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full justify-between text-gym-purple hover:text-gym-purple hover:bg-primary/10"
          onClick={() => navigate(`/workout/${workout.id}`)}
        >
          Ver detalhes
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
