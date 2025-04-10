
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { WorkoutType } from '@/components/workouts/WorkoutCard';
import WorkoutList from '@/components/workouts/WorkoutList';
import { CalendarDays, User, Users, Trophy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import GamificationCard from '@/components/gamification/GamificationCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CommunitySection from '@/components/community/CommunitySection';
import ChallengesList from '@/components/community/ChallengesList';
import { Badge } from '@/components/ui/badge';

// Mock workout data
const mockWorkouts: WorkoutType[] = [
  {
    id: '1',
    title: 'Treino A - Superior',
    description: 'Foco em peito, ombros e tríceps para hipertrofia',
    exercises: 6,
    createdAt: '2025-04-05',
    type: 'Hipertrofia',
  },
  {
    id: '2',
    title: 'Treino B - Inferior',
    description: 'Foco em quadríceps, posterior e panturrilhas',
    exercises: 5,
    createdAt: '2025-04-05',
    type: 'Força',
  },
  {
    id: '3',
    title: 'Treino C - Costas e Bíceps',
    description: 'Foco em desenvolver largura e espessura da costas',
    exercises: 7,
    createdAt: '2025-04-06',
    type: 'Hipertrofia',
  },
];

// Mock gamification data
const mockAchievements = [
  {
    id: '1',
    title: 'Primeiro Treino',
    description: 'Completou seu primeiro treino!',
    icon: 'trophy' as const,
    unlocked: true,
  },
  {
    id: '2',
    title: 'Sequência de 3 dias',
    description: 'Treinou por 3 dias consecutivos',
    icon: 'flame' as const,
    unlocked: true,
  },
  {
    id: '3',
    title: 'Mestre do Superior',
    description: 'Completou o treino superior 5 vezes',
    icon: 'award' as const,
    unlocked: false,
  },
];

// Mock community posts
const mockCommunityPosts = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Carlos Silva',
      avatar: 'https://i.pravatar.cc/150?img=1',
      isFireMaster: true,
    },
    content: 'Concluí meu 30º dia consecutivo de treino! 💪🔥 Quem mais está nessa jornada?',
    likes: 12,
    comments: 3,
    createdAt: '2025-04-09T15:34:00',
    workout: {
      id: '1',
      title: 'Treino A - Superior',
      performance: '100% concluído',
    },
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Maria Santos',
      avatar: 'https://i.pravatar.cc/150?img=5',
      isFireMaster: false,
    },
    content: 'Novo recorde pessoal no supino! 75kg x 8 repetições 🏋️‍♀️',
    likes: 8,
    comments: 5,
    createdAt: '2025-04-08T09:12:00',
    workout: {
      id: '2',
      title: 'Treino B - Inferior',
      performance: '85% concluído',
    },
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'João Mendes',
      avatar: 'https://i.pravatar.cc/150?img=8',
      isFireMaster: false,
    },
    content: 'Alguém tem dicas para melhorar a execução do desenvolvimento com halteres?',
    likes: 4,
    comments: 7,
    createdAt: '2025-04-07T18:45:00',
  },
];

// Mock challenges
const mockChallenges = [
  {
    id: '1',
    title: 'Desafio 30 dias',
    description: 'Complete 30 dias consecutivos de treino',
    participants: 15,
    daysRequired: 30,
    reward: 'Badge FIRE MASTER',
    image: '/lovable-uploads/f2089c61-7b95-41f4-a9e1-f46ee0596b18.png',
    progress: 12,
    remainingDays: 18,
    startDate: '2025-03-25',
    endDate: '2025-04-25',
  },
  {
    id: '2',
    title: 'Desafio Força Total',
    description: 'Complete todos os treinos de força em uma semana',
    participants: 8,
    daysRequired: 7,
    reward: '200 pontos de experiência',
    image: '/lovable-uploads/7d105e25-f2c7-405c-a822-7f3367c4b5a8.png',
    progress: 3,
    remainingDays: 4,
    startDate: '2025-04-05',
    endDate: '2025-04-12',
  },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("treinos");

  // Redirect if not authenticated or not a student
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'student') {
      toast({
        title: "Acesso restrito",
        description: "Esta página é apenas para alunos.",
        variant: "destructive",
      });
      navigate('/trainer-dashboard');
    }
  }, [user, navigate, toast]);

  // Mock data for the current user
  const isFireMaster = true; // Set to true to simulate the user has completed a 30-day challenge
  const currentStreak = 30; // Current streak days

  return (
    <PageContainer>
      <div className="mb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
          <h1 className="text-3xl font-bold gym-gradient-text">Olá, {user?.name || 'Aluno'}</h1>
          {isFireMaster && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 animate-pulse flex items-center gap-1">
              <Trophy className="h-4 w-4" /> FIRE MASTER 🔥
            </Badge>
          )}
        </div>
        <p className="text-gray-600">Sequência atual: {currentStreak} dias consecutivos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gym-purple">Professor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <User className="h-5 w-5 text-gym-purple" />
              </div>
              <div>
                <p className="font-medium">João Treinador</p>
                <p className="text-sm text-gray-500">joao.treinador@email.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gym-purple">Próximo Treino</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <CalendarDays className="h-5 w-5 text-gym-purple" />
              </div>
              <div>
                <p className="font-medium">Hoje</p>
                <p className="text-sm text-gray-500">Treino B - Inferior</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <GamificationCard 
          totalPoints={245}
          level={2}
          streak={currentStreak}
          achievements={mockAchievements}
          isFireMaster={isFireMaster}
        />
      </div>

      <Tabs defaultValue="treinos" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="treinos">Meus Treinos</TabsTrigger>
          <TabsTrigger value="comunidade">Comunidade</TabsTrigger>
          <TabsTrigger value="desafios">Desafios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="treinos" className="space-y-6">
          <h2 className="text-2xl font-semibold text-gym-purple mb-6">Meus Treinos</h2>
          
          <WorkoutList 
            workouts={mockWorkouts} 
            emptyMessage="Você ainda não possui treinos atribuídos pelo seu professor."
          />
        </TabsContent>
        
        <TabsContent value="comunidade">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gym-purple">Comunidade</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Users size={16} />
                  <span>Meus colegas ({15})</span>
                </Button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-1">Compartilhe seus treinos e metas com seus colegas!</p>
          </div>
          
          <CommunitySection posts={mockCommunityPosts} />
        </TabsContent>
        
        <TabsContent value="desafios">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gym-purple">Desafios</h2>
            <p className="text-gray-600 text-sm mt-1">Participe de desafios e ganhe recompensas especiais!</p>
          </div>
          
          <ChallengesList challenges={mockChallenges} />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default StudentDashboard;
