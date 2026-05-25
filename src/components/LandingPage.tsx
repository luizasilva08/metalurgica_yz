// No change to imports.
import React from 'react';
import { ArrowRight, Package, LifeBuoy, FileText, HardHat, Activity, ShieldAlert } from 'lucide-react';
import cncImage from '../assets/images/cnc_machining_1779739519704.png';
import weldingImage from '../assets/images/precision_welding_1779739534711.png';
import agriculturalImage from '../assets/images/agricultural_structures_1779739565534.png';
import assemblyImage from '../assets/images/industrial_assembly_1779739549956.png';
import flangesImage from '../assets/images/steel_flanges_1779739579299.png';

interface LandingPageProps {
  onLoginClick: (isSignUp: boolean) => void;
}

export function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#071A3A] text-white font-sans flex flex-col selection:bg-[#00A3FF] selection:text-white">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-white/5">
        <div className="h-20 w-64 relative">
          <img src="/atuallll.png" alt="Metalúrgica YZ" className="h-20 w-full object-contain object-left absolute inset-0" onError={(e) => {
            e.currentTarget.style.display = 'none';
            const fallback = document.getElementById('landing-logo-fallback');
            if (fallback) fallback.style.display = 'flex';
          }} />
          <div id="landing-logo-fallback" className="hidden items-center gap-3 h-full">
            <div className="bg-white/10 text-white font-bold px-2.5 py-1 rounded text-xs tracking-widest border border-white/5">
              YZ
            </div>
            <span className="font-semibold text-base">Metalúrgica YZ</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#solucoes" className="hover:text-white transition-colors">Soluções</a>
          <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
          <a href="#contato" className="hover:text-white transition-colors">Contato</a>
        </nav>
        
        <div className="flex items-center gap-5 text-sm font-medium">
          <button 
            onClick={() => onLoginClick(false)}
            className="text-slate-300 hover:text-white transition-colors"
          >
            Entrar
          </button>
          <button 
            onClick={() => onLoginClick(true)}
            className="bg-[#122A5A] hover:bg-[#1A3875] px-5 py-2.5 rounded-lg transition-colors text-white border border-transparent"
          >
            Criar conta
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-8 pt-24 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 mb-8 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF]"></span>
            Portal Metalúrgica YZ — versão 2026
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Eficiência industrial,<br />
            <span className="text-[#00A3FF]">conectada</span> em um só<br />
            portal.
          </h1>
          
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-10">
            Pedidos, chamados técnicos, status de máquinas, retirada de EPI, documentos e canal de denúncias. Tudo o que o time da fábrica precisa em uma única plataforma.
          </p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onLoginClick(false)}
              className="bg-[#009DE0] hover:bg-[#0085C0] text-white px-6 py-3.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              Acessar agora <ArrowRight size={18} />
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-3.5 rounded-lg font-medium transition-colors">
              Ver soluções
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32 border-t border-white/10 pt-12 max-w-4xl">
          <div>
            <div className="text-4xl font-bold text-[#00A3FF] mb-2">18</div>
            <div className="text-[10px] tracking-widest text-[#86C8EA] font-semibold uppercase">Colaboradores</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#00A3FF] mb-2">120+</div>
            <div className="text-[10px] tracking-widest text-[#86C8EA] font-semibold uppercase">Clientes atendidos</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#00A3FF] mb-2">99,7%</div>
            <div className="text-[10px] tracking-widest text-[#86C8EA] font-semibold uppercase">Uptime do portal</div>
          </div>
        </div>
      </section>

      {/* Services Images Gallery - Layout Industrial */}
      <section className="bg-[#071A3A] pt-12 pb-24 w-full overflow-hidden">
        <div className="container mx-auto px-8 mb-8">
          <h2 className="text-xl md:text-2xl font-light text-white tracking-wide">
            Conheça as soluções apresentadas pelas nossas Unidades de Negócio
          </h2>
        </div>
        
        <div className="w-full relative flex items-center group">
           <div className="flex w-full">
             {[
               { title: "USINAGEM CNC", src: cncImage },
               { title: "SOLDA DE PRECISÃO", src: weldingImage },
               { title: "ESTRUTURAS AGRÍCOLAS", src: agriculturalImage },
               { title: "MONTAGEM INDUSTRIAL", src: assemblyImage },
               { title: "EIXOS E FLANGES", src: flangesImage }
             ].map((item, idx) => (
               <div key={idx} className="relative flex-1 min-w-[200px] h-[350px] md:h-[450px] group/card border-r border-[#071A3A] overflow-hidden cursor-pointer bg-[#0A3078]">
                 <img 
                   src={item.src} 
                   alt={item.title} 
                   className="w-full h-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-700 group-hover/card:scale-110 group-hover/card:mix-blend-normal group-hover/card:opacity-100" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#071A3A] via-[#071A3A]/30 to-transparent opacity-90 z-10 pointer-events-none"></div>
                 
                 <div className="absolute bottom-6 left-6 right-6 z-20">
                   <h3 className="text-white text-xs md:text-sm font-bold uppercase tracking-wider">{item.title}</h3>
                 </div>
               </div>
             ))}
           </div>

           {/* Left button */}
           <button className="absolute left-6 w-10 h-10 border border-white/50 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition z-30 hidden md:flex backdrop-blur-sm bg-black/20">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           
           {/* Right button */}
           <button className="absolute right-6 w-10 h-10 border border-white/50 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition z-30 hidden md:flex backdrop-blur-sm bg-black/20">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
           </button>
        </div>
      </section>

      {/* Modules Section */}
      <section id="solucoes" className="bg-[#1C2127] py-24 border-t border-black/20">
        <div className="container mx-auto px-8">
          <div className="mb-16">
            <h3 className="text-[#00A3FF] text-[11px] font-bold tracking-widest uppercase mb-4">O que você encontra</h3>
            <h2 className="text-3xl md:text-4xl font-bold max-w-xl text-white">
              Seis módulos integrados para a operação industrial
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Package, title: 'Pedidos e rastreamento', desc: 'Acompanhe seus pedidos do disparo à entrega, com previsões em tempo real.' },
              { icon: LifeBuoy, title: 'Suporte técnico', desc: 'Abra chamados, anexe a máquina envolvida e acompanhe o atendimento.' },
              { icon: FileText, title: 'Documentos', desc: 'Manuais, datasheets, normas e certificados sempre à mão.' },
              { icon: HardHat, title: 'Retirada de EPI', desc: 'Solicite equipamentos de proteção e acompanhe a aprovação do gestor.' },
              { icon: Activity, title: 'Status de máquinas', desc: 'Visão em tempo real das máquinas do seu setor — operação, alerta e manutenção.' },
              { icon: ShieldAlert, title: 'Canal de denúncias', desc: 'Reporte ocorrências de forma sigilosa ou anônima, 24h por dia.' },
            ].map((mod, i) => (
              <div key={i} className="bg-[#21272F] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors shadow-lg">
                <div className="bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center text-slate-300 mb-6 border border-white/5">
                  <mod.icon size={20} />
                </div>
                <h4 className="text-lg font-semibold text-[#86C8EA] mb-3">{mod.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="bg-[#0A1220] py-24 border-t border-black/20 text-slate-300">
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Nossa história e o <span className="text-[#00A3FF]">futuro digital</span>
            </h2>
            <p className="mb-6 leading-relaxed">
              Fundada em 1995 por dois irmãos torneiros mecânicos em Caxias do Sul, a <strong>Metalúrgica YZ</strong> nasceu da paixão pela precisão e pela fabricação de qualidade. Em quase três décadas, evoluímos de uma pequena oficina para uma indústria completa, atendendo gigantes do agronegócio, construção civil e energia.
            </p>
            <p className="mb-6 leading-relaxed">
              O <strong>Portal Metalúrgica YZ</strong> foi criado para que nossa eficiência não ficasse restrita apenas ao chão de fábrica. Ao digitalizar pedidos, rastreamento, status de máquinas e segurança (EPIs), unimos nossos colaboradores, técnicos e clientes em um ecossistema seguro e transparente.
            </p>
            <ul className="space-y-4 mt-8">
              <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#00A3FF]" />
                 <span>Transparência total desde a fabricação até a entrega final</span>
              </li>
              <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#00A3FF]" />
                 <span>Segurança de ponta a ponta com registros de EPIs e denúncias</span>
              </li>
              <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#00A3FF]" />
                 <span>Agilidade mecânica impulsionada por software moderno</span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" 
              alt="O chão de fábrica da Metalúrgica YZ" 
              className="rounded-2xl border border-white/10 shadow-2xl"
            />
            <div className="absolute -bottom-8 -left-8 bg-[#1C2127] p-6 rounded-2xl border border-white/5 shadow-xl hidden md:block max-w-[240px]">
              <div className="text-3xl font-bold text-[#00A3FF] mb-1">30+</div>
              <div className="text-xs text-slate-400 font-medium">Anos de expertise em metalurgia e conexões digitais.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#071A3A] py-24 border-b border-black/20">
        <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white">Pronto para conectar<br />sua operação?</h2>
            <p className="text-slate-300">Crie sua conta gratuitamente e ative o portal em minutos.</p>
          </div>
          <button 
            onClick={() => onLoginClick(true)}
            className="bg-[#009DE0] hover:bg-[#0085C0] text-white px-6 py-3.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-md"
          >
            Começar agora <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#24282D] py-16 flex-1 flex flex-col justify-between">
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-slate-400">
          <div className="col-span-1 md:col-span-1">
            <div className="h-20 w-64 relative mb-6">
              <img src="/atuallll.png" alt="Metalúrgica YZ" className="h-20 w-full object-contain object-left absolute inset-0" onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = document.getElementById('landing-footer-logo-fallback');
                if (fallback) fallback.style.display = 'flex';
              }} />
              <div id="landing-footer-logo-fallback" className="hidden items-center gap-3 h-full">
                <div className="bg-white/10 text-white font-bold px-2 py-1 rounded text-xs tracking-wider border border-white/5">
                  YZ
                </div>
                <span className="font-semibold text-white">Metalúrgica YZ</span>
              </div>
            </div>
            <p className="max-w-xs leading-relaxed">Portal integrado para clientes e colaboradores industriais.</p>
          </div>
          
          <div>
            <h4 className="text-[#86C8EA] font-semibold mb-6">Plataforma</h4>
            <ul className="space-y-4">
              <li><a href="#solucoes" className="hover:text-white transition-colors">Soluções</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Portal</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#86C8EA] font-semibold mb-6">Empresa</h4>
            <ul className="space-y-4">
              <li><a href="#sobre" className="hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div id="contato">
            <h4 className="text-[#86C8EA] font-semibold mb-6">Atendimento</h4>
            <ul className="space-y-4">
              <li>0800 701 0701</li>
              <li>atendimento@metalurgicayz.com.br</li>
              <li>Caxias do Sul, SC</li>
            </ul>
          </div>
        </div>
        
        <div className="container mx-auto px-8 mt-16 pt-8 border-t border-white/5 text-[11px] text-slate-500">
          © 2026 Metalúrgica YZ
        </div>
      </footer>
    </div>
  );
}
