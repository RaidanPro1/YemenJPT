
import React, { useState } from 'react';
import { Eye, ShieldAlert, MapPin, Calendar, Filter, Download, Plus, Search, TrendingUp, AlertTriangle, ShieldCheck, Database, LayoutGrid } from 'lucide-react';
import { ViolationStatus } from '../types';

const ObservatoryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const mockViolations = [
    { id: '1', title: 'اعتقال تعسفي لصحفي استقصائي', governorate: 'صنعاء', date: '2024-05-20', status: ViolationStatus.PENDING, type: 'حرية الصحافة' },
    { id: '2', title: 'قصف منشأة مدنية حيوية', governorate: 'تعز', date: '2024-05-18', status: ViolationStatus.VERIFIED, type: 'استهداف مدنيين' },
    { id: '3', title: 'منع دخول مساعدات إغاثية', governorate: 'الحديدة', date: '2024-05-15', status: ViolationStatus.ARCHIVED, type: 'حقوق إنسانية' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-right font-ar" dir="rtl">
      <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-8 bg-gradient-to-br from-[#00338d]/10 to-transparent p-12 rounded-[4rem] border border-[#00338d]/20 shadow-xl">
        <div className="text-right">
          <h1 className="text-4xl font-black text-white tracking-tight flex flex-row-reverse items-center gap-6">
             <Eye size={48} className="text-[#e1b000] drop-shadow-[0_0_15px_rgba(225,176,0,0.5)]" />
             مرصد الانتهاكات السيادي
          </h1>
          <p className="text-slate-400 mt-4 text-lg font-medium leading-relaxed max-w-3xl">نظام الرصد المركزي لتوثيق وتحليل الانتهاكات ضد الصحافة والمدنيين في اليمن، مدعوم بتقنيات التوثيق غير القابلة للتغيير.</p>
        </div>
        <button className="bg-[#00338d] hover:bg-blue-600 text-white px-10 py-5 rounded-[2.5rem] font-black flex items-center gap-4 shadow-3xl transition-all">
           <Plus size={24}/> تسجيل انتهاك جديد
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 space-y-8">
            {/* Early Warning Banner */}
            <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-[3rem] flex items-center gap-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-2 h-full bg-red-500 opacity-40"></div>
               <div className="p-6 bg-red-500/20 rounded-2xl text-red-500 animate-pulse"><AlertTriangle size={32}/></div>
               <div>
                  <h3 className="text-xl font-black text-white">نظام الإنذار المبكر (Indicator Lab)</h3>
                  <p className="text-slate-400 mt-1">تنبيه: رصد تصاعد في استهداف الكوادر الإعلامية في المحافظات الوسطى بنسبة 15% خلال الأسبوع الماضي.</p>
               </div>
            </div>

            <div className="glass-morphism rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl">
               <div className="p-8 border-b border-slate-800 flex flex-col sm:flex-row-reverse justify-between items-center gap-6 bg-slate-900/40">
                  <div className="flex flex-row-reverse items-center gap-4 w-full sm:w-auto">
                     <Search size={18} className="text-slate-500"/>
                     <input type="text" placeholder="بحث في السجلات الرقمية..." className="bg-transparent border-none outline-none text-white text-sm w-full sm:w-64 text-right" />
                  </div>
                  <div className="flex flex-row-reverse gap-2">
                     {['الكل', 'قيد التحقق', 'مؤكد', 'مؤرشف'].map(f => (
                       <button key={f} onClick={() => setActiveFilter(f)} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-[#00338d] text-white shadow-lg' : 'bg-slate-800 text-slate-500 hover:text-white'}`}>{f}</button>
                     ))}
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-right">
                     <thead className="bg-slate-950/40 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">
                        <tr>
                           <th className="p-8">العنوان</th>
                           <th className="p-8">المحافظة</th>
                           <th className="p-8">التاريخ</th>
                           <th className="p-8">نوع الانتهاك</th>
                           <th className="p-8">الحالة الجنائية</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-800/50">
                        {mockViolations.map(v => (
                           <tr key={v.id} className="hover:bg-white/5 transition-colors cursor-pointer group">
                              <td className="p-8 font-black text-white group-hover:text-[#e1b000] text-lg">{v.title}</td>
                              <td className="p-8 text-slate-400 font-bold">{v.governorate}</td>
                              <td className="p-8 text-slate-400 font-mono text-xs">{v.date}</td>
                              <td className="p-8"><span className="px-4 py-1.5 bg-slate-900 rounded-xl text-[10px] text-slate-300 font-black">{v.type}</span></td>
                              <td className="p-8">
                                 <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${v.status === ViolationStatus.VERIFIED ? 'bg-emerald-500/10 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : (v.status === ViolationStatus.PENDING ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-800 text-slate-500')}`}>
                                    {v.status}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="glass-morphism p-8 rounded-[3rem] border border-slate-800 space-y-8">
               <h3 className="text-xl font-black text-white flex flex-row-reverse items-center gap-3 justify-end">تحليلات العمق <TrendingUp size={20} className="text-[#e1b000]"/></h3>
               <div className="space-y-6">
                  <div className="space-y-3">
                     <div className="flex flex-row-reverse justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest"><span>128</span> <span>إجمالي الانتهاكات (2024)</span></div>
                     <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-inner"><div className="h-full bg-[#00338d] w-[75%] shadow-[0_0_15px_rgba(0,51,141,0.5)]"></div></div>
                  </div>
                  <div className="space-y-3">
                     <div className="flex flex-row-reverse justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest"><span>45</span> <span>قضايا قيد المتابعة</span></div>
                     <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-inner"><div className="h-full bg-emerald-500 w-[40%] shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div></div>
                  </div>
               </div>
               <button className="w-full py-5 bg-slate-800 hover:bg-white hover:text-[#00338d] text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all shadow-xl">تصدير تقرير المانحين (AI Summary)</button>
            </div>

            <div className="glass-morphism p-8 rounded-[3rem] border border-[#00338d]/20 bg-[#00338d]/5 space-y-4 shadow-2xl">
               <div className="flex flex-row-reverse items-center gap-3 justify-end text-[#e1b000]">
                  <ShieldCheck size={20}/>
                  <span className="text-[10px] font-black uppercase tracking-widest">التوثيق الجنائي (Musnad Sync)</span>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed font-medium text-right">يتم حفظ الأدلة الرقمية لكل انتهاك في "خزنة مُسند" المشفرة لضمان سلامتها القانونية أمام المحاكم الدولية.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ObservatoryPage;
