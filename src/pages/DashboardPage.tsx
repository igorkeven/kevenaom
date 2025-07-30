import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, User, BarChart2 } from 'lucide-react';
import { UploadReplayModal } from '@/components/UploadReplayModal';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) {
    // Isso não deve ser alcançado devido ao ProtectedRoute, mas é uma boa prática
    return <div>Você precisa estar logado para ver esta página.</div>;
  }

  const username = user.user_metadata?.user_name || user.email;

  return (
    <section id="dashboard" className="py-20 pt-32 bg-gradient-to-b from-background to-muted/20 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-cinzel-decorative text-4xl md:text-5xl font-bold text-foreground">
            Painel do Guerreiro
          </h1>
          <p className="font-inter text-lg text-muted-foreground mt-2">
            Bem-vindo de volta, <span className="text-primary font-semibold">{username}</span>!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Upload Replay Card */}
          <Card className="bg-gradient-card border-primary/20 shadow-epic p-6 flex flex-col items-center text-center">
            <UploadCloud className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-cinzel text-xl font-bold text-foreground mb-2">Enviar Replay</h3>
            <p className="font-inter text-sm text-muted-foreground mb-6 flex-grow">
              Compartilhe suas batalhas épicas com a comunidade. Faça o upload do seu arquivo de replay.
            </p>
            <UploadReplayModal>
              <Button variant="divine" className="w-full mt-auto">
                Fazer Upload
              </Button>
            </UploadReplayModal>
          </Card>

          {/* My Stats Card */}
          <Card className="bg-gradient-card border-primary/20 shadow-epic p-6 flex flex-col items-center text-center">
            <BarChart2 className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-cinzel text-xl font-bold text-foreground mb-2">Minhas Estatísticas</h3>
            <p className="font-inter text-sm text-muted-foreground mb-6 flex-grow">
              Veja seu histórico de partidas, vitórias, derrotas e progresso geral.
            </p>
            <Button variant="heroic" className="w-full mt-auto">
              Ver Estatísticas
            </Button>
          </Card>

          {/* Account Settings Card */}
          <Card className="bg-gradient-card border-primary/20 shadow-epic p-6 flex flex-col items-center text-center">
            <User className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-cinzel text-xl font-bold text-foreground mb-2">Configurações da Conta</h3>
            <p className="font-inter text-sm text-muted-foreground mb-6 flex-grow">
              Atualize seu nome de usuário, avatar ou altere sua senha.
            </p>
            <Button variant="warrior" className="w-full mt-auto" asChild>
              <Link to="/dashboard/settings">
                Gerenciar Conta
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;