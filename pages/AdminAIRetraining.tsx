
import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, History, CheckCircle2, XCircle, Play, 
  Database, Cpu, Activity, LayoutGrid, Layers, 
  Sparkles, RefreshCw, Filter, ShieldCheck, Lock,
  MoreVertical, ChevronRight, AlertCircle, Loader2,
  TrendingUp, Download, Package, CloudLightning, Zap,
  ShieldAlert, Edit3, Code, Terminal, Save, FileText, Plus, Search,
  // Added missing Trash icon to fix line 102 error
  Trash
} from 'lucide-react';
import { TrainingFeedback, TrainingJob, ModelVersion, AiModelType } from '../types';

const AiEngineRoom: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'finetune' | 'prompts' | 'rag'>('finetune');
  const [systemPrompt, setSystemPrompt] = useState('أنت YemenJPT، المحرك الاستخباراتي السيادي...');

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 font-ar text-right pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#00338d] via-[#020617] to-black p-12 lg:p-16 rounded-[4.5rem] border border-white/5 shadow-3xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-12 relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-[#00338d] rounded-[2.2rem] flex items-center justify-center shadow-2xl border border-white/20">
               <Cpu size={48} className="text-[#e1b000]" />
            </div>
            <div className="text-right">
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">⚙️ AI Engine Room</h1>
              <p className="text-[#e1b000] font-black mt-3 text-lg uppercase tracking-widest opacity-80">بيئة التطوير والتحسين (DevOps/AI Ops)</p>
            </div>
          </div>
          <div className="flex bg-white/5 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/10 items-center gap-8 shadow-3xl">
             <div className="text-right">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Local GPU Mesh Status</p>
                <p className="text-white text-xl font-black text-emerald-400 flex items-center gap-2 justify-end">OPTIMIZED <Zap size={18} fill="currentColor"/></p>
             </div>
             <CloudLightning size={32} className="text-blue-500" />
          </div>
        </div>
      </div>

      <div className="flex bg-slate-900/50 p-1.5 rounded-[2rem] border border-slate-800 w-fit">
        <button onClick={() => setActiveTab('finetune')} className={`px-8 py-3 rounded-2xl text-[11px] font-black flex items-center gap-3 transition-all ${activeTab === 'finetune' ? 'bg-[#00338d] text-white shadow-xl' : 'text-slate-500'}`}><RefreshCw size={16}/> Fine-Tuning Hub</button>
        <button onClick={() => setActiveTab('prompts')} className={`px-8 py-3 rounded-2xl text-[11px] font-black flex items-center gap-3 transition-all ${activeTab === 'prompts' ? 'bg-[#00338d] text-white shadow-xl' : 'text-slate-500'}`}><Terminal size={16}/> Prompt Studio</button>
        <button onClick={() => setActiveTab('rag')} className={`px-8 py-3 rounded-2xl text-[11px] font-black flex items-center gap-3 transition-all ${activeTab === 'rag' ? 'bg-[#00338d] text-white shadow-xl' : 'text-slate-500'}`}><Database size={16}/> RAG Manager</button>
      </div>

      {activeTab === 'finetune' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 glass-morphism p-10 rounded-[3rem] border border-slate-800 space-y-8">
              <h3 className="text-xl font-black text-white flex flex-row-reverse items-center gap-3">مراجعة بيانات التدريب (False Positives) <AlertCircle size={20} className="text-amber-500" /></h3>
              <div className="space-y-4 h-[400px] overflow-y-auto custom-scrollbar pr-2">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="p-6 bg-slate-950/50 border border-slate-800 rounded-2xl space-y-4">
                       <div className="flex flex-row-reverse justify-between text-[10px] font-black text-slate-500 uppercase"><span>Correction Node #88{i}</span> <span>Status: Pending Review</span></div>
                       <p className="text-sm text-white text-right leading-relaxed">"The system incorrectly identified the Yemeni dialect in the Taiz recording as Sana'ani."</p>
                       <div className="flex gap-2 justify-end">
                          <button className="px-4 py-2 bg-emerald-600/10 text-emerald-500 text-[9px] font-black rounded-lg uppercase">Approve for Tuning</button>
                          <button className="px-4 py-2 bg-red-600/10 text-red-500 text-[9px] font-black rounded-lg uppercase">Discard</button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           <div className="glass-morphism p-10 rounded-[3rem] border border-slate-800 bg-[#00338d]/5 space-y-8">
              <h3 className="text-xl font-black text-white text-right">Job Orchestrator</h3>
              <button className="w-full py-5 bg-[#e1b000] text-[#00338d] font-black rounded-2xl shadow-xl flex items-center justify-center gap-3"><Play size={20} fill="currentColor"/> START EPOCH TRAINING</button>
              <div className="space-y-4">
                 <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase"><span>45% Complete</span> <span>Fine-Tuning AraBERT</span></div>
                 <div className="h-2 bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[45%] shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div></div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'prompts' && (
         <div className="glass-morphism p-10 rounded-[3rem] border border-slate-800 space-y-8">
            <div className="flex flex-row-reverse justify-between items-center">
               <h3 className="text-2xl font-black text-white">Prompt Studio (IDE)</h3>
               <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-black text-xs flex items-center gap-3 shadow-xl"><Save size={18}/> SAVE SYSTEM PROMPT</button>
            </div>
            <div className="p-8 bg-slate-950 border border-slate-800 rounded-[2rem] space-y-4">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-2">Base System Instruction (Persona)</label>
               <textarea 
                 value={systemPrompt}
                 onChange={(e) => setSystemPrompt(e.target.value)}
                 className="w-full h-80 bg-transparent text-slate-200 font-mono text-sm outline-none resize-none leading-relaxed text-right"
                 dir="rtl"
               />
            </div>
         </div>
      )}

      {activeTab === 'rag' && (
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 glass-morphism p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
               <h3 className="text-sm font-black text-white uppercase tracking-widest border-b border-white/5 pb-4">Knowledge Sources</h3>
               <button className="w-full py-4 bg-blue-600/10 border border-blue-500/30 text-blue-500 rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-3"><Plus size={16}/> UPLOAD PDF/JSON</button>
               <div className="space-y-3">
                  {['Yemen_Law_2024.pdf', 'Dialect_Mapping_v2.json', 'Conflict_History.txt'].map(file => (
                     <div key={file} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-row-reverse justify-between items-center group cursor-pointer hover:border-[#e1b000]">
                        <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">{file}</span>
                        <Trash size={14} className="text-slate-600 hover:text-red-500" />
                     </div>
                  ))}
               </div>
            </div>
            <div className="lg:col-span-3 glass-morphism p-10 rounded-[3rem] border border-slate-800 space-y-8">
               <div className="flex flex-row-reverse justify-between items-center">
                  <h3 className="text-xl font-black text-white">Vector DB Explorer</h3>
                  <div className="relative w-80">
                     <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
                     <input placeholder="Search embeddings..." className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-12 pl-6 py-3 text-[10px] text-white outline-none focus:border-[#e1b000]" />
                  </div>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                     <div key={i} className="p-6 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-2 group hover:border-blue-500 transition-all cursor-pointer">
                        <Database size={24} className="mx-auto text-blue-500/40 group-hover:text-blue-500" />
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Shard #0{i}</p>
                        <p className="text-xs font-bold text-white">12.4k Vectors</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default AiEngineRoom;
