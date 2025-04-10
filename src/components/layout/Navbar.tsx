
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dumbbell, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-gym-purple" />
          <span className="text-xl font-bold gym-gradient-text">Treino em Sintonia</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-gym-purple">
                <User className="h-5 w-5" />
                <span>{user?.name}</span>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-500"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/register')}>
                Registrar
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
