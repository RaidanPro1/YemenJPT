
import React, { useState, useEffect } from 'react';
import { 
  Settings, Building2, Server, Database, Cpu, Zap, Activity, HardDrive, 
  Plus, RefreshCw, Globe, X, Layout, ShieldPlus, Check, Bot, 
  Trash, CheckCircle, PenTool, Navigation, Mic, MapPin, Code, 
  Briefcase, Search, User as UserIcon, FileSearch, ImageIcon, Archive, 
  LayoutDashboard, Radio, ShieldCheck, Command, Terminal, Box, ExternalLink,
  Loader2, AlertTriangle, Fingerprint, Workflow, Sliders, Layers, Edit3, 
  Play, Pause, Save, Globe2, Mail, ArrowRight, Share2, MousePointer2, LogIn, 
  UserPlus, ShieldAlert, ToggleLeft, ToggleRight, MoreVertical, History, Package,
  Users, CheckCircle2, XCircle, Key, Lock, MonitorCheck, PlusCircle, GlobeIcon,
  Twitter, Facebook, Send, BarChart3, SlidersHorizontal, Trash2, Power, Shield,
  // Added missing TrendingUp icon to fix line 148 error
  TrendingUp
} from 'lucide-react';
import { 
  UserRole, Organization, AiModelType, ModuleCategory, 
  User, UserStatus, ServiceTool, TenantType, TenantStatus,
  TenantSite, TenantPortal, ApiVaultItem
} from '../types';
import { TOOLS, APP_FULL_NAME } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const CommandCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'telemetry' | 'costs' | 'security' | 'organizations'>('telemetry');
  const [killSwitchActive, setKillSwitchActive] = useState(false);

  const telemetryData = [
    { time: '00:00', cpu: 32, gpu: 45, ram: 60 },
    { time: '04:00', cpu: 28, gpu: 30, ram: 58 },
    { time: '08:00', cpu: 65, gpu: 85, ram: 75 },
    { time: '12:00', cpu: 85, gpu: 95, ram: 90 },
    { time: '16:00', cpu: 55, gpu: 70, ram: 80 },
    { time: '20:00', cpu: 40, gpu: 50, ram: 65 },
  ];

  const costData = [
    { name: 'Gemini Cloud', cost: 1200 },
    { name: 'Local Model (Energy)', cost: 350 },
    { name: 'Storage (MinIO)', cost: 150 },
    { name: 'OSINT APIs', cost: 450 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-ar text-right pb-20" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-6 bg-gradient-to-br from-[#00338d]/20 to-black p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e1b000]/5 blur-3xl pointer-events-none"></div>
        <div className="flex flex-row-reverse items-center gap-6">
           <div className="w-20 h-20 bg-[#00338d] rounded-3xl flex items-center justify-center border border-white/10 shadow-3xl">
              <Shield size={40} className="text-[#e1b000]" />
           </div>
           <div className="text-right">
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">🛡️ Command Center</h1>
              <p className="text-[#e1b000] font-black mt-2 text-sm uppercase tracking-widest opacity-80">السيادة التقنية المطلقة | Root Admin Suite</p>
           </div>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => setKillSwitchActive(!killSwitchActive)}
             className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl ${killSwitchActive ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-800 text-red-500 border border-red-500/30'}`}
           >
              <Power size={18} /> {killSwitchActive ? 'SYSTEM IN LOCKDOWN' : 'SYSTEM KILL SWITCH'}
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-900/50 p-1.5 rounded-[2rem] border border-slate-800 w-fit">
        {[
          { id: 'telemetry', label: 'التيليميترى (Health)', icon: Activity },
          { id: 'costs', label: 'التحكم في التكاليف', icon: BarChart3 },
          { id: 'security', label: 'الأمن والتدقيق', icon: Lock },
          { id: 'organizations', label: 'إدارة المؤسسات', icon: Building2 },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-8 py-3 rounded-2xl text-[11px] font-black flex items-center gap-3 transition-all ${activeTab === tab.id ? 'bg-[#00338d] text-white shadow-xl' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
            <tab.icon size={16}/> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'telemetry' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="glass-morphism p-10 rounded-[3rem] border border-slate-800 space-y-6">
              <div className="flex flex-row-reverse justify-between items-center">
                 <h3 className="text-xl font-black text-white">تحليلات الموارد (Real-time Mesh)</h3>
                 <span className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-[9px] font-black text-emerald-400">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span> LIVE SYNC
                 </span>
              </div>
              <div className="h-80 w-full" dir="ltr">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={telemetryData}>
                       <defs>
                          <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#00338d" stopOpacity={0.8}/><stop offset="95%" stopColor="#00338d" stopOpacity={0}/></linearGradient>
                          <linearGradient id="colorGpu" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#e1b000" stopOpacity={0.8}/><stop offset="95%" stopColor="#e1b000" stopOpacity={0}/></linearGradient>
                       </defs>
                       <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                       <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                       <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '1rem', color: '#fff' }} />
                       <Area type="monotone" dataKey="cpu" stroke="#00338d" fillOpacity={1} fill="url(#colorCpu)" name="CPU Usage" />
                       <Area type="monotone" dataKey="gpu" stroke="#e1b000" fillOpacity={1} fill="url(#colorGpu)" name="GPU Usage" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-8">
              <div className="glass-morphism p-8 rounded-[2.5rem] border border-slate-800 text-right space-y-4">
                 <div className="p-4 bg-blue-500/10 rounded-2xl w-fit mr-0 ml-auto"><Server size={28} className="text-blue-500"/></div>
                 <div><p className="text-[10px] font-black text-slate-500 uppercase">Nodes Connected</p><p className="text-4xl font-black text-white">24/24</p></div>
              </div>
              <div className="glass-morphism p-8 rounded-[2.5rem] border border-slate-800 text-right space-y-4">
                 <div className="p-4 bg-emerald-500/10 rounded-2xl w-fit mr-0 ml-auto"><HardDrive size={28} className="text-emerald-500"/></div>
                 <div><p className="text-[10px] font-black text-slate-500 uppercase">MinIO Storage</p><p className="text-4xl font-black text-white">8.2 TB</p></div>
              </div>
              <div className="glass-morphism p-8 rounded-[2.5rem] border border-slate-800 text-right space-y-4 col-span-2">
                 <div className="flex flex-row-reverse justify-between items-center mb-2">
                    <p className="text-[10px] font-black text-slate-500 uppercase">Audit Logging Stream</p>
                    <button className="text-blue-500 text-[10px] font-black uppercase">View Full Log</button>
                 </div>
                 <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-slate-800 font-mono text-[9px] text-slate-400">
                    <p><span className="text-emerald-500">[08:42:11]</span> USER zaid.y accessed HAQIQA_CORE_V1</p>
                    <p><span className="text-blue-500">[08:44:05]</span> TASK celery_worker_01 completed analysis_job_882</p>
                    <p><span className="text-amber-500">[08:45:22]</span> WARN: High latency detected in Cloud Proxy node</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'costs' && (
        <div className="glass-morphism p-10 rounded-[3rem] border border-slate-800 space-y-10">
           <div className="text-right"><h3 className="text-2xl font-black text-white">مراقب التكاليف السيادي</h3><p className="text-slate-500 text-sm mt-1">توزيع استهلاك الائتمان بين Gemini Cloud والمعالجة المحلية.</p></div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="h-80 w-full" dir="ltr">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costData}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                       <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                       <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                       <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '1rem', color: '#fff' }} />
                       <Bar dataKey="cost" fill="#00338d" radius={[10, 10, 0, 0]} name="Cost (USD)" />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
              <div className="space-y-6">
                 <div className="p-8 bg-slate-900/60 rounded-[2rem] border border-slate-800 flex flex-row-reverse justify-between items-center">
                    <div className="text-right"><p className="text-[10px] font-black text-slate-500 uppercase">Estimated Monthly Savings</p><p className="text-3xl font-black text-emerald-500">$2,450.00</p><p className="text-[9px] text-slate-600 font-bold uppercase mt-1">Via Local LLM Fallback</p></div>
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500"><TrendingUp size={32}/></div>
                 </div>
                 <div className="p-8 bg-slate-900/60 rounded-[2rem] border border-slate-800 space-y-4">
                    <h4 className="text-white font-black text-xs uppercase tracking-widest text-right">Quota Control</h4>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase"><span>840k / 1M</span> <span>Gemini Tokens</span></div>
                       <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[84%]"></div></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
      
      {activeTab === 'organizations' && (
         <div className="grid grid-cols-1 gap-8">
            {/* Existing Organization list logic from the previous AdminPage */}
            <div className="p-10 bg-slate-900/40 rounded-[3rem] border border-slate-800 text-center py-20 opacity-40">
               <Building2 size={64} className="mx-auto mb-4" />
               <p className="text-sm font-black uppercase tracking-widest">Multi-Tenant Management Module Locked</p>
            </div>
         </div>
      )}
    </div>
  );
};

export default CommandCenter;
