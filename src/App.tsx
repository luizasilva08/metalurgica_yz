import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TabType } from './types';
import { 
  Dashboard, 
  Pedidos, 
  Suporte, 
  Maquinas, 
  EPI, 
  Documentos, 
  Denuncias 
} from './components/Views';
import { 
  Comunicados, 
  MeuRH, 
  Mapa, 
  Sobre, 
  Perfil 
} from './components/OperatorViews';
import { Treinamentos } from './components/OperatorQuizzes';
import { ChefiaDashboard } from './components/ChefiaDashboard';
import { Login } from './components/Login';
import { LandingPage } from './components/LandingPage';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authView, setAuthView] = useState<'landing' | 'login' | 'signup'>('landing');

  const [tempSession, setTempSession] = useState<{ role: 'operador' | 'chefia', id: string } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Sincronização em segundo plano para garantir que o profile exista
    // caso o usuário tenha sido criado antes das tabelas ou trigger falhar
    if (session?.user) {
      const syncProfile = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', session.user.id)
            .single();
            
          if (error && error.code === 'PGRST116') {
            const emailName = session.user.email?.split('@')[0].split(/[._]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || 'Operador';
            const crachaMatch = session.user.email?.match(/^(\d+)@/);
            
            const { error: insertError } = await supabase.from('profiles').insert([
              {
                id: session.user.id,
                nome: session.user.user_metadata?.full_name || emailName,
                email: session.user.email,
                cracha: crachaMatch ? crachaMatch[1] : String(Math.floor(10000 + Math.random() * 90000)),
                setor: 'Usinagem'
              }
            ]);
            
            if (insertError) {
              console.error('Err syncing profile insert erro:', insertError);
            }
          }
        } catch (e) {
          console.error('Err syncing profile', e);
        }
      };
      syncProfile();
    }
  }, [session]);

  const handleTempLogin = (role: 'operador' | 'chefia') => {
    setTempSession({ role, id: 'temp-' + role });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-[#009DE0]/30 border-t-[#009DE0] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session && !tempSession) {
    if (authView === 'landing') {
      return (
        <LandingPage 
          onLoginClick={(isSignUp) => setAuthView(isSignUp ? 'signup' : 'login')} 
        />
      );
    }

    return (
      <Login 
        onLoginSuccess={() => {}} 
        defaultState={authView === 'signup' ? 'register' : 'login'}
        onBack={() => setAuthView('landing')}
        onTempLogin={handleTempLogin}
      />
    );
  }

  const activeSessionData = tempSession 
    ? { 
        user: { 
          id: tempSession.id, 
          email: `${tempSession.role}@temp.local`,
          user_metadata: { full_name: tempSession.role === 'chefia' ? 'Gestor Temp' : 'Operador Temp' } 
        } 
      } as unknown as Session
    : session;

  const isChefia = activeSessionData?.user?.email?.includes('chefia') || activeSessionData?.user?.user_metadata?.full_name?.includes('Gestor');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return isChefia ? <ChefiaDashboard session={activeSessionData} setActiveTab={setActiveTab} /> : <Dashboard session={activeSessionData} setActiveTab={setActiveTab} />;
      case 'comunicados': return <Comunicados />;
      case 'rh': return <MeuRH />;
      case 'pedidos': return <Pedidos />;
      case 'suporte': return <Suporte />;
      case 'maquinas': return <Maquinas />;
      case 'mapa': return <Mapa />;
      case 'treinamentos': return <Treinamentos />;
      case 'epi': return <EPI />;
      case 'documentos': return <Documentos />;
      case 'denuncias': return <Denuncias />;
      case 'sobre': return <Sobre />;
      case 'perfil': return <Perfil session={activeSessionData} />;
      default: return isChefia ? <ChefiaDashboard session={activeSessionData} setActiveTab={setActiveTab} /> : <Dashboard session={activeSessionData} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} session={activeSessionData} isChefia={isChefia} />
      
      <main className="flex-1 overflow-y-auto px-8 py-10 relative">
        {renderContent()}
      </main>
    </div>
  );
}

