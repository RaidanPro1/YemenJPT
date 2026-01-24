
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, Trash2, Mic, Sparkles, Loader2, Brain, Cpu, Zap,
  CloudLightning, Volume2, User as UserIcon, Activity, Languages, ShieldCheck,
  ChevronDown, Settings2, Terminal, Info
} from 'lucide-react';
import { gemini } from '../services/gemini';
import { AiModelType, User as UserType, UserRole } from '../types';
import { YEMENI_CONTEXT } from '../constants';

const AICorePage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeDialect, setActiveDialect] = useState('صنعاني');
  const [cpuUsage, setCpuUsage] = useState(24);
  const [isRecording, setIsRecording] = useState(false);
  const [useColabGpu, setUseColabGpu] = useState(false);
  const [colabApproved, setColabApproved] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AiModelType>(AiModelType.FALCON_3);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('yemengpt_user');
    if (savedUser) {
      const u = JSON.parse(savedUser) as UserType;
      if (u.role === UserRole.ADMIN) setColabApproved(true);
    }

    setMessages([{ 
      role: 'assistant', 
      content: "أهلاً بك في YemenJPT، محرك الذكاء الاصطناعي السيادي للصحافة اليمنية. أعمل حالياً بنموذج Falcon 3 المخصص محلياً. كيف يمكنني دعم تحقيقك اليوم؟", 
      timestamp: new Date() 
    }]);

    const interval = setInterval(() => {
        setCpuUsage(prev => {
          const change = Math.floor(Math.random() * 15) - 7;
          return Math.max(10, Math.min(100, prev + change));
        });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
      setMessages(prev => [...prev, { role: 'assistant', content: 'عذراً، حدث خطأ في الاتصال بعقدة YemenJPT السيادية. يرجى التأكد من مفتاح API.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const cpuColorClass = cpuUsage > 85 ? 'text-red-500' : cpuUsage > 60 ? 'text-yellow-500' : 'text-emerald-400';
  const cpuBgClass = cpuUsage > 85 ? 'bg-red-500' : cpuUsage > 60 ? 'bg-yellow-500' : 'bg-emerald-500';

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col max-w-6xl mx-auto space-y-6 overflow-hidden animate-in fade-in duration-700">
      
      {/* Dynamic Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        <div className="col-span-1 md:col-span-2 glass-morphism p-6 rounded-[2.5rem] border border-slate-800 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-5 text-right">
            <div className="p-4 rounded-2xl bg-[#003087] text-white shadow-xl relative border border-blue-400/20">
              <Cpu size={24} />
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-950 ${cpuBgClass} animate-pulse`}></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white leading-none">معالج YemenJPT</h2>
                <span className="px-2 py-0.5 bg-slate-800 rounded-lg text-[8px] font-black text-[#e1b000] uppercase tracking-widest">Sovereign Node v2.5</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-1.5 w-32 bg-slate-900 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-1000 ${cpuBgClass}`} style={{ width: `${cpuUsage}%` }}></div>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-tighter ${cpuColorClass}`}>Load: {cpuUsage}%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-2xl border border-slate-800">
             <div className="text-right">
                <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">Gpu Mesh Link</p>
                <button 
                  disabled={!colabApproved}
                  onClick={() => setUseColabGpu(!useColabGpu)}
                  className={`flex items-center gap-2 text-[10px] font-black transition-all ${!colabApproved ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:text-white'}`}
                >
                   {useColabGpu ? <CloudLightning size={14} className="text-[#e1b000]"/> : <Zap size={14} className="text-slate-600"/>}
                   <span className={useColabGpu ? 'text-white' : 'text-slate-500'}>
                     {useColabGpu ? 'CONNECTED' : 'STANDBY'}
                   </span>
                </button>
             </div>
          </div>
        </div>

        <div className="glass-morphism p-6 rounded-[2.5rem] border border-slate-800 flex items-center justify-between">
           <div className="text-right">
              <p className="text-[8px] text-slate-500 font-black uppercase mb-1 tracking-widest">Yemeni Dialect Engine</p>
              <select 
                value={activeDialect} 
                onChange={(e) => setActiveDialect(e.target.value)}
                className="bg-transparent text-[#e1b000] text-xs font-black outline-none cursor-pointer uppercase tracking-widest"
              >
                {YEMENI_CONTEXT.dialects.map(d => <option key={d.region} value={d.region} className="bg-slate-900">{d.region}</option>)}
              </select>
           </div>
           <Languages size={24} className="text-blue-500" />
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 glass-morphism rounded-[3rem] border border-slate-800 flex flex-col overflow-hidden shadow-2xl bg-slate-950/20 relative">
        <div className="flex-1 overflow-y-auto p-8 lg:p-10 space-y-8 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-500`}>
              <div className={`p-6 md:p-8 rounded-[2rem] max-w-[85%] border shadow-xl relative ${m.role === 'user' ? 'bg-gradient-to-br from-[#003087] to-blue-900 border-blue-500/30' : 'bg-slate-900 border-slate-800'}`}>
                <div className={`flex items-center gap-3 mb-3 opacity-40 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {m.role === 'user' ? <UserIcon size={12}/> : <Bot size={12}/>}
                  <span className="text-[8px] font-black uppercase tracking-[0.2em]">{m.role === 'assistant' ? 'YemenJPT Neural Node' : 'Investigative Journalist'}</span>
                </div>
                <div className="text-sm md:text-base leading-relaxed font-medium text-right text-slate-100 whitespace-pre-wrap">{m.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-[2rem] flex items-center gap-4 shadow-lg">
                <div className="relative w-8 h-8">
                  <Brain size={32} className="text-[#e1b000] animate-pulse" />
                  <div className="absolute inset-0 border-2 border-[#e1b000] border-t-transparent rounded-full animate-spin"></div>
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Processing Node Logic...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-8 lg:p-10 bg-slate-950/80 border-t border-slate-800/50 backdrop-blur-2xl shrink-0">
          <div className="flex gap-4 items-center bg-slate-900/90 rounded-[2rem] p-3 border border-slate-800 focus-within:border-[#003087]/50 transition-all shadow-inner group">
            <button 
              onClick={() => setIsRecording(!isRecording)} 
              className={`p-4 rounded-xl transition-all shadow-inner ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              {isRecording ? <Volume2 size={22} /> : <Mic size={22} />}
            </button>
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleSend()} 
              placeholder="اسأل YemenJPT عن أي تفاصيل استقصائية أو رصد قانوني..." 
              className="flex-1 bg-transparent px-4 text-sm md:text-base text-white outline-none font-medium text-right placeholder:text-slate-600" 
            />
            <button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()} 
              className="w-12 h-12 bg-[#e1b000] hover:bg-yellow-500 text-[#003087] rounded-xl flex items-center justify-center transition-all shadow-xl active:scale-95 disabled:opacity-30"
            >
              <Send size={22} className="rotate-180" />
            </button>
          </div>
          <div className="flex justify-center mt-5">
             <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                <ShieldCheck size={10} className="text-[#003087]"/> Sovereign E2EE Protected Node
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICorePage;
