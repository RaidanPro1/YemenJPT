
import React, { useState, useEffect, Suspense, lazy, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, Search, ShieldCheck, Bot, Archive, Settings, 
  Menu, X, Terminal, LogOut, ShieldAlert, Box, Cpu, 
  Globe, Newspaper, GraduationCap, Briefcase, FileSearch, 
  Loader2, Key, Palette, Smartphone, Eye, ShieldCheck as SecurityIcon,
  BrainCircuit, LayoutTemplate, BarChart, Settings2, ChevronDown, ChevronRight, ChevronLeft,
  ShieldPlus, Activity, Database, Vault, Share2, Plus, Star, History, Command
} from 'lucide-react';

import { UserRole, User, ModuleCategory } from './types';
import { AppLogoText, TRANSLATIONS } from './constants';

const LanguageContext = createContext({ lang: 'ar', t: (key: string) => key });

// Pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PortalPage = lazy(() => import('./pages/PortalPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DocsPage = lazy(() => import('./pages/DocsPage'));

// Admin Sub-Modules
const AdminCMS = lazy(() => import('./pages/admin/AdminCMS'));
const AdminTenants = lazy(() => import('./pages/admin/AdminTenants'));
const AdminSEO = lazy(() => import('./pages/admin/AdminSEO'));
const AdminSecurity = lazy(() => import('./pages/admin/AdminSecurity'));
const AdminAIRetraining = lazy(() => import('./pages/AdminAIRetraining'));
const AdminToolsPortal = lazy(() => import('./pages/admin/AdminToolsPortal'));

