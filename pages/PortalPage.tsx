
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Bot, Eye, GraduationCap, Newspaper, Archive, 
  Search, Cpu, Database, Mail, Briefcase, Zap, Globe, Lock,
  FileSearch, Mic, Activity, ChevronRight, Layout, Sparkles, Box,
  Video, ImageIcon, Scan, Fingerprint, Radio, MapPin, Navigation,
  History, Layers, Key, Users, MessageCircle, Building2, Terminal, ShieldAlert,
  LayoutGrid, Rocket, Binary, User, Twitter, Flag,
  // Added Languages and PenTool to fix missing icon errors
  Languages, PenTool
} from 'lucide-react';
import { AppLogoText, SLOGAN, TOOLS } from '../constants';
import { ModuleCategory } from '../types';

const CategorySection = ({ title, icon: Icon, children, color }: any) => (
  <div className="space-y-8 animate-in slide-in-from-bottom duration-700">
    <div className="flex flex-row-reverse items-center gap-5 px-4">
      <div className={`p-3.5 rounded-2xl bg-slate-900/80 ${color} border border-white/5 shadow-xl`}>
        <Icon size={26} />
      </div>
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {children}
    </div>
  </div>
);

const ToolCard = ({ name, desc, icon: Icon, onClick, color, status }: any) => (
  <button 
    onClick={onClick}
    className="glass-morphism p-10 rounded-[3.5rem] border border-slate-800/40 hover:bg-slate-900/60 hover:border-[#003087]/50 transition-all duration-500 shadow-2xl group relative overflow-hidden flex flex-col text-right h-full"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#003087]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="flex flex-row-reverse justify-between items-start mb-8">
      <div className={`p-5 rounded-3xl bg-slate-950 ${color} border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={32} />
      </div>
      <div className="flex flex-row-reverse items-center gap-2">
         {status === 'online' && (
           <span className="flex flex-row-reverse items-center gap-2 px-4 py-1.5 bg-black/40 rounded-full border border-slate-800 text-[10px] font-black uppercase text-emerald-400 shadow-inner">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> نشط
           </span>
         )}
      </div>
    </div>
    <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#e1b000] transition-colors leading-tight">{name}</h3>
    <p className="text-[11px] text-slate-500 font-bold leading-relaxed mb-8 flex-1">{desc}</p>
    <div className="flex flex-row-reverse items-center justify-between border-t border-white/5 pt-6">
      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest group-hover:text-[#003087] transition-colors">دخول سيادي</span>
      <ChevronRight size={18} className="text-slate-700 group-hover:text-[#e1b000] transition-all rotate-180" />
    </div>
  </button>
);

const PortalPage: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    const icons: any = {
      Cpu, Mic, Video, ImageIcon, Scan, ShieldCheck, Fingerprint, Radio, Search,
      Eye, MapPin, Navigation, Zap, Globe, Building2, Database, Archive, History,
      Layers, Lock, Key, Layout, Users, MessageCircle, Newspaper, GraduationCap, Briefcase, Sparkles, ShieldAlert, Binary,
      Bot, Languages, FileSearch, User, Twitter, LayoutGrid, Flag
    };
    return icons[iconName] || Box;
  };

  const categories = [
    { title: "1. المساعد التحريري", icon: PenTool, cat: ModuleCategory.AI_CORE, color: "text-blue-500" },
    { title: "2. التقصي وجمع المعلومات (OSINT)", icon: Search, cat: ModuleCategory.OSINT, color: "text-orange-500" },
    { title: "3. تحليل الإعلام الاجتماعي", icon: Users, cat: ModuleCategory.SOCIAL_MEDIA, color: "text-blue-400" },
    { title: "4. التحقق وكشف التزييف", icon: ShieldCheck, cat: ModuleCategory.VERIFICATION, color: "text-[#e1b000]" },
    { title: "5. الخرائط والرصد الجغرافي", icon: MapPin, cat: ModuleCategory.GEOSPATIAL, color: "text-emerald-500" },
    { title: "6. إدارة غرفة الأخبار والنشر", icon: Layout, cat: ModuleCategory.COLLABORATION, color: "text-purple-400" },
    { title: "7. الإدارة المؤسسية والأرشفة", icon: Building2, cat: [ModuleCategory.ADMIN, ModuleCategory.ARCHIVING, ModuleCategory.OBSERVATORY], color: "text-red-400" },
    { title: "8. بوابة التدريب والدعم", icon: GraduationCap, cat: ModuleCategory.ACADEMY, color: "text-slate-400" }
  ];

  return (
    <div className="space-y-24 pb-20 max-w-[1700px] mx-auto font-ar" dir="rtl">
      {/* Immersive Header */}
      <div className="relative p-16 lg:p-24 rounded-[6rem] bg-gradient-to-br from-[#020617] to-slate-950 border border-slate-800 overflow-hidden shadow-3xl text-center">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[50rem] h-[50rem] bg-[#003087] blur-[200px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-[#e1b000]/10 blur-[150px] rounded-full animate-pulse delay-1000"></div>
         </div>
         
         <div className="relative z-10 space-y-10">
            <div className="flex flex-col items-center gap-8">
               <div className="w-32 h-32 bg-[#003087] rounded-[3rem] flex items-center justify-center border border-white/10 shadow-2xl animate-in zoom-in duration-1000">
                  <Box size={64} className="text-[#e1b000]" />
               </div>
               <div className="space-y-4">
                  <h1 className="text-7xl lg:text-9xl font-black text-white tracking-tighter uppercase leading-none">
                    Yemen<span className="text-[#e1b000]">JPT</span> <span className="text-slate-800 text-5xl align-middle">PRO</span>
                  </h1>
                  <p className="text-[#e1b000] font-black text-lg uppercase tracking-[0.5em]">{SLOGAN}</p>
               </div>
            </div>
            <p className="text-slate-400 text-xl font-medium max-w-5xl mx-auto leading-relaxed opacity-80">
              دليل أدوات منصة YemenJPT (الإصدار الموسع). توزيع الـ +35 أداة حسب مراحل العمل الصحفي لتسهيل الوصول والربط المعرفي.
            </p>
         </div>
      </div>

      {/* Grid Layout */}
      <div className="space-y-32">
        {categories.map(category => (
          <CategorySection key={category.title} title={category.title} icon={category.icon} color={category.color}>
            {TOOLS.filter(t => {
              if (Array.isArray(category.cat)) return category.cat.includes(t.category);
              return t.category === category.cat;
            }).map(tool => (
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
                  else if (tool.category === ModuleCategory.OBSERVATORY) navigate('/observatory');
                  else if (tool.category === ModuleCategory.ACADEMY) navigate('/academy');
                  else if (tool.category === ModuleCategory.COLLABORATION) navigate('/collaboration');
                  else navigate('/dashboard');
                }}
              />
            ))}
          </CategorySection>
        ))}
      </div>

      {/* Footer Branding */}
      <div className="text-center py-20 opacity-30">
        <div className="flex justify-center gap-10 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="h-16 w-px bg-slate-800"></div>
          <div className="flex items-center gap-3">
            <AppLogoText className="text-4xl text-white" />
          </div>
          <div className="h-16 w-px bg-slate-800"></div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] mt-8 text-slate-500">Sovereign Cloud Hub Powered by RaidanPro</p>
      </div>
    </div>
  );
};

export default PortalPage;
