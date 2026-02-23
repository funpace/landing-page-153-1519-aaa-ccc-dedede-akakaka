
export enum SubscriptionStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED'
}

export interface PhaseRule {
  phase: number;
  min_funits: number;
  required_missions: number;
  benefits: string[];
  partnerRewards: { brand: string; reward: string; description: string }[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  rarity: 'STANDARD' | 'ADVANCED' | 'ELITE' | 'PROTOTYPE';
}

export interface FunitTransaction {
  id: string;
  amount: number;
  description: string;
  type: 'EARN' | 'SPEND';
  date: string;
  source: string;
}

export interface TrainingSession {
  id: string;
  day: string;
  fullDate: string;
  title: string;
  target: string;
  status: 'COMPLETED' | 'PENDING' | 'SKIPPED';
  funitsReward: number;
  linkedMissionId?: string;
  intensity: 'LOW' | 'MEDIUM' | 'HIGH';
  type: 'RECON' | 'LINK' | 'OVERLOAD'; // Novo esquema Cyber
  neuralSync?: number; // Substitui Combat Power
  syncStatus?: {
    email: boolean;
    phone: boolean;
    watch: boolean;
  };
}

export interface StravaActivity {
  id: string;
  name: string;
  distance: number; 
  moving_time: number; 
  average_speed: number; 
  start_date: string;
  status: 'SYNCED' | 'VALIDATED' | 'REJECTED';
  funitsEarned?: number;
  performanceRank?: 'S' | 'A' | 'B' | 'C';
}

export interface UserStats {
  funits: number;
  level: number;
  phase: number;
  totalDistance: number;
  badges: Badge[];
  neuralSync: number;
}
