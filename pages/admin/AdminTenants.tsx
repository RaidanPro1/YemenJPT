
import React, { useState } from 'react';
import { 
  Building2, Plus, Server, Zap, Search, ShieldCheck, MoreVertical, X, Check, ArrowRight, Layout, Database,
  // Added missing icons to fix errors on lines 48, 105, 117
  Cpu, Globe, Bot 
} from 'lucide-react';
import { Organization, TenantStatus } from '../../types';

const AdminTenants: React.FC = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([
    { id: '1', name: 'مؤسسة بيت الصحافة', domain: 'ph-ye.org', status: TenantStatus.ACTIVE, usage: { cpu: 32, ram: 12, storage: 450 }, services: ['AI Portal', 'News Site'] },
    { id: '2', name: 'صحفيون مستقلون', domain: 'independent.raidan.pro', status: TenantStatus.ACTIVE, usage: { cpu: 12, ram: 4, storage: 80 }, services: ['Vault'] }
  ]);

  const [wizardStep, setWizardStep] = useState(1);

  return (
    <div className="space-y-10 animate-in fade-in font-ar pb-20">
      <div className="flex justify-between items-center bg-white/5 p-10 rounded-[4rem] border border-slate-800 shadow-2xl">
        <button onClick={() => setShowWizard(true)} className="bg-[#00338d] hover:bg-blue-600 text-white px-12 py-5 rounded-[2.5rem] font-black shadow-3xl flex items-center gap-4 transition-all active:scale-95 border border-white/10">
          <Plus size={24} /> إضافة مؤسسة صحفية
        </button>
        <div className="text-right">
          <h1 className="text-4xl font-black text-white flex items-center gap-6 justify-end uppercase tracking-tighter">
            إدارة المستأجرين <Building2 size={48} className="text-[#e1b000]" />
          </h1>
          <p className="text-slate-500 mt-2 font-bold text-lg">توزيع الموارد والتحكم في عقد المؤسسات (Multi-Tenancy) السيادي.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {organizations.map(org => (
          <div key={org.id} className="glass-morphism p-10 rounded-[4.5rem] border border-slate-800 hover:border-[#00338d]/40 transition-all group flex flex-col xl:flex-row-reverse justify-between gap-10 shadow-3xl">
            <div className="flex-1 space-y-8">
              <div className="flex flex-row-reverse justify-between items-start">
                <div className="text-right">
                  <h4 className="text-3xl font-black text-white group-hover:text-[#e1b000] transition-colors">{org.name}</h4>
                  <p className="text-blue-400 font-bold font-mono text-md mt-1">{org.domain}</p>
                </div>
                <div className="flex flex-col items-start gap-2">
                   <span className="px-6 py-2 bg-[#e1b000]/10 text-[#e1b000] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#e1b000]/20">
                     {org.status}
                   </span>
                   <span className="text-[9px] text-slate-600 font-bold px-2">Provisioned: May 2024</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                   { label: 'CPU Allocation', val: `${org.usage.cpu}%`, icon: Cpu, color: 'text-blue-400' },
                   { label: 'RAM Storage', val: `${org.usage.ram} GB`, icon: Database, color: 'text-[#e1b000]' },
                   { label: 'Disk Usage', val: `${org.usage.storage} GB`, icon: Server, color: 'text-blue-500' }
                ].map((stat, idx) => (
                  <div key={idx} className="p-6 bg-slate-950 rounded-[2.5rem] border border-slate-800 text-right group/stat hover:border-[#00338d]/40 transition-all">
                    <div className="flex flex-row-reverse justify-between items-center mb-3">
                       <stat.icon size={20} className={stat.color} />
                       <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</p>
                    </div>
                    <p className="text-3xl font-black text-white tracking-tighter">{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="xl:w-96 flex flex-col justify-center gap-4 bg-slate-900/40 p-8 rounded-[3.5rem] border border-slate-800">
              <button className="w-full py-5 bg-[#00338d] hover:bg-blue-800 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3">
                 <Layout size={18}/> لوحة تحكم المؤسسة
              </button>
              <button className="w-full py-5 bg-slate-800 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all border border-transparent hover:border-red-500/20">
                 تعليق الخدمة (Suspend)
              </button>
            </div>
          </div>
        ))}
      </div>

      {showWizard && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in">
          <div className="w-full max-w-2xl glass-morphism border border-[#00338d]/40 rounded-[4.5rem] p-16 shadow-[0_0_100px_rgba(0,51,141,0.3)] relative overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="absolute top-0 right-0 p-10 opacity-5"><Building2 size={200} /></div>
            
            <div className="flex justify-between items-center mb-16 relative z-10">
              <button onClick={() => { setShowWizard(false); setWizardStep(1); }} className="text-slate-500 hover:text-white p-2 bg-slate-900 rounded-full transition-all"><X size={28} /></button>
              <h2 className="text-4xl font-black text-white tracking-tighter">تهيئة عقدة سيادية جديدة</h2>
            </div>

            <div className="space-y-12 relative z-10">
              <div className="flex flex-row-reverse justify-center gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex flex-col items-center gap-3">
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-500 ${wizardStep >= i ? 'bg-[#00338d] text-white shadow-[0_0_30px_rgba(0,51,141,0.6)] border border-blue-400/30' : 'bg-slate-900 text-slate-700 border border-slate-800'}`}>
                       {wizardStep > i ? <Check size={28} /> : i}
                     </div>
                     <span className={`text-[9px] font-black uppercase tracking-widest ${wizardStep >= i ? 'text-[#e1b000]' : 'text-slate-700'}`}>Step 0{i}</span>
                  </div>
                ))}
              </div>

              <div className="min-h-[300px] flex flex-col justify-center">
                {wizardStep === 1 && (
                  <div className="space-y-8 animate-in slide-in-from-right duration-500">
                    <div className="space-y-4 text-right">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest pr-4 flex items-center justify-end gap-2">اسم المؤسسة أو الناشر <Building2 size={14}/></label>
                      <input className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-7 text-white text-xl outline-none focus:border-[#00338d] shadow-inner" placeholder="مثلاً: شبكة عدن الإخبارية" />
                    </div>
                    <div className="space-y-4 text-right">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest pr-4 flex items-center justify-end gap-2">النطاق الرئيسي (Primary Domain) <Globe size={14}/></label>
                      <input className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-7 text-white text-xl outline-none focus:border-[#00338d] font-mono shadow-inner" placeholder="aden-news.com" />
                    </div>
                    <button onClick={() => setWizardStep(2)} className="w-full py-7 bg-[#00338d] hover:bg-blue-800 text-white rounded-[2.5rem] font-black text-lg shadow-3xl flex items-center justify-center gap-4 transition-all">الخطوة التالية <ArrowRight size={24} className="rotate-180" /></button>
                  </div>
                )}

                {wizardStep === 2 && (
                  <div className="space-y-10 animate-in slide-in-from-right duration-500">
                     <div className="text-right px-4"><p className="text-white font-black text-xl">اختر العقد الموزعة للمؤسسة:</p></div>
                     <div className="grid grid-cols-2 gap-6">
                        {[
                          { id: 'portal', name: 'YemenJPT Portal', icon: Bot, desc: 'منصة الذكاء الاصطناعي' },
                          { id: 'mail', name: 'Secure Mail', icon: Zap, desc: 'بريد مؤسسي مشفر' },
                          { id: 'news', name: 'WordPress Hub', icon: Layout, desc: 'غرفة أخبار متصلة' },
                          { id: 'lab', name: 'Forensics Lab', icon: ShieldCheck, desc: 'وحدة التحقق الجنائي' }
                        ].map(s => (
                          <button key={s.id} className="p-8 bg-slate-950 border border-slate-800 rounded-[2.5rem] text-right hover:border-[#00338d] transition-all group relative overflow-hidden shadow-xl">
                             <div className="absolute top-0 left-0 w-1 h-full bg-[#00338d] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             <div className="flex flex-row-reverse items-center gap-5">
                                <div className="p-3 bg-slate-900 rounded-xl text-slate-400 group-hover:text-[#e1b000] transition-colors"><s.icon size={28}/></div>
                                <div>
                                  <p className="text-white font-black text-md leading-none">{s.name}</p>
                                  <p className="text-[10px] text-slate-500 mt-2 font-bold">{s.desc}</p>
                                </div>
                             </div>
                          </button>
                        ))}
                     </div>
                     <div className="flex gap-4">
                       <button onClick={() => setWizardStep(3)} className="flex-1 py-7 bg-[#00338d] text-white rounded-[2.5rem] font-black text-lg shadow-2xl">الخطوة النهائية</button>
                       <button onClick={() => setWizardStep(1)} className="px-12 py-7 bg-slate-900 text-slate-500 rounded-[2.5rem] font-black hover:text-white transition-all">رجوع</button>
                     </div>
                  </div>
                )}

                {wizardStep === 3 && (
                  <div className="space-y-10 text-center animate-in zoom-in duration-500">
                     <div className="w-32 h-32 bg-[#00338d]/10 rounded-full flex items-center justify-center mx-auto text-[#e1b000] border border-[#e1b000]/20 shadow-[0_0_60px_rgba(225,176,0,0.1)]">
                        <Zap size={64} className="animate-pulse" />
                     </div>
                     <div className="space-y-4">
                        <h3 className="text-3xl font-black text-white tracking-tighter">بدء التنفيذ الآلي (Sovereign Provisioning)</h3>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md mx-auto">سيقوم النظام الآن بإنشاء السجلات في Cloudflare، وبناء حاويات Docker، وتشفير مفاتيح الـ Vault تلقائياً.</p>
                     </div>
                     <button onClick={() => { setShowWizard(false); setWizardStep(1); }} className="w-full py-8 bg-[#00338d] hover:bg-blue-800 text-white rounded-[3rem] font-black text-xl shadow-[0_30px_60px_rgba(0,51,141,0.5)] border border-white/10 active:scale-95 transition-all">تأكيد وتشغيل المنظومة</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTenants;
