import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Youtube, Play, Users, Eye, ThumbsUp, Bell } from "lucide-react";

const YouTubeSection = () => {
  const videos = [
    {
      title: "Que virada! Lw (Isis) VS Light Yagami (Rá) - 2TC x 0 TC ( corte da live )",
      views: "45.2K",
      
      videoId: "O6TH_hl77e4" 
    },
    {
      title: "Japoneses no Age of Mythology Retold",
      views: "32.1K", 
      videoId: "IfCxbt3lruQ"
    },
    {
      title: "Caok Dupla | Light Yagami/JoãoVitor | Ficamos sem TC | Age of Mythology Retold",
      views: "67.8K",
      videoId: "4AV8BcVyLNo"
    }
  ];

  const stats = [
    {
      icon: Users,
      value: "5K+",
      label: "Inscritos",
      color: "text-red-500"
    },
    {
      icon: Eye,
      value: "700K+",
      label: "Visualizações",
      color: "text-primary"
    },
    {
      icon: ThumbsUp,
      value: "98.5%",
      label: "Likes",
      color: "text-green-500"
    },
    {
      icon: Play,
      value: "972+",
      label: "Vídeos",
      color: "text-accent"
    }
  ];

  return (
    <section id="youtube" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-full px-6 py-2 mb-6">
            <Youtube className="w-5 h-5 text-red-500" />
            <span className="font-cinzel text-sm text-red-500 font-semibold tracking-wide">
              CANAL OFICIAL
            </span>
          </div>
          
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl font-bold text-foreground mb-6">
            Canal <span className="text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text">YouTube</span>
          </h2>
          
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Explore os segredos dos deuses antigos através de guias épicos, análises profundas 
            e estratégias que elevaram Keven AOM ao topo dos rankings mundiais.
          </p>

          <Button 
            variant="destructive"
            size="xl"
            className="bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <a href="https://www.youtube.com/@kevenaom" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-6 h-6" />
              <Bell className="w-4 h-4" />
              INSCREVER-SE AGORA
            </a>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index}
                className="bg-gradient-card border-primary/20 shadow-epic p-6 text-center hover:shadow-divine transition-all duration-300 group"
              >
                <div className="mb-4">
                  <Icon className={`w-8 h-8 mx-auto ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <div className="font-cinzel-decorative text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="font-inter text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Featured Videos */}
        <div className="max-w-6xl mx-auto">
          <h3 className="font-cinzel text-2xl font-bold text-center text-foreground mb-8">
            Vídeos em <span className="text-transparent bg-gradient-divine bg-clip-text">Destaque</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {videos.map((video, index) => (
              <Card 
                key={index}
                className="bg-gradient-card border-primary/20 shadow-epic overflow-hidden group hover:shadow-divine transition-all duration-300"
              >
                {/* Container responsivo para o vídeo 16:9 */}
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                
                <div className="p-4">
                  <h4 className="font-cinzel font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span className="font-inter">{video.views} visualizações</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-card border-red-500/30 shadow-epic p-8 max-w-2xl mx-auto">
              <Youtube className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="font-cinzel text-2xl font-bold text-foreground mb-4">
                Junte-se à Comunidade Épica
              </h3>
              <p className="font-inter text-muted-foreground mb-6">
                Mais de 5.000 guerreiros já seguem as lições dos deuses. 
                Não perca nenhuma estratégia e seja notificado sobre novos conteúdos épicos!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="destructive"
                  size="lg"
                  className="bg-red-500 hover:bg-red-600"
                  asChild
                >
                  <a href="https://www.youtube.com/@kevenaom" target="_blank" rel="noopener noreferrer">
                    <Youtube className="w-5 h-5" />
                    Ver Todos os Vídeos
                  </a>
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                  asChild
                >
                  <a href="https://www.youtube.com/@kevenaom" target="_blank" rel="noopener noreferrer">
                    <Bell className="w-5 h-5" />
                    Ativar Notificações
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;