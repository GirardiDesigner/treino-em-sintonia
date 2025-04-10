
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarDays, CheckCircle, PlayCircle, User, Trophy, Star, Lock, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

// Mock workout data with videos added
const mockExercises = [
  {
    id: '1',
    name: 'Supino reto com barra',
    sets: '4',
    reps: '8-12',
    rest: '90 segundos',
    instructions: 'Mantenha os cotovelos em ângulo de 45°, escápulas retraídas e pés apoiados no chão.',
    videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg',
    completed: false,
    points: 10,
  },
  {
    id: '2',
    name: 'Desenvolvimento com halteres',
    sets: '3',
    reps: '10-12',
    rest: '60 segundos',
    instructions: 'Mantenha o core contraído, não arquee a lombar.',
    videoUrl: 'https://www.youtube.com/embed/qEwKCR5JCog',
    completed: false,
    points: 8,
  },
  {
    id: '3',
    name: 'Crucifixo inclinado',
    sets: '3',
    reps: '12-15',
    rest: '60 segundos',
    instructions: 'Mantenha uma leve flexão dos cotovelos durante todo o movimento.',
    videoUrl: 'https://www.youtube.com/embed/Iwe6AmxVf7o',
    completed: false,
    points: 7,
  },
  {
    id: '4',
    name: 'Tríceps corda',
    sets: '4',
    reps: '12-15',
    rest: '60 segundos',
    instructions: 'Mantenha os cotovelos próximos ao corpo, estenda completamente os braços.',
    videoUrl: 'https://www.youtube.com/embed/kiuVA7QMNKY',
    completed: false,
    points: 6,
  },
  {
    id: '5',
    name: 'Elevação lateral',
    sets: '3',
    reps: '12-15',
    rest: '45 segundos',
    instructions: 'Eleve os braços até a altura dos ombros, mantenha uma leve flexão dos cotovelos.',
    videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo',
    completed: false,
    points: 5,
  },
  {
    id: '6',
    name: 'Tríceps francês',
    sets: '3',
    reps: '10-12',
    rest: '60 segundos',
    instructions: 'Mantenha os cotovelos apontados para cima, não deixe que se movam durante o exercício.',
    videoUrl: 'https://www.youtube.com/embed/kYbJSLyCFZg',
    completed: false,
    points: 9,
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
  totalPoints: mockExercises.reduce((acc, ex) => acc + ex.points, 0),
};

const WorkoutDetails = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [exercises, setExercises] = useState(mockExercises);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [isTrainingMode, setIsTrainingMode] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Calculate progress
  const completedCount = exercises.filter(ex => ex.completed).length;
  const progress = (completedCount / exercises.length) * 100;
  
  // Handle exercise completion
  const handleCompleteExercise = (id: string) => {
    const updatedExercises = exercises.map(ex => {
      if (ex.id === id && !ex.completed) {
        // Add points when exercise is completed
        setEarnedPoints(prev => prev + ex.points);
        
        // Show toast with points earned
        toast({
          title: "Exercício concluído!",
          description: `Você ganhou ${ex.points} pontos!`,
          variant: "default",
        });
        
        // Show confetti effect
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        
        return { ...ex, completed: true };
      }
      return ex;
    });
    
    setExercises(updatedExercises);
    
    // Move to next exercise if in training mode
    const currentIndex = exercises.findIndex(ex => ex.id === id);
    if (currentIndex < exercises.length - 1) {
      setActiveExerciseIndex(currentIndex + 1);
    } else if (currentIndex === exercises.length - 1) {
      // Workout completed
      toast({
        title: "Treino concluído!",
        description: `Parabéns! Você completou o treino e ganhou ${earnedPoints} pontos no total!`,
        variant: "default",
      });
      
      setIsTrainingMode(false);
    }
  };
  
  // Start workout training mode
  const startTraining = () => {
    setIsTrainingMode(true);
    setActiveExerciseIndex(0);
    
    // Reset exercise completion if starting fresh
    if (completedCount === exercises.length) {
      setExercises(exercises.map(ex => ({ ...ex, completed: false })));
      setEarnedPoints(0);
    }
    
    toast({
      title: "Treino iniciado!",
      description: "Complete cada exercício na sequência para ganhar pontos.",
      variant: "default",
    });
  };

  // Check if an exercise can be completed (sequential completion)
  const canCompleteExercise = (index: number) => {
    if (index === 0) return true;
    return exercises[index - 1].completed;
  };

  return (
    <PageContainer>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl animate-bounce">🎉</div>
          </div>
        </div>
      )}
      
      {!isTrainingMode ? (
        <>
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
                <Button className="md:self-start" onClick={startTraining}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Iniciar Treino
                </Button>
              )}
            </div>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-6">{mockWorkout.description}</p>
                
                <div className="flex flex-col md:flex-row gap-6 md:items-center">
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
                    <>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Progresso</p>
                        <div className="flex items-center gap-3">
                          <Progress value={progress} className="w-40" />
                          <span className="text-sm font-medium">{completedCount}/{exercises.length}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 p-2 rounded-full">
                          <Trophy className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Pontos</p>
                          <p className="font-medium">{earnedPoints}/{mockWorkout.totalPoints}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold text-gym-purple mb-6">Exercícios</h2>
          
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <Card 
                key={exercise.id} 
                className={`border-l-4 ${exercise.completed ? 'border-l-green-500' : 'border-l-gym-purple'}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      {user?.role === 'student' && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`${exercise.completed ? 'text-green-500' : canCompleteExercise(index) ? 'text-gray-400' : 'text-gray-300'}`}
                          onClick={() => canCompleteExercise(index) && handleCompleteExercise(exercise.id)}
                          disabled={!canCompleteExercise(index) || exercise.completed}
                        >
                          {!canCompleteExercise(index) && !exercise.completed ? (
                            <Lock className="h-6 w-6" />
                          ) : (
                            <CheckCircle className="h-6 w-6" />
                          )}
                        </Button>
                      )}
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          {index + 1}. {exercise.name}
                          <div className="ml-2 flex items-center">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm ml-1">{exercise.points} pts</span>
                          </div>
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
                  
                  {exercise.videoUrl && (
                    <>
                      <Separator className="my-3" />
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Vídeo demonstrativo</p>
                        <div className="aspect-video rounded-md overflow-hidden">
                          <iframe 
                            src={exercise.videoUrl} 
                            title={exercise.name}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="pt-4">
          <div className="flex justify-between items-center mb-8">
            <Button variant="ghost" onClick={() => setIsTrainingMode(false)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao treino
            </Button>
            
            <div className="flex items-center">
              <Badge variant="outline" className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span>{earnedPoints} pts</span>
              </Badge>
            </div>
          </div>
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gym-purple mb-4">{mockWorkout.title} - Modo treino</h1>
            <Progress value={progress} className="w-full h-2 mb-2" />
            <p className="text-sm text-gray-500 text-right">{completedCount}/{exercises.length} exercícios</p>
          </div>
          
          {exercises.map((exercise, index) => {
            const isActive = index === activeExerciseIndex;
            const isLocked = !canCompleteExercise(index) && !exercise.completed;
            
            return (
              <div key={exercise.id} className={`mb-4 ${isActive ? 'block' : 'hidden'}`}>
                <Card className={`border-l-4 ${exercise.completed ? 'border-l-green-500' : isActive ? 'border-l-gym-purple' : 'border-l-gray-300'}`}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl flex items-center">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-gym-purple flex items-center justify-center mr-3">
                          {index + 1}
                        </span>
                        {exercise.name}
                        <div className="ml-2 flex items-center">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm ml-1">{exercise.points} pts</span>
                        </div>
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-6">
                      <div className="aspect-video rounded-md overflow-hidden mb-4">
                        <iframe 
                          src={exercise.videoUrl} 
                          title={exercise.name}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      
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
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-1">Instruções</p>
                          <p className="text-sm">{exercise.instructions}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      {index > 0 && (
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveExerciseIndex(index - 1)}
                        >
                          Exercício anterior
                        </Button>
                      )}
                      
                      <div className="ml-auto flex gap-2">
                        {!exercise.completed && (
                          <Button 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleCompleteExercise(exercise.id)}
                          >
                            Concluir exercício
                            <CheckCircle className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                        
                        {exercise.completed && index < exercises.length - 1 && (
                          <Button 
                            onClick={() => setActiveExerciseIndex(index + 1)}
                          >
                            Próximo exercício
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        )}
                        
                        {exercise.completed && index === exercises.length - 1 && (
                          <Button 
                            onClick={() => setIsTrainingMode(false)}
                          >
                            Finalizar treino
                            <Trophy className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
};

export default WorkoutDetails;
