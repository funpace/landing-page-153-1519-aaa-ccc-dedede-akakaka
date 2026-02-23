
import React, { useState } from 'react';
import { simulateGamificationStep } from '../services/geminiService';
import { Zap, Play, Info, Sparkles } from 'lucide-react';

const GamificationEngine: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState('Run 10km in 50min');

  const actions = [
    'Run 10km in 50min',
    'Completed 3 intervals of 1km at 4:00 pace',
    'Third consecutive day training',
    'Morning run before 6 AM'
  ];

  const runSimulation = async (action: string) => {
    setLoading(true);
    setActiveAction(action);
    const context = { user: { funits: 850, phase: 2, currentBadges: 12 }, action };
    const res = await simulateGamificationStep(context);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-500/10 rounded-lg">
          <Zap className="text-yellow-500 w-5 h-5"/>
        </div>
        <div>
          <h3 className="text-xl font-bold italic tracking-tight">AI Rules Engine</h3>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Powered by Gemini 3 Flash</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-500 uppercase px-1">Choose a scenario to simulate:</label>
          <div className="flex flex-col gap-2">
            {actions.map(action => (
              <button 
                key={action}
                onClick={() => runSimulation(action)} 
                disabled={loading}
                className={`p-4 rounded-2xl border text-left flex justify-between items-center transition-all ${
                  activeAction === action && result ? 'border-blue-500 bg-blue-500/5' : 'border-slate-800 bg-slate-900/40'
                } hover:border-blue-400`}
              >
                <span className="text-sm font-semibold">{action}</span>
                {loading && activeAction === action ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Play className="w-4 h-4 text-blue-500" />
                )}
              </button>
            ))}
          </div>
          
          <div className="p-4 bg-blue-900/10 border border-blue-900/30 rounded-2xl flex gap-3 items-start">
            <Info className="w-5 h-5 text-blue-400 mt-0.5" />
            <p className="text-xs text-blue-300 leading-relaxed">
              The engine analyzes your performance vs. historical benchmarks and calculates dynamic reward points (Funits).
            </p>
          </div>
        </div>

        <div className="relative">
          {result ? (
            <div className="animate-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center gap-2 mb-2 px-1">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-blue-400 uppercase">Analysis Complete</span>
              </div>
              <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 text-sm font-medium leading-relaxed shadow-2xl">
                <div className="text-slate-300 prose prose-invert max-w-none whitespace-pre-wrap">
                  {result}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-600">
              <Zap className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-bold">Select an action to see AI logic</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamificationEngine;
