import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { PlusCircle } from 'lucide-react';

interface CreatePostModalProps {
  onPostCreated: () => void;
}

export const CreatePostModal = ({ onPostCreated }: CreatePostModalProps) => {
  const { user } = useAuth();  
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetState = () => {
    setTitle('');
    setContent('');
    setCategory('');
    setLoading(false);
    setError(null);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title || !category) {
      setError('Título e categoria são obrigatórios.');
      return;
    }

    setLoading(true);
    setError(null);

    console.log('Tentando criar post com:', { author_id: user.id, title, content, category });

    try {
      const { error: insertError } = await supabase
        .from('forum_posts')
        .insert({
          author_id: user.id,
          title,
          content,
          category,
        });

      if (insertError) {
        console.error('Erro do Supabase ao inserir:', insertError);
        throw insertError;
      }

      onPostCreated(); // Avisa o componente pai para recarregar a lista (não precisa esperar)
      setIsOpen(false); // Fecha o modal em caso de sucesso
    } catch (err: any) {
      console.error('Erro no bloco catch do handleCreatePost:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetState();
    }}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button variant="divine" size="lg" className="mt-4 sm:mt-0 group">
          <PlusCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Criar Novo Tópico
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gradient-card border-primary/20 shadow-epic">
        <DialogHeader>
          <DialogTitle className="font-cinzel-decorative text-2xl text-primary text-center">Criar Novo Tópico</DialogTitle>
          <DialogDescription className="text-center font-inter text-muted-foreground">
            Compartilhe sua sabedoria ou dúvida com a comunidade.
          </DialogDescription>
        </DialogHeader>
        <form id="create-post-form" onSubmit={handleCreatePost} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="post-title">Título</Label>
            <Input id="post-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Qual a sua questão, guerreiro?" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="post-category">Categoria</Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Estratégia">Estratégia</SelectItem>
                <SelectItem value="Dúvidas">Dúvidas</SelectItem>
                <SelectItem value="Replays">Replays</SelectItem>
                <SelectItem value="Off-topic">Off-topic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="post-content">Conteúdo (Opcional)</Label>
            <Textarea id="post-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Descreva sua ideia ou pergunta com mais detalhes..." rows={5} />
          </div>
        </form>
        <DialogFooter className="flex flex-col gap-2">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" form="create-post-form" variant="divine" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar Tópico'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};