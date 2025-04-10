
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import RoleSelectionComponent from '@/components/auth/RoleSelection';

const RoleSelectionPage = () => {
  return (
    <PageContainer className="flex items-center justify-center py-12">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center gym-gradient-text mb-8">Escolha seu perfil</h1>
        <RoleSelectionComponent />
      </div>
    </PageContainer>
  );
};

export default RoleSelectionPage;
