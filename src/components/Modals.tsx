import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export function PedidoModal({ isOpen, onClose, onSuccess }: Omit<ModalProps, 'title' | 'children'> & { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [total, setTotal] = useState(0);

  const handleSubmit = async () => {
    if (!produto || quantidade <= 0) return alert('Preencha os campos obrigatórios corretamente.');
    
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error('Usuário não autenticado');

      const { error } = await supabase.from('pedidos').insert([
        {
          profile_id: userData.user.id,
          produto,
          quantidade,
          total,
          status: 'Pendente'
        }
      ]);

      if (error) throw error;

      alert('Pedido criado com sucesso!');
      setProduto('');
      setQuantidade(1);
      setTotal(0);
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erro ao salvar pedido:', error);
      alert(`Erro: ${error.message || 'Falha ao criar o pedido.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo pedido">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Produto</label>
          <input 
            type="text" 
            value={produto}
            onChange={e => setProduto(e.target.value)}
            placeholder="Motor W22 5cv"
            className="w-full px-3 py-2 border border-[#009DE0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#009DE0]"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Quantidade</label>
            <input 
              type="number" 
              value={quantidade}
              onChange={e => setQuantidade(Number(e.target.value))}
              min={1}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#009DE0]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Total (R$)</label>
            <input 
              type="number" 
              value={total}
              onChange={e => setTotal(Number(e.target.value))}
              min={0}
              step={0.01}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#009DE0]"
            />
          </div>
        </div>
        <div className="pt-2 flex justify-end">
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="px-4 py-2 bg-[#009DE0] text-white rounded-lg hover:bg-[#0085C0] transition-colors font-medium text-sm flex items-center justify-center min-w-[120px]"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Criar pedido'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function ChamadoModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('Média');
  const [equipamento, setEquipamento] = useState('');

  const handleSubmit = async () => {
    if (!titulo || !descricao) return alert('Preencha os campos obrigatórios (assunto e descrição).');
    
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error('Usuário não autenticado');

      const { error } = await supabase.from('chamados').insert([
        {
          profile_id: userData.user.id,
          titulo,
          descricao,
          prioridade,
          equipamento: equipamento || null
        }
      ]);

      if (error) throw error;
      
      setTitulo('');
      setDescricao('');
      setEquipamento('');
      setPrioridade('Média');
      onSuccess?.();
      onClose();
    } catch (e: any) {
      console.error(e);
      alert(`Erro ao abrir chamado: ${e.message || 'Verifique o console para mais detalhes.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Abrir chamado">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Assunto *</label>
          <input 
            type="text" 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#009DE0]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Descrição *</label>
          <textarea 
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#009DE0] resize-none"
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Prioridade</label>
            <select 
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#009DE0] bg-white appearance-none"
            >
              <option>Baixa</option>
              <option>Média</option>
              <option>Alta</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Máquina (opcional)</label>
            <select 
              value={equipamento}
              onChange={(e) => setEquipamento(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#009DE0] bg-white appearance-none text-slate-700"
            >
              <option value="">— Sem máquina —</option>
              <option value="Torno CNC Romi GL-240">Torno CNC Romi GL-240</option>
              <option value="Fresadora Diplomat 3001">Fresadora Diplomat 3001</option>
              <option value="Solda MIG Esab Smashweld">Solda MIG Esab Smashweld</option>
            </select>
          </div>
        </div>
        <div className="pt-2 flex justify-end">
          <button 
            disabled={loading}
            onClick={handleSubmit} 
            className="px-4 py-2 bg-[#009DE0] text-white rounded-lg hover:bg-[#0085C0] transition-colors font-medium text-sm flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : null}
            Abrir chamado
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function EPIModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [equipamento, setEquipamento] = useState('Botina de Segurança');
  const [tamanho, setTamanho] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = async () => {
    if (!equipamento || !motivo) return alert('Preencha os campos obrigatórios.');
    
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) throw new Error('Usuário não autenticado');

      const { error } = await supabase.from('epis').insert([
        {
          profile_id: userData.user.id,
          equipamento,
          tamanho,
          motivo,
        }
      ]);

      if (error) throw error;
      
      setEquipamento('Botina de Segurança');
      setTamanho('');
      setMotivo('');
      onSuccess?.();
      onClose();
    } catch (e: any) {
      console.error(e);
      alert(`Erro ao solicitar EPI: ${e.message || 'Verifique o console para mais detalhes.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova solicitação de EPI">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de EPI *</label>
          <select 
            value={equipamento}
            onChange={(e) => setEquipamento(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#009DE0] bg-white appearance-none"
          >
            <option>Botina de Segurança</option>
            <option>Protetor Auricular</option>
            <option>Óculos de proteção</option>
            <option>Luvas de raspa</option>
            <option>Avental</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tamanho</label>
            <input 
              type="text" 
              value={tamanho}
              onChange={(e) => setTamanho(e.target.value)}
              placeholder="M, 42..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#009DE0]"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Motivo *</label>
          <textarea 
            rows={3}
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Desgaste, novo funcionário..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#009DE0] resize-none"
          ></textarea>
        </div>
        <div className="pt-2 flex justify-end">
          <button 
            disabled={loading}
            onClick={handleSubmit} 
            className="px-5 py-2 bg-[#0a1220] text-white rounded-lg hover:bg-[#15233b] transition-colors font-medium text-sm flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : null}
            Enviar solicitação
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function DenunciaModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Conduta inadequada');
  const [descricao, setDescricao] = useState('');
  const [anonima, setAnonima] = useState(true);

  const handleSubmit = async () => {
    if (!titulo || !descricao) return alert('Preencha o título e a descrição.');
    
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const autor_id = (!anonima && userData?.user) ? userData.user.id : null;

      const { error } = await supabase.from('denuncias').insert([
        {
          titulo,
          categoria,
          descricao,
          anonima,
          autor_id
        }
      ]);

      if (error) throw error;
      
      setTitulo('');
      setCategoria('Conduta inadequada');
      setDescricao('');
      setAnonima(true);
      onSuccess?.();
      onClose();
    } catch (e: any) {
      console.error(e);
      alert(`Erro ao registrar denúncia: ${e.message || 'Verifique o console para mais detalhes.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Canal de denúncias">
      <div className="space-y-4">
        <p className="text-xs text-slate-500 mb-2">Relatos enviados aqui podem ser mantidos em modo sigiloso. Detalhe o ocorrido para que seja devidamente apurado.</p>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Título *</label>
          <input 
            type="text" 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#009DE0]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Categoria *</label>
          <select 
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#009DE0] bg-white appearance-none"
          >
            <option>Conduta inadequada</option>
            <option>Assédio / Bullying</option>
            <option>Segurança no Trabalho</option>
            <option>Fraude / Irregularidade</option>
            <option>Outro</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Descrição do ocorrido *</label>
          <textarea 
            rows={5}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva com o máximo de detalhes possível."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#009DE0] resize-none"
          ></textarea>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <input 
            type="checkbox" 
            id="anonima"
            checked={anonima}
            onChange={(e) => setAnonima(e.target.checked)}
            className="w-4 h-4 text-[#009DE0] rounded border-slate-300 focus:ring-[#009DE0]"
          />
          <label htmlFor="anonima" className="text-sm font-medium text-slate-700 cursor-pointer">
            Garantir anonimato local
          </label>
        </div>
        
        <div className="pt-2 flex justify-end">
          <button 
            disabled={loading}
            onClick={handleSubmit} 
            className="px-5 py-2 bg-[#0a1220] text-white rounded-lg hover:bg-[#15233b] transition-colors font-medium text-sm flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : null}
            Enviar Denúncia
          </button>
        </div>
      </div>
    </Modal>
  );
}
