
import React, { useState, useEffect } from 'react';
import { 
  Building2, Server, Database, Cpu, Zap, Activity, HardDrive, 
  Plus, RefreshCw, Globe, X, Layout, ShieldPlus, Check, Bot, 
  Search, User as UserIcon, FileSearch, ImageIcon, Archive, 
  LayoutDashboard, Radio, ShieldCheck, Command, Terminal, Box,
  Loader2, AlertTriangle, Fingerprint, Sliders, Play, Pause, Save,
  ShieldAlert, MoreVertical, History, Users, Key, Lock, MonitorCheck,
  TrendingUp, Palette, Vault, Monitor, ArrowLeftRight, Ghost, 
  ChevronRight, ArrowUpRight, ArrowDownRight, MessageSquare,
  // Added BrainCircuit to fix error on line 273
  BrainCircuit
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Organization, TenantStatus, UserRole } from '../types';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'grid' | 'arbitrage' | 'audit'>('grid');
  
  // Mock Data for the God View
  const [tenants, setTenants] = useState<Organization[]>([
    { 
      id: '1', name: 'مؤسسة بيت الصحافة', domain: 'ph-ye.org', status: TenantStatus.ACTIVE, 
      usage: { cpu: 74, ram: 12, storage: 450, apiTokensUsed: 850000, activeUsers: 24 },
      services: ['AI Portal', 'Newsroom']
    },
    { 
      id: '2', name: 'وكالة الأنباء اليمنية', domain: 'saba.ye', status: TenantStatus.ACTIVE, 
      usage: { cpu: 42, ram: 8, storage: 1200, apiTokensUsed: 1200000, activeUsers: 150 },
      services: ['Forensics', 'Vault']
    },
    { 
      id: '3', name: 'صحفيون مستقلون', domain: 'indie.raidan.pro', status: TenantStatus.ACTIVE, 
      usage: { cpu: 15, ram: 2, storage: 45, apiTokensUsed: 12000, activeUsers: 5 },
      services: ['AI Portal']
    }
  ]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleGhostLogin = (id: string) => {
    if (confirm('تفعيل بروتوكول Ghost Login؟ سيتم تسجيل هويتك كمسؤول مؤقت لهذه العقدة.')) {
      alert(`جاري إنشاء نفق سيادي للعقدة: ${id}`);
    }
  };

  const triggerPanic = (id: string) => {
    if (confirm('🚨 تحذير: تفعيل Panic Mode سيقطع كافة الاتصالات ويفعل التمويه. هل أنت متأكد؟')) {
      alert(`تم قفل العقدة ${id} بنجاح.`);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-ar pb-20" dir="rtl">
      
      {/* Top NOC Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'إجمالي العقد', val: '12', sub: 'Nodes Active', icon: Box, color: 'text-blue-500' },
           { label: 'الحمل المجمع', val: '42.8%', sub: 'Global CPU', icon: Cpu, color: 'text-[#e1b000]' },
           { label: 'نزاهة البيانات', val: '100%', sub: 'No Breaches', icon: ShieldCheck, color: 'text-emerald-500' },
           { label: 'جلسات Ghost', val: '2', sub: 'Active Support', icon: Ghost, color: 'text-purple-400' }
         ].map((m, i) => (
           <div key={i} className="glass-morphism p-8 rounded-[3rem] border border-slate-800 shadow-xl group hover:border-[#00338d]/40 transition-all">
              <div className="flex flex-row-reverse justify-between items-start mb-4">
                 <div className={`p-4 bg-slate-900 rounded-2xl ${m.color} shadow-inner group-hover:scale-110 transition-transform`}><m.icon size={24}/></div>
                 <span className="text-[8px] font-black uppercase tracking-widest text-slate-600">Real-time Feed</span>
              </div>
              <div className="text-right">
                 <p className="text-4xl font-black text-white tracking-tighter">{m.val}</p>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{m.label}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Main Operational Area */}
        <div className="xl:col-span-9 space-y-8">
          
          {/* NOC Navigation Tabs */}
          <div className="flex bg-slate-900/60 p-1.5 rounded-[2.5rem] border border-slate-800 w-fit">
            {[
              { id: 'grid', label: 'شبكة المؤسسات', icon: LayoutDashboard },
              { id: 'arbitrage', label: 'مقايضة الموارد', icon: ArrowLeftRight },
              { id: 'audit', label: 'سجل النزاهة الحي', icon: History }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-8 py-4 rounded-[2rem] text-xs font-black flex items-center gap-3 transition-all ${activeTab === tab.id ? 'bg-[#00338d] text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4">
              {tenants.map(org => (
                <div key={org.id} className="group relative glass-morphism p-8 rounded-[3.5rem] border border-slate-800 hover:border-[#00338d]/60 transition-all duration-500 shadow-2xl overflow-hidden flex flex-col h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00338d]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-row-reverse justify-between items-start mb-8 relative z-10">
                    <div className="flex flex-row-reverse items-center gap-4">
                      <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center text-white border border-white/5 font-black text-xl shadow-inner group-hover:bg-[#00338d] transition-colors">
                        {org.name[0]}
                      </div>
                      <div className="text-right">
                        <h4 className="text-lg font-black text-white group-hover:text-[#e1b000] transition-colors">{org.name}</h4>
                        <p className="text-[10px] text-slate-500 font-mono">{org.domain}</p>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full shadow-[0_0_10px] ${org.usage.cpu > 70 ? 'bg-[#e1b000] shadow-[#e1b000]' : 'bg-emerald-500 shadow-emerald-500'} animate-pulse`}></div>
                  </div>

                  <div className="space-y-6 flex-1 relative z-10">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[9px] font-black uppercase text-slate-500">
                         <span>CPU Mesh Load</span>
                         <span className={org.usage.cpu > 70 ? 'text-[#e1b000]' : 'text-slate-400'}>{org.usage.cpu}%</span>
                       </div>
                       <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                         <div className="h-full bg-gradient-to-r from-[#00338d] to-blue-400 transition-all duration-1000" style={{ width: `${org.usage.cpu}%` }}></div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-center">
                          <p className="text-[8px] text-slate-600 font-black uppercase mb-1">Journalists</p>
                          <p className="text-xl font-black text-white">{org.usage.activeUsers}</p>
                       </div>
                       <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-center">
                          <p className="text-[8px] text-slate-600 font-black uppercase mb-1">AI Tokens</p>
                          <p className="text-xl font-black text-[#e1b000]">{(org.usage.apiTokensUsed! / 1000).toFixed(0)}k</p>
                       </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 relative z-10">
                    <button onClick={() => handleGhostLogin(org.id)} className="w-full py-4 bg-[#00338d] hover:bg-blue-800 text-white rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-3 transition-all shadow-lg border border-white/10">
                      <Ghost size={16}/> Ghost Login
                    </button>
                    <button onClick={() => triggerPanic(org.id)} className="w-full py-4 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-3 transition-all">
                      <ShieldAlert size={16}/> Trigger Panic Mode
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="h-full min-h-[350px] rounded-[3.5rem] border-4 border-dashed border-slate-800 hover:border-[#00338d]/40 transition-all flex flex-col items-center justify-center gap-4 group opacity-60 hover:opacity-100 bg-slate-950/20">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-slate-600 group-hover:text-[#00338d] group-hover:scale-110 transition-all">
                  <Plus size={32} />
                </div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">إضافة مؤسسة جديدة</p>
              </button>
            </div>
          )}

          {activeTab === 'arbitrage' && (
            <div className="glass-morphism p-12 rounded-[4.5rem] border border-slate-800 animate-in slide-in-from-bottom-4 space-y-12">
               <div className="text-right">
                  <h3 className="text-3xl font-black text-white flex flex-row-reverse items-center gap-4">نظام مقايضة الموارد <ArrowLeftRight size={32} className="text-[#e1b000]"/></h3>
                  <p className="text-slate-500 mt-2">إعادة توزيع حصص المعالجة (Credits) بين العقد الصحفية ديناميكياً.</p>
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12">
                  <div className="p-8 bg-slate-950 rounded-[3rem] border border-slate-800 text-center space-y-6">
                     <p className="text-[10px] font-black text-slate-500 uppercase">المُصدر (Org A)</p>
                     <p className="text-white font-black text-xl">وكالة الأنباء اليمنية</p>
                     <p className="text-[#e1b000] text-sm font-bold">1.2M Tokens Avail.</p>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="text-center">
                        <p className="text-2xl font-black text-white">500,000</p>
                        <p className="text-[9px] text-slate-500 uppercase font-black">Transfer Credits</p>
                     </div>
                     <input type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00338d]" />
                     <button className="w-full py-5 bg-[#00338d] text-white rounded-2xl font-black text-xs uppercase shadow-3xl">تأكيد عملية النقل</button>
                  </div>

                  <div className="p-8 bg-slate-950 rounded-[3rem] border border-slate-800 text-center space-y-6">
                     <p className="text-[10px] font-black text-slate-500 uppercase">المستقبل (Org B)</p>
                     <p className="text-white font-black text-xl">بيت الصحافة</p>
                     <p className="text-blue-400 text-sm font-bold">850k Tokens Avail.</p>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="glass-morphism rounded-[4rem] border border-slate-800 overflow-hidden animate-in slide-in-from-bottom-4 shadow-3xl">
               <div className="p-8 border-b border-slate-800 bg-slate-950/40 flex flex-row-reverse justify-between items-center">
                  <h4 className="text-xl font-black text-white flex flex-row-reverse items-center gap-3">سجل النزاهة السيادي <ShieldCheck size={24} className="text-[#e1b000]"/></h4>
                  <button className="text-[10px] font-black text-blue-400 border border-blue-500/20 px-4 py-2 rounded-xl">تحميل تقرير التدقيق (PDF)</button>
               </div>
               <div className="divide-y divide-slate-800/50">
                  {[
                    { id: 'TX-99', action: 'Ghost Login Detected', user: 'Zaid (Root)', target: 'PH-Org', time: 'منذ دقيقتين', status: 'Secure' },
                    { id: 'TX-98', action: 'Quota Arbitrage Executed', user: 'System', target: 'Saba.ye', time: 'منذ ساعة', status: 'Verified' },
                    { id: 'TX-97', action: 'New Node Provisioned', user: 'Admin', target: 'Indie-Unit', time: 'منذ ساعتين', status: 'Success' },
                    { id: 'TX-96', action: 'Security Camouflage Active', user: 'Panic-Mode', target: 'Network Wide', time: 'منذ 5 ساعات', status: 'Critical' }
                  ].map((log, i) => (
                    <div key={i} className="p-6 hover:bg-white/5 transition-all flex flex-row-reverse justify-between items-center group">
                       <div className="flex flex-row-reverse items-center gap-6">
                          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-[#e1b000] transition-colors">
                             <Terminal size={20}/>
                          </div>
                          <div className="text-right">
                             <h5 className="text-white font-black text-md">{log.action}</h5>
                             <p className="text-[10px] text-slate-500 mt-1 font-bold">بواسطة: {log.user} • الهدف: {log.target}</p>
                          </div>
                       </div>
                       <div className="flex flex-col items-start gap-1">
                          <span className="text-[9px] font-black uppercase text-[#e1b000]">{log.status}</span>
                          <span className="text-[10px] text-slate-600 font-mono">{log.time}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Command Shortcuts & System Health */}
        <div className="xl:col-span-3 space-y-8">
           
           <div className="glass-morphism p-10 rounded-[4rem] border border-slate-800 bg-[#00338d]/5 relative overflow-hidden shadow-2xl">
              <div className="flex flex-row-reverse items-center gap-4 mb-10 relative z-10">
                 <div className="p-4 bg-[#00338d]/10 rounded-2xl text-[#e1b000] shadow-inner"><Activity size={28}/></div>
                 <h4 className="text-2xl font-black text-white tracking-tighter leading-none">الصحة العامة<br/>للشبكة</h4>
              </div>
              <div className="space-y-10 relative z-10">
                 <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
                       <span>Grid Latency</span>
                       <span className="text-emerald-500">12ms</span>
                    </div>
                    <div className="h-1 bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[95%] shadow-[0_0_8px_emerald]"></div></div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
                       <span>Database Integrity</span>
                       <span className="text-blue-400">Stable</span>
                    </div>
                    <div className="h-1 bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[100%] shadow-[0_0_8px_blue]"></div></div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
                       <span>AI Syncing</span>
                       <span className="text-[#e1b000]">84%</span>
                    </div>
                    <div className="h-1 bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-[#e1b000] w-[84%] shadow-[0_0_8px_gold]"></div></div>
                 </div>
              </div>
              
              <div className="mt-12 p-6 bg-slate-950 border border-slate-800 rounded-3xl text-right">
                 <p className="text-[10px] text-slate-400 font-bold leading-relaxed">العقدة السيادية (Node 01) تعمل بمعايير AES-256 وتلقائية النسخ الاحتياطي نشطة.</p>
              </div>
           </div>

           <div className="glass-morphism p-8 rounded-[3.5rem] border border-slate-800 space-y-6">
              <h4 className="text-lg font-black text-white text-right">أدوات الإدارة السريعة</h4>
              <div className="space-y-3">
                 {[
                   { label: 'تخصيص الهوية (CMS)', path: '/admin/cms', icon: Palette, color: 'text-blue-400' },
                   { label: 'إدارة الـ SEO', path: '/admin/seo', icon: Globe, color: 'text-emerald-400' },
                   { label: 'تدريب الـ AI', path: '/admin/ai-training', icon: BrainCircuit, color: 'text-[#e1b000]' },
                   { label: 'بروتوكولات الأمان', path: '/admin/security', icon: Lock, color: 'text-red-400' }
                 ].map((act, i) => (
                   <button 
                     key={i} 
                     onClick={() => navigate(act.path)}
                     className="w-full p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-row-reverse items-center justify-between group hover:border-[#00338d] transition-all shadow-xl"
                   >
                     <div className="flex flex-row-reverse items-center gap-4">
                        <act.icon size={18} className={act.color} />
                        <span className="text-[11px] font-black text-slate-300 group-hover:text-white transition-colors">{act.label}</span>
                     </div>
                     <ChevronRight size={14} className="text-slate-700 group-hover:text-[#e1b000] rotate-180" />
                   </button>
                 ))}
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPage;
