import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

interface CompleteProfileModalProps {
  isOpen: boolean;
}

export const CompleteProfileModal = ({ isOpen }: CompleteProfileModalProps) => {
  const { user, profile, refreshProfile } = useAuth();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from('profiles')
      .update({ username, full_name: fullName })
      .eq('id', user.id);

    if (error) {
      setError(error.message);
    } else {
      // Atualiza o perfil no contexto para fechar o modal
      await refreshProfile();
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent 
        className="sm:max-w-[425px] bg-gradient-card border-primary/20 shadow-epic"
        onInteractOutside={(e) => e.preventDefault()} // Impede o fechamento
      >
        <DialogHeader>
          <DialogTitle className="font-cinzel-decorative text-2xl text-primary text-center">Complete seu Perfil</DialogTitle>
          <DialogDescription className="text-center font-inter text-muted-foreground">
            Precisamos de mais algumas informações para finalizar seu cadastro.
          </DialogDescription>
        </DialogHeader>
        <form id="complete-profile-form" onSubmit={handleUpdateProfile} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Nome Real</Label>
            <Input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Seu nome completo" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Nome no Jogo (Comunidade)</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Seu nome de guerra" required />
          </div>
        </form>
        <DialogFooter className="flex flex-col gap-2">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button
            type="submit"
            form="complete-profile-form"
            variant="divine"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar e Continuar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};