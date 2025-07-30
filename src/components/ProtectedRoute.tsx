import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // Pode adicionar um spinner de carregamento aqui
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!user) {
    // Redireciona para a página inicial se não estiver logado
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Renderiza a página filha (ex: Dashboard)
};

export default ProtectedRoute;