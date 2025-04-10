
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Edit, LogOut, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // This would make an API call in a real app
    toast({
      title: 'Perfil atualizado',
      description: 'Suas informações foram atualizadas com sucesso.',
    });
  };

  if (!user) return null;

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gym-gradient-text mb-2">Perfil</h1>
          <p className="text-gray-600">Gerencie suas informações pessoais</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-24 h-24 flex items-center justify-center">
                  <User className="h-12 w-12 text-gym-purple" />
                </div>
                <CardTitle className="text-xl text-center">
                  {user.name}
                </CardTitle>
                <p className="text-gray-500">{user.role === 'trainer' ? 'Professor' : 'Aluno'}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Membro desde</p>
                    <p className="font-medium">{new Date().toLocaleDateString('pt-BR')}</p>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    className="w-full" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Editar Perfil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="(00) 00000-0000" />
                    </div>
                    
                    {user.role === 'student' && (
                      <>
                        <div>
                          <Label htmlFor="age">Idade</Label>
                          <Input id="age" type="number" />
                        </div>
                        
                        <div>
                          <Label htmlFor="height">Altura (cm)</Label>
                          <Input id="height" type="number" />
                        </div>
                        
                        <div>
                          <Label htmlFor="weight">Peso (kg)</Label>
                          <Input id="weight" type="number" />
                        </div>
                      </>
                    )}
                    
                    {user.role === 'trainer' && (
                      <>
                        <div>
                          <Label htmlFor="specialization">Especialização</Label>
                          <Input id="specialization" placeholder="Ex: Musculação, CrossFit, etc." />
                        </div>
                        
                        <div>
                          <Label htmlFor="experience">Anos de experiência</Label>
                          <Input id="experience" type="number" />
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      Salvar alterações
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;
