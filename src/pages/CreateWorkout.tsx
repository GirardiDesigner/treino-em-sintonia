
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import WorkoutForm from '@/components/workouts/WorkoutForm';
import { useAuth } from '@/contexts/AuthContext';

const CreateWorkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not a trainer
  React.useEffect(() => {
    if (!user || user.role !== 'trainer') {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <PageContainer>
      <WorkoutForm />
    </PageContainer>
  );
};

export default CreateWorkout;
