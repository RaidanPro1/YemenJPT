
import React, { useState, useEffect } from 'react';
import { 
  Settings, Building2, Server, Database, Cpu, Zap, Activity, HardDrive, 
  Plus, RefreshCw, Globe, X, Layout, ShieldPlus, Check, Bot, 
  Trash, CheckCircle, PenTool, Navigation, Mic, MapPin, Code, 
  Briefcase, Search, User as UserIcon, FileSearch, ImageIcon, Archive, 
  LayoutDashboard, Radio, ShieldCheck, Command, Terminal, Box, ExternalLink,
  Loader2, AlertTriangle, Fingerprint, Workflow, Sliders, Layers, Edit3, 
  Play, Pause, Save, Globe2, Mail, ArrowRight, Share2, MousePointer2, LogIn, 
  UserPlus, ShieldAlert, ToggleLeft, ToggleRight, MoreVertical, History, Package,
  Users, CheckCircle2, XCircle, Key, Lock, MonitorCheck, PlusCircle, GlobeIcon,
  Twitter, Facebook, Send, BarChart3, SlidersHorizontal, Trash2
} from 'lucide-react';
import { 
  UserRole, Organization, AiModelType, ModuleCategory, 
  User, UserStatus, ServiceTool, TenantType, TenantStatus,
  TenantSite, TenantPortal, ApiVaultItem
} from '../types';
import { TOOLS, APP_FULL_NAME } from '../constants';
import { gemini } from '../services/gemini';
import { tenantProvisioner } from '../services/provisioning';

