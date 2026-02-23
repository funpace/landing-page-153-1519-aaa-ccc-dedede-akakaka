
import React from 'react';
import { Zap, Trophy, Shield, ArrowRight, Activity, Cpu, Users, Star, Crown, Check, Play, Sparkles, Smartphone, Watch, ChevronDown, Loader2 } from 'lucide-react';
import { PLANS } from './PaymentsView';

interface Props {
  onJoin: () => void;
  onLogin: () => void;
  theme: 'dark' | 'light';
}

const LandingPage: React.FC<Props> = ({ onJoin, onLogin, theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} selection:bg-blue-500 selection:text-white`}>
      {/* Navigation Sticky */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-black italic tracking-tighter uppercase">FUNPACE</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <a href="#how-it-works" className="hover:text-blue-500 transition-colors">Como Funciona</a>
            <a href="#benefits" className="hover:text-blue-500 transition-colors">Benefícios</a>
            <a href="#plans" className="hover:text-blue-500 transition-colors">Planos</a>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onLogin} className="text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Login</button>
            <button onClick={onJoin} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-600/20">Quero ser Membro</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-8 overflow-hidden min-h-screen flex flex-col justify-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 ease-out">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Transforme cada Km em Recompensa Real</span>
            </div>
            
            <h1 className="text-7xl md:text-[11rem] font-black italic uppercase tracking-tighter leading-[0.8]">
              Corrida é <br />
              <span className="fun-text-gradient">O Seu Jogo.</span>
            </h1>
            
            <p className="text-xl md:text-3xl font-medium text-slate-400 max-w-2xl leading-relaxed italic">
              O primeiro ecossistema fitness que une performance de elite com mecânicas de RPG. No Funpace, seu suor vale <span className="text-white">Loot, Fases e Status.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <button 
                onClick={onJoin}
                className="group bg-blue-600 py-6 px-12 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/30 hover:scale-105 transition-all active:scale-95"
              >
                CRIAR PERSONAGEM <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex items-center gap-4 px-4 bg-slate-900/50 border border-white/5 rounded-3xl backdrop-blur-md">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-12 h-12 rounded-full border-4 border-slate-950" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-black italic">Guilda Ativa</p>
                  <p className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">+4k corredores jogando</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-slate-500" />
        </div>
      </section>

      {/* Concept: What is Funpace? */}
      <section id="how-it-works" className="py-32 px-8 bg-slate-900/30 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">O Que é o <br/><span className="text-blue-500">Funpace?</span></h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              Diferente de apps convencionais de corrida, o Funpace é uma camada de gamificação profunda construída sobre seus dados reais. Nós não apenas registramos sua distância; nós a interpretamos como **Experiência (XP)** e **Poder de Combate (CP)**.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'IA Auditiva', desc: 'Gemini valida seus treinos evitando fraudes.' },
                { title: 'Fases Evolutivas', desc: 'Suba de nível para desbloquear marcas.' },
                { title: 'Desafios Épicos', desc: 'Treinos intervalados viram batalhas contra Bosses.' },
                { title: 'Marketplace', desc: 'Troque Funits por descontos reais em parceiros.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 bg-blue-500/20 p-2 rounded-lg">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-black uppercase italic text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-blue-600/20 blur-[100px] rounded-full" />
            <div className="relative bg-slate-900 border border-white/10 p-8 rounded-[3.5rem] shadow-2xl space-y-8">
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Protocolo de Evolução</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase text-emerald-500">Sistema Online</span>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { icon: Watch, label: '1. Sincronize seu Relógio', status: 'READY' },
                  { icon: Cpu, label: '2. Auditoria IA (Gemini)', status: 'ANALYZING' },
                  { icon: Zap, label: '3. Atribuição de Funits', status: 'CALCULATING' },
                  { icon: Trophy, label: '4. Loot Drop Desbloqueado', status: 'CLAIMABLE' },
                ].map((step, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${i === 1 ? 'bg-blue-600 border-blue-500 shadow-lg' : 'bg-slate-950 border-white/5 opacity-60'}`}>
                    <div className="flex items-center gap-4">
                      <step.icon className="w-5 h-5" />
                      <span className="text-xs font-black uppercase italic">{step.label}</span>
                    </div>
                    {i === 1 && <Loader2 className="w-4 h-4 animate-spin" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamified Experience: Fases */}
      <section id="benefits" className="py-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter">Benefícios por <span className="fun-text-gradient">Fases</span></h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">Quanto mais você corre, mais o mundo real te recompensa</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              { 
                phase: 'Fase 1: Recruta', 
                icon: Shield, 
                benefits: ['Acesso ao Feed Global', 'Ranking de Guildas', 'Métricas de Performance', 'Badge de Iniciante'],
                cta: 'Começar Agora',
                price: 'Grátis'
              },
              { 
                phase: 'Fase 2: Elite', 
                icon: Star, 
                popular: true,
                benefits: ['Cupom 10% Nitro Energy', 'Espresso Semanal Grátis', 'Sync Strava/Apple', 'IA Coach Ativo'],
                cta: 'Atingir Elite',
                price: '500 Funits'
              },
              { 
                phase: 'Fase 3: Lenda', 
                icon: Crown, 
                benefits: ['Inscrição em Provas VIP', 'Kit Finisher Exclusivo', 'Análise Biomecânica IA', 'Marketplace Descontos 30%'],
                cta: 'Tornar-se Lenda',
                price: '1500 Funits'
              }
            ].map((p, i) => (
              <div key={i} className={`relative p-10 rounded-[3.5rem] border-2 flex flex-col justify-between transition-all group ${p.popular ? 'bg-slate-900 border-blue-600 shadow-2xl scale-105 z-10' : 'bg-slate-950 border-slate-800 opacity-80'}`}>
                {p.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase">Status Mais Desejado</div>}
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div className={`p-5 rounded-2xl ${p.popular ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500'}`}>
                      <p.icon className="w-10 h-10" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-500 uppercase">Requisito</p>
                      <p className="text-2xl font-black italic uppercase leading-none">{p.price}</p>
                    </div>
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter">{p.phase}</h3>
                  <ul className="space-y-4">
                    {p.benefits.map((b, bi) => (
                      <li key={bi} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">
                        <Check className="w-4 h-4 text-blue-500" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={onJoin} className={`mt-10 w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${p.popular ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof: The Guilds */}
      <section className="py-32 px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-10">
            <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">A Jornada não é <br/> <span className="text-slate-900">Solitária.</span></h2>
            <p className="text-2xl font-medium opacity-90 leading-relaxed italic">
              No Funpace, você corre com sua **Guilda**. Compita em rankings mundiais, compartilhe estratégias de treinos Boss e valide a performance dos seus parceiros.
            </p>
            <div className="flex gap-10">
              <div>
                <p className="text-6xl font-black italic">120+</p>
                <p className="text-xs font-black uppercase tracking-widest opacity-70">Guildas Ativas</p>
              </div>
              <div>
                <p className="text-6xl font-black italic">4.2k</p>
                <p className="text-xs font-black uppercase tracking-widest opacity-70">Atletas Membros</p>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 overflow-hidden relative group">
                <img src={`https://images.unsplash.com/photo-${1517836357463 + i}-d362523e1732?auto=format&fit=crop&q=80&w=400`} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest">Guilda #{i}20</p>
                  <p className="text-lg font-black italic uppercase">Sprint Titans</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing: Integration from PaymentsView */}
      <section id="plans" className="py-32 px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Escolha seu <span className="fun-text-gradient">Acelerador</span></h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">Acelere seu ganho de Funits e desbloqueie recompensas premium</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`relative p-10 rounded-[4rem] border-2 transition-all group hover:scale-[1.02] ${
                  plan.popular 
                    ? 'bg-slate-900 border-blue-600 shadow-2xl shadow-blue-600/20' 
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase px-6 py-2 rounded-full">
                    A Escolha Pro
                  </div>
                )}
                
                <div className="space-y-8 h-full flex flex-col justify-between">
                  <div className="space-y-8">
                    <div className="flex justify-between items-start">
                      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                        <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-blue-500' : 'text-slate-500'}`} />
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-black italic">{plan.price}</p>
                        <p className="text-[10px] font-bold opacity-50 uppercase">{plan.id === 'free' ? 'Para Sempre' : 'Plano Assinante'}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-black italic uppercase tracking-tight">{plan.name}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{plan.description}</p>
                    </div>

                    <ul className="space-y-5">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-tight">
                          <Check className={`w-4 h-4 ${plan.popular ? 'text-blue-500' : 'text-slate-500'}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={onJoin}
                    className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all mt-10 ${
                      plan.popular 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/40 hover:scale-105' 
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {plan.id === 'free' ? 'ASSINAR GRÁTIS' : 'COMEÇAR JORNADA'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-6xl md:text-[9rem] font-black italic uppercase tracking-tighter leading-none">
            Não Apenas Corra. <br/> <span className="fun-text-gradient">Vença o Jogo.</span>
          </h2>
          <button 
            onClick={onJoin}
            className="bg-white text-slate-950 py-10 px-20 rounded-[3.5rem] font-black text-3xl uppercase tracking-tighter hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-white/10"
          >
            QUERO ENTRAR NO CLUBE
          </button>
          <div className="pt-12 text-slate-600 font-black text-[10px] uppercase tracking-[0.5em] flex flex-col items-center gap-4">
            <span>Disponível para iOS • Android • Garmin • Strava</span>
            <div className="flex gap-4">
              <Smartphone className="w-6 h-6" />
              <Watch className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <Zap className="text-blue-600 w-8 h-8 fill-current" />
            <span className="text-2xl font-black italic uppercase">FUNPACE</span>
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Termos</a>
            <a href="#" className="hover:text-blue-500 transition-colors">FAQ</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Contato</a>
          </div>
          <p className="text-[10px] font-bold text-slate-600 uppercase">© 2024 Funpace Labs. Gamification for high performance.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
