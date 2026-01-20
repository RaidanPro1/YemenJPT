
import React, { useState } from 'react';
import { 
  LogIn, Shield, AlertCircle, Bot, ShieldCheck, Twitter, Github, 
  Youtube, Facebook, Chrome, Globe, Key, Lock, Cpu, Cloud, Layout,
  MessageSquare, UserCircle, Loader2, Fingerprint, Languages, UserPlus, Building2, User as UserIcon,
  MessageCircle, Phone, Send, Info, Instagram
} from 'lucide-react';
import { UserRole } from '../types';
import { AppLogoText, TRANSLATIONS, APP_FULL_NAME, SLOGAN } from '../constants';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [registerType, setRegisterType] = useState<'individual' | 'organization'>('individual');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  
  const lang = 'ar';
  const t = (key: string) => (TRANSLATIONS as any)[lang][key] || key;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // منطق التحقق السيادي
      if (email === 'root' && password === 'admin123') {
        onLogin(UserRole.ADMIN);
      } else if (email && password) {
         onLogin(UserRole.JOURNALIST);
      } else {
        setError('فشل التحقق السيادي: الهوية الرقمية أو المفتاح غير معتمد.');
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRequestSent(true);
    }, 2000);
  };

  return (
    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-24 items-center animate-in zoom-in-95 duration-700 font-ar" dir="rtl">
      {/* الجانب المعرفي للمنظومة */}
      <div className="hidden lg:flex flex-col space-y-16 text-right">
         <div className="space-y-10">
            <div className="flex flex-row-reverse items-center gap-8">
               <div className="w-28 h-28 bg-[#00338d] rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden group">
                  <Fingerprint size={56} className="text-[#e1b000] relative z-10 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#e1b000]/10 blur-xl group-hover:bg-[#e1b000]/20 transition-all"></div>
               </div>
               <h1 className="text-8xl font-black text-white tracking-tighter uppercase leading-none"><AppLogoText /></h1>
            </div>
            <div className="space-y-2">
               <p className="text-[#e1b000] text-sm font-black uppercase tracking-[0.5em]">{APP_FULL_NAME}</p>
               <p className="text-xs font-bold text-slate-500 border-t border-slate-800 pt-4">{SLOGAN}</p>
            </div>
            <h2 className="text-lg font-bold text-slate-400 leading-relaxed max-w-md border-r-2 border-[#e1b000] pr-6 mt-4 opacity-80">{t('login_sub')}</h2>
         </div>
         <div className="grid grid-cols-2 gap-10">
            <div className="p-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-6 group hover:border-emerald-500/30 transition-all duration-500">
               <ShieldCheck size={44} className="text-emerald-500 group-hover:rotate-12 transition-transform" />
               <h4 className="text-white font-black text-xl uppercase">تشفير سيادي</h4>
               <p className="text-slate-500 text-sm leading-relaxed">حماية كاملة للبيانات والوثائق الصحفية بمعايير AES-256 GCM.</p>
            </div>
            <div className="p-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-6 group hover:border-blue-500/30 transition-all duration-500">
               <Cpu size={44} className="text-blue-500 group-hover:rotate-12 transition-transform" />
               <h4 className="text-white font-black text-xl uppercase">معالجة هجينة</h4>
               <p className="text-slate-500 text-sm leading-relaxed">ربط ذكي بين الذكاء الاصطناعي السحابي والمعالجة المحلية المعزولة.</p>
            </div>
         </div>
      </div>

      {/* نموذج الدخول والاعتماد */}
      <div className="glass-morphism p-16 rounded-[4.5rem] border border-slate-800 shadow-[0_60px_120px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col min-h-[900px]">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00338d] to-transparent opacity-30"></div>
        
        <div className="flex justify-center mb-12">
          <div className="bg-slate-900/80 p-1.5 rounded-3xl border border-slate-800 flex flex-row-reverse gap-2">
            <button 
              onClick={() => { setMode('login'); setError(''); setRequestSent(false); }}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'login' ? 'bg-[#00338d] text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
            >
              دخول الهوية
            </button>
            <button 
              onClick={() => { setMode('register'); setError(''); setRequestSent(false); }}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'register' ? 'bg-[#00338d] text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
            >
              طلب اعتماد
            </button>
          </div>
        </div>

        {mode === 'login' ? (
          <div className="space-y-10 animate-in fade-in flex flex-col flex-1">
            <form onSubmit={handleLogin} className="space-y-10">
              <div className="text-center mb-10">
                 <h3 className="text-4xl font-black text-white tracking-tighter uppercase mb-4">{t('login_title')}</h3>
                 <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">بوابة العبور السيادية لليمن</p>
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] pr-4">{t('email_label')}</label>
                 <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="معرف الصحفي / الكيان المؤسسي" className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-10 py-6 text-white text-lg focus:border-[#00338d] outline-none transition-all shadow-inner text-right" required />
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] pr-4">{t('pass_label')}</label>
                 <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-10 py-6 text-white text-lg focus:border-[#00338d] outline-none transition-all shadow-inner text-right" required />
              </div>
              {error && <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex flex-row-reverse items-center gap-4 text-red-500 text-sm font-bold animate-pulse"><AlertCircle size={22}/> {error}</div>}
              <button disabled={isLoading} className="w-full bg-[#00338d] hover:bg-blue-600 text-white font-black py-7 rounded-[2.5rem] shadow-3xl flex items-center justify-center gap-6 active:scale-95 transition-all text-lg uppercase tracking-widest group">
                {isLoading ? <Loader2 className="animate-spin w-8 h-8" /> : <>{t('login_btn')} <LogIn size={24} className="rotate-180" /></>}
              </button>
            </form>

            <div className="space-y-8 mt-10">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-800"></div>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">الدخول عبر الهوية المشتركة</span>
                <div className="h-px flex-1 bg-slate-800"></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: Chrome, color: 'hover:text-red-500 hover:border-red-500/30' },
                  { icon: Facebook, color: 'hover:text-blue-500 hover:border-blue-500/30' },
                  { icon: Twitter, color: 'hover:text-blue-400 hover:border-blue-400/30' },
                  { icon: Github, color: 'hover:text-white hover:border-white/30' }
                ].map((social, i) => (
                  <button key={i} className={`h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-500 transition-all shadow-lg active:scale-90 ${social.color}`}>
                    <social.icon size={24} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : requestSent ? (
          <div className="space-y-10 animate-in zoom-in text-center py-10 flex-1 flex flex-col justify-center">
             <div className="w-24 h-24 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto border border-emerald-500/20 text-emerald-500 mb-8">
                <ShieldCheck size={48} />
             </div>
             <h3 className="text-3xl font-black text-white">{t('pending_approval')}</h3>
             <p className="text-slate-400 font-medium">سيتم مراجعة بياناتك والتحقق من هويتك المهنية خلال 24 ساعة.</p>
             <button onClick={() => setMode('login')} className="px-10 py-4 bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-700 transition-all mt-8">العودة للدخول</button>
          </div>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-8 animate-in slide-in-from-bottom duration-500 flex-1">
            <div className="text-center mb-8">
               <h3 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">{t('register_title')}</h3>
               <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">الاعتماد المؤسسي الرسمي</p>
            </div>

            <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 mb-6">
              <button 
                type="button"
                onClick={() => setRegisterType('individual')} 
                className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2 ${registerType === 'individual' ? 'bg-[#00338d] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                <UserIcon size={14} /> {t('register_type_ind')}
              </button>
              <button 
                type="button"
                onClick={() => setRegisterType('organization')} 
                className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2 ${registerType === 'organization' ? 'bg-[#00338d] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                <Building2 size={14} /> {t('register_type_inst')}
              </button>
            </div>

            <div className="space-y-4">
               <div className="relative">
                  <UserIcon size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder={registerType === 'individual' ? "الاسم الكامل للصحفي" : "اسم المؤسسة / المركز الإعلامي"} className="w-full bg-slate-950 border border-slate-800 rounded-3xl pr-16 pl-6 py-5 text-white text-md outline-none text-right focus:border-[#00338d] transition-all" required />
               </div>
               <div className="relative">
                  <Globe size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder={registerType === 'individual' ? "جهة العمل أو الرابط الشخصي" : "الموقع الرسمي للمؤسسة"} className="w-full bg-slate-950 border border-slate-800 rounded-3xl pr-16 pl-6 py-5 text-white text-md outline-none text-right focus:border-[#00338d] transition-all" required />
               </div>
               <div className="relative">
                  <Phone size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="tel" placeholder="رقم الهاتف للتواصل (واتساب)" className="w-full bg-slate-950 border border-slate-800 rounded-3xl pr-16 pl-6 py-5 text-white text-md outline-none text-right focus:border-[#00338d] transition-all font-en" required />
               </div>
            </div>

            <div className="p-6 bg-[#00338d]/5 border border-[#00338d]/10 rounded-3xl flex items-start gap-4">
               <input type="checkbox" id="terms" className="mt-1 accent-[#00338d]" required />
               <label htmlFor="terms" className="text-[10px] text-slate-400 leading-relaxed text-right flex-1 cursor-pointer">{t('agree_terms')}</label>
            </div>

            <button disabled={isLoading} className="w-full bg-[#e1b000] text-[#00338d] font-black py-7 rounded-[2.5rem] shadow-3xl text-lg uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-yellow-500 transition-all active:scale-95">
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : <>إرسال طلب الاعتماد <Send size={20} className="rotate-180"/></>}
            </button>
          </form>
        )}

        {/* أيقونة واتساب للتواصل الفوري (بدون نصوص كما هو مطلوب) */}
        <div className="mt-auto pt-10 border-t border-slate-800/50 flex justify-center">
           <a 
              href="https://wa.me/967784606083" 
              target="_blank" 
              rel="noopener noreferrer"
              title="دعم فوري عبر واتساب"
              className="w-24 h-24 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center transition-all shadow-[0_25px_50px_rgba(5,150,105,0.4)] active:scale-90 group relative"
            >
              <MessageCircle size={44} className="group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-4 border-[#020617] animate-pulse"></div>
              {/* تلميح صغير يظهر عند المرور */}
              <div className="absolute bottom-full mb-4 px-4 py-2 bg-slate-900 border border-slate-800 text-white text-[9px] font-black rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-widest">
                Urgent Support Node
              </div>
           </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
