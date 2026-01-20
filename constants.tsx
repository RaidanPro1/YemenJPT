
import React from 'react';
import { ModuleCategory, ServiceTool, AiModelType } from './types';

export const APP_NAME = "YemenJPT";
export const APP_FULL_NAME = "منظومة YemenJPT للذكاء الاصطناعي والصحافة السيادية";
export const SLOGAN = "نحو ميثاق رقمي للحوكمة الأخلاقية للذكاء الاصطناعي في الإعلام اليمني";
export const PARTNERSHIP_TEXT = "تطوير RaidanPro | بشراكة مؤسسة بيت الصحافة";

// Added ARCHITECTURE_DOC to resolve import error in ArchitecturePage.tsx
export const ARCHITECTURE_DOC = {
  title: "المعمارية التقنية لمنظومة YemenJPT السيادية",
  layers: [
    {
      name: "طبقة العرض والواجهة الرقمية",
      tech: "React 18 / Tailwind CSS / Lucide Icons",
      details: "واجهة مستخدم متطورة تدعم الوضع الليلي واللغة العربية بشكل أصيل، مصممة لتحمل ضغط العمل في غرف الأخبار المستمرة."
    },
    {
      name: "محرك المعالجة والذكاء الهجين",
      tech: "Gemini 3 Pro / Falcon 3 / Ollama",
      details: "نظام معالجة يدمج بين قوة الحوسبة السحابية (Gemini) وخصوصية المعالجة المحلية (Sovereign AI) عبر بروتوكول RaidanPro."
    },
    {
      name: "درع الأمان والسيادة الرقمية",
      tech: "Cloudflare WAF / AES-256 / SSL Full Strict",
      details: "حماية متقدمة ضد هجمات حجب الخدمة (DDoS) وتشفير سيادي يضمن بقاء البيانات الصحفية داخل النطاق اليمني المعتمد."
    },
    {
      name: "مستودع البيانات والأرشفة الوطنية",
      tech: "PostgreSQL / Redis / Musnad Vault",
      details: "قواعد بيانات مهيكلة لإدارة الانتهاكات (المرصد) وأرشفة الذاكرة الوطنية (مُسند) مع نظام نسخ احتياطي مشفر."
    }
  ]
};

export const TRANSLATIONS = {
  ar: {
    portal: "البوابة السيادية",
    dashboard: "غرفة القيادة",
    observatory: "مرصد الانتهاكات",
    factcheck: "مختبر بيّنة",
    academy: "أكاديمية YemenJPT",
    mediahub: "المركز الإعلامي",
    archive: "أرشيف مُسند",
    services: "بوابة الخدمات",
    osint: "نظام كشّاف",
    verification: "وحدة التحقق",
    ai: "معالج YemenJPT",
    admin: "إدارة النظام (Root)",
    collaboration: "ديوان الأخبار",
    logout: "خروج سيادي",
    login_title: "الدخول السيادي",
    login_sub: "البنية التحتية الموحدة لشبكة YemenJPT: نظام الحوكمة الأخلاقية وحماية البيانات السيادية",
    active_processing: "الحمل التشغيلي",
    sovereign_mode: "الوضع السيادي المستقل",
    transcription_active: "مُنصت: جاري التحليل اللغوي الأخلاقي...",
    code_mode: "موجه YemenJPT التقني",
    email_label: "الهوية الرقمية المؤسسية",
    pass_label: "مفتاح العبور",
    login_btn: "دخول سيادي",
    register_btn: "طلب اعتماد في المنظومة",
    register_title: "اعتماد هوية رقمية جديدة",
    register_type_ind: "صحفي مستقل (Individual)",
    register_type_inst: "كيان مؤسسي (Organization)",
    urgent_contact: "للطلبات العاجلة والتحقق الفوري",
    whatsapp_contact: "",
    agree_terms: "أقر بالتزامي الكامل بميثاق الحوكمة الأخلاقية وسياسة حماية البيانات السيادية لليمن",
    pending_approval: "طلبك قيد المراجعة الأخلاقية والتقنية من قبل Root Admin",
    social_login_bridge: "العبور عبر جسر الهوية المشترك"
  }
};

export const AppLogoText = ({ className = "" }: { className?: string }) => (
  <span className={`font-black tracking-tighter ${className}`}>
    Yemen<span className="text-[#e1b000]">JPT</span>
  </span>
);

