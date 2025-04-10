
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Trophy, Award, Flame } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface GamificationCardProps {
  totalPoints: number;
  level: number;
  streak: number;
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: 'trophy' | 'star' | 'award';
    unlocked: boolean;
  }[];
}

const GamificationCard: React.FC<GamificationCardProps> = ({
  totalPoints,
  level,
  streak,
  achievements,
}) => {
  // Calculate progress to next level (example: each level requires level * 100 points)
  const nextLevelPoints = (level + 1) * 100;
  const currentLevelPoints = level * 100;
  const pointsToNextLevel = nextLevelPoints - totalPoints;
  const levelProgress = ((totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-gym-purple">Sua Evolução</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="flex flex-col items-center">
              <Trophy className="h-6 w-6 text-yellow-500 mb-1" />
              <p className="text-xl font-bold text-gym-purple">{totalPoints}</p>
              <p className="text-xs text-gray-500">Pontos</p>
            </div>
          </div>
          <div className="text-center">
            <div className="flex flex-col items-center">
              <Star className="h-6 w-6 text-gym-purple mb-1" />
              <p className="text-xl font-bold text-gym-purple">{level}</p>
              <p className="text-xs text-gray-500">Nível</p>
            </div>
          </div>
          <div className="text-center">
            <div className="flex flex-col items-center">
              <Flame className="h-6 w-6 text-orange-500 mb-1" />
              <p className="text-xl font-bold text-gym-purple">{streak}</p>
              <p className="text-xs text-gray-500">Sequência</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Nível {level}</span>
            <span>Nível {level + 1}</span>
          </div>
          <Progress value={levelProgress} className="h-2 mb-1" />
          <p className="text-xs text-center text-gray-500">
            Faltam {pointsToNextLevel} pontos para o próximo nível
          </p>
        </div>

        {achievements.length > 0 && (
          <>
            <h4 className="font-medium text-sm mb-2">Conquistas recentes</h4>
            <div className="space-y-2">
              {achievements.slice(0, 3).map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`flex items-center p-2 rounded-md ${achievement.unlocked ? 'bg-primary/10' : 'bg-gray-100 opacity-70'}`}
                >
                  <div className={`p-1 rounded-full mr-3 ${achievement.unlocked ? 'bg-primary/20' : 'bg-gray-200'}`}>
                    {achievement.icon === 'trophy' && <Trophy className={`h-5 w-5 ${achievement.unlocked ? 'text-yellow-500' : 'text-gray-400'}`} />}
                    {achievement.icon === 'star' && <Star className={`h-5 w-5 ${achievement.unlocked ? 'text-gym-purple' : 'text-gray-400'}`} />}
                    {achievement.icon === 'award' && <Award className={`h-5 w-5 ${achievement.unlocked ? 'text-blue-500' : 'text-gray-400'}`} />}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${achievement.unlocked ? '' : 'text-gray-400'}`}>{achievement.title}</p>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GamificationCard;
