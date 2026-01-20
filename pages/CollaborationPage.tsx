
import React, { useState, useMemo, useEffect } from 'react';
import { 
  FolderOpen, CheckSquare, MessageSquare, Plus, FileText, Search, User, 
  Clock, Send, Filter, Download, Trash2, Paperclip, CheckCircle2, Calendar, 
  Share2, Users, SortAsc, SortDesc, ShieldCheck, X, Building2, Lock, ShieldAlert,
  MoreVertical, ChevronRight, Folder, FolderPlus, MessageCircle, FileUp, Info,
  Globe, Twitter, Facebook, ExternalLink, PenTool, Check, Loader2, Newspaper
} from 'lucide-react';
import { Task, SharedFile, SortOption, UserRole, User as UserType, Comment, Folder as FolderType } from '../types';
import { notificationService } from '../services/notifications';

const CollaborationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'files' | 'tasks' | 'discussions'>('files');
  const [user, setUser] = useState<UserType | null>(null);
  const [activeFolderId, setActiveFolderId] = useState('f1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<SharedFile | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  // Simulated Database
  const [folders] = useState<FolderType[]>([
    { id: 'f1', name: 'تحقيقات جارية', icon: 'FolderOpen' },
    { id: 'f2', name: 'أرشيف المؤسسة', icon: 'Archive' },
    { id: 'f3', name: 'مسودات تحريرية', icon: 'FileEdit' },
    { id: 'f4', name: 'وثائق مسربة', icon: 'ShieldAlert' },
  ]);

  const [files, setFiles] = useState<SharedFile[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('yemengpt_user');
    if (savedUser) {
      const u = JSON.parse(savedUser) as UserType;
      setUser(u);
      
      const orgId = u.organizationId || 'org1';
      setFiles([
        { 
          id: '1', name: `تقرير_الفساد_المركزي.pdf`, type: 'PDF', size: '2.4 MB', owner: 'أحمد صالح', 
          updatedAt: 'منذ ساعتين', comments: 1, timestamp: Date.now() - 7200000, 
          organizationId: orgId, folderId: 'f1',
          commentsList: [{ id: 'c1', author: 'مدير التحرير', text: 'يرجى مراجعة المصادر في الصفحة 4', timestamp: Date.now() - 3600000 }]
        },
        { 
          id: '2', name: 'قائمة_المصادر_الموثقة.xlsx', type: 'XLSX', size: '1.5 MB', owner: u.name, 
          updatedAt: 'الآن', comments: 0, timestamp: Date.now(), 
          organizationId: orgId, folderId: 'f1', commentsList: [] 
        }
      ]);
    }
  }, []);

  const filteredFiles = useMemo(() => {
    return files.filter(f => 
      f.folderId === activeFolderId &&
      (f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.owner.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [files, activeFolderId, searchQuery]);

  const handlePublish = async (platform: string) => {
    if (!selectedFile) return;
    setPublishStatus('processing');
    
    // Simulate API call to publishing bridge
    setTimeout(() => {
      setPublishStatus('success');
      notificationService.notify(`📢 <b>Document Published</b>\nPlatform: ${platform}\nFile: ${selectedFile.name}`);
      setTimeout(() => {
        setShowPublishModal(false);
        setPublishStatus('idle');
      }, 2000);
    }, 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedFile || !user) return;
    const comment: Comment = { id: Date.now().toString(), author: user.name, text: newComment, timestamp: Date.now() };
    setFiles(prev => prev.map(f => f.id === selectedFile.id ? { ...f, commentsList: [...(f.commentsList || []), comment], comments: (f.comments || 0) + 1 } : f));
    setSelectedFile(prev => prev ? ({ ...prev, commentsList: [...(prev.commentsList || []), comment] }) : null);
    setNewComment('');
  };

  return (
    <div className="space-y-6 flex flex-col h-full animate-in fade-in duration-500 pb-10" dir="rtl">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 text-right">
          <div className="w-14 h-14 bg-[#00338d]/20 rounded-2xl flex items-center justify-center border border-[#00338d]/20 shadow-inner">
             <Building2 size={28} className="text-[#e1b000]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">غرفة أخبار {user?.organizationId === 'org1' ? 'بيت الصحافة' : 'المؤسسة الشريكة'}</h1>
            <p className="text-slate-400 text-sm">مساحة عمل تعاونية مشفرة سيادياً.</p>
          </div>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800">
          <button onClick={() => setActiveTab('files')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'files' ? 'bg-[#00338d] text-white' : 'text-slate-500'}`}>الملفات</button>
          <button onClick={() => setActiveTab('tasks')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'tasks' ? 'bg-[#00338d] text-white' : 'text-slate-500'}`}>المهام</button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Folders Nav */}
        <div className="w-72 flex flex-col gap-4 hidden lg:flex">
          <div className="glass-morphism p-5 rounded-[2rem] border border-slate-800 space-y-4">
             <div className="flex justify-between items-center mb-2 px-2">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">المجلدات</h3>
                <FolderPlus size={16} className="text-blue-400 cursor-pointer" />
             </div>
             <div className="space-y-1">
                {folders.map(f => (
                   <button 
                     key={f.id} 
                     onClick={() => { setActiveFolderId(f.id); setActiveTab('files'); }}
                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeFolderId === f.id ? 'bg-[#00338d] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
                   >
                      <Folder size={18} className={activeFolderId === f.id ? 'text-[#e1b000]' : ''} />
                      {f.name}
                   </button>
                ))}
             </div>
          </div>
        </div>

        {/* Browser Area */}
        <div className="flex-1 glass-morphism rounded-[2.5rem] border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
           <div className="p-6 border-b border-slate-800 bg-slate-900/40 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative flex-1 w-full max-w-sm">
                <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="بحث في المجلد..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-2xl pr-10 pl-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 transition-all" />
              </div>
              <button className="bg-[#00338d] hover:bg-blue-600 text-white px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"><FileUp size={16} /> رفع مستند</button>
           </div>

           <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {filteredFiles.map(file => (
                   <div 
                    key={file.id} 
                    onClick={() => setSelectedFile(file)} 
                    className={`p-6 glass-morphism border rounded-[2.5rem] hover:border-[#00338d]/60 transition-all cursor-pointer group relative overflow-hidden ${selectedFile?.id === file.id ? 'border-[#00338d] bg-[#00338d]/10' : 'border-slate-800 bg-slate-950/20'}`}
                   >
                      <div className="flex justify-between items-start mb-6">
                         <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform"><FileText size={28} /></div>
                         <button className="p-2 text-slate-500 hover:text-white"><Download size={16}/></button>
                      </div>
                      <h4 className="font-bold text-slate-200 mb-1 truncate text-right">{file.name}</h4>
                      <p className="text-[10px] text-slate-500 font-black uppercase text-right">{file.size} • {file.type}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Details Panel */}
        {selectedFile && (
           <div className="w-96 glass-morphism border-r border-slate-800 flex flex-col animate-in slide-in-from-left duration-300">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
                 <button onClick={() => setSelectedFile(null)} className="text-slate-500 hover:text-white"><X size={20}/></button>
                 <h3 className="text-sm font-bold text-white uppercase tracking-tighter">Document Details</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                 <div className="text-center space-y-3">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-[2rem] mx-auto flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-inner"><FileText size={40} /></div>
                    <h4 className="font-bold text-white text-lg break-all">{selectedFile.name}</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Shared by: {selectedFile.owner}</p>
                 </div>

                 <button 
                  onClick={() => setShowPublishModal(true)}
                  className="w-full py-5 bg-[#e1b000] text-[#00338d] rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all active:scale-95"
                 >
                   <Share2 size={16}/> Publish to Global Bridge
                 </button>

                 <div className="space-y-4 pt-6 border-t border-slate-800">
                    <div className="flex justify-between items-center px-2">
                       <span className="text-[10px] font-black text-slate-600 uppercase">Editorial Conversation</span>
                       <MessageCircle size={14} className="text-[#e1b000]" />
                    </div>
                    <div className="space-y-3">
                       {selectedFile.commentsList?.map(c => (
                          <div key={c.id} className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-1">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-[8px] text-slate-500">{new Date(c.timestamp).toLocaleTimeString('ar-EG')}</span>
                                <span className="text-[10px] font-bold text-blue-400">{c.author}</span>
                             </div>
                             <p className="text-xs text-slate-300 text-right leading-relaxed">{c.text}</p>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="p-6 border-t border-slate-800 bg-slate-900/40">
                 <form onSubmit={handleAddComment} className="flex gap-2">
                    <button type="submit" className="w-12 h-12 bg-[#00338d] text-white rounded-xl flex items-center justify-center flex-shrink-0 transition-transform active:scale-95"><Send size={18} className="rotate-180"/></button>
                    <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="إضافة تعليق..." className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none text-right" />
                 </form>
              </div>
           </div>
        )}
      </div>

      {/* Publish Sequence Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
           <div className="w-full max-w-md glass-morphism border border-slate-800 rounded-[3.5rem] p-10 space-y-8 animate-in zoom-in-95">
              <div className="text-center space-y-2">
                 <h2 className="text-2xl font-black text-white">Sovereign Publish Hub</h2>
                 <p className="text-slate-400 text-xs font-medium">Select a secure node for data dissemination.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 {[
                   { name: 'WordPress', icon: Globe, color: 'bg-blue-600/10 text-blue-500 border-blue-600/20' },
                   { name: 'Twitter (X)', icon: Twitter, color: 'bg-slate-800 text-white border-white/10' },
                   { name: 'Facebook', icon: Facebook, color: 'bg-blue-800/10 text-blue-600 border-blue-800/20' },
                   { name: 'Media Hub', icon: Newspaper, color: 'bg-[#e1b000]/10 text-[#e1b000] border-[#e1b000]/20' }
                 ].map(platform => (
                   <button 
                    key={platform.name}
                    onClick={() => handlePublish(platform.name)}
                    disabled={publishStatus !== 'idle'}
                    className={`p-8 rounded-[2.5rem] border flex flex-col items-center gap-4 transition-all hover:scale-105 active:scale-95 ${platform.color}`}
                   >
                      <platform.icon size={32} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{platform.name}</span>
                   </button>
                 ))}
              </div>

              {publishStatus !== 'idle' && (
                <div className="flex flex-col items-center gap-4 py-4 animate-in slide-in-from-bottom">
                   {publishStatus === 'processing' ? (
                     <div className="flex flex-col items-center gap-4">
                        <Loader2 size={32} className="animate-spin text-[#e1b000]" />
                        <p className="text-[10px] font-black text-[#e1b000] uppercase animate-pulse">Establishing Secure Bridge...</p>
                     </div>
                   ) : (
                     <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-emerald-500/20 text-emerald-500 rounded-full border border-emerald-500/20">
                           <Check size={32} />
                        </div>
                        <p className="text-[10px] font-black text-emerald-500 uppercase">Publishing Request Authorized</p>
                     </div>
                   )}
                </div>
              )}

              <button 
                onClick={() => setShowPublishModal(false)}
                className="w-full py-4 text-slate-500 hover:text-white text-xs font-black uppercase tracking-[0.3em] transition-colors"
              >
                Abort Sequence
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationPage;
