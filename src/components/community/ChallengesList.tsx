
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Flame, Trophy, Users, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  daysRequired: number;
  reward: string;
  image: string;
  progress: number;
  remainingDays: number;
  startDate: string;
  endDate: string;
}

interface ChallengesListProps {
  challenges: Challenge[];
}

const ChallengesList: React.FC<ChallengesListProps> = ({ challenges }) => {
  const { toast } = useToast();

  const handleJoinChallenge = (challengeId: string) => {
    toast({
      title: "Desafio aceito!",
      description: "Você se inscreveu neste desafio. Boa sorte!",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {challenges.map((challenge) => {
        const progressPercent = (challenge.progress / challenge.daysRequired) * 100;
        
        return (
          <Card key={challenge.id} className="overflow-hidden flex flex-col h-full">
            <div 
              className="h-40 bg-center bg-cover" 
              style={{ backgroundImage: `url(${challenge.image})` }}
            >
              <div className="bg-black/50 w-full h-full flex flex-col justify-end p-4">
                <Badge className="self-start mb-2 bg-yellow-500">
                  <Trophy className="h-3 w-3 mr-1" />
                  {challenge.reward}
                </Badge>
                <h3 className="text-white text-xl font-bold">{challenge.title}</h3>
              </div>
            </div>
            
            <CardContent className="pt-4 flex-grow">
              <p className="text-gray-700 mb-4">{challenge.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{challenge.participants} participantes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Dia {challenge.progress}</span>
                    <span>Dia {challenge.daysRequired}</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                  
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {progressPercent.toFixed(0)}% concluído
                    </span>
                    <span className="text-xs text-gray-500">
                      Faltam {challenge.remainingDays} dias
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button 
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600" 
                onClick={() => handleJoinChallenge(challenge.id)}
              >
                <Flame className="mr-2 h-4 w-4" />
                {progressPercent > 0 ? "Continuar desafio" : "Aceitar desafio"}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ChallengesList;
