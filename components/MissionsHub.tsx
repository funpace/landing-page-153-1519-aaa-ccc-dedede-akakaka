
import React, { useState } from 'react';
import { Trophy, Target, Clock, Zap, Lock, Filter, CheckCircle2, ChevronRight, Sparkles, Activity, Layers, Terminal, Grid } from 'lucide-react';
import { MOCK_MISSIONS_EXTENDED } from '../constants';

const MissionsHub: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'DAILY' | 'WEEKLY' | 'SPECIAL'>('ALL');
  const userPhase = 2;

  const filteredMissions = MOCK_MISSIONS_EXTENDED.filter(m => filter === 'ALL' || m.type === filter);

  return (
    <div className="space-y-12 animate-in slide-in-from-right-10 duration-700 pb-20">
      
      {/* Dynamic Header */}
      <div className="glass-panel p-10 flex flex-col lg:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-8">
           <div className="p-6 bg-lime-500/10 rounded-[2.5rem] border border-lime-500/20 shadow-[0_0_30px_rgba(101,163,13,0.1)]">
              <Grid className="w-10 h-10 text-lime-400" />
           </div>
           <div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Neural <span className="fun-text-gradient">Tasks</span></h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">Active Bio-Token Protocols</p>
           </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          {['ALL', 'DAILY', 'WEEKLY', 'SPECIAL'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                filter === f 
                  ? 'bg-lime-600 text-white shadow-xl shadow-lime-600/30' 
                  : 'bg-slate-900/50 text-slate-500 hover:text-white border border-white/5'
              }`}
            >
              {f === 'ALL' ? 'Main Stream' : f === 'DAILY' ? 'Dailies' : f === 'WEEKLY' ? 'Weekly' : 'Prototypes'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMissions.map((mission) => {
          const isBlocked = mission.phaseRequired > userPhase;
          const isCompleted = mission.status === 'COMPLETED';
          
          const rarityConfig = {
            STANDARD: { accent: 'bg-slate-400', text: 'text-slate-400', glow: 'glow-slate' },
            ADVANCED: { accent: 'bg-cyan-400', text: 'text-cyan-400', glow: 'glow-cyan' },
            ELITE: { accent: 'bg-pink-400', text: 'text-pink-400', glow: 'glow-pink' },
            PROTOTYPE: { accent: 'bg-lime-400', text: 'text-lime-400', glow: 'glow-lime' }
          };

          const config = rarityConfig[mission.rarity as keyof typeof rarityConfig] || rarityConfig.STANDARD;

          return (
            <div 
              key={mission.id} 
              className={`glass-panel p-10 group relative transition-all duration-500 ${
                isBlocked ? 'opacity-30 grayscale' : 
                isCompleted ? 'border-emerald-500/40 bg-emerald-500/5' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-8">
                 <div className="space-y-1">
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${config.text}`}>
                       {mission.rarity}
                    </span>
                    <div className={`h-1 w-8 rounded-full ${config.accent.replace('bg-', 'bg-')} shadow-[0_0_8px_currentColor]`} />
                 </div>
                 {isCompleted ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Target className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />}
              </div>

              <div className="space-y-4 mb-10">
                 <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">{mission.title}</h3>
                 <p className="text-sm text-slate-400 font-medium leading-relaxed">{mission.desc}</p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-8">
                 <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-2xl font-black italic text-white">+{mission.reward}F</span>
                 </div>
                 <button className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                   isCompleted 
                     ? 'bg-emerald-500/20 text-emerald-500' 
                     : 'bg-white text-slate-950 hover:scale-105 shadow-xl'
                 }`}>
                    {isCompleted ? 'Verified' : 'Access Log'}
                 </button>
              </div>

              {isBlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-[28px]">
                   <div className="bg-slate-900 border border-pink-500/50 px-6 py-3 rounded-2xl text-pink-500 font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl">
                      <Lock className="w-4 h-4 inline mr-2" /> NODE 0{mission.phaseRequired} REQ.
                   </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MissionsHub;
