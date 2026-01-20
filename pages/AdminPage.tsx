
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Settings, Building2, Server, Database, Cpu, Zap, Activity, HardDrive, 
  Plus, Save, RefreshCw, Layers, Key, AlertTriangle, TrendingUp, Info, 
  Users, ShieldCheck, Search, ShieldAlert, CheckCircle2, ChevronRight,
  Filter, BarChart3, Sliders, Globe, X, Edit3, Trash2, Mail, Layout, 
  Share2, Twitter, Facebook, ExternalLink, Cloud, Lock, Terminal, Box,
  PlayCircle, Fingerprint, Eye, Command, ToggleLeft, ToggleRight,
  MessageSquare, UserCheck, Globe2, ShieldPlus, ChevronLeft, Loader2, Check,
  // Added missing Bot icon import
  Bot
} from 'lucide-react';
import { UserRole, Organization, AiModelType, UsageStats, User, UserStatus, ModuleCategory, ServiceTool, CmsType, Site } from '../types';
import { AppLogoText, TOOLS, TRANSLATIONS } from '../constants';
import { cloudflare } from '../services/cloud';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orgs' | 'infra' | 'cloud' | 'ai' | 'automation'>('orgs');
  const [lang] = useState(localStorage.getItem('yemengpt_lang') || 'ar');
  const t = (key: string) => (TRANSLATIONS as any)[lang][key] || key;

  // Root Admin System State
  const [isLocalMode, setIsLocalMode] = useState(localStorage.getItem('yemengpt_sovereignty_mode') === 'LOCAL');
  const [systemDefaultModel, setSystemDefaultModel] = useState<AiModelType>((localStorage.getItem('yemengpt_system_default_model') as AiModelType) || AiModelType.FALCON_3);

  // Organizations Management State
  const [showAddOrg, setShowAddOrg] = useState(false);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisioningStep, setProvisioningStep] = useState('');
  
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: 'org1',
      name: 'مؤسسة بيت الصحافة - اليمن',
      primaryDomain: 'ph-ye.org',
      subDomain: 'yemenjpt.presshouse.raidan.pro',
      emailServiceEnabled: true,
      emailServiceStatus: 'active',
      allowedTools: TOOLS.map(t => t.id),
      sites: [
        { id: 's1', domain: 'news.ph-ye.org', cms: CmsType.WORDPRESS, status: 'active' },
        { id: 's2', domain: 'archive.ph-ye.org', cms: CmsType.TYPO3, status: 'active' }
      ],
      socialAccounts: [
        { platform: 'Twitter', handle: '@PressHouseYe', status: 'connected' },
        { platform: 'Facebook', handle: 'PressHouseYe', status: 'connected' }
      ],
      usage: { cpu: 45, ram: 12, storage: 800, apiTokens: 45000, cpuLimit: 100, ramLimit: 32, storageLimit: 2000, apiLimit: 100000 },
      config: { primaryModel: AiModelType.FALCON_3, cloudflareZoneId: '07b7642aeb119ede559e959b64939f4d' }
    }
  ]);

  // New Org Form State
  const [newOrg, setNewOrg] = useState({
    name: '',
    primaryDomain: '',
    subPrefix: '',
    selectedTools: TOOLS.map(t => t.id),
    emailEnabled: true,
    newsSiteDomain: ''
  });

  const handleToggleSovereignty = () => {
    const newMode = !isLocalMode;
    setIsLocalMode(newMode);
    localStorage.setItem('yemengpt_sovereignty_mode', newMode ? 'LOCAL' : 'CLOUD');
  };

  const handleUpdateDefaultModel = (model: AiModelType) => {
    setSystemDefaultModel(model);
    localStorage.setItem('yemengpt_system_default_model', model);
  };

  const handleCreateOrganization = async () => {
    if (!newOrg.name || !newOrg.primaryDomain || !newOrg.subPrefix) {
      alert(lang === 'ar' ? "يرجى ملء كافة الحقول الأساسية" : "Please fill all required fields");
      return;
    }

    setIsProvisioning(true);
    setProvisioningStep(lang === 'ar' ? 'جاري حجز النطاق السيادي...' : 'Provisioning Sovereign Portal...');
    
    try {
      // 1. Provision AI Portal
      const portal = await cloudflare.provisionAiPortal(newOrg.name, newOrg.subPrefix);
      
      setProvisioningStep(lang === 'ar' ? 'جاري إعداد محرك النشر الإخباري...' : 'Deploying News CMS Node...');
      
      // 2. Deploy News Site if domain provided
      let sites: Site[] = [];
      if (newOrg.newsSiteDomain) {
        await cloudflare.provisionCms(newOrg.newsSiteDomain, CmsType.WORDPRESS);
        sites.push({ id: `s-${Date.now()}`, domain: newOrg.newsSiteDomain, cms: CmsType.WORDPRESS, status: 'active' });
      }

      setProvisioningStep(lang === 'ar' ? 'جاري تفعيل خدمات البريد...' : 'Configuring Institutional Mail...');
      
      // 3. Email Config
      if (newOrg.emailEnabled) {
        await cloudflare.configureEmail(newOrg.name, newOrg.primaryDomain);
      }

      // 4. Create local object
      const org: Organization = {
        id: `org-${Date.now()}`,
        name: newOrg.name,
        primaryDomain: newOrg.primaryDomain,
        subDomain: portal.url,
        emailServiceEnabled: newOrg.emailEnabled,
        emailServiceStatus: newOrg.emailEnabled ? 'active' : 'inactive',
        allowedTools: newOrg.selectedTools,
        sites: sites,
        socialAccounts: [],
        usage: { cpu: 0, ram: 0, storage: 0, apiTokens: 0, cpuLimit: 100, ramLimit: 32, storageLimit: 1000, apiLimit: 100000 },
        config: { primaryModel: AiModelType.FALCON_3, cloudflareZoneId: 'default' }
      };

      setOrganizations(prev => [...prev, org]);
      
      setProvisioningStep(lang === 'ar' ? 'اكتمل الإعداد بنجاح!' : 'Provisioning Complete!');
      setTimeout(() => {
        setIsProvisioning(false);
        setShowAddOrg(false);
        setNewOrg({ name: '', primaryDomain: '', subPrefix: '', selectedTools: TOOLS.map(t => t.id), emailEnabled: true, newsSiteDomain: '' });
      }, 2000);

    } catch (e) {
      alert("Error during provisioning");
      setIsProvisioning(false);
    }
  };

  const toggleTool = (id: string) => {
    setNewOrg(prev => ({
      ...prev,
      selectedTools: prev.selectedTools.includes(id) 
        ? prev.selectedTools.filter(t => t !== id)
        : [...prev.selectedTools, id]
    }));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 text-start" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Root Command Banner */}
      <div className="bg-gradient-to-br from-[#00338d] via-[#020617] to-black p-12 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 p-10 opacity-10 pointer-events-none">
           <ShieldCheck size={320} className="text-[#e1b000] rotate-12" />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-28 h-28 bg-[#e1b000] rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_60px_rgba(225,176,0,0.3)] border border-white/20 ring-4 ring-white/5 group">
               <Command size={56} className="text-[#00338d] group-hover:rotate-90 transition-transform duration-700" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase">{lang === 'ar' ? 'قمرة القيادة الجذرية' : 'ROOT COMMAND CENTER'}</h1>
              <p className="text-slate-300 font-medium mt-3 text-xl opacity-80">{t('login_sub')}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 p-2 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-inner">
            {[
              { id: 'orgs', label: t('org_management'), icon: Building2 },
              { id: 'infra', label: t('infra_management'), icon: Server },
              { id: 'ai', label: t('ai_config'), icon: Cpu },
              { id: 'cloud', label: 'DNS & Domains', icon: Globe },
              { id: 'automation', label: t('automation'), icon: Zap }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)} 
                className={`px-8 py-4 rounded-3xl text-[11px] font-black flex items-center gap-3 transition-all ${activeTab === tab.id ? 'bg-[#e1b000] text-[#00338d] shadow-2xl scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <tab.icon size={18}/> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Organizations Management Dashboard */}
      {activeTab === 'orgs' && (
        <div className="space-y-10 animate-in slide-in-from-bottom">
           <div className="glass-morphism p-12 rounded-[4rem] border border-slate-800 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                 <div>
                    <h3 className="text-3xl font-black text-white">{t('org_management')}</h3>
                    <p className="text-slate-500 mt-2 font-medium">إدارة المؤسسات الشريكة، النطاقات السيادية، والخدمات الممنوحة.</p>
                 </div>
                 <button 
                    onClick={() => setShowAddOrg(true)}
                    className="bg-[#00338d] hover:bg-blue-600 text-white px-10 py-5 rounded-[2.5rem] font-black flex items-center gap-3 shadow-2xl transition-all active:scale-95"
                 >
                    <Plus size={24}/> {t('create_org')}
                 </button>
              </div>

              <div className="grid grid-cols-1 gap-10">
                 {organizations.map(org => (
                    <div key={org.id} className="p-12 bg-slate-900/40 rounded-[3.5rem] border border-slate-800 group hover:border-[#00338d]/60 transition-all flex flex-col xl:flex-row justify-between gap-12 shadow-xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-1 h-full bg-[#e1b000] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                       
                       <div className="flex-1 space-y-10">
                          <div className="flex items-center gap-8">
                             <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                                <Building2 size={36} className="text-[#e1b000]" />
                             </div>
                             <div>
                                <h4 className="text-3xl font-black text-white">{org.name}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                  <Globe2 size={14} className="text-slate-500" />
                                  <p className="text-slate-400 font-mono text-xs">{org.primaryDomain}</p>
                                </div>
                             </div>
                             <span className="mr-auto px-5 py-2 bg-emerald-500/10 text-emerald-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-inner">Active Node</span>
                          </div>
                          
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                             <div className="p-6 bg-black/40 rounded-[2rem] border border-white/5 space-y-2">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">AI Portal</p>
                                <a href={org.subDomain} target="_blank" className="text-sm font-black text-blue-400 hover:underline flex items-center gap-2 truncate">
                                   <Zap size={12}/> {org.subDomain}
                                </a>
                             </div>
                             <div className="p-6 bg-black/40 rounded-[2rem] border border-white/5 space-y-2">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Institutional Sites</p>
                                <p className="text-xl font-black text-white">{org.sites.length}</p>
                             </div>
                             <div className="p-6 bg-black/40 rounded-[2rem] border border-white/5 space-y-2">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Email Status</p>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${org.emailServiceStatus === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                                  <span className="text-xs font-black text-white uppercase">{org.emailServiceStatus}</span>
                                </div>
                             </div>
                             <div className="p-6 bg-black/40 rounded-[2rem] border border-white/5 space-y-2">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Allowed Tools</p>
                                <p className="text-xl font-black text-[#e1b000]">{org.allowedTools.length} / {TOOLS.length}</p>
                             </div>
                          </div>

                          <div className="p-6 bg-slate-950/40 rounded-[2rem] border border-slate-800">
                             <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">News Hubs</h5>
                             <div className="flex flex-wrap gap-4">
                                {org.sites.map(s => (
                                   <div key={s.id} className="flex items-center gap-3 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl">
                                      <Layout size={14} className="text-blue-400"/>
                                      <span className="text-xs font-bold text-white">{s.domain}</span>
                                      <span className="text-[8px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded uppercase font-black">{s.cms}</span>
                                   </div>
                                ))}
                                {org.sites.length === 0 && <p className="text-xs text-slate-600">No sites deployed.</p>}
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex flex-col justify-center gap-3 min-w-[240px] border-t xl:border-t-0 xl:border-r border-slate-800 pt-8 xl:pt-0 xl:pr-8">
                          <button className="w-full py-4 bg-slate-800 hover:bg-white hover:text-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">Organization Config</button>
                          <button className="w-full py-4 bg-slate-800 hover:bg-white hover:text-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">Provision Services</button>
                          <button className="w-full py-4 bg-slate-800 hover:bg-white hover:text-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">Usage Analytics</button>
                          <button className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border border-red-500/10">Disable Node</button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Add Organization Modal */}
      {showAddOrg && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in">
           <div className="w-full max-w-4xl glass-morphism border border-slate-800 rounded-[4rem] p-12 overflow-y-auto max-h-[90vh] custom-scrollbar animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-12">
                 <div className="flex items-center gap-6">
                    <div className="p-4 bg-[#00338d] text-white rounded-2xl shadow-xl">
                      <ShieldPlus size={32} />
                    </div>
                    <div className="text-start">
                      <h2 className="text-3xl font-black text-white">إضافة مؤسسة شريكة جديدة</h2>
                      <p className="text-slate-500 font-medium">إنشاء بيئة سيادية متكاملة للمؤسسة بوابتها الخاصة.</p>
                    </div>
                 </div>
                 <button onClick={() => setShowAddOrg(false)} className="text-slate-500 hover:text-white transition-colors"><X size={32}/></button>
              </div>

              {!isProvisioning ? (
                <div className="space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">اسم المؤسسة</label>
                         <input 
                           value={newOrg.name}
                           onChange={(e) => setNewOrg(prev => ({ ...prev, name: e.target.value }))}
                           placeholder="مثال: شبكة الصحافة المستقلة"
                           className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-8 py-5 text-white outline-none focus:border-[#00338d] transition-all"
                         />
                      </div>
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">النطاق الأساسي (Domain)</label>
                         <input 
                           value={newOrg.primaryDomain}
                           onChange={(e) => setNewOrg(prev => ({ ...prev, primaryDomain: e.target.value }))}
                           placeholder="example.com"
                           className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-8 py-5 text-white outline-none focus:border-[#00338d] transition-all"
                         />
                      </div>
                   </div>

                   <div className="p-10 bg-[#00338d]/5 border border-[#00338d]/20 rounded-[3rem] space-y-8">
                      <div className="flex items-center gap-4 text-[#e1b000] mb-2">
                         <Key size={24}/>
                         <h4 className="text-xl font-black uppercase">Sovereign Portal Config</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">YemenJPT Sub-Portal Prefix</label>
                            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden focus-within:border-[#00338d] transition-all">
                               <span className="px-6 py-5 bg-slate-900 text-slate-500 font-black text-sm border-l border-slate-800">yemenjpt.</span>
                               <input 
                                 value={newOrg.subPrefix}
                                 onChange={(e) => setNewOrg(prev => ({ ...prev, subPrefix: e.target.value }))}
                                 placeholder="orgname"
                                 className="flex-1 bg-transparent px-6 py-5 text-white outline-none"
                               />
                               <span className="px-6 py-5 bg-slate-900 text-slate-500 font-black text-sm border-r border-slate-800">.raidan.pro</span>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">News Site Domain (CMS)</label>
                            <input 
                              value={newOrg.newsSiteDomain}
                              onChange={(e) => setNewOrg(prev => ({ ...prev, newsSiteDomain: e.target.value }))}
                              placeholder="news.example.com"
                              className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-8 py-5 text-white outline-none focus:border-[#00338d] transition-all"
                            />
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h4 className="text-lg font-black text-white px-4">تخصيص الميزات والخدمات</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {TOOLS.map(tool => (
                            <button 
                              key={tool.id}
                              onClick={() => toggleTool(tool.id)}
                              className={`p-6 rounded-3xl border transition-all text-center flex flex-col items-center gap-3 ${newOrg.selectedTools.includes(tool.id) ? 'bg-[#00338d] border-transparent text-white shadow-xl' : 'glass-morphism border-slate-800 text-slate-500'}`}
                            >
                               <Bot size={24} />
                               <span className="text-[10px] font-black uppercase tracking-widest">{tool.name}</span>
                               {newOrg.selectedTools.includes(tool.id) && <Check size={14} className="text-[#e1b000]" />}
                            </button>
                         ))}
                         <button 
                           onClick={() => setNewOrg(prev => ({ ...prev, emailEnabled: !prev.emailEnabled }))}
                           className={`p-6 rounded-3xl border transition-all text-center flex flex-col items-center gap-3 ${newOrg.emailEnabled ? 'bg-[#00338d] border-transparent text-white shadow-xl' : 'glass-morphism border-slate-800 text-slate-500'}`}
                         >
                            <Mail size={24} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Institutional Email</span>
                            {newOrg.emailEnabled && <Check size={14} className="text-[#e1b000]" />}
                         </button>
                      </div>
                   </div>

                   <button 
                     onClick={handleCreateOrganization}
                     className="w-full py-8 bg-[#00338d] hover:bg-blue-600 text-white rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-3xl transition-all active:scale-95"
                   >
                     بدء عملية الإمداد السيادي (Provision Node)
                   </button>
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center space-y-12 animate-in fade-in">
                   <div className="relative">
                      <div className="w-32 h-32 border-4 border-[#00338d]/20 border-t-[#e1b000] rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Globe size={44} className="text-blue-500 animate-pulse" />
                      </div>
                   </div>
                   <div className="text-center space-y-4">
                      <p className="text-2xl font-black text-white uppercase tracking-widest animate-pulse">{provisioningStep}</p>
                      <p className="text-slate-500 text-sm font-medium">Preparing Sovereign Docker Containers & Cloudflare DNS Bridge...</p>
                   </div>
                   <div className="w-full max-w-md h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div className="h-full bg-gradient-to-r from-[#00338d] to-blue-500 animate-shimmer" style={{ width: '100%' }}></div>
                   </div>
                </div>
              )}
           </div>
        </div>
      )}

      {/* Infrastructure Management (Ollama Nodes) */}
      {activeTab === 'infra' && (
        <div className="glass-morphism p-12 rounded-[4rem] border border-slate-800 shadow-2xl animate-in slide-in-from-bottom">
           <div className="flex justify-between items-center mb-12">
              <h3 className="text-3xl font-black text-white">Infrastructure Clusters</h3>
              <button className="text-[#e1b000] hover:text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                 <RefreshCw size={18}/> Refresh Nodes
              </button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-slate-900/60 rounded-[3rem] border border-slate-800 space-y-6">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                       <Server size={32} className="text-blue-400" />
                       <h4 className="text-xl font-black text-white">Yemen-Alpha (Ollama)</h4>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-lg">PRIMARY</span>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase"><span>GPU Util</span> <span>45%</span></div>
                    <div className="h-2 bg-black/40 rounded-full overflow-hidden"><div className="h-full bg-[#00338d] w-[45%]"></div></div>
                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase"><span>RAM Load</span> <span>12.4GB / 32GB</span></div>
                    <div className="h-2 bg-black/40 rounded-full overflow-hidden"><div className="h-full bg-[#e1b000] w-[40%]"></div></div>
                 </div>
                 <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Node Command Shell</button>
              </div>
           </div>
        </div>
      )}

      {/* AI Config Tab (Simplified context) */}
      {activeTab === 'ai' && (
        <div className="glass-morphism p-12 rounded-[3.5rem] border border-slate-800 shadow-2xl animate-in slide-in-from-bottom">
           <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-8">
              <h3 className="text-3xl font-black text-white">{t('ai_config')}</h3>
              <div className="flex items-center gap-4 bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
                 <span className={`text-xs font-black uppercase tracking-widest ${isLocalMode ? 'text-[#e1b000]' : 'text-slate-500'}`}>Local</span>
                 <button onClick={handleToggleSovereignty} className="text-blue-500 hover:scale-110 transition-transform">
                    {isLocalMode ? <ToggleLeft size={44} /> : <ToggleRight size={44} className="text-[#00338d]" />}
                 </button>
                 <span className={`text-xs font-black uppercase tracking-widest ${!isLocalMode ? 'text-[#00338d]' : 'text-slate-500'}`}>Cloud</span>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.values(AiModelType).map(model => (
                 <button 
                    key={model}
                    onClick={() => handleUpdateDefaultModel(model)}
                    className={`p-10 rounded-[3rem] border transition-all text-start relative group shadow-xl ${systemDefaultModel === model ? 'bg-[#00338d]/20 border-[#e1b000] shadow-[#e1b000]/5' : 'glass-morphism border-slate-800 hover:border-slate-700'}`}
                 >
                    {systemDefaultModel === model && <div className="absolute top-8 right-8 text-[#e1b000]"><CheckCircle2 size={24}/></div>}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${systemDefaultModel === model ? 'bg-[#e1b000] text-[#00338d]' : 'bg-slate-800 text-slate-400'}`}>
                       <Cpu size={28} />
                    </div>
                    <h4 className="text-white font-black text-xl mb-3">{model}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                       {model.includes('Falcon') || model.includes('Jais') ? 'Sovereign local model for secure processing.' : 'Cloud-based model with massive reasoning scale.'}
                    </p>
                 </button>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
