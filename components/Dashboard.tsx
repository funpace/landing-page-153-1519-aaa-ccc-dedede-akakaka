
import React, { useState, useEffect } from 'react';
import { Zap, Activity, Flame, Shield, MessageSquareQuote, ChevronRight, Power, Cpu, Network, Signal, Sparkles, TrendingUp, ArrowUpRight } from 'lucide-react';
import { MOCK_TRAININGS, PHASE_RULES, MOCK_USER_STATS } from '../constants';
import { getNarratorCommentary } from '../services/geminiService';

interface Props {
  onNavigateToTab: (tab: string) => void;
  theme: 'dark' | 'light';
}

const Dashboard: React.FC<Props> = ({ onNavigateToTab, theme }) => {
  const [narratorText, setNarratorText] = useState<string | null>(null);
  const [isNarratorLoading, setIsNarratorLoading] = useState(true);
  
  const stats = MOCK_USER_STATS;
  const nextPhaseTarget = PHASE_RULES[stats.phase].min_funits;
  const phaseProgress = Math.min(100, (stats.funits / nextPhaseTarget) * 100);

  useEffect(() => {
    const loadNarrator = async () => {
      try {
        const text = await getNarratorCommentary(stats);
        setNarratorText(text);
      } catch (e) {
        setNarratorText("Link neural estável. Aguardando dados de performance.");
      } finally {
        setIsNarratorLoading(false);
      }
    };
    loadNarrator();
  }, []);

  return (
    <div className="bento-grid animate-in fade-in duration-1000">
      
      {/* Operator Status - Wide Header (Col 1-8) */}
      <div className="lg:col-span-8 md:col-span-12 glass-panel p-10 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative group">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-pink-500 to-transparent" />
         <div className="relative">
            <div className="w-40 h-40 rounded-[3rem] p-1 bg-gradient-to-tr from-cyan-400 to-pink-500 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
               <div className="w-full h-full rounded-[2.8rem] overflow-hidden bg-slate-950 border-4 border-slate-950">
                  <img src="https://picsum.photos/seed/cyber/400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-pink-600 text-white font-black text-xs px-4 py-2 rounded-2xl border-4 border-slate-950">
               N0{stats.phase}
            </div>
         </div>

         <div className="flex-1 text-center md:text-left space-y-4">
            <div>
               <p className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.4em] font-mono">OP_ID: {stats.rank}</p>
               <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">Alex <span className="text-pink-500">Core</span></h2>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{stats.title}</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
               <span className="bg-slate-900/80 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-cyan-400 border border-cyan-500/20">STREAK: {stats.streak}D</span>
               <span className="bg-slate-900/80 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-pink-400 border border-pink-500/20">DIST: {stats.totalDistance}KM</span>
            </div>
         </div>

         <div className="hidden lg:flex flex-col items-end gap-2 text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase">Neural Status</p>
            <div className="flex gap-1">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className={`w-1.5 h-6 rounded-full ${i <= 4 ? 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]' : 'bg-slate-800'}`} />
               ))}
            </div>
            <p className="text-xs font-black italic text-cyan-400">SYNCHRONIZED</p>
         </div>
      </div>

      {/* Main Funit Bank - Square (Col 9-12) */}
      <div className="lg:col-span-4 md:col-span-6 glass-panel p-10 flex flex-col justify-between border-t-4 border-pink-500 glow-pink">
         <div className="flex justify-between items-start">
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Bank Credits</p>
            <div className="p-4 bg-pink-500/20 rounded-3xl">
               <Zap className="w-8 h-8 text-pink-500 fill-current" />
            </div>
         </div>
         <div className="space-y-1">
            <h3 className="text-7xl font-black italic uppercase tracking-tighter leading-none">{stats.funits}<span className="text-pink-500">F</span></h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Ready for redeployment</p>
         </div>
         <button 
           onClick={() => onNavigateToTab('benefits')}
           className="w-full py-4 bg-pink-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-pink-600/20 hover:scale-[1.03] transition-all"
         >
            Exchange Data
         </button>
      </div>

      {/* Narrative Console - Wide (Col 1-7) */}
      <div className="lg:col-span-7 md:col-span-12 glass-panel p-8 group relative bg-lime-500/[0.03] border-l-4 border-lime-500">
         <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-lime-600/20 rounded-3xl flex items-center justify-center relative flex-shrink-0">
               <div className="absolute inset-0 bg-lime-500/15 animate-ping rounded-3xl" />
               <Power className="w-10 h-10 text-lime-400 relative z-10" />
            </div>
            <div className="space-y-2">
               <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-lime-400" />
                  <p className="text-[10px] font-black uppercase text-lime-400 tracking-[0.3em]">AI Stream: v2.5_Panoramic</p>
               </div>
               {isNarratorLoading ? (
                  <div className="h-4 w-64 bg-slate-800 animate-pulse rounded" />
               ) : (
                  <p className="text-xl font-bold italic text-slate-200 group-hover:text-white transition-colors leading-relaxed">"{narratorText}"</p>
               )}
            </div>
         </div>
      </div>

      {/* Neural Sync Gauge - Tall (Col 8-12) */}
      <div className="lg:col-span-5 md:col-span-6 glass-panel p-10 flex flex-col justify-between border-r-4 border-cyan-500 glow-cyan">
         <div className="flex justify-between items-start">
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Neural Sync</p>
            <Cpu className="w-8 h-8 text-cyan-400" />
         </div>
         <div className="relative h-24 flex items-end">
            <div className="absolute inset-0 flex items-center justify-center text-7xl font-black italic opacity-10 uppercase tracking-tighter">POWER</div>
            <div className="w-full space-y-4">
               <div className="flex justify-between text-[10px] font-black uppercase text-cyan-400">
                  <span>Sync Fidelity</span>
                  <span>{stats.neuralSync} NS</span>
               </div>
               <div className="h-4 bg-slate-950 rounded-full overflow-hidden p-1 border border-white/5">
                  <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300 rounded-full shadow-[0_0_15px_#06b6d4]" style={{ width: '82%' }} />
               </div>
            </div>
         </div>
      </div>

      {/* Quick Ops - Multi Column (Col 1-12) */}
      <div className="col-span-12 glass-panel p-10 space-y-8">
         <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black italic uppercase flex items-center gap-3">
               <Signal className="w-6 h-6 text-cyan-400" /> Upcoming Operations
            </h3>
            <button 
              onClick={() => onNavigateToTab('workouts')}
              className="text-[10px] font-black uppercase text-cyan-500 tracking-widest flex items-center gap-2 hover:text-white transition-colors"
            >
               Open Full Command <ArrowUpRight className="w-4 h-4" />
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_TRAININGS.map(t => (
               <div key={t.id} className="p-6 bg-slate-900/60 rounded-3xl border border-white/5 group hover:border-cyan-500/30 transition-all cursor-pointer">
                  <div className="flex justify-between mb-4">
                     <span className="text-[10px] font-black uppercase text-slate-500 font-mono tracking-widest">{t.day}_TASK</span>
                     <div className={`w-2 h-2 rounded-full ${t.status === 'COMPLETED' ? 'bg-lime-500' : 'bg-pink-500 animate-pulse'}`} />
                  </div>
                  <h4 className="text-xl font-black italic uppercase group-hover:text-cyan-400 transition-colors">{t.title}</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 mb-6">{t.target}</p>
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-pink-500 fill-current" />
                        <span className="text-sm font-black">+{t.funitsReward}F</span>
                     </div>
                     <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
               </div>
            ))}
         </div>
      </div>

    </div>
  );
};

export default Dashboard;
