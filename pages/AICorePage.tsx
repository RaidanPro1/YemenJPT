
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, Trash2, Paperclip, Mic, Sparkles, AlertCircle, Loader2, Brain, Search, 
  ImageIcon, Video, X, Globe, ShieldCheck, Settings2, Cpu, ShieldAlert, Info, 
  Terminal, Server, HardDrive, Database, Boxes, ChevronRight, CheckCircle2, 
  User as UserIcon, Link as LinkIcon, ChevronUp, Activity, Languages, Zap,
  CloudLightning, Lock, Check, LayoutPanelLeft, ChevronDown, Download, Plus, HardDriveDownload,
  MicOff, Volume2, Settings
} from 'lucide-react';
import { gemini } from '../services/gemini';
import { AiModelType, User as UserType, UserRole, AiProviderType } from '../types';
import { TRANSLATIONS, YEMENI_CONTEXT } from '../constants';

const AICorePage: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeDialect, setActiveDialect] = useState('صنعاني');
  const [sttMode, setSttMode] = useState<'standard' | 'yemeni'>('yemeni');
  const [cpuUsage, setCpuUsage] = useState(24);
  const [isRecording, setIsRecording] = useState(false);
  const [useColabGpu, setUseColabGpu] = useState(false);
  const [colabApproved, setColabApproved] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AiModelType>(AiModelType.FALCON_3);
  
  const lang = localStorage.getItem('yemengpt_lang') || 'ar';
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('yemengpt_user');
    if (savedUser) {
      const u = JSON.parse(savedUser);
      setUser(u);
      if (u.role === UserRole.ADMIN) setColabApproved(true);
    }

    setMessages([{ 
      role: 'assistant', 
      content: lang === 'ar' 
        ? "أهلاً بك في YemenJPT، محرك الذكاء الاصطناعي السيادي للصحافة اليمنية. أعمل حالياً بنموذج Falcon 3 المخصص محلياً. كيف يمكنني دعم تحقيقك اليوم؟" 
        : "Welcome to YemenJPT, the sovereign AI engine for Yemeni journalism. I am currently running Ollama Falcon 3 (CPU). How can I support your investigation today?", 
      timestamp: new Date() 
    }]);

    const interval = setInterval(() => {
        setCpuUsage(prev => {
          const change = Math.floor(Math.random() * 15) - 7;
          return Math.max(10, Math.min(100, prev + change));
        });
    }, 2500);
    return () => clearInterval(interval);
  }, [lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    const currentInput = input;
    setInput('');

    try {
      const res = await gemini.chat(currentInput, messages, { 
        useThinking: true,
        dialect: activeDialect,
        specificModel: selectedModel,
        useColabGpu: useColabGpu && colabApproved
      });
      setMessages(prev => [...prev, { role: 'assistant', content: res.text, timestamp: new Date() }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'عذراً، حدث خطأ في الاتصال بعقدة YemenJPT السيادية.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const cpuColorClass = cpuUsage > 90 ? 'text-red-500' : cpuUsage > 70 ? 'text-yellow-500' : 'text-emerald-500';
  const cpuBgClass = cpuUsage > 90 ? 'bg-red-500' : cpuUsage > 70 ? 'bg-yellow-500' : 'bg-emerald-500';

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col max-w-7xl mx-auto space-y-6 overflow-hidden font-ar" dir="rtl">
      {/* Sovereign Processor Header */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in">
        <div className="lg:col-span-3 glass-morphism p-8 rounded-[3rem] border border-slate-800 flex flex-col md:flex-row justify-between items-center shadow-xl relative overflow-hidden gap-6">
          <div className="flex items-center gap-6 text-right w-full">
            <div className="p-6 rounded-[2rem] bg-[#00338d] text-white shadow-2xl border border-blue-500/20 relative group">
              <Cpu size={32} className="group-hover:rotate-12 transition-transform"/>
              <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${cpuBgClass} animate-pulse`}></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-white leading-tight">معالج YemenJPT السيادي</h2>
                <span className="px-3 py-0.5 bg-slate-800 rounded-full text-[9px] font-black text-[#e1b000] uppercase tracking-widest">Falcon 3 (Ollama)</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                   <Activity size={14} className={cpuColorClass} />
                   <span className={`text-[11px] font-black uppercase tracking-widest ${cpuColorClass}`}>الحمل: {cpuUsage}%</span>
                </div>
                <div className="h-1.5 w-24 bg-slate-900 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-1000 ${cpuBgClass}`} style={{ width: `${cpuUsage}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-3xl border border-slate-800 shrink-0">
             <div className="text-right">
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">تسريع الرسوم (GPU)</p>
                <button 
                  disabled={!colabApproved}
                  onClick={() => setUseColabGpu(!useColabGpu)}
                  className={`flex items-center gap-2 text-xs font-bold transition-all ${!colabApproved ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:text-white'}`}
                >
                   {useColabGpu ? <CloudLightning size={16} className="text-[#e1b000]"/> : <Zap size={16} className="text-slate-600"/>}
                   <span className={useColabGpu ? 'text-white' : 'text-slate-500'}>
                     {colabApproved ? (useColabGpu ? 'Colab Mesh: ON' : 'Colab Mesh: OFF') : 'يطلب موافق ROOT'}
                   </span>
                </button>
             </div>
          </div>
        </div>

        {/* STT / Dialect Control */}
        <div className="glass-morphism p-6 rounded-[3rem] border border-slate-800 flex flex-col justify-center space-y-4">
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase">نظام مُنصت (STT)</span>
              <Mic size={16} className="text-[#e1b000]" />
           </div>
           <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
              <button 
                onClick={() => setSttMode('yemeni')} 
                className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${sttMode === 'yemeni' ? 'bg-[#00338d] text-white shadow-lg' : 'text-slate-500'}`}
              >
                يمني (Whisper)
              </button>
              <button 
                onClick={() => setSttMode('standard')} 
                className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${sttMode === 'standard' ? 'bg-[#00338d] text-white shadow-lg' : 'text-slate-500'}`}
              >
                فصحى
              </button>
           </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        <div className="flex-1 glass-morphism rounded-[3.5rem] border border-slate-800 flex flex-col overflow-hidden shadow-2xl bg-slate-950/20">
          <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in`}>
                <div className={`p-8 rounded-[2.8rem] max-w-[85%] border shadow-2xl relative ${m.role === 'user' ? 'bg-gradient-to-br from-[#00338d] to-blue-800 border-blue-500/40' : 'bg-slate-900 border-slate-800'}`}>
                  <div className={`flex items-center gap-3 mb-4 opacity-40 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {m.role === 'user' ? <UserIcon size={14}/> : <Bot size={14}/>}
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{m.role === 'assistant' ? 'YemenJPT Node (Falcon 3)' : 'الصحفي المحقق'}</span>
                  </div>
                  <div className="text-sm md:text-base leading-relaxed font-medium text-right text-slate-100 whitespace-pre-wrap">{m.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in">
                <div className="p-8 bg-slate-900 border border-slate-800 rounded-[3rem] flex items-center gap-4">
                  <div className="relative w-10 h-10">
                    <Brain size={40} className="text-[#e1b000] animate-pulse" />
                    <div className="absolute inset-0 border-2 border-[#e1b000] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">المعالج يفكر محلياً...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-10 bg-slate-950/80 border-t border-slate-800/50 backdrop-blur-2xl">
            <div className="flex gap-5 items-center bg-slate-900/90 rounded-[3rem] p-4 border border-slate-800 focus-within:border-[#00338d]/50 transition-all shadow-inner">
              <button 
                onClick={() => setIsRecording(!isRecording)} 
                title={sttMode === 'yemeni' ? "نظام مُنصت: لهجة يمنية" : "نظام مُنصت: لغة فصحى"}
                className={`p-5 rounded-2xl transition-all shadow-inner ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                {isRecording ? <Volume2 size={26} /> : <Mic size={26} />}
              </button>
              <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSend()} 
                placeholder="اسأل YemenJPT عن أي تفاصيل استقصائية..." 
                className="flex-1 bg-transparent px-6 text-lg text-white outline-none font-medium text-right" 
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading} 
                className="w-16 h-16 bg-[#e1b000] hover:bg-yellow-500 text-[#00338d] rounded-2xl flex items-center justify-center transition-all shadow-2xl active:scale-95 disabled:opacity-50"
              >
                <Send size={28} className="rotate-180" />
              </button>
            </div>
            <div className="flex justify-center gap-8 mt-6">
               <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <ShieldCheck size={12}/> RaidanPro Sovereign Grid
               </p>
               <div className="flex items-center gap-3">
                 <span className="text-[9px] text-slate-500 font-bold uppercase">سياق اللهجة:</span>
                 <select 
                    value={activeDialect} 
                    onChange={(e) => setActiveDialect(e.target.value)}
                    className="bg-transparent text-[#e1b000] text-[10px] font-black outline-none cursor-pointer uppercase tracking-widest"
                  >
                    {YEMENI_CONTEXT.dialects.map(d => <option key={d.region} value={d.region} className="bg-slate-900">{d.region}</option>)}
                  </select>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICorePage;
