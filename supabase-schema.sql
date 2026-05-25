-- Execute este script no SQL Editor do seu projeto Supabase

-- 1. Criação da tabela de Perfis
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT,
  cracha TEXT,
  setor TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS (Segurança)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários podem ver seu próprio perfil" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Usuários podem inserir seu próprio perfil" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Criação da tabela de Chamados (Manutenção)
CREATE TABLE IF NOT EXISTS public.chamados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id),
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  prioridade TEXT NOT NULL,
  equipamento TEXT,
  status TEXT DEFAULT 'Pendente',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.chamados ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários podem ver seus próprios chamados" ON public.chamados FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Usuários podem criar chamados" ON public.chamados FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- 3. Criação da tabela de EPIs
CREATE TABLE IF NOT EXISTS public.epis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id),
  equipamento TEXT NOT NULL,
  tamanho TEXT NOT NULL,
  motivo TEXT NOT NULL,
  status TEXT DEFAULT 'Pendente',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.epis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários podem ver seus pedidos de EPI" ON public.epis FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Usuários podem criar pedidos de EPI" ON public.epis FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- 4. Criação da tabela de Denúncias
CREATE TABLE IF NOT EXISTS public.denuncias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descricao TEXT NOT NULL,
  anonima BOOLEAN DEFAULT true,
  autor_id UUID REFERENCES public.profiles(id), -- Nullable se for anônimo
  status TEXT DEFAULT 'Em Análise',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.denuncias ENABLE ROW LEVEL SECURITY;
-- As denúncias muitas vezes são sensíveis, portanto, vamos permitir apenas quem criou (e se não for anônimo) visualizar:
CREATE POLICY "Usuários podem ver denúncias que criaram (não anônimas)" ON public.denuncias FOR SELECT USING (auth.uid() = autor_id);
-- Todos autenticados podem inserir denúncias
CREATE POLICY "Qualquer usuário logado pode criar denúncias" ON public.denuncias FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 5. Criação da tabela de Pedidos
CREATE TABLE IF NOT EXISTS public.pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id),
  produto TEXT NOT NULL,
  quantidade INT NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'Pendente',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  data_pedido TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários podem ver seus próprios pedidos" ON public.pedidos FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Usuários podem criar pedidos" ON public.pedidos FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- 6. Criação da tabela de Logs
CREATE TABLE IF NOT EXISTS public.logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id),
  acao TEXT NOT NULL,
  detalhes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários logados podem inserir logs" ON public.logs FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Usuários logados podem ler seus logs" ON public.logs FOR SELECT USING (auth.uid() = profile_id);
