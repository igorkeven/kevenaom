export type Profile = {
  id: string;
  updated_at: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

export type ForumPost = {
  id: number;
  created_at: string;
  title: string;
  content: string | null;
  category: 'Estratégia' | 'Dúvidas' | 'Replays' | 'Off-topic';
  author: Profile | null;
  replies: { count: number }[];
};

export type ForumReply = {
  id: number;
  created_at: string;
  content: string;
  post_id: number;
  author: Profile | null;
};