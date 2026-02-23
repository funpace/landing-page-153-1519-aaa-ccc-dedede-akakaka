
import React from 'react';
import { Cpu, Globe, Database, Shield, Zap, ArrowRight, Layers, MessageSquareQuote } from 'lucide-react';

const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="text-xl font-black italic uppercase text-blue-500">Fluxo de Dados IA</h4>
          <div className="space-y-4">
            {[
              { step: '1. Ingestão', desc: 'Atividade recebida via Strava Webhook ou Manual Sync.', icon: Zap },
              { step: '2. Auditoria IA', desc: 'Gemini 3 Flash analisa pace/cadência vs histórico.', icon: Cpu },
              { step: '3. Gamificação', desc: 'Cálculo dinâmico de CP e atribuição de Funits.', icon: Database },
              { step: '4. Narrative', desc: 'Geração de relatório de batalha épico via LLM.', icon: MessageSquareQuote }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-slate-950/50 border border-slate-800 rounded-2xl relative">
                <div className="bg-blue-600/20 p-2 rounded-lg h-fit">
                  <item.icon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-slate-400">{item.step}</p>
                  <p className="text-sm font-medium text-slate-300">{item.desc}</p>
                </div>
                {i < 3 && <ArrowRight className="absolute -bottom-4 left-6 rotate-90 w-4 h-4 text-slate-700" />}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-black italic uppercase text-indigo-500">Engine de RPG (Lógica)</h4>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-slate-500">Fórmula do Combat Power (CP)</p>
              <div className="p-4 bg-black rounded-xl font-mono text-xs text-blue-400">
                CP = (Distancia * Multiplicador_Intensidade) + (Frequencia_Semanal * 1.5)
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase text-slate-500">Phases Progress Thresholds</p>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold">
                  <span>FASE 1: RECRUTA</span>
                  <span>0 - 500 F</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-500 w-1/4" />
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span>FASE 2: ELITE</span>
                  <span>501 - 1500 F</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/2" />
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span>FASE 3: LENDA</span>
                  <span>+1501 F</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-blue-600/5 border border-blue-500/20 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center">
        <div className="p-5 bg-blue-600 rounded-2xl">
          <Layers className="w-10 h-10 text-white" />
        </div>
        <div>
          <h4 className="text-2xl font-black italic uppercase tracking-tighter">Módulos do Sistema</h4>
          <p className="text-sm text-slate-400 mt-1">Organização escalável baseada em domínios de negócio para crescimento da plataforma Funpace.</p>
        </div>
        <div className="flex flex-wrap gap-2 md:ml-auto">
          {['Core', 'IA_Service', 'Strava_Sync', 'RPG_Engine', 'UI_Components'].map(tag => (
            <span key={tag} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[10px] font-bold font-mono">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchitectureView;
