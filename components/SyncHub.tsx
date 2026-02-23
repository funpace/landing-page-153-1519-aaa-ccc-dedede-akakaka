
import React, { useState } from 'react';
import { Zap, Link2, CheckCircle2, AlertCircle, RefreshCcw, Activity, ArrowRight, Sparkles, Loader2, Trophy } from 'lucide-react';
import { MOCK_STRAVA_ACTIVITIES, MOCK_MISSIONS_EXTENDED } from '../constants';
import { validateStravaActivity } from '../services/geminiService';
import { StravaActivity } from '../types';

const APPS = [
  { id: 'strava', name: 'Strava', status: 'CONNECTED', icon: Zap, color: '#FC6100' },
  { id: 'apple', name: 'Apple Health', status: 'DISCONNECTED', icon: Link2, color: '#FFFFFF' },
  { id: 'garmin', name: 'Garmin Connect', status: 'AVAILABLE', icon: Zap, color: '#007CC3' },
];

const SyncHub: React.FC = () => {
  const [activities, setActivities] = useState<StravaActivity[]>(MOCK_STRAVA_ACTIVITIES);
  const [validatingId, setValidatingId] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  const formatPace = (speed: number) => {
    if (speed === 0) return "0:00";
    const paceMin = 16.666 / speed;
    const mins = Math.floor(paceMin);
    const secs = Math.round((paceMin - mins) * 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 2000);
  };

  const handleValidate = async (activity: StravaActivity) => {
    setValidatingId(activity.id);
    const result = await validateStravaActivity(activity, MOCK_MISSIONS_EXTENDED);
    
    if (result.validated) {
      setActivities(prev => prev.map(a => 
        a.id === activity.id 
          ? { ...a, status: 'VALIDATED', funitsEarned: result.funits } 
          : a
      ));
    }
    setValidatingId(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter">Central de <span className="text-[#FC6100]">Sinc.</span></h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Conecte seu esforço real ao progresso digital</p>
        </div>
        <button 
          onClick={handleSync}
          disabled={syncing}
          className="bg-slate-900 border border-slate-800 px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:border-blue-500 transition-all active:scale-95"
        >
          {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
          {syncing ? 'Buscando Dados...' : 'Sincronizar Agora'}
        </button>
      </header>

      {/* Grid de Conectividade */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {APPS.map(app => (
          <div key={app.id} className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col items-center text-center space-y-6 group">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 opacity-10" style={{ backgroundColor: app.color }} />
               <app.icon className={`w-10 h-10 relative z-10 ${app.status === 'CONNECTED' ? 'text-[#FC6100]' : 'text-slate-600'}`} />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-black italic uppercase tracking-tight">{app.name}</h3>
              <p className={`text-[10px] font-black uppercase tracking-widest ${app.status === 'CONNECTED' ? 'text-emerald-500' : 'text-slate-500'}`}>
                {app.status === 'CONNECTED' ? 'Ativo & Pronto' : app.status === 'AVAILABLE' ? 'Disponível' : 'Não Vinculado'}
              </p>
            </div>

            <button className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
              app.status === 'CONNECTED' ? 'bg-slate-800 text-slate-400 hover:text-red-400' : 'bg-blue-600 text-white shadow-xl shadow-blue-500/20'
            }`}>
              {app.status === 'CONNECTED' ? 'DESCONECTAR' : 'VINCULAR'}
            </button>
          </div>
        ))}
      </div>

      {/* Listagem de Atividades Importadas */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
           <Activity className="w-6 h-6 text-[#FC6100]" />
           <h3 className="text-2xl font-black italic uppercase tracking-tight">Atividades do Strava</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className={`relative overflow-hidden p-8 rounded-[2.5rem] border-2 transition-all ${
                activity.status === 'VALIDATED' 
                ? 'bg-emerald-500/5 border-emerald-500/30' 
                : 'bg-slate-900 border-slate-800 hover:border-[#FC6100]/50'
              }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="flex items-center gap-8 w-full md:w-auto">
                   <div className="w-16 h-16 rounded-2xl bg-[#FC6100]/10 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-[#FC6100] fill-current" />
                   </div>
                   <div className="flex-1">
                      <h4 className="text-xl font-black italic uppercase tracking-tighter leading-tight group-hover:text-[#FC6100] transition-colors">{activity.name}</h4>
                      <div className="flex items-center gap-4 mt-2">
                         <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase">
                            <Activity className="w-3 h-3" /> {(activity.distance / 1000).toFixed(2)} km
                         </div>
                         <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase">
                            <RefreshCcw className="w-3 h-3" /> {formatPace(activity.average_speed)} min/km
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-10 border-t md:border-t-0 pt-6 md:pt-0 border-slate-800">
                   {activity.status === 'VALIDATED' ? (
                     <div className="flex items-center gap-4 text-emerald-500">
                        <div className="text-right">
                           <p className="text-xl font-black italic">+{activity.funitsEarned} F</p>
                           <p className="text-[8px] font-black uppercase opacity-60">Auditado via IA</p>
                        </div>
                        <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
                           <CheckCircle2 className="w-6 h-6" />
                        </div>
                     </div>
                   ) : (
                     <button 
                       onClick={() => handleValidate(activity)}
                       disabled={validatingId === activity.id}
                       className="group bg-blue-600 px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 transition-all disabled:opacity-50"
                     >
                       {validatingId === activity.id ? (
                         <>
                           <Loader2 className="w-4 h-4 animate-spin" />
                           Auditando...
                         </>
                       ) : (
                         <>
                           Validar & Coletar <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                         </>
                       )}
                     </button>
                   )}
                </div>
              </div>

              {/* Strava Branded Watermark */}
              <div className="absolute -right-8 -top-8 w-40 h-40 text-white/[0.02] font-black italic text-8xl pointer-events-none select-none">STRAVA</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-10 bg-gradient-to-br from-[#FC6100]/10 to-orange-600/5 border-2 border-dashed border-[#FC6100]/20 rounded-[3rem] text-center space-y-4">
        <Trophy className="w-12 h-12 text-[#FC6100]/40 mx-auto" />
        <h4 className="text-xl font-black italic uppercase tracking-tight leading-none">Protocolo de Validação IA</h4>
        <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Nossa inteligência analisa o esforço cardiovascular e consistência de ritmo. Treinos validados geram Funits e contam para metas de evolução de fase.
        </p>
      </div>
    </div>
  );
};

export default SyncHub;
