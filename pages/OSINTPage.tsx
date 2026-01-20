
import React, { useState, useEffect } from 'react';
import { 
  Search, User, Globe, Share2, Mail, Terminal, Play, Loader2, Zap, 
  Map as MapIcon, ShieldAlert, Filter, Calendar, LogIn, CheckCircle2, 
  XCircle, Clock, Database, Key, Binary, Network, ShieldCheck
} from 'lucide-react';
import { UserRole } from '../types';

const OSINTPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'identity' | 'technical' | 'leaks' | 'crypto'>('identity');
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setResults([
        { platform: 'Twitter', status: 'موجود', url: `https://twitter.com/${query}`, date: '2024-05-10' },
        { platform: 'Telegram', status: 'نشط', url: `https://t.me/${query}`, date: '2024-05-12' },
        { platform: 'Whois/DNS', status: 'محمي', url: null, date: '2024-05-15' },
      ]);
      setIsSearching(false);
    }, 2000);
  };

  const tabs = [
    { id: 'identity', label: 'بحث الهوية الرقمية', sub: 'تتبع المعرفات والحسابات', icon: User },
    { id: 'technical', label: 'الاستخبارات التقنية', sub: 'WHOIS / DNS / IP Analysis', icon: Network },
    { id: 'leaks', label: 'قواعد بيانات التسريبات', sub: 'فحص البيانات المسربة والمعلنة', icon: Database },
    { id: 'crypto', label: 'تتبع العملات المشفرة', sub: 'Blockchain Tracker', icon: Binary },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-right pb-20" dir="rtl">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex flex-row-reverse items-center gap-3">
           <Search size={32} className="text-[#e1b000]" />
           الاستخبارات الرقمية والمصادر المفتوحة
        </h1>
        <p className="text-slate-400 font-medium mt-1">تتبع الأدلة الرقمية، تحليل الشبكات، والبحث العميق في المصادر العامة.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex flex-row-reverse items-center gap-4 p-5 rounded-2xl border transition-all relative ${activeTab === tab.id ? 'bg-[#00338d]/20 border-[#00338d] text-blue-400 shadow-xl' : 'glass-morphism border-transparent text-slate-500 hover:text-slate-300'}`}
            >
              <div className="p-3 bg-slate-900 rounded-xl">
                <tab.icon size={24} className="flex-shrink-0" />
              </div>
              <div className="text-right flex-1">
                <p className="font-bold text-md">{tab.label}</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{tab.sub}</p>
              </div>
            </button>
          ))}
          <div className="p-6 bg-[#e1b000]/5 border border-[#e1b000]/20 rounded-[2rem] space-y-3">
             <div className="flex items-center gap-2 justify-end text-[#e1b000]">
                <ShieldCheck size={16}/>
                <span className="text-[10px] font-black uppercase tracking-widest">Sovereign Search</span>
             </div>
             <p className="text-[10px] text-slate-400 leading-relaxed">جميع عمليات البحث مشفرة وتتم عبر بروكسيات سيادية لضمان عدم تعقب الصحفي.</p>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <div className="glass-morphism p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="flex flex-row-reverse items-center gap-2 mb-6 text-white font-black uppercase tracking-tighter">
               <Zap size={20} className="text-blue-500" />
               Advanced {activeTab.toUpperCase()} Query
            </div>
            <div className="flex flex-col sm:flex-row-reverse gap-4">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={activeTab === 'technical' ? 'أدخل النطاق أو عنوان IP...' : 'أدخل المعرف أو الكلمات البحثية...'}
                className="flex-1 bg-slate-900/60 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#00338d] transition-all text-right font-medium"
              />
              <button onClick={handleSearch} disabled={isSearching} className="bg-[#00338d] hover:bg-blue-600 text-white px-10 py-4 rounded-2xl font-black flex flex-row-reverse items-center justify-center gap-3 transition-all shadow-xl">
                {isSearching ? <Loader2 size={24} className="animate-spin" /> : <Play size={24} className="rotate-180" />}
                بدء الاستعلام
              </button>
            </div>
            {activeTab === 'leaks' && (
              <div className="mt-4 flex flex-row-reverse gap-4">
                 <label className="flex items-center gap-2 text-[10px] text-slate-500 font-bold cursor-pointer">
                    <input type="checkbox" className="rounded bg-slate-800" /> البحث في خروقات 2024
                 </label>
                 <label className="flex items-center gap-2 text-[10px] text-slate-500 font-bold cursor-pointer">
                    <input type="checkbox" className="rounded bg-slate-800" /> البحث في Dark Web
                 </label>
              </div>
            )}
          </div>

          {results.length > 0 && !isSearching && (
            <div className="glass-morphism rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl">
              <div className="p-8 overflow-x-auto">
                <table className="w-full text-right min-w-[600px]">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-800 text-[10px] font-black uppercase tracking-widest">
                      <th className="pb-6 px-4">المصدر / المصدر التقني</th>
                      <th className="pb-6 px-4">الحالة الرقمية</th>
                      <th className="pb-6 px-4">توقيت الرصد</th>
                      <th className="pb-6 px-4 text-left">التوجيه المرجعي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {results.map((res, idx) => (
                      <tr key={idx} className="group hover:bg-slate-800/20 transition-colors">
                        <td className="py-5 px-4 text-slate-200 font-bold">{res.platform}</td>
                        <td className="py-5 px-4"><span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${res.status === 'موجود' || res.status === 'نشط' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{res.status}</span></td>
                        <td className="py-5 px-4 text-slate-500 text-xs font-mono">{res.date}</td>
                        <td className="py-5 px-4 text-left font-mono text-[10px]">{res.url ? <a href={res.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{res.url}</a> : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OSINTPage;
