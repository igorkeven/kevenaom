import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/Home';
import ReplaysPage from './pages/Replays';
import ForumPage from './pages/ForumPage';
import DashboardPage from './pages/DashboardPage';
import ForumPostPage from './pages/ForumPostPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import { useAuth } from './contexts/AuthContext';
import { CompleteProfileModal } from './components/CompleteProfileModal';


function App() {
  const { user, profile, loading } = useAuth();
  const isProfileIncomplete = !!user && !loading && !profile?.username;


  return (
    <>
      <Header />
      <main>
        <CompleteProfileModal isOpen={isProfileIncomplete} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/replays" element={<ReplaysPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/:postId" element={<ForumPostPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/settings" element={<AccountSettingsPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  
  );
}

export default App;
