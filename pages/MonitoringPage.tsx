
import React, { useState, useEffect } from 'react';
import { 
  Radio, TrendingUp, AlertCircle, Globe, Twitter, Youtube, 
  Search, Filter, Activity, PieChart, MessageCircle, Share2,
  ExternalLink, Clock, Newspaper, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const MonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'social' | 'sentiment'>('news');
  const [isLive, setIsLive] = useState(true);

  const mockTrends = [
    { tag: '#أوقفوا_الحرب', count: '45.2k', change: '+12%', type: 'up' },
    { tag: '#اليمن', count: '128.4k', change: '+5%', type: 'up' },
    { tag: '#أسعار_الصرف', count: '12.1k', change: '-2%', type: 'down' },
  ];

  const mockNews = [
    { title: 'تطورات ميدانية في مأرب ومحيطها باليمن', source: 'رويترز', time: 'منذ 5 دقائق', category: 'عاجل' },
    { title: 'تقرير دولي يحذر من أزمة أمن غذائي حادة في المحافظات الجنوبية', source: 'الأمم المتحدة', time: 'منذ 15 دقيقة', category: 'إنساني' },
    { title: 'البنك المركزي بصنعاء يصدر توجيهات جديدة لشركات الصرافة', source: 'وكالة سبأ', time: 'منذ ساعة', category: 'اقتصادي' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 text-right" dir="rtl">
      <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-6">
        <div>
           <h1 className="text-3xl font-black text-white tracking-tight flex flex-row-reverse items-center gap-3">
             <Radio size={32} className="text-[#e1b000] animate-pulse" />
             رادار الرصد الحي والتحليل
           </h1>
           <p className="text-slate-400 font-medium mt-1">متابعة الأخبار، وتحليل الرأي العام، وتتبع الوسوم النشطة في اليمن.</p>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800">
           <button onClick={() => setActiveTab('news')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'news' ? 'bg-[#00338d] text-white' : 'text-slate-500'}`}>موجز الأخبار</button>
           <button onClick={() => setActiveTab('social')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'social' ? 'bg-[#00338d] text-white' : 'text-slate-500'}`}>رصد تواصل</button>
           <button onClick={() => setActiveTab('sentiment')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'sentiment' ? 'bg-[#00338d] text-white' : 'text-slate-500'}`}>تحليل المشاعر</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           {activeTab === 'news' && (
             <div className="glass-morphism rounded-[2.5rem] border border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
                   <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                      <span className="text-xs font-black text-white uppercase tracking-widest">Live Newsroom Feed</span>
                   </div>
                   <button onClick={() => setIsLive(!isLive)} className={`px-3 py-1 rounded-lg text-[10px] font-black border ${isLive ? 'border-[#e1b000] text-[#e1b000]' : 'border-slate-700 text-slate-500'}`}>
                      {isLive ? 'AUTO-UPDATE ON' : 'PAUSED'}
                   </button>
                </div>
                <div className="divide-y divide-slate-800">
                   {mockNews.map((news, i) => (
                      <div key={i} className="p-6 hover:bg-slate-800/30 transition-colors flex flex-row-reverse gap-4 items-start">
                         <div className={`mt-1 p-2 rounded-lg ${news.category === 'عاجل' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-400'}`}>
                            <AlertCircle size={18} />
                         </div>
                         <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] font-black text-[#e1b000] uppercase tracking-widest">{news.source}</span>
                               <span className="text-[10px] text-slate-500 font-bold">{news.time}</span>
                            </div>
                            <h3 className="text-md font-bold text-white leading-relaxed">{news.title}</h3>
                            <div className="flex justify-end gap-3 pt-2">
                               <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase">Archive</button>
                               <button className="text-[10px] font-black text-blue-500 hover:underline uppercase flex items-center gap-1">Verify Source <ExternalLink size={10}/></button>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
                <button className="w-full p-4 text-xs font-black text-slate-500 hover:text-white border-t border-slate-800 uppercase">Load Older Reports</button>
             </div>
           )}

           {activeTab === 'social' && (
             <div className="glass-morphism p-10 rounded-[2.5rem] border border-slate-800 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]">
                <Twitter size={48} className="text-blue-400 opacity-20" />
                <h3 className="text-xl font-bold text-white">وحدة تحليل الرأي العام النشط</h3>
                <p className="text-slate-500 text-sm max-w-sm">جاري سحب التفاعلات الحية من منصة X و Telegram المرتبطة بالكلمات المفتاحية: "اليمن"، "صنعاء"، "عدن".</p>
                <div className="flex gap-2">
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-0"></div>
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                </div>
             </div>
           )}

           {activeTab === 'sentiment' && (
             <div className="glass-morphism p-8 rounded-[2.5rem] border border-slate-800 space-y-8">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                   <h3 className="text-xl font-bold text-white flex items-center gap-2"><PieChart size={20} className="text-[#e1b000]"/> تحليل المشاعر لليوم</h3>
                   <span className="text-[10px] font-black text-[#e1b000] bg-[#e1b000]/10 px-3 py-1 rounded-lg">AI ANALYTICS</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="p-6 bg-[#e1b000]/10 rounded-2xl border border-[#e1b000]/20 text-center space-y-2">
                      <p className="text-xs font-black text-[#e1b000] uppercase">إيجابي</p>
                      <p className="text-3xl font-black text-white">22%</p>
                   </div>
                   <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-800 text-center space-y-2">
                      <p className="text-xs font-black text-slate-500 uppercase">محايد</p>
                      <p className="text-3xl font-black text-white">45%</p>
                   </div>
                   <div className="p-6 bg-red-500/10 rounded-2xl border border-red-500/20 text-center space-y-2">
                      <p className="text-xs font-black text-red-500 uppercase">سلبي</p>
                      <p className="text-3xl font-black text-white">33%</p>
                   </div>
                </div>
                <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800">
                   <h4 className="text-sm font-bold text-white mb-4">أكثر المواضيع إثارة للجدل</h4>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                         <span className="text-slate-500">منظومة المساعدات</span>
                         <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-[80%]"></div>
                         </div>
                         <span className="text-red-400 font-bold">غضب</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                         <span className="text-slate-500">مبادرات السلام</span>
                         <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-[#e1b000] w-[60%]"></div>
                         </div>
                         <span className="text-[#e1b000] font-bold">تفاؤل</span>
                      </div>
                   </div>
                </div>
             </div>
           )}
        </div>

        <div className="space-y-6">
           <div className="glass-morphism p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
              <h3 className="text-lg font-black text-white flex items-center gap-2 justify-end">الترند اليمني <TrendingUp size={18} className="text-[#e1b000]"/></h3>
              <div className="space-y-4">
                 {mockTrends.map((trend, i) => (
                   <div key={i} className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all cursor-pointer group">
                      <div className="flex justify-between items-center mb-1">
                         {trend.type === 'up' ? <ArrowUpRight size={14} className="text-[#e1b000]"/> : <ArrowDownRight size={14} className="text-red-500"/>}
                         <p className="text-sm font-black text-white group-hover:text-blue-400">{trend.tag}</p>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className={`text-[10px] font-bold ${trend.type === 'up' ? 'text-[#e1b000]' : 'text-red-500'}`}>{trend.change}</span>
                         <span className="text-[10px] text-slate-500 font-bold">{trend.count} تفاعل</span>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black rounded-xl transition-all uppercase">Open Social Analytics Dashboard</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;
