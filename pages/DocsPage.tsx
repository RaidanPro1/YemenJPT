
import React, { useState } from 'react';
import { 
  BookOpen, FileText, Cpu, ShieldCheck, Zap, Gavel, 
  ChevronLeft, Info, Layout, Newspaper, ArrowRight,
  Database, Server, Lock, Fingerprint, Eye, Radio,
  Sparkles, History, Globe, HardDrive, Search, Mic, Archive, Check, ShieldAlert,
  // Added Activity icon to fix line 178 error
  Activity
} from 'lucide-react';
import { AppLogoText } from '../constants';

const DocsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'whitepaper' | 'operations' | 'policy' | 'charter'>('whitepaper');

  const SectionTitle = ({ title, subtitle, icon: Icon }: { title: string, subtitle: string, icon: any }) => (
    <div className="flex flex-col items-center text-center space-y-4 mb-16">
      <div className="w-20 h-20 bg-[#00338d]/10 rounded-[2rem] flex items-center justify-center text-[#e1b000] border border-[#00338d]/20 shadow-xl">
        <Icon size={40} />
      </div>
      <h2 className="text-5xl font-black text-white tracking-tighter uppercase">{title}</h2>
      <p className="text-[#e1b000] text-sm font-black uppercase tracking-[0.3em]">{subtitle}</p>
    </div>
  );

  const Footer = () => (
    <div className="mt-24 pt-12 border-t border-slate-800/60 text-center space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-slate-800"></div>
          <p className="text-slate-500 text-xs font-bold">
            Yemen<span className="text-[#e1b000]">JPT</span> System
          </p>
          <div className="h-px w-12 bg-slate-800"></div>
        </div>
        <p className="text-slate-400 text-sm font-black uppercase tracking-widest leading-relaxed">
          حقوق المنصة تابعة لـ RaidanPro بشراكة استراتيجية مع بيت الصحافة
        </p>
        <p className="text-slate-600 text-[10px] font-bold">
          Sovereign AI Infrastructure for Yemeni Journalism & Public Interest
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-in fade-in duration-1000 font-ar text-right" dir="rtl">
      
      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-20">
        {[
          { id: 'whitepaper', label: 'الورقة التقنية', icon: Cpu },
          { id: 'operations', label: 'غرفة العمليات', icon: Layout },
          { id: 'policy', label: 'ورقة السياسات', icon: FileText },
          { id: 'charter', label: 'الميثاق الرقمي', icon: Gavel },
        ].map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveSection(tab.id as any)} 
            className={`px-10 py-5 rounded-[2rem] text-xs font-black flex items-center gap-4 transition-all duration-500 border-2 ${
              activeSection === tab.id 
                ? 'bg-[#00338d] border-[#00338d] text-white shadow-[0_20px_40px_rgba(0,51,141,0.4)] scale-105' 
                : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:text-white hover:border-slate-700'
            }`}
          >
            <tab.icon size={20}/> {tab.label}
          </button>
        ))}
      </div>

      {/* Page 1: Technical Whitepaper */}
      {activeSection === 'whitepaper' && (
        <div className="space-y-16 animate-in slide-in-from-bottom-6">
          <SectionTitle 
            title="الورقة التقنية (Whitepaper)" 
            subtitle="البنية التحتية السيادية لـ YemenJPT" 
            icon={Cpu} 
          />
          
          <div className="prose prose-invert max-w-none space-y-12">
            <div className="glass-morphism p-12 rounded-[4rem] border border-slate-800/60 shadow-2xl">
              <h3 className="text-3xl font-black text-white mb-8 border-r-8 border-[#e1b000] pr-6 leading-tight">مقدمة: لماذا السيادة الرقمية؟</h3>
              <p className="text-slate-300 text-lg leading-relaxed font-medium">
                تواجه الصحافة اليمنية تحديات بنيوية حادة نتيجة الاعتماد المفرط على الخدمات السحابية الخارجية. إن YemenJPT تقدم حلاً جذرياً عبر استضافة النماذج اللغوية محلياً، مما يضمن استمرارية العمل حتى في ظروف انقطاع الإنترنت أو القيود الدولية.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-white font-black text-xl flex items-center gap-3">
                      <Zap size={20} className="text-[#e1b000]" /> الذكاء الاصطناعي السيادي (Sovereign AI)
                    </h4>
                    <p className="text-slate-400 text-md leading-relaxed">
                      نستخدم نماذج لغوية مفتوحة المصدر (مثل Falcon 3 و Llama 3) تمت عملية "تكميمها" (Quantization) لتعمل بكفاءة على موارد الحوسبة المتاحة محلياً، مما يوفر استدلالاً (Inference) سريعاً وآمناً.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-black text-xl flex items-center gap-3">
                      <Database size={20} className="text-[#e1b000]" /> نظام RAG المتقدم
                    </h4>
                    <p className="text-slate-400 text-md leading-relaxed">
                      ربط المحرك بقواعد بيانات محلية محدثة تضمن مطابقة الحقائق مع السياق اليمني وتمنع "الهلوسة" الرقمية الشائعة في النماذج العالمية.
                    </p>
                  </div>
                </div>
                <div className="bg-slate-900/60 rounded-[3rem] border border-slate-800 border-dashed p-10 flex flex-col items-center justify-center text-center space-y-4">
                  <Server size={64} className="text-blue-500/20" />
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Local Mesh Architecture</p>
                    <p className="text-[10px] text-slate-700 font-bold italic">Conceptual Diagram Placeholder</p>
                  </div>
                  <div className="w-full h-px bg-slate-800 my-4"></div>
                  <p className="text-[10px] text-slate-500 leading-relaxed max-w-[200px]">تصور لترابط العقد الصحفية (Journalistic Nodes) عبر شبكة RaidanPro المعزولة.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-900/40 rounded-[3rem] border border-slate-800/60 space-y-4">
                <h4 className="text-white font-black">البيانات المحلية</h4>
                <p className="text-xs text-slate-500 leading-relaxed">تدريب النماذج على اللهجات اليمنية والقوانين والوثائق الوطنية لضمان دقة التحليل.</p>
              </div>
              <div className="p-8 bg-slate-900/40 rounded-[3rem] border border-slate-800/60 space-y-4">
                <h4 className="text-white font-black">الخصوصية التامة</h4>
                <p className="text-xs text-slate-500 leading-relaxed">لا يتم إرسال أي بيانات للمصادر أو التحقيقات إلى سرفرات خارجية خارج سيطرة المؤسسة.</p>
              </div>
              <div className="p-8 bg-slate-900/40 rounded-[3rem] border border-slate-800/60 space-y-4">
                <h4 className="text-white font-black">قابلية التوسع</h4>
                <p className="text-xs text-slate-500 leading-relaxed">بنية تحتية مرنة تسمح بإضافة وحدات معالجة جديدة (GPU Clusters) حسب الحاجة.</p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}

      {/* Page 2: Operations Room */}
      {activeSection === 'operations' && (
        <div className="space-y-16 animate-in slide-in-from-bottom-6">
          <SectionTitle 
            title="غرفة العمليات والأدوات" 
            subtitle="ترسانة الصحفي الرقمية" 
            icon={Layout} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: 'نظام كشّاف (OSINT)', 
                icon: Search, 
                desc: 'تتبع البصمة الرقمية، تحليل الحسابات الوهمية، والبحث في المصادر المفتوحة عبر 1000+ منصة.',
                color: 'text-blue-500'
              },
              { 
                name: 'مختبر بيّنة (Verification)', 
                icon: ShieldCheck, 
                desc: 'التحقق الجنائي من الصور والفيديو باستخدام تقنيات ELA وتقطيع المشاهد لرصد التلاعب.',
                color: 'text-[#e1b000]'
              },
              { 
                name: 'نظام مُنصت (Transcription)', 
                icon: Mic, 
                desc: 'تفريغ صوتي متخصص في اللهجات اليمنية يعمل محلياً بالكامل لحماية خصوصية المقابلات.',
                color: 'text-emerald-500'
              },
              { 
                name: 'كاشف السرديات (Narrative)', 
                icon: Radio, 
                desc: 'رصد حملات التضليل المنظمة وتتبع منشأ الإشاعات عبر تحليل أنماط النشر المريب.',
                color: 'text-red-500'
              },
              { 
                name: 'خزنة مُسند (Archive)', 
                icon: Archive, 
                desc: 'أرشفة الوثائق التاريخية والصحفية بنظام تشفير عالي التعقيد لحمايتها من الضياع أو التلف.',
                color: 'text-purple-500'
              },
              { 
                name: 'رادار التحليل (IndiLab)', 
                icon: Activity, 
                desc: 'نظام الإنذار المبكر الذي يحلل مؤشرات التصعيد والانتهاكات بناءً على البيانات اللحظية.',
                color: 'text-blue-400'
              }
            ].map((tool, i) => (
              <div key={i} className="glass-morphism p-10 rounded-[3.5rem] border border-slate-800/60 hover:border-[#00338d]/40 transition-all duration-500 group flex flex-col text-right h-full">
                <div className={`w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center ${tool.color} mb-8 shadow-inner group-hover:scale-110 transition-transform`}>
                  <tool.icon size={28} />
                </div>
                <h4 className="text-2xl font-black text-white mb-4">{tool.name}</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium flex-1">{tool.desc}</p>
                <div className="mt-8 flex items-center justify-end gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                  Ready for Deployment <ArrowRight size={12} className="rotate-180" />
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      )}

      {/* Page 3: Strategic Policy */}
      {activeSection === 'policy' && (
        <div className="space-y-16 animate-in slide-in-from-bottom-6">
          <SectionTitle 
            title="ورقة السياسات (Policy Paper)" 
            subtitle="الصحافة اليمنية في عصر الذكاء الاصطناعي" 
            icon={FileText} 
          />
          
          <div className="max-w-4xl mx-auto space-y-16">
            <section className="space-y-8">
              <h3 className="text-3xl font-black text-white border-r-8 border-blue-600 pr-6 leading-tight">تشخيص الأزمة الاستراتيجية</h3>
              <p className="text-slate-300 text-lg leading-relaxed font-medium">
                يعاني الإعلام اليمني من "تبعية تقنية" تجعله عرضة للخوارزميات العالمية التي لا تفهم السياق المحلي، مما يؤدي إلى تهميش الرواية اليمنية المستقلة أو حظرها نتيجة تصنيفات آلية غير دقيقة.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-10 bg-slate-900/40 rounded-[3.5rem] border border-slate-800/60 space-y-6">
                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 mb-2">
                  <Globe size={24} />
                </div>
                <h4 className="text-xl font-black text-white leading-tight">البديل الاستراتيجي</h4>
                <p className="text-sm text-slate-400 leading-relaxed">بناء "عقد حوسبة صحفية" (Journalistic Compute Clusters) تملكها المؤسسات الإعلامية وتتحكم في بياناتها وخوارزمياتها.</p>
              </div>
              <div className="p-10 bg-slate-900/40 rounded-[3.5rem] border border-slate-800/60 space-y-6">
                <div className="w-12 h-12 bg-[#e1b000]/10 rounded-xl flex items-center justify-center text-[#e1b000] mb-2">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="text-xl font-black text-white leading-tight">الحماية السيادية</h4>
                <p className="text-sm text-slate-400 leading-relaxed">تطوير ميثاق تقني يمني يحمي الصحفيين من المراقبة الرقمية العابرة للحدود وتوظيف الذكاء الاصطناعي كدرع دفاعي.</p>
              </div>
            </div>

            <section className="bg-[#00338d]/5 border border-[#00338d]/20 p-12 rounded-[4rem] space-y-8 shadow-2xl">
              <h3 className="text-2xl font-black text-white">توصيات للمانحين والمجتمع الدولي</h3>
              <ul className="space-y-6">
                {[
                  'دعم مشاريع "السيادة التقنية" بدلاً من مجرد تمويل الاشتراكات في المنصات التجارية.',
                  'الاستثمار في تدريب الكوادر اليمنية على إدارة سرفرات الذكاء الاصطناعي محلياً.',
                  'الاعتراف بالنماذج المحلية الموثقة كمرجع أساسي للتحقق من الحقائق في اليمن.'
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-1"><Check size={16}/></div>
                    <p className="text-slate-300 font-medium leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <Footer />
        </div>
      )}

      {/* Page 4: Ethical Charter */}
      {activeSection === 'charter' && (
        <div className="space-y-16 animate-in slide-in-from-bottom-6">
          <SectionTitle 
            title="الميثاق الرقمي (Ethical Charter)" 
            subtitle="حوكمة الذكاء الاصطناعي المسؤول" 
            icon={Gavel} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: 'مبدأ الشفافية والوسم', 
                desc: 'يجب وسم كافة المحتويات المولدة أو المعالجة بواسطة الذكاء الاصطناعي بعلامة واضحة تضمن حق الجمهور في معرفة مصدر المعلومة.',
                icon: Eye
              },
              { 
                title: 'حماية الخصوصية المطلقة', 
                desc: 'منع استخدام بيانات الضحايا أو المصادر الصحفية في تدريب نماذج عامة، والالتزام بالتشفير السيادي لكافة المخرجات.',
                icon: Lock
              },
              { 
                title: 'مكافحة التحيز الرقمي', 
                desc: 'مراجعة دورية لخوارزميات YemenJPT لضمان عدم تبنيها لأي تحيزات سياسية أو مناطقية أو طائفية تضر بالنسيج الوطني.',
                icon: Fingerprint
              },
              { 
                title: 'المسؤولية الإنسانية', 
                desc: 'يبقى الذكاء الاصطناعي أداة مساعدة (Copilot)، بينما تظل المسؤولية التحريرية والقانونية النهائية على عاتق "الصحفي المحقق".',
                icon: Gavel
              }
            ].map((principle, i) => (
              <div key={i} className="p-12 bg-slate-900/60 rounded-[4rem] border border-slate-800/60 space-y-6 hover:border-[#e1b000]/40 transition-all duration-500 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#e1b000] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 bg-[#e1b000]/10 rounded-2xl flex items-center justify-center text-[#e1b000] mb-4">
                  <principle.icon size={32} />
                </div>
                <h4 className="text-2xl font-black text-white">{principle.title}</h4>
                <p className="text-slate-400 leading-relaxed font-medium">{principle.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-red-500/10 border border-red-500/20 p-12 rounded-[4rem] space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
            <h3 className="text-2xl font-black text-white flex items-center gap-4">
              <ShieldAlert size={32} className="text-red-500" /> تنبيه الحوكمة الأخلاقية
            </h3>
            <p className="text-slate-300 font-medium leading-relaxed">
              إن أي استخدام لأدوات YemenJPT في إنتاج محتوى تضليلي (Deepfakes) أو اختراق خصوصية المعارضين أو الصحفيين يعد انتهاكاً جسيماً يؤدي إلى سحب الاعتماد الرقمي فوراً والملاحقة القانونية وفق ميثاق بيت الصحافة.
            </p>
          </div>
          <Footer />
        </div>
      )}

    </div>
  );
};

export default DocsPage;
