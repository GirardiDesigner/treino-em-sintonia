
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarDays, CheckCircle, PlayCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

// Mock workout data
const mockExercises = [
  {
    id: '1',
    name: 'Supino reto com barra',
    sets: '4',
    reps: '8-12',
    rest: '90 segundos',
    instructions: 'Mantenha os cotovelos em ângulo de 45°, escápulas retraídas e pés apoiados no chão.',
    completed: false,
  },
  {
    id: '2',
    name: 'Desenvolvimento com halteres',
    sets: '3',
    reps: '10-12',
    rest: '60 segundos',
    instructions: 'Mantenha o core contraído, não arquee a lombar.',
    completed: false,
  },
  {
    id: '3',
    name: 'Crucifixo inclinado',
    sets: '3',
    reps: '12-15',
    rest: '60 segundos',
    instructions: 'Mantenha uma leve flexão dos cotovelos durante todo o movimento.',
    completed: false,
  },
  {
    id: '4',
    name: 'Tríceps corda',
    sets: '4',
    reps: '12-15',
    rest: '60 segundos',
    instructions: 'Mantenha os cotovelos próximos ao corpo, estenda completamente os braços.',
    completed: false,
  },
  {
    id: '5',
    name: 'Elevação lateral',
    sets: '3',
    reps: '12-15',
    rest: '45 segundos',
    instructions: 'Eleve os braços até a altura dos ombros, mantenha uma leve flexão dos cotovelos.',
    completed: false,
  },
  {
    id: '6',
    name: 'Tríceps francês',
    sets: '3',
    reps: '10-12',
    rest: '60 segundos',
    instructions: 'Mantenha os cotovelos apontados para cima, não deixe que se movam durante o exercício.',
    completed: false,
  },
];

const mockWorkout = {
  id: '1',
  title: 'Treino A - Superior',
  description: 'Foco em peito, ombros e tríceps para hipertrofia. Realize este treino 2x por semana, com pelo menos 48h de descanso entre as sessões.',
  type: 'Hipertrofia',
  createdAt: '2025-04-05',
  trainer: {
    name: 'João Treinador',
    email: 'joao.treinador@email.com',
  },
  exercises: mockExercises,
};

const WorkoutDetails = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [exercises, setExercises] = useState(mockExercises);
  
  const handleToggleExercise = (id: string) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ));
  };
  
  const completedCount = exercises.filter(ex => ex.completed).length;
  const progress = (completedCount / exercises.length) * 100;

  return (
    <PageContainer>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate(user?.role === 'trainer' ? '/trainer-dashboard' : '/student-dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gym-purple mb-2">{mockWorkout.title}</h1>
            <div className="flex items-center gap-3 text-gray-600">
              <Badge variant="outline">{mockWorkout.type}</Badge>
              <div className="flex items-center text-sm">
                <CalendarDays className="h-4 w-4 mr-1" />
                {new Date(mockWorkout.createdAt).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
          
          {user?.role === 'student' && (
            <Button className="md:self-start">
              <PlayCircle className="mr-2 h-4 w-4" />
              Iniciar Treino
            </Button>
          )}
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-gray-700 mb-6">{mockWorkout.description}</p>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-5 w-5 text-gym-purple" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Professor</p>
                  <p className="font-medium">{mockWorkout.trainer.name}</p>
                </div>
              </div>
              
              {user?.role === 'student' && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Progresso</p>
                  <div className="flex items-center gap-3">
                    <Progress value={progress} className="w-40" />
                    <span className="text-sm font-medium">{completedCount}/{exercises.length}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-2xl font-semibold text-gym-purple mb-6">Exercícios</h2>
      
      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <Card key={exercise.id} className={`border-l-4 ${exercise.completed ? 'border-l-green-500' : 'border-l-gym-purple'}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  {user?.role === 'student' && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`${exercise.completed ? 'text-green-500' : 'text-gray-400'}`}
                      onClick={() => handleToggleExercise(exercise.id)}
                    >
                      <CheckCircle className="h-6 w-6" />
                    </Button>
                  )}
                  <div>
                    <CardTitle className="text-xl">
                      {index + 1}. {exercise.name}
                    </CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Séries</p>
                  <p className="font-medium">{exercise.sets}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Repetições</p>
                  <p className="font-medium">{exercise.reps}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Descanso</p>
                  <p className="font-medium">{exercise.rest}</p>
                </div>
              </div>
              
              {exercise.instructions && (
                <>
                  <Separator className="my-3" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Instruções</p>
                    <p className="text-sm">{exercise.instructions}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default WorkoutDetails;
