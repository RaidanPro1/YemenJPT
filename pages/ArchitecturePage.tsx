
import React from 'react';
import { ARCHITECTURE_DOC, PARTNERSHIP_TEXT } from '../constants';
import { Code, Server, Shield, Database, Layout, Terminal, HardDrive, Cpu, Settings, ExternalLink, ShieldCheck } from 'lucide-react';

const ArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 border-b border-slate-800 pb-12">
        <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 bg-[#00338d]/10 rounded-[2.5rem] p-6 border border-[#00338d]/20 shadow-2xl shadow-blue-900/20">
          <img src="logo.png" alt="YemenJPT" className="w-full h-full object-contain" />
        </div>
        <div className="max-w-4xl text-right">
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tighter leading-tight uppercase">
            {ARCHITECTURE_DOC.title}
          </h1>
          <p className="text-[#e1b000] font-bold text-sm mb-4 uppercase tracking-[0.2em]">{PARTNERSHIP_TEXT}</p>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">
            الدليل التقني الشامل لمنصة YemenJPT السيادية. يغطي هذا المستند البنية التحتية، المعمارية الموزعة، وآليات "سيادة البيانات" في غرف الأخبار اليمنية.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARCHITECTURE_DOC.layers.map((layer, idx) => (
          <div key={idx} className="glass-morphism p-8 rounded-3xl border border-slate-800/50 hover:border-[#00338d]/40 transition-all group relative overflow-hidden">
            <div className="flex flex-row-reverse items-start justify-between mb-6 relative z-10">
              <div className="p-4 bg-[#00338d]/10 rounded-2xl text-[#00338d] group-hover:scale-110 transition-transform border border-[#00338d]/20 shadow-lg">
                {idx === 0 && <Layout size={28} />}
                {idx === 1 && <Settings size={28} />}
                {idx === 2 && <ShieldCheck size={28} />}
                {idx === 3 && <Database size={28} />}
              </div>
              <span className="text-slate-800 font-mono text-5xl opacity-20">0{idx + 1}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 text-right relative z-10">{layer.name}</h3>
            <p className="text-[#e1b000] font-mono text-sm mb-4 text-right tracking-widest uppercase relative z-10">{layer.tech}</p>
            <p className="text-slate-400 leading-relaxed text-right relative z-10">{layer.details}</p>
          </div>
        ))}
      </div>

      <div className="glass-morphism p-10 rounded-3xl border border-slate-800/50 bg-gradient-to-bl from-slate-900 via-[#020617] to-[#00338d]/10">
        <div className="flex flex-row-reverse items-center gap-4 mb-10 pb-6 border-b border-slate-800/50">
           <Shield size={32} className="text-[#e1b000]" />
           <h2 className="text-3xl font-extrabold text-white text-right">رؤية السيادة الرقمية (Digital Sovereignty)</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
           <div className="space-y-4">
              <h4 className="text-[#e1b000] font-bold">لماذا Sovereign AI؟</h4>
              <p className="text-slate-400 text-sm leading-relaxed">البيانات اليمنية يجب أن تبقى يمنية. نحن نستخدم نماذج مفتوحة المصدر (Open-Source) معدلة لتفهم السياق المحلي بعيداً عن تحيزات الشركات الكبرى.</p>
           </div>
           <div className="space-y-4">
              <h4 className="text-[#e1b000] font-bold">دور RaidanPro</h4>
              <p className="text-slate-400 text-sm leading-relaxed">المسؤول التقني عن بناء وتأمين هذه المعمارية، وتوفير الدعم التقني لتشغيل المنصة في أصعب الظروف التقنية (انقطاع الإنترنت/النزاع).</p>
           </div>
           <div className="space-y-4">
              <h4 className="text-[#e1b000] font-bold">دور بيت الصحافة</h4>
              <p className="text-slate-400 text-sm leading-relaxed">الشريك الاستراتيجي الذي يضمن توظيف هذه التكنولوجيا لخدمة الحقيقة، تدريب الصحفيين، وضمان استقلالية الكلمة اليمنية.</p>
           </div>
        </div>

        <div className="mt-16 p-6 bg-blue-600/10 border border-[#00338d]/20 rounded-2xl flex flex-col md:flex-row-reverse items-center justify-between gap-6">
           <div className="text-right">
              <h4 className="text-white font-bold text-lg mb-1">دليل التثبيت المحلي (On-Premise)</h4>
              <p className="text-slate-400 text-sm">متوفر للمؤسسات الإعلامية الكبرى الراغبة في تشغيل سرفرات خاصة بها.</p>
           </div>
           <button className="bg-[#00338d] hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
              <ExternalLink size={18} /> طلب الدليل التقني
           </button>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturePage;
