
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'trainer' | 'student' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);

  // In a real app, these would make API calls to your backend
  const login = async (email: string, password: string) => {
    // Simulate API call
    console.log('Logging in with:', email, password);
    
    // Mock user data
    const mockUser = {
      id: '1',
      name: email.split('@')[0],
      email,
      role: role,
    };
    
    setUser(mockUser);
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, password: string, userRole: UserRole) => {
    // Simulate API call
    console.log('Registering with:', name, email, password, userRole);
    
    // Mock user data
    const mockUser = {
      id: '1',
      name,
      email,
      role: userRole,
    };
    
    setUser(mockUser);
    setRole(userRole);
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('user');
  };

  // Check for existing user on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
