
import React, { useState, useCallback } from 'react';
import { 
    Upload, ShieldCheck, FileText, ImageIcon, Video, Search, Scan, 
    Eye, Play, CheckCircle2, AlertTriangle, Activity, Cpu, Globe, 
    MapPin, Calendar, Sun, Layers, Info, Fingerprint, Database, Zap,
    ArrowRight, Share2, MessageSquare, Download, Trash2, Camera, Clock, Brain
} from 'lucide-react';

const VerificationPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'upload' | 'forensic' | 'deepfake' | 'sun'>('upload');
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

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 text-right" dir="rtl">
      {/* Dynamic Lab Header */}
      <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-8 bg-gradient-to-br from-[#00338d]/10 to-transparent p-10 rounded-[3.5rem] border border-[#00338d]/20 shadow-xl">
        <div className="text-right">
           <h1 className="text-4xl font-black text-white tracking-tighter flex flex-row-reverse items-center gap-4">
             <ShieldCheck size={40} className="text-[#e1b000] drop-shadow-[0_0_10px_rgba(225,176,0,0.5)]" />
             مختبر التحقق الجنائي الرقمي
           </h1>
           <p className="text-slate-400 text-lg font-medium mt-3 max-w-2xl leading-relaxed">
             منظومة InVID Forensic المتكاملة لفحص سلامة الوسائط، كشف التزييف العميق، وتوثيق الأدلة الرقمية بمعايير دولية.
           </p>
        </div>
        <div className="flex flex-wrap justify-center bg-slate-900/60 p-2 rounded-[2rem] border border-slate-800 shadow-inner backdrop-blur-xl">
           {[
             { id: 'upload', label: 'الرفع والمعاينة', icon: Upload },
             { id: 'deepfake', label: 'كشف AI/Deepfake', icon: Cpu },
             { id: 'forensic', label: 'تحليل البكسلات ELA', icon: Layers },
             { id: 'sun', label: 'التحليل الجيوفيزيائي', icon: Sun }
           ].map(tab => (
             <button 
               key={tab.id}
               onClick={() => setActiveTool(tab.id as any)} 
               className={`px-6 py-3.5 rounded-2xl text-xs font-black flex items-center gap-3 transition-all ${activeTool === tab.id ? 'bg-[#00338d] text-white shadow-xl scale-105' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
             >
                <tab.icon size={16} /> {tab.label}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Workspace: Lab Table */}
        <div className="lg:col-span-2 space-y-8">
           {!showResults && !isAnalyzing && (
             <div className="glass-morphism p-24 rounded-[4rem] border-4 border-dashed border-slate-800 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden group cursor-pointer hover:border-[#00338d]/50 transition-all duration-700">
                <div className="absolute inset-0 bg-[#00338d]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-32 h-32 bg-[#00338d]/10 rounded-[2.5rem] flex items-center justify-center text-[#00338d] border border-[#00338d]/20 shadow-[0_0_50px_rgba(0,51,141,0.1)] group-hover:scale-110 group-hover:rotate-3 transition-all relative z-10">
                   {activeTool === 'deepfake' ? <Cpu size={56} className="animate-pulse" /> : <Upload size={56} />}
                </div>
                <div className="space-y-3 relative z-10">
                   <p className="text-white font-black text-3xl tracking-tighter">اسحب الملف هنا للفحص السيادي</p>
                   <p className="text-slate-500 font-bold text-md opacity-60">يدعم الصور عالية الدقة (RAW) ومقاطع الفيديو حتى 4K</p>
                </div>
                <button onClick={startAnalysis} className="bg-[#00338d] hover:bg-blue-600 text-white px-14 py-5 rounded-2xl font-black shadow-2xl transition-all relative z-10 uppercase tracking-widest text-sm border border-white/10 active:scale-95">Launch Forensic Sweep</button>
             </div>
           )}

           {isAnalyzing && (
             <div className="p-24 glass-morphism rounded-[4rem] flex flex-col items-center gap-10 animate-in fade-in duration-500 border border-[#00338d]/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00338d] to-transparent animate-[shimmer_2s_infinite]"></div>
                <div className="relative">
                   <Activity size={84} className="text-[#e1b000] animate-spin-slow" />
                   <Scan size={44} className="absolute inset-0 m-auto text-white animate-pulse" />
                </div>
                <div className="text-center space-y-4">
                   <p className="text-white font-black text-2xl tracking-tight">جاري تفكيك الهياكل الرقمية واستخراج البصمات...</p>
                   <div className="flex items-center justify-center gap-3">
                      <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">InVID Node Active</span>
                      <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                      <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">ELA Processing: 78%</span>
                   </div>
                </div>
                <div className="w-80 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                   <div className="h-full bg-gradient-to-r from-[#00338d] to-blue-500 animate-[loading_4.5s_ease-in-out]"></div>
                </div>
             </div>
           )}

           {showResults && (
             <div className="glass-morphism p-12 rounded-[4rem] border border-emerald-500/30 space-y-10 animate-in zoom-in-95 duration-500 shadow-2xl">
                <div className="flex flex-row-reverse justify-between items-center border-b border-slate-800 pb-8">
                   <div className="text-right">
                      <h3 className="text-3xl font-black text-white leading-none">نتائج التوثيق الجنائي</h3>
                      <p className="text-emerald-400 font-bold text-sm mt-2 flex items-center justify-end gap-2">
                         <CheckCircle2 size={16} /> الحالة: تم التحقق بنجاح (Authentic)
                      </p>
                   </div>
                   <div className="flex gap-3">
                      <button className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all"><Download size={22}/></button>
                      <button className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all"><Share2 size={22}/></button>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-8 bg-slate-950/60 rounded-[3rem] border border-slate-800 space-y-6 group hover:border-emerald-500/30 transition-all">
                      <div className="flex flex-row-reverse justify-between items-center">
                         <h4 className="text-white font-black text-lg">تحليل البكسلات (ELA)</h4>
                         <span className="text-emerald-500 font-black text-xs uppercase tracking-widest">98.2% Accurate</span>
                      </div>
                      <div className="h-44 bg-slate-900 rounded-[2rem] border border-slate-800 flex items-center justify-center overflow-hidden relative">
                         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800')] bg-cover opacity-20 grayscale"></div>
                         <Layers size={48} className="text-emerald-500 opacity-40 group-hover:scale-110 transition-transform" />
                         <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded-lg text-[10px] text-white font-mono uppercase">Noise Map Analysis</div>
                      </div>
                   </div>
                   <div className="p-8 bg-slate-950/60 rounded-[3rem] border border-slate-800 space-y-6">
                      <div className="flex flex-row-reverse justify-between items-center">
                         <h4 className="text-white font-black text-lg">البيانات الوصفية (EXIF)</h4>
                         <Fingerprint size={20} className="text-[#e1b000]" />
                      </div>
                      <div className="space-y-4 text-right">
                         <div className="flex flex-row-reverse justify-between items-center p-3 bg-slate-900/40 rounded-xl border border-white/5">
                            <span className="text-slate-500 text-xs font-bold">طراز الكاميرا</span>
                            <span className="text-white font-black text-xs">iPhone 14 Pro Max</span>
                         </div>
                         <div className="flex flex-row-reverse justify-between items-center p-3 bg-slate-900/40 rounded-xl border border-white/5">
                            <span className="text-slate-500 text-xs font-bold">الإحداثيات</span>
                            <span className="text-blue-400 font-mono text-xs font-black tracking-tighter">15.3694 N, 44.1910 E</span>
                         </div>
                         <div className="flex flex-row-reverse justify-between items-center p-3 bg-slate-900/40 rounded-xl border border-white/5">
                            <span className="text-slate-500 text-xs font-bold">توقيت الالتقاط</span>
                            <span className="text-white font-black text-xs">2024-05-15 14:30:05</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row-reverse gap-4 pt-6">
                   {/* Fixed: Added missing Brain icon import */}
                   <button className="flex-1 bg-[#00338d] hover:bg-blue-600 text-white py-5 rounded-[1.8rem] font-black shadow-2xl transition-all flex items-center justify-center gap-3 group">
                      إرسال النتائج للمعالج السيادي للتحليل <Brain size={20} className="group-hover:rotate-12 transition-transform" />
                   </button>
                   <button onClick={() => setShowResults(false)} className="px-10 bg-slate-800 hover:bg-slate-700 text-slate-300 py-5 rounded-[1.8rem] font-black transition-all border border-slate-700">تحقق جديد</button>
                </div>
             </div>
           )}
        </div>

        {/* Lab Sidebar: Evidence Vault */}
        <div className="space-y-8">
           <div className="glass-morphism p-10 rounded-[3.5rem] border border-slate-800 shadow-xl">
              <div className="flex flex-row-reverse items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-white">خزنة الأدلة</h3>
                 <Database size={22} className="text-[#e1b000]"/>
              </div>
              <div className="space-y-4">
                 {[
                   { name: 'فيديو_مسرب_الضالع.mp4', status: 'Fake', color: 'bg-red-500/10 text-red-500', time: 'منذ ساعتين' },
                   { name: 'صورة_مبنى_تعز.jpg', status: 'Verified', color: 'bg-emerald-500/10 text-emerald-500', time: 'أمس' },
                   { name: 'وثيقة_ميناء_عدن.pdf', status: 'Suspicious', color: 'bg-amber-500/10 text-amber-500', time: 'منذ يومين' }
                 ].map((h, i) => (
                   <div key={i} className="p-5 bg-slate-950/40 rounded-[2rem] border border-slate-800/60 flex flex-row-reverse justify-between items-center hover:bg-slate-900 hover:border-[#00338d]/40 cursor-pointer transition-all group">
                      <div className="text-right flex-1 pr-4">
                        <p className="text-xs font-black text-white truncate max-w-[140px] mb-1 group-hover:text-blue-400">{h.name}</p>
                        <p className="text-[9px] text-slate-600 font-bold uppercase">{h.time}</p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${h.color}`}>{h.status}</span>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-4 bg-slate-800/50 hover:bg-white hover:text-black text-slate-400 text-[10px] font-black rounded-2xl transition-all uppercase tracking-[0.2em] border border-slate-700/50">Access Global Archives</button>
           </div>

           <div className="glass-morphism p-10 rounded-[3.5rem] border border-[#00338d]/20 bg-[#00338d]/5 space-y-6 text-right relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
                 <Globe size={120} className="text-[#e1b000]" />
              </div>
              <div className="flex flex-row-reverse items-center gap-3 text-blue-400 mb-2 relative z-10">
                 <MapPin size={22} />
                 <h4 className="font-black text-lg uppercase tracking-tighter">التتبع الجيوفيزيائي</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium relative z-10">
                 يتم ربط بصمات الميتا داتا الجغرافية تلقائياً بوحدة الخرائط السيادية لتأكيد مطابقة التضاريس والمباني مع صور الأقمار الصناعية لليمن.
              </p>
              <button className="w-full py-4 bg-[#00338d] hover:bg-blue-600 text-white text-[10px] font-black rounded-2xl shadow-xl transition-all uppercase tracking-widest relative z-10">Open Geospatial Sync</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
