
import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, XCircle, HelpCircle, FileSearch, Loader2, Play } from 'lucide-react';

const FactCheckPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockFactChecks = [
    { id: '1', claim: 'صورة متداولة لانفجار في عدن صباح اليوم', result: 'false', source: 'Telegram', date: '2024-05-21' },
    { id: '2', claim: 'تصريح منسوب للبنك المركزي حول العملة', result: 'misleading', source: 'Facebook', date: '2024-05-20' },
    { id: '3', claim: 'بيان نقابة الصحفيين بشأن الاعتداء الأخير', result: 'true', source: 'Official Website', date: '2024-05-19' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-right" dir="rtl">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
           <FileSearch size={32} className="text-[#e1b000]" /> وحدة "تحقّق" لمكافحة التضليل
        </h1>
        <p className="text-slate-400 mt-2">نظام ذكاء اصطناعي لتقييم مصداقية الأخبار والتحقق من الوسائط المتعددة.</p>
      </div>

      <div className="glass-morphism p-12 rounded-[3.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00338d] to-transparent opacity-30"></div>
         <h3 className="text-xl font-black text-white mb-6">تحقق من خبر أو رابط</h3>
         <div className="flex flex-col sm:flex-row gap-4">
            <input 
              value={url} 
              onChange={(e) => setUrl(e.target.value)}
              placeholder="أدخل النص أو رابط الخبر المراد فحصه..." 
              className="flex-1 bg-slate-900/60 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#00338d] transition-all"
            />
            <button onClick={() => setIsAnalyzing(true)} disabled={isAnalyzing} className="bg-[#00338d] hover:bg-blue-600 text-white px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-xl">
               {isAnalyzing ? <Loader2 size={24} className="animate-spin" /> : <Play size={24} className="rotate-180" />}
               بدء التحليل
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-black text-white px-2">آخر عمليات التحقق</h3>
            <div className="space-y-4">
               {mockFactChecks.map(fc => (
                  <div key={fc.id} className="glass-morphism p-6 rounded-[2rem] border border-slate-800 flex justify-between items-center hover:border-slate-700 transition-all">
                     <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${fc.result === 'true' ? 'bg-emerald-500/10 text-emerald-500' : (fc.result === 'false' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500')}`}>
                           {fc.result === 'true' ? <CheckCircle2 size={24}/> : (fc.result === 'false' ? <XCircle size={24}/> : <HelpCircle size={24}/>)}
                        </div>
                        <div className="text-right">
                           <h4 className="text-white font-bold">{fc.claim}</h4>
                           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{fc.source} • {fc.date}</p>
                        </div>
                     </div>
                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${fc.result === 'true' ? 'bg-emerald-500/10 text-emerald-500' : (fc.result === 'false' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500')}`}>
                        {fc.result === 'true' ? 'صحيح' : (fc.result === 'false' ? 'كاذب' : 'مضلل')}
                     </span>
                  </div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <div className="glass-morphism p-8 rounded-[3rem] border border-slate-800 space-y-6">
               <h4 className="text-lg font-black text-white text-right">معايير التحقق</h4>
               <ul className="space-y-4 text-right">
                  <li className="flex items-start gap-3 justify-end">
                     <span className="text-xs text-slate-400 font-medium leading-relaxed">تحليل الميتا داتا للصور والفيديو للكشف عن التلاعب الزمني والجغرافي.</span>
                     <div className="w-2 h-2 bg-[#e1b000] rounded-full mt-2"></div>
                  </li>
                  <li className="flex items-start gap-3 justify-end">
                     <span className="text-xs text-slate-400 font-medium leading-relaxed">مطابقة التصريحات مع السجلات الرسمية والوكالات الموثوقة.</span>
                     <div className="w-2 h-2 bg-[#e1b000] rounded-full mt-2"></div>
                  </li>
                  <li className="flex items-start gap-3 justify-end">
                     <span className="text-xs text-slate-400 font-medium leading-relaxed">استخدام نماذج AI لرصد الأنماط التضليلية المتكررة.</span>
                     <div className="w-2 h-2 bg-[#e1b000] rounded-full mt-2"></div>
                  </li>
               </ul>
            </div>
         </div>
      </div>
    </div>
  );
};

export default FactCheckPage;
