
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarDays, CheckCircle, PlayCircle, User, Trophy, Star, Lock, ChevronRight, Dumbbell, MoveHorizontal, Timer, RefreshCw, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock workout data with enhanced exercise instructions
const mockExercises = [
  {
    id: '1',
    name: 'Supino reto com barra',
    sets: '4',
    reps: '8-12',
    rest: '90 segundos',
    instructions: 'Deite-se no banco com os pés apoiados no chão. Segure a barra com as mãos um pouco mais abertas que a largura dos ombros, polegares envolvendo a barra. Respire fundo e abaixe a barra até tocar levemente o peito, mantendo os cotovelos em um ângulo de aproximadamente 45° em relação ao corpo. Empurre a barra para cima, estendendo os braços completamente sem travar os cotovelos.',
    videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg',
    completed: false,
    points: 10,
    muscleGroups: ['Peito', 'Tríceps', 'Ombros'],
    targetedMuscles: '/lovable-uploads/f2089c61-7b95-41f4-a9e1-f46ee0596b18.png',
    tips: [
      'Mantenha as escápulas retraídas durante todo o movimento',
      'Não deixe o quadril subir do banco durante o esforço',
      'Respire durante o movimento: inspire ao descer a barra e expire ao subir'
    ],
    commonMistakes: [
      'Quicar a barra no peito',
      'Arquear excessivamente a lombar',
      'Não completar a amplitude do movimento'
    ],
    progressions: {
      beginner: 'Supino com halteres',
      intermediate: 'Supino reto com barra',
      advanced: 'Supino com parada (1-2s no ponto mais baixo)'
    }
  },
  {
    id: '2',
    name: 'Desenvolvimento com halteres',
    sets: '3',
    reps: '10-12',
    rest: '60 segundos',
    instructions: 'Sente-se em um banco com encosto ou fique em pé com os pés na largura dos ombros. Segure um halter em cada mão na altura dos ombros, palmas voltadas para frente. Mantenha o core contraído e empurre os halteres para cima até que os braços estejam completamente estendidos acima da cabeça. Abaixe os halteres de volta à posição inicial com controle.',
    videoUrl: 'https://www.youtube.com/embed/qEwKCR5JCog',
    completed: false,
    points: 8,
    muscleGroups: ['Ombros', 'Tríceps'],
    targetedMuscles: '/lovable-uploads/7d105e25-f2c7-405c-a822-7f3367c4b5a8.png',
    tips: [
      'Mantenha o olhar fixo à frente durante o movimento',
      'Evite usar o impulso do corpo para levantar o peso',
      'Contrai os glúteos e o abdômen para estabilizar a coluna'
    ],
    commonMistakes: [
      'Arquear as costas',
      'Levantar os ombros em direção às orelhas',
      'Não completar a extensão dos braços'
    ],
    progressions: {
      beginner: 'Desenvolvimento com halteres leves',
      intermediate: 'Desenvolvimento com halteres moderados',
      advanced: 'Desenvolvimento alternado com rotação'
    }
  },
  {
    id: '3',
    name: 'Crucifixo inclinado',
    sets: '3',
    reps: '12-15',
    rest: '60 segundos',
    instructions: 'Ajuste o banco em posição inclinada (30-45°). Deite-se segurando um halter em cada mão com os braços estendidos acima do peito, cotovelos levemente flexionados e palmas das mãos viradas uma para a outra. Mantendo os cotovelos ligeiramente dobrados, abra os braços para os lados em um movimento de arco até sentir um alongamento no peito. Retorne à posição inicial contraindo os músculos peitorais.',
    videoUrl: 'https://www.youtube.com/embed/Iwe6AmxVf7o',
    completed: false,
    points: 7,
    muscleGroups: ['Peito', 'Ombros'],
    targetedMuscles: '/lovable-uploads/7d105e25-f2c7-405c-a822-7f3367c4b5a8.png',
    tips: [
      'Mantenha uma leve flexão dos cotovelos durante todo o movimento',
      'Imagine que está abraçando uma árvore ao voltar à posição inicial',
      'Foque na contração do peitoral durante todo o exercício'
    ],
    commonMistakes: [
      'Usar peso excessivo, comprometendo a execução',
      'Estender completamente os cotovelos (aumenta o risco de lesão)',
      'Reduzir a amplitude do movimento'
    ],
    progressions: {
      beginner: 'Crucifixo na máquina',
      intermediate: 'Crucifixo com halteres no banco reto',
      advanced: 'Crucifixo inclinado com pausa na posição esticada'
    }
  },
  {
    id: '4',
    name: 'Tríceps corda',
    sets: '4',
    reps: '12-15',
    rest: '60 segundos',
    instructions: 'Posicione-se em frente ao aparelho com o cabo e acessório de corda. Segure as extremidades da corda com as palmas das mãos voltadas uma para a outra. Mantenha os cotovelos junto ao corpo, perto das costelas. Estenda os antebraços para baixo, separando levemente as extremidades da corda no final do movimento. Retorne lentamente à posição inicial, sem mover os cotovelos.',
    videoUrl: 'https://www.youtube.com/embed/kiuVA7QMNKY',
    completed: false,
    points: 6,
    muscleGroups: ['Tríceps'],
    targetedMuscles: '/lovable-uploads/1e83adc3-fbfb-4367-b888-3480d540e37e.png',
    tips: [
      'Mantenha os cotovelos próximos ao corpo durante todo o exercício',
      'Estenda completamente os braços para máxima contração do tríceps',
      'Abra levemente as pontas da corda ao final do movimento para maior ativação'
    ],
    commonMistakes: [
      'Afastar os cotovelos do corpo',
      'Usar momentum balançando o corpo',
      'Não completar a extensão dos braços'
    ],
    progressions: {
      beginner: 'Extensão de tríceps com elástico',
      intermediate: 'Tríceps corda com peso moderado',
      advanced: 'Tríceps corda com pausa e contração isométrica'
    }
  },
  {
    id: '5',
    name: 'Elevação lateral',
    sets: '3',
    reps: '12-15',
    rest: '45 segundos',
    instructions: 'Fique em pé com os pés na largura dos ombros, segurando um halter em cada mão ao lado do corpo, palmas voltadas para dentro. Mantenha os cotovelos levemente flexionados. Levante os braços lateralmente até a altura dos ombros, formando uma linha reta com os braços paralelos ao chão. Controle o movimento na descida, voltando à posição inicial sem balançar o corpo.',
    videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo',
    completed: false,
    points: 5,
    muscleGroups: ['Ombros'],
    targetedMuscles: '/lovable-uploads/52ae9895-6505-41fa-9c62-d9435e10dea9.png',
    tips: [
      'Imagine que está derramando água de uma jarra com os polegares levemente apontados para baixo',
      'Mantenha o core engajado para evitar compensações',
      'Use pesos adequados para manter a técnica perfeita'
    ],
    commonMistakes: [
      'Elevar os ombros em direção às orelhas',
      'Usar impulso do corpo para auxiliar o movimento',
      'Levantar os braços acima da linha dos ombros'
    ],
    progressions: {
      beginner: 'Elevação lateral com elástico',
      intermediate: 'Elevação lateral com halteres',
      advanced: 'Elevação lateral com pausa isométrica no topo'
    }
  },
  {
    id: '6',
    name: 'Tríceps francês',
    sets: '3',
    reps: '10-12',
    rest: '60 segundos',
    instructions: 'Sente-se em um banco com encosto ou fique em pé com os pés na largura dos ombros. Segure um halter com as duas mãos e estenda os braços acima da cabeça. Mantendo os braços próximos às orelhas e os cotovelos apontados para frente, flexione os cotovelos para baixar o halter até a nuca. Estenda os cotovelos para retornar à posição inicial, concentrando-se na contração do tríceps.',
    videoUrl: 'https://www.youtube.com/embed/kYbJSLyCFZg',
    completed: false,
    points: 9,
    muscleGroups: ['Tríceps'],
    targetedMuscles: '/lovable-uploads/1e83adc3-fbfb-4367-b888-3480d540e37e.png',
    tips: [
      'Mantenha os cotovelos apontados para frente durante todo o movimento',
      'Estabilize os ombros para isolar melhor o tríceps',
      'Controle a fase excêntrica (descida) para maior desenvolvimento muscular'
    ],
    commonMistakes: [
      'Deixar os cotovelos se abrirem para os lados',
      'Usar impulso para levantar o peso',
      'Mover os ombros em vez de isolar o movimento nos cotovelos'
    ],
    progressions: {
      beginner: 'Tríceps francês com elástico',
      intermediate: 'Tríceps francês com halter',
      advanced: 'Tríceps francês unilateral com rotação'
    }
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
                <Button className="md:self-start bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" onClick={startTraining}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Iniciar Treino
                </Button>
              )}
            </div>
            
            <Card className="mb-8 bg-gradient-to-br from-black to-gray-900 text-white border-0">
              <CardContent className="pt-6">
                <p className="text-gray-300 mb-6">{mockWorkout.description}</p>
                
                <div className="flex flex-col md:flex-row gap-6 md:items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 p-2 rounded-full">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Professor</p>
                      <p className="font-medium text-white">{mockWorkout.trainer.name}</p>
                    </div>
                  </div>
                  
                  {user?.role === 'student' && (
                    <>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Progresso</p>
                        <div className="flex items-center gap-3">
                          <Progress value={progress} className="w-40 bg-gray-700" />
                          <span className="text-sm font-medium text-white">{completedCount}/{exercises.length}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-500/20 p-2 rounded-full">
                          <Trophy className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Pontos</p>
                          <p className="font-medium text-white">{earnedPoints}/{mockWorkout.totalPoints}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold text-gym-purple mb-6">Exercícios</h2>
          
          <div className="space-y-6">
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
                  <Tabs defaultValue="info" className="mt-2">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="info">Informações</TabsTrigger>
                      <TabsTrigger value="technique">Técnica</TabsTrigger>
                      <TabsTrigger value="video">Vídeo</TabsTrigger>
                      <TabsTrigger value="muscles">Músculos</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="info" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <RefreshCw className="h-5 w-5 text-gym-purple" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Séries</p>
                            <p className="font-medium">{exercise.sets}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <MoveHorizontal className="h-5 w-5 text-gym-purple" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Repetições</p>
                            <p className="font-medium">{exercise.reps}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Timer className="h-5 w-5 text-gym-purple" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Descanso</p>
                            <p className="font-medium">{exercise.rest}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Grupos musculares</p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.muscleGroups.map((muscle, idx) => (
                            <Badge key={idx} variant="outline" className="bg-primary/5">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="technique" className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Instruções</p>
                        <p className="text-sm">{exercise.instructions}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Dicas importantes</p>
                        <ul className="text-sm space-y-2">
                          {exercise.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="mt-1 text-green-500">
                                <CheckCircle className="h-4 w-4" />
                              </div>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Erros comuns</p>
                        <ul className="text-sm space-y-2">
                          {exercise.commonMistakes.map((mistake, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="mt-1 text-red-500">
                                <span className="inline-block size-4 text-center font-bold">✗</span>
                              </div>
                              <span>{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Progressões</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-xs text-gray-500">Iniciante</p>
                            <p className="text-sm">{exercise.progressions.beginner}</p>
                          </div>
                          <div className="bg-primary/5 p-3 rounded-md">
                            <p className="text-xs text-gray-500">Intermediário</p>
                            <p className="text-sm">{exercise.progressions.intermediate}</p>
                          </div>
                          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-3 rounded-md">
                            <p className="text-xs text-gray-500">Avançado</p>
                            <p className="text-sm">{exercise.progressions.advanced}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="video">
                      <div className="aspect-video rounded-md overflow-hidden">
                        <iframe 
                          src={exercise.videoUrl} 
                          title={exercise.name}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="muscles">
                      <div className="flex flex-col items-center">
                        <p className="text-sm text-gray-500 mb-4">Músculos trabalhados</p>
                        <div className="mb-4">
                          <img 
                            src={exercise.targetedMuscles} 
                            alt="Músculos trabalhados" 
                            className="max-h-60 object-contain rounded-md"
                          />
                        </div>
                        <div className="text-sm text-center">
                          <p>Este exercício foca principalmente nos músculos: <span className="font-medium">{exercise.muscleGroups.join(', ')}</span></p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
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
                    <Tabs defaultValue="video" className="mt-2">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="video">Vídeo</TabsTrigger>
                        <TabsTrigger value="info">Informações</TabsTrigger>
                        <TabsTrigger value="technique">Técnica</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="video">
                        <div className="aspect-video rounded-md overflow-hidden mb-4">
                          <iframe 
                            src={exercise.videoUrl} 
                            title={exercise.name}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="info" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <RefreshCw className="h-5 w-5 text-gym-purple" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Séries</p>
                              <p className="font-medium">{exercise.sets}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <MoveHorizontal className="h-5 w-5 text-gym-purple" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Repetições</p>
                              <p className="font-medium">{exercise.reps}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Timer className="h-5 w-5 text-gym-purple" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Descanso</p>
                              <p className="font-medium">{exercise.rest}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Grupos musculares</p>
                          <div className="flex flex-wrap gap-2">
                            {exercise.muscleGroups.map((muscle, idx) => (
                              <Badge key={idx} variant="outline" className="bg-primary/5">
                                {muscle}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <img 
                            src={exercise.targetedMuscles} 
                            alt="Músculos trabalhados" 
                            className="max-h-60 mx-auto object-contain rounded-md"
                          />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="technique" className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Instruções</p>
                          <p className="text-sm">{exercise.instructions}</p>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Dicas importantes</p>
                          <ul className="text-sm space-y-2">
                            {exercise.tips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="mt-1 text-green-500">
                                  <CheckCircle className="h-4 w-4" />
                                </div>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Evite estes erros</p>
                          <ul className="text-sm space-y-2">
                            {exercise.commonMistakes.map((mistake, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="mt-1 text-red-500">
                                  <span className="inline-block size-4 text-center font-bold">✗</span>
                                </div>
                                <span>{mistake}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="flex justify-between mt-6">
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
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
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
