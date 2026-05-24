import React from 'react';
import { 
  LayoutDashboard, 
  Megaphone,
  Users,
  Package, 
  LifeBuoy, 
  Activity, 
  Map as MapIcon,
  GraduationCap,
  HardHat, 
  FileText, 
  ShieldAlert, 
  Info,
  LogOut, 
  User 
} from 'lucide-react';
import { TabType } from '../types';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  session?: Session;
  isChefia?: boolean;
}

export function Sidebar({ activeTab, setActiveTab, session, isChefia }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'comunicados', label: 'Comunicados', icon: Megaphone },
    { id: 'rh', label: 'Meu RH', icon: Users },
    { id: 'pedidos', label: 'Pedidos', icon: Package },
    { id: 'suporte', label: 'Suporte', icon: LifeBuoy },
    { id: 'maquinas', label: 'Máquinas', icon: Activity, hiddenForChefia: true },
    { id: 'mapa', label: 'Mapa da empresa', icon: MapIcon },
    { id: 'treinamentos', label: 'Treinamentos', icon: GraduationCap, hiddenForChefia: true },
    { id: 'epi', label: 'EPI', icon: HardHat, hiddenForChefia: true },
    { id: 'documentos', label: 'Documentos', icon: FileText, hiddenForChefia: true },
    { id: 'denuncias', label: 'Denúncias', icon: ShieldAlert },
    { id: 'sobre', label: 'Sobre', icon: Info },
  ].filter(item => !(isChefia && item.hiddenForChefia));

  const handleLogout = async () => {
    if (session?.user?.id?.startsWith('temp-')) {
      window.location.reload();
      return;
    }
    await supabase.auth.signOut();
  };

  return (
    <aside className="w-64 bg-[#0a1220] flex flex-col h-full text-slate-300">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 text-white text-xs font-bold px-2 py-1.5 rounded border border-white/10 tracking-widest">
            YZ
          </div>
          <span className="text-white font-bold text-lg tracking-wide">Metalúrgica <span className="text-[#00A3FF]">YZ</span></span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                isActive 
                  ? 'bg-[#15233b] text-white border border-[#2a3f5f]' 
                  : 'hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-[#00A3FF]' : 'text-slate-400'} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer Area */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <button 
          onClick={() => setActiveTab('perfil')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors text-left"
        >
          <div className="bg-slate-800 p-1.5 rounded-full text-slate-300 shrink-0">
            <User size={16} />
          </div>
          <span className="truncate text-xs text-slate-300">{session?.user?.email || 'Usuário'}</span>
        </button>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-slate-400 hover:text-white"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
}
