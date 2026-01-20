
import React from 'react';
import { Archive, Search, FileText, Image as ImageIcon, Music, Film, Calendar, Download, ShieldCheck, History } from 'lucide-react';

const ArchivePage: React.FC = () => {
  const archiveItems = [
    { id: '1', title: 'أرشيف صحيفة الثورة - الستينات', type: 'DOCUMENT', date: '1962-1969', status: 'Public' },
    { id: '2', title: 'صور نادرة لميناء عدن التاريخي', type: 'IMAGE', date: '1950', status: 'Restricted' },
    { id: '3', title: 'تسجيلات إذاعية لصنعاء القديمة', type: 'AUDIO', date: '1975', status: 'Public' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-right" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
             <Archive size={32} className="text-[#e1b000]" /> أرشيف الذاكرة الصحفية اليمنية
          </h1>
          <p className="text-slate-400 mt-2">حفظ، رقمنة، وتوثيق التاريخ الصحفي اليمني للأجيال القادمة.</p>
        </div>
        <div className="flex gap-4">
           <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 border border-emerald-500/20 flex items-center gap-3">
              <ShieldCheck size={20}/>
              <span className="text-[10px] font-black uppercase tracking-widest">تشفير سيادي للوثائق</span>
           </div>
        </div>
      </div>

      <div className="glass-morphism p-10 rounded-[3rem] border border-slate-800 shadow-2xl space-y-8">
         <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
               <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
               <input placeholder="ابحث في الأرشيف الوطني (صور، وثائق، تسجيلات)..." className="w-full bg-slate-950 border border-slate-700 rounded-2xl pr-12 pl-6 py-4 text-white focus:outline-none focus:border-[#00338d] transition-all" />
            </div>
            <div className="flex gap-2">
               <button className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all"><FileText size={20}/></button>
               <button className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all"><ImageIcon size={20}/></button>
               <button className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all"><Music size={20}/></button>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {archiveItems.map(item => (
               <div key={item.id} className="p-8 bg-slate-950/40 rounded-[3rem] border border-slate-800 hover:border-[#e1b000]/40 transition-all group cursor-pointer relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#e1b000] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-4 bg-[#e1b000]/10 rounded-2xl text-[#e1b000] shadow-inner">
                        {item.type === 'DOCUMENT' ? <FileText size={28}/> : (item.type === 'IMAGE' ? <ImageIcon size={28}/> : <Music size={28}/>)}
                     </div>
                     <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${item.status === 'Public' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                        {item.status}
                     </span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#e1b000] transition-colors">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-bold flex items-center gap-2 justify-end"><History size={14}/> {item.date}</p>
                  <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-800/50">
                     <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase flex items-center gap-2">View Details <ShieldCheck size={12}/></button>
                     <button className="p-2 text-slate-500 hover:text-white"><Download size={16}/></button>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default ArchivePage;
