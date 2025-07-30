import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabaseClient';

const AccountSettingsPage = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Profile form state
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');

  // Password form state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setUsername(profile.username || '');
    }
  }, [profile]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoadingProfile(true);
    setSuccessMessage('');

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, username })
      .eq('id', user.id);

    if (!error) {
      setSuccessMessage('Perfil atualizado com sucesso!');
      await refreshProfile();
    }
    setLoadingProfile(false);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('As senhas não coincidem.');
      return;
    }
    if (password.length < 6) {
      setPasswordError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoadingPassword(true);
    setPasswordError('');
    setSuccessMessage('');

    const { error } = await supabase.auth.updateUser({ password });

    if (!error) {
      setSuccessMessage('Senha alterada com sucesso!');
      setPassword('');
      setConfirmPassword('');
    } else {
      setPasswordError(error.message);
    }
    setLoadingPassword(false);
  };

  return (
    <section id="account-settings" className="py-20 pt-32 bg-gradient-to-b from-background to-muted/20 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h1 className="font-cinzel-decorative text-4xl md:text-5xl font-bold text-foreground">
            Configurações da Conta
          </h1>
          <p className="font-inter text-lg text-muted-foreground mt-2">
            Gerencie suas informações e segurança.
          </p>
        </div>

        {successMessage && <p className="mb-4 text-center text-green-500 bg-green-500/10 p-3 rounded-md">{successMessage}</p>}

        <div className="grid gap-8">
          {/* Profile Information */}
          <Card className="bg-gradient-card border-primary/20 shadow-epic">
            <CardHeader>
              <CardTitle className="font-cinzel text-2xl text-primary">Informações do Perfil</CardTitle>
              <CardDescription className="font-inter">Atualize seu nome e como você é conhecido na comunidade.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email || ''} disabled />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="full-name">Nome Real</Label>
                  <Input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Nome no Jogo</Label>
                  <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <Button type="submit" variant="divine" disabled={loadingProfile}>
                  {loadingProfile ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Change Password */}
          {user?.app_metadata.provider === 'email' && (
            <Card className="bg-gradient-card border-primary/20 shadow-epic">
              <CardHeader>
                <CardTitle className="font-cinzel text-2xl text-primary">Alterar Senha</CardTitle>
                <CardDescription className="font-inter">Escolha uma nova senha forte.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                  {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                  <Button type="submit" variant="warrior" disabled={loadingPassword}>
                    {loadingPassword ? 'Alterando...' : 'Alterar Senha'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default AccountSettingsPage;