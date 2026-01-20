
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Bot, Eye, GraduationCap, Newspaper, Archive, 
  Search, Cpu, Database, Mail, Briefcase, Zap, Globe, Lock,
  FileSearch, Mic, Activity, ChevronRight, Layout, Sparkles, Box,
  Video, ImageIcon, Scan, Fingerprint, Radio, MapPin, Navigation,
  History, Layers, Key, Users, MessageCircle, Building2, Terminal, ShieldAlert
} from 'lucide-react';
import { AppLogoText, SLOGAN, TOOLS } from '../constants';
import { ModuleCategory } from '../types';

const CategorySection = ({ title, icon: Icon, children, color }: any) => (
  <div className="space-y-6 animate-in slide-in-from-bottom duration-700">
    <div className="flex flex-row-reverse items-center gap-4 px-4">
      <div className={`p-3 rounded-xl bg-slate-900 ${color} border border-white/5 shadow-lg`}>
        <Icon size={24} />
      </div>
      <h2 className="text-xl font-black text-white uppercase tracking-widest">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {children}
    </div>
  </div>
);

const ToolCard = ({ name, desc, icon: Icon, onClick, color, status }: any) => (
  <button 
    onClick={onClick}
    className="glass-morphism p-8 rounded-[3rem] border border-slate-800/50 hover:bg-slate-900/40 hover:border-[#00338d]/30 transition-all duration-500 shadow-xl group relative overflow-hidden flex flex-col text-right h-full"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00338d]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="flex flex-row-reverse justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl bg-slate-950 ${color} border border-white/5 shadow-inner group-hover:scale-110 transition-transform`}>
        <Icon size={28} />
      </div>
      <div className="flex flex-row-reverse items-center gap-2">
         {status === 'online' && (
           <span className="flex flex-row-reverse items-center gap-2 px-3 py-1 bg-black/40 rounded-full border border-slate-800 text-[9px] font-black uppercase text-[#e1b000] shadow-inner">
              <span className="w-1.5 h-1.5 bg-[#e1b000] rounded-full animate-pulse shadow-[0_0_8px_rgba(225,176,0,0.8)]"></span> نشط
           </span>
         )}
      </div>
    </div>
    <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#e1b000] transition-colors">{name}</h3>
    <p className="text-[10px] text-slate-500 font-bold leading-relaxed mb-6 flex-1">{desc}</p>
    <div className="flex flex-row-reverse items-center justify-between border-t border-white/5 pt-4">
      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest group-hover:text-[#e1b000] transition-colors">دخول سيادي</span>
      <ChevronRight size={14} className="text-slate-700 group-hover:text-[#e1b000] transition-all rotate-180" />
    </div>
  </button>
);

const PortalPage: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    const icons: any = {
      Cpu, Mic, Video, ImageIcon, Scan, ShieldCheck, Fingerprint, Radio, Search,
      Eye, MapPin, Navigation, Zap, Globe, Building2, Database, Archive, History,
      Layers, Lock, Key, Layout, Users, MessageCircle, Newspaper, GraduationCap, Briefcase, Sparkles, ShieldAlert
    };
    return icons[iconName] || Box;
  };

  const categories = [
    { title: "المعالجة والذكاء السيادي", icon: Cpu, cat: ModuleCategory.AI_CORE, color: "text-[#00338d]" },
    { title: "الأمن الحقوقي والتحقق الجنائي", icon: ShieldCheck, cat: ModuleCategory.VERIFICATION, color: "text-[#e1b000]" },
    { title: "الاستخبارات الرقمية (OSINT)", icon: Search, cat: ModuleCategory.OSINT, color: "text-blue-500" },
    { title: "الرصد المكاني والجغرافي", icon: MapPin, cat: ModuleCategory.GEOSPATIAL, color: "text-blue-600" },
    { title: "إدارة الأخبار والتعاون المؤسسي", icon: Layout, cat: ModuleCategory.COLLABORATION, color: "text-slate-400" },
    { title: "الذاكرة الرقمية والأرشفة", icon: Archive, cat: ModuleCategory.ARCHIVING, color: "text-blue-800" }
  ];

  return (
    <div className="space-y-16 pb-20 max-w-[1600px] mx-auto px-4 font-ar" dir="rtl">
      <div className="relative p-12 lg:p-20 rounded-[5rem] bg-[#020617] border border-slate-800 overflow-hidden shadow-3xl text-center">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-[#00338d]/20 blur-[150px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-[#e1b000]/5 blur-[120px] rounded-full animate-pulse delay-1000"></div>
         </div>
         
         <div className="relative z-10 space-y-8">
            <div className="flex flex-col items-center gap-6">
               <div className="w-24 h-24 bg-[#00338d] rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-2xl animate-in zoom-in duration-1000">
                  <Box size={48} className="text-white" />
               </div>
               <div className="space-y-4">
                  <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-none">
                    Yemen<span className="text-[#e1b000]">JPT</span> <span className="text-slate-700">GRID</span>
                  </h1>
                  <p className="text-[#e1b000] font-black text-sm uppercase tracking-[0.5em]">{SLOGAN}</p>
               </div>
            </div>
            <p className="text-slate-400 text-lg font-medium max-w-4xl mx-auto leading-relaxed opacity-80">
              مرحباً بك في شبكة اليمن السيادية. بنية تحتية رقمية متكاملة لضمان استقلال القرار الإعلامي وحماية البيانات الوطنية بتطوير ريـدان برو.
            </p>
         </div>
      </div>

      <div className="space-y-24">
        {categories.map(category => (
          <CategorySection key={category.title} title={category.title} icon={category.icon} color={category.color}>
            {TOOLS.filter(t => t.category === category.cat).map(tool => (
              <ToolCard 
                key={tool.id}
                name={tool.name}
                desc={tool.description}
                icon={getIcon(tool.icon)}
                color={category.color}
                status={tool.status}
                onClick={() => {
                  if (tool.category === ModuleCategory.VERIFICATION) navigate('/verification');
                  else if (tool.category === ModuleCategory.OSINT) navigate('/osint');
                  else if (tool.category === ModuleCategory.AI_CORE) navigate('/ai');
                  else if (tool.category === ModuleCategory.ARCHIVING) navigate('/archive');
                  else navigate('/dashboard');
                }}
              />
            ))}
          </CategorySection>
        ))}
      </div>
    </div>
  );
};

export default PortalPage;
