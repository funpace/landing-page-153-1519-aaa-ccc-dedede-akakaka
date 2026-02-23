
import { PhaseRule, TrainingSession, Badge, StravaActivity, FunitTransaction } from './types';

export const PHASE_RULES: PhaseRule[] = [
  {
    phase: 1, min_funits: 0, required_missions: 0,
    benefits: ['Acesso ao Global Stream', 'Bio-Métricas Base', 'Neural ID'],
    partnerRewards: [{ brand: 'Nitro Energy', reward: '5% OFF', description: 'Géis de carboidrato.' }]
  },
  {
    phase: 2, min_funits: 500, required_missions: 5,
    benefits: ['Sync Strava/Garmin', 'Neural Challenges', 'AI Bio-Coach'],
    partnerRewards: [
      { brand: 'CoffeeRun', reward: 'Espresso Grátis', description: '1 por semana em lojas parceiras.' },
      { brand: 'RecoveryLab', reward: '10% OFF', description: 'Sessões de bota de compressão.' }
    ]
  },
  {
    phase: 3, min_funits: 1500, required_missions: 15,
    benefits: ['Acesso Antecipado Alpha', 'VIP Network Support', 'Análise Bio-Mecânica IA'],
    partnerRewards: [
      { brand: 'FastShoes', reward: '15% OFF', description: 'Válido para toda linha de performance.' },
      { brand: 'HydroPlus', reward: 'Kit Isotônico', description: 'Envio mensal de 10 sachês.' }
    ]
  }
];

export const MOCK_USER_STATS = {
  funits: 850,
  level: 14,
  xpProgress: 65,
  phase: 2,
  streak: 5,
  dailyGoal: 75,
  totalDistance: 124.8,
  rank: 1284,
  title: 'Cyber-Runner Specialist',
  neuralSync: 2450,
  network: 'Mainframe Runners'
};

export const MOCK_SOCIAL_FEED = [
  {
    id: 'f1',
    user: { name: 'Lucas_Net', avatar: 'https://i.pravatar.cc/150?u=11', phase: 2, title: 'Network Scout' },
    activity: { type: 'OVERLOAD', title: 'Data Extraction', distance: '12.5km', pace: '4:15', rank: 'S' },
    narrative: 'Bio-metrias estáveis. Aceleração crítica no setor 10. Neural Sync em 98%.',
    cheers: 24,
    comments: 5,
    timestamp: 'há 12m',
    isValidated: true
  },
  {
    id: 'f2',
    user: { name: 'Sarah_Cyber', avatar: 'https://i.pravatar.cc/150?u=22', phase: 3, title: 'Core Legend' },
    activity: { type: 'LINK', title: 'Night Protocol', distance: '8.0km', pace: '5:00', rank: 'A' },
    narrative: 'Patrulha silenciosa concluída. Eficiência energética otimizada.',
    cheers: 56,
    comments: 12,
    timestamp: 'há 45m',
    isValidated: false
  }
];

// Renamed from MOCK_NETWORK_STATS to match ClubView usage and fix export error
export const MOCK_GUILD_STATS = {
  name: 'Mainframe Runners',
  level: 8,
  members: 42,
  weeklyKm: 840,
  perks: ['+5% Funits em Overload Ops', 'Encrypted Strategy Chat']
};

export const MOCK_TRAININGS: TrainingSession[] = [
  { id: '1', day: 'SEG', fullDate: '20 Mai', title: 'Neural Spike', target: '10x 400m @ 3:45', status: 'COMPLETED', funitsReward: 150, intensity: 'HIGH', type: 'OVERLOAD', neuralSync: 450 },
  { id: '2', day: 'TER', fullDate: '21 Mai', title: 'Recon Link', target: '6km Z2', status: 'COMPLETED', funitsReward: 50, intensity: 'LOW', type: 'RECON', neuralSync: 120 },
  { id: '3', day: 'QUA', fullDate: '22 Mai', title: 'Sync Stream', target: '8km Z4 Sustentado', status: 'PENDING', funitsReward: 120, intensity: 'HIGH', type: 'LINK', neuralSync: 300 },
];

export const MOCK_BADGES: Badge[] = [
  { id: '1', name: 'Early Node', description: 'Sincronizou antes das 06:00', icon: '📡', rarity: 'STANDARD', unlockedAt: new Date().toISOString() },
  { id: '2', name: 'Road Protocol', description: 'Total de 100km processados', icon: '💾', rarity: 'ADVANCED' },
];

export const APP_TABS = [
  { id: 'home', label: 'Console' },
  { id: 'workouts', label: 'Operations' },
  { id: 'missions', label: 'Neural Tasks' },
  { id: 'benefits', label: 'Nodes' },
  { id: 'club', label: 'Network' },
  { id: 'profile', label: 'Operator' },
] as const;

export const MOCK_FUNIT_HISTORY: FunitTransaction[] = [
  { id: 'h1', amount: 150, description: 'Operation "Neural Spike"', type: 'EARN', date: '2024-05-20', source: 'System' },
];

export const MOCK_MISSIONS_EXTENDED = [
  { id: 'm1', type: 'DAILY', title: 'Setor de Exploração', desc: 'Sincronize 5km antes das 8h.', reward: 100, rarity: 'STANDARD', phaseRequired: 1, status: 'PENDING' },
  { id: 'm3', type: 'SPECIAL', title: 'Mainframe Overload', desc: 'Processamento de 42km em 48h.', reward: 2000, rarity: 'PROTOTYPE', phaseRequired: 2, status: 'PENDING' },
];

// Added missing mock data for SyncHub
export const MOCK_STRAVA_ACTIVITIES: StravaActivity[] = [
  {
    id: 's1',
    name: 'Morning Recon',
    distance: 5200,
    moving_time: 1500,
    average_speed: 3.4,
    start_date: '2024-05-22T08:00:00Z',
    status: 'SYNCED'
  },
  {
    id: 's2',
    name: 'Night Protocol',
    distance: 8000,
    moving_time: 2400,
    average_speed: 3.3,
    start_date: '2024-05-21T20:00:00Z',
    status: 'VALIDATED',
    funitsEarned: 120
  }
];
