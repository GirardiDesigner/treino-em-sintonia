
import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-1 container mx-auto py-8 px-4 ${className}`}>
        {children}
      </main>
      <footer className="py-6 bg-gray-50">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Treino em Sintonia. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default PageContainer;
