
import React, { useState } from 'react';
import { User, Shield, Zap, MapPin, Settings, LogOut, ChevronRight, Edit3, CreditCard, Star, Trophy, Target, Activity, CheckCircle2, Gift, Clock, History } from 'lucide-react';
import { MOCK_BADGES, MOCK_USER_STATS, MOCK_TRAININGS, MOCK_MISSIONS_EXTENDED, PHASE_RULES } from '../constants';

interface Props {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onLogout: () => void;
  onNavigateToPayments?: () => void;
}

const ProfileView: React.FC<Props> = ({ theme, onToggleTheme, onLogout, onNavigateToPayments }) => {
  const isDark = theme === 'dark';
  const stats = MOCK_USER_STATS;
  const [activeTab, setActiveTab] = useState<'activities' | 'missions' | 'benefits' | 'badges'>('activities');

  const activeBenefits = PHASE_RULES.find(r => r.phase === stats.phase)?.benefits || [];
  const completedMissions = MOCK_MISSIONS_EXTENDED.filter(m => m.status === 'COMPLETED');
  const activityHistory = MOCK_TRAININGS.filter(t => t.status === 'COMPLETED');

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in slide-in-from-right-4 duration-500 pb-10">
      {/* Header / Hero Section */}
      <div className={`relative overflow-hidden rounded-[3.5rem] p-10 border-2 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-2xl'}`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full -mr-40 -mt-40 blur-[120px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-1 shadow-[0_0_50px_rgba(79,70,229,0.3)] group-hover:scale-105 transition-all duration-700">
              <div className={`w-full h-full rounded-full border-4 ${isDark ? 'border-slate-900' : 'border-white'} overflow-hidden`}>
                <img src="https://picsum.photos/seed/runner/400" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 p-3 rounded-2xl border-4 border-slate-900 shadow-2xl">
              <Shield className="w-5 h-5 text-white fill-current" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-3">
             <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                   <Star className="w-3 h-3 text-yellow-500 fill-current" />
                   <p className="text-[10px] font-black uppercase text-blue-500 tracking-[0.4em]">LVL {stats.level} • {stats.title}</p>
                </div>
                <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter leading-none">Alex <span className="fun-text-gradient">Core</span></h2>
             </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span>FASE {stats.phase}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full">
                <Trophy className="w-3 h-3 text-blue-500" />
                <span>{stats.funits} FUNITS</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
             <button onClick={onToggleTheme} className="p-4 bg-slate-800 rounded-2xl border border-slate-700 hover:bg-slate-700 transition-colors">
                <Zap className={`w-5 h-5 ${isDark ? 'text-yellow-500' : 'text-slate-400'}`} />
             </button>
             <button onClick={onLogout} className="p-4 bg-red-500/10 text-red-500 rounded-2xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                <LogOut className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-2">
        {[
          { id: 'activities', label: 'Atividades', icon: Activity },
          { id: 'missions', label: 'Missões', icon: Target },
          { id: 'benefits', label: 'Vantagens', icon: Gift },
          { id: 'badges', label: 'Emblemas', icon: Trophy }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
              activeTab === tab.id 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`p-8 rounded-[2.5rem] border-2 ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'} min-h-[400px]`}>
        
        {/* Atividades History */}
        {activeTab === 'activities' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
               <h3 className="text-xl font-black italic uppercase">Histórico de Batalhas</h3>
               <span className="text-[10px] font-black uppercase text-slate-500">Total: {activityHistory.length} Treinos</span>
            </div>
            <div className="space-y-4">
              {activityHistory.map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-5 bg-slate-950/50 border border-slate-800 rounded-3xl group hover:border-blue-500/50 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center">
                       <History className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                       <p className="font-black italic uppercase tracking-tight">{activity.title}</p>
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{activity.fullDate} • {activity.target}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black italic text-emerald-500">+{activity.funitsReward} F</p>
                    <p className="text-[8px] font-black uppercase text-slate-600">VALIDADO</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Missões History */}
        {activeTab === 'missions' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
               <h3 className="text-xl font-black italic uppercase">Quests Completadas</h3>
               <span className="text-[10px] font-black uppercase text-slate-500">{completedMissions.length} Finalizadas</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedMissions.map(mission => (
                <div key={mission.id} className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl relative overflow-hidden group">
                  <div className="relative z-10 space-y-2">
                    <div className="flex justify-between items-start">
                       <div className="px-3 py-1 bg-emerald-500 text-white text-[8px] font-black uppercase rounded-lg">QUEST CONCLUÍDA</div>
                       <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h4 className="text-lg font-black italic uppercase">{mission.title}</h4>
                    <p className="text-xs text-slate-400 leading-tight">{mission.desc}</p>
                    <div className="pt-2 flex items-center gap-2">
                       <Zap className="w-4 h-4 text-yellow-500 fill-current" />
                       <span className="text-sm font-black">+{mission.reward} Funits coletados</span>
                    </div>
                  </div>
                  <Trophy className="absolute -right-4 -bottom-4 w-20 h-20 opacity-[0.05] -rotate-12 group-hover:rotate-0 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefícios Ativos */}
        {activeTab === 'benefits' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
               <h3 className="text-xl font-black italic uppercase">Inventário de Vantagens</h3>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-blue-500">FASE {stats.phase} ATIVA</span>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeBenefits.map((benefit, i) => (
                <div key={i} className="p-6 bg-blue-600/5 border border-blue-600/20 rounded-3xl flex items-center gap-5 group hover:bg-blue-600/10 transition-all">
                  <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                     <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div>
                     <h4 className="text-lg font-black italic uppercase tracking-tight">{benefit}</h4>
                     <p className="text-[10px] font-bold text-blue-500/60 uppercase tracking-widest">Desbloqueado no Nível {stats.phase}</p>
                  </div>
                </div>
              ))}
              <button 
                onClick={onNavigateToPayments}
                className="p-6 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-2 group hover:border-blue-500 transition-all"
              >
                 <CreditCard className="w-6 h-6 text-slate-700 group-hover:text-blue-500 transition-colors" />
                 <span className="text-[10px] font-black uppercase text-slate-600 group-hover:text-blue-500">Upgrade para mais Loot</span>
              </button>
            </div>
          </div>
        )}

        {/* Emblemas / Badges */}
        {activeTab === 'badges' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
               <h3 className="text-xl font-black italic uppercase">Galeria de Glória</h3>
               <span className="text-[10px] font-black uppercase text-slate-500">{MOCK_BADGES.filter(b => b.unlockedAt).length} Desbloqueados</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {MOCK_BADGES.map(badge => (
                <div 
                  key={badge.id}
                  className={`relative p-6 rounded-3xl border-2 flex flex-col items-center text-center gap-3 transition-all ${
                    badge.unlockedAt 
                      ? 'bg-slate-900/60 border-slate-800 hover:border-blue-500 hover:-translate-y-1' 
                      : 'opacity-20 grayscale border-slate-800 pointer-events-none'
                  }`}
                >
                  <span className="text-4xl">{badge.icon}</span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-tight leading-none">{badge.name}</p>
                    {badge.unlockedAt && <p className="text-[8px] font-bold text-blue-500 mt-1 uppercase">COLETADO</p>}
                  </div>
                  {/* Fixed rarity comparison from 'RARE' to 'ELITE' which is a valid type in Badge interface */}
                  {badge.rarity === 'ELITE' && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfileView;