const NavItem = ({ to, icon: Icon, children, active, isSidebarOpen, badge }: any) => (
  <Link 
    to={to} 
    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
      active 
        ? 'bg-[#00338d] text-white shadow-lg shadow-blue-900/20 border border-white/10' 
        : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
    }`}
  >
    <Icon size={20} className={active ? 'text-[#e1b000]' : 'group-hover:text-white transition-colors'} /> 
    {isSidebarOpen && <span className="font-bold flex-1">{children}</span>}
    {isSidebarOpen && badge && (
      <span className="bg-[#e1b000] text-[#00338d] text-[8px] font-black px-2 py-0.5 rounded-full">{badge}</span>
    )}
  </Link>
);

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [openTools, setOpenTools] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('yemengpt_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('yemengpt_user');
    setUser(null);
    navigate('/login');
  };

  if (!user && location.pathname !== '/login') return <Navigate to="/login" />;

  const t = (key: string) => (TRANSLATIONS as any)['ar'][key] || key;

  const quickShortcuts = [
    { icon: Plus, label: 'مؤسسة', path: '/admin/tenants', color: 'text-blue-400' },
    { icon: ShieldAlert, label: 'طوارئ', path: '/admin/security', color: 'text-red-500' },
    { icon: BrainCircuit, label: 'تدريب', path: '/admin/ai-training', color: 'text-[#e1b000]' },
    { icon: Terminal, label: 'Mesh', path: '/dashboard', color: 'text-white' },
  ];

  return (
    <LanguageContext.Provider value={{ lang: 'ar', t }}>
      <div className="min-h-screen bg-[#020617] text-white flex flex-col font-ar overflow-x-hidden" dir="rtl">
        <div className="flex flex-1">
          {user && (
            <aside className={`${isSidebarOpen ? 'w-80' : 'w-24'} glass-morphism border-l border-slate-800/60 transition-all duration-500 flex flex-col fixed inset-y-0 right-0 z-50`}>
              <div className="p-8 flex items-center gap-4 border-b border-slate-800/40">
                <div className="w-10 h-10 bg-[#00338d] rounded-xl flex items-center justify-center font-black shadow-lg shadow-blue-900/40">R</div>
                {isSidebarOpen && <div className="flex flex-col"><AppLogoText className="text-xl" /><span className="text-[8px] uppercase tracking-[0.2em] text-[#e1b000] font-bold">Root Commander</span></div>}
              </div>

              {isSidebarOpen && (
                <div className="px-6 py-4">
                   <div className="relative group">
                      <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#e1b000] transition-colors" />
                      <input 
                        type="text" 
                        placeholder="بحث سريع (Alt+K)..." 
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 pr-12 pl-4 text-xs text-white focus:outline-none focus:border-[#00338d] transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                   </div>
                </div>
              )}

              <div className={`px-6 py-4 flex ${isSidebarOpen ? 'justify-between' : 'flex-col items-center gap-6'} border-b border-slate-800/20 mb-2`}>
                 {quickShortcuts.map((item, idx) => (
                   <button 
                    key={idx} 
                    onClick={() => navigate(item.path)}
                    title={item.label}
                    className={`w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center ${item.color} hover:bg-[#00338d] hover:text-white transition-all shadow-inner group relative`}
                   >
                     <item.icon size={18} />
                   </button>
                 ))}
              </div>
              
              <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto custom-scrollbar">
                <NavItem to="/" icon={Box} active={location.pathname === '/'} isSidebarOpen={isSidebarOpen}>{t('portal')}</NavItem>
                <NavItem to="/dashboard" icon={LayoutDashboard} active={location.pathname === '/dashboard'} isSidebarOpen={isSidebarOpen}>{t('dashboard')}</NavItem>
                
                {user.role === UserRole.ADMIN && (
                  <div className="pt-6 space-y-1.5 mt-4 border-t border-slate-800/40">
                    <div className={`flex items-center justify-between px-6 mb-4 ${!isSidebarOpen && 'hidden'}`}>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">إدارة النظام</p>
                      <Star size={12} className="text-[#e1b000] opacity-30" />
                    </div>
                    
                    <div className="space-y-1">
                      <button 
                        onClick={() => setOpenTools(!openTools)}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-500 hover:bg-white/5 transition-all group ${openTools && 'text-white'}`}
                      >
                        <ShieldPlus size={20} className={openTools ? 'text-[#e1b000]' : 'group-hover:text-white'} />
                        {isSidebarOpen && <span className="font-bold flex-1 text-right">بوابات الأدوات</span>}
                        {isSidebarOpen && <ChevronDown size={14} className={`transition-transform duration-300 ${openTools ? 'rotate-180' : ''}`} />}
                      </button>
                      
                      {openTools && isSidebarOpen && (
                        <div className="pr-10 space-y-1 animate-in slide-in-from-top-2 duration-300">
                          <Link to="/admin/tools/verification" className="block py-2 text-[11px] font-bold text-slate-500 hover:text-[#e1b000] transition-colors border-r border-slate-800 pr-4 flex items-center justify-between group/link">
                             وحدة التحقق
                             <ChevronLeft size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity translate-x-2" />
                          </Link>
                          <Link to="/admin/tools/osint" className="block py-2 text-[11px] font-bold text-slate-500 hover:text-[#e1b000] transition-colors border-r border-slate-800 pr-4 flex items-center justify-between group/link">
                             نظام كشّاف
                             <ChevronLeft size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity translate-x-2" />
                          </Link>
                        </div>
                      )}
                    </div>

                    <NavItem to="/admin/tenants" icon={Settings2} active={location.pathname === '/admin/tenants'} isSidebarOpen={isSidebarOpen}>المستأجرين</NavItem>
                    <NavItem to="/admin/cms" icon={Palette} active={location.pathname === '/admin/cms'} isSidebarOpen={isSidebarOpen}>الهوية (CMS)</NavItem>
                    <NavItem to="/admin/seo" icon={Globe} active={location.pathname === '/admin/seo'} isSidebarOpen={isSidebarOpen}>محركات البحث</NavItem>
                    <NavItem to="/admin/ai-training" icon={BrainCircuit} active={location.pathname === '/admin/ai-training'} isSidebarOpen={isSidebarOpen} badge="RETRAINING">AI Nexus</NavItem>
                    <NavItem to="/admin/security" icon={SecurityIcon} active={location.pathname === '/admin/security'} isSidebarOpen={isSidebarOpen}>الأمن والولوج</NavItem>
                  </div>
                )}
              </nav>

              <div className="p-8 border-t border-slate-800/40 bg-[#020617]/40">
                 <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-500 hover:text-red-500 transition-all font-bold group">
                   <LogOut size={20} className="group-hover:rotate-12 transition-transform" /> 
                   {isSidebarOpen && <span>خروج سيادي</span>}
                 </button>
              </div>
            </aside>
          )}

          <main className={`flex-1 transition-all duration-500 ${user ? (isSidebarOpen ? 'mr-80' : 'mr-24') : ''} flex flex-col`}>
            {user && (
              <header className="h-24 glass-morphism border-b border-slate-800/60 px-10 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-6">
                  <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-4 bg-slate-900 rounded-xl text-slate-400 hover:text-white transition-all shadow-inner">
                    <Menu size={24} />
                  </button>
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#e1b000]/5 rounded-full border border-[#e1b000]/20">
                     <span className="w-2 h-2 bg-[#e1b000] rounded-full animate-pulse shadow-[0_0_8px_rgba(225,176,0,0.6)]"></span>
                     <span className="text-[10px] font-black text-[#e1b000] uppercase tracking-widest">Sovereign Grid Online</span>
                  </div>
                  <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-800 text-[10px] text-slate-500 font-mono">
                    <Command size={12} /> + K
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-[#e1b000] uppercase tracking-widest">Root Command Center</p>
                    <p className="text-xs font-bold text-white mt-0.5">{user.name}</p>
                  </div>
                  <div className="relative group">
                    <img src={user.avatar} className="w-14 h-14 rounded-[1.4rem] border-2 border-[#00338d] shadow-xl group-hover:scale-105 transition-transform" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#e1b000] rounded-full border-4 border-[#020617]"></div>
                  </div>
                </div>
              </header>
            )}

            <div className="p-10 flex-1 relative">
              <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center"><Loader2 className="animate-spin text-[#e1b000]" size={48} /></div>}>
                <Routes>
                  <Route path="/login" element={<LoginPage onLogin={(role) => {
                    const mockUser = { id: '1', name: 'Zaid Al-Yamani', email: 'root@raidan.pro', role, avatar: 'https://ui-avatars.com/api/?name=Zaid&background=00338d&color=fff', status: 'Approved' };
                    localStorage.setItem('yemengpt_user', JSON.stringify(mockUser));
                    setUser(mockUser as any);
                    navigate('/');
                  }} />} />
                  <Route path="/" element={<PortalPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin/cms" element={<AdminCMS />} />
                  <Route path="/admin/tenants" element={<AdminTenants />} />
                  <Route path="/admin/seo" element={<AdminSEO />} />
                  <Route path="/admin/ai-training" element={<AdminAIRetraining />} />
                  <Route path="/admin/security" element={<AdminSecurity />} />
                  <Route path="/admin/tools/:category" element={<AdminToolsPortal />} />
                </Routes>
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </LanguageContext.Provider>
  );
};

const App: React.FC = () => <HashRouter><AppContent /></HashRouter>;
export default App;
