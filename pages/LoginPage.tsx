
import React, { useState, useContext } from 'react';
import { 
  LogIn, Shield, AlertCircle, Bot, ShieldCheck, Twitter, Github, 
  Youtube, Facebook, Chrome, Globe, Key, Lock, Cpu, Cloud, Layout,
  MessageSquare, UserCircle, Loader2, Fingerprint, Languages
} from 'lucide-react';
import { UserRole } from '../types';
import { AppLogoText, TRANSLATIONS, APP_FULL_NAME } from '../constants';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const lang = localStorage.getItem('yemengpt_lang') || 'ar';

  // @ts-ignore
  const t = (key: string) => TRANSLATIONS[lang][key] || key;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Secure Root Admin credentials simulation
    setTimeout(() => {
      if (email === 'admin@ph-ye.org' && password === 'admin123') {
        onLogin(UserRole.ADMIN);
      } else if (email && password) {
         onLogin(UserRole.JOURNALIST); // Default for any valid input for testing
      } else {
        setError(lang === 'ar' ? 'بيانات الدخول غير صحيحة.' : 'Unauthorized credentials.');
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleSocialLogin = (platform: string) => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin(UserRole.JOURNALIST);
    }, 1000);
  };

  return (
    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-24 items-center animate-in zoom-in-95 duration-700" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="hidden lg:flex flex-col space-y-16 text-start">
         <div className="space-y-10">
            <div className="flex items-center gap-8">
               <div className="w-28 h-28 bg-[#00338d] rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden group">
                  <Fingerprint size={56} className="text-[#e1b000] relative z-10 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#e1b000]/10 blur-xl group-hover:bg-[#e1b000]/20 transition-all"></div>
               </div>
               <h1 className="text-8xl font-black text-white tracking-tighter uppercase leading-none"><AppLogoText /></h1>
            </div>
            <p className="text-[#e1b000] text-sm font-black uppercase tracking-[0.5em]">{APP_FULL_NAME}</p>
            <h2 className="text-5xl font-black text-white leading-tight">{t('login_sub')}</h2>
         </div>
         <div className="grid grid-cols-2 gap-10">
            <div className="p-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-6 group hover:border-emerald-500/30 transition-all duration-500">
               <ShieldCheck size={44} className="text-emerald-500 group-hover:rotate-12 transition-transform" />
               <h4 className="text-white font-black text-xl uppercase">Sovereign E2EE</h4>
               <p className="text-slate-500 text-sm leading-relaxed">تشفير كامل للبيانات الصحفية الحساسة بمعايير عسكرية.</p>
            </div>
            <div className="p-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/5 space-y-6 group hover:border-blue-500/30 transition-all duration-500">
               <Cpu size={44} className="text-blue-500 group-hover:rotate-12 transition-transform" />
               <h4 className="text-white font-black text-xl uppercase">Hybrid AI Hub</h4>
               <p className="text-slate-500 text-sm leading-relaxed">ربط سيادي فائق السرعة بين المحركات المحلية والسحابية.</p>
            </div>
         </div>
      </div>

      <div className="glass-morphism p-16 rounded-[4.5rem] border border-slate-800 shadow-[0_60px_120px_rgba(0,0,0,0.8)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00338d] to-transparent opacity-30"></div>
        <div className="text-center mb-16">
           <div className="w-24 h-24 bg-slate-900 rounded-[2.2rem] mx-auto mb-10 flex items-center justify-center border border-slate-800 shadow-inner group relative">
              <Lock size={40} className="text-[#e1b000] group-hover:rotate-12 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#e1b000]/5 rounded-full blur-xl group-hover:bg-[#e1b000]/10 transition-all"></div>
           </div>
           <h3 className="text-4xl font-black text-white tracking-tighter uppercase mb-4">{t('login_title')}</h3>
           <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">Institutional Root Entry Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-10">
          <div className="space-y-4">
             <label className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] px-4">{t('email_label')}</label>
             <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="admin@ph-ye.org" className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-10 py-6 text-white text-lg focus:border-[#00338d] outline-none transition-all shadow-inner" />
          </div>
          <div className="space-y-4">
             <label className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] px-4">{t('pass_label')}</label>
             <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-10 py-6 text-white text-lg focus:border-[#00338d] outline-none transition-all shadow-inner" />
          </div>
          {error && <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500 text-sm font-bold animate-pulse"><AlertCircle size={22}/> {error}</div>}
          <button disabled={isLoading} className="w-full bg-[#00338d] hover:bg-blue-600 text-white font-black py-7 rounded-[2.5rem] shadow-3xl flex items-center justify-center gap-6 active:scale-95 transition-all text-lg uppercase tracking-widest relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            {isLoading ? <Loader2 className="animate-spin w-8 h-8" /> : <>{t('login_btn')} <LogIn size={24} /></>}
          </button>
        </form>

        <div className="mt-16 space-y-10">
           <div className="flex items-center gap-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <div className="h-px flex-1 bg-slate-800"></div>
              <span>{t('social_login_bridge')}</span>
              <div className="h-px flex-1 bg-slate-800"></div>
           </div>
           <div className="grid grid-cols-4 gap-6">
              {[
                { Icon: Chrome, label: 'Google' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'X' },
                { Icon: Github, label: 'GitHub' }
              ].map((plat, i) => (
                <button key={i} onClick={() => handleSocialLogin(plat.label)} className="p-6 bg-slate-900 border border-slate-800 rounded-[1.8rem] flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 text-slate-500 shadow-xl group hover:scale-105 active:scale-95">
                   <plat.Icon size={28} className="group-hover:scale-110 transition-transform duration-500"/>
                </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