const OrgDetailManager = ({ org, onBack }: { org: Organization, onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sites' | 'portals' | 'social' | 'api' | 'resources'>('overview');

  const TabButton = ({ id, label, icon: Icon }: { id: any, label: string, icon: any }) => (
    <button 
      onClick={() => setActiveTab(id)} 
      className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === id ? 'bg-[#00338d] text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
    >
      <Icon size={14} /> {label}
    </button>
  );

  return (
    <div className="glass-morphism p-12 rounded-[4rem] border border-[#00338d]/40 animate-in zoom-in h-full flex flex-col">
       <div className="flex justify-between items-center mb-10">
          <button onClick={onBack} className="text-slate-500 hover:text-white flex items-center gap-2 text-xs font-bold">
            <ArrowRight size={18} /> العودة للقائمة
          </button>
          <div className="text-right">
             <div className="flex flex-row-reverse items-center gap-4">
                <h3 className="text-3xl font-black text-white">{org.name}</h3>
                <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${org.status === TenantStatus.ACTIVE ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                  {org.status}
                </span>
             </div>
             <p className="text-[#e1b000] text-xs font-black uppercase mt-1 tracking-widest">{org.primaryDomain}</p>
          </div>
       </div>

       <div className="flex flex-wrap gap-2 mb-10 p-2 bg-slate-950 rounded-2xl border border-slate-800">
          <TabButton id="overview" label="نظرة عامة" icon={LayoutDashboard} />
          <TabButton id="sites" label="المواقع والنطاقات" icon={Globe} />
          <TabButton id="portals" label="البوابات" icon={Box} />
          <TabButton id="social" label="التواصل الاجتماعي" icon={Share2} />
          <TabButton id="api" label="API & Secrets" icon={Key} />
          <TabButton id="resources" label="مراقبة الموارد" icon={Activity} />
       </div>

       <div className="flex-1 overflow-y-auto custom-scrollbar">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-8 bg-slate-900/60 rounded-[2.5rem] border border-slate-800 text-right space-y-2">
                  <p className="text-[10px] font-black text-slate-500 uppercase">إجمالي المواقع</p>
                  <p className="text-4xl font-black text-white">{org.sites.length}</p>
               </div>
               <div className="p-8 bg-slate-900/60 rounded-[2.5rem] border border-slate-800 text-right space-y-2">
                  <p className="text-[10px] font-black text-slate-500 uppercase">المستخدمين النشطين</p>
                  <p className="text-4xl font-black text-white">{org.usage.activeUsers} / {org.quota.activeUsersLimit}</p>
               </div>
               <div className="p-8 bg-slate-900/60 rounded-[2.5rem] border border-slate-800 text-right space-y-2">
                  <p className="text-[10px] font-black text-slate-500 uppercase">سعة التخزين</p>
                  <p className="text-4xl font-black text-white">{org.usage.storageUsage} GB</p>
               </div>
            </div>
          )}

          {activeTab === 'sites' && (
            <div className="space-y-6">
               <div className="flex flex-row-reverse justify-between items-center px-4">
                  <h4 className="text-white font-black">مواقع CMS النشطة</h4>
                  <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase">
                    <Plus size={14}/> إضافة موقع جديد
                  </button>
               </div>
               <div className="grid grid-cols-1 gap-4">
                  {org.sites.map(site => (
                    <div key={site.id} className="p-6 bg-slate-900/40 border border-slate-800 rounded-[2rem] flex flex-row-reverse justify-between items-center group">
                       <div className="text-right">
                          <p className="text-white font-black">{site.siteUrl}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">WP: {site.wpVersion} • DB: {site.dbName}</p>
                       </div>
                       <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${site.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                             {site.status}
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border border-slate-800 ${site.cloudflareStatus === 'synced' ? 'text-blue-500' : 'text-slate-500'}`}>
                             CF: {site.cloudflareStatus}
                          </span>
                          <button className="p-2 hover:bg-[#00338d] hover:text-white text-slate-500 rounded-lg transition-all">
                             <ExternalLink size={16} />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'portals' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {org.portals.map(portal => (
                 <div key={portal.id} className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] flex flex-row-reverse justify-between items-center">
                    <div className="text-right">
                       <h5 className="text-white font-black uppercase text-xs">{portal.name}</h5>
                       <p className="text-[10px] text-[#e1b000] font-bold">{portal.subdomain}</p>
                    </div>
                    <button 
                      className={`w-12 h-6 rounded-full transition-all relative ${portal.isEnabled ? 'bg-emerald-500' : 'bg-slate-800'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${portal.isEnabled ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>
               ))}
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-8">
               <div className="p-8 bg-blue-600/5 border border-blue-600/20 rounded-[2.5rem]">
                  <h5 className="text-white font-black text-sm mb-4">إضافة مفتاح API مدفوع للمؤسسة</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <input placeholder="اسم الخدمة (مثلاً Midjourney)" className="bg-slate-950 border border-slate-800 rounded-xl px-6 py-4 text-white text-xs" />
                     <input type="password" placeholder="المفتاح (Encrypted at rest)" className="bg-slate-950 border border-slate-800 rounded-xl px-6 py-4 text-white text-xs" />
                  </div>
                  <button className="mt-6 px-10 py-4 bg-[#00338d] text-white rounded-xl text-[10px] font-black uppercase">حقن المفتاح في الخزنة</button>
               </div>
               <div className="space-y-4">
                  {org.apiVault.map(item => (
                    <div key={item.id} className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-row-reverse justify-between items-center">
                       <div className="text-right">
                          <p className="text-white font-black text-xs">{item.serviceName}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{item.apiKeyPreview}</p>
                       </div>
                       <div className="flex gap-4">
                          <span className="text-[9px] text-slate-500 font-bold uppercase">استخدام: {item.usageCount}</span>
                          <button className="text-red-500 hover:text-red-400"><Trash2 size={16}/></button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-slate-900/60 rounded-[3rem] border border-slate-800 space-y-6">
                     <h5 className="text-white font-black text-xs">CPU Performance (Mesh)</h5>
                     <div className="h-40 flex items-end justify-between gap-2 px-4">
                        {[40, 60, 30, 80, 50, 90, 70].map((v, i) => (
                          <div key={i} className="flex-1 bg-[#00338d] rounded-t-lg opacity-40 hover:opacity-100 transition-all" style={{ height: `${v}%` }}></div>
                        ))}
                     </div>
                  </div>
                  <div className="p-8 bg-slate-900/60 rounded-[3rem] border border-slate-800 space-y-6">
                     <h5 className="text-white font-black text-xs">Memory Utilization</h5>
                     <div className="h-40 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-[10px] border-slate-800 border-t-emerald-500 animate-spin-slow"></div>
                        <span className="absolute text-white font-black text-xl">64%</span>
                     </div>
                  </div>
               </div>
            </div>
          )}
       </div>
    </div>
  );
};

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orgs' | 'users' | 'tools' | 'summary' | 'monitoring'>('summary');
  const [showAddOrg, setShowAddOrg] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [editingTool, setEditingTool] = useState<ServiceTool | null>(null);
  
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: 'org1',
      name: 'مؤسسة بيت الصحافة - اليمن',
      slug: 'presshouse',
      type: TenantType.ORGANIZATION,
      status: TenantStatus.ACTIVE,
      primaryDomain: 'ph-ye.org',
      quota: { cpuLimit: 100, ramLimit: 32, storageLimit: 2000, apiTokenLimit: 10000000, activeUsersLimit: 50 },
      usage: { cpuUsage: 32, ramUsage: 8, storageUsage: 450, apiTokensUsed: 1200000, activeUsers: 14 },
      createdAt: Date.now() - 31536000000,
      sites: [
        { id: 's1', siteUrl: 'news.ph-ye.org', type: 'wordpress', status: 'active', wpVersion: '6.5.2', dbName: 'ph_wp_prod', cloudflareStatus: 'synced' },
        { id: 's2', siteUrl: 'monitor.ph-ye.org', type: 'wordpress', status: 'active', wpVersion: '6.5.2', dbName: 'ph_wp_monitor', cloudflareStatus: 'synced' }
      ],
      portals: [
        { id: 'p1', name: 'YemenJPT Portal', subdomain: 'yemenjpt.ph-ye.org', type: 'yemenjpt', isEnabled: true },
        { id: 'p2', name: 'Secure Mail', subdomain: 'mail.ph-ye.org', type: 'mail', isEnabled: true }
      ],
      apiVault: [
        { id: 'v1', serviceName: 'OpenAI GPT-4-Turbo', apiKeyPreview: 'sk-...x9y0', isEnabled: true, usageCount: 4500 }
      ],
      socialLinks: [
        { id: 'sl1', platform: 'twitter', handle: '@PressHouseYE', status: 'connected' }
      ]
    }
  ]);

  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    // Conceptually trigger the provisioning logic
    alert("بدء عملية تهيئة العقدة السيادية عبر Cloudflare & Docker...");
    setShowAddOrg(false);
  };

  if (selectedOrg) {
    return <OrgDetailManager org={selectedOrg} onBack={() => setSelectedOrg(null)} />;
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 text-right font-ar" dir="rtl">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#00338d] via-[#020617] to-black p-12 lg:p-16 rounded-[4.5rem] border border-white/5 shadow-3xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-12 relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-[#e1b000] rounded-[2.2rem] flex items-center justify-center shadow-2xl group border border-white/20">
               <ShieldCheck size={48} className="text-[#00338d]" />
            </div>
            <div className="text-right">
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">إدارة الشبكة السيادية</h1>
              <p className="text-[#e1b000] font-black mt-3 text-lg uppercase tracking-widest opacity-80">مركز التحكم بالعملاء (Root Management)</p>
            </div>
          </div>
          <div className="flex bg-white/5 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/10 items-center gap-8 shadow-3xl">
             <div className="text-right">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">إجمالي المستهلكات (Grid)</p>
                <p className="text-white text-xl font-black">1.2 TB / 10 TB</p>
             </div>
             <BarChart3 size={32} className="text-blue-500" />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-3 p-2 bg-white/5 backdrop-blur-3xl rounded-[2.8rem] border border-white/10 relative z-10">
          {[
            { id: 'summary', label: 'الوضع العام', icon: MonitorCheck },
            { id: 'orgs', label: 'إدارة المؤسسات', icon: Building2 },
            { id: 'users', label: 'إدارة المستخدمين', icon: Users },
            { id: 'monitoring', label: 'مراقبة الاستهلاك', icon: Activity },
            { id: 'tools', label: 'توزيع الأدوات', icon: Package }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-8 py-4 rounded-3xl text-[11px] font-black flex items-center gap-3 transition-all ${activeTab === tab.id ? 'bg-[#e1b000] text-[#00338d] shadow-2xl scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <tab.icon size={18}/> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'orgs' && (
        <div className="space-y-10">
           {showAddOrg ? (
              <div className="glass-morphism p-12 rounded-[4rem] border border-[#00338d]/40 animate-in zoom-in">
                 <div className="flex justify-between items-center mb-10">
                    <button onClick={() => setShowAddOrg(false)} className="text-slate-500 hover:text-white"><X size={24}/></button>
                    <h3 className="text-3xl font-black text-white">تهيئة مؤسسة صحفية جديدة</h3>
                 </div>
                 <form onSubmit={handleProvision} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] text-slate-500 font-black uppercase pr-4">اسم المؤسسة</label>
                          <input type="text" placeholder="مثلاً: شبكة أخبار اليمن" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-8 py-5 text-white outline-none focus:border-[#00338d]" required />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] text-slate-500 font-black uppercase pr-4">النطاق الرئيسي (Domain)</label>
                          <input type="text" placeholder="yemen-news.com" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-8 py-5 text-white outline-none focus:border-[#00338d]" required />
                       </div>
                    </div>
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] text-slate-500 font-black uppercase pr-4">تخصيص الحصة (Quotas)</label>
                          <div className="grid grid-cols-2 gap-4">
                             <input type="number" placeholder="CPU Cores" className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white" />
                             <input type="number" placeholder="RAM (GB)" className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white" />
                             <input type="number" placeholder="Storage (GB)" className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white" />
                             <input type="number" placeholder="User Limit" className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white" />
                          </div>
                       </div>
                    </div>
                    <div className="md:col-span-2">
                       <button type="submit" className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black text-lg shadow-3xl transition-all">بدء تهيئة العقدة السيادية</button>
                    </div>
                 </form>
              </div>
           ) : (
              <div className="grid grid-cols-1 gap-8">
                 <div className="flex justify-end">
                    <button onClick={() => setShowAddOrg(true)} className="px-10 py-5 bg-[#00338d] text-white rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl">
                      <PlusCircle size={20}/> إضافة مؤسسة
                    </button>
                 </div>
                 {organizations.map(org => (
                    <div key={org.id} className="glass-morphism p-10 rounded-[4rem] border border-slate-800 hover:border-[#00338d]/50 transition-all flex flex-col xl:flex-row-reverse gap-10 group">
                       <div className="flex-1 space-y-6">
                          <div className="flex flex-row-reverse justify-between items-start">
                             <div className="text-right">
                                <h4 className="text-3xl font-black text-white">{org.name}</h4>
                                <p className="text-blue-400 font-bold text-sm mt-1">{org.primaryDomain}</p>
                             </div>
                             <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase ${org.status === TenantStatus.ACTIVE ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                {org.status}
                             </span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                             <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-right">
                                <p className="text-[9px] text-slate-500 font-black uppercase">المواقع</p>
                                <p className="text-lg font-black text-white">{org.sites.length}</p>
                             </div>
                             <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-right">
                                <p className="text-[9px] text-slate-500 font-black uppercase">المستخدمين</p>
                                <p className="text-lg font-black text-white">{org.usage.activeUsers}</p>
                             </div>
                             <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-right">
                                <p className="text-[9px] text-slate-500 font-black uppercase">التخزين</p>
                                <p className="text-lg font-black text-white">{org.usage.storageUsage} GB</p>
                             </div>
                             <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-right">
                                <p className="text-[9px] text-slate-500 font-black uppercase">API Tokens</p>
                                <p className="text-lg font-black text-white">{(org.usage.apiTokensUsed / 1000000).toFixed(1)}M</p>
                             </div>
                          </div>
                       </div>
                       <div className="xl:w-80 flex flex-col justify-center gap-4">
                          <button 
                            onClick={() => setSelectedOrg(org)}
                            className="w-full py-5 bg-[#00338d] hover:bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl"
                          >
                            إدارة العقدة (Node Center)
                          </button>
                          <button className="w-full py-5 bg-slate-800 hover:bg-red-500/20 text-slate-500 hover:text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                             تعليق الخدمة (Suspend)
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           )}
        </div>
      )}

      {/* Other tabs remain similar but updated with current component logic */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom">
           <div className="lg:col-span-2 space-y-8">
              <div className="glass-morphism p-12 rounded-[4rem] border border-slate-800 space-y-10">
                 <h3 className="text-3xl font-black text-white text-right">حالة الشبكة السيادية</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-900/60 rounded-[2.5rem] border border-slate-800 flex flex-row-reverse items-center justify-between">
                       <div className="text-right">
                          <p className="text-[10px] font-black text-slate-500 uppercase mb-1">المؤسسات النشطة</p>
                          <p className="text-3xl font-black text-white">{organizations.length}</p>
                       </div>
                       <Building2 size={32} className="text-blue-500" />
                    </div>
                    <div className="p-8 bg-slate-900/60 rounded-[2.5rem] border border-slate-800 flex flex-row-reverse items-center justify-between">
                       <div className="text-right">
                          <p className="text-[10px] font-black text-slate-500 uppercase mb-1">الصحفيين المستقلين</p>
                          <p className="text-3xl font-black text-white">124</p>
                       </div>
                       <UserIcon size={32} className="text-[#e1b000]" />
                    </div>
                 </div>
              </div>
           </div>
           <div className="glass-morphism p-10 rounded-[3rem] border border-slate-800 bg-[#00338d]/5 space-y-6">
              <h4 className="text-xl font-black text-white text-right">إجراءات سريعة</h4>
              <div className="space-y-4">
                 <button onClick={() => setShowAddOrg(true)} className="w-full py-5 bg-[#00338d] text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl">
                    <PlusCircle size={18}/> تهيئة مؤسسة
                 </button>
                 <button className="w-full py-5 bg-emerald-600/10 text-emerald-500 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-600 hover:text-white transition-all">
                    <UserPlus size={18}/> اعتماد صحفي مستقل
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
