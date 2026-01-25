
import React, { useState, useEffect } from 'react';
import { 
  Users, FileCheck, Activity, Clock, ShieldCheck, Lock, Zap, 
  Cpu, Database, Globe, AlertCircle, Server, HardDrive, TrendingUp, ChevronRight,
  Share2, Newspaper, Mail, Layout, Search, Eye, Bot
} from 'lucide-react';
import { TOOLS, AppLogoText, PARTNERSHIP_TEXT } from '../constants';
import { ServiceTool, ModuleCategory, UserRole, User as UserType } from '../types';

const MetricCard = ({ title, value, sub, icon: Icon, color, status }: any) => (
  <div className="glass-morphism p-8 rounded-[3rem] relative overflow-hidden group border border-slate-800/50 hover:bg-slate-900/40 hover:border-[#00338d]/30 transition-all duration-500 shadow-xl">
    <div className={`absolute top-0 left-0 w-2 h-full ${color} opacity-40`}></div>
    <div className="flex justify-between items-start mb-8">
      <div className={`p-4 rounded-2xl ${color.replace('bg-', 'bg-')}/10 text-white shadow-lg border border-white/5`}>
        <Icon size={28} className={color.replace('bg-', 'text-')} />
      </div>
      {status && (
        <span className="flex items-center gap-2 px-4 py-1.5 bg-black/40 rounded-full border border-slate-800 text-[10px] font-black uppercase text-[#e1b000] shadow-inner">
           <span className="w-2 h-2 bg-[#e1b000] rounded-full animate-pulse shadow-[0_0_8px_rgba(225,176,0,0.8)]"></span> {status}
        </span>
      )}
    </div>
    <div className="text-right">
      <h3 className="text-slate-500 text-[11px] font-black uppercase tracking-widest mb-1">{title}</h3>
      <p className="text-4xl font-black text-white mb-2 tracking-tighter">{value}</p>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{sub}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('yemengpt_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Sovereign Brand Banner - Updated Gradients to Royal Blue & Gold */}
      <div className="bg-gradient-to-br from-[#00338d]/40 via-[#020617] to-black p-12 lg:p-16 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#00338d] blur-[150px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-[#e1b000]/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-12 relative z-10">
          <div className="flex items-center gap-10">
            <div className="w-32 h-32 bg-white/5 backdrop-blur-3xl rounded-[3rem] flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 group hover:rotate-6 transition-all duration-500 ring-4 ring-[#e1b000]/10">
              <img src="logo.png" alt="RaidanPro" className="w-24 h-24 object-contain drop-shadow-2xl" />
            </div>
            <div className="text-right">
              <div className="flex flex-row-reverse items-center gap-4 mb-2">
                 <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-none">Yemen<span className="text-[#e1b000]">JPT</span></h1>
                 <span className="px-5 py-1.5 bg-[#00338d] text-white text-[10px] font-black rounded-full shadow-[0_0_30px_rgba(0,51,141,0.4)] uppercase">Sovereign Mesh</span>
              </div>
              <div className="flex flex-row-reverse items-center gap-4 pr-1">
                  <p className="text-[#e1b000] font-black text-sm uppercase tracking-[0.4em]">{PARTNERSHIP_TEXT}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
             <div className="bg-white/5 backdrop-blur-2xl px-10 py-8 rounded-[3rem] border border-white/10 flex items-center gap-8 group hover:bg-blue-900/20 transition-all shadow-2xl">
                <div className="p-5 bg-blue-500/10 rounded-[1.5rem] text-[#e1b000] shadow-inner group-hover:scale-110 transition-transform border border-[#e1b000]/20">
                  <ShieldCheck size={44} />
                </div>
                <div className="text-right">
                   <p className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-1">تكامل السيادة الرقمية</p>
                   <p className="text-white text-3xl font-black">YemenJPT Node</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard title="معالج YemenJPT" value="1" sub="SOVEREIGN ENGINE" icon={Bot} color="bg-[#00338d]" status="Ready" />
        <MetricCard title="منصة ديوان" value="24" sub="EDITORIAL NODES" icon={Layout} color="bg-blue-700" />
        <MetricCard title="خزنة مُسند" value="12.8 TB" sub="SECURE VAULT" icon={Database} color="bg-[#e1b000]" status="Syncing" />
        <MetricCard title="نظام كشّاف" value="Active" sub="OSINT SUITE" icon={Search} color="bg-blue-900" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20">
         <div className="lg:col-span-2 space-y-8">
            <div className="glass-morphism p-12 rounded-[4.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
               <div className="flex flex-row-reverse justify-between items-center mb-12">
                  <h3 className="text-3xl font-black text-white text-right tracking-tighter uppercase">الخدمات المؤسسية السيادية</h3>
                  <button className="text-[11px] font-black text-[#e1b000] uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-3">
                    لوحة التحكم العامة <ChevronRight size={16} className="rotate-180" />
                  </button>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { id: '1', name: 'مرصد بيت الصحافة', category: 'Human Rights', icon: Eye, color: 'text-red-500' },
                    { id: '2', name: 'أكاديمية YemenJPT', category: 'Training', icon: Newspaper, color: 'text-[#e1b000]' },
                    { id: '3', name: 'وحدة بيّنة', category: 'Verification', icon: ShieldCheck, color: 'text-blue-500' },
                    { id: '4', name: 'نظام مُنصت', category: 'Dialect AI', icon: Mail, color: 'text-blue-300' }
                  ].map(tool => (
                     <div key={tool.id} className="p-8 bg-slate-950/50 rounded-[2.5rem] border border-slate-800 hover:border-[#00338d] hover:bg-slate-900/60 transition-all duration-500 flex flex-row-reverse items-center justify-between group cursor-pointer shadow-xl">
                        <div className="flex flex-row-reverse items-center gap-8">
                           <div className={`p-5 bg-slate-900 rounded-2xl ${tool.color} group-hover:bg-[#00338d] group-hover:text-white transition-all shadow-inner border border-white/5`}><tool.icon size={28}/></div>
                           <div className="text-right">
                              <p className="text-white font-black text-2xl group-hover:text-[#e1b000] transition-colors">{tool.name}</p>
                              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2">{tool.category}</p>
                           </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center text-slate-700 group-hover:border-[#00338d] group-hover:text-[#00338d] transition-all">
                           <ChevronRight size={20} className="rotate-180" />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <div className="space-y-8">
            <div className="glass-morphism p-12 rounded-[4.5rem] border border-slate-800 bg-[#00338d]/5 relative overflow-hidden shadow-2xl">
               <div className="flex flex-row-reverse items-center gap-6 mb-12 relative z-10">
                  <div className="p-5 bg-blue-500/10 rounded-2xl text-[#e1b000] shadow-inner border border-[#e1b000]/20">
                    <Activity size={36} />
                  </div>
                  <h4 className="font-black text-white text-3xl tracking-tighter leading-none">مراقب شبكة<br/>RaidanPro</h4>
               </div>
               <div className="space-y-12 relative z-10">
                  <div className="space-y-5">
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                       <span className="text-white text-xs">حمل معالجة YemenJPT</span>
                       <span>Current Load</span>
                    </div>
                    <div className="h-4 bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                       <div className="h-full bg-gradient-to-r from-[#00338d] to-blue-600 w-[34%] shadow-[0_0_20px_rgba(0,51,141,0.5)] transition-all duration-1000"></div>
                    </div>
                  </div>
               </div>
               <div className="mt-16 p-8 bg-black/60 rounded-[2.5rem] border border-slate-800 text-[10px] text-slate-400 leading-relaxed text-right font-medium relative z-10">
                  <p className="flex flex-row-reverse items-center gap-3 mb-4 text-[#e1b000] font-black uppercase tracking-[0.2em]">
                    <Lock size={16}/> تشفير YemenJPT السيادي
                  </p>
                  يتم تشغيل كافة العمليات في بيئة معزولة لضمان خصوصية التحقيقات الصحفية والمصادر الحساسة عبر معايير RaidanPro.
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
