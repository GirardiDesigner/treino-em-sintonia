import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { WorkoutType } from '@/components/workouts/WorkoutCard';
import WorkoutList from '@/components/workouts/WorkoutList';
import { CalendarDays, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

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

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold gym-gradient-text mb-2">Meus Treinos</h1>
        <p className="text-gray-600">Acompanhe seus treinos e progresso</p>
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

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gym-purple">Progresso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-gym-purple">3</p>
                <p className="text-xs text-gray-500">Treinos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gym-purple">18</p>
                <p className="text-xs text-gray-500">Exercícios</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gym-purple">5</p>
                <p className="text-xs text-gray-500">Semanas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold text-gym-purple mb-6">Meus Treinos</h2>
      
      <WorkoutList 
        workouts={mockWorkouts} 
        emptyMessage="Você ainda não possui treinos atribuídos pelo seu professor."
      />
    </PageContainer>
  );
};

export default StudentDashboard;
