
import React, { useState, useEffect } from 'react';
import { Home, Trophy, Users, User as UserIcon, Settings, Zap, Activity, Gift, RefreshCcw, Terminal, ChevronLeft, ChevronRight, Menu, Bell } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ProfileView from './components/ProfileView';
import SystemInfo from './components/SystemInfo';
import LandingPage from './components/LandingPage';
import MissionsHub from './components/MissionsHub';
import ClubView from './components/ClubView';
import SyncHub from './components/SyncHub';
import PaymentsView from './components/PaymentsView';
import WorkoutsHub from './components/WorkoutsHub';
import BenefitsHub from './components/BenefitsHub';
import { APP_TABS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('funpace_session') === 'active');
  const [activeTab, setActiveTab] = useState<typeof APP_TABS[number]['id'] | 'sync' | 'payments' | 'system'>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isRailExpanded, setIsRailExpanded] = useState(false);

  const handleLogin = () => {
    localStorage.setItem('funpace_session', 'active');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('funpace_session');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LandingPage onJoin={handleLogin} onLogin={handleLogin} theme={theme} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard onNavigateToTab={(tab) => setActiveTab(tab as any)} theme={theme} />;
      case 'workouts': return <WorkoutsHub />;
      case 'benefits': return <BenefitsHub />;
      case 'profile': return <ProfileView theme={theme} onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} onLogout={handleLogout} onNavigateToPayments={() => setActiveTab('payments')} />;
      case 'system': return <SystemInfo theme={theme} />;
      case 'missions': return <MissionsHub />;
      case 'club': return <ClubView />;
      case 'sync': return <SyncHub />;
      case 'payments': return <PaymentsView />;
      default: return <Dashboard onNavigateToTab={(tab) => setActiveTab(tab as any)} theme={theme} />;
    }
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Console', color: 'text-cyan-400' },
    { id: 'workouts', icon: Activity, label: 'Operations', color: 'text-pink-500' },
    { id: 'missions', icon: Trophy, label: 'Neural Tasks', color: 'text-lime-400' },
    { id: 'benefits', icon: Gift, label: 'Node Rewards', color: 'text-purple-400' },
    { id: 'club', icon: Users, label: 'Network', color: 'text-orange-400' },
    { id: 'profile', icon: UserIcon, label: 'Operator', color: 'text-blue-400' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Side Command Rail (Desktop) */}
      <aside 
        onMouseEnter={() => setIsRailExpanded(true)}
        onMouseLeave={() => setIsRailExpanded(false)}
        className={`hidden md:flex flex-col z-[100] transition-all duration-500 ease-in-out border-r border-white/5 bg-slate-950/80 backdrop-blur-2xl ${isRailExpanded ? 'w-64' : 'w-24'}`}
      >
        <button 
          onClick={handleLogout}
          className="p-6 flex items-center gap-4 w-full hover:bg-white/5 transition-colors text-left"
        >
           <div className="p-2 bg-gradient-to-tr from-cyan-500 to-pink-500 rounded-xl shadow-lg flex-shrink-0">
              <Zap className="w-6 h-6 text-white fill-current" />
           </div>
           {isRailExpanded && (
             <span className="text-xl font-black italic uppercase tracking-tighter animate-in fade-in duration-300">FUNPACE</span>
           )}
        </button>

        <nav className="flex-1 mt-10 px-4 space-y-4">
           {navItems.map(item => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id as any)}
               className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                 activeTab === item.id 
                 ? 'bg-white/5 text-white ring-1 ring-white/10 shadow-xl' 
                 : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
               }`}
             >
                <item.icon className={`w-6 h-6 flex-shrink-0 ${activeTab === item.id ? item.color : ''}`} />
                {isRailExpanded && (
                  <span className="text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-left-2 duration-300">
                    {item.label}
                  </span>
                )}
             </button>
           ))}
        </nav>

        <div className="p-4 space-y-4">
           <button 
             onClick={() => setActiveTab('sync')}
             className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'sync' ? 'bg-orange-600/20 text-orange-400' : 'text-slate-500 hover:text-orange-500'}`}
           >
              <RefreshCcw className={`w-6 h-6 flex-shrink-0 ${activeTab === 'sync' ? 'animate-spin' : ''}`} />
              {isRailExpanded && <span className="text-[10px] font-black uppercase tracking-widest">Resync</span>}
           </button>
           <button 
             onClick={() => setActiveTab('system')}
             className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'system' ? 'bg-cyan-600/20 text-cyan-400' : 'text-slate-500 hover:text-cyan-400'}`}
           >
              <Terminal className="w-6 h-6 flex-shrink-0" />
              {isRailExpanded && <span className="text-[10px] font-black uppercase tracking-widest">Console</span>}
           </button>
        </div>
      </aside>

      {/* Main Panoramic Viewport */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        
        {/* Top Floating Bar */}
        <header className="px-8 py-6 flex justify-between items-center">
           <div className="flex items-center gap-4">
              <button className="md:hidden p-2 text-slate-400 hover:text-white">
                 <Menu className="w-6 h-6" />
              </button>
              <div>
                 <h1 className="text-sm font-black text-slate-500 uppercase tracking-widest leading-none">Command / {activeTab}</h1>
                 <p className="text-[10px] text-cyan-500 font-mono mt-1">S_STREAM: ACTIVE // LATENCY: 14MS</p>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-2xl border border-white/5">
                 <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Mainframe_Linked</span>
              </div>
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                 <Bell className="w-5 h-5" />
                 <div className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full border-2 border-slate-950" />
              </button>
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 ring-2 ring-cyan-500/20">
                 <img src="https://picsum.photos/seed/cyber/100" className="w-full h-full object-cover" />
              </div>
           </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto px-8 pb-32 scrollbar-hide">
           <div className="max-w-[1600px] mx-auto py-4">
              {renderContent()}
           </div>
        </div>

        {/* Mobile Navigation Dock */}
        <nav className="md:hidden fixed bottom-6 left-6 right-6 z-[100] bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-3 flex justify-around shadow-2xl">
           {navItems.slice(0, 5).map(item => (
             <button 
               key={item.id} 
               onClick={() => setActiveTab(item.id as any)}
               className={`p-3 rounded-2xl ${activeTab === item.id ? 'bg-white/10 ' + item.color : 'text-slate-500'}`}
             >
                <item.icon className="w-6 h-6" />
             </button>
           ))}
        </nav>
      </main>

    </div>
  );
};

export default App;
