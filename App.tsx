
import React, { useState, useEffect, Suspense, lazy, createContext, useContext, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, Search, ShieldCheck, Bot, Archive, Settings, 
  Menu, X, Activity, Terminal, Sparkles, LogOut, 
  ShieldAlert, Box, Cpu, Mic, Video, ImageIcon, 
  Fingerprint, Radio, MapPin, Globe, Newspaper, GraduationCap, 
  Briefcase, FileSearch, Loader2, Key, Lock, BookOpen, BrainCircuit,
  MessageSquare, LayoutGrid
} from 'lucide-react';

import { UserRole, User, UserStatus } from './types';
import { gemini } from './services/gemini';
import { AppLogoText, TRANSLATIONS, APP_NAME } from './constants';

const LanguageContext = createContext({
  lang: 'ar',
  t: (key: string) => ''
});

// Lazy load pages
const PortalPage = lazy(() => import('./pages/PortalPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const OSINTPage = lazy(() => import('./pages/OSINTPage'));
const VerificationPage = lazy(() => import('./pages/VerificationPage'));
const AICorePage = lazy(() => import('./pages/AICorePage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const AdminAIRetraining = lazy(() => import('./pages/AdminAIRetraining'));
const ObservatoryPage = lazy(() => import('./pages/ObservatoryPage'));
const FactCheckPage = lazy(() => import('./pages/FactCheckPage'));
const AcademyPage = lazy(() => import('./pages/AcademyPage'));
const MediaHubPage = lazy(() => import('./pages/MediaHubPage'));
const ArchivePage = lazy(() => import('./pages/ArchivePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DocsPage = lazy(() => import('./pages/DocsPage'));

const FloatingAssistant = ({ user }: { user: User }) => {
  const { t } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  if (user.role !== UserRole.ADMIN) return null;

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const userMsg = { role: 'user', content: input };
    setHistory(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    try {
      const res = await gemini.chat(currentInput, history, { lowLatency: true, isCodeAssistant: true });
      setHistory(prev => [...prev, { role: 'assistant', content: res.text }]);
    } catch (e) {
      setHistory(prev => [...prev, { role: 'assistant', content: "عقدة YemenJPT غير مستجيبة حالياً." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[9999]">
      {isOpen && (
        <div className="mb-6 w-96 h-[32rem] glass-morphism border border-slate-700 rounded-[2.5rem] shadow-3xl flex flex-col overflow-hidden animate-in zoom-in-95 origin-bottom">
           <div className="p-5 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <Terminal size={18} className="text-[#e1b000]"/>
                 <div className="text-right">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest block">{t('code_mode')}</span>
                    <p className="text-[8px] text-slate-500 font-bold uppercase">YemenJPT Console</p>
                 </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white"><X size={18}/></button>
           </div>
           <div className="flex-1 overflow-y-auto p-6 bg-slate-950/40 space-y-4 text-sm" dir="rtl">
              {history.length === 0 && (
                <div className="text-center py-10 opacity-30">
                  <Bot size={40} className="mx-auto mb-3" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Console Offline Input Ready</p>
                </div>
              )}
              {history.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                   <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${m.role === 'user' ? 'bg-slate-800 text-white' : 'bg-[#003087]/20 border border-[#003087]/30 text-slate-200'}`}>
                      {m.content}
                   </div>
                </div>
              ))}
              {loading && <Loader2 className="animate-spin mx-auto text-[#003087] w-5 h-5"/>}
           </div>
           <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                placeholder="استعلام بروتوكول YemenJPT..." 
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white text-right outline-none focus:border-[#003087]" 
              />
              <button onClick={handleAsk} className="w-12 h-12 bg-[#003087] hover:bg-blue-600 rounded-xl flex items-center justify-center text-white transition-all"><Sparkles size={20}/></button>
           </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-[#003087] rounded-[1.5rem] shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all border border-blue-500/20"><Terminal size={28} /></button>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [lang] = useState('ar');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('yemengpt_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const t = useCallback((key: string) => {
    return (TRANSLATIONS as any)[lang][key] || key;
  }, [lang]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('yemengpt_user');
    navigate('/login');
  };

  if (!user && location.pathname !== '/login') return <Navigate to="/login" />;

  const navItems = [
    { to: '/', icon: LayoutGrid, label: 'portal' },
    { to: '/dashboard', icon: LayoutDashboard, label: 'dashboard' },
    { to: '/docs', icon: BookOpen, label: 'مستندات المنظومة' },
    { to: '/observatory', icon: ShieldAlert, label: 'observatory' },
    { to: '/factcheck', icon: FileSearch, label: 'factcheck' },
    { to: '/academy', icon: GraduationCap, label: 'academy' },
    { to: '/mediahub', icon: Newspaper, label: 'mediahub' },
    { to: '/archive', icon: Archive, label: 'archive' },
    { to: '/osint', icon: Search, label: 'osint' },
    { to: '/verification', icon: ShieldCheck, label: 'verification' },
    { to: '/ai', icon: Bot, label: 'ai' },
    { to: '/services', icon: Briefcase, label: 'services' },
  ];

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      <div className={`min-h-screen flex flex-col bg-[#020617] text-white overflow-hidden font-ar`} dir="rtl">
        <div className="flex flex-1 overflow-hidden">
          {user && (
            <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} glass-morphism border-slate-800/60 border-l transition-all duration-500 flex flex-col fixed inset-y-0 right-0 z-50 shadow-2xl`}>
              <div className="p-6 flex items-center gap-4 border-b border-slate-800/60">
                <div className="w-10 h-10 bg-[#003087] rounded-xl flex items-center justify-center shadow-lg border border-blue-500/30">
                  <AppLogoText className="text-white text-[10px]" />
                </div>
                {isSidebarOpen && <h1 className="text-xl font-black text-white tracking-tighter uppercase"><AppLogoText /></h1>}
              </div>
              <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                {navItems.map(item => (
                  <Link 
                    key={item.to} 
                    to={item.to} 
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ${location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to)) ? 'bg-[#003087] text-white shadow-[0_10px_20px_rgba(0,48,135,0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <item.icon size={20} className={location.pathname === item.to ? 'text-[#e1b000]' : ''} /> 
                    {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">{t(item.label)}</span>}
                  </Link>
                ))}
                
                {user.role === UserRole.ADMIN && (
                  <div className="pt-4 mt-4 border-t border-slate-800/60 space-y-1.5">
                    <Link to="/admin" className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${location.pathname === '/admin' ? 'bg-[#003087] text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                      <Settings size={20} /> {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">{t('admin')}</span>}
                    </Link>
                    <Link to="/admin/ai-retraining" className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${location.pathname === '/admin/ai-retraining' ? 'bg-[#003087] text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                      <BrainCircuit size={20} /> {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">تحسين AI</span>}
                    </Link>
                  </div>
                )}
              </nav>
              <div className="p-6 border-t border-slate-800/60">
                 <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-slate-500 hover:text-red-500 transition-all duration-300">
                    <LogOut size={20} /> {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">{t('logout')}</span>}
                 </button>
              </div>
            </aside>
          )}

          <main className={`flex-1 transition-all duration-500 ${user ? (isSidebarOpen ? 'mr-72' : 'mr-24') : ''} flex flex-col h-screen overflow-hidden`}>
            {user && (
              <header className="h-20 glass-morphism border-b border-slate-800/60 px-10 flex items-center justify-between sticky top-0 z-40 bg-slate-950/80 backdrop-blur-3xl shrink-0">
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400 hover:text-white transition-colors"><Menu size={24} /></button>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                     <p className="text-[10px] font-black text-[#e1b000] uppercase tracking-widest leading-none mb-1">المستخدم السيادي</p>
                     <p className="text-xs font-bold text-white">{user.name}</p>
                  </div>
                  <img src={user.avatar} className="w-10 h-10 rounded-xl border border-[#003087] shadow-lg" alt="User Avatar" />
                </div>
              </header>
            )}

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-950/20">
              <div className="p-8 lg:p-12">
                <Suspense fallback={
                  <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <Loader2 className="animate-spin text-[#003087] w-10 h-10" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">جاري تحميل الوحدة السيادية...</p>
                  </div>
                }>
                  <Routes>
                    <Route path="/login" element={<LoginPage onLogin={(role) => {
                      const mock: User = { 
                        id: '1', 
                        name: 'زيد اليماني', 
                        email: 'root@yemenjpt.local', 
                        role, 
                        avatar: 'https://ui-avatars.com/api/?name=Zaid&background=003087&color=fff', 
                        status: UserStatus.APPROVED, 
                        usage: { cpu: 0, ram: 0, storage: 0, apiTokens: 0, cpuLimit: 100, ramLimit: 32, storageLimit: 1000, apiLimit: 100000 } 
                      };
                      setUser(mock);
                      localStorage.setItem('yemengpt_user', JSON.stringify(mock));
                      navigate('/');
                    }} />} />
                    <Route path="/" element={<PortalPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/docs" element={<DocsPage />} />
                    <Route path="/observatory" element={<ObservatoryPage />} />
                    <Route path="/factcheck" element={<FactCheckPage />} />
                    <Route path="/academy" element={<AcademyPage />} />
                    <Route path="/mediahub" element={<MediaHubPage />} />
                    <Route path="/archive" element={<ArchivePage />} />
                    <Route path="/osint" element={<OSINTPage />} />
                    <Route path="/verification" element={<VerificationPage />} />
                    <Route path="/ai" element={<AICorePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/ai-retraining" element={<AdminAIRetraining />} />
                  </Routes>
                </Suspense>
              </div>
            </div>
          </main>
        </div>
        {user && <FloatingAssistant user={user} />}
      </div>
    </LanguageContext.Provider>
  );
};

const App: React.FC = () => <HashRouter><AppContent /></HashRouter>;
export default App;
