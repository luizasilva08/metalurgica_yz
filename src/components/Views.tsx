import React, { useState, useEffect } from 'react';
import { Package, LifeBuoy, HardHat, Activity, FileText, ShieldAlert, Download, Plus } from 'lucide-react';
import { PedidoModal, ChamadoModal, EPIModal, DenunciaModal } from './Modals';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export function Dashboard({ session, setActiveTab }: { session?: Session, setActiveTab?: (tab: any) => void }) {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-sm text-slate-500 mb-1">Bem-vindo(a) de volta,</h2>
        <h1 className="text-2xl font-bold text-[#0a1220]">{session?.user?.email || 'Usuário'}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Package, value: '0', label: 'Pedidos', color: 'text-blue-500', bg: 'bg-blue-50', tab: 'pedidos' },
          { icon: LifeBuoy, value: '0', label: 'Chamados abertos', color: 'text-sky-500', bg: 'bg-sky-50', tab: 'suporte' },
          { icon: HardHat, value: '0', label: 'EPI pendentes', color: 'text-amber-500', bg: 'bg-amber-50', tab: 'epi' },
          { icon: Activity, value: '0', label: 'Máquinas em atenção', color: 'text-red-500', bg: 'bg-red-50', tab: 'maquinas' },
        ].map((stat, i) => (
          <div 
            key={i} 
            onClick={() => setActiveTab?.(stat.tab)}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 cursor-pointer hover:border-[#009DE0] transition-colors"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={18} />
            </div>
            <div>
              <span className="text-2xl font-bold block text-slate-900">{stat.value}</span>
              <span className="text-sm text-slate-500">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#0a1220] mb-4">Atalhos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => setActiveTab?.('documentos')}
            className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="bg-[#0a1220] p-3 rounded-lg text-[#00A3FF]">
              <FileText size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#0a1220]">Documentos técnicos</h4>
              <p className="text-xs text-slate-500">Manuais, datasheets, certificados</p>
            </div>
          </div>
          <div 
            onClick={() => setActiveTab?.('denuncias')}
            className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="bg-[#0a1220] p-3 rounded-lg text-[#00A3FF]">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#0a1220]">Canal de denúncias</h4>
              <p className="text-xs text-slate-500">Reporte ocorrências com sigilo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Pedidos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPedidos = async () => {
    try {
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .order('data_pedido', { ascending: false });

      if (error) throw error;
      setPedidos(data || []);
    } catch (error) {
      console.error('Error fetching pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1220]">Pedidos e rastreamento</h1>
          <p className="text-sm text-slate-500 mt-1">Acompanhe o ciclo de vida de cada pedido.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-[#009DE0] hover:bg-[#0085C0] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} /> Novo pedido
        </button>
      </div>
      
      {loading ? (
        <div className="border border-slate-200 bg-white rounded-xl h-32 flex items-center justify-center text-slate-500 text-sm">
          Carregando...
        </div>
      ) : pedidos.length === 0 ? (
        <div className="border border-slate-200 bg-white rounded-xl h-64 flex flex-col items-center justify-center text-slate-400">
          <Package size={32} className="mb-3 opacity-50" />
          <p className="text-sm text-slate-500">Você ainda não tem pedidos.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
          {pedidos.map(p => (
            <div key={p.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <h3 className="font-semibold text-slate-900">{p.produto} <span className="text-sm text-slate-500 ml-2 font-normal">x{p.quantidade}</span></h3>
                <p className="text-sm text-slate-500">{new Date(p.data_pedido || p.created_at).toLocaleDateString()} • Total: R$ {p.total}</p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${p.status === 'Pendente' ? 'bg-amber-100 text-amber-700' : 
                    p.status === 'Em separação' ? 'bg-blue-100 text-blue-700' : 
                    p.status === 'Enviado' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}
                `}>
                  {p.status || 'Pendente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <PedidoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSuccess={fetchPedidos} />
    </div>
  );
}

export function Suporte() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chamados, setChamados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChamados = async () => {
    try {
      const { data, error } = await supabase
        .from('chamados')
        .select('*')
        .order('data_abertura', { ascending: false });

      if (error) throw error;
      setChamados(data || []);
    } catch (error) {
      console.error('Error fetching chamados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChamados();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1220]">Suporte técnico</h1>
          <p className="text-sm text-slate-500 mt-1">Abra chamados e acompanhe o andamento do atendimento.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-[#009DE0] hover:bg-[#0085C0] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} /> Novo chamado
        </button>
      </div>

      {loading ? (
        <div className="border border-slate-200 bg-white rounded-xl h-32 flex items-center justify-center text-slate-500 text-sm">
          Carregando...
        </div>
      ) : chamados.length === 0 ? (
        <div className="border border-slate-200 bg-white rounded-xl h-64 flex flex-col items-center justify-center text-slate-400">
          <LifeBuoy size={32} className="mb-3 opacity-50" />
          <p className="text-sm text-slate-500">Você não tem chamados abertos.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
          {chamados.map(c => (
            <div key={c.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <h3 className="font-semibold text-slate-900">{c.titulo}</h3>
                <p className="text-sm text-slate-500">{new Date(c.data_abertura).toLocaleDateString()} • {c.equipamento || 'Sem equipamento vinculado'}</p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${c.status === 'Aberto' ? 'bg-amber-100 text-amber-700' : 
                    c.status === 'Em andamento' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}
                `}>
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <ChamadoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSuccess={fetchChamados} />
    </div>
  );
}

export function Maquinas() {
  const [machines, setMachines] = useState([
    { id: 1, name: 'Torno CNC Romi GL-240', status: 'Operando', code: '#TRN-014', uptime: 'desde 06:12', progress: [40, 50, 45, 60, 70, 75, 80], current: 82, color: 'emerald' },
    { id: 2, name: 'Fresadora Diplomat 3001', status: 'Operando', code: '#FRS-007', uptime: 'desde 07:30', progress: [20, 30, 40, 45, 55, 65, 68], current: 70, color: 'emerald' },
    { id: 3, name: 'Solda MIG Esab Smashweld', status: 'Manutenção', code: '#SLD-003', uptime: 'desde ontem', progress: [80, 85, 70, 50, 20, 10, 22], current: 22, color: 'amber' },
    { id: 4, name: 'Prensa hidráulica 80T', status: 'Operando', code: '#PRT-002', uptime: 'desde 06:00', progress: [50, 60, 55, 65, 65, 60, 67], current: 67, color: 'emerald' },
    { id: 5, name: 'Compressor Schulz SRP 4030', status: 'Atenção', code: '#CMP-001', uptime: 'desde 05:45', progress: [90, 88, 85, 75, 70, 60, 55], current: 55, color: 'red' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prev => prev.map(m => {
        const nextValue = Math.max(10, Math.min(100, m.current + (Math.random() * 10 - 5)));
        const nextProgress = [...m.progress.slice(1), nextValue];
        return {
          ...m,
          current: Math.round(nextValue),
          progress: nextProgress
        };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getPath = (data: number[]) => {
    // scale 0-100 to y 40-0, x 0-100 to 0-120
    const points = data.map((d, i) => `${(i / (data.length - 1)) * 120},${40 - (d / 100) * 40}`);
    return `M ${points.join(' L ')}`;
  };

  const getAreaPath = (data: number[]) => {
    const p = getPath(data);
    return `${p} L 120,40 L 0,40 Z`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-[#0a1220]">Status de máquinas</h1>
        <p className="text-sm text-slate-500 mt-1">Equipamentos do seu setor com status operacional em tempo real.</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
        {machines.map((m) => (
          <div key={m.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
            <div className="w-64">
              <h3 className="font-semibold text-[#0a1220]">{m.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{m.code} • {m.uptime}</p>
            </div>
            
            <div className="flex-1 flex justify-center items-center gap-6">
              <div className="w-32 h-10 relative">
                <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible">
                  <path 
                    d={getAreaPath(m.progress)} 
                    fill={`var(--color-${m.color}-100, #ecfdf5)`} 
                    className={
                      m.color === 'emerald' ? 'fill-emerald-100' : 
                      m.color === 'amber' ? 'fill-amber-100' : 'fill-red-100'
                    }
                  />
                  <path 
                    d={getPath(m.progress)} 
                    fill="none" 
                    stroke={`var(--color-${m.color}-500, #10b981)`} 
                    strokeWidth="2"
                    strokeLinejoin="round"
                    className={
                      m.color === 'emerald' ? 'stroke-emerald-500' : 
                      m.color === 'amber' ? 'stroke-amber-500' : 'stroke-red-500'
                    }
                  />
                </svg>
              </div>
              <div className="w-12 text-center text-[#0a1220] font-medium">
                {m.current}%
                <span className="block text-[10px] text-slate-400 font-normal">USO</span>
              </div>
            </div>

            <div className="w-32 flex justify-end">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                m.status === 'Operando' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                m.status === 'Manutenção' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                'bg-red-50 text-red-600 border border-red-200'
              }`}>
                {m.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EPI() {
  const [modalOpen, setModalOpen] = useState(false);
  const [epis, setEpis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEpis = async () => {
    try {
      const { data, error } = await supabase
        .from('epis')
        .select('*')
        .order('data_solicitacao', { ascending: false });

      if (error) throw error;
      setEpis(data || []);
    } catch (error) {
      console.error('Error fetching epis:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpis();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1220]">Retirada de EPI</h1>
          <p className="text-sm text-slate-500 mt-1">Solicite equipamentos de proteção individual e acompanhe a aprovação.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-[#009DE0] hover:bg-[#0085C0] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} /> Solicitar EPI
        </button>
      </div>
      
      {loading ? (
        <div className="border border-slate-200 bg-white rounded-xl h-32 flex items-center justify-center text-slate-500 text-sm">
          Carregando...
        </div>
      ) : epis.length === 0 ? (
        <div className="border border-slate-200 bg-white rounded-xl h-64 flex flex-col items-center justify-center text-slate-400">
          <HardHat size={32} className="mb-3 opacity-50" />
          <p className="text-sm text-slate-500">Nenhuma solicitação ainda.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
          {epis.map(e => (
            <div key={e.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <h3 className="font-semibold text-slate-900">{e.equipamento}</h3>
                <p className="text-sm text-slate-500">{new Date(e.data_solicitacao).toLocaleDateString()} • Tamanho: {e.tamanho || 'Não especificado'}</p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${e.status === 'Pendente' ? 'bg-amber-100 text-amber-700' : 
                    e.status === 'Aprovado' ? 'bg-emerald-100 text-emerald-700' : 
                    e.status === 'Entregue' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}
                `}>
                  {e.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <EPIModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSuccess={fetchEpis} />
    </div>
  );
}

export function Documentos() {
  const docs = [
    { type: 'MANUAL', title: 'Manual Motor W22 - Linha IR3', desc: 'Manual técnico completo da linha de motores W22 de alta eficiência', size: '4.7 MB' },
    { type: 'MANUAL', title: 'Manual Soft-Starter SSW900', desc: 'Guia de instalação e parametrização', size: '3.6 MB' },
    { type: 'DATASHEET', title: 'Datasheet Inversor CFW500', desc: 'Especificações técnicas do inversor de frequência CFW500', size: '1.2 MB' },
    { type: 'DATASHEET', title: 'Catálogo Redutores W', desc: 'Família completa de redutores industriais', size: '5.1 MB' },
    { type: 'CERTIFICADO', title: 'Certificado ISO 9001:2015', desc: 'Certificado de qualidade vigente até 2027', size: '0.4 MB' },
    { type: 'NORMA', title: 'NR-12 - Segurança em Máquinas', desc: 'Norma regulamentadora atualizada', size: '2.1 MB' },
  ];

  const grouped = docs.reduce((acc, doc) => {
    (acc[doc.type] = acc[doc.type] || []).push(doc);
    return acc;
  }, {} as Record<string, typeof docs>);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-[#0a1220]">Documentos técnicos</h1>
        <p className="text-sm text-slate-500 mt-1">Manuais, datasheets, certificados e normas.</p>
      </div>
      
      <div className="space-y-8 mt-8">
        {Object.entries(grouped).map(([type, items]) => (
          <div key={type}>
            <h3 className="text-xs font-semibold text-slate-500 mb-3 tracking-wider">{type}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((doc, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-4 hover:border-slate-300 transition-colors">
                  <div className="bg-slate-100 p-2.5 rounded-lg text-slate-600 shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-[#0a1220] truncate">{doc.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{doc.desc}</p>
                    <span className="text-xs text-slate-400 mt-2 block">{doc.size}</span>
                  </div>
                  <button className="text-slate-400 hover:text-[#009DE0] p-2 transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Denuncias() {
  const [modalOpen, setModalOpen] = useState(false);
  const [denuncias, setDenuncias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDenuncias = async () => {
    try {
      const { data, error } = await supabase
        .from('denuncias')
        .select('*')
        .order('data_registro', { ascending: false });

      if (error) throw error;
      setDenuncias(data || []);
    } catch (error) {
      console.error('Error fetching denuncias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDenuncias();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1220]">Canal de denúncias</h1>
          <p className="text-sm text-slate-500 mt-1">Reporte ocorrências com sigilo. Anônimo opcional. Apenas o autor e os administradores têm acesso.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-[#009DE0] hover:bg-[#0085C0] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={16} /> Nova denúncia
        </button>
      </div>

      {loading ? (
        <div className="border border-slate-200 bg-white rounded-xl h-32 flex items-center justify-center text-slate-500 text-sm">
          Carregando...
        </div>
      ) : denuncias.length === 0 ? (
        <div className="border border-slate-200 bg-white rounded-xl h-64 flex flex-col items-center justify-center text-slate-400">
          <ShieldAlert size={32} className="mb-3 opacity-50" />
          <p className="text-sm text-slate-500">Nenhuma denúncia visível para você.</p>
          <p className="text-xs text-slate-400 mt-1">Denúncias anônimas não aparecem aqui — apenas administradores as visualizam.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
          {denuncias.map(d => (
             <div key={d.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
               <div>
                 <h3 className="font-semibold text-slate-900">{d.titulo}</h3>
                 <p className="text-sm text-slate-500">{new Date(d.data_registro).toLocaleDateString()} • {d.categoria}</p>
               </div>
               <div>
                 <span className={`px-3 py-1 rounded-full text-xs font-semibold
                   ${d.status === 'Em análise' ? 'bg-amber-100 text-amber-700' : 
                     d.status === 'Em investigação' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}
                 `}>
                   {d.status}
                 </span>
               </div>
             </div>
          ))}
        </div>
      )}
      <DenunciaModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSuccess={fetchDenuncias} />
    </div>
  );
}
