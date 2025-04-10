
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/contexts/AuthContext';

const Register = () => {
  const { isAuthenticated, user, role } = useAuth();
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

  // If no role selected, redirect to role selection page
  useEffect(() => {
    if (!role && !isAuthenticated) {
      navigate('/role-selection');
    }
  }, [role, navigate, isAuthenticated]);

  return (
    <PageContainer className="flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </PageContainer>
  );
};

export default Register;
