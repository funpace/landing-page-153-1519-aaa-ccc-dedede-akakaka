
import React, { useState } from 'react';
import { Check, Zap, Star, Crown, CreditCard, ShieldCheck } from 'lucide-react';

export const PLANS = [
  {
    id: 'free',
    name: 'Pace (Grátis)',
    price: 'R$ 0',
    description: 'Essencial para quem está começando.',
    features: ['Sincronização Básica', 'Feed da Comunidade', 'Emblemas Comuns'],
    icon: Zap,
    color: 'slate'
  },
  {
    id: 'monthly',
    name: 'Sprint (Mensal)',
    price: 'R$ 29,90',
    description: 'Otimizado para corredores constantes.',
    features: ['Coach IA Ilimitado', 'Missões Épicas', 'Rewards de Parceiros (Fase 2)', 'Sincronização em Tempo Real'],
    icon: Star,
    color: 'blue',
    popular: true
  },
  {
    id: 'annual',
    name: 'Marathon (Anual)',
    price: 'R$ 299,00',
    description: 'Comprometimento total com a elite.',
    features: ['Todos os benefícios Sprint', 'Acesso VIP a Eventos', 'Descontos Exclusivos (Fase 3)', 'Suporte Prioritário'],
    icon: Crown,
    color: 'indigo'
  }
];

const PaymentsView: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <header className="text-center space-y-4">
        <h2 className="text-5xl font-black italic uppercase tracking-tighter">Escolha seu <span className="fun-text-gradient">Ritmo</span></h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Junte-se ao clube de membros e acelere sua evolução</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <div 
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`relative p-8 rounded-[3rem] border-2 transition-all cursor-pointer group hover:scale-[1.02] ${
              selectedPlan === plan.id 
                ? 'bg-slate-900 border-blue-500 shadow-2xl shadow-blue-500/20' 
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase px-4 py-1 rounded-full shadow-lg">
                Mais Popular
              </div>
            )}
            
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-slate-900 border border-slate-800 ${selectedPlan === plan.id ? 'text-blue-500' : 'text-slate-500'}`}>
                <plan.icon className="w-8 h-8" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-black italic">{plan.price}</p>
                <p className="text-[10px] font-bold opacity-50 uppercase">{plan.id === 'free' ? 'Para Sempre' : 'Por Período'}</p>
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <h3 className="text-xl font-black italic uppercase">{plan.name}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight">
                  <div className={`p-1 rounded-full ${selectedPlan === plan.id ? 'bg-blue-500/20 text-blue-500' : 'bg-slate-800 text-slate-500'}`}>
                    <Check className="w-3 h-3" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
              selectedPlan === plan.id 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/40' 
                : 'bg-slate-800 text-slate-400'
            }`}>
              {plan.id === 'free' ? 'Assinar Agora' : 'Começar Teste Grátis'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-emerald-500/10 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h4 className="text-lg font-black italic uppercase tracking-tight">Segurança Total Funpace</h4>
            <p className="text-xs text-slate-500 font-medium">Pagamentos processados via Stripe e encriptação ponta-a-ponta.</p>
          </div>
        </div>
        <div className="flex gap-4 opacity-50 grayscale contrast-125">
          <CreditCard className="w-8 h-8" />
          <div className="font-black italic text-xl">VISA</div>
          <div className="font-black italic text-xl">MASTER</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsView;
