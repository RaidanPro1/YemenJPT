
import React, { useState } from 'react';
import { Globe, Search, BarChart3, RefreshCw, Smartphone, Eye, ExternalLink } from 'lucide-react';

const AdminSEO: React.FC = () => {
  const [isRegenerating, setIsRegenerating] = useState(false);

  return (
    <div className="space-y-10 animate-in fade-in max-w-5xl mx-auto">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-900/20 to-transparent p-8 rounded-[3rem] border border-slate-800">
        <div className="text-right">
          <h1 className="text-4xl font-black text-white flex items-center gap-4 justify-end">
            مركز تحسين الانتشار (SEO) <Search size={32} className="text-[#e1b000]" />
          </h1>
          <p className="text-slate-400 mt-2">تحكم في كيفية ظهور RaidanPro في محركات البحث وتوليد الـ Sitemaps.</p>
        </div>
        <button onClick={() => { setIsRegenerating(true); setTimeout(() => setIsRegenerating(false), 3000); }} className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black shadow-xl flex items-center gap-3 transition-all">
          {isRegenerating ? <RefreshCw className="animate-spin" size={20} /> : <RefreshCw size={20} />}
          تحديث خريطة الموقع (Sitemap)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-2 glass-morphism p-10 rounded-[3rem] border border-slate-800 space-y-8">
            <h3 className="text-xl font-black text-white flex items-center gap-3 justify-end border-b border-slate-800 pb-4">
              البيانات الوصفية (Meta Tags) <Globe size={20} className="text-blue-500" />
            </h3>
            <div className="space-y-6">
               <div className="space-y-2 text-right">
                  <label className="text-[10px] font-black text-slate-500 uppercase">عنوان الموقع الرئيسي (Browser Title)</label>
                  <input className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white outline-none focus:border-blue-600" defaultValue="ريدان برو | هندسة المرونة والذكاء الاصطناعي" />
               </div>
               <div className="space-y-2 text-right">
                  <label className="text-[10px] font-black text-slate-500 uppercase">الوصف لمحركات البحث (Meta Description)</label>
                  <textarea className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white outline-none focus:border-blue-600 min-h-[100px]" defaultValue="الوكالة الرائدة في اليمن للتحول الرقمي والاتصال الاستراتيجي..." />
               </div>
               <div className="space-y-2 text-right">
                  <label className="text-[10px] font-black text-slate-500 uppercase">الكلمات المفتاحية (Keywords)</label>
                  <input className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white outline-none focus:border-blue-600" placeholder="Yemen, AI, Digital Sovereignty..." />
               </div>
            </div>
         </div>

         <div className="glass-morphism p-10 rounded-[3rem] border border-slate-800 space-y-8">
            <h3 className="text-xl font-black text-white text-right">معاينة التواصل <Smartphone size={20} className="text-[#e1b000] inline-block ml-3" /></h3>
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
               <div className="h-40 bg-slate-200 overflow-hidden"><img src="logo.png" className="w-full h-full object-contain p-8" /></div>
               <div className="p-4 space-y-2">
                  <p className="text-blue-600 font-bold text-xs truncate">https://raidan.pro</p>
                  <p className="text-slate-800 font-black text-sm">ريدان برو | هندسة المرونة والذكاء الاصطناعي</p>
                  <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-2">الوكالة الرائدة في اليمن للتحول الرقمي والاتصال الاستراتيجي...</p>
               </div>
            </div>
            <p className="text-[10px] text-slate-500 text-center">معاينة لشكل الرابط في WhatsApp/Facebook</p>
         </div>
      </div>
    </div>
  );
};

export default AdminSEO;
