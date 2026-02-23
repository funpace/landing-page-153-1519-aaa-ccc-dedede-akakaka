
import React, { useState } from 'react';
import { Gift, Lock, CheckCircle, Star, Shield, ArrowRight, Tag, Info, Loader2, Check, Copy, Sparkles } from 'lucide-react';
import { PHASE_RULES } from '../constants';

const BenefitsHub: React.FC = () => {
  const userPhase = 2; // Simulado
  const currentPhaseData = PHASE_RULES[userPhase - 1];
  const futurePhases = PHASE_RULES.slice(userPhase);

  // Estados para simular interatividade
  const [redeemingId, setRedeemingId] = useState<number | null>(null);
  const [redeemedIds, setRedeemedIds] = useState<Set<number>>(new Set());

  const handleRedeem = (id: number) => {
    if (redeemedIds.has(id)) return;
    
    setRedeemingId(id);
    // Simula uma chamada de API/Validação IA
    setTimeout(() => {
      setRedeemingId(null);
      setRedeemedIds(prev => new Set(prev).add(id));
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Meus <span className="fun-text-gradient">Benefícios</span>
          </h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">Fase {userPhase} • Status Elite Ativo</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 animate-pulse">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-500 leading-none">Nível de Membro</p>
            <p className="text-lg font-black italic uppercase text-blue-400">Pace Elite</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Coluna Principal */}
        <div className="lg:col-span-8 space-y-12">
          
          <section className="space-y-6">
            <h3 className="text-xl font-black italic uppercase flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-500" /> Privilégios da Fase {userPhase}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentPhaseData.benefits.map((benefit, i) => (
                <div 
                  key={i} 
                  style={{ animationDelay: `${i * 100}ms` }}
                  className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] flex items-center gap-4 group hover:border-blue-500/50 transition-all duration-300 animate-in fade-in slide-in-from-left-4 fill-mode-both"
                >
                  <div className="p-3 bg-blue-600/10 rounded-xl group-hover:bg-blue-600/20 transition-colors group-hover:rotate-12 duration-300">
                    <Star className="w-5 h-5 text-blue-500 fill-current" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-tight group-hover:translate-x-1 transition-transform">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black italic uppercase flex items-center gap-3">
                <Tag className="w-6 h-6 text-yellow-500" /> Recompensas de Marcas
              </h3>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Resgate Disponível</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentPhaseData.partnerRewards.map((reward, i) => {
                const isRedeeming = redeemingId === i;
                const isRedeemed = redeemedIds.has(i);
                
                return (
                  <div 
                    key={i} 
                    style={{ animationDelay: `${(i + 3) * 150}ms` }}
                    className={`relative overflow-hidden border transition-all duration-500 p-8 rounded-[2.5rem] group animate-in fade-in zoom-in-95 fill-mode-both ${
                      isRedeemed 
                        ? 'bg-emerald-950/20 border-emerald-500/50 shadow-emerald-500/10' 
                        : 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10'
                    }`}
                  >
                    <div className="relative z-10 space-y-5">
                      <div className="flex justify-between items-start">
                        <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isRedeemed ? 'text-emerald-400' : 'text-blue-500'}`}>
                          {reward.brand}
                        </p>
                        {isRedeemed ? (
                          <Sparkles className="w-5 h-5 text-emerald-400 animate-bounce" />
                        ) : (
                          <Gift className="w-6 h-6 text-slate-700 group-hover:text-blue-500 transition-colors" />
                        )}
                      </div>
                      
                      <div>
                        <h4 className={`text-2xl font-black italic uppercase tracking-tighter transition-colors ${isRedeemed ? 'text-emerald-500' : ''}`}>
                          {reward.reward}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{reward.description}</p>
                      </div>

                      {isRedeemed ? (
                        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                          <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                            <span className="text-xs font-mono font-black text-emerald-500 tracking-tighter">PACE-ELITE-2024</span>
                            <Copy className="w-4 h-4 text-emerald-500 cursor-pointer hover:scale-110 transition-transform" />
                          </div>
                          <p className="text-[10px] text-emerald-500/60 font-black uppercase tracking-widest text-center">Código copiado com sucesso!</p>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleRedeem(i)}
                          disabled={isRedeeming}
                          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${
                            isRedeeming 
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              : 'bg-white text-blue-600 hover:bg-blue-50 hover:shadow-white/10'
                          }`}
                        >
                          {isRedeeming ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> Gerando Código...
                            </>
                          ) : (
                            <>
                              Resgatar Cupom <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Background Decorative Gradient */}
                    <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-3xl transition-all duration-700 opacity-20 ${
                      isRedeemed ? 'bg-emerald-500 group-hover:scale-150' : 'bg-blue-600 group-hover:bg-blue-500 group-hover:scale-125'
                    }`} />
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-8 relative overflow-hidden shadow-xl animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="relative z-10">
              <h3 className="text-xl font-black italic uppercase flex items-center gap-3 mb-6">
                <Lock className="w-5 h-5 text-slate-500" /> Em Breve
              </h3>
              
              <div className="space-y-10">
                {futurePhases.map((phase, idx) => (
                  <div key={phase.phase} className="relative pl-8 border-l-2 border-slate-800 space-y-4 group/phase">
                    <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-slate-800 border-4 border-slate-900 group-hover/phase:bg-slate-700 transition-colors" />
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Fase {phase.phase}</p>
                      <h4 className="text-lg font-black italic uppercase opacity-50 transition-opacity group-hover/phase:opacity-100">
                        {phase.phase === 3 ? 'Status Pro' : 'Lenda Funpace'}
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {phase.benefits.slice(0, 2).map((b, bi) => (
                        <li key={bi} className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase">
                          <Lock className="w-3 h-3" /> {b}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2">
                       <p className="text-[9px] font-black text-blue-500/50 uppercase tracking-tighter italic group-hover/phase:text-blue-500/80 transition-colors">
                        Requisito: {phase.min_funits} Funits
                       </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white space-y-4 shadow-2xl shadow-blue-500/40 transform hover:-rotate-1 hover:scale-[1.02] transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg group-hover:rotate-12 transition-transform">
                <Info className="w-5 h-5" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest">Dica de Elite</p>
            </div>
            <p className="text-sm font-bold leading-tight">Membros anuais ganham recompensas exclusivas de parceiros Premium (Fase 3) desde o primeiro dia!</p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest pt-2 group-hover:translate-x-2 transition-transform">
              Ver Planos <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsHub;
