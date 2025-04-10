
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import RoleSelection from '@/components/auth/RoleSelection';
import { useAuth } from '@/contexts/AuthContext';
import { Dumbbell } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to the appropriate dashboard
  React.useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'trainer') {
        navigate('/trainer-dashboard');
      } else if (user.role === 'student') {
        navigate('/student-dashboard');
      }
    }
  }, [isAuthenticated, navigate, user]);

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <section className="py-12 md:py-20 text-center">
          <div className="animate-pulse-scale mb-8 mx-auto bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center">
            <Dumbbell className="h-12 w-12 text-gym-purple" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gym-gradient-text">
            Treino em Sintonia
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
            A plataforma que conecta professores e alunos para uma experiência de treino personalizada e eficiente.
          </p>
          
          {!isAuthenticated && (
            <div className="flex justify-center gap-4 mb-16">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
              >
                Entrar
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/register')}
              >
                Registrar
              </Button>
            </div>
          )}
        </section>

        {!isAuthenticated && (
          <section className="py-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Escolha seu perfil para começar</h2>
            <RoleSelection />
          </section>
        )}

        <section className="py-12 md:py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Dumbbell className="h-7 w-7 text-gym-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gym-purple">Para Professores</h3>
              <p className="text-gray-600">
                Crie treinos personalizados, gerencie seus alunos e acompanhe o progresso de forma simples e intuitiva.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-7 w-7 text-gym-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gym-purple">Para Alunos</h3>
              <p className="text-gray-600">
                Acesse seus treinos em qualquer lugar, acompanhe seu progresso e mantenha contato com seu professor.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-7 w-7 text-gym-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gym-purple">Treinos Organizados</h3>
              <p className="text-gray-600">
                Mantenha todos os treinos organizados e acessíveis, com detalhes de cada exercício e instruções claras.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
};

export default Index;
