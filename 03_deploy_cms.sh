#!/bin/bash
# -----------------------------------------------------------------------------
# STEP 03: DYNAMIC CMS DEPLOYMENT
# -----------------------------------------------------------------------------

echo "🎨 Generating Dynamic Landing Page..."

# In a real environment, this script would query the DB.
# Here, it generates the index.html with RaidanPro branding.

cat <<EOF > landing_page/index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>ريدان برو | هندسة المرونة والذكاء الاصطناعي</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;900&display=swap" rel="stylesheet">
    <style>body { font-family: 'Tajawal', sans-serif; }</style>
</head>
<body class="bg-slate-50">
    <nav class="p-6 bg-white border-b border-slate-200 flex justify-between items-center">
        <h1 class="text-2xl font-black text-slate-800">RaidanPro</h1>
        <a href="https://ai.raidan.pro" class="bg-teal-600 text-white px-6 py-2 rounded-full font-bold">دخول المنصة</a>
    </nav>
    <section class="py-32 px-6 text-center">
        <h2 class="text-6xl font-black text-slate-900 mb-8">هندسة المرونة في عالم متغير</h2>
        <p class="text-xl text-slate-500 max-w-2xl mx-auto italic">"نحول التحديات المعقدة إلى فرص مستدامة. شريكك الاستراتيجي منذ 2011."</p>
    </section>
</body>
</html>
EOF

echo "✅ Landing page generated in /landing_page"
