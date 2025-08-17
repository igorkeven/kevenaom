import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Check, BrainCircuit, Target, TrendingUp, Map, MousePointerClick } from "lucide-react";

const Consultancy = () => {
  // seu número WhatsApp (DDI+DDD+numero, só dígitos)
  const WHATSAPP = "5599999999999";

  // mensagens diferentes por plano
  const makeWaLink = (slug: string) => {
    let text = "";

    if (slug === "analise") {
      text =
        `Olá! Vim do site Keven AOM e quero **Análise de Replay**.\n` +
        `Nick: ______\n` +
        `Civilização: ______  |  Elo/MMR: ______\n` +
        `Link/arquivo do replay: ______\n` +
        `Pontos que quero focar: ______`;
    } else if (slug === "sessao") {
      text =
        `Olá! Vim do site Keven AOM e quero **Sessão Ao Vivo (1h)**.\n` +
        `Nick: ______  |  Elo/MMR: ______\n` +
        `Disponibilidade (dias/horários): ______\n` +
        `Discord: ______\n` +
        `Objetivos principais: ______`;
    } else if (slug === "mestre") {
      text =
        `Olá! Vim do site Keven AOM e quero o **Pacote Mestre** (4 sessões + análises).\n` +
        `Nick: ______  |  Elo/MMR: ______\n` +
        `Disponibilidade: ______\n` +
        `Objetivos no mês: ______`;
    } else {
      text = `Olá! Vim do site Keven AOM e quero saber mais sobre consultoria.`;
    }

    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  };

  const plans = [
    {
      slug: "analise",
      title: "Análise de Replay",
      price: "R$ 49",
      description: "Uma análise técnica e detalhada de uma de suas partidas para identificar erros críticos e oportunidades de melhoria.",
      features: [
        "Relatório completo de pontos fortes e fracos",
        "Dicas de posicionamento e tomada de decisão",
        "Sugestões de build orders alternativas",
      ],
      cta: "Analisar meu Replay",
      variant: "warrior" as const,
    },
    {
      slug: "sessao",
      title: "Sessão Ao Vivo",
      price: "R$ 99",
      description: "Uma hora de treinamento individual e focado em suas maiores dificuldades para uma evolução acelerada.",
      features: [
        "Coaching em tempo real via Discord",
        "Análise de mecânicas e estratégias",
        "Sessão de Perguntas e Respostas",
        "Gravação da aula para rever depois",
      ],
      cta: "Agendar Sessão",
      variant: "divine" as const,
      popular: true,
    },
    {
      slug: "mestre",
      title: "Pacote Mestre",
      price: "R$ 249",
      description: "O plano definitivo para quem busca consistência e um lugar nos rankings mais altos do jogo.",
      features: [
        "4 Sessões Ao Vivo (1 por semana)",
        "Análise ilimitada de replays durante o mês",
        "Plano de treino 100% personalizado",
        "Acesso direto via WhatsApp para dúvidas",
      ],
      cta: "Tornar-se Mestre",
      variant: "heroic" as const,
    }
  ];

  const skills = [
    { icon: BrainCircuit, label: "Estratégia Avançada" },
    { icon: MousePointerClick, label: "Micro Perfeito" },
    { icon: Map, label: "Leitura de Jogo" },
    { icon: TrendingUp, label: "Mentalidade Vencedora" }
  ];

  return (
    <section id="consultoria" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-6">
            <Zap className="w-5 h-5 text-primary animate-glow-pulse" />
            <span className="font-cinzel text-sm text-primary font-semibold tracking-wide">
              CONSULTORIA ÉPICA
            </span>
          </div>

          <h2 className="font-cinzel-decorative text-4xl md:text-5xl font-bold text-foreground mb-6">
            Eleve seu Jogo ao Nível <span className="text-transparent bg-gradient-divine bg-clip-text">Divino</span>
          </h2>

          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cansado de perder para as mesmas táticas? Quer acelerar sua evolução e dominar seus oponentes? 
            Aprenda diretamente com o Top 10 do mundo e descubra os segredos que ninguém te conta.
          </p>
        </div>

        {/* Pricing/Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.slug}
              className={`bg-gradient-card border-primary/20 shadow-epic p-8 flex flex-col transition-all duration-300 hover:shadow-divine hover:-translate-y-2 relative ${plan.popular ? 'border-primary shadow-divine' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-divine text-primary-foreground font-cinzel text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                    MAIS POPULAR
                  </div>
                </div>
              )}

              <div className="flex-grow pt-4">
                <h3 className="font-cinzel-decorative text-2xl font-bold text-primary text-center mb-2">{plan.title}</h3>
                <p className="font-cinzel text-4xl font-bold text-foreground text-center mb-4">{plan.price}</p>
                <p className="font-inter text-sm text-muted-foreground text-center mb-8 h-16">{plan.description}</p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="font-inter text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botão que abre o WhatsApp com a mensagem do plano */}
              <Button variant={plan.variant} size="lg" className="w-full mt-auto" asChild>
                <a href={makeWaLink(plan.slug)} target="_blank" rel="noopener noreferrer" aria-label={plan.cta}>
                  {plan.cta}
                </a>
              </Button>
            </Card>
          ))}
        </div>

        {/* What you will master */}
        <div className="max-w-4xl mx-auto mt-24 text-center">
          <h3 className="font-cinzel-decorative text-3xl font-bold text-foreground mb-12">
            O Que Você Vai <span className="text-transparent bg-gradient-divine bg-clip-text">Dominar</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.label} className="flex flex-col items-center gap-3 group">
                  <div className="w-20 h-20 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full flex items-center justify-center shadow-epic group-hover:bg-primary/10 transition-all duration-300">
                    <Icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform"/>
                  </div>
                  <span className="font-cinzel font-semibold text-foreground text-center">{skill.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultancy;
