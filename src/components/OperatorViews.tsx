import React, { useState, useEffect } from 'react';
import { Calendar, AlertCircle, Volume2, Users, FileText, Bell, Map as MapIcon, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export function Comunicados() {
  const comunicados = [
    {
      tipo: 'URGENTE',
      tempo: 'há 2 horas',
      titulo: 'Manutenção elétrica programada — sábado 24/05',
      desc: 'O setor de Usinagem ficará sem energia das 07h às 11h para troca do quadro principal. Planejem a produção da semana.',
      icon: AlertCircle,
      corIcone: 'text-red-500',
      bgIcone: 'bg-red-50'
    },
    {
      tipo: 'EVENTO',
      tempo: 'ontem',
      titulo: 'Confraternização de aniversário da Metalúrgica YZ — 18 anos',
      desc: 'Convidamos todos os colaboradores e familiares para o churrasco no dia 14/06, a partir das 12h, no galpão da fábrica em Caxias do Sul.',
      icon: Volume2,
      corIcone: 'text-emerald-500',
      bgIcone: 'bg-emerald-50'
    },
    {
      tipo: 'AVISO',
      tempo: 'há 3 dias',
      titulo: 'Nova escala de turno do setor de Soldagem',
      desc: 'A partir de 01/06 entra em vigor a nova escala 5x1. Procure o RH para retirar o documento assinado até 28/05.',
      icon: Calendar,
      corIcone: 'text-blue-500',
      bgIcone: 'bg-blue-50'
    },
    {
      tipo: 'COMUNICADO',
      tempo: 'há 5 dias',
      titulo: 'Reajuste do vale-alimentação',
      desc: 'Conforme acordo coletivo, o vale-alimentação foi reajustado em 7,2% e já estará disponível no cartão a partir do dia 30/05.',
      icon: Bell,
      corIcone: 'text-amber-500',
      bgIcone: 'bg-amber-50'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-[#0a1220]">Informativos e comunicados</h1>
        <p className="text-sm text-slate-500 mt-1">Avisos oficiais da Metalúrgica YZ para todos os colaboradores.</p>
      </div>

      <div className="space-y-4">
        {comunicados.map((item, i) => (
          <div key={i} className="bg-white border border-slate-200 p-5 rounded-xl flex gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.bgIcone} ${item.corIcone}`}>
              <item.icon size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-slate-500 tracking-wider">{item.tipo}</span>
                <span className="text-xs text-slate-400">• {item.tempo}</span>
              </div>
              <h3 className="text-[#0a1220] font-semibold text-lg">{item.titulo}</h3>
              <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MeuRH() {
  const [activeTab, setActiveTab] = useState('Saldo');

  const menu = [
    { dia: 'SEGUNDA 19/05', prato: 'Frango grelhado, arroz, feijão preto, farofa de cenoura, salada de alface e tomate', sobremesa: 'Maçã' },
    { dia: 'TERÇA 20/05', prato: 'Bife acebolado, arroz, feijão carioca, batata sauté, salada de repolho', sobremesa: 'Gelatina' },
    { dia: 'QUARTA 21/05', prato: 'Lasanha à bolonhesa, arroz branco, salada caesar', sobremesa: 'Banana' },
    { dia: 'QUINTA 22/05', prato: 'Peixe assado ao molho de ervas, purê de batata, brócolis no vapor', sobremesa: 'Pudim' },
    { dia: 'SEXTA 23/05', prato: 'Costela suína, polenta cremosa, feijão preto, salada mista', sobremesa: 'Mousse de maracujá' },
    { dia: 'SÁBADO 24/05', prato: 'Feijoada light, arroz, couve refogada, farofa, laranja', sobremesa: 'Doce de leite' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-[#0a1220]">Meu RH</h1>
        <p className="text-sm text-slate-500 mt-1">Acompanhe férias, folhas de pagamento, ponto e benefícios.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0 bg-white border border-slate-200 rounded-xl p-4">
          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Férias</h4>
              <button onClick={() => setActiveTab('Avisos')} className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 ${activeTab === 'Avisos' ? 'bg-slate-100 font-medium text-[#0a1220]' : 'text-slate-600 hover:bg-slate-50'}`}><Bell size={16}/> Avisos</button>
              <button onClick={() => setActiveTab('Recibos')} className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 ${activeTab === 'Recibos' ? 'bg-slate-100 font-medium text-[#0a1220]' : 'text-slate-600 hover:bg-slate-50'}`}><FileText size={16}/> Recibos</button>
              <button onClick={() => setActiveTab('Saldo')} className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 ${activeTab === 'Saldo' ? 'bg-slate-100 font-medium text-[#0a1220]' : 'text-slate-600 hover:bg-slate-50'}`}><Calendar size={16}/> Saldo</button>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Folhas</h4>
              <button onClick={() => setActiveTab('13º salário')} className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 ${activeTab === '13º salário' ? 'bg-slate-100 font-medium text-[#0a1220]' : 'text-slate-600 hover:bg-slate-50'}`}><Calendar size={16}/> 13º salário</button>
              <button onClick={() => setActiveTab('Folha de pagamento')} className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 ${activeTab === 'Folha de pagamento' ? 'bg-slate-100 font-medium text-[#0a1220]' : 'text-slate-600 hover:bg-slate-50'}`}><FileText size={16}/> Folha de pagamento</button>
              <button onClick={() => setActiveTab('PLR')} className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 ${activeTab === 'PLR' ? 'bg-slate-100 font-medium text-[#0a1220]' : 'text-slate-600 hover:bg-slate-50'}`}><FileText size={16}/> PLR</button>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Ponto</h4>
              <button onClick={() => setActiveTab('Banco de horas')} className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 ${activeTab === 'Banco de horas' ? 'bg-slate-100 font-medium text-[#0a1220]' : 'text-slate-600 hover:bg-slate-50'}`}><Calendar size={16}/> Banco de horas</button>
              <button onClick={() => setActiveTab('Horários da jornada')} className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 ${activeTab === 'Horários da jornada' ? 'bg-slate-100 font-medium text-[#0a1220]' : 'text-slate-600 hover:bg-slate-50'}`}><Calendar size={16}/> Horários da jornada</button>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Restaurante</h4>
              <button onClick={() => setActiveTab('Cardápios')} className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 ${activeTab === 'Cardápios' ? 'bg-slate-100 font-medium text-[#0a1220]' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Users size={16}/> Cardápios
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white border border-slate-200 rounded-xl p-6 min-h-[400px]">
            {activeTab === 'Avisos' && (
              <>
                <h2 className="text-lg font-semibold text-[#0a1220] mb-6">Avisos de férias</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">Próximo período aquisitivo</span>
                    <span className="font-medium text-[#0a1220]">04/2025 — 03/2026</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">Início programado</span>
                    <span className="font-medium text-[#0a1220]">22/09/2025</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">Duração</span>
                    <span className="font-medium text-[#0a1220]">20 dias corridos + 10 dias de abono</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">Status</span>
                    <span className="font-medium text-emerald-600">Aprovado pelo gestor</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-4">Confirme com o RH até 15 dias antes do início. Em caso de alteração, abra um chamado em Suporte.</p>
                </div>
              </>
            )}

            {activeTab === 'Recibos' && (
              <>
                <h2 className="text-lg font-semibold text-[#0a1220] mb-6">Recibos de férias</h2>
                <div className="space-y-3">
                  {[
                    { ano: '2024', periodo: '09/2024 — emitido em 28/08/2024', kb: '142 KB' },
                    { ano: '2023', periodo: '11/2023 — emitido em 30/10/2023', kb: '138 KB' },
                    { ano: '2022', periodo: '07/2022 — emitido em 28/06/2022', kb: '135 KB' }
                  ].map(doc => (
                    <div key={doc.ano} className="flex justify-between items-center p-4 border border-slate-100 rounded-lg hover:border-slate-300 transition-colors cursor-pointer group">
                      <div>
                        <h3 className="font-medium text-[#0a1220] group-hover:text-[#008ae6] transition-colors">Recibo de férias {doc.ano}</h3>
                        <p className="text-xs text-slate-500 mt-1">Período: {doc.periodo}</p>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400 text-xs">
                        <span>PDF • {doc.kb}</span>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        <span className="text-slate-300">›</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'Saldo' && (
              <>
                <h2 className="text-lg font-semibold text-[#0a1220] mb-6">Saldo de férias</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-6 border border-slate-200 rounded-xl">
                    <span className="text-3xl font-bold text-[#0a1220] block">30</span>
                    <span className="text-xs text-slate-500 mt-2 block">dias disponíveis</span>
                  </div>
                  <div className="p-6 border border-slate-200 rounded-xl">
                    <span className="text-3xl font-bold text-[#0a1220] block">10</span>
                    <span className="text-xs text-slate-500 mt-2 block">dias vendidos (abono)</span>
                  </div>
                  <div className="p-6 border border-slate-200 rounded-xl">
                    <span className="text-3xl font-bold text-[#0a1220] block">20</span>
                    <span className="text-xs text-slate-500 mt-2 block">dias a usufruir</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm">Período aquisitivo atual encerra em 03/2026. Programe-se com antecedência para evitar acúmulo.</p>
              </>
            )}

            {activeTab === '13º salário' && (
              <>
                <h2 className="text-lg font-semibold text-[#0a1220] mb-6">13º salário</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-2xl font-bold text-[#0a1220] block">R$ 2.140,00</span>
                    <span className="text-xs text-slate-500 mt-2 block">1ª parcela • paga em 30/11/2024</span>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-2xl font-bold text-[#0a1220] block">R$ 1.860,00</span>
                    <span className="text-xs text-slate-500 mt-2 block">2ª parcela • paga em 20/12/2024</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { ano: '2024', tipo: 'Integral', kb: '96 KB' },
                    { ano: '2023', tipo: 'Integral', kb: '94 KB' }
                  ].map(doc => (
                    <div key={doc.ano} className="flex justify-between items-center p-4 border border-slate-100 rounded-lg hover:border-slate-300 transition-colors cursor-pointer group">
                      <div>
                        <h3 className="font-medium text-[#0a1220] group-hover:text-[#008ae6] transition-colors">Demonstrativo 13º — {doc.ano}</h3>
                        <p className="text-xs text-slate-500 mt-1">{doc.tipo}</p>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400 text-xs">
                        <span>PDF • {doc.kb}</span>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        <span className="text-slate-300">›</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'Folha de pagamento' && (
              <>
                <h2 className="text-lg font-semibold text-[#0a1220] mb-6">Folha de pagamento</h2>
                <div className="space-y-3">
                  {[
                    { mes: 'Abril/2025', val: '3.847,21', kb: '88 KB' },
                    { mes: 'Março/2025', val: '3.802,40', kb: '86 KB' },
                    { mes: 'Fevereiro/2025', val: '3.795,10', kb: '86 KB' },
                    { mes: 'Janeiro/2025', val: '3.780,55', kb: '85 KB' },
                  ].map(doc => (
                    <div key={doc.mes} className="flex justify-between items-center p-4 border border-slate-100 rounded-lg hover:border-slate-300 transition-colors cursor-pointer group">
                      <div>
                        <h3 className="font-medium text-[#0a1220] group-hover:text-[#008ae6] transition-colors">Holerite — {doc.mes}</h3>
                        <p className="text-xs text-slate-500 mt-1">Líquido: R$ {doc.val}</p>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400 text-xs">
                        <span>PDF • {doc.kb}</span>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        <span className="text-slate-300">›</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'PLR' && (
              <>
                <h2 className="text-lg font-semibold text-[#0a1220] mb-6">Participação nos Lucros e Resultados (PLR)</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">Ciclo vigente</span>
                    <span className="font-medium text-[#0a1220]">2024 — pago em 03/2025</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">Meta da empresa</span>
                    <span className="font-medium text-emerald-600">92% atingida</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">Meta individual</span>
                    <span className="font-medium text-[#0a1220]">A</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">Valor recebido</span>
                    <span className="font-medium text-[#0a1220]">R$ 4.260,00</span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Banco de horas' && (
              <>
                <h2 className="text-lg font-semibold text-[#0a1220] mb-6">Banco de horas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="p-5 border border-slate-200 rounded-xl">
                    <span className="text-2xl font-bold text-[#0a1220] block">+12h 30min</span>
                    <span className="text-xs text-slate-500 mt-1 block">saldo atual</span>
                  </div>
                  <div className="p-5 border border-slate-200 rounded-xl">
                    <span className="text-2xl font-bold text-[#0a1220] block">+4h 10min</span>
                    <span className="text-xs text-slate-500 mt-1 block">entradas no mês</span>
                  </div>
                  <div className="p-5 border border-slate-200 rounded-xl">
                    <span className="text-2xl font-bold text-[#0a1220] block">-2h 00min</span>
                    <span className="text-xs text-slate-500 mt-1 block">compensações no mês</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  {[
                    { dia: '12/05 — entrada', desc: 'Hora extra autorizada • turno 2', bal: '+1h 30min', kb: '' },
                    { dia: '08/05 — compensação', desc: 'Saída antecipada autorizada', bal: '-2h 00min', kb: '' },
                    { dia: '02/05 — entrada', desc: 'Reposição feriado', bal: '+2h 40min', kb: '' },
                  ].map(doc => (
                    <div key={doc.dia} className="flex justify-between items-center p-4 border border-slate-100 rounded-lg hover:border-slate-300 transition-colors">
                      <div>
                        <h3 className="font-medium text-[#0a1220]">{doc.dia}</h3>
                        <p className="text-xs text-slate-500 mt-1">{doc.desc}</p>
                      </div>
                      <div className="flex items-center gap-4 text-slate-500 text-xs">
                        <span>{doc.bal}</span>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        <span className="text-slate-300">›</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'Horários da jornada' && (
              <>
                <h2 className="text-lg font-semibold text-[#0a1220] mb-6">Horários da jornada</h2>
                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">Turno</span>
                    <span className="font-medium text-[#0a1220]">Turno 1 — diurno</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">Entrada</span>
                    <span className="font-medium text-[#0a1220]">07:00</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">Intervalo</span>
                    <span className="font-medium text-[#0a1220]">11:30 — 12:30</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">Saída</span>
                    <span className="font-medium text-[#0a1220]">16:48</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500">Carga semanal</span>
                    <span className="font-medium text-[#0a1220]">44h</span>
                  </div>
                </div>
                <p className="text-slate-500 text-xs text-left">Tolerância de 5 minutos na entrada e saída. Atrasos acima disso são descontados do banco de horas.</p>
              </>
            )}

            {activeTab === 'Cardápios' && (
              <>
                <h2 className="text-lg font-semibold text-[#0a1220] mb-6">Cardápio da semana — Restaurante interno</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {menu.map((m, i) => (
                    <div key={i} className="border border-slate-100 bg-slate-50/50 rounded-xl p-4">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider">{m.dia}</span>
                      <p className="text-[#0a1220] font-medium text-sm mt-1 mb-2 leading-relaxed">{m.prato}</p>
                      <p className="text-xs text-slate-500">Sobremesa: {m.sobremesa}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Mapa() {
  const [tab, setTab] = useState<'empresa' | 'risco'>('empresa');

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-[#0a1220]">Mapa da empresa</h1>
        <p className="text-sm text-slate-500 mt-1">Layout dos setores e mapa de risco (NR-5).</p>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => setTab('empresa')} 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'empresa' ? 'bg-[#0a1220] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
        >
          Mapa da empresa
        </button>
        <button 
          onClick={() => setTab('risco')} 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'risco' ? 'bg-[#0a1220] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
        >
          Mapa de risco
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col items-center min-h-[500px]">
        {tab === 'empresa' ? (
          <div className="w-full max-w-2xl border-4 border-slate-200 p-8 rounded-lg relative bg-slate-50 flex flex-col items-center justify-center min-h-[400px]">
            <span className="absolute top-4 font-bold text-slate-400">Metalúrgica YZ — Planta Caxias do Sul</span>
            {/* Simple mock map layout */}
            <div className="grid grid-cols-3 gap-2 w-full mt-8">
              <div className="bg-blue-100 border border-blue-200 h-32 flex items-center justify-center rounded text-sm text-blue-800 font-medium col-span-2">Usinagem</div>
              <div className="bg-amber-100 border border-amber-200 h-32 flex items-center justify-center rounded text-sm text-amber-800 font-medium">Soldagem</div>
              <div className="bg-emerald-100 border border-emerald-200 h-32 flex items-center justify-center rounded text-sm text-emerald-800 font-medium">Expedição</div>
              <div className="bg-purple-100 border border-purple-200 h-32 flex items-center justify-center rounded text-sm text-purple-800 font-medium">Qualidade</div>
              <div className="bg-slate-200 border border-slate-300 h-32 flex items-center justify-center rounded text-sm text-slate-800 font-medium">Almoxarifado</div>
              <div className="bg-sky-100 border border-sky-200 h-16 flex items-center justify-center rounded text-sm text-sky-800 font-medium col-span-3">Administrativo</div>
            </div>
            <p className="mt-8 text-xs text-slate-400 text-center">Layout simplificado da planta. Use a aba <strong>Mapa de risco</strong> para visualizar os agentes de risco por setor conforme a NR-5.</p>
          </div>
        ) : (
          <div className="w-full max-w-2xl border-4 border-slate-200 p-8 rounded-lg relative bg-slate-50 flex flex-col items-center justify-center min-h-[400px]">
             <span className="absolute top-4 font-bold text-slate-400">Mapa de Risco</span>
             <div className="grid grid-cols-3 gap-2 w-full mt-8">
               <div className="bg-amber-50 border-2 border-amber-400 h-32 flex flex-col items-center justify-center rounded text-sm text-amber-900 font-bold col-span-2 relative group hover:bg-amber-100 transition-colors">
                 Usinagem
                 <span className="text-[10px] font-normal text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded mt-1 border border-amber-200">Risco Médio</span>
                 <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></div>
                 <div className="absolute hidden group-hover:block -top-10 bg-black text-white text-[10px] px-2 py-1 rounded w-48 text-center z-10">Ruído intenso, projeção de partículas, corte.</div>
               </div>
               <div className="bg-red-50 border-2 border-red-400 h-32 flex flex-col items-center justify-center rounded text-sm text-red-900 font-bold relative group hover:bg-red-100 transition-colors">
                 Soldagem
                 <span className="text-[10px] font-normal text-red-800 bg-red-100/80 px-2 py-0.5 rounded mt-1 border border-red-200">Risco Alto</span>
                 <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></div>
                 <div className="absolute hidden group-hover:block -top-10 bg-black text-white text-[10px] px-2 py-1 rounded w-48 text-center z-10 left-1/2 -translate-x-1/2">Radiação não ionizante, fumos, queimadura.</div>
               </div>
               <div className="bg-emerald-50 border-2 border-emerald-400 h-32 flex flex-col items-center justify-center rounded text-sm text-emerald-900 font-bold relative group hover:bg-emerald-100 transition-colors">
                 Expedição
                 <span className="text-[10px] font-normal text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded mt-1 border border-emerald-200">Risco Baixo</span>
                 <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
                 <div className="absolute hidden group-hover:block -top-10 bg-black text-white text-[10px] px-2 py-1 rounded w-32 text-center z-10 left-1/2 -translate-x-1/2">Movimentação de carga.</div>
               </div>
               <div className="bg-emerald-50 border-2 border-emerald-400 h-32 flex flex-col items-center justify-center rounded text-sm text-emerald-900 font-bold relative group hover:bg-emerald-100 transition-colors">
                 Qualidade
                 <span className="text-[10px] font-normal text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded mt-1 border border-emerald-200">Risco Baixo</span>
                 <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
                 <div className="absolute hidden group-hover:block -top-10 bg-black text-white text-[10px] px-2 py-1 rounded w-32 text-center z-10 left-1/2 -translate-x-1/2">Ergonomia.</div>
               </div>
               <div className="bg-emerald-50 border-2 border-emerald-400 h-32 flex flex-col items-center justify-center rounded text-sm text-emerald-900 font-bold relative group hover:bg-emerald-100 transition-colors">
                 Almoxarifado
                 <span className="text-[10px] font-normal text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded mt-1 border border-emerald-200">Risco Baixo</span>
                 <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
                 <div className="absolute hidden group-hover:block -top-10 bg-black text-white text-[10px] px-2 py-1 rounded w-32 text-center z-10 left-1/2 -translate-x-1/2">Peso leve.</div>
               </div>
               <div className="bg-emerald-50 border-2 border-emerald-400 h-16 flex flex-col items-center justify-center rounded text-sm text-emerald-900 font-bold col-span-3 relative group hover:bg-emerald-100 transition-colors">
                 Administrativo
                 <span className="text-[10px] font-normal text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded mt-1 border border-emerald-200">Risco Baixo</span>
                 <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
                 <div className="absolute hidden group-hover:block -top-10 bg-black text-white text-[10px] px-2 py-1 rounded w-48 text-center z-10">Risco ergonômico, telas.</div>
               </div>
             </div>
             <p className="mt-8 text-xs text-slate-500 text-center">Passe o mouse sobre os setores para ver os agentes de risco descritos na NR-5.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Sobre() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-[#0a1220]">Sobre a Metalúrgica YZ</h1>
        <p className="text-sm text-slate-500 mt-1">Pequena, técnica, e feita por quem está no chão de fábrica.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-xl">
          <Calendar className="text-blue-500 mb-2" size={20}/>
          <h3 className="text-2xl font-bold text-[#0a1220]">2007</h3>
          <p className="text-xs text-slate-500">Fundação</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl">
          <Users className="text-emerald-500 mb-2" size={20}/>
          <h3 className="text-2xl font-bold text-[#0a1220]">18</h3>
          <p className="text-xs text-slate-500">Colaboradores</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl">
          <MapIcon className="text-red-500 mb-2" size={20}/>
          <h3 className="text-2xl font-bold text-[#0a1220]">Caxias do Sul</h3>
          <p className="text-xs text-slate-500">Sede Principal</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl">
          <AlertCircle className="text-amber-500 mb-2" size={20}/>
          <h3 className="text-2xl font-bold text-[#0a1220]">ISO 9001</h3>
          <p className="text-xs text-slate-500">Certificação</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-8 rounded-xl text-slate-600 text-sm leading-relaxed space-y-4">
        <p>
          A <strong>Metalúrgica YZ</strong> nasceu em 2007 na garagem dos irmãos Yago e Zélio Cordeiro, dois torneiros mecânicos que decidiram largar o turno da noite numa grande indústria para tentar algo próprio. O nome veio do jeito mais simples possível: as iniciais dos dois fundadores.
        </p>
        <p>
          Os primeiros anos foram de usinagem sob encomenda para vizinhas do bairro industrial — eixos, buchas, flanges, pequenos lotes que ninguém grande queria atender. Em 2012, com a compra do primeiro torno CNC usado, a YZ passou a fornecer peças seriadas para fabricantes de equipamentos agrícolas da região e nunca mais parou de crescer.
        </p>
        <p>
          Hoje somos <strong>18 colaboradores</strong> num galpão moderno em Caxias do Sul, com células de usinagem de precisão, soldagem robótica e montagem de subconjuntos. A YZ continua familiar: o Zélio toca a produção do chão de fábrica, o Yago cuida do comercial e da engenharia, e a Juliana — filha do Yago — coordena o administrativo e o portal interno que você está usando agora.
        </p>
        <p className="italic text-slate-500 mt-4 border-l-2 border-slate-200 pl-4 py-1">
          "Pequena o suficiente pra te conhecer pelo nome, técnica o suficiente pra entregar projetos complexos no prazo."
        </p>
      </div>
    </div>
  );
}

export function Perfil({ session }: { session?: Session }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    nome: '',
    email: session?.user?.email || '',
    setor: 'Usinagem',
    cracha: 'Em processamento...'
  });

  useEffect(() => {
    async function loadProfile() {
      if (!session?.user) return;
      try {
        let { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        // Se o perfil não existir (usuário criado antes da trigger, ou erro na trigger), criar agora.
        if (error && error.code === 'PGRST116') {
           const emailName = session.user.email?.split('@')[0].split(/[._]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || 'Operador';
           const crachaMatch = session.user.email?.match(/^(\d+)@/);
           
           const { data: newProfile, error: insertError } = await supabase.from('profiles').insert({
              id: session.user.id,
              nome: session.user.user_metadata?.full_name || emailName,
              email: session.user.email,
              cracha: crachaMatch ? crachaMatch[1] : String(Math.floor(10000 + Math.random() * 90000)),
              setor: 'Usinagem'
           }).select().single();
           
           if (!insertError && newProfile) {
              data = newProfile;
              error = null;
           }
        }

        if (error) throw error;
        
        if (data) {
          setProfile({
            nome: data.nome || session.user.user_metadata?.full_name || '',
            email: data.email || session.user.email || '',
            setor: data.setor || 'Usinagem',
            cracha: data.cracha || 'Em processamento...'
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        // Fallback or initial state creation fallback from previous logic...
        const emailName = session?.user?.email?.split('@')[0].split(/[._]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || 'Operador';
        const crachaMatch = session?.user?.email?.match(/^(\d+)@/);
        setProfile({
          nome: session.user.user_metadata?.full_name || emailName,
          email: session.user.email || '',
          setor: 'Usinagem',
          cracha: crachaMatch ? crachaMatch[1] : String(Math.floor(10000 + Math.random() * 90000))
        });
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [session]);

  const handleSave = async () => {
    if (!session?.user) return;
    try {
      // Usar upsert para garantir que o perfil seja salvo mesmo se ainda não existia na base
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          nome: profile.nome,
          setor: profile.setor,
          email: profile.email,
          cracha: profile.cracha
        });
      
      if (error) throw error;
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert(`Erro ao salvar o perfil: ${error.message || ''}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0a1220]">Meu Perfil</h1>
          <p className="text-sm text-slate-500 mt-1">Gerencie suas informações pessoais e preferências.</p>
        </div>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Editar Perfil
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(false)} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Cancelar
            </button>
            <button onClick={handleSave} className="bg-[#00A3FF] hover:bg-[#008AE6] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Salvar Alterações
            </button>
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#0a1220] to-[#15233b]"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-sm">
              <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-3xl font-bold text-slate-400">
                {profile.nome.charAt(0) || 'U'}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nome Completo</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={profile.nome} 
                  onChange={(e) => setProfile({...profile, nome: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#008AE6] focus:ring-1 focus:ring-[#008AE6]"
                />
              ) : (
                <div className="font-medium text-[#0a1220] py-2">{profile.nome}</div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">E-mail / Login</label>
              <div className="font-medium text-slate-500 py-2">{profile.email}</div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Número do Crachá</label>
              <div className="font-medium text-slate-500 py-2">{profile.cracha}</div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Setor Principal</label>
              {isEditing ? (
                <select 
                  value={profile.setor}
                  onChange={(e) => setProfile({...profile, setor: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#008AE6] focus:ring-1 focus:ring-[#008AE6]"
                >
                  <option value="Usinagem">Usinagem</option>
                  <option value="Soldagem">Soldagem</option>
                  <option value="Expedição">Expedição</option>
                  <option value="Qualidade">Qualidade</option>
                  <option value="Almoxarifado">Almoxarifado</option>
                  <option value="Administrativo">Administrativo</option>
                </select>
              ) : (
                <div className="font-medium text-[#0a1220] py-2">{profile.setor}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
