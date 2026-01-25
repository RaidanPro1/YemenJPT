
import React, { useState, useMemo, useEffect } from 'react';
import { 
  FolderOpen, CheckSquare, MessageSquare, Plus, FileText, Search, User, 
  Clock, Send, Filter, Download, Trash2, Paperclip, CheckCircle2, Calendar, 
  Share2, Users, SortAsc, SortDesc, ShieldCheck, X, Building2, Lock, ShieldAlert,
  MoreVertical, ChevronRight, Folder, FolderPlus, MessageCircle, FileUp, Info,
  Globe, Twitter, Facebook, ExternalLink, PenTool, Check, Loader2, Newspaper,
  Eye, History, AlertCircle, Sparkles, Layout, LayoutGrid, Rocket,
  Zap, ShieldCheck as ShieldIcon
} from 'lucide-react';
import { Task, SharedFile, SortOption, UserRole, User as UserType, Comment, Folder as FolderType, PublicationRecord } from '../types';
import { notificationService } from '../services/notifications';

const CollaborationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'files' | 'newsroom' | 'tasks'>('files');
  const [user, setUser] = useState<UserType | null>(null);
  const [activeFolderId, setActiveFolderId] = useState('f1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<SharedFile | null>(null);
  
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

  return (
    <div className="space-y-6 flex flex-col h-full animate-in fade-in duration-500 pb-10 font-ar" dir="rtl">
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
                              <span className="text-[9px] font-black text-[#e1b000] uppercase flex items-center gap-2">
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
                         <span className="text-[10px] text-[#e1b000] font-bold">مربوط بنجاح</span>
                      </div>
                      <div className="p-8 bg-blue-800/5 border border-blue-800/20 rounded-[2.5rem] flex flex-col items-center gap-4 group cursor-pointer hover:bg-blue-800/10 transition-all">
                         <Facebook size={32} className="text-blue-600 group-hover:scale-110 transition-transform" />
                         <span className="text-xs font-black text-white uppercase">Facebook</span>
                         <span className="text-[10px] text-[#e1b000] font-bold">مربوط بنجاح</span>
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
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-600 w-[85%]"></div></div>
                      <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase"><span>15%</span> <span>تواصل اجتماعي</span></div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-[#e1b000] w-[15%]"></div></div>
                   </div>
                </div>
             </div>
          </div>
        ) : (
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
