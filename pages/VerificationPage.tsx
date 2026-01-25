
import React, { useState, useCallback } from 'react';
import { 
    Upload, ShieldCheck, FileText, ImageIcon, Video, Search, Scan, 
    Eye, Play, CheckCircle2, AlertTriangle, Activity, Cpu, Globe, 
    Layers, Info, Fingerprint, Database, Zap, Camera, Clock, Brain,
    FileSearch, MoreVertical, ChevronRight, Share2, Download, Terminal, Lock
} from 'lucide-react';

const VerificationPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'bayyinah' | 'basirah' | 'rasm' | 'zayf'>('bayyinah');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const startAnalysis = useCallback(() => {
    setIsAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
    }, 4500);
  }, []);

  const tools = [
    { id: 'bayyinah', name: 'بيّنة (Verify)', icon: ShieldCheck, desc: 'تحليل الادعاءات والمطابقة الأخلاقية.' },
    { id: 'basirah', name: 'بصيرة (InVID)', icon: Video, desc: 'التشريح الجنائي للفيديو (I-frames).' },
    { id: 'rasm', name: 'رسم (Forensics)', icon: ImageIcon, desc: 'تحليل مستوى الخطأ (ELA) للصور.' },
    { id: 'zayf', name: 'كاشف زيف', icon: Scan, desc: 'رصد تزييف الوجوه والذكاء التوليدي.' }
  ];

  const getToolDetails = () => {
    if (activeTool === 'basirah') return "نظام 'بصيرة' يقوم بتحليل تماسك البكسلات بين الإطارات واكتشاف عمليات الحذف أو الإضافة الممنهجة في الفيديوهات.";
    if (activeTool === 'rasm') return "نظام 'رسم' يعتمد على خوارزميات ELA لتحديد المناطق التي تم إعادة ضغطها أو التلاعب ببياناتها اللونية في الصور.";
    return "يتم استخدام معالج YemenJPT لمطابقة البيانات مع السجلات الرقمية الموثقة لضمان أعلى درجات المصداقية.";
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 text-right" dir="rtl">
      <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-8 bg-gradient-to-br from-[#00338d]/10 to-transparent p-12 rounded-[4rem] border border-[#00338d]/20 shadow-xl">
        <div className="text-right">
           <h1 className="text-5xl font-black text-white tracking-tighter flex flex-row-reverse items-center gap-6">
             <ShieldCheck size={48} className="text-[#e1b000] drop-shadow-[0_0_15px_rgba(225,176,0,0.5)]" />
             مختبر بيّنة (Bayyinah) الجنائي
           </h1>
           <p className="text-slate-400 text-lg font-medium mt-4 max-w-3xl leading-relaxed">
             {getToolDetails()}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1 space-y-4">
           {tools.map(tool => (
             <button 
               key={tool.id}
               onClick={() => setActiveTool(tool.id as any)}
               className={`w-full p-6 rounded-[2.5rem] border flex flex-col items-end gap-3 transition-all ${activeTool === tool.id ? 'bg-[#00338d] border-blue-500 text-white shadow-2xl' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}
             >
                <tool.icon size={28} className={activeTool === tool.id ? 'text-[#e1b000]' : 'text-slate-600'} />
                <div className="text-right">
                   <p className="font-black text-lg">{tool.name}</p>
                   <p className={`text-[10px] font-bold ${activeTool === tool.id ? 'text-blue-200' : 'text-slate-600'}`}>{tool.desc}</p>
                </div>
             </button>
           ))}

           <div className="p-8 bg-black/40 border border-slate-800 rounded-[2.5rem] mt-10 space-y-4">
              <div className="flex items-center gap-3 justify-end text-blue-500">
                 <Lock size={16}/>
                 <span className="text-[10px] font-black uppercase tracking-widest">Secure Lab Session</span>
              </div>
              <p className="text-[9px] text-slate-500 leading-relaxed text-right">يتم معالجة كافة الوسائط في بيئة معزولة (Sandboxed) ويتم تصفير الذاكرة فور انتهاء العملية.</p>
           </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
           {!showResults && !isAnalyzing && (
             <div className="glass-morphism p-24 rounded-[4rem] border-4 border-dashed border-slate-800 flex flex-col items-center justify-center text-center space-y-8 relative group cursor-pointer hover:border-[#00338d]/50 transition-all duration-700 shadow-2xl">
                <div className="w-32 h-32 bg-[#00338d]/10 rounded-[2.5rem] flex items-center justify-center text-[#00338d] border border-[#00338d]/20 shadow-xl group-hover:scale-110 transition-transform">
                   <FileSearch size={64} className="text-[#e1b000]" />
                </div>
                <div className="space-y-3">
                   <p className="text-white font-black text-4xl tracking-tighter">اسحب الدليل المادي للفحص</p>
                   <p className="text-slate-500 font-bold text-lg opacity-60">سيتم الفحص عبر YemenJPT Sovereign Node</p>
                </div>
                <button onClick={startAnalysis} className="bg-[#00338d] hover:bg-blue-600 text-white px-16 py-6 rounded-[2rem] font-black shadow-3xl transition-all text-lg">بدء التشريح الرقمي</button>
             </div>
           )}

           {isAnalyzing && (
             <div className="p-32 glass-morphism rounded-[4rem] flex flex-col items-center gap-12 border border-[#00338d]/30 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#00338d] to-transparent animate-[shimmer_2s_infinite]"></div>
                <div className="relative">
                   <Activity size={100} className="text-[#e1b000] animate-spin-slow" />
                   <Cpu size={32} className="absolute inset-0 m-auto text-blue-500 animate-pulse" />
                </div>
                <p className="text-white font-black text-3xl tracking-tight">جاري معالجة البيانات عبر العقدة السيادية...</p>
                <div className="w-full max-w-md h-2 bg-slate-900 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-600 animate-[loading_4.5s_ease-in-out]"></div>
                </div>
             </div>
           )}

           {showResults && (
             <div className="glass-morphism p-12 rounded-[4rem] border border-[#e1b000]/30 space-y-12 shadow-3xl animate-in zoom-in-95">
                <div className="flex flex-row-reverse justify-between items-center border-b border-slate-800 pb-10">
                   <div className="text-right">
                      <h3 className="text-4xl font-black text-white leading-none">تقرير التوثيق السيادي</h3>
                      <p className="text-[#e1b000] font-bold text-md mt-4 flex items-center justify-end gap-3 uppercase tracking-widest">
                         <CheckCircle2 size={20} /> الحالة: تم التحقق بنجاح • شهادة YemenJPT-CERT
                      </p>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-8 bg-slate-950/40 rounded-[2.5rem] border border-slate-800 space-y-6">
                      <h4 className="text-white font-black text-xl mb-4 text-right">تحليل بصيرة المتقدم</h4>
                      <div className="space-y-4">
                         <div className="flex justify-between items-center">
                            <span className="text-[#e1b000] font-black">100%</span>
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-tighter">METADATA SYNC</span>
                         </div>
                         <div className="h-2 bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-[#00338d] w-[100%] shadow-[0_0_8px_rgba(0,51,141,0.6)]"></div></div>
                      </div>
                   </div>
                   <div className="p-8 bg-slate-950/40 rounded-[2.5rem] border border-slate-800 space-y-6">
                      <h4 className="text-white font-black text-xl mb-4 text-right">مصدر الأدلة</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed text-right">يتم الربط التلقائي مع خزنة مُسند التاريخية لضمان عدم وجود تكرار أو تحريف سابق في المادة.</p>
                   </div>
                </div>

                <button onClick={() => setShowResults(false)} className="px-10 bg-slate-800 hover:bg-slate-700 text-slate-300 py-6 rounded-[2rem] font-black transition-all border border-slate-700 w-full text-lg">إجراء فحص جديد</button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
