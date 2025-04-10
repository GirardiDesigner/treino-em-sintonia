
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const exerciseSchema = z.object({
  name: z.string().min(1, { message: 'Nome do exercício é obrigatório' }),
  sets: z.string().min(1, { message: 'Número de séries é obrigatório' }),
  reps: z.string().min(1, { message: 'Número de repetições é obrigatório' }),
  rest: z.string().optional(),
  instructions: z.string().optional(),
});

const workoutSchema = z.object({
  title: z.string().min(3, { message: 'Título deve ter pelo menos 3 caracteres' }),
  description: z.string().min(10, { message: 'Descrição deve ter pelo menos 10 caracteres' }),
  type: z.string().min(1, { message: 'Selecione um tipo de treino' }),
  studentEmail: z.string().email({ message: 'Email inválido' }),
});

type Exercise = z.infer<typeof exerciseSchema>;
type WorkoutFormValues = z.infer<typeof workoutSchema>;

const WorkoutForm = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'strength',
      studentEmail: '',
    },
  });

  const [exerciseForm, setExerciseForm] = useState<Exercise>({
    name: '',
    sets: '',
    reps: '',
    rest: '',
    instructions: '',
  });

  const handleExerciseChange = (field: keyof Exercise, value: string) => {
    setExerciseForm(prev => ({ ...prev, [field]: value }));
  };

  const addExercise = () => {
    try {
      exerciseSchema.parse(exerciseForm);
      setExercises([...exercises, exerciseForm]);
      setExerciseForm({
        name: '',
        sets: '',
        reps: '',
        rest: '',
        instructions: '',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Erro ao adicionar exercício',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    }
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: WorkoutFormValues) => {
    if (exercises.length === 0) {
      toast({
        title: 'Adicione exercícios',
        description: 'Você precisa adicionar pelo menos um exercício ao treino.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      // This would be an API call in a real app
      console.log('Creating workout:', { ...data, exercises });
      
      toast({
        title: 'Treino criado com sucesso!',
        description: 'O treino foi atribuído ao aluno.',
      });
      
      navigate('/trainer-dashboard');
    } catch (error) {
      toast({
        title: 'Erro ao criar treino',
        description: 'Ocorreu um erro ao criar o treino. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl gym-gradient-text">Criar Novo Treino</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título do Treino</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Treino de Pernas - Iniciante" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o objetivo e detalhes deste treino" 
                        {...field} 
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Treino</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de treino" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="strength">Força</SelectItem>
                          <SelectItem value="hypertrophy">Hipertrofia</SelectItem>
                          <SelectItem value="endurance">Resistência</SelectItem>
                          <SelectItem value="functional">Funcional</SelectItem>
                          <SelectItem value="cardio">Cardio</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="studentEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email do Aluno</FormLabel>
                      <FormControl>
                        <Input placeholder="aluno@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Exercícios</h3>
                  
                  {exercises.length > 0 && (
                    <div className="mb-6 space-y-4">
                      {exercises.map((exercise, index) => (
                        <div key={index} className="border p-4 rounded-md relative">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            onClick={() => removeExercise(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                            <div>
                              <p className="font-medium">Exercício</p>
                              <p>{exercise.name}</p>
                            </div>
                            <div>
                              <p className="font-medium">Séries</p>
                              <p>{exercise.sets}</p>
                            </div>
                            <div>
                              <p className="font-medium">Repetições</p>
                              <p>{exercise.reps}</p>
                            </div>
                          </div>
                          {exercise.rest && (
                            <div className="mt-2">
                              <p className="font-medium">Descanso</p>
                              <p>{exercise.rest}</p>
                            </div>
                          )}
                          {exercise.instructions && (
                            <div className="mt-2">
                              <p className="font-medium">Instruções</p>
                              <p className="text-sm">{exercise.instructions}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Adicionar Exercício</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <label htmlFor="exercise-name" className="text-sm font-medium">
                            Nome do Exercício
                          </label>
                          <Input
                            id="exercise-name"
                            value={exerciseForm.name}
                            onChange={(e) => handleExerciseChange('name', e.target.value)}
                            placeholder="Ex: Agachamento"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="exercise-sets" className="text-sm font-medium">
                            Séries
                          </label>
                          <Input
                            id="exercise-sets"
                            value={exerciseForm.sets}
                            onChange={(e) => handleExerciseChange('sets', e.target.value)}
                            placeholder="Ex: 3"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="exercise-reps" className="text-sm font-medium">
                            Repetições
                          </label>
                          <Input
                            id="exercise-reps"
                            value={exerciseForm.reps}
                            onChange={(e) => handleExerciseChange('reps', e.target.value)}
                            placeholder="Ex: 12 ou 8-12"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="exercise-rest" className="text-sm font-medium">
                            Descanso (opcional)
                          </label>
                          <Input
                            id="exercise-rest"
                            value={exerciseForm.rest}
                            onChange={(e) => handleExerciseChange('rest', e.target.value)}
                            placeholder="Ex: 60 segundos"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="exercise-instructions" className="text-sm font-medium">
                          Instruções (opcional)
                        </label>
                        <Textarea
                          id="exercise-instructions"
                          value={exerciseForm.instructions}
                          onChange={(e) => handleExerciseChange('instructions', e.target.value)}
                          placeholder="Dicas de execução, postura, respiração, etc."
                          rows={2}
                        />
                      </div>
                      
                      <Button
                        type="button"
                        className="mt-4 w-full"
                        onClick={addExercise}
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Exercício
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/trainer-dashboard')}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading || exercises.length === 0}>
                  {isLoading ? 'Criando...' : 'Criar Treino'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutForm;
