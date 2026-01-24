
import React, { useState, useCallback } from 'react';
import { 
    Upload, ShieldCheck, FileText, ImageIcon, Video, Search, Scan, 
    Eye, Play, CheckCircle2, AlertTriangle, Activity, Cpu, Globe, 
    Layers, Info, Fingerprint, Database, Zap, Camera, Clock, Brain,
    FileSearch, MoreVertical, ChevronRight, Share2, Download, Terminal, Lock, Map as MapIcon, Shield
} from 'lucide-react';

const ForensicLab: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const startAnalysis = useCallback(() => {
    setIsAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
    }, 3500);
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 text-right font-ar" dir="rtl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-8 bg-gradient-to-br from-[#00338d]/20 to-black p-12 rounded-[4rem] border border-[#00338d]/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e1b000] to-transparent opacity-20"></div>
        <div className="text-right relative z-10">
           <h1 className="text-5xl font-black text-white tracking-tighter flex flex-row-reverse items-center gap-6">
             <ShieldCheck size={56} className="text-[#e1b000] drop-shadow-[0_0_20px_rgba(225,176,0,0.4)]" />
             🔍 Forensic Lab (Haqiqa)
           </h1>
           <p className="text-slate-400 text-lg font-medium mt-4 max-w-3xl leading-relaxed">
             المختبر الجنائي الرقمي المستقل | التشريح المتقدم للوسائط، التحقق من الميتا داتا، وكشف الزيف العميق.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Tools Sidebar */}
         <div className="lg:col-span-1 space-y-6">
            <div className="glass-morphism p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
               <h3 className="text-sm font-black text-white border-b border-white/5 pb-4 uppercase tracking-widest">Forensic Pipelines</h3>
               {[
                 { id: 'video', name: 'التشريح الجنائي للفيديو', icon: Video, color: 'text-blue-500' },
                 { id: 'image', name: 'تحليل الصور (ELA)', icon: ImageIcon, color: 'text-[#e1b000]' },
                 { id: 'metadata', name: 'استخراج الميتا داتا', icon: Database, color: 'text-emerald-500' },
                 { id: 'deepfake', name: 'كشف التزييف العميق', icon: Scan, color: 'text-red-500' },
               ].map(pipe => (
                 <button key={pipe.id} className="w-full p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-row-reverse items-center gap-4 hover:border-blue-500 transition-all text-right group">
                    <div className={`p-3 bg-slate-950 rounded-xl ${pipe.color} group-hover:scale-110 transition-transform`}><pipe.icon size={20}/></div>
                    <span className="text-xs font-black text-slate-400 group-hover:text-white">{pipe.name}</span>
                 </button>
               ))}
            </div>
            
            <div className="p-8 bg-black/60 rounded-[2.5rem] border border-slate-800 space-y-4">
               <div className="flex items-center gap-3 justify-end text-[#e1b000]">
                  <Lock size={16}/>
                  <span className="text-[10px] font-black uppercase tracking-widest">Chain of Custody</span>
               </div>
               <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5 font-mono text-[8px] text-slate-500 break-all text-right">
                  <p className="text-emerald-500 mb-1">SHA-256 HASH:</p>
                  f8a2c...b1e9c0d3a5f78210
               </div>
               <p className="text-[9px] text-slate-600 font-bold uppercase text-right">Evidence Hash Verified</p>
            </div>
         </div>

         {/* Main Viewport */}
         <div className="lg:col-span-3 space-y-8">
            {!showResults && !isAnalyzing ? (
              <div className="glass-morphism p-32 rounded-[4rem] border-4 border-dashed border-slate-800 flex flex-col items-center justify-center text-center space-y-10 group hover:border-[#00338d]/50 transition-all cursor-pointer">
                 <div className="w-40 h-40 bg-[#00338d]/10 rounded-[3rem] flex items-center justify-center text-[#e1b000] shadow-3xl group-hover:scale-110 transition-all">
                    <FileSearch size={80} />
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-3xl font-black text-white">إسقاط الدليل للتشريح الرقمي</h3>
                    <p className="text-slate-500 text-lg">سيتم الفحص عبر YemenJPT Forensic Engine v2.5</p>
                 </div>
                 <button onClick={startAnalysis} className="bg-[#00338d] text-white px-16 py-6 rounded-[2.5rem] font-black text-xl shadow-3xl active:scale-95 transition-all">START FORENSIC SCAN</button>
              </div>
            ) : isAnalyzing ? (
              <div className="glass-morphism p-32 rounded-[4rem] flex flex-col items-center gap-12 border border-blue-500/20 shadow-3xl">
                 <div className="relative">
                    <Activity size={120} className="text-[#e1b000] animate-spin-slow" />
                    <Brain size={48} className="absolute inset-0 m-auto text-blue-500 animate-pulse" />
                 </div>
                 <p className="text-white font-black text-3xl tracking-tight">جاري تشريح الدليل وتحليل البكسلات...</p>
                 <div className="w-full max-w-md h-3 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-[#e1b000] animate-[loading_3.5s_ease-in-out]"></div>
                 </div>
              </div>
            ) : (
              <div className="space-y-8">
                 {/* Split Screen UI */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[500px]">
                    <div className="glass-morphism rounded-[3rem] overflow-hidden border border-slate-800 relative group">
                       <div className="absolute top-6 right-6 bg-slate-900/80 px-4 py-2 rounded-xl text-[10px] font-black text-white uppercase border border-white/10 z-10">Original Media</div>
                       <img src="https://images.unsplash.com/photo-1542362567-b055002b91f4?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-80" />
                    </div>
                    <div className="glass-morphism rounded-[3rem] overflow-hidden border border-emerald-500/30 relative group">
                       <div className="absolute top-6 right-6 bg-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black text-white uppercase shadow-lg z-10">Forensic Analysis Layer</div>
                       <img src="https://images.unsplash.com/photo-1542362567-b055002b91f4?auto=format&fit=crop&q=80&w=800" className={`w-full h-full object-cover transition-all duration-1000 ${showHeatmap ? 'hue-rotate-180 saturate-200' : 'brightness-50'}`} />
                       <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20 opacity-40"></div>
                       {/* Heatmap overlay markers (conceptual) */}
                       <div className="absolute top-1/2 left-1/3 w-12 h-12 border-2 border-red-500 rounded-full animate-ping"></div>
                       <div className="absolute bottom-1/4 right-1/4 w-20 h-20 border-2 border-amber-500 rounded-xl animate-pulse"></div>
                    </div>
                 </div>

                 {/* Results Data */}
                 <div className="glass-morphism p-10 rounded-[3rem] border border-emerald-500/20 space-y-10 shadow-3xl">
                    <div className="flex flex-row-reverse justify-between items-center border-b border-white/5 pb-8">
                       <div className="text-right">
                          <h3 className="text-3xl font-black text-white">تقرير المعمل الجنائي (v.88)</h3>
                          <p className="text-emerald-500 font-black mt-2 uppercase tracking-widest flex items-center gap-3 justify-end"><CheckCircle2 size={20}/> Evidence Integrity: VERIFIED (Trust Score: 98%)</p>
                       </div>
                       <div className="flex gap-4">
                          <button onClick={() => setShowHeatmap(!showHeatmap)} className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase transition-all ${showHeatmap ? 'bg-amber-600 text-white shadow-xl' : 'bg-slate-800 text-slate-400'}`}>
                             {showHeatmap ? 'HIDE HEATMAP' : 'SHOW HEATMAP'}
                          </button>
                          <button className="p-4 bg-slate-800 rounded-2xl text-white hover:bg-blue-600 transition-all"><Download size={20}/></button>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="p-6 bg-slate-950 rounded-[2rem] border border-slate-800 text-right space-y-4">
                          <h4 className="text-xs font-black text-white uppercase flex items-center gap-2 justify-end"><MapIcon size={14} className="text-blue-500"/> Geolocation Match</h4>
                          <p className="text-slate-400 text-[11px] leading-relaxed">مطابقة بنسبة 95% مع تضاريس "وادي عبيدة" بمحافظة مأرب بناءً على تحليل الظلال ومعالم الأرض.</p>
                       </div>
                       <div className="p-6 bg-slate-950 rounded-[2rem] border border-slate-800 text-right space-y-4">
                          <h4 className="text-xs font-black text-white uppercase flex items-center gap-2 justify-end"><Clock size={14} className="text-emerald-500"/> Temporal Sync</h4>
                          <p className="text-slate-400 text-[11px] leading-relaxed">تم التقاط الوسائط في 2024-05-20 الساعة 14:15 حسب التوقيت المحلي، متوافق مع سجلات شبكة الاتصال المجاورة.</p>
                       </div>
                       <div className="p-6 bg-slate-950 rounded-[2rem] border border-slate-800 text-right space-y-4">
                          <h4 className="text-xs font-black text-white uppercase flex items-center gap-2 justify-end"><Fingerprint size={14} className="text-amber-500"/> Digital Signature</h4>
                          <p className="text-slate-400 text-[11px] leading-relaxed">توقيع الكاميرا متوافق مع جهاز iPhone 15 Pro، لا يوجد دليل على مرور الوسائط عبر برامج تعديل بكسلية.</p>
                       </div>
                    </div>
                    <button onClick={() => setShowResults(false)} className="w-full py-6 bg-slate-900 border border-slate-800 rounded-[2rem] text-slate-500 font-black text-xs uppercase tracking-widest hover:text-white transition-all">إجراء فحص جديد</button>
                 </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default ForensicLab;
