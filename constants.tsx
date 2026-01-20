
import React from 'react';
import { ModuleCategory, ServiceTool, AiModelType } from './types';

export const APP_NAME = "YemenJPT";
export const APP_FULL_NAME = "Digital Media & Rights Institution Platform";
export const PARTNERSHIP_TEXT = "Press House Foundation x RaidanPro";

export const YEMENI_DIALECTS = [
  { id: 'sanaani', ar: 'صنعاني', en: 'Sana\'ani' },
  { id: 'adeni', ar: 'عدني', en: 'Adeni' },
  { id: 'taizi', ar: 'تعزي', en: 'Taizi' },
  { id: 'hadrami', ar: 'حضرمي', en: 'Hadrami' },
  { id: 'tihami', ar: 'تهامي', en: 'Tihami' },
  { id: 'maribi', ar: 'مأربي', en: 'Maribi' },
  { id: 'ibbi', ar: 'إبي', en: 'Ibbi' }
];

export const TRANSLATIONS = {
  ar: {
    dashboard: "لوحة القيادة",
    observatory: "مرصد الانتهاكات",
    factcheck: "وحدة التحقق",
    academy: "الأكاديمية الرقمية",
    mediahub: "المركز الإعلامي",
    archive: "الأرشيف والذاكرة",
    services: "الخدمات المؤسسية",
    osint: "الاستخبارات الرقمية",
    verification: "التحقق الجنائي",
    ai: "المعالج السيادي",
    admin: "إدارة النظام",
    collaboration: "غرفة الأخبار",
    logout: "خروج آمن",
    login_title: "بوابة الدخول المؤسسي",
    login_sub: "منصة بيت الصحافة الرقمية المستقلة",
    footer_partnership: "تم التطوير بواسطة RaidanPro بالشراكة مع مؤسسة بيت الصحافة - اليمن",
    footer_rights: "تشفير AES-256 نشط. سيادة كاملة على البيانات.",
    active_processing: "المعالجة النشطة",
    storage_vault: "خزنة البيانات",
    system_health: "صحة النظام",
    sovereign_mode: "الوضع السيادي",
    code_mode: "مساعد الكود",
    early_warning: "نظام الإنذار المبكر",
    violations_count: "إجمالي الانتهاكات",
    verified_cases: "قضايا تم التحقق منها",
    academy_enrolled: "المتدربون النشطون",
    sources: "المصادر والمراجع",
    sources_citations: "المصادر والاستشهادات",
    transcription_active: "جاري التفريغ الصوتي...",
    org_management: "إدارة المؤسسات",
    infra_management: "إدارة البنية التحتية",
    ai_config: "إعدادات الذكاء الاصطناعي",
    cloud_management: "إدارة السحابة والنطاقات",
    automation: "الأتمتة",
    create_org: "إضافة مؤسسة",
    email_label: "البريد الإلكتروني المؤسسي",
    pass_label: "كلمة المرور",
    login_btn: "دخول آمن",
    social_login_bridge: "أو الدخول عبر جسر الهوية الرقمية"
  },
  en: {
    dashboard: "Command Center",
    observatory: "Rights Observatory",
    factcheck: "Fact-Check Unit",
    academy: "Digital Academy",
    mediahub: "Media Hub",
    archive: "National Archive",
    services: "Institutional Services",
    osint: "Digital Intel",
    verification: "Forensics Lab",
    ai: "Sovereign AI",
    admin: "System Admin",
    collaboration: "Newsroom Hub",
    logout: "Secure Logout",
    login_title: "Institutional Portal",
    login_sub: "Press House Independent Digital Platform",
    footer_partnership: "Developed by RaidanPro in partnership with Press House Foundation - Yemen",
    footer_rights: "AES-256 Active. Total Data Sovereignty.",
    active_processing: "Active Processing",
    storage_vault: "Data Vault",
    system_health: "System Health",
    sovereign_mode: "Sovereign Mode",
    code_mode: "Code Assistant",
    early_warning: "Early Warning System",
    violations_count: "Total Violations",
    verified_cases: "Verified Cases",
    academy_enrolled: "Active Trainees",
    sources: "Sources & References",
    sources_citations: "Sources & Citations",
    transcription_active: "Transcription Active...",
    org_management: "Organization Management",
    infra_management: "Infrastructure Management",
    ai_config: "AI Configuration",
    cloud_management: "Cloud & DNS Management",
    automation: "Automation",
    create_org: "Create Organization",
    email_label: "Institutional Email",
    pass_label: "Access Password",
    login_btn: "Secure Entry",
    social_login_bridge: "Or Enter via Digital Identity Bridge"
  }
};

export const AppLogoText = ({ className = "" }: { className?: string }) => (
  <span className={`font-black tracking-tighter ${className}`}>
    Yemen<span className="text-[#e1b000]">J</span>PT
  </span>
);

export const TOOLS: ServiceTool[] = [
  { id: 'falcon', name: 'Falcon 3 Arabic', category: ModuleCategory.AI_CORE, description: 'Sovereign Arabic LLM.', status: 'online', icon: 'Bot', isCustomizable: false, isSovereign: true },
  { id: 'munsit', name: 'Munsit (منصت)', category: ModuleCategory.AI_CORE, description: 'Yemeni dialect speech-to-text.', status: 'online', icon: 'Mic', isCustomizable: true, isSovereign: true },
  { id: 'invid', name: 'InVID Forensic', category: ModuleCategory.VERIFICATION, description: 'Media verification suite.', status: 'online', icon: 'ShieldCheck', isCustomizable: true, isSovereign: true }
];

export const SYSTEM_INSTRUCTION = `
You are YemenJPT, the sovereign AI for Press House Foundation. 
Your mission is to support investigative journalism, human rights monitoring, and truth verification in Yemen.
1. Be clinical and objective.
2. Prioritize forensic evidence.
3. Reject bias or speculation.
4. Support the Observatory, Fact-Checking Unit, and Academy modules.
`;

export const CODE_ASSISTANT_INSTRUCTION = `
You are the YemenJPT Code Architect.
Focus on high-performance React 19, Vite, and ESM module resolution.
Provide precise, clinical solutions for @google/genai integration and sovereign AI inference paths.
`;

/**
 * Institutional Architecture Documentation
 */
export const ARCHITECTURE_DOC = {
  title: "YemenJPT Institutional Architecture Guide",
  layers: [
    {
      name: "Sovereign Interface",
      tech: "React 19 / Tailwind / Blade",
      details: "Institutional grade interface with RTL support and secure context handling."
    },
    {
      name: "Core AI Engine",
      tech: "Gemini 3 Pro / Falcon 3",
      details: "Hybrid processing layer balancing cloud reasoning and local data sovereignty."
    },
    {
      name: "Observatory & Logic",
      tech: "Laravel 11 / Filament",
      details: "State-of-the-art violations monitoring and case management backend."
    },
    {
      name: "Infrastructure Layer",
      tech: "Cloudflare / Docker / PostgreSQL",
      details: "Distributed hosting with active DDoS protection and encrypted persistence."
    }
  ]
};
