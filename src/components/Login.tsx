import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

type AuthState = 'login' | 'register' | 'recover';

interface AuthProps {
  onLoginSuccess: () => void;
  defaultState?: AuthState;
  onBack?: () => void;
  onTempLogin?: (role: 'operador' | 'chefia') => void;
}

export function Login({ onLoginSuccess, defaultState = 'login', onBack, onTempLogin }: AuthProps) {
  const [authState, setAuthState] = useState<AuthState>(defaultState);
  const [identifier, setIdentifier] = useState(''); // crachá or email
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Helper to allow using "crachá" as a login method with Supabase Auth (which requires email)
  const getSafeEmail = (id: string) => {
    return id.includes('@') ? id : `${id.replace(/\s+/g, '')}@metalurgicayz.internal`;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setError('Configuração do Supabase ausente. Configure as variáveis de ambiente.');
      setLoading(false);
      return;
    }

    const emailToUse = getSafeEmail(identifier);

    try {
      // Timeout helper
      const withTimeout = <T,>(promise: Promise<T>, ms: number) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        const timeoutPromise = new Promise<never>((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('A conexão demorou muito. Verifique sua URL/Chave do Supabase ou se o projeto está pausado.')), ms);
        });
        return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
      };

      if (authState === 'register') {
        const { error: signUpError } = await withTimeout(supabase.auth.signUp({
          email: emailToUse,
          password,
          options: {
            data: { full_name: name }
          }
        }), 15000);
        if (signUpError) throw signUpError;
        setSuccessMsg('Conta criada com sucesso! Você já pode fazer o login.');
        setAuthState('login');
        setPassword('');
      } else if (authState === 'login') {
        const { error: signInError } = await withTimeout(supabase.auth.signInWithPassword({
          email: emailToUse,
          password,
        }), 15000);
        if (signInError) throw signInError;
        onLoginSuccess();
      } else if (authState === 'recover') {
        const { error: resetError } = await withTimeout(supabase.auth.resetPasswordForEmail(identifier), 15000);
        if (resetError) throw resetError;
        setSuccessMsg('Se este endereço estiver cadastrado, um link de recuperação foi enviado.');
        setAuthState('login');
      }
    } catch (err: any) {
      if (err.message === 'Invalid login credentials') {
        setError('Credenciais inválidas. Verifique seu crachá/email e senha.');
      } else if (err.message === 'User already registered') {
        setError('Este crachá ou email já está cadastrado! Por favor, clique em "Entrar" abaixo para fazer o login.');
      } else if (err.message === 'Failed to fetch') {
        setError(`Erro de conexão (Failed to fetch). URL usada: ${import.meta.env.VITE_SUPABASE_URL}. Erro: ${err.stack || JSON.stringify(err)}`);
      } else {
        setError(err.message || 'Ocorreu um erro durante a autenticação.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans w-full">
      
      {/* Left Side - Visual presentation */}
      <div className="w-full md:w-1/2 bg-[#0A3078] text-white flex flex-col justify-between p-8 md:p-16">
        <div className="flex items-center gap-3">
          <div className="text-white font-bold text-sm tracking-widest">
            YZ
          </div>
          <span className="font-semibold text-lg">Metalúrgica YZ</span>
        </div>

        <div className="max-w-md">
          {authState === 'register' ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Junte-se ao time que opera na Metalúrgica YZ.
              </h1>
              <p className="text-[#89A6E2]">
                Cadastro gratuito. Sem cartão de crédito.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Tudo o que sua operação industrial precisa, em um portal.
              </h1>
              <p className="text-[#89A6E2]">
                Pedidos, chamados, máquinas, EPI, documentos e denúncias.
              </p>
            </>
          )}
        </div>

        <div className="text-xs text-[#89A6E2]">
          © 2026 Metalúrgica YZ
        </div>
      </div>

      {/* Right Side - Forms */}
      <div className="w-full md:w-1/2 bg-[#1A1D21] text-white flex items-center justify-center p-8 relative">
        {onBack && (
          <button 
            onClick={onBack}
            className="absolute left-8 top-8 text-slate-400 hover:text-white transition-colors"
            title="Voltar para a página inicial"
          >
            <ArrowLeft size={24} />
          </button>
        )}

        <div className="w-full max-w-sm">
          
          {/* Header */}
          <div className="mb-8">
            {authState === 'login' && (
              <>
                <h2 className="text-[#86C8EA] text-2xl font-bold mb-2">Entrar no portal</h2>
                <p className="text-slate-400 text-sm">Use seu cadastro e senha.</p>
              </>
            )}
            {authState === 'register' && (
              <>
                <h2 className="text-[#86C8EA] text-2xl font-bold mb-2">Criar sua conta</h2>
                <p className="text-slate-400 text-sm">Acesso completo ao portal industrial.</p>
              </>
            )}
            {authState === 'recover' && (
              <>
                <h2 className="text-[#86C8EA] text-2xl font-bold mb-2">Recuperar senha</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Informe seu email cadastrado e enviaremos um link para criar uma nova senha.
                </p>
              </>
            )}
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {error && (
              <div className="p-3 text-sm rounded bg-red-900/40 text-red-300 border border-red-900/50">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="p-3 text-sm rounded bg-green-900/40 text-green-300 border border-green-900/50">
                {successMsg}
              </div>
            )}

            {authState === 'register' && (
              <div>
                <label className="block text-sm font-medium text-[#86C8EA] mb-1.5">Nome completo</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#181C20] border border-[#2A313A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#86C8EA] transition-colors"
                />
              </div>
            )}

            {authState !== 'recover' && (
              <div>
                <label className="block text-sm font-medium text-[#86C8EA] mb-1.5">
                  {authState === 'login' ? 'Número do crachá/cadastro' : 'Número do crachá ou Email'}
                </label>
                <input 
                  type="text" 
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={authState === 'login' ? "Ex: 12345" : "voce@empresa.com"}
                  className="w-full bg-[#181C20] border border-[#2A313A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#86C8EA] transition-colors placeholder:text-[#4B5563]"
                />
              </div>
            )}

            {authState === 'recover' && (
              <div>
                <label className="block text-sm font-medium text-[#86C8EA] mb-1.5">Email</label>
                <input 
                  type="email" 
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="voce@empresa.com"
                  className="w-full bg-[#181C20] border border-[#2A313A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#86C8EA] transition-colors placeholder:text-[#4B5563]"
                />
              </div>
            )}

            {authState !== 'recover' && (
              <div>
                <label className="block text-sm font-medium text-[#86C8EA] mb-1.5">
                  {authState === 'register' ? 'Senha (mín. 6 caracteres)' : 'Senha'}
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#181C20] border border-[#2A313A] rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-[#86C8EA] transition-colors"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#56657F] hover:text-[#86C8EA] transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-[#0A2666] text-white rounded-lg font-medium hover:bg-[#11388E] transition-colors disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  authState === 'login' ? 'Entrar' : 
                  authState === 'register' ? 'Criar conta' : 
                  'Enviar link de recuperação'
                )}
              </button>
            </div>
          </form>

            {/* Links */}
            <div className="mt-6 flex flex-col items-center gap-4 text-sm text-slate-400">
              {authState === 'login' && (
                <>
                  <div className="w-full text-right">
                    <button 
                      type="button"
                      onClick={() => setAuthState('recover')}
                      className="hover:text-white transition-colors"
                    >
                      Esqueci minha senha
                    </button>
                  </div>
                  <div className="pt-4 text-center">
                    Ainda não tem conta?{' '}
                    <button 
                      type="button"
                      onClick={() => setAuthState('register')}
                      className="text-white font-medium hover:text-[#86C8EA] transition-colors"
                    >
                      Criar conta
                    </button>
                  </div>
                </>
              )}

              {authState === 'register' && (
                <div className="pt-4">
                  Já tem conta?{' '}
                  <button 
                    type="button"
                    onClick={() => setAuthState('login')}
                    className="text-[#86C8EA] font-medium hover:text-white transition-colors"
                  >
                    Entrar
                  </button>
                </div>
              )}

              {authState === 'recover' && (
                <button 
                  type="button"
                  onClick={() => setAuthState('login')}
                  className="text-[#86C8EA] font-medium hover:text-white transition-colors mt-2"
                >
                  Voltar para o login
                </button>
              )}
            </div>

            {/* Test Actions */}
            {onTempLogin && (
              <div className="mt-8 pt-6 border-t border-[#2A313A] ">
                <p className="text-center text-xs text-slate-500 mb-4">Acesso de Teste (Sem Banco)</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => onTempLogin('operador')}
                    className="flex-1 py-2 bg-[#2A313A] text-white text-sm rounded hover:bg-[#3A414A] transition-colors"
                  >
                    Login Operador
                  </button>
                  <button
                    type="button"
                    onClick={() => onTempLogin('chefia')}
                    className="flex-1 py-2 bg-[#2A313A] text-white text-sm rounded hover:bg-[#3A414A] transition-colors"
                  >
                    Login Chefia
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
