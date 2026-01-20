
import React from 'react';
import { Newspaper, Send, Share2, Download, Filter, MessageCircle, ExternalLink, Calendar, User } from 'lucide-react';

const MediaHubPage: React.FC = () => {
  const reports = [
    { id: '1', title: 'التقرير السنوي لحالة الحريات الصحفية في اليمن 2023', author: 'وحدة الدراسات', date: '2024-04-15', image: 'https://images.unsplash.com/photo-1585829365234-78d2b98ad818?auto=format&fit=crop&q=80&w=400' },
    { id: '2', title: 'دليل السلامة المهنية للصحفيين في مناطق النزاع', author: 'قسم التدريب', date: '2024-03-20', image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-right" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
             <Newspaper size={32} className="text-[#e1b000]" /> المركز الإعلامي والتقارير
          </h1>
          <p className="text-slate-400 mt-2">النافذة الرسمية لبيت الصحافة: أخبار، بيانات، وتقارير استقصائية معمقة.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-10">
            {/* Featured Post */}
            <div className="glass-morphism rounded-[3.5rem] overflow-hidden border border-slate-800 shadow-2xl relative group">
               <div className="h-96 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-10 right-10 left-10 text-right space-y-4">
                     <span className="bg-[#e1b000] text-[#00338d] px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">خبر رئيسي</span>
                     <h2 className="text-4xl font-black text-white leading-tight">بيت الصحافة يطلق المنصة السيادية الأولى للتحقق الرقمي في اليمن</h2>
                     <div className="flex items-center gap-6 justify-end text-slate-300 text-xs font-medium">
                        <span className="flex items-center gap-2">منذ ساعة واحدة <Calendar size={14}/></span>
                        <span className="flex items-center gap-2">بواسطة: هيئة التحرير <User size={14}/></span>
                     </div>
                  </div>
               </div>
               <div className="p-8 bg-slate-900/60 flex justify-between items-center">
                  <div className="flex gap-4">
                     <button className="p-4 bg-slate-800 border border-slate-700 rounded-2xl text-slate-400 hover:text-white transition-all"><Share2 size={20}/></button>
                     <button className="p-4 bg-slate-800 border border-slate-700 rounded-2xl text-slate-400 hover:text-white transition-all"><MessageCircle size={20}/></button>
                  </div>
                  <button className="bg-[#00338d] hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-xs shadow-xl transition-all">اقرأ المزيد</button>
               </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-2xl font-black text-white px-2">تقارير ودراسات</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {reports.map(report => (
                     <div key={report.id} className="glass-morphism rounded-[3rem] overflow-hidden border border-slate-800 group hover:border-blue-500/40 transition-all shadow-xl">
                        <div className="h-48 overflow-hidden">
                           <img src={report.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-8 space-y-4">
                           <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-relaxed">{report.title}</h4>
                           <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                              <span className="text-[10px] text-slate-500 font-bold">{report.date}</span>
                              <button className="p-2 text-slate-400 hover:text-[#e1b000]"><Download size={18}/></button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="glass-morphism p-8 rounded-[3rem] border border-slate-800 space-y-6">
               <h3 className="text-xl font-black text-white text-right">نشرة البيانات الرسمية</h3>
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="p-5 bg-slate-950/40 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all cursor-pointer">
                        <p className="text-[10px] text-blue-500 font-black uppercase mb-1">بيان صحفي</p>
                        <h4 className="text-sm font-bold text-white mb-2 leading-relaxed">إدانة الاعتداء السافر على مقر إعلامي في مدينة تعز...</h4>
                        <span className="text-[9px] text-slate-500 font-bold">2024-05-18</span>
                     </div>
                  ))}
               </div>
               <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black rounded-xl transition-all uppercase tracking-widest">شاهد كافة البيانات</button>
            </div>

            <div className="glass-morphism p-8 rounded-[3rem] border border-[#e1b000]/20 bg-[#e1b000]/5 space-y-4 text-right">
               <div className="flex items-center gap-2 justify-end text-[#e1b000]">
                  <Send size={18}/>
                  <span className="text-xs font-black uppercase tracking-widest">تواصل مع المكتب الإعلامي</span>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed font-medium">لطلبات المقابلات، الحصول على بيانات دقيقة، أو التواصل مع المتحدث الرسمي للمؤسسة.</p>
               <button className="w-full py-3 bg-[#e1b000] text-[#00338d] text-[10px] font-black rounded-xl shadow-xl transition-all uppercase">إرسال طلب إعلامي</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MediaHubPage;
