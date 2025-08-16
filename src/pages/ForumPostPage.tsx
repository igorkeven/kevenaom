import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { ForumPost, ForumReply } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowLeft, Crown } from 'lucide-react';
import { AuthModal } from '@/components/AuthModal';

const ForumPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const { user, profile } = useAuth();

  const [post, setPost] = useState<ForumPost | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingReply, setLoadingReply] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPostAndReplies = async () => {
    if (!postId) return;
    try {
      setLoading(true);
      // Fetch post
      const { data: postData, error: postError } = await supabase
        .from('forum_posts')
        .select('*, author:profiles!author_id(*)')
        .eq('id', Number(postId))
        .single();
      if (postError) throw postError;
      setPost(postData as ForumPost);

      // Fetch replies
      const { data: repliesData, error: repliesError } = await supabase
        .from('forum_replies')
        .select('*, author:profiles!author_id(*)')
        .eq('post_id', Number(postId))
        .order('created_at', { ascending: true });
      if (repliesError) throw repliesError;
      setReplies(repliesData as ForumReply[]);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostAndReplies();
  }, [postId]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newReply.trim()) return;

    setLoadingReply(true);
    const { error } = await supabase
      .from('forum_replies')
      .insert({
        post_id: Number(postId),
        author_id: user.id,
        content: newReply,
      });

    if (error) {
      console.error('Error submitting reply:', error);
    } else {
      setNewReply('');
      await fetchPostAndReplies(); // Refresh replies
    }
    setLoadingReply(false);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Carregando tópico...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Erro: {error}</div>;
  if (!post) return <div className="flex justify-center items-center h-screen">Tópico não encontrado.</div>;

  return (
    <section id="forum-post" className="py-20 pt-32 bg-gradient-to-b from-background to-muted/20 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/forum" className="inline-flex items-center gap-2 text-primary mb-6 font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Fórum
        </Link>

        {/* Main Post */}
        <Card className="bg-gradient-card border-primary/20 shadow-epic p-6 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Avatar>
              <AvatarImage src={post.author?.avatar_url || undefined} />
              <AvatarFallback>{post.author?.username?.[0]?.toUpperCase() ?? 'U'}</AvatarFallback>

            </Avatar>
            <div>
              <p className="font-semibold text-foreground flex items-center gap-1">{post.author?.username} {post.author?.id === 'a411824a-455b-454d-853b-6840c92de036' && <Crown className="w-4 h-4 text-yellow-400" />}</p>
              <p className="text-xs text-muted-foreground">{post.created_at && formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ptBR })}
              </p>
            </div>
          </div>
          <h1 className="font-cinzel-decorative text-3xl font-bold text-primary mb-4">{post.title}</h1>
          <p className="font-inter text-foreground whitespace-pre-wrap">{post.content}</p>
        </Card>

        {/* Replies */}
        <div className="space-y-6 mb-8">
          {replies.map(reply => (
            <Card key={reply.id} className="bg-card/80 p-4">
              <div className="flex items-start gap-4 mb-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={reply.author?.avatar_url || undefined} />
                  <AvatarFallback>{reply.author?.username?.[0].toUpperCase() ?? 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground flex items-center gap-1">{reply.author?.username} {reply.author?.id === 'a411824a-455b-454d-853b-6840c92de036' && <Crown className="w-4 h-4 text-yellow-400" />}</p>
                  <p className="text-xs text-muted-foreground">{post.created_at && formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ptBR })}
</p>
                </div>
              </div>
              <p className="font-inter text-muted-foreground whitespace-pre-wrap">{reply.content}</p>
            </Card>
          ))}
        </div>

        {/* Reply Form */}
        {user ? (
          <Card className="bg-gradient-card border-primary/20 shadow-epic p-6">
            <h3 className="font-cinzel text-xl font-bold text-primary mb-4">Deixe sua Resposta</h3>
            <form onSubmit={handleReplySubmit} className="space-y-4">
              <Textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Escreva seu comentário..."
                rows={4}
              />
              <Button type="submit" variant="divine" disabled={loadingReply}>
                {loadingReply ? 'Enviando...' : 'Enviar Comentário'}
              </Button>
            </form>
          </Card>
        ) : (
          <p className="text-center font-inter text-muted-foreground">
            Você precisa estar
            <AuthModal>
              <Button variant="link" className="text-primary p-1">logado</Button>
            </AuthModal>
            para comentar.
          </p>
        )}
      </div>
    </section>
  );
};

export default ForumPostPage;
