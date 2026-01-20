
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Send, Bot, User, Trash2, Paperclip, Mic, Sparkles, AlertCircle, 
  Loader2, ChevronDown, Volume2, Ear, Copy, RotateCcw, Zap, Brain, Search, 
  MapPin, ImageIcon, Video, X, Play, FileVideo, Download, Globe, ShieldCheck, 
  Settings2, Cpu, ShieldAlert, Save, RefreshCw, Info, Cloud, Lock, PenTool,
  CheckCircle, MessageSquare, Activity, Terminal, Code2, Link as LinkIcon,
  ChevronUp, Server, HardDrive, Layout, Key, Eye, Image as LucideImage, Camera
} from 'lucide-react';
import { gemini } from '../services/gemini';
import { Message, UserRole, AiModelType, User as UserType } from '../types';
import { TRANSLATIONS } from '../constants';

const AICorePage: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeAssistantMode, setIsCodeAssistantMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AiModelType>(AiModelType.GEMINI_PRO);
  const [codeModel, setCodeModel] = useState('gemini-3-pro-preview');
  const [isE2EEEnabled, setIsE2EEEnabled] = useState(true);
  const [showGrounding, setShowGrounding] = useState<Record<number, boolean>>({});
  const [isThinking, setIsThinking] = useState(true);
  const [attachments, setAttachments] = useState<{data: string, mimeType: string, name: string}[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  // Fixed: Added missing state for API docs visibility
  const [showApiDocs, setShowApiDocs] = useState(false);

  const [ollamaModels, setOllamaModels] = useState([
    { name: 'falcon:7b', size: '4.5GB', status: 'installed', ram: '8GB', vram: '4GB' },
    { name: 'llama3:8b', size: '5.2GB', status: 'available', ram: '12GB', vram: '6GB' },
    { name: 'qwen2.5:7b', size: '4.8GB', status: 'installed', ram: '8GB', vram: '4GB' }
  ]);

  const lang = localStorage.getItem('yemengpt_lang') || 'ar';
  const t = (key: string) => (TRANSLATIONS as any)[lang][key] || key;
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('yemengpt_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    setMessages([{ 
      role: 'assistant', 
      content: lang === 'ar' ? "أهلاً بك في المعالج السيادي. أنا جاهز لتحليل النصوص، الصور، الفيديوهات، أو مساعدتك في البرمجة. كيف يمكنني خدمتك؟" : "Welcome to the Sovereign Processor. I'm ready to analyze text, images, videos, or help with coding. How can I assist you?", 
      timestamp: new Date() 
    }]);
  }, [lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Fixed: Added missing toggleGrounding helper function
  const toggleGrounding = (index: number) => {
    setShowGrounding(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        setAttachments(prev => [...prev, {
          data: base64,
          mimeType: file.type,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      // Mocking transcription activation for demo
      setTimeout(() => {
        setIsRecording(false);
        stream.getTracks().forEach(t => t.stop());
      }, 3000);
    } catch (e) {
      alert("Microphone permission denied.");
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || isLoading) return;
    
    const userMsg = { 
      role: 'user', 
      content: input, 
      timestamp: new Date(),
      attachments: attachments.map(a => ({ name: a.name, mimeType: a.mimeType }))
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    const currentInput = input;
    const currentAttachments = [...attachments];
    setInput('');
    setAttachments([]);

    try {
      const res = await gemini.chat(currentInput, messages, { 
        useThinking: isThinking,
        isCodeAssistant: isCodeAssistantMode,
        useSearch: true,
        useMaps: currentInput.toLowerCase().includes('خريطة') || currentInput.toLowerCase().includes('map'),
        specificModel: isCodeAssistantMode ? codeModel : undefined
      }, currentAttachments);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: res.text, 
        timestamp: new Date(),
        groundingMetadata: res.groundingMetadata 
      }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'خطأ في المعالجة. يرجى التأكد من مفتاح API.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const pullModel = (name: string) => {
    setOllamaModels(prev => prev.map(m => m.name === name ? { ...m, status: 'pulling...' } : m));
    setTimeout(() => {
      setOllamaModels(prev => prev.map(m => m.name === name ? { ...m, status: 'installed' } : m));
    }, 3000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col max-w-7xl mx-auto space-y-6 overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Settings & Model Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 animate-in fade-in">
        <div className="lg:col-span-3 glass-morphism p-6 rounded-[2.5rem] border border-slate-800 flex justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-start">
            <div className={`p-4 rounded-2xl ${isCodeAssistantMode ? 'bg-[#e1b000] text-black' : 'bg-[#00338d] text-white'}`}>
              {isCodeAssistantMode ? <Terminal size={24}/> : <Bot size={24}/>}
            </div>
            <div>
              <h2 className="text-xl font-black text-white">{isCodeAssistantMode ? 'مساعد البرمجة السيادي' : 'المعالج السيادي'}</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                  {isCodeAssistantMode ? codeModel : 'Gemini 3 Pro Cluster'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isCodeAssistantMode && (
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-slate-500 uppercase px-1">Active Model</span>
                <select 
                  value={codeModel} 
                  onChange={(e) => setCodeModel(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-[10px] font-black text-white outline-none cursor-pointer"
                >
                  <option value="gemini-3-pro-preview">Gemini 3 Pro</option>
                  <option value="gemini-3-flash-preview">Gemini 3 Flash</option>
                  <option value="gemini-flash-lite-latest">Flash Lite</option>
                </select>
              </div>
            )}
            <button 
              onClick={() => setIsCodeAssistantMode(!isCodeAssistantMode)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all border ${isCodeAssistantMode ? 'bg-[#e1b000] text-black border-transparent' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}`}
            >
              {isCodeAssistantMode ? 'Standard Mode' : 'Code Mode'}
            </button>
            <button 
              onClick={() => setIsThinking(!isThinking)}
              className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-all border ${isThinking ? 'bg-purple-600/20 text-purple-400 border-purple-500/50' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
              title="Complex Reasoning Mode"
            >
              <Brain size={16}/>
            </button>
          </div>
        </div>

        <div className="glass-morphism p-6 rounded-[2.5rem] border border-slate-800 flex flex-col justify-center text-start">
          <button onClick={() => setIsE2EEEnabled(!isE2EEEnabled)} className="flex justify-between items-center group w-full mb-1">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Sovereignty Vault</span>
            {isE2EEEnabled ? <ShieldCheck size={14} className="text-emerald-500" /> : <ShieldAlert size={14} className="text-red-500" />}
          </button>
          <p className="text-lg font-black text-white">{isE2EEEnabled ? 'E2EE ACTIVE' : 'LOCKED'}</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Chat Canvas */}
        <div className="flex-1 glass-morphism rounded-[3rem] border border-slate-800 flex flex-col overflow-hidden shadow-2xl relative">
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in`}>
                <div className={`p-6 rounded-[2.5rem] max-w-[85%] border shadow-xl ${m.role === 'user' ? 'bg-[#00338d] border-blue-500' : 'bg-slate-900 border-slate-800'}`}>
                  <div className="flex items-center gap-2 mb-3 opacity-40">
                    {m.role === 'user' ? <User size={12}/> : <Bot size={12}/>}
                    <span className="text-[9px] font-black uppercase tracking-widest">{m.role}</span>
                  </div>
                  
                  {m.attachments?.map((a: any, ai: number) => (
                    <div key={ai} className="mb-4 p-3 bg-black/30 rounded-2xl border border-white/5 flex items-center gap-3">
                      {a.mimeType.startsWith('image') ? <ImageIcon size={16}/> : a.mimeType.startsWith('video') ? <Video size={16}/> : <FileVideo size={16}/>}
                      <span className="text-[10px] font-bold text-slate-300 truncate max-w-[200px]">{a.name}</span>
                    </div>
                  ))}

                  <div className={`text-sm leading-relaxed font-medium whitespace-pre-wrap text-start ${m.role === 'assistant' && isCodeAssistantMode ? 'font-mono' : ''}`}>
                    {m.content}
                  </div>

                  {m.groundingMetadata?.groundingChunks && (
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <button onClick={() => toggleGrounding(i)} className="flex items-center gap-2 text-[10px] font-black text-[#e1b000] uppercase tracking-widest hover:opacity-80 transition-all">
                        <Search size={12} /> {t('sources')} ({m.groundingMetadata.groundingChunks.length})
                        {showGrounding[i] ? <ChevronUp size={12}/> : <ChevronDown size={12}/>}
                      </button>
                      {showGrounding[i] && (
                        <div className="mt-4 space-y-2 animate-in slide-in-from-top-2">
                          {m.groundingMetadata.groundingChunks.map((chunk: any, cIdx: number) => (
                            <a key={cIdx} href={chunk.web?.uri} target="_blank" rel="noreferrer" className="block p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-[#e1b000]/40 transition-all group">
                               <div className="flex justify-between items-center">
                                  <div className="flex flex-col">
                                    <p className="text-[11px] text-white font-bold group-hover:text-[#e1b000] truncate max-w-[90%]">{chunk.web?.title || chunk.web?.uri}</p>
                                    <span className="text-[9px] text-slate-500 truncate">{chunk.web?.uri}</span>
                                  </div>
                                  <LinkIcon size={12} className="text-slate-500" />
                               </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 animate-pulse">
                <div className="w-12 h-12 bg-slate-800 rounded-full"></div>
                <div className="h-14 w-64 bg-slate-800 rounded-2xl"></div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Interactive Interface */}
          <div className="p-8 bg-slate-950/60 border-t border-slate-800/50">
            {attachments.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {attachments.map((a, ai) => (
                  <div key={ai} className="px-3 py-1.5 bg-[#00338d]/20 border border-[#00338d]/40 rounded-xl flex items-center gap-2 animate-in zoom-in">
                    <span className="text-[9px] font-black text-blue-300 truncate max-w-[100px]">{a.name}</span>
                    <button onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== ai))} className="text-blue-300 hover:text-white"><X size={10}/></button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-4 items-center bg-slate-900 rounded-[2.5rem] p-3 border border-slate-800 focus-within:border-[#00338d] transition-all">
              <div className="flex gap-1">
                <label className="p-4 bg-slate-800 text-slate-400 rounded-2xl hover:text-white transition-all cursor-pointer">
                  <input type="file" multiple onChange={handleFileUpload} className="hidden" />
                  <Paperclip size={24} />
                </label>
                <button 
                  onClick={startRecording}
                  className={`p-4 rounded-2xl transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                  <Mic size={24} />
                </button>
              </div>
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isCodeAssistantMode ? "Ask for code review, documentation, or architecture..." : "Ask for analysis, news summaries, maps or fact checking..."} 
                className="flex-1 bg-transparent px-4 text-white outline-none font-medium" 
              />
              <button onClick={handleSend} disabled={isLoading} className="w-14 h-14 bg-[#00338d] hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-95">
                <Send size={24} className={lang === 'ar' ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>
        </div>

        {/* System & Model Management Sidepanel */}
        <div className="w-80 flex flex-col gap-6 hidden xl:flex overflow-y-auto custom-scrollbar">
          
          {/* Ollama Section */}
          <div className="glass-morphism p-8 rounded-[3rem] border border-slate-800 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Server size={16} className="text-[#e1b000]" /> Local Nodes
              </h3>
              <button className="text-slate-500 hover:text-white transition-colors"><RefreshCw size={14}/></button>
            </div>
            <div className="space-y-4">
              {ollamaModels.map(m => (
                <div key={m.name} className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 space-y-2 group">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-white">{m.name}</span>
                    <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase ${m.status === 'installed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>{m.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[8px] font-black text-slate-500 uppercase">
                    <span className="flex items-center gap-1"><HardDrive size={10}/> {m.size}</span>
                    <span className="flex items-center gap-1"><Cpu size={10}/> RAM: {m.ram}</span>
                  </div>
                  {m.status === 'available' && (
                    <button onClick={() => pullModel(m.name)} className="w-full py-2 bg-[#00338d] hover:bg-blue-600 text-[9px] font-black rounded-lg transition-all text-white mt-2">Pull Node</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dev Docs (Visible in Code Mode) */}
          {isCodeAssistantMode && (
            <div className="glass-morphism p-8 rounded-[3rem] border border-[#e1b000]/20 bg-[#e1b000]/5 space-y-6 animate-in slide-in-from-right">
              <h3 className="text-sm font-black text-[#e1b000] uppercase tracking-widest flex items-center gap-2">
                <Terminal size={16} /> Technical Library
              </h3>
              <div className="space-y-3">
                <a 
                  href="https://ai.google.dev/gemini-api/docs" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-black/60 transition-all"
                >
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Gemini API Ref</span>
                  <LinkIcon size={14} className="text-slate-500 group-hover:text-[#e1b000]" />
                </a>
                {/* Fixed: Added missing setShowApiDocs and showApiDocs state handling */}
                <button onClick={() => setShowApiDocs(!showApiDocs)} className="w-full p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-black/60 transition-all">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">System Architecture</span>
                  <Info size={14} className="text-slate-500" />
                </button>
                {showApiDocs && (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-[#e1b000]/30 text-[9px] font-mono text-slate-400 leading-relaxed max-h-40 overflow-y-auto custom-scrollbar">
                    <p className="text-[#e1b000] mb-2">// Newsroom OS Config</p>
                    <p>ENGINE: Gemini 3 Pro Cluster</p>
                    <p>INFRA: Sovereign Docker Hub</p>
                    <p>E2EE: AES-256 Validated</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* E2EE / Security Settings */}
          <div className="glass-morphism p-8 rounded-[3rem] border border-slate-800 space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Privacy & E2EE</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer p-3 bg-slate-950/50 rounded-xl border border-white/5 group">
                <div className="flex items-center gap-2">
                  <Lock size={12} className="text-slate-500"/>
                  <span className="text-[10px] font-bold text-slate-400">History Encryption</span>
                </div>
                <input type="checkbox" checked={isE2EEEnabled} onChange={() => setIsE2EEEnabled(!isE2EEEnabled)} className="w-4 h-4 rounded bg-slate-800 text-[#00338d] border-none focus:ring-0" />
              </label>
              <label className="flex items-center justify-between cursor-pointer p-3 bg-slate-950/50 rounded-xl border border-white/5 group">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={12} className="text-slate-500"/>
                  <span className="text-[10px] font-bold text-slate-400">Default for Sensitive</span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-slate-800 text-[#00338d] border-none focus:ring-0" />
              </label>
            </div>
            <p className="text-[9px] text-slate-600 leading-tight">Encryption keys are managed via the Institutional Root Admin console.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICorePage;
