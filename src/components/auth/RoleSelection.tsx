
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const RoleSelection = () => {
  const { setRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'trainer' | 'student') => {
    setRole(role);
    navigate('/register');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
            <Dumbbell className="h-8 w-8 text-gym-purple" />
          </div>
          <CardTitle className="text-2xl text-gym-purple">Professor</CardTitle>
          <CardDescription>Crie e gerencie treinos para seus alunos</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <ul className="mb-6 space-y-2 text-left">
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              Criar treinos personalizados
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              Atribuir treinos a alunos
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              Acompanhar o progresso
            </li>
          </ul>
          <Button onClick={() => handleRoleSelect('trainer')} className="w-full">
            Sou Professor
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-secondary/10 w-16 h-16 flex items-center justify-center">
            <Users className="h-8 w-8 text-gym-blue" />
          </div>
          <CardTitle className="text-2xl text-gym-blue">Aluno</CardTitle>
          <CardDescription>Veja seus treinos e acompanhe seu progresso</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <ul className="mb-6 space-y-2 text-left">
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              Acesse seus treinos em qualquer lugar
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              Veja instruções detalhadas
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              Registre seu progresso
            </li>
          </ul>
          <Button 
            onClick={() => handleRoleSelect('student')}
            className="w-full bg-gym-blue hover:bg-gym-blue/90"
          >
            Sou Aluno
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelection;
