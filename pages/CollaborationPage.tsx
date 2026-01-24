
import React, { useState, useMemo, useEffect } from 'react';
import { 
  FolderOpen, CheckSquare, MessageSquare, Plus, FileText, Search, User, 
  Clock, Send, Filter, Download, Trash2, Paperclip, CheckCircle2, Calendar, 
  Share2, Users, SortAsc, SortDesc, ShieldCheck, X, Building2, Lock, ShieldAlert,
  MoreVertical, ChevronRight, Folder, FolderPlus, MessageCircle, FileUp, Info,
  Globe, Twitter, Facebook, ExternalLink, PenTool, Check, Loader2, Newspaper,
  Eye, History, AlertCircle, Sparkles, Layout, LayoutGrid, Rocket,
  Zap, ShieldCheck as ShieldIcon, Flag, Circle, WifiOff, TrendingUp, ArrowUpRight
} from 'lucide-react';
import { Task, TaskPriority, SharedFile, User as UserType, Comment, Folder as FolderType } from '../types';
import { notificationService } from '../services/notifications';

const NewsroomOS: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'trends' | 'files'>('workflow');
  const [offlineMode, setOfflineMode] = useState(false);
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: 't1', title: 'تحقيق: فساد المشتقات النفطية', status: 'todo', priority: 'high', assignee: 'أحمد' },
    { id: 't2', title: 'مراجعة فيديو انفجار عدن', status: 'in_progress', priority: 'medium', assignee: 'سارة' },
    { id: 't3', title: 'أرشفة وثائق البنك المركزي', status: 'done', priority: 'low', assignee: 'زيد' },
  ]);

  const trends = [
    { tag: '#اليمن_الآن', count: '12.4k', type: 'hot' },
    { tag: '#صنعاء', count: '8.2k', type: 'up' },
    { tag: '#عدن', count: '5.5k', type: 'stable' },
  ];

  const handlePriorityChange = (taskId: string, priority: TaskPriority) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, priority } : t));
    notificationService.notify(`📝 تم تحديث أولوية المهمة إلى ${priority.toUpperCase()}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 font-ar text-right" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-6">
        <div className="flex flex-row-reverse items-center gap-6">
          <div className="w-16 h-16 bg-[#00338d]/20 rounded-2xl flex items-center justify-center border border-[#00338d]/20 shadow-inner">
             <Newspaper size={32} className="text-[#e1b000]" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">📰 Newsroom OS</h1>
            <p className="text-slate-400 text-sm font-medium">نظام إدارة التحرير المتكامل | Editor-in-Chief Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={() => setOfflineMode(!offlineMode)}
             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all border ${offlineMode ? 'bg-amber-600/10 border-amber-500/30 text-amber-500 shadow-xl shadow-amber-900/20' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white'}`}
           >
              {offlineMode ? <WifiOff size={16} /> : <Zap size={16} />}
              {offlineMode ? 'OFFLINE MODE ACTIVE' : 'SWITCH TO OFFLINE'}
           </button>
           <button className="bg-[#00338d] text-white px-8 py-2.5 rounded-xl text-xs font-black flex items-center gap-3 shadow-xl transition-all active:scale-95">
             <Plus size={18}/> إنشاء خيط صحفي
           </button>
        </div>
      </div>

      <div className="flex bg-slate-900/50 p-1.5 rounded-[2rem] border border-slate-800 w-fit">
        <button onClick={() => setActiveTab('workflow')} className={`px-8 py-3 rounded-2xl text-[11px] font-black flex items-center gap-3 transition-all ${activeTab === 'workflow' ? 'bg-[#00338d] text-white shadow-xl' : 'text-slate-500'}`}><Layout size={16}/> Kanban Workflow</button>
        <button onClick={() => setActiveTab('trends')} className={`px-8 py-3 rounded-2xl text-[11px] font-black flex items-center gap-3 transition-all ${activeTab === 'trends' ? 'bg-[#00338d] text-white shadow-xl' : 'text-slate-500'}`}><TrendingUp size={16}/> Trend Watch</button>
      </div>

      {activeTab === 'workflow' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {['todo', 'in_progress', 'done'].map((status) => (
             <div key={status} className="space-y-6">
                <div className="flex flex-row-reverse items-center justify-between px-6 py-4 bg-slate-900/50 rounded-[1.5rem] border border-slate-800">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                    {status === 'todo' ? 'قائمة المهام (Leads)' : status === 'in_progress' ? 'قيد التحقق (Verification)' : 'مكتمل (Publishing)'}
                  </span>
                  <span className="bg-slate-800 text-[#e1b000] text-[10px] font-black px-3 py-1 rounded-full">
                    {tasks.filter(t => t.status === status).length}
                  </span>
                </div>
                <div className="space-y-4">
                  {tasks.filter(t => t.status === status).map((task) => (
                    <div key={task.id} className="glass-morphism p-6 rounded-[2rem] border border-slate-800 hover:border-[#00338d]/40 transition-all group shadow-xl space-y-5">
                       <h4 className="text-sm font-black text-white group-hover:text-[#e1b000] transition-colors">{task.title}</h4>
                       <div className="flex flex-row-reverse items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex flex-row-reverse items-center gap-3">
                             <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-[10px] font-black text-blue-400">{task.assignee?.charAt(0)}</div>
                             <span className="text-[10px] text-slate-500 font-bold">{task.assignee}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase flex items-center gap-2 ${task.priority === 'high' ? 'text-red-500 bg-red-500/10' : task.priority === 'medium' ? 'text-amber-500 bg-amber-500/10' : 'text-blue-500 bg-blue-500/10'}`}>
                             <Flag size={10} fill="currentColor"/> {task.priority}
                          </span>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
           ))}
        </div>
      )}

      {activeTab === 'trends' && (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-morphism p-10 rounded-[3rem] border border-slate-800 space-y-8">
               <h3 className="text-xl font-black text-white flex flex-row-reverse items-center gap-3">رصد الوسوم النشطة (Snscrape) <TrendingUp size={24} className="text-[#e1b000]" /></h3>
               <div className="space-y-4">
                  {trends.map((trend, i) => (
                     <div key={i} className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all flex flex-row-reverse justify-between items-center group">
                        <div className="flex flex-row-reverse items-center gap-6">
                           <div className="p-4 bg-[#00338d]/10 rounded-xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all"><Twitter size={20}/></div>
                           <div className="text-right"><p className="text-lg font-black text-white">{trend.tag}</p><p className="text-[10px] text-slate-500 font-bold">{trend.count} تفاعلات مسجلة</p></div>
                        </div>
                        <ArrowUpRight size={20} className="text-slate-600 group-hover:text-blue-500" />
                     </div>
                  ))}
               </div>
            </div>
            <div className="glass-morphism p-10 rounded-[3rem] border border-slate-800 bg-[#e1b000]/5 flex flex-col items-center justify-center text-center space-y-6">
               <Sparkles size={64} className="text-[#e1b000] animate-pulse" />
               <h3 className="text-2xl font-black text-white">AI Trend Predictor</h3>
               <p className="text-slate-400 text-sm max-w-sm leading-relaxed">يتوقع معالج YemenJPT تصاعد السردية المتعلقة بـ "أسعار الصرف" بنسبة 25% خلال الـ 48 ساعة القادمة بناءً على أنماط النشر الحالية.</p>
            </div>
         </div>
      )}
    </div>
  );
};

export default NewsroomOS;
