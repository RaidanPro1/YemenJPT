
import React, { useState } from 'react';
import { BrainCircuit, Sparkles, CheckCircle2, XCircle, RefreshCw, Layers, Database, ShieldCheck, Play, ArrowRight } from 'lucide-react';
import { TrainingFeedback } from '../types';

const AdminAIRetraining: React.FC = () => {
  const [feedback, setFeedback] = useState<TrainingFeedback[]>([
    { id: '1', inputData: 'ما هي أهمية بيت الصحافة؟', aiPrediction: 'مؤسسة إعلامية تأسست في 2020.', humanCorrection: 'مؤسسة يمنية مستقلة تأسست في يناير 2019 لدعم الحريات.', status: 'pending', timestamp: Date.now() },
    { id: '2', inputData: 'تحليل صورة انفجار ميناء عدن', aiPrediction: 'انفجار حقيقي في 2024.', humanCorrection: 'صورة مضللة تعود لعام 2015 في مرفأ آخر.', status: 'pending', timestamp: Date.now() - 86400000 }
  ]);

  const handleAction = (id: string, status: 'approved' | 'discarded') => {
    setFeedback(prev => prev.map(f => f.id === id ? {...f, status} : f));
  };

  return (
    <div className="space-y-10 animate-in fade-in">
      <div className="bg-gradient-to-br from-[#00338d] via-[#020617] to-black p-12 rounded-[4rem] border border-white/5 shadow-3xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-12 relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-[#e1b000] rounded-[2.2rem] flex items-center justify-center shadow-2xl border border-white/20">
               <BrainCircuit size={48} className="text-[#00338d]" />
            </div>
            <div className="text-right">
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase">مركز استراتيجية التعلم</h1>
              <p className="text-[#e1b000] font-black mt-3 text-lg uppercase tracking-widest opacity-80">AI Nexus: Human-in-the-Loop Optimization</p>
            </div>
          </div>
          <div className="flex bg-white/5 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/10 items-center gap-8">
             <div className="text-right">
                <p className="text-[10px] text-slate-500 font-black uppercase">عينات التصحيح الجاهزة</p>
                <p className="text-white text-xl font-black">{feedback.filter(f => f.status === 'pending').length} عينات قيد المراجعة</p>
             </div>
             <Database size={32} className="text-blue-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 glass-morphism p-12 rounded-[4rem] border border-slate-800 shadow-2xl h-[700px] flex flex-col">
            <h3 className="text-2xl font-black text-white flex items-center gap-3 justify-end mb-10">
               ركن التصحيح البشري (Feedback Nexus) <Sparkles size={24} className="text-[#e1b000]" />
            </h3>
            <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-4">
               {feedback.filter(f => f.status === 'pending').map(item => (
                 <div key={item.id} className="p-8 bg-slate-950/60 rounded-[2.5rem] border border-slate-800 hover:border-[#00338d]/40 transition-all space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3 text-right">
                          <p className="text-[9px] text-slate-500 font-black uppercase">المُدخل (Input)</p>
                          <div className="p-4 bg-slate-900 rounded-xl text-xs text-slate-300 border border-slate-800">{item.inputData}</div>
                       </div>
                       <div className="space-y-3 text-right">
                          <p className="text-[9px] text-red-500 font-black uppercase">تنبؤ الـ AI الأصلي</p>
                          <div className="p-4 bg-red-500/5 rounded-xl text-xs text-red-400 border border-red-500/10">{item.aiPrediction}</div>
                       </div>
                    </div>
                    <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row-reverse justify-between items-center gap-6">
                       <div className="flex-1 text-right">
                          <p className="text-[10px] text-emerald-500 font-black uppercase flex items-center gap-2 justify-end">
                             <ShieldCheck size={14} /> تصحيح الخبير الصحفي (Ground Truth)
                          </p>
                          <p className="text-sm font-bold text-white mt-2 leading-relaxed">{item.humanCorrection}</p>
                       </div>
                       <div className="flex gap-3">
                          <button onClick={() => handleAction(item.id, 'approved')} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase flex items-center gap-2"><CheckCircle2 size={16}/> اعتماد</button>
                          <button onClick={() => handleAction(item.id, 'discarded')} className="px-6 py-3 bg-slate-800 text-slate-400 hover:text-red-500 rounded-xl text-[10px] font-black uppercase flex items-center gap-2"><XCircle size={16}/> تجاهل</button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-8">
            <div className="glass-morphism p-10 rounded-[3.5rem] border border-slate-800 bg-[#00338d]/5 space-y-8">
               <h4 className="text-xl font-black text-white text-right">أوركسترا التدريب <RefreshCw size={20} className="text-[#e1b000] inline-block ml-3" /></h4>
               <button className="w-full py-6 bg-[#00338d] hover:bg-blue-600 text-white rounded-3xl font-black text-xs uppercase shadow-xl flex items-center justify-center gap-3">
                  <Play size={18} /> بدء دورة Fine-Tuning جديدة
               </button>
               <div className="space-y-4">
                  <p className="text-[10px] text-slate-500 font-black uppercase text-right">الموديلات النشطة</p>
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                     <span className="text-[10px] bg-emerald-500 text-[#00338d] px-3 py-1 rounded-lg font-black uppercase">Active</span>
                     <div className="text-right">
                        <p className="text-white font-black text-sm">YemenJPT v1.1-beta</p>
                        <p className="text-[9px] text-slate-500 mt-1">Base: Falcon-3-Q4</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-8 bg-[#e1b000]/5 border border-[#e1b000]/20 rounded-[3rem] space-y-4 text-right">
               <h4 className="text-[#e1b000] font-black text-sm uppercase">تنبيه المعالجة</h4>
               <p className="text-[10px] text-slate-400 leading-relaxed font-medium">يتم التدريب باستخدام تقنية LoRA لتقليل استهلاك الموارد وضمان بقاء المعرفة ضمن "خزنة مُسند" المحلية حصراً.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminAIRetraining;
