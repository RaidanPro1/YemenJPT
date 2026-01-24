
import React, { useState, useMemo, useEffect } from 'react';
import { 
  FolderOpen, CheckSquare, MessageSquare, Plus, FileText, Search, User, 
  Clock, Send, Filter, Download, Trash2, Paperclip, CheckCircle2, Calendar, 
  Share2, Users, SortAsc, SortDesc, ShieldCheck, X, Building2, Lock, ShieldAlert,
  MoreVertical, ChevronRight, Folder, FolderPlus, MessageCircle, FileUp, Info,
  Globe, Twitter, Facebook, ExternalLink, PenTool, Check, Loader2, Newspaper,
  Eye, History, AlertCircle, Sparkles, Layout, LayoutGrid, Rocket,
  Zap, ShieldCheck as ShieldIcon, Flag, Circle
} from 'lucide-react';
import { Task, TaskPriority, SharedFile, User as UserType, Comment, Folder as FolderType } from '../types';
import { notificationService } from '../services/notifications';

const CollaborationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'files' | 'newsroom' | 'tasks'>('files');
  const [user, setUser] = useState<UserType | null>(null);
  const [activeFolderId, setActiveFolderId] = useState('f1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<SharedFile | null>(null);
  
  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([
    { id: 't1', title: 'مراجعة مسودة تحقيق الفساد المالي', status: 'in_progress', priority: 'high', assignee: 'زيد اليماني' },
    { id: 't2', title: 'تواصل مع مصادر في ميناء الحديدة', status: 'todo', priority: 'medium', assignee: 'أحمد صالح' },
    { id: 't3', title: 'أرشفة صور الانتهاكات في تعز', status: 'done', priority: 'low', assignee: 'سارة' },
  ]);

  const [wpSites] = useState([
    { name: 'أخبار بيت الصحافة', url: 'news.ph-ye.org', status: 'online' },
    { name: 'بوابة التقارير', url: 'reports.ph-ye.org', status: 'online' }
  ]);

  const [files, setFiles] = useState<SharedFile[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('yemengpt_user');
    if (savedUser) {
      const u = JSON.parse(savedUser) as UserType;
      setUser(u);
      setFiles([
        { 
          id: '1', name: `تقرير_الفساد_المركزي.pdf`, type: 'PDF', size: '2.4 MB', owner: 'أحمد صالح', 
          updatedAt: 'منذ ساعتين', comments: 1, timestamp: Date.now() - 7200000, 
          organizationId: 'org1', folderId: 'f1',
          commentsList: [{ id: 'c1', author: 'مدير التحرير', text: 'يرجى مراجعة المصادر في الصفحة 4', timestamp: Date.now() - 3600000 }],
          publications: []
        }
      ]);
    }
  }, []);

  const handlePriorityChange = (taskId: string, priority: TaskPriority) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, priority } : t));
    notificationService.notify(`📝 تم تحديث أولوية المهمة إلى ${priority.toUpperCase()}`);
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getPriorityLabel = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      case 'low': return 'منخفضة';
      default: return priority;
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full animate-in fade-in duration-500 pb-10 font-ar" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 text-right">
          <div className="w-14 h-14 bg-[#00338d]/20 rounded-2xl flex items-center justify-center border border-[#00338d]/20 shadow-inner">
             <Layout size={28} className="text-[#e1b000]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ديوان الأخبار المتقدم</h1>
            <p className="text-slate-400 text-sm font-medium">إدارة المحتوى، الربط مع WordPress، وتوزيع الأدوات السيادية.</p>
          </div>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800">
          <button onClick={() => setActiveTab('files')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'files' ? 'bg-[#00338d] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>إدارة المستندات</button>
          <button onClick={() => setActiveTab('newsroom')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'newsroom' ? 'bg-[#00338d] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>غرفة الأخبار & WP</button>
          <button onClick={() => setActiveTab('tasks')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'tasks' ? 'bg-[#00338d] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>المهام</button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
        {activeTab === 'newsroom' ? (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom overflow-y-auto p-2">
             <div className="lg:col-span-2 space-y-8">
                <div className="glass-morphism p-10 rounded-[3rem] border border-slate-800 space-y-8">
                   <div className="flex flex-row-reverse justify-between items-center">
                      <h3 className="text-2xl font-black text-white">توزيع المحتوى على ووردبريس</h3>
                      <button className="px-6 py-3 bg-[#00338d] text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <Plus size={16}/> إنشاء مسودة موحدة
                      </button>
                   </div>
                   <div className="space-y-4">
                      {wpSites.map((site, i) => (
                        <div key={i} className="p-6 bg-slate-950 border border-slate-800 rounded-[2rem] flex flex-row-reverse justify-between items-center group hover:border-[#00338d]/50 transition-all">
                           <div className="flex flex-row-reverse items-center gap-6">
                              <div className="p-4 bg-[#00338d]/10 rounded-2xl text-blue-400"><Globe size={24}/></div>
                              <div className="text-right">
                                 <h4 className="text-lg font-black text-white">{site.name}</h4>
                                 <p className="text-[10px] text-slate-500 font-bold">{site.url}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-4">
                              <span className="text-[9px] font-black text-emerald-500 uppercase flex items-center gap-2">
                                <Zap size={14}/> متصل
                              </span>
                              <button className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-[10px] font-black">إدارة</button>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="glass-morphism p-10 rounded-[3rem] border border-slate-800 space-y-8">
                   <h3 className="text-2xl font-black text-white text-right">إدارة صفحات التواصل</h3>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="p-8 bg-blue-600/5 border border-blue-600/20 rounded-[2.5rem] flex flex-col items-center gap-4 group cursor-pointer hover:bg-blue-600/10 transition-all">
                         <Twitter size={32} className="text-blue-400 group-hover:scale-110 transition-transform" />
                         <span className="text-xs font-black text-white uppercase">X / Twitter</span>
                         <span className="text-[10px] text-emerald-500 font-bold">مربوط بنجاح</span>
                      </div>
                      <div className="p-8 bg-blue-800/5 border border-blue-800/20 rounded-[2.5rem] flex flex-col items-center gap-4 group cursor-pointer hover:bg-blue-800/10 transition-all">
                         <Facebook size={32} className="text-blue-600 group-hover:scale-110 transition-transform" />
                         <span className="text-xs font-black text-white uppercase">Facebook</span>
                         <span className="text-[10px] text-emerald-500 font-bold">مربوط بنجاح</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="space-y-8">
                <div className="glass-morphism p-8 rounded-[3rem] border border-slate-800 bg-[#e1b000]/5 space-y-6 shadow-2xl">
                   <h4 className="text-xl font-black text-white text-right flex flex-row-reverse items-center gap-3">
                      <Rocket size={20} className="text-[#e1b000]"/> النشر الذكي (AI Push)
                   </h4>
                   <p className="text-[10px] text-slate-500 leading-relaxed text-right font-medium">استخدم معالج YemenJPT لإعادة صياغة المستندات لتناسب مختلف المنصات (ووردبريس، تويتر، تليجرام) بضغطة واحدة.</p>
                   <button className="w-full py-4 bg-[#00338d] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2">
                     <Sparkles size={16}/> صياغة ونشر ذكي
                   </button>
                </div>
                
                <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] space-y-4">
                   <h5 className="text-xs font-black text-white text-right uppercase tracking-widest">تحليلات النشر اليومي</h5>
                   <div className="space-y-4 pt-2">
                      <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase"><span>85%</span> <span>ووردبريس</span></div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[85%]"></div></div>
                      <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase"><span>15%</span> <span>تواصل اجتماعي</span></div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-[#e1b000] w-[15%]"></div></div>
                   </div>
                </div>
             </div>
          </div>
        ) : activeTab === 'tasks' ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="flex flex-row-reverse justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-white">إدارة المهام التحريرية</h3>
              <button className="bg-[#00338d] text-white px-6 py-2 rounded-xl text-xs font-black flex items-center gap-2">
                <Plus size={18}/> مهمة جديدة
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['todo', 'in_progress', 'done'].map((status) => (
                <div key={status} className="space-y-4">
                  <div className="flex flex-row-reverse items-center justify-between px-4 py-2 bg-slate-900/50 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {status === 'todo' ? 'قيد الانتظار' : status === 'in_progress' ? 'قيد العمل' : 'مكتمل'}
                    </span>
                    <span className="bg-slate-800 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-full">
                      {tasks.filter(t => t.status === status).length}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {tasks.filter(t => t.status === status).map((task) => (
                      <div key={task.id} className="glass-morphism p-6 rounded-[2rem] border border-slate-800 hover:border-[#00338d]/40 transition-all group shadow-xl space-y-4">
                        <div className="flex flex-row-reverse justify-between items-start">
                          <h4 className="text-sm font-black text-white text-right leading-relaxed flex-1 ml-4 group-hover:text-[#e1b000] transition-colors">{task.title}</h4>
                          <button className="p-1 text-slate-600 hover:text-white transition-colors"><MoreVertical size={16}/></button>
                        </div>
                        <div className="flex flex-row-reverse items-center justify-between pt-4 border-t border-slate-800/50">
                          <div className="flex flex-row-reverse items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#00338d] border border-white/10 flex items-center justify-center text-[8px] font-black">
                              {task.assignee?.charAt(0)}
                            </div>
                            <span className="text-[10px] text-slate-500 font-bold">{task.assignee}</span>
                          </div>
                          
                          {/* Priority Selector/Display */}
                          <div className="relative group/priority">
                            <button className={`px-3 py-1 rounded-lg text-[9px] font-black flex items-center gap-1.5 border transition-all ${getPriorityColor(task.priority)}`}>
                              <Flag size={10} fill="currentColor" />
                              {getPriorityLabel(task.priority)}
                            </button>
                            <div className="absolute bottom-full left-0 mb-2 hidden group-hover/priority:flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl z-50">
                              {(['high', 'medium', 'low'] as TaskPriority[]).map((p) => (
                                <button 
                                  key={p}
                                  onClick={() => handlePriorityChange(task.id, p)}
                                  className={`px-4 py-2 text-[10px] font-black hover:bg-white/5 transition-colors whitespace-nowrap text-right flex flex-row-reverse items-center gap-2 ${p === task.priority ? 'text-[#e1b000]' : 'text-slate-400'}`}
                                >
                                  <Circle size={8} fill={p === 'high' ? '#ef4444' : p === 'medium' ? '#f59e0b' : '#3b82f6'} stroke="none" />
                                  {getPriorityLabel(p)}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Previous Files Layout */
          <div className="flex-1 flex gap-6 overflow-hidden">
             <div className="flex-1 glass-morphism rounded-[3rem] border border-slate-800 flex items-center justify-center">
                <p className="text-slate-600 font-black uppercase tracking-widest text-xs">مستعرض الملفات السيادي جاهز</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationPage;