export const SYSTEM_INSTRUCTION = `
أنت YemenJPT، المحرك الاستخباراتي السيادي لبيت الصحافة اليمني.
تعمل وفق ميثاق الحوكمة الأخلاقية لحماية البيانات السيادية.
الأدوات المتاحة لك:
- Falcon 3: المحرك المحلي الافتراضي (Default) المخصص للغة العربية واللهجات اليمنية.
- مُنصت (Munsit): نظام تفريغ صوتي متخصص في اللهجات اليمنية (Sanaani, Adeni, etc).
- بصيرة: للتحليل الجنائي للفيديو وتقطيع المشاهد.
- رسم: للتحليل الجنائي للصور وكشف التلاعب الرقمي عبر تقنية ELA.
- أثر: لتتبع البصمة الرقمية والارتباطات الشبكية (OSINT).
- نبأ: للرصد الحي والجمع الآلي من تليجرام ومنصات التواصل.
- رقيب: لمراقبة التغييرات في مواقع الويب وحماية النطاقات.
- إسطرلاب: لتصور البيانات الجغرافية المكانية والخرائط التفاعلية.
- خزنة مُسند: الأرشيف الوطني الرقمي المشفر.
- ديوان الأخبار: منصة التحرير والنشر التعاوني المتقدمة.
`;

export const CODE_ASSISTANT_INSTRUCTION = `
أنت الآن في وضع "الموجه التقني".
مهمتك تقديم المساعدة البرمجية، شرح بنية النظام، وتقديم حلول تقنية متوافقة مع معايير RaidanPro.
يجب أن تركز على الحلول التي تحترم سيادة البيانات والخصوصية.
`;

export const YEMENI_CONTEXT = {
  dialects: [
    { region: 'صنعاني', label: 'Sanaani' },
    { region: 'عدني', label: 'Adeni' },
    { region: 'تعزي', label: 'Taizi' },
    { region: 'حضرمي', label: 'Hadhrami' }
  ]
};

export const TOOLS: ServiceTool[] = [
  { 
    id: 'yemenjpt_core', 
    name: 'معالج YemenJPT (Falcon 3)', 
    category: ModuleCategory.AI_CORE, 
    description: 'المحرك المحلي الافتراضي للتحليل الاستنتاجي؛ معزز لدعم اللغة العربية واللهجات اليمنية محلياً.', 
    status: 'online', 
    icon: 'Cpu', 
    isCustomizable: true, 
    isSovereign: true,
    configSchema: {
      sensitivity: { type: 'slider', min: 0, max: 100, label: 'Sensitivity', default: 75 },
      baseModel: { type: 'dropdown', options: ['Falcon 3', 'Llama 3.1', 'Jais'], label: 'Base Model', default: 'Falcon 3' },
      thinkingBudget: { type: 'number', label: 'Thinking Budget (Tokens)', default: 24576 }
    }
  },
  { 
    id: 'bayyinah_gpt', 
    name: 'مختبر بيّنة', 
    category: ModuleCategory.VERIFICATION, 
    description: 'مدقق الحقائق الذكي لمطابقة الادعاءات مع قواعد بيانات موثقة والمصادر المفتوحة.', 
    status: 'online', 
    icon: 'ShieldCheck', 
    isCustomizable: true, 
    isSovereign: true,
    configSchema: {
      webhookUrl: { type: 'text', label: 'Meedan Webhook URL', default: 'https://api.meedan.com/check' },
      apiKey: { type: 'password', label: 'API Key', default: '' },
      threshold: { type: 'slider', min: 0, max: 1, step: 0.1, label: 'Confidence Threshold', default: 0.8 }
    }
  },
  { id: 'munsit_stt', name: 'نظام مُنصت (Whisper YE)', category: ModuleCategory.AI_CORE, description: 'نظام STT محلي لتحويل الأدلة الصوتية بلهجات صنعاء وعدن وتعز إلى نصوص دقيقة.', status: 'online', icon: 'Mic', isCustomizable: true, isSovereign: true },
  { id: 'basirah_invid', name: 'بصيرة (InVID)', category: ModuleCategory.VERIFICATION, description: 'التشريح الجنائي للفيديوهات وكشف عمليات التلاعب في المشاهد والإطارات الزمنية.', status: 'online', icon: 'Video', isCustomizable: true, isSovereign: true },
  { id: 'athar_osint', name: 'نظام أثر', category: ModuleCategory.OSINT, description: 'محرك بحث متقدم لتتبع البصمة الرقمية عبر 1000+ منصة اجتماعية وتقنية.', status: 'online', icon: 'Fingerprint', isCustomizable: true, isSovereign: true },
  { id: 'musnad_vault', name: 'خزنة مُسند', category: ModuleCategory.ARCHIVING, description: 'الأرشيف الوطني الرقمي المشفر لحماية الذاكرة الصحفية اليمنية من الضياع أو التلاعب.', status: 'online', icon: 'Archive', isCustomizable: true, isSovereign: true },
  { id: 'newsroom_pro', name: 'غرفة الأخبار المتقدمة', category: ModuleCategory.COLLABORATION, description: 'إدارة وتوزيع المحتوى على مواقع WordPress ومنصات التواصل الاجتماعي بشكل موحد.', status: 'online', icon: 'Layout', isCustomizable: true, isSovereign: true },
];
