
import React, { useState } from 'react';
import { ShieldCheck, Lock, ShieldAlert, Chrome, Facebook, Github, Key, Zap } from 'lucide-react';
import { SecuritySettings } from '../../types';

const AdminSecurity: React.FC = () => {
  const [security, setSecurity] = useState<SecuritySettings>({
    isPanicModeActive: false,
    authProviders: [
      { name: 'google', isEnabled: true, clientId: '938...googleusercontent.com', clientSecret: '••••••••' },
      { name: 'facebook', isEnabled: false, clientId: '', clientSecret: '' }
    ]
  });

  const togglePanic = () => {
    if (window.confirm('تنبيه: سيؤدي تفعيل Panic Mode إلى تصفير كافة جلسات العمل المفتوحة وتغيير الواجهة إلى وضع التمويه (Camouflage). هل أنت متأكد؟')) {
      setSecurity({...security, isPanicModeActive: !security.isPanicModeActive});
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in max-w-5xl mx-auto">
      <div className="bg-red-500/10 border border-red-500/20 p-10 rounded-[4rem] flex flex-col md:flex-row-reverse justify-between items-center gap-10">
        <div className="text-right">
          <h2 className="text-3xl font-black text-red-500 flex items-center gap-4 justify-end">
            بروتوكول الطوارئ (Panic Button) <ShieldAlert size={40} />
          </h2>
          <p className="text-slate-400 mt-2">تفعيل وضع التمويه السيادي وإغلاق كافة مداخل المنظومة فوراً.</p>
        </div>
        <button onClick={togglePanic} className={`px-16 py-6 rounded-3xl font-black text-xl shadow-2xl transition-all ${security.isPanicModeActive ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-900 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/30'}`}>
          {security.isPanicModeActive ? 'تعطيل وضع الطوارئ' : 'تفعيل Panic Mode'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-morphism p-10 rounded-[3rem] border border-slate-800 space-y-8">
          <h3 className="text-xl font-black text-white flex items-center gap-3 justify-end border-b border-slate-800 pb-4">
            الولوج الاجتماعي الموحد (SSO) <Key size={20} className="text-[#e1b000]" />
          </h3>
          <div className="space-y-6">
            {security.authProviders.map((provider, idx) => (
              <div key={idx} className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex flex-row-reverse justify-between items-center">
                   <div className="flex flex-row-reverse items-center gap-3">
                      {provider.name === 'google' ? <Chrome size={20} className="text-red-500" /> : <Facebook size={20} className="text-blue-500" />}
                      <span className="text-white font-black uppercase text-xs">{provider.name} Logic</span>
                   </div>
                   <button onClick={() => {
                     const newProviders = [...security.authProviders];
                     newProviders[idx].isEnabled = !newProviders[idx].isEnabled;
                     setSecurity({...security, authProviders: newProviders});
                   }} className={`w-12 h-6 rounded-full transition-all relative ${provider.isEnabled ? 'bg-[#00338d] shadow-[0_0_10px_rgba(0,51,141,0.4)]' : 'bg-slate-800'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${provider.isEnabled ? 'right-1' : 'left-1'}`} />
                   </button>
                </div>
                {provider.isEnabled && (
                  <div className="space-y-4 animate-in slide-in-from-top-2">
                    <input className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-[10px] text-white font-mono" defaultValue={provider.clientId} placeholder="Client ID" />
                    <input type="password" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-[10px] text-white font-mono" defaultValue={provider.clientSecret} placeholder="Client Secret" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-morphism p-10 rounded-[3rem] border border-slate-800 space-y-8">
           <h3 className="text-xl font-black text-white text-right border-b border-slate-800 pb-4">سياسات كلمات المرور <Lock size={20} className="text-[#e1b000] inline-block ml-3" /></h3>
           <div className="space-y-4">
              {[
                { label: 'تفعيل المصادقة الثنائية (2FA) إجبارياً للـ Root', enabled: true },
                { label: 'تغيير كلمة المرور كل 30 يوماً', enabled: false },
                { label: 'تسجيل كافة محاولات الولوج في سجل النزاهة', enabled: true }
              ].map((p, i) => (
                <div key={i} className="flex flex-row-reverse justify-between items-center p-4 hover:bg-white/5 rounded-xl transition-colors">
                  <span className="text-xs text-slate-400">{p.label}</span>
                  <div className={`w-10 h-5 rounded-full ${p.enabled ? 'bg-blue-600' : 'bg-slate-800'} relative`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white ${p.enabled ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurity;
