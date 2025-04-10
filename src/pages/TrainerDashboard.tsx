
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import WorkoutList from '@/components/workouts/WorkoutList';
import { WorkoutType } from '@/components/workouts/WorkoutCard';
import { PlusCircle, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const mockStudents = [
  { id: '1', name: 'João Silva', email: 'joao@example.com', workouts: 3 },
  { id: '2', name: 'Maria Oliveira', email: 'maria@example.com', workouts: 2 },
  { id: '3', name: 'Carlos Santos', email: 'carlos@example.com', workouts: 1 },
];

const TrainerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('workouts');

  // Redirect if not authenticated or not a trainer
  React.useEffect(() => {
    if (!user || user.role !== 'trainer') {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold gym-gradient-text mb-2">Dashboard do Professor</h1>
        <p className="text-gray-600">Gerencie seus treinos e alunos</p>
      </div>

      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gym-purple">Olá, {user?.name}</h2>
        <Button onClick={() => navigate('/create-workout')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Criar novo treino
        </Button>
      </div>

      <Tabs defaultValue="workouts" onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="workouts">Meus Treinos</TabsTrigger>
          <TabsTrigger value="students">Meus Alunos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="workouts">
          <WorkoutList 
            workouts={mockWorkouts} 
            emptyMessage="Você ainda não criou nenhum treino. Clique em 'Criar novo treino' para começar."
          />
        </TabsContent>
        
        <TabsContent value="students">
          {mockStudents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockStudents.map((student) => (
                <Card key={student.id} className="hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-gym-purple">{student.name}</CardTitle>
                      <div className="p-2 bg-secondary/10 rounded-full">
                        <Users className="h-5 w-5 text-gym-blue" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{student.email}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{student.workouts} treinos atribuídos</span>
                      <Button variant="ghost" size="sm" className="text-gym-blue" onClick={() => navigate('/create-workout')}>
                        Atribuir treino
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-lg text-gray-500 mb-4">Você ainda não possui alunos cadastrados.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default TrainerDashboard;
