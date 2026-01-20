
import React, { useState } from 'react';
import { Eye, ShieldAlert, MapPin, Calendar, Filter, Download, Plus, Search, TrendingUp, AlertTriangle } from 'lucide-react';
import { ViolationStatus } from '../types';

const ObservatoryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const mockViolations = [
    { id: '1', title: 'اعتقال تعسفي لصحفي استقصائي', governorate: 'صنعاء', date: '2024-05-20', status: ViolationStatus.PENDING, type: 'حرية الصحافة' },
    { id: '2', title: 'قصف منشأة مدنية حيوية', governorate: 'تعز', date: '2024-05-18', status: ViolationStatus.VERIFIED, type: 'استهداف مدنيين' },
    { id: '3', title: 'منع دخول مساعدات إغاثية', governorate: 'الحديدة', date: '2024-05-15', status: ViolationStatus.ARCHIVED, type: 'حقوق إنسانية' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-right" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
             <Eye size={32} className="text-[#e1b000]" /> مرصد بيت الصحافة للانتهاكات
          </h1>
          <p className="text-slate-400 mt-2">توثيق، تحليل، ومراقبة الانتهاكات ضد الصحفيين والمدنيين في اليمن.</p>
        </div>
        <button className="bg-[#00338d] hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl transition-all">
           <Plus size={20}/> إرسال بلاغ آمن
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 space-y-8">
            {/* Early Warning Banner */}
            <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-[3rem] flex items-center gap-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-2 h-full bg-red-500 opacity-40"></div>
               <div className="p-6 bg-red-500/20 rounded-2xl text-red-500 animate-pulse"><AlertTriangle size={32}/></div>
               <div>
                  <h3 className="text-xl font-black text-white">نظام الإنذار المبكر (AI Early Warning)</h3>
                  <p className="text-slate-400 mt-1">تنبيه: رصد تصاعد في استهداف الكوادر الإعلامية في المحافظات الوسطى بنسبة 15% خلال الأسبوع الماضي.</p>
               </div>
            </div>

            <div className="glass-morphism rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl">
               <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
                  <div className="flex items-center gap-4">
                     <Search size={18} className="text-slate-500"/>
                     <input type="text" placeholder="بحث في السجلات..." className="bg-transparent border-none outline-none text-white text-sm w-64" />
                  </div>
                  <div className="flex gap-2">
                     {['الكل', 'قيد التحقق', 'مؤكد'].map(f => (
                       <button key={f} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${activeFilter === f ? 'bg-[#00338d] text-white' : 'bg-slate-800 text-slate-500'}`}>{f}</button>
                     ))}
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-right">
                     <thead className="bg-slate-950/40 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">
                        <tr>
                           <th className="p-6">العنوان</th>
                           <th className="p-6">المحافظة</th>
                           <th className="p-6">التاريخ</th>
                           <th className="p-6">النوع</th>
                           <th className="p-6">الحالة</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-800/50">
                        {mockViolations.map(v => (
                           <tr key={v.id} className="hover:bg-white/5 transition-colors cursor-pointer group">
                              <td className="p-6 font-bold text-white group-hover:text-[#e1b000]">{v.title}</td>
                              <td className="p-6 text-slate-400 text-sm">{v.governorate}</td>
                              <td className="p-6 text-slate-400 font-mono text-xs">{v.date}</td>
                              <td className="p-6"><span className="px-3 py-1 bg-slate-800 rounded-lg text-[10px] text-slate-300 font-bold">{v.type}</span></td>
                              <td className="p-6">
                                 <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${v.status === ViolationStatus.VERIFIED ? 'bg-emerald-500/10 text-emerald-500' : (v.status === ViolationStatus.PENDING ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-800 text-slate-500')}`}>
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
            <div className="glass-morphism p-8 rounded-[3rem] border border-slate-800 space-y-6">
               <h3 className="text-xl font-black text-white flex items-center gap-2 justify-end">تحليلات المرصد <TrendingUp size={20} className="text-[#e1b000]"/></h3>
               <div className="space-y-6">
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase"><span>128</span> <span>إجمالي الانتهاكات (2024)</span></div>
                     <div className="h-2 bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-[#00338d] w-[75%]"></div></div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase"><span>45</span> <span>قضايا قيد المتابعة</span></div>
                     <div className="h-2 bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[40%]"></div></div>
                  </div>
               </div>
               <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">تصدير تقرير المانحين PDF</button>
            </div>

            <div className="glass-morphism p-8 rounded-[3rem] border border-[#00338d]/20 bg-[#00338d]/5 space-y-4">
               <div className="flex items-center gap-2 text-[#e1b000]">
                  <ShieldAlert size={18}/>
                  <span className="text-[10px] font-black uppercase tracking-widest">إدارة القضايا الآمنة</span>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed font-medium">نظام Case Management يتيح تتبع كل انتهاك منذ لحظة البلاغ وحتى الإجراء القانوني مع حماية تامة للهوية.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ObservatoryPage;
