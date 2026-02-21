import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { SchoolSelector } from './components/SchoolSelector';
import { Dashboard } from './components/Dashboard';
import { MeetingsDashboard } from './components/MeetingsDashboard';
import { AnimatedBackgroundCSS } from './components/AnimatedBackgroundCSS';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { user, school, isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [appMode, setAppMode] = useState<'installments' | 'meetings'>('meetings');
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        <div className="fixed inset-0 gradient-mesh" />
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        {authView === 'login' ? (
          <LoginPage onSwitchToRegister={() => setAuthView('register')} />
        ) : (
          <RegisterPage onSwitchToLogin={() => setAuthView('login')} />
        )}
      </div>
    );
  }

  if (user?.role === 'architect' && !school) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        <div className="fixed inset-0 gradient-mesh" />
        <SchoolSelector />
      </div>
    );
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <AnimatedBackgroundCSS />
      <div className="relative z-10 h-full overflow-y-auto">
        {appMode === 'meetings' ? <MeetingsDashboard /> : <Dashboard />}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  );
}

export default App;