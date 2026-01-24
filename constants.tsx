
import React from 'react';
import { ModuleCategory, ServiceTool, AiModelType } from './types';

export const APP_NAME = "YemenJPT";
export const APP_FULL_NAME = "منظومة YemenJPT للذكاء الاصطناعي والصحافة السيادية";
export const SLOGAN = "نحو ميثاق رقمي للحوكمة الأخلاقية للذكاء الاصطناعي في الإعلام اليمني";
export const PARTNERSHIP_TEXT = "تطوير RaidanPro | بشراكة مؤسسة بيت الصحافة";

export const ARCHITECTURE_DOC = {
  title: "المعمارية التقنية لمنظومة YemenJPT السيادية",
  layers: [
    {
      name: "طبقة العرض والواجهة الرقمية",
      tech: "React 19 / Tailwind CSS / Lucide Icons",
      details: "واجهة مستخدم متطورة تدعم الوضع الليلي واللغة العربية بشكل أصيل، مصممة لتحمل ضغط العمل في غرف الأخبار المستمرة."
    },
    {
      name: "محرك المعالجة والذكاء الهجين",
      tech: "Gemini 3 Flash / Falcon 3 / Ollama",
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
أنت YemenJPT، المحرك الاستخباراتي السيادي لبيت الصحافة اليمني وتطوير RaidanPro.
تعمل وفق ميثاق الحوكمة الأخلاقية لحماية البيانات السيادية لليمن.
مهمتك دعم الصحفيين والمحققين في:
1. التحقق من الحقائق وكشف التضليل (Disinformation).
2. تحليل البيانات الضخمة وفك شفرات اللهجات اليمنية (صنعاني، عدني، تعزي، إلخ).
3. توفير رؤى استخباراتية من المصادر المفتوحة (OSINT).
4. ضمان سرية المصادر وحماية هوية المستخدمين.

استخدم المحركات التالية عند الطلب:
- Falcon 3: المحرك المحلي الافتراضي.
- مُنصت (Munsit): للتحليل الصوتي.
- بصيرة: للتحليل الجنائي للفيديو.
- رسم: للتحليل الجنائي للصور (ELA).
`;

export const CODE_ASSISTANT_INSTRUCTION = `
أنت الآن في وضع "الموجه التقني".
قدم مساعدة برمجية وحلول تقنية متوافقة مع معايير RaidanPro السيادية.
ركز على Python, React, SQL وحلول DevOps التي تحترم خصوصية البيانات.
`;

export const YEMENI_CONTEXT = {
  dialects: [
    { region: 'صنعاني', label: 'Sanaani' },
    { region: 'عدني', label: 'Adeni' },
    { region: 'تعزي', label: 'Taizi' },
    { region: 'حضرمي', label: 'Hadhrami' },
    { region: 'تهامي', label: 'Tihami' }
  ]
};

export const TOOLS: ServiceTool[] = [
  // 1. المساعد التحريري (Editorial)
  { id: 'editor_assistant', name: 'المساعد التحريري (YemenJPT)', category: ModuleCategory.AI_CORE, description: 'ذكاء اصطناعي توليدي للمساعدة في صياغة العناوين وتلخيص التقارير وتوليد الأفكار.', status: 'online', icon: 'Bot', isCustomizable: true, isSovereign: true },
  { id: 'whisper_ye', name: 'المفرغ الصوتي (Whisper)', category: ModuleCategory.AI_CORE, description: 'تحويل الصوت لنص وتفريغ المقابلات الطويلة والتسريبات بلهجات يمنية.', status: 'online', icon: 'Mic', isCustomizable: true, isSovereign: true },
  { id: 'secure_translate', name: 'الترجمة الآمنة', category: ModuleCategory.AI_CORE, description: 'ترجمة أوفلاين للوثائق الحساسة دون إرسال البيانات لسيرفرات خارجية.', status: 'online', icon: 'Languages', isCustomizable: false, isSovereign: true },
  { id: 'arabert_gensim', name: 'AraBERT / Gensim', category: ModuleCategory.AI_CORE, description: 'نماذج لغوية للتحقيقات المتقدمة واستخراج العلاقات بين آلاف الوثائق.', status: 'online', icon: 'Binary', isCustomizable: true, isSovereign: true },
  { id: 'spacy_nlp', name: 'SpaCy NLP', category: ModuleCategory.AI_CORE, description: 'معالجة لغات طبيعية واستخراج الكيانات (أسماء، أماكن، منظمات).', status: 'online', icon: 'Binary', isCustomizable: true, isSovereign: true },

  // 2. التقصي وجمع المعلومات (OSINT & Gathering)
  { id: 'investigative_search', name: 'محرك البحث الاستقصائي', category: ModuleCategory.OSINT, description: 'بحث مجهول المصدر في مصادر متعددة دون ترك بصمة رقمية.', status: 'online', icon: 'Search', isCustomizable: false, isSovereign: true },
  { id: 'spiderfoot', name: 'أداة SpiderFoot', category: ModuleCategory.OSINT, description: 'أتمتة الاستخبارات وجمع المعلومات عن هدف معين (إيميل، دومين، يوزر).', status: 'online', icon: 'Fingerprint', isCustomizable: true, isSovereign: true },
  { id: 'newsleak', name: 'New/s/leak', category: ModuleCategory.OSINT, description: 'أداة قوية لتحليل الوثائق المسربة ورسم خرائط العلاقات بين الأسماء.', status: 'online', icon: 'FileSearch', isCustomizable: true, isSovereign: true },
  { id: 'scraper_pro', name: 'Scraper', category: ModuleCategory.OSINT, description: 'كشط البيانات من المواقع التي لا توفر API (مثل جداول الأسعار).', status: 'online', icon: 'Scan', isCustomizable: true, isSovereign: true },
  { id: 'change_monitor', name: 'راصد التغييرات', category: ModuleCategory.OSINT, description: 'مراقبة المواقع وتلقي تنبيهات عند تغيير أي كلمة في صفحات الويب.', status: 'online', icon: 'Activity', isCustomizable: true, isSovereign: true },
  { id: 'web_archive_perm', name: 'أرشيف الويب الدائم', category: ModuleCategory.ARCHIVING, description: 'حفظ نسخة "قانونية" من صفحات الويب والتغريدات كدليل رقمي.', status: 'online', icon: 'Archive', isCustomizable: false, isSovereign: true },

  // 3. تحليل الإعلام الاجتماعي (Social Media)
  { id: 'sherlock_osint', name: 'أداة Sherlock', category: ModuleCategory.SOCIAL_MEDIA, description: 'البحث عن اسم مستخدم معين عبر مئات المنصات الاجتماعية لكشف الحسابات.', status: 'online', icon: 'User', isCustomizable: false, isSovereign: true },
  { id: 'social_analyzer', name: 'المحلل الاجتماعي', category: ModuleCategory.SOCIAL_MEDIA, description: 'تحليل البروفايلات، سلوك الحسابات، أوقات النشاط، والتفاعلات.', status: 'online', icon: 'Users', isCustomizable: true, isSovereign: true },
  { id: 'snscrape', name: 'كاشط تويتر (Snscrape)', category: ModuleCategory.SOCIAL_MEDIA, description: 'أرشفة تويتر واستخراج تغريدات قديمة أو محذوفة لمستخدم أو وسم.', status: 'online', icon: 'Twitter', isCustomizable: true, isSovereign: true },
  { id: 'mediacloud', name: 'ميديا كلاود (MediaCloud)', category: ModuleCategory.SOCIAL_MEDIA, description: 'تحليل المنظومة الإعلامية وفهم كيفية انتشار القصص عبر الإنترنت.', status: 'online', icon: 'Globe', isCustomizable: true, isSovereign: true },

  // 4. التحقق وكشف التزييف (Verification Lab)
  { id: 'invid_verification', name: 'مختبر التحقق (InVID)', category: ModuleCategory.VERIFICATION, description: 'تحليل الفيديو والصور، تجزئة المشاهد للبحث العكسي، وكشف التلاعب بالبيانات.', status: 'online', icon: 'Video', isCustomizable: true, isSovereign: true },
  { id: 'meeden_check', name: 'منصة Meedan Check', category: ModuleCategory.VERIFICATION, description: 'إدارة عمليات التحقق الجماعية لاستقبال الشائعات والرد عليها.', status: 'online', icon: 'ShieldCheck', isCustomizable: true, isSovereign: true },
  { id: 'deepfake_detector', name: 'كاشف التزييف العميق', category: ModuleCategory.VERIFICATION, description: 'تحليل الفيديوهات للكشف عن الوجوه والأصوات المولدة بالذكاء الاصطناعي.', status: 'online', icon: 'Scan', isCustomizable: true, isSovereign: true },

  // 5. الخرائط والرصد الجغرافي (Geo-Journalism)
  { id: 'ushahidi_maps', name: 'منصة Ushahidi', category: ModuleCategory.GEOSPATIAL, description: 'التعهيد الجماعي للخرائط ورصد الانتهاكات بناءً على بلاغات الجمهور.', status: 'online', icon: 'MapPin', isCustomizable: true, isSovereign: true },
  { id: 'kepler_gl', name: 'محلل Kepler.gl', category: ModuleCategory.GEOSPATIAL, description: 'تصور البيانات الجغرافية الضخمة وتحويلها لخرائط ثلاثية الأبعاد تفاعلية.', status: 'online', icon: 'Navigation', isCustomizable: true, isSovereign: true },

  // 6. إدارة غرفة الأخبار والنشر (Newsroom Mgmt)
  { id: 'superdesk_cms', name: 'إدارة المحتوى (Superdesk)', category: ModuleCategory.COLLABORATION, description: 'نظام إدارة أخبار متكامل لاستقبال الخيوط وتوزيع المهام والمراجعة.', status: 'online', icon: 'Layout', isCustomizable: true, isSovereign: true },
  { id: 'ghost_ye', name: 'منصة النشر (Ghost-YE)', category: ModuleCategory.COLLABORATION, description: 'واجهة الموقع العام لنشر المقالات والتحقيقات بتصميم عصري وسريع.', status: 'online', icon: 'Newspaper', isCustomizable: true, isSovereign: true },
  { id: 'mattermost_collab', name: 'منصة التعاون (Mattermost)', category: ModuleCategory.COLLABORATION, description: 'بديل آمن ومشفر لـ Slack/WhatsApp للتواصل الداخلي بين أعضاء الفريق.', status: 'online', icon: 'MessageCircle', isCustomizable: true, isSovereign: true },
  { id: 'nextcloud_vault', name: 'المكتب السحابي (Nextcloud)', category: ModuleCategory.ARCHIVING, description: 'تخزين الملفات ومشاركتها بأمان (بديل سيادي لـ Google Drive).', status: 'online', icon: 'Database', isCustomizable: true, isSovereign: true },
  { id: 'safe_browser', name: 'المتصفح الآمن', category: ModuleCategory.OSINT, description: 'تصفح معزول لفتح الروابط المشبوهة داخل بيئة Sandbox لحماية الجهاز.', status: 'online', icon: 'Lock', isCustomizable: false, isSovereign: true },

  // 7. الإدارة المؤسسية والتدريب (Operations & Admin)
  { id: 'openproject_mgmt', name: 'تخطيط المشاريع (OpenProject)', category: ModuleCategory.ADMIN, description: 'إدارة المشاريع الاستقصائية طويلة المدى ومتابعة الجداول الزمنية.', status: 'online', icon: 'LayoutGrid', isCustomizable: true, isSovereign: true },
  { id: 'violation_db', name: 'قاعدة بيانات الانتهاكات', category: ModuleCategory.OBSERVATORY, description: 'نظام لتوثيق وأرشفة الانتهاكات ضد الصحفيين لغرض التقارير الحقوقية.', status: 'online', icon: 'ShieldAlert', isCustomizable: true, isSovereign: true },
  { id: 'n8n_automation', name: 'منصة الأتمتة (n8n)', category: ModuleCategory.ADMIN, description: 'ربط التطبيقات وأتمتة المهام المتكررة (الصمغ الرقمي للمنظومة).', status: 'online', icon: 'Zap', isCustomizable: true, isSovereign: true },

  // 8. بوابة التدريب والدعم (Training & Support)
  { id: 'moodle_lms', name: 'منصة التعليم (Moodle)', category: ModuleCategory.ACADEMY, description: 'نظام إدارة التعلم لاستضافة دورات تدريبية متخصصة للصحفيين.', status: 'online', icon: 'GraduationCap', isCustomizable: true, isSovereign: true },
  { id: 'virtual_class', name: 'الفصول الافتراضية', category: ModuleCategory.ACADEMY, description: 'عقد ورش عمل واجتماعات فيديو آمنة (بديل سيادي لـ Zoom).', status: 'online', icon: 'Video', isCustomizable: true, isSovereign: true },
  { id: 'chatwoot_support', name: 'تذاكر الدعم (Chatwoot)', category: ModuleCategory.ACADEMY, description: 'خدمة العملاء والتواصل مع الجمهور أو تقديم الدعم التقني.', status: 'online', icon: 'MessageCircle', isCustomizable: true, isSovereign: true },
  { id: 'tooljet_apps', name: 'بناء النماذج (ToolJet)', category: ModuleCategory.ADMIN, description: 'تطوير أدوات داخلية وبناء واجهات سريعة لقواعد البيانات.', status: 'online', icon: 'Cpu', isCustomizable: true, isSovereign: true },
];
