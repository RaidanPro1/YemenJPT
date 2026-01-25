
import React from 'react';
import { Briefcase, Heart, FileText, Search, Plus, Calendar, MapPin, Building2, UserPlus, FileSignature } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const jobs = [
    { id: '1', title: 'محرر أخبار استقصائية', type: 'دوام كامل', location: 'صنعاء / عن بعد', deadline: '2024-06-15' },
    { id: '2', title: 'مصمم بيانات (Infographic Designer)', type: 'عقد', location: 'عن بعد', deadline: '2024-06-10' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 text-right" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
             <Briefcase size={32} className="text-[#e1b000]" /> الخدمات المؤسسية
          </h1>
          <p className="text-slate-400 mt-2">بوابة بيت الصحافة للوظائف، التطوع، والمناقصات المهنية.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-10">
            <section className="space-y-6">
               <div className="flex justify-between items-center px-4">
                  <h2 className="text-2xl font-black text-white">آخر الوظائف الشاغرة</h2>
                  <button className="bg-[#00338d] hover:bg-blue-600 text-white px-6 py-2 rounded-xl text-xs font-black shadow-lg">تقديم طلب عام</button>
               </div>
               <div className="space-y-4">
                  {jobs.map(job => (
                     <div key={job.id} className="glass-morphism p-8 rounded-[2.5rem] border border-slate-800 hover:border-[#00338d]/60 transition-all flex flex-col sm:flex-row-reverse justify-between items-center gap-6 group shadow-xl">
                        <div className="flex flex-row-reverse items-center gap-6">
                           <div className="p-5 bg-slate-950 rounded-2xl text-[#e1b000] border border-slate-800 shadow-inner group-hover:bg-[#00338d] group-hover:text-white transition-all"><Briefcase size={24}/></div>
                           <div className="text-right">
                              <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h4>
                              <p className="text-xs text-slate-500 font-bold mt-1">{job.type} • {job.location}</p>
                           </div>
                        </div>
                        <div className="flex flex-col items-center sm:items-end gap-3">
                           <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">آخر موعد: {job.deadline} <Calendar size={12}/></span>
                           <button className="px-8 py-3 bg-slate-800 hover:bg-white hover:text-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">التقديم الآن</button>
                        </div>
                     </div>
                  ))}
               </div>
            </section>

            <section className="glass-morphism p-10 rounded-[3rem] border border-slate-800 bg-[#00338d]/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5"><UserPlus size={100} className="text-white" /></div>
               <div className="relative z-10 text-right space-y-4">
                  <h3 className="text-2xl font-black text-white">برنامج التطوع الرقمي</h3>
                  <p className="text-slate-400 font-medium">ساهم بخبراتك في دعم الصحافة المستقلة وتوثيق الانتهاكات. كن جزءاً من شبكة المدافعين عن الحقيقة.</p>
                  <button className="bg-[#00338d] hover:bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs shadow-2xl transition-all">انضم كمتطوع</button>
               </div>
            </section>
         </div>

         <div className="space-y-8">
            <div className="glass-morphism p-8 rounded-[3rem] border border-slate-800 space-y-6">
               <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-black text-white">المناقصات والتوريد</h3>
                  <FileSignature size={20} className="text-[#e1b000]"/>
               </div>
               <p className="text-xs text-slate-500 leading-relaxed text-right font-medium">نظام شفاف للموردين والشركات الراغبة في التعاون مع مؤسسة بيت الصحافة في المشاريع التقنية واللوجستية.</p>
               <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
                  <div className="p-4 border-b border-slate-800 text-right">
                     <p className="text-xs font-bold text-white mb-1">توريد معدات بث رقمي</p>
                     <p className="text-[9px] text-slate-500 font-black uppercase">رقم المناقصة: #PH-2024-001</p>
                  </div>
                  <button className="w-full py-3 bg-slate-800 hover:bg-white hover:text-black text-slate-400 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest">تحميل وثائق المناقصة</button>
               </div>
            </div>

            <div className="glass-morphism p-8 rounded-[3rem] border border-[#00338d]/20 bg-[#00338d]/5 space-y-4">
               <h4 className="text-blue-500 font-black text-sm uppercase text-right">فرص التمويل (Grants)</h4>
               <p className="text-xs text-slate-400 leading-relaxed text-right">نظام تتبع المنح والفرص الدولية المتاحة للمبادرات الصحفية المحلية.</p>
               <button className="w-full py-3 bg-[#00338d] hover:bg-blue-600 text-white text-[10px] font-black rounded-xl shadow-xl transition-all uppercase">Open Funding Portal</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ServicesPage;
