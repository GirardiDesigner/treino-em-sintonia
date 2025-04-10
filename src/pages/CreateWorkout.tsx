
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import WorkoutForm from '@/components/workouts/WorkoutForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const CreateWorkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated or not a trainer
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'trainer') {
      toast({
        title: "Acesso restrito",
        description: "Apenas professores podem criar treinos.",
        variant: "destructive",
      });
      navigate('/student-dashboard');
    }
  }, [user, navigate, toast]);

  return (
    <PageContainer>
      <WorkoutForm />
    </PageContainer>
  );
};

export default CreateWorkout;
