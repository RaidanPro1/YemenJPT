
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const lang = 'ar';
  const t = (key: string) => (TRANSLATIONS as any)[lang][key] || key;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
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

  return (
    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-24 items-center animate-in zoom-in-95 duration-700 font-ar" dir="rtl">
      <div className="hidden lg:flex flex-col space-y-16 text-right">
         <div className="space-y-10">
            <div className="flex flex-row-reverse items-center gap-8">
               <div className="w-28 h-28 bg-[#00338d] rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden group">
                  <Fingerprint size={56} className="text-white relative z-10 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-white/10 blur-xl group-hover:bg-white/20 transition-all"></div>
               </div>
               <h1 className="text-8xl font-black text-white tracking-tighter uppercase leading-none"><AppLogoText /></h1>
            </div>
            <div className="space-y-2">
               <p className="text-[#e1b000] text-sm font-black uppercase tracking-[0.5em]">{APP_FULL_NAME}</p>
               <p className="text-xs font-bold text-slate-500 border-t border-slate-800 pt-4">{SLOGAN}</p>
            </div>
            <h2 className="text-lg font-bold text-slate-400 leading-relaxed max-w-md border-r-2 border-[#00338d] pr-6 mt-4 opacity-80">{t('login_sub')}</h2>
         </div>
         <div className="grid grid-cols-2 gap-10">
            <div className="p-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-6 group hover:border-[#00338d]/30 transition-all duration-500">
               <ShieldCheck size={44} className="text-[#00338d] group-hover:rotate-12 transition-transform" />
               <h4 className="text-white font-black text-xl uppercase">تشفير ريـدان</h4>
               <p className="text-slate-500 text-sm leading-relaxed">حماية كاملة للبيانات والوثائق الصحفية بمعايير Raidan-Shield.</p>
            </div>
            <div className="p-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-6 group hover:border-[#e1b000]/30 transition-all duration-500">
               <Cpu size={44} className="text-[#e1b000] group-hover:rotate-12 transition-transform" />
               <h4 className="text-white font-black text-xl uppercase">معالجة سيادية</h4>
               <p className="text-slate-500 text-sm leading-relaxed">بنية تحتية موزعة تضمن بقاء المعرفة داخل حدود المؤسسة.</p>
            </div>
         </div>
      </div>

      <div className="glass-morphism p-16 rounded-[4.5rem] border border-slate-800 shadow-[0_60px_120px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col min-h-[700px]">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00338d] to-transparent opacity-30"></div>
        
        <div className="flex justify-center mb-12">
          <div className="bg-slate-900/80 p-1.5 rounded-3xl border border-slate-800 flex flex-row-reverse gap-2">
            <button 
              onClick={() => { setMode('login'); setError(''); }}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'login' ? 'bg-[#00338d] text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
            >
              دخول الهوية
            </button>
            <button 
              onClick={() => { setMode('register'); setError(''); }}
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
                 <p className="text-[#e1b000] text-xs font-black uppercase tracking-[0.3em]">بوابة ريـدان برو السيادية</p>
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
              <button disabled={isLoading} className="w-full bg-[#00338d] hover:bg-blue-800 text-white font-black py-7 rounded-[2.5rem] shadow-3xl flex items-center justify-center gap-6 active:scale-95 transition-all text-lg uppercase tracking-widest group">
                {isLoading ? <Loader2 className="animate-spin w-8 h-8 text-[#e1b000]" /> : <>{t('login_btn')} <LogIn size={24} className="rotate-180" /></>}
              </button>
            </form>

            <div className="space-y-8 mt-10">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-800"></div>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">الدخول عبر الهوية المشتركة</span>
                <div className="h-px flex-1 bg-slate-800"></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[Chrome, Facebook, Twitter, Github].map((Icon, i) => (
                  <button key={i} className="h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-500 hover:text-[#e1b000] hover:border-[#e1b000]/30 transition-all shadow-lg active:scale-90">
                    <Icon size={24} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 space-y-8">
             <div className="w-20 h-20 bg-[#e1b000]/10 rounded-full flex items-center justify-center mx-auto text-[#e1b000]">
                <UserPlus size={40} />
             </div>
             <h3 className="text-2xl font-black text-white">طلب اعتماد جديد</h3>
             <p className="text-slate-500 max-w-xs mx-auto">بوابة الاعتماد مغلقة حالياً للعموم. يرجى التواصل مع مسؤول النظام في مؤسستك.</p>
             <button onClick={() => setMode('login')} className="bg-[#00338d] text-white px-10 py-4 rounded-2xl font-black text-xs">العودة للدخول</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
