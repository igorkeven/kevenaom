import { Button } from "@/components/ui/button";
import { Youtube, Zap, Crown, Shield } from "lucide-react";
// 1. Importe o seu vídeo. Certifique-se de que o caminho está correto.
import heroVideo from "@/assets/hero-video.mp4"; // <-- ATUALIZE ESTE CAMINHO para o seu arquivo de vídeo

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline // Essencial para autoplay em dispositivos móveis
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>
        <div className="absolute inset-0 bg-gradient-shadow" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Epic Badge */}
          <div className="inline-flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-8">
            <Crown className="w-5 h-5 text-primary animate-glow-pulse" />
            <span className="font-cinzel text-sm text-primary font-semibold tracking-wide">
              LEGENDARY PLAYER
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-cinzel-decorative text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
            <span className="text-transparent bg-gradient-divine bg-clip-text drop-shadow-lg">
              KEVEN AOM
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="font-cinzel text-xl md:text-2xl lg:text-3xl text-primary mb-4 tracking-wide">
            Master of Age of Mythology: Retold
          </h2>

          {/* Description */}
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Explore os segredos dos deuses antigos e domine as mitologias com um dos melhores jogadores do mundo. 
            Consultorias personalizadas, replays exclusivos e uma comunidade épica te aguardam.
          </p>

          {/* Epic Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-12">
            <div className="text-center">
              <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-4 shadow-epic">
                <div className="text-2xl md:text-3xl font-cinzel-decorative font-bold text-primary mb-1">
                  100K+
                </div>
                <div className="text-sm text-muted-foreground font-inter">
                  Inscritos
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-4 shadow-epic">
                <div className="text-2xl md:text-3xl font-cinzel-decorative font-bold text-primary mb-1">
                  1000+
                </div>
                <div className="text-sm text-muted-foreground font-inter">
                  Replays
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-4 shadow-epic">
                <div className="text-2xl md:text-3xl font-cinzel-decorative font-bold text-primary mb-1">
                  TOP 5
                </div>
                <div className="text-sm text-muted-foreground font-inter">
                  Mundial
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="divine" 
              size="xl"
              className="group"
              asChild
            >
              <a href="https://www.youtube.com/@kevenaom" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Assistir Canal
              </a>
            </Button>
            
            <Button 
              variant="heroic" 
              size="xl"
              className="group"
              asChild
            >
              <a href="#consultoria">
                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Consultoria Épica
              </a>
            </Button>

            <Button 
              variant="warrior" 
              size="xl"
              className="group"
              asChild
            >
              <a href="/replays">
                <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Baixar Replays
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 opacity-30 animate-float">
        <div className="w-8 h-8 bg-primary/20 rounded-full blur-sm" />
      </div>
      <div className="absolute top-1/3 right-16 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-12 bg-accent/20 rounded-full blur-sm" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 opacity-25 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-6 h-6 bg-secondary/20 rounded-full blur-sm" />
      </div>
    </section>
  );
};

export default Hero;