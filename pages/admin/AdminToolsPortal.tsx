
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// Fix: Added missing X icon to lucide-react imports
import { 
  ShieldCheck, Search, Activity, Vault, Plus, ExternalLink, 
  Settings, BookOpen, Sliders, Play, Cpu, Server, Video,
  Fingerprint, Radio, Globe, Layout, ShieldPlus, ChevronLeft,
  Terminal, Database, Loader2, Zap, AlertTriangle, X
} from 'lucide-react';

const AdminToolsPortal: React.FC = () => {
  const { category } = useParams();
  const [configModal, setConfigModal] = useState<string | null>(null);

  const categories: any = {
    verification: { name: 'وحدة التحقق الجنائي', icon: ShieldCheck, color: 'text-[#e1b000]' },
    osint: { name: 'نظام كشاف (OSINT)', icon: Search, color: 'text-blue-500' },
    monitoring: { name: 'الرصد والإنذار المبكر', icon: Activity, color: 'text-blue-400' },
    security: { name: 'الأمن والخصوصية (Vault)', icon: Vault, color: 'text-purple-500' }
  };

  const currentCat = categories[category || 'verification'] || categories.verification;

  const mockTools: any = {
    verification: [
      { name: 'Meedan Check', slug: 'meedan', vendor: 'Raidan-Node', icon: ShieldCheck, status: 'online', desc: 'أداة التحقق من الادعاءات والمطابقة مع المصادر المفتوحة.' },
      { name: 'InVID Forensics', slug: 'invid', vendor: 'InVID Team', icon: Video, status: 'online', desc: 'وحدة التشريح الجنائي للفيديوهات وكشف عمليات التلاعب الرقمي.' },
      { name: 'Loki Forensics', slug: 'loki', vendor: 'Internal', icon: Fingerprint, status: 'offline', desc: 'تحليل البصمة الرقمية للصور وكشف التعديلات العميقة.' }
    ],
    osint: [
      { name: 'Maigret Engine', slug: 'maigret', vendor: 'Open-Source', icon: Search, status: 'online', desc: 'تتبع المعرفات الرقمية عبر 1000+ منصة اجتماعية.' },
      { name: 'Social Analyzer', slug: 'analyzer', vendor: 'Internal', icon: Radio, status: 'online', desc: 'تحليل الشبكات الاجتماعية والارتباطات بين الحسابات.' }
    ],
    monitoring: [
      { name: 'Ushahidi Node', slug: 'ushahidi', vendor: 'Ushahidi Inc', icon: Globe, status: 'online', desc: 'منصة رسم الخرائط التفاعلية لرصد الأحداث الميدانية.' },
      { name: 'Earth Engine AI', slug: 'gee', vendor: 'Google/Cloud', icon: Activity, status: 'online', desc: 'تحليل صور الأقمار الصناعية ورصد التغييرات البيئية.' }
    ],
    security: [
      { name: 'Vaultwarden', slug: 'vault', vendor: 'Bitwarden', icon: Vault, status: 'online', desc: 'إدارة كلمات المرور والمفاتيح المشفرة للمؤسسة.' },
      { name: 'Panic Camouflage', slug: 'panic', vendor: 'Internal', icon: ShieldPlus, status: 'online', desc: 'نظام التمويه السيادي وإغلاق المنافذ في حالات الطوارئ.' }
    ]
  };

  const tools = mockTools[category || 'verification'] || [];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Portal Header */}
      <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[4rem] border border-slate-800 shadow-2xl flex flex-col md:flex-row-reverse justify-between items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00338d]/10 blur-[100px]"></div>
        <div className="text-right z-10">
          <div className="flex flex-row-reverse items-center gap-6">
            <div className={`w-20 h-20 bg-slate-900 rounded-[2.2rem] flex items-center justify-center border border-white/5 shadow-2xl ${currentCat.color}`}>
              <currentCat.icon size={44} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">{currentCat.name}</h1>
              <p className="text-slate-500 font-bold mt-3 text-lg">إدارة والتحكم في عقد المعالجة والأدوات المتخصصة للمنظومة.</p>
            </div>
          </div>
        </div>
        <div className="z-10 flex gap-4">
           <button className="px-10 py-5 bg-[#00338d] text-white rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl border border-blue-500/20">
             <Plus size={20}/> إضافة عقدة جديدة
           </button>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {tools.map((tool: any, i: number) => (
          <div key={i} className="group glass-morphism p-10 rounded-[3.5rem] border border-slate-800/60 hover:shadow-2xl hover:border-[#00338d]/40 transition-all duration-500 relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 left-0 w-32 h-32 bg-slate-900 rounded-br-[5rem] -ml-8 -mt-8 transition-colors group-hover:bg-[#00338d]/10"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex flex-row-reverse justify-between items-start mb-8">
                <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center shadow-inner border border-white/5 text-[#e1b000] group-hover:scale-110 transition-transform">
                  <tool.icon size={32} />
                </div>
                <div className="flex flex-col items-end gap-2">
                   <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${tool.status === 'online' ? 'bg-[#e1b000]/10 text-[#e1b000] border border-[#e1b000]/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${tool.status === 'online' ? 'bg-[#e1b000] animate-pulse' : 'bg-red-500'}`}></span>
                      {tool.status === 'online' ? 'Active Mesh' : 'Offline'}
                   </span>
                   <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">{tool.vendor}</span>
                </div>
              </div>

              <div className="flex-1 text-right">
                <h4 className="text-2xl font-black text-white">{tool.name}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mt-4 line-clamp-3">{tool.desc}</p>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-row-reverse items-center justify-between">
                <div className="flex gap-2">
                  <button onClick={() => setConfigModal(tool.slug)} className="p-4 bg-slate-900 rounded-2xl text-slate-500 hover:bg-[#00338d] hover:text-white transition-all shadow-inner" title="Config">
                    <Sliders size={20} />
                  </button>
                  <button className="p-4 bg-slate-900 rounded-2xl text-slate-500 hover:bg-slate-800 transition-all shadow-inner" title="Documentation">
                    <BookOpen size={20} />
                  </button>
                </div>
                <button className="flex flex-row-reverse items-center gap-3 px-10 py-4 bg-[#00338d] text-white rounded-2xl text-[10px] font-black uppercase shadow-xl hover:bg-blue-600 transition-all active:scale-95 group/btn">
                  فتح العقدة <ChevronLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CONFIG MODAL */}
      {configModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in">
          <div className="absolute inset-0" onClick={() => setConfigModal(null)}></div>
          <div className="glass-morphism w-full max-w-xl rounded-[4rem] p-16 border border-[#00338d]/40 shadow-3xl relative animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-12">
               <button onClick={() => setConfigModal(null)} className="text-slate-500 hover:text-white transition-colors"><X size={28} /></button>
               <h3 className="text-3xl font-black text-white text-right w-full">إعدادات العقدة السيادية</h3>
            </div>
            
            <div className="space-y-8 text-right">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-4">Docker Image Endpoint</label>
                <div className="relative">
                  <Server size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input readOnly value={`raidan-module-registry:5000/${configModal}-node`} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-8 py-5 text-slate-300 font-mono text-xs outline-none focus:border-[#00338d]" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-4">Access Secret Key</label>
                <div className="relative">
                  <Zap size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#e1b000]" />
                  <input type="password" value="••••••••••••••••••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-8 py-5 text-white outline-none focus:border-[#00338d]" />
                </div>
              </div>

              <div className="p-6 bg-[#e1b000]/5 border border-[#e1b000]/20 rounded-3xl flex flex-row-reverse gap-4">
                 <AlertTriangle size={24} className="text-[#e1b000] shrink-0" />
                 <p className="text-[10px] text-slate-400 leading-relaxed">تحذير: أي تغيير في إعدادات العقدة قد يؤدي إلى انقطاع الخدمة عن المستأجرين المرتبطين بهذه الحاوية.</p>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <button className="flex-1 bg-[#00338d] border border-blue-500/30 text-white py-5 rounded-[2rem] font-black text-xs uppercase shadow-xl hover:bg-blue-800 transition-all" onClick={() => setConfigModal(null)}>حفظ التغييرات</button>
              <button className="px-10 bg-slate-900 text-slate-500 py-5 rounded-[2rem] font-black text-xs uppercase hover:text-white transition-all" onClick={() => setConfigModal(null)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminToolsPortal;
