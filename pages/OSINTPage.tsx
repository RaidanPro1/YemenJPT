
import React, { useState } from 'react';
import { 
  Search, User, Globe, Share2, Mail, Terminal, Play, Loader2, Zap, 
  Map as MapIcon, ShieldAlert, Filter, Calendar, LogIn, CheckCircle2, 
  XCircle, Clock, Database, Key, Binary, Network, ShieldCheck,
  Fingerprint, Radio, Hash, MessageSquare, Download, Scan, Cpu
} from 'lucide-react';

const OSINTPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'identity' | 'naba' | 'hasad' | 'crypto'>('identity');
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setResults([
        { platform: 'Twitter', status: 'نشط', url: `https://twitter.com/${query}`, date: '2024-05-10', score: 'High' },
        { platform: 'Telegram', status: 'نشط', url: `https://t.me/${query}`, date: '2024-05-12', score: 'Moderate' },
      ]);
      setIsSearching(false);
    }, 2500);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 text-right pb-20" dir="rtl">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight flex flex-row-reverse items-center gap-4">
           <Search size={40} className="text-[#e1b000]" /> نظام كشّاف (Kashaf) للاستخبارات الرقمية
        </h1>
        <p className="text-slate-400 text-lg font-medium mt-3">الرصد الرقمي المتقدم، تتبع الأدلة، وتحليل الشبكات عبر YemenJPT OSINT Mesh.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1 space-y-4">
           {[
             { id: 'identity', name: 'أثر (Identity)', icon: Fingerprint },
             { id: 'naba', name: 'نبأ (Scraper)', icon: Radio },
             { id: 'hasad', name: 'حصاد (Data)', icon: Database },
             { id: 'crypto', name: 'درهم (Crypto)', icon: Binary }
           ].map(tab => (
             <button 
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`w-full p-6 rounded-[2.5rem] border flex flex-col items-end gap-3 transition-all ${activeTab === tab.id ? 'bg-[#00338d] border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
             >
                <tab.icon size={24} className={activeTab === tab.id ? 'text-[#e1b000]' : 'text-slate-600'} />
                <span className="font-black text-lg">{tab.name}</span>
             </button>
           ))}
           
           <div className="p-8 bg-[#e1b000]/5 border border-[#e1b000]/20 rounded-[2.5rem] mt-10 space-y-4">
              <div className="flex items-center gap-3 justify-end text-[#e1b000]">
                 <ShieldCheck size={18}/>
                 <span className="text-[10px] font-black uppercase tracking-widest">Kashaf Secure Link</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed text-right">يتم تصفير مسارات البحث عبر بروكسيات RaidanPro السيادية لضمان عدم تتبع المحققين.</p>
           </div>
        </div>

        <div className="lg:col-span-3 space-y-10">
          <div className="glass-morphism p-12 rounded-[3.5rem] border border-slate-800 shadow-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00338d]/5 blur-[100px]"></div>
            <h3 className="text-2xl font-black text-white mb-8">استعلام كشّاف المتقدم</h3>
            <div className="flex flex-col sm:flex-row-reverse gap-5">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="أدخل المعرف، الرابط، أو الكلمات البحثية للرصد..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-3xl px-8 py-6 text-white text-lg focus:outline-none focus:ring-2 focus:ring-[#00338d] text-right font-medium shadow-inner"
              />
              <button onClick={handleSearch} disabled={isSearching} className="bg-[#00338d] hover:bg-blue-600 text-white px-12 py-6 rounded-3xl font-black flex flex-row-reverse items-center justify-center gap-4 transition-all shadow-3xl active:scale-95">
                {isSearching ? <Loader2 size={28} className="animate-spin" /> : <Zap size={28} className="rotate-180" />}
                بدء الكشف
              </button>
            </div>
          </div>

          {results.length > 0 && (
            <div className="space-y-6 animate-in slide-in-from-bottom">
               <h3 className="text-xl font-black text-white px-4">نتائج رصد أثر (Athar Results)</h3>
               <div className="grid grid-cols-1 gap-6">
                  {results.map((res, i) => (
                    <div key={i} className="glass-morphism p-8 rounded-[2.5rem] border border-slate-800 flex flex-row-reverse justify-between items-center hover:border-blue-500/50 transition-all shadow-xl group">
                       <div className="flex flex-row-reverse items-center gap-8">
                          <div className="p-5 bg-slate-900 rounded-[1.8rem] text-[#e1b000] group-hover:bg-[#00338d] group-hover:text-white transition-all">
                             <Network size={28}/>
                          </div>
                          <div className="text-right">
                             <h4 className="text-2xl font-black text-white">{res.platform}</h4>
                             <p className="text-slate-500 font-bold text-sm mt-1">{res.url}</p>
                          </div>
                       </div>
                       <div className="flex flex-col items-end gap-3">
                          <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-xl text-[10px] font-black uppercase tracking-widest">{res.status}</span>
                          <span className="text-[10px] text-slate-600 font-bold">آخر ظهور: {res.date}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {!isSearching && results.length === 0 && (
             <div className="py-20 text-center space-y-6">
                <Terminal size={64} className="mx-auto text-slate-800 opacity-20" />
                <p className="text-slate-600 font-black uppercase tracking-widest text-xs">نظام كشّاف جاهز للاستعلام السيادي</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OSINTPage;
