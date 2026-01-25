
import React, { useState, useEffect } from 'react';
import { 
  Save, Upload, Palette, Image as ImageIcon, Type, 
  LayoutTemplate, Check, Monitor, Smartphone, Globe,
  RefreshCw, Sparkles, SlidersHorizontal, Eye
} from 'lucide-react';
import { GlobalSettings } from '../../types';

const AdminCMS: React.FC = () => {
  const [settings, setSettings] = useState<GlobalSettings>({
    brandName: 'RaidanPro',
    logoUrl: 'logo.png',
    heroTitle: 'هندسة المرونة في <span class="text-[#e1b000]">عالم متغير</span>',
    heroSubtitle: 'نحول التحديات المعقدة إلى فرص مستدامة. شريكك الاستراتيجي في الاتصال والتحول الرقمي منذ 2011.',
    footerText: '© 2026 RaidanPro Communications | Developed for Press House Foundation',
    primaryColor: '#0d9488',
    whatsappNumber: '967772662106'
  });

  const [isPublishing, setIsPublishing] = useState(false);
  const [activePreview, setActivePreview] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    const saved = localStorage.getItem('raidan_global_settings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    setIsPublishing(true);
    setTimeout(() => {
      localStorage.setItem('raidan_global_settings', JSON.stringify(settings));
      setIsPublishing(false);
      // Conceptually trigger a refresh of the static landing page
      alert('تم نشر التغييرات بنجاح إلى raidan.pro');
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in pb-20">
      {/* Header Panel */}
      <div className="bg-gradient-to-br from-[#00338d] via-[#020617] to-black p-12 rounded-[4.5rem] border border-white/5 shadow-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#00338d]/20 blur-[120px] rounded-full"></div>
        <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-10 relative z-10">
          <div className="text-right">
            <h1 className="text-5xl font-black text-white flex flex-row-reverse items-center gap-6 justify-end uppercase tracking-tighter leading-none">
               تخصيص الهوية (God Mode) <Palette size={48} className="text-[#e1b000]" />
            </h1>
            <p className="text-[#e1b000] font-black mt-4 text-lg uppercase tracking-widest opacity-80 leading-none">CMS: Visual Identity Control Center</p>
          </div>
          <button 
            onClick={handleSave} 
            disabled={isPublishing}
            className="bg-[#00338d] hover:bg-blue-600 text-white px-16 py-6 rounded-[2.5rem] font-black text-lg shadow-3xl flex items-center gap-4 transition-all active:scale-95 disabled:opacity-50"
          >
            {isPublishing ? <RefreshCw size={24} className="animate-spin" /> : <Sparkles size={24} className="text-[#e1b000]" />}
            نشر التغييرات الحية
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Editor Panel */}
        <div className="xl:col-span-5 space-y-8">
          <div className="glass-morphism p-10 rounded-[3.5rem] border border-slate-800 space-y-10 shadow-2xl">
            <div className="flex flex-row-reverse items-center justify-between border-b border-slate-800 pb-6">
              <h3 className="text-2xl font-black text-white flex flex-row-reverse items-center gap-3 uppercase tracking-widest">
                 البصمة البصرية <ImageIcon size={24} className="text-blue-500" />
              </h3>
              <SlidersHorizontal size={20} className="text-slate-600" />
            </div>

            <div className="space-y-8">
              <div className="space-y-3 text-right">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] pr-4">اسم المنظومة (Main Brand)</label>
                <input value={settings.brandName} onChange={e => setSettings({...settings, brandName: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-8 py-5 text-white font-bold outline-none focus:border-[#00338d] transition-all shadow-inner" />
              </div>

              <div className="space-y-3 text-right">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] pr-4">عنوان الهيرو (Dynamic HTML)</label>
                <input value={settings.heroTitle} onChange={e => setSettings({...settings, heroTitle: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-8 py-5 text-white outline-none focus:border-[#00338d] transition-all shadow-inner" />
              </div>

              <div className="space-y-3 text-right">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] pr-4">الوصف الفرعي (Meta / Subtitle)</label>
                <textarea value={settings.heroSubtitle} onChange={e => setSettings({...settings, heroSubtitle: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-[2.5rem] px-8 py-6 text-slate-300 outline-none focus:border-[#00338d] transition-all shadow-inner min-h-[140px] leading-relaxed" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3 text-right">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-4">اللون الرئيسي</label>
                  <div className="flex gap-4 p-2 bg-slate-950 border border-slate-800 rounded-2xl">
                    <input type="color" value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})} className="w-16 h-12 bg-transparent border-none cursor-pointer rounded-xl" />
                    <input value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})} className="flex-1 bg-transparent text-white font-mono text-xs outline-none" />
                  </div>
                </div>
                <div className="space-y-3 text-right">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-4">واتساب الدعم</label>
                  <input value={settings.whatsappNumber} onChange={e => setSettings({...settings, whatsappNumber: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white text-xs outline-none focus:border-[#00338d]" />
                </div>
              </div>

              <div className="bg-slate-900/50 p-8 rounded-[3rem] border border-slate-800 border-dashed space-y-6">
                <div className="flex flex-row-reverse items-center justify-between">
                  <div className="text-right">
                    <p className="text-xs font-black text-white">تحميل الشعار (Logo)</p>
                    <p className="text-[9px] text-slate-500 font-bold mt-1">SVG / PNG transparent recommended</p>
                  </div>
                  <button className="p-4 bg-[#00338d] rounded-2xl text-white hover:bg-blue-600 transition-all shadow-xl"><Upload size={24} /></button>
                </div>
                <div className="h-32 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-6 shadow-inner relative group overflow-hidden">
                   <img src={settings.logoUrl} className="max-h-full max-w-full drop-shadow-2xl group-hover:scale-110 transition-transform" alt="Logo Preview" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">Update Logo</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="xl:col-span-7 flex flex-col space-y-6">
          <div className="flex flex-row-reverse items-center justify-between px-10">
            <h4 className="text-sm font-black text-slate-500 uppercase tracking-[0.4em]">المعاينة الحية (raidan.pro)</h4>
            <div className="bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 flex flex-row-reverse gap-2">
               <button onClick={() => setActivePreview('desktop')} className={`p-2 rounded-xl transition-all ${activePreview === 'desktop' ? 'bg-[#00338d] text-white' : 'text-slate-600'}`}><Monitor size={18}/></button>
               <button onClick={() => setActivePreview('mobile')} className={`p-2 rounded-xl transition-all ${activePreview === 'mobile' ? 'bg-[#00338d] text-white' : 'text-slate-600'}`}><Smartphone size={18}/></button>
            </div>
          </div>

          <div className={`flex-1 transition-all duration-700 mx-auto ${activePreview === 'mobile' ? 'max-w-[400px]' : 'w-full'}`}>
             <div className="bg-slate-200 rounded-[4rem] border-[12px] border-slate-900 h-[800px] overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.6)] relative">
                {/* Browser UI Sim */}
                <div className="absolute top-0 w-full h-10 bg-slate-950 flex items-center px-10 gap-3 z-20">
                   <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                   </div>
                   <div className="flex-1 mx-10 h-6 bg-slate-900 rounded-full flex items-center px-4">
                      <span className="text-[8px] text-slate-600 font-mono">https://raidan.pro</span>
                   </div>
                   <RefreshCw size={12} className="text-slate-700" />
                </div>

                {/* Mock Page Content */}
                <div className="h-full bg-white pt-10 overflow-y-auto custom-scrollbar relative">
                   <header className="h-20 border-b border-slate-100 flex items-center justify-between px-10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm" style={{ backgroundColor: settings.primaryColor }}>
                           {settings.brandName[0]}
                        </div>
                        <span className="font-black text-slate-800">{settings.brandName}</span>
                      </div>
                      <div className="flex gap-4">
                         <div className="w-10 h-2 bg-slate-100 rounded-full"></div>
                         <div className="w-10 h-2 bg-slate-100 rounded-full"></div>
                      </div>
                   </header>

                   <section className="py-24 px-10 text-center space-y-8">
                      <h2 className="text-4xl font-black text-slate-900 leading-tight" dangerouslySetInnerHTML={{ __html: settings.heroTitle }}></h2>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto font-medium italic">"{settings.heroSubtitle}"</p>
                      <div className="flex justify-center gap-3 pt-6">
                         <div className="px-8 py-3 rounded-xl text-white font-black text-[10px]" style={{ backgroundColor: '#0f172a' }}>اكتشف حلولنا</div>
                         <div className="px-8 py-3 rounded-xl border-2 border-slate-100 text-slate-500 font-black text-[10px]">الورقة التقنية</div>
                      </div>
                   </section>

                   {/* Services Sim */}
                   <section className="py-16 px-10 bg-slate-50 border-t border-slate-100 space-y-10">
                      <div className="w-40 h-4 bg-slate-200 rounded-full mx-auto"></div>
                      <div className="grid grid-cols-2 gap-4">
                        {[1,2].map(i => (
                          <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3 text-right">
                            <div className="w-8 h-8 rounded-xl bg-slate-100"></div>
                            <div className="w-full h-3 bg-slate-200 rounded-full"></div>
                            <div className="w-3/4 h-2 bg-slate-100 rounded-full"></div>
                          </div>
                        ))}
                      </div>
                   </section>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCMS;
