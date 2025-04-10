
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to the appropriate dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'trainer') {
        navigate('/trainer-dashboard');
      } else if (user.role === 'student') {
        navigate('/student-dashboard');
      }
    }
  }, [isAuthenticated, navigate, user]);

  return (
    <PageContainer className="flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </PageContainer>
  );
};

export default Login;
