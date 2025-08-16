import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';
import type { Profile } from '@/types';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Evita upsert duplicado durante mudanças rápidas de sessão
  const ensuredProfileForUserId = useRef<string | null>(null);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      // loga, mas não quebra a UI
      console.error('Erro carregando profile:', error.message);
      setProfile(null);
      return;
    }

    setProfile((data as Profile) ?? null);
  };

  const ensureProfileRow = async (u: User) => {
    if (!u?.id) return;

    // debouncing simples para não rodar 2x
    if (ensuredProfileForUserId.current === u.id) {
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', u.id)
      .maybeSingle();

    if (!data && !error) {
      const { error: upsertError } = await supabase.from('profiles').upsert({
        id: u.id,
        avatar_url: (u.user_metadata as any)?.avatar_url ?? null,
        full_name: (u.user_metadata as any)?.full_name ?? null,
      });
      if (upsertError) {
        console.error('Erro criando profile:', upsertError.message);
      }
    }

    ensuredProfileForUserId.current = u.id;
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    // sessão inicial
    (async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session ?? null);
      setUser(session?.user ?? null);
      if (session?.user) {
        await ensureProfileRow(session.user);
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    })();

    // listener de auth
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession ?? null);
      const newUser = newSession?.user ?? null;
      setUser(newUser);

      if (newUser) {
        await ensureProfileRow(newUser);
        await fetchProfile(newUser.id);
      } else {
        ensuredProfileForUserId.current = null;
        setProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = { session, user, profile, loading, refreshProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
