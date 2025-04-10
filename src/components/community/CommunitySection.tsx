
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Send, Flame } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  avatar: string;
  isFireMaster: boolean;
}

interface Workout {
  id: string;
  title: string;
  performance: string;
}

interface Post {
  id: string;
  user: User;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  workout?: Workout;
}

interface CommunitySectionProps {
  posts: Post[];
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ posts }) => {
  const [newPostContent, setNewPostContent] = useState('');
  const { toast } = useToast();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const handleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
      toast({
        title: "Post curtido",
        description: "Você curtiu esta publicação",
      });
    }
  };

  const handleShare = (postId: string) => {
    toast({
      title: "Compartilhado",
      description: "Link copiado para a área de transferência",
    });
  };

  const handleNewPost = () => {
    if (newPostContent.trim()) {
      toast({
        title: "Post publicado",
        description: "Sua publicação foi compartilhada com sucesso",
      });
      setNewPostContent('');
    }
  };

  const getRelativeTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: ptBR });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <Textarea 
            placeholder="Compartilhe seu progresso ou faça uma pergunta..." 
            className="mb-4 resize-none"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleNewPost} disabled={!newPostContent.trim()}>
              Publicar <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardHeader className="p-4 pb-0">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{post.user.name}</span>
                  {post.user.isFireMaster && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-xs flex items-center gap-1 h-5">
                      <Flame className="h-3 w-3 animate-pulse" /> FIRE MASTER
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">{getRelativeTime(post.createdAt)}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="whitespace-pre-line">{post.content}</p>
            
            {post.workout && (
              <div className="mt-3 bg-muted/50 p-3 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{post.workout.title}</p>
                    <p className="text-xs text-gray-500">{post.workout.performance}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => window.location.href = `/workout/${post.workout?.id}`}>
                    Ver treino
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-gray-500 hover:text-red-500"
                onClick={() => handleLike(post.id)}
              >
                <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500" onClick={() => handleShare(post.id)}>
              <Share2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CommunitySection;
