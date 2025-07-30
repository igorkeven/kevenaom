import { useState } from "react";
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
import { GoogleIcon } from "./icons/GoogleIcon";
import { SteamIcon } from "./icons/SteamIcon";
import { supabase } from "@/lib/supabaseClient";
import { Provider } from "@supabase/supabase-js";

interface AuthModalProps {
  children: React.ReactNode;
}

const Separator = ({ text }: { text: string }) => (
  <div className="relative my-2">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t border-primary/20" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-card px-2 text-muted-foreground font-inter">
        {text}
      </span>
    </div>
  </div>
);

export const AuthModal = ({ children }: AuthModalProps) => {
  const [view, setView] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenChange = (isOpen: boolean) => {
    // Reseta para a view de login quando o modal é fechado
    if (!isOpen) {
      setTimeout(() => setView('login'), 200);
      resetState();
    }
  };

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (view === 'register') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_name: username,
          }
        }
      });
      if (error) setError(error.message);
      else alert('Cadastro realizado! Verifique seu e-mail para confirmação.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      // O modal fechará automaticamente no sucesso se usarmos um AuthProvider
    }
    setLoading(false);
  };

  const handleOAuthLogin = async (provider: 'google' | 'steam') => {
    await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
    });
  };

  const resetState = () => {
    setError(null);
    setEmail('');
    setPassword('');
    setUsername('');
    setLoading(false);
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-card border-primary/20 shadow-epic">
        {view === 'login' ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-cinzel-decorative text-2xl text-primary text-center">Acessar Conta</DialogTitle>
              <DialogDescription className="text-center font-inter text-muted-foreground">
                Use sua conta social ou e-mail para continuar.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <form id="login-form" onSubmit={handleAuthAction}>
                <div className="grid grid-cols-2 gap-4">
                  <Button type="button" variant="outline" className="h-12 text-foreground" onClick={() => handleOAuthLogin('google')}>
                    <GoogleIcon className="w-5 h-5 mr-2" /> Google
                  </Button>
                  <Button type="button" variant="outline" className="h-12 bg-[#171a21] text-white hover:bg-[#2a475e] hover:text-white border-none" onClick={() => handleOAuthLogin('steam')}>
                    <SteamIcon className="w-5 h-5 mr-2" /> Steam
                  </Button>
                </div>

                <Separator text="Ou continue com" />

                <div className="grid gap-2">
                  <Label htmlFor="login-email" className="font-inter text-muted-foreground">Email</Label>
                  <Input id="login-email" type="email" placeholder="guerreiro@dominion.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="login-password"  className="font-inter text-muted-foreground">Senha</Label>
                  <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </form>
            </div>

            <DialogFooter className="flex flex-col gap-4 sm:flex-col sm:space-x-0">
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button type="submit" form="login-form" variant="divine" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
              <div className="text-center text-sm font-inter">
                <span className="text-muted-foreground">Não tem uma conta? </span>
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => { setView('register'); resetState(); }}>
                  Cadastre-se
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-cinzel-decorative text-2xl text-primary text-center">Criar Conta</DialogTitle>
              <DialogDescription className="text-center font-inter text-muted-foreground">
                Junte-se à legião de guerreiros. O cadastro é rápido.
              </DialogDescription>
            </DialogHeader>
            
            <form id="register-form" onSubmit={handleAuthAction}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button type="button" variant="outline" className="h-12 text-foreground" onClick={() => handleOAuthLogin('google')}>
                    <GoogleIcon className="w-5 h-5 mr-2" /> Google
                  </Button>
                  <Button type="button" variant="outline" className="h-12 bg-[#171a21] text-white hover:bg-[#2a475e] hover:text-white border-none" onClick={() => handleOAuthLogin('steam')}>
                    <SteamIcon className="w-5 h-5 mr-2" /> Steam
                  </Button>
                </div>

                <Separator text="Ou crie com e-mail" />

                <div className="grid gap-2">
                  <Label htmlFor="register-username" className="font-inter text-muted-foreground">Nome de Usuário</Label>
                  <Input id="register-username" placeholder="SeuNomeDeGuerra" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="register-email" className="font-inter text-muted-foreground">Email</Label>
                  <Input id="register-email" type="email" placeholder="guerreiro@dominion.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="register-password"  className="font-inter text-muted-foreground">Senha</Label>
                  <Input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </div>
            </form>

            <DialogFooter className="flex flex-col gap-4 sm:flex-col sm:space-x-0">
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button type="submit" form="register-form" variant="divine" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Criando...' : 'Criar Conta'}
              </Button>
              <div className="text-center text-sm font-inter">
                <span className="text-muted-foreground">Já tem uma conta? </span>
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => { setView('login'); resetState(); }}>
                  Entre
                </Button>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
