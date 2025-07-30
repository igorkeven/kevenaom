import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Sword, Users, Target, Crown, Star } from "lucide-react";

const About = () => {
  const achievements = [
    {
      icon: Trophy,
      title: "Top 5 Mundial",
      description: "Classificado como um dos melhores jogadores de AoM: Retold no mundo"
    },
    {
      icon: Crown,
      title: "Campeão de Ligas",
      description: "Múltiplas vitórias em torneios oficiais e competições épicas"
    },
    {
      icon: Star,
      title: "Creator Parceiro",
      description: "Criador de conteúdo oficial reconhecido pela comunidade global"
    },
    {
      icon: Users,
      title: "Mentor da Comunidade",
      description: "Mais de 500 jogadores treinados e aprimorados nas artes mitológicas"
    }
  ];

  const mythologies = [
    {
      name: "Greeks",
      description: "Domínio total dos heróis helênicos e estratégias clássicas",
      icon: "🏛️",
      mastery: 95
    },
    {
      name: "Norse",
      description: "Especialista em táticas vikings e poder dos deuses nórdicos", 
      icon: "⚡",
      mastery: 98
    },
    {
      name: "Egyptians",
      description: "Mestre das artes egípcias e construções monumentais",
      icon: "🏺",
      mastery: 92
    },
    {
      name: "Atlanteans",
      description: "Conhecedor profundo dos segredos atlantes",
      icon: "🔱",
      mastery: 90
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-6">
            <Sword className="w-5 h-5 text-primary" />
            <span className="font-cinzel text-sm text-primary font-semibold tracking-wide">
              O LENDÁRIO GUERREIRO
            </span>
          </div>
          
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sobre o <span className="text-transparent bg-gradient-divine bg-clip-text">Keven AOM</span>
          </h2>
          
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mergulhe na jornada épica do maior mestre de Age of Mythology: Retold. 
            Com anos de experiência e domínio completo das artes mitológicas, Keven AOM 
            alcançou o topo e se tornou uma lenda viva.
          </p>
        </div>

        {/* Main Bio Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gradient-card border-primary/20 shadow-epic p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-cinzel text-2xl font-bold text-primary mb-4">
                  A Lenda Continua
                </h3>
                <p className="font-inter text-muted-foreground mb-6 leading-relaxed">
                  Keven AOM começou sua jornada nas terras místicas de Age of Mythology há mais de uma década. 
                  Através de dedicação incansável e estratégias inovadoras, ele ascendeu ao topo do ranking mundial, 
                  estabelecendo-se como uma referência no jogo.
                </p>
                <p className="font-inter text-muted-foreground mb-6 leading-relaxed">
                  Seu canal no YouTube é um santuário de conhecimento, onde milhares de guerreiros aprendem 
                  os segredos dos deuses antigos e dominam as artes da guerra mitológica.
                </p>
                <Button variant="divine" size="lg" asChild>
                  <a href="#youtube">
                    <Target className="w-5 h-5" />
                    Ver Conquistas
                  </a>
                </Button>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 bg-muted/20 rounded-lg border border-primary/10 transition-all duration-300 hover:bg-muted/30 hover:border-primary/20"
                    >
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-cinzel font-semibold text-foreground mb-1">
                          {achievement.title}
                        </h4>
                        <p className="font-inter text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Mythologies Mastery */}
        <div className="max-w-6xl mx-auto">
          <h3 className="font-cinzel-decorative text-3xl font-bold text-center text-foreground mb-8">
            Domínio das <span className="text-transparent bg-gradient-divine bg-clip-text">Mitologias</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mythologies.map((mythology, index) => (
              <Card 
                key={index}
                className="bg-gradient-card border-primary/20 shadow-epic p-6 text-center hover:shadow-divine transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {mythology.icon}
                </div>
                
                <h4 className="font-cinzel text-xl font-bold text-primary mb-2">
                  {mythology.name}
                </h4>
                
                <p className="font-inter text-sm text-muted-foreground mb-4">
                  {mythology.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-inter text-sm text-muted-foreground">Maestria</span>
                    <span className="font-cinzel font-bold text-primary">{mythology.mastery}%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-divine h-2 rounded-full transition-all duration-700 group-hover:animate-glow-pulse"
                      style={{ width: `${mythology.mastery}%` }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;