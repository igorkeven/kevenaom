import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ForumPost } from "@/types";
import { MessageSquare, MessageCircle, Brain, HelpCircle, Video, Coffee, Crown, PlusCircle } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { CreatePostModal } from "@/components/CreatePostModal";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const categoryIcons: Record<string, React.ElementType> = {
  'Estratégia': Brain,
  'Dúvidas': HelpCircle,
  'Replays': Video,
  'Off-topic': Coffee,
};

const categoryColors: Record<string, string> = {
  'Estratégia': 'text-blue-400 border-blue-400/20 bg-blue-400/10',
  'Dúvidas': 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10',
  'Replays': 'text-green-400 border-green-400/20 bg-green-400/10',
  'Off-topic': 'text-gray-400 border-gray-400/20 bg-gray-400/10',
};

const ForumPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null); // Reseta o erro a cada nova busca
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        // Correção: Usando a sintaxe explícita (!author_id) para o join com a tabela de perfis
        // e reintroduzindo a contagem de respostas.
        .select('*, author:profiles!author_id(id, username, avatar_url), replies:forum_replies(count)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase error fetching posts:", error);
        throw error;
      }
     setPosts(data as ForumPost[]);
    } catch (err: any) {
      console.error("Erro ao buscar os tópicos do fórum:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <section id="forum" className="py-20 pt-32 bg-gradient-to-b from-background to-muted/20 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-cinzel text-sm text-primary font-semibold tracking-wide">
                COMUNIDADE
              </span>
            </div>
            <h1 className="font-cinzel-decorative text-4xl md:text-5xl font-bold text-foreground">
              Fórum de Batalha
            </h1>
          </div>
          {user ? (
            <CreatePostModal onPostCreated={fetchPosts} />
          ) : (
            <AuthModal>
              <Button variant="divine" size="lg" className="mt-4 sm:mt-0 group">
                <PlusCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Criar Novo Tópico
              </Button>
            </AuthModal>
          )}
        </div>

        {/* Forum Posts List */}
        {loading ? (
          <div className="text-center text-muted-foreground">Carregando tópicos...</div>
        ) : error ? (
          <div className="text-center text-red-500">Erro ao carregar tópicos: {error}</div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              // Código defensivo para garantir que a página não quebre se um post tiver dados inválidos.
              if (!post || !post.id || !post.category) {
                console.warn("Skipping rendering of invalid post object:", post);
                return null;
              }

              const CategoryIcon = categoryIcons[post.category] ?? MessageSquare;
              const isTopPlayer = post.author?.id === 'a411824a-455b-454d-853b-6840c92de036'; // ID de exemplo

              return (
                <Link to={`/forum/${post.id}`} key={post.id} className="block group">
                  <Card className="bg-gradient-card border-primary/10 shadow-md group-hover:border-primary/20 group-hover:shadow-epic transition-all duration-300 p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Category Icon */}
                      <div className={`hidden sm:flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0 ${categoryColors[post.category] || categoryColors['Off-topic']}`}>
                        <CategoryIcon className="w-6 h-6" />
                      </div>

                      {/* Post Info */}
                      <div className="flex-grow">
                        <div className={`sm:hidden flex items-center gap-2 text-xs mb-2 font-semibold py-1 px-2 rounded-full border w-fit ${categoryColors[post.category] || categoryColors['Off-topic']}`}>
                          <CategoryIcon className="w-3 h-3" />
                          {post.category}
                        </div>
                        <h3 className="font-cinzel text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="font-inter text-sm text-muted-foreground flex items-center gap-1">
                          por
                          <span className={`font-semibold ${isTopPlayer ? 'text-primary' : 'text-foreground'}`}>
                            {post.author?.username || 'Anônimo'}
                          </span>
                          {isTopPlayer && <Crown className="w-4 h-4 text-yellow-400" />}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex-shrink-0 flex items-center gap-6 text-sm text-muted-foreground w-full sm:w-auto border-t sm:border-none border-primary/10 pt-3 sm:pt-0">
                        <div className="flex items-center gap-2" title="Respostas">
                          <MessageCircle className="w-4 h-4" />
                          <span className="font-inter font-semibold">{post.replies?.[0]?.count || 0}</span>
                        </div>
                      </div>

                      {/* Last Activity */}
                      <div className="flex-shrink-0 text-sm text-muted-foreground w-full sm:w-auto sm:text-right">
                        <p className="font-inter">{post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ptBR }) : 'agora'}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ForumPage;