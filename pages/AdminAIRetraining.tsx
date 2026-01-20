
import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, History, CheckCircle2, XCircle, Play, 
  Database, Cpu, Activity, LayoutGrid, Layers, 
  Sparkles, RefreshCw, Filter, ShieldCheck, Lock,
  MoreVertical, ChevronRight, AlertCircle, Loader2,
  TrendingUp, Download, Package, CloudLightning, Zap,
  // Added ShieldAlert to resolve find name error on line 182
  ShieldAlert
} from 'lucide-react';
import { TrainingFeedback, TrainingJob, ModelVersion, AiModelType } from '../types';

const AdminAIRetraining: React.FC = () => {
  const [activeJobs, setActiveJobs] = useState<TrainingJob[]>([
    { id: 'job-1', targetModel: 'YemenJPT-Core', dataset: 'Approved_Feedback_Q1', status: 'training', progress: 45, createdAt: Date.now() - 3600000 }
  ]);

  const [feedbackItems, setFeedbackItems] = useState<TrainingFeedback[]>([
    { 
      id: 'f-1', 
      inputData: 'ما هو تاريخ تأسيس بيت الصحافة؟', 
      aiPrediction: 'تأسس في عام 2020.', 
      humanCorrection: 'تأسس بيت الصحافة اليمني في يناير 2019.',
      status: 'pending',
      timestamp: Date.now() - 172800000
    },
    { 
      id: 'f-2', 
      inputData: 'صورة لانفجار في ميناء عدن.', 
      aiPrediction: 'صورة حقيقية لانفجار اليوم.', 
      humanCorrection: 'صورة مضللة تعود لعام 2015.',
      status: 'pending',
      timestamp: Date.now() - 86400000
    }
  ]);

  const [modelVersions, setModelVersions] = useState<ModelVersion[]>([
    { id: 'v-1.1', version: 'v1.1-beta', baseModel: AiModelType.FALCON_3, isActive: true, accuracy: 0.94, createdAt: Date.now() - 604800000 },
    { id: 'v-1.0', version: 'v1.0', baseModel: AiModelType.FALCON_3, isActive: false, accuracy: 0.91, createdAt: Date.now() - 1209600000 }
  ]);

  const [isStartingJob, setIsStartingJob] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 font-ar text-right pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#00338d] via-[#020617] to-black p-12 lg:p-16 rounded-[4.5rem] border border-white/5 shadow-3xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-12 relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-[#e1b000] rounded-[2.2rem] flex items-center justify-center shadow-2xl border border-white/20">
               <BrainCircuit size={48} className="text-[#00338d]" />
            </div>
            <div className="text-right">
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">مركز استراتيجية التعلم</h1>
              <p className="text-[#e1b000] font-black mt-3 text-lg uppercase tracking-widest opacity-80">التحكم في إعادة تدريب YemenJPT (Human-in-the-Loop)</p>
            </div>
          </div>
          <div className="flex bg-white/5 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/10 items-center gap-8 shadow-3xl">
             <div className="text-right">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">بيانات التدريب المتاحة</p>
                <p className="text-white text-xl font-black">{feedbackItems.length} عينة مصححة</p>
             </div>
             <Database size={32} className="text-blue-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Panel 1: The Feedback Nexus (Data Review) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-morphism p-12 rounded-[4rem] border border-slate-800 shadow-2xl h-full flex flex-col">
            <div className="flex flex-row-reverse justify-between items-center mb-10">
              <h3 className="text-2xl font-black text-white flex flex-row-reverse items-center gap-3">
                <Sparkles size={24} className="text-[#e1b000]" /> ركن التصحيح البشري (Feedback Nexus)
              </h3>
              <div className="flex gap-2">
                 <button className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 hover:text-white transition-all"><Filter size={18}/></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
              {feedbackItems.map(item => (
                <div key={item.id} className="p-8 bg-slate-950/60 rounded-[2.5rem] border border-slate-800 hover:border-[#00338d]/40 transition-all group">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4 text-right">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">المُدخل (Input)</p>
                      <div className="p-4 bg-slate-900 rounded-xl text-sm font-medium text-slate-300">{item.inputData}</div>
                    </div>
                    <div className="space-y-4 text-right">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">تنبؤ الـ AI الأصلي</p>
                      <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-sm font-medium text-red-400">{item.aiPrediction}</div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-900 flex flex-col md:flex-row-reverse justify-between items-center gap-6">
                    <div className="flex-1 text-right">
                      <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-2 flex flex-row-reverse items-center gap-2">
                         <ShieldCheck size={14}/> تصحيح الخبير الصحفي (Ground Truth)
                      </p>
                      <p className="text-sm font-bold text-white leading-relaxed">{item.humanCorrection}</p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
                        <CheckCircle2 size={16}/> اعتماد للتدريب
                      </button>
                      <button className="px-6 py-3 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
                        <XCircle size={16}/> تجاهل
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Sections */}
        <div className="space-y-8">
          
          {/* Panel 2: Training Orchestration */}
          <div className="glass-morphism p-10 rounded-[3.5rem] border border-slate-800 bg-[#00338d]/5 space-y-8 shadow-2xl">
            <h4 className="text-xl font-black text-white flex flex-row-reverse items-center gap-3 justify-end">
              <RefreshCw size={20} className="text-[#e1b000]"/> أوركسترا التدريب
            </h4>
            
            <button 
              onClick={() => setIsStartingJob(true)}
              className="w-full py-6 bg-[#00338d] hover:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl transition-all"
            >
              <Play size={18}/> بدء دورة fine-tuning جديدة
            </button>

            <div className="space-y-6">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">الوظائف النشطة</p>
              {activeJobs.map(job => (
                <div key={job.id} className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-row-reverse justify-between items-center">
                    <span className="text-white text-xs font-black">{job.targetModel}</span>
                    <span className="text-[10px] text-[#e1b000] font-black animate-pulse">{job.status === 'training' ? 'جاري التدريب...' : 'قيد الانتظار'}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-black text-slate-600 uppercase">
                      <span>{job.progress}%</span>
                      <span>Progress</span>
                    </div>
                    <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)] transition-all duration-1000" style={{ width: `${job.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 3: Model Version Control */}
          <div className="glass-morphism p-10 rounded-[3.5rem] border border-slate-800 space-y-8 shadow-2xl">
            <h4 className="text-xl font-black text-white flex flex-row-reverse items-center gap-3 justify-end">
              <Layers size={20} className="text-emerald-500"/> التحكم في الإصدارات
            </h4>

            <div className="space-y-4">
              {modelVersions.map(model => (
                <div key={model.id} className={`p-6 rounded-2xl border transition-all flex flex-row-reverse justify-between items-center ${model.isActive ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-900/40 border-slate-800'}`}>
                   <div className="text-right">
                      <p className="text-sm font-black text-white">{model.version}</p>
                      <p className="text-[9px] text-slate-500 font-bold mt-1">Accuracy: {(model.accuracy * 100).toFixed(1)}%</p>
                   </div>
                   <div className="flex items-center gap-3">
                      {model.isActive ? (
                        <span className="px-3 py-1 bg-emerald-500 text-[#00338d] rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">Deployed</span>
                      ) : (
                        <button className="px-4 py-2 bg-slate-800 hover:bg-[#00338d] text-slate-400 hover:text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all">
                          Deploy
                        </button>
                      )}
                   </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl text-right">
               <p className="text-[10px] text-red-500 font-black uppercase tracking-widest mb-2 flex flex-row-reverse items-center gap-2">
                  <ShieldAlert size={14}/> طوارئ (Rollback)
               </p>
               <p className="text-[9px] text-slate-500 leading-relaxed">استعادة الإصدار المستقر v1.0 فوراً في حال حدوث تراجع في جودة الاستجابة.</p>
               <button className="w-full mt-4 py-3 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
                 Revert to v1.0
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminAIRetraining;
