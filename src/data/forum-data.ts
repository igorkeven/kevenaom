export type ForumPost = {
  id: number;
  title: string;
  category: 'Estratégia' | 'Dúvidas' | 'Replays' | 'Off-topic';
  author: {
    name: string;
    isTopPlayer?: boolean;
  };
  replies: number;
  views: number;
  lastActivity: string;
};

export const forumPosts: ForumPost[] = [
  {
    id: 1,
    title: 'Qual a melhor build order para Nórdicos em mapas de água?',
    category: 'Estratégia',
    author: { name: 'Keven AOM', isTopPlayer: true },
    replies: 42,
    views: 1800,
    lastActivity: '2 horas atrás',
  },
  {
    id: 2,
    title: 'Como counterar um rush de Múrmilos com Egípcios?',
    category: 'Dúvidas',
    author: { name: 'Guerreiro_Zeus' },
    replies: 15,
    views: 950,
    lastActivity: '5 horas atrás',
  },
  {
    id: 3,
    title: 'Análise de Replay: Partida insana entre Top 1 e Top 2',
    category: 'Replays',
    author: { name: 'MythologyFan' },
    replies: 8,
    views: 2300,
    lastActivity: '1 dia atrás',
  },
  {
    id: 4,
    title: 'Qual a sua unidade mítica favorita e por quê?',
    category: 'Off-topic',
    author: { name: 'Loki_Trickster' },
    replies: 123,
    views: 5400,
    lastActivity: '3 dias atrás',
  },
];