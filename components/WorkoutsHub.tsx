
import React, { useState } from 'react';
import { RefreshCcw, Activity, Watch, Smartphone, Loader2, Sparkles, Cpu, Zap, Network, ChevronRight } from 'lucide-react';
import { MOCK_TRAININGS } from '../constants';
import { validateManualWorkout, getBattleNarrative } from '../services/geminiService';
import { TrainingSession } from '../types';

const WorkoutsHub: React.FC = () => {
  const [workouts, setWorkouts] = useState<TrainingSession[]>(MOCK_TRAININGS.map(w => ({
    ...w,
    syncStatus: { email: false, phone: false, watch: false }
  })));
  const [syncingAll, setSyncingAll] = useState(false);
  const [activeConfirmId, setActiveConfirmId] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [battleReport, setBattleReport] = useState<{ [key: string]: { narrative: string, rank: string } }>({});

  const handleConfirmWorkout = async (workout: TrainingSession) => {
    setConfirming(true);
    const result = await validateManualWorkout(workout, userNote);
    const report = await getBattleNarrative(workout);
    
    if (result.success) {
      setWorkouts(prev => prev.map(w => 
        w.id === workout.id ? { ...w, status: 'COMPLETED', funitsReward: w.funitsReward + result.bonus } : w
      ));
      setBattleReport(prev => ({ ...prev, [workout.id]: report }));
      setActiveConfirmId(null);
      setUserNote('');
    }
    setConfirming(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Neural <span className="fun-text-gradient">Ops</span></h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Operações de Bio-Sincronização Ativas</p>
        </div>
        
        <button 
          onClick={() => { setSyncingAll(true); setTimeout(() => setSyncingAll(false), 1500); }}
          className="bg-slate-900 border border-slate-800 px-8 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:border-blue-500 transition-all"
        >
          <RefreshCcw className={`w-4 h-4 ${syncingAll ? 'animate-spin' : ''}`} />
          Reload Protocol
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          {workouts.map((workout) => (
            <div 
              key={workout.id} 
              className={`group relative overflow-hidden p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${
                workout.status === 'COMPLETED' 
                  ? 'bg-emerald-500/5 border-emerald-500/30' 
                  : workout.type === 'OVERLOAD' 
                    ? 'bg-red-500/5 border-red-500/20' 
                    : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex flex-col space-y-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 rounded-3xl flex flex-col items-center justify-center font-black transition-all ${
                      workout.status === 'COMPLETED' ? 'bg-emerald-500' : workout.type === 'OVERLOAD' ? 'bg-red-600 shadow-[0_0_25px_rgba(220,38,38,0.3)]' : 'bg-slate-800'
                    }`}>
                      <span className="text-[10px] uppercase">{workout.day}</span>
                      <Cpu className="w-8 h-8" />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-2xl font-black italic uppercase tracking-tighter">{workout.title}</h4>
                        <span className={`px-2 py-1 rounded text-[8px] font-black uppercase ${
                          workout.type === 'OVERLOAD' ? 'bg-red-500 text-white' : 'bg-blue-600/20 text-blue-400'
                        }`}>
                          {workout.type}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Config: {workout.target}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-2xl font-black italic leading-none ${workout.status === 'COMPLETED' ? 'text-emerald-500' : 'text-blue-500'}`}>
                      +{workout.funitsReward}F
                    </p>
                    <p className="text-[8px] opacity-40 font-black uppercase tracking-widest mt-1">Reward Est.</p>
                  </div>
                </div>

                {battleReport[workout.id] && (
                  <div className="p-5 bg-slate-950/80 rounded-2xl border border-blue-500/30 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between mb-2">
                       <p className="text-[9px] font-black uppercase text-blue-400 flex items-center gap-2">
                          <Sparkles className="w-3 h-3" /> Bio-Analysis Complete
                       </p>
                       <span className="text-lg font-black italic text-yellow-500">RANK {battleReport[workout.id].rank}</span>
                    </div>
                    <p className="text-xs italic text-slate-300 font-mono">"{battleReport[workout.id].narrative}"</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 py-4">
                   {workout.status !== 'COMPLETED' && (
                    <button 
                      onClick={() => setActiveConfirmId(workout.id === activeConfirmId ? null : workout.id)}
                      className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                    >
                      {activeConfirmId === workout.id ? 'Abort' : 'Initialize Op'}
                    </button>
                  )}
                </div>

                {activeConfirmId === workout.id && (
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <textarea 
                      value={userNote}
                      onChange={(e) => setUserNote(e.target.value)}
                      placeholder="Relate bio-metrias para validação IA..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono font-bold text-white focus:border-blue-500 focus:outline-none min-h-[80px]"
                    />
                    <button 
                      onClick={() => handleConfirmWorkout(workout)}
                      disabled={confirming}
                      className="w-full bg-emerald-600 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest"
                    >
                      {confirming ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Execute Sync & Analysis'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutsHub;
