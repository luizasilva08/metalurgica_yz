import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { BarChart3, LineChart, PieChart, Activity, Droplets, Zap, ShieldAlert, LogIn, HardHat, TrendingUp, Package, MapIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function ChefiaDashboard({ session, setActiveTab }: { session?: Session, setActiveTab?: (tab: any) => void }) {
  const userName = session?.user?.user_metadata?.full_name || 'Gestor';

  const [denuncias, setDenuncias] = useState<any[]>([]);
  const [epis, setEpis] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Denuncias (Reclamações/Áreas de atenção dashboard adaptation)
        const { data: dData } = await supabase.from('denuncias').select('*').order('data_registro', { ascending: false }).limit(3);
        if (dData) setDenuncias(dData);

        // Fetch EPIs
        const { data: epiData } = await supabase.from('epis').select('*, profiles(nome)').order('data_solicitacao', { ascending: false }).limit(3);
        if (epiData) setEpis(epiData);

        // Fetch Logs (Registro de logins simulado em tabela 'logs' ou usando base customizada)
        const { data: logsData } = await supabase.from('logs').select('*').order('created_at', { ascending: false }).limit(3);
        if (logsData) setLogs(logsData);

      } catch (err) {
        console.error("Error fetching data for ChefiaDashboard", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0a1220] tracking-tight">Painel da Gestão</h1>
          <p className="text-slate-500 mt-2">Visão consolidada de indicadores e controles gerenciais.</p>
        </div>
      </div>

      {/* Indicadores Power BI */}
      <div>
        <h2 className="text-lg font-semibold text-[#0a1220] mb-4 flex items-center gap-2">
          <Activity size={20} className="text-[#009DE0]" />
          Indicadores Estratégicos (Power BI)
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Lucro e Máquinas / Fábrica Global (Destaques) */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-[350px]">
             <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
               <TrendingUp size={16} className="text-emerald-600" />
               <span className="font-semibold text-sm text-[#0a1220]">Lucro</span>
             </div>
             <div className="flex-1 bg-slate-100 flex items-center justify-center p-4">
                <div className="text-center">
                  <BarChart3 size={32} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm text-slate-400">Espaço para iframe do Power BI</p>
                  <p className="text-xs text-slate-400 font-mono mt-1">src="URL_LUCRO"</p>
                </div>
             </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-[350px]">
             <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
               <Activity size={16} className="text-[#009DE0]" />
               <span className="font-semibold text-sm text-[#0a1220]">Status das Máquinas/Fábrica (Global)</span>
             </div>
             <div className="flex-1 bg-slate-100 flex items-center justify-center p-4">
                <div className="text-center">
                  <LineChart size={32} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm text-slate-400">Espaço para iframe do Power BI</p>
                  <p className="text-xs text-slate-400 font-mono mt-1">src="URL_STATUS_MAQUINAS"</p>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Desperdício e Energia, Matéria Prima */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-[280px]">
             <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
               <div className="flex -space-x-1">
                 <Droplets size={16} className="text-amber-500" />
                 <Zap size={16} className="text-yellow-500" />
               </div>
               <span className="font-semibold text-sm text-[#0a1220]">Desperdício e Consumo Energético</span>
             </div>
             <div className="flex-1 bg-slate-100 flex items-center justify-center p-4">
                <div className="text-center">
                  <PieChart size={24} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-xs text-slate-400">Iframe Power BI</p>
                </div>
             </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-[280px]">
             <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
               <Package size={16} className="text-indigo-500" />
               <span className="font-semibold text-sm text-[#0a1220]">Matéria-Prima</span>
             </div>
             <div className="flex-1 bg-slate-100 flex items-center justify-center p-4">
                <div className="text-center">
                  <BarChart3 size={24} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-xs text-slate-400">Iframe Power BI</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Controles e Operações (HTML) */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <h2 className="text-lg font-semibold text-[#0a1220] mb-6 flex items-center gap-2">
          <ShieldAlert size={20} className="text-slate-600" />
          Controles Operacionais
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mapa de Áreas de Reclamações e Risco */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-[#0a1220] mb-4 flex items-center gap-2 text-sm">
              <MapIcon size={16} className="text-rose-500" />
              Áreas de Reclamações / Riscos
            </h3>
            
            <div className="relative overflow-hidden min-h-[350px] rounded-lg border border-slate-100 bg-slate-50 p-2">
               <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0a1220_1px,transparent_1px)] [background-size:20px_20px]"></div>
               <div className="relative flex flex-col gap-2 h-full min-h-[330px]">
                 <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex-1 flex flex-col justify-center items-center text-emerald-700 relative group transition-colors hover:bg-emerald-100">
                    <span className="font-bold text-sm">Administração</span>
                    <span className="text-[10px] mt-1 px-2 py-0.5 bg-white rounded-full border border-emerald-100 shadow-sm">Risco Baixo • 0 relatos</span>
                 </div>
                 
                 <div className="flex gap-2 flex-[2]">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex-1 flex flex-col justify-center items-center text-amber-700 relative group transition-colors hover:bg-amber-100">
                      <span className="font-bold text-sm text-center">Montagem</span>
                      <span className="text-[10px] mt-1 px-2 py-0.5 bg-white rounded-full border border-amber-100 shadow-sm">Risco Médio • 5 relatos</span>
                    </div>
                    
                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 flex-[1.5] flex flex-col justify-center items-center text-rose-700 relative group transition-colors hover:bg-rose-100">
                      <span className="font-bold text-sm text-center">Usinagem Pesada</span>
                      <span className="text-[10px] mt-1 px-2 py-0.5 bg-white rounded-full border border-rose-100 shadow-sm">Alto Risco • 14 relatos</span>
                    </div>
                 </div>
                 
                 <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex-1 flex flex-col justify-center items-center text-emerald-700 relative group transition-colors hover:bg-emerald-100">
                    <span className="font-bold text-sm text-center">Logística e Expedição</span>
                    <span className="text-[10px] mt-1 px-2 py-0.5 bg-white rounded-full border border-emerald-100 shadow-sm">Risco Normal • 2 relatos</span>
                 </div>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Controle de EPIs */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-[#0a1220] mb-4 flex items-center gap-2 text-sm">
                <HardHat size={16} className="text-amber-500" />
                Sistema de Controle de EPIs
              </h3>
              <div className="space-y-3">
                {epis.length > 0 ? epis.map((req, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border border-slate-100 rounded-lg">
                    <div>
                      <span className="text-sm font-medium text-[#0a1220]">{req.equipamento}</span>
                      <p className="text-xs text-slate-500 mt-0.5">{req.profiles?.nome || 'Operador'} • {new Date(req.data_solicitacao).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                      req.status === 'Pendente' ? 'bg-amber-100 text-amber-700' : 
                      req.status === 'Aprovado' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                )) : (
                  <p className="text-sm text-slate-500 text-center py-4 border border-dashed rounded-lg">Nenhum EPI solicitado.</p>
                )}
              </div>
            </div>

            {/* Registro de Logins */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-[#0a1220] mb-4 flex items-center gap-2 text-sm">
                <LogIn size={16} className="text-slate-500" />
                Registro de Logins Recentes
              </h3>
              <div className="space-y-2">
                {logs.length > 0 ? logs.map((log, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <div className="flex flex-col">
                      <span className="text-sm text-[#0a1220]">{log.nome || log.usuario || 'Usuário do sistema'}</span>
                      <span className="text-[10px] text-slate-400">{log.acao || 'Login realizado'}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      {new Date(log.created_at || log.data).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                )) : (
                  <p className="text-sm text-slate-500 text-center py-4 border border-dashed rounded-lg">Nenhum login registrado recentemente no DB.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
