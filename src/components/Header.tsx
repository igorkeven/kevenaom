import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Youtube, Sword, Users, Download, MessageSquare, User, Home, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
    navigate('/');
  };

  const navItems = [
    { name: "Início", href: "/", icon: Home },
    { name: "Sobre", href: "#about", icon: Sword },
    { name: "Canal", href: "#youtube", icon: Youtube },
    { name: "Consultoria", href: "#consultoria", icon: User },
    { name: "Fórum", href: "/forum", icon: MessageSquare },
    { name: "Replays", href: "/replays", icon: Download },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-divine rounded-lg flex items-center justify-center shadow-glow">
              <Sword className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-cinzel-decorative text-xl font-bold text-primary">
                Keven AOM
              </h1>
              <p className="text-xs text-muted-foreground font-inter">
                Master of Mythology
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost_epic" size="sm" className="flex items-center gap-2" asChild>
                {item.href.startsWith('/') ? (
                  <Link to={item.href}>{item.name}</Link>
                ) : (
                  <a href={item.href}>{item.name}</a>
                )}
              </Button>
            ))}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost_epic" className="flex items-center gap-2">
                    <Avatar className="w-6 h-6 border-2 border-primary/50">
                      <AvatarImage src={user.user_metadata.avatar_url} />
                      <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-primary/20">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-primary/10" />
                  <DropdownMenuItem asChild className="cursor-pointer"><Link to="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Painel</Link></DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 focus:bg-red-500/20 focus:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AuthModal>
                <Button variant="ghost_epic" size="sm" className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> Login
                </Button>
              </AuthModal>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost_epic"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
        )}>
          <nav className="space-y-2 pt-4 border-t border-border/50">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost_epic" size="sm" className="w-full justify-start gap-3" asChild onClick={() => setIsMenuOpen(false)}>
                {item.href.startsWith('/') ? (
                  <Link to={item.href}>
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
                  </Link>
                ) : (
                  <a href={item.href}>
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.name}
                  </a>
                )}
              </Button>
            ))}
            <div className="border-t border-primary/10 my-2" />
            {user ? (
              <>
                <Button variant="ghost_epic" size="sm" className="w-full justify-start gap-3" asChild onClick={() => setIsMenuOpen(false)}><Link to="/dashboard"><LayoutDashboard className="w-4 h-4" />Painel</Link></Button>
                <Button variant="ghost_epic" size="sm" className="w-full justify-start gap-3 text-red-400" onClick={handleLogout}><LogOut className="w-4 h-4" />Sair</Button>
              </>
            ) : (
              <AuthModal>
                <Button variant="ghost_epic" size="sm" className="w-full justify-start gap-3" onClick={() => setIsMenuOpen(false)}>
                  <Users className="w-4 h-4" />Login
                </Button>
              </AuthModal>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;