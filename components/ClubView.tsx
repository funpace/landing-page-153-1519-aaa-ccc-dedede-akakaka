
import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Medal, MessageSquare, Heart, Shield, Zap, Sparkles, Sword, Crosshair, Share2, CheckCircle, Info } from 'lucide-react';
import { MOCK_SOCIAL_FEED, MOCK_GUILD_STATS, MOCK_USER_STATS } from '../constants';

const ClubView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'guild' | 'rankings'>('feed');
  const [oracleText, setOracleText] = useState("O Oráculo está lendo os sinais das ruas...");
  const [loadingOracle, setLoadingOracle] = useState(true);

  useEffect(() => {
    // Simula a IA gerando um comentário sobre o clima da comunidade
    const timer = setTimeout(() => {
      setOracleText("A Guilda Sprint Titans dominou 840km nesta semana. O Combat Power médio da comunidade subiu 12%. Preparem-se para a Raid de amanhã.");
      setLoadingOracle(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Oracle Banner (Gemini Driven) */}
      <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-[2.5rem] p-6 flex items-center gap-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent animate-shimmer" />
        <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-600/20 relative z-10">
          <Sparkles className="w-8 h-8 text-white animate-pulse" />
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.3em] mb-1">Status do Oráculo IA</p>
          {loadingOracle ? (
            <div className="flex gap-2 items-center">
              <div className="h-4 w-32 bg-slate-800 animate-pulse rounded" />
              <div className="h-4 w-16 bg-slate-800 animate-pulse rounded" />
            </div>
          ) : (
            <p className="text-lg font-bold italic text-slate-200 leading-tight">"{oracleText}"</p>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Column: Sidebar / Profile info */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 p-1">
                <div className="w-full h-full rounded-full border-4 border-slate-900 overflow-hidden">
                  <img src="https://picsum.photos/seed/runner/400" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black italic uppercase">Alex Core</h3>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{MOCK_USER_STATS.title}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="text-center">
                <p className="text-sm font-black italic">LVL {MOCK_USER_STATS.level}</p>
                <p className="text-[8px] font-bold text-slate-500 uppercase">Progresso</p>
              </div>
              <div className="text-center">
                {/* Fixed: Replaced combatPower with neuralSync to match MOCK_USER_STATS type definition */}
                <p className="text-sm font-black italic text-blue-500">{MOCK_USER_STATS.neuralSync}</p>
                <p className="text-[8px] font-bold text-slate-500 uppercase">NS total</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'feed', label: 'Feed de Batalhas', icon: TrendingUp },
              { id: 'guild', label: 'Minha Guilda', icon: Shield },
              { id: 'rankings', label: 'Hall da Glória', icon: Medal },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl border font-black text-[10px] uppercase tracking-widest transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20' 
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Middle Column: Dynamic Content */}
        <div className="lg:col-span-6 flex-1">
          {activeTab === 'feed' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex-shrink-0" />
                <div className="flex-1 space-y-4">
                  <textarea 
                    placeholder="O que os deuses do asfalto viram hoje?"
                    className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-white placeholder-slate-700 resize-none h-12"
                  />
                  <div className="flex justify-between items-center border-t border-slate-800 pt-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500"><Share2 className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500"><Sword className="w-4 h-4" /></button>
                    </div>
                    <button className="bg-blue-600 px-6 py-2 rounded-xl text-[10px] font-black uppercase text-white shadow-lg shadow-blue-500/20">Despachar</button>
                  </div>
                </div>
              </div>

              {MOCK_SOCIAL_FEED.map((post) => (
                <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <div className="relative">
                          <img src={post.user.avatar} className="w-12 h-12 rounded-full border-2 border-blue-500" />
                          <div className="absolute -bottom-1 -right-1 bg-blue-600 w-5 h-5 rounded-lg border-2 border-slate-950 flex items-center justify-center text-[8px] font-black text-white">
                            {post.user.phase}
                          </div>
                        </div>
                        <div>
                          <p className="font-black italic uppercase tracking-tight leading-none group-hover:text-blue-500 transition-colors">{post.user.name}</p>
                          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">{post.user.title} • {post.timestamp}</p>
                        </div>
                      </div>
                      <div className={`px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase flex items-center gap-2 ${
                        post.activity.rank === 'S' ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-500' : 'border-blue-500/30 bg-blue-500/5 text-blue-500'
                      }`}>
                         <Medal className="w-3 h-3" /> Rank {post.activity.rank}
                      </div>
                    </div>

                    <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800 group-hover:bg-slate-950 transition-colors">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <Sword className="w-5 h-5 text-red-500" />
                          <p className="text-lg font-black italic uppercase tracking-tighter">{post.activity.title}</p>
                        </div>
                        <div className="flex gap-4">
                           <div className="text-right">
                              <p className="text-xs font-black italic">{post.activity.distance}</p>
                              <p className="text-[8px] font-bold text-slate-600 uppercase">Distância</p>
                           </div>
                           <div className="text-right">
                              <p className="text-xs font-black italic">{post.activity.pace}</p>
                              <p className="text-[8px] font-bold text-slate-600 uppercase">Ritmo</p>
                           </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">"{post.narrative}"</p>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <div className="flex gap-6">
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-pink-500 transition-colors group/btn">
                          <Heart className="w-5 h-5 group-hover/btn:fill-current" /> {post.cheers}
                        </button>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 transition-colors">
                          <MessageSquare className="w-5 h-5" /> {post.comments}
                        </button>
                      </div>
                      {post.isValidated ? (
                        <div className="flex items-center gap-2 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                          <CheckCircle className="w-4 h-4" /> Validado pela Guilda
                        </div>
                      ) : (
                        <button className="flex items-center gap-2 bg-blue-600/10 text-blue-500 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                          Validar Performance
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'guild' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="relative overflow-hidden p-10 rounded-[3.5rem] bg-indigo-600 text-white shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                 <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-8">
                       <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/30">
                          <Shield className="w-10 h-10" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em]">Guilda Ativa</p>
                          <h3 className="text-5xl font-black italic uppercase tracking-tighter">{MOCK_GUILD_STATS.name}</h3>
                          <div className="flex items-center gap-3 mt-2">
                             <span className="text-xs font-black bg-white/20 px-2 py-1 rounded-lg">LVL {MOCK_GUILD_STATS.level}</span>
                             <span className="text-xs font-black opacity-60">{MOCK_GUILD_STATS.members}/50 MEMBROS</span>
                          </div>
                       </div>
                    </div>
                    <div className="text-center md:text-right bg-black/20 p-6 rounded-3xl backdrop-blur-md border border-white/10">
                       <p className="text-4xl font-black italic">{MOCK_GUILD_STATS.weeklyKm} KM</p>
                       <p className="text-[8px] font-black uppercase opacity-60 tracking-widest">Esforço Semanal Coletivo</p>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-6">
                   <h4 className="text-xl font-black italic uppercase flex items-center gap-3">
                      <Zap className="text-yellow-500 w-5 h-5 fill-current" /> Bônus de Equipe
                   </h4>
                   <div className="space-y-4">
                      {MOCK_GUILD_STATS.perks.map((perk, i) => (
                        <div key={i} className="flex gap-4 items-center p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                           <CheckCircle className="w-5 h-5 text-emerald-500" />
                           <span className="text-xs font-bold uppercase tracking-tight">{perk}</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-6">
                   <h4 className="text-xl font-black italic uppercase flex items-center gap-3">
                      <Users className="text-blue-500 w-5 h-5" /> Líderes da Semana
                   </h4>
                   <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex justify-between items-center p-3 bg-slate-950/50 rounded-2xl border border-slate-800">
                           <div className="flex items-center gap-3">
                              <span className="text-xs font-black italic text-slate-500">#0{i}</span>
                              <div className="w-8 h-8 rounded-full bg-slate-800" />
                              <span className="text-xs font-bold uppercase">Membro_{i}4</span>
                           </div>
                           <span className="text-xs font-black italic text-blue-500">120km</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Hall of Glory (Mini Rankings) */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden">
            <div className="p-8 bg-slate-950 border-b border-slate-800">
               <h3 className="text-xl font-black italic uppercase flex items-center gap-3">
                  <Medal className="w-5 h-5 text-yellow-500" /> Rankings
               </h3>
               <p className="text-[8px] font-black text-slate-500 uppercase mt-1 tracking-widest">Global Hall of Fame</p>
            </div>
            
            <div className="p-4 space-y-2">
              {[
                { rank: 1, name: 'Sarah_Elite', cp: 8450, trend: 'up' },
                { rank: 2, name: 'Lucas_X', cp: 8120, trend: 'down' },
                { rank: 3, name: 'Titan_Run', cp: 7900, trend: 'up' },
                { rank: 4, name: 'Iron_Man', cp: 7650, trend: 'up' },
                { rank: 5, name: 'Dash_Core', cp: 7400, trend: 'down' },
              ].map(user => (
                <div key={user.rank} className="flex justify-between items-center p-3 hover:bg-slate-800 rounded-2xl transition-colors group cursor-pointer">
                   <div className="flex items-center gap-3">
                      <span className={`text-sm font-black italic w-5 ${user.rank === 1 ? 'text-yellow-500' : 'text-slate-600'}`}>#{user.rank}</span>
                      <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700" />
                      <span className="text-[10px] font-bold uppercase group-hover:text-blue-500 transition-colors">{user.name}</span>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black italic text-blue-500">{user.cp}</p>
                      <p className="text-[7px] font-black text-slate-600 uppercase">CP</p>
                   </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-4 text-[9px] font-black text-slate-600 hover:text-white bg-slate-950 border-t border-slate-800 uppercase tracking-widest transition-colors">
               Expandir Hall Completo
            </button>
          </div>

          <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-[3rem] space-y-4">
             <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                <h4 className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Sistema de Honra</h4>
             </div>
             <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Valide atividades de parceiros para ganhar <span className="text-blue-400 font-bold">+10 Funits</span> de bônus por validação. Máximo de 5 por dia.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClubView;
