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

interface LoginModalProps {
  children: React.ReactNode; // O botão que aciona o modal
}

export const LoginModal = ({ children }: LoginModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-card border-primary/20 shadow-epic">
        <DialogHeader>
          <DialogTitle className="font-cinzel-decorative text-2xl text-primary text-center">Acessar Conta</DialogTitle>
          <DialogDescription className="text-center font-inter text-muted-foreground">
            Use sua conta social ou e-mail para continuar.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 text-foreground">
              <GoogleIcon className="w-5 h-5 mr-2" />
              Google
            </Button>
            <Button variant="outline" className="h-12 bg-[#171a21] text-white hover:bg-[#2a475e] hover:text-white border-none">
              <SteamIcon className="w-5 h-5 mr-2" />
              Steam
            </Button>
          </div>

          {/* Separator */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-primary/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground font-inter">
                Ou continue com
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-inter text-muted-foreground">Email</Label>
            <Input id="email" type="email" placeholder="guerreiro@dominion.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password"  className="font-inter text-muted-foreground">Senha</Label>
            <Input id="password" type="password" />
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-4 sm:flex-col sm:space-x-0">
          <Button type="submit" variant="divine" size="lg" className="w-full">Entrar</Button>
          <div className="text-center text-sm font-inter">
            <span className="text-muted-foreground">Não tem uma conta? </span>
            <Button variant="link" className="p-0 h-auto text-primary">
              Cadastre-se
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

