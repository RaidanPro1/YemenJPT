#!/bin/bash

# --- Landing Page Generation ---
cat <<EOF > landing_page/index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ريدان برو | هندسة المرونة والذكاء الاصطناعي السيادي</title>
    <meta name="description" content="RaidanPro هي الوكالة الرائدة في اليمن للاتصال الاستراتيجي والتحول الرقمي ومطور منظومة YemenJPT.">
    <meta name="keywords" content="ذكاء اصطناعي يمني, YemenJPT, RaidanPro, سيادة رقمية, كشف التضليل">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { font-family: 'Tajawal', sans-serif; background-color: #fcfcfc; scroll-behavior: smooth; }
        .login-mini-panel { transform: scale(0); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); opacity: 0; }
        .login-mini-panel.active { transform: scale(1); opacity: 1; }
    </style>
</head>
<body class="antialiased">
    <header class="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-20 flex items-center px-6 justify-between">
        <div class="flex items-center gap-2"><div class="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-black">R</div><span class="font-black text-slate-800 text-xl">RaidanPro</span></div>
        <nav class="hidden md:flex gap-8 font-bold text-slate-600">
            <a href="#home" class="hover:text-teal-600">الرئيسية</a>
            <a href="#about" class="hover:text-teal-600">رؤيتنا</a>
            <a href="docs/technical-whitepaper.html" class="hover:text-teal-600">الوثائق التقنية</a>
        </nav>
        <a href="https://ai.raidan.pro" class="bg-teal-600 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-teal-600/20">دخول المنصة</a>
    </header>

    <section id="home" class="pt-48 pb-32 px-6 text-center max-w-4xl mx-auto">
        <h1 class="text-6xl font-black text-slate-900 leading-tight">هندسة المرونة في <span class="text-teal-600 tracking-tighter">عالم متغير</span></h1>
        <p class="mt-8 text-xl text-slate-500 leading-relaxed italic">"نحول التحديات المعقدة إلى فرص مستدامة. شريكك الاستراتيجي في الاتصال والتحول الرقمي منذ 2011."</p>
        <div class="mt-12 flex justify-center gap-4">
            <a href="https://ai.raidan.pro" class="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl">اكتشف حلولنا</a>
            <a href="docs/technical-whitepaper.html" class="border-2 border-slate-200 px-10 py-4 rounded-2xl font-black text-lg text-slate-600 hover:bg-slate-50 transition-all">الورقة التقنية</a>
        </div>
    </section>

    <!-- Floating UI -->
    <div class="fixed bottom-8 left-8 z-[999] flex flex-col items-center gap-4">
        <div id="loginPanel" class="login-mini-panel bg-white p-6 rounded-[2rem] border border-slate-200 shadow-2xl w-72 text-right">
            <h4 class="font-black text-slate-900 mb-4">دخول الهوية السيادية</h4>
            <input type="email" placeholder="البريد المؤسسي" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs mb-3 outline-none">
            <button onclick="window.location.href='https://ai.raidan.pro'" class="w-full bg-teal-600 text-white py-3 rounded-xl font-black text-xs shadow-md">دخول المنصة</button>
        </div>
        <button onclick="document.getElementById('loginPanel').classList.toggle('active')" class="w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
            <i class="fa-solid fa-lock"></i>
        </button>
        <a href="https://wa.me/967772662106" class="w-16 h-16 bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
            <i class="fa-brands fa-whatsapp text-3xl"></i>
        </a>
    </div>

    <script>
        window.onclick = function(e) { if(!e.target.closest('.fixed')) document.getElementById('loginPanel').classList.remove('active'); }
    </script>
</body>
</html>
EOF

# --- Documentation Pages ---
cat <<EOF > landing_page/docs/technical-whitepaper.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>الورقة التقنية | YemenJPT</title><script src="https://cdn.tailwindcss.com"></script><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;900&display=swap" rel="stylesheet"></head>
<body class="bg-white p-12 max-w-4xl mx-auto text-right" style="font-family: 'Tajawal', sans-serif;">
    <a href="../index.html" class="text-teal-600 font-bold mb-8 block">← العودة للرئيسية</a>
    <h1 class="text-5xl font-black text-slate-900 mb-8 border-r-8 border-teal-600 pr-6">الورقة التقنية: البنية السيادية</h1>
    <div class="prose prose-lg text-slate-600 leading-relaxed">
        <p>تقدم YemenJPT حلاً جذرياً للتبعية التقنية عبر استضافة النماذج اللغوية محلياً (Sovereign AI). نستخدم تقنيات الـ RAG المتقدمة لضمان دقة المعلومات التاريخية والجغرافية لليمن.</p>
        <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">المعمارية الهجينة</h2>
        <p>نجمع بين قوة السحاب وخصوصية المعالجة المحلية، حيث يتم تشفير كافة البيانات بمعايير AES-256 GCM قبل خروجها من العقدة المحلية.</p>
    </div>
</body>
</html>
EOF

cat <<EOF > landing_page/docs/ethical-charter.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>الميثاق الأخلاقي | YemenJPT</title><script src="https://cdn.tailwindcss.com"></script><link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;900&display=swap" rel="stylesheet"></head>
<body class="bg-white p-12 max-w-4xl mx-auto text-right" style="font-family: 'Tajawal', sans-serif;">
    <a href="../index.html" class="text-teal-600 font-bold mb-8 block">← العودة للرئيسية</a>
    <h1 class="text-5xl font-black text-slate-900 mb-8 border-r-8 border-teal-600 pr-6">الميثاق الأخلاقي للذكاء الاصطناعي</h1>
    <div class="prose prose-lg text-slate-600 leading-relaxed space-y-6">
        <div class="p-8 bg-slate-50 border-r-4 border-teal-600 rounded-xl">
            <h3 class="font-black text-teal-700 text-xl mb-2">1. مبدأ الشفافية والوسم</h3>
            <p>يلتزم النظام بوسم كافة المحتويات المولدة آلياً بعلامة واضحة تضمن حق الجمهور في معرفة مصدر المعلومة.</p>
        </div>
        <div class="p-8 bg-slate-50 border-r-4 border-teal-600 rounded-xl">
            <h3 class="font-black text-teal-700 text-xl mb-2">2. الخصوصية المطلقة</h3>
            <p>يُحظر استخدام بيانات المصادر الصحفية في تدريب النماذج العامة، وتظل البيانات ملكاً حصرياً للمؤسسة.</p>
        </div>
    </div>
</body>
</html>
EOF
