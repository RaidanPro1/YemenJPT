
import React from 'react';
import { GraduationCap, Play, Calendar, Users, BookOpen, Clock, Star, ArrowLeft } from 'lucide-react';

const AcademyPage: React.FC = () => {
  const courses = [
    { id: '1', title: 'أساسيات الصحافة الاستقصائية الرقمية', trainer: 'أحمد صالح', duration: '12 ساعة', level: 'متوسط', enrolled: 45, image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400' },
    { id: '2', title: 'الأمن الرقمي وحماية المصادر', trainer: 'سارة اليماني', duration: '8 ساعات', level: 'متقدم', enrolled: 120, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400' },
    { id: '3', title: 'التحقق من المحتوى في مناطق النزاع', trainer: 'محمد عبده', duration: '10 ساعات', level: 'مبتدئ', enrolled: 85, image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 text-right" dir="rtl">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 bg-gradient-to-br from-[#00338d]/20 to-transparent p-12 rounded-[4rem] border border-[#00338d]/20 shadow-2xl">
         <div className="max-w-2xl">
            <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
               <GraduationCap size={48} className="text-[#e1b000]" /> أكاديمية بيت الصحافة الرقمية
            </h1>
            <p className="text-slate-300 mt-4 text-lg leading-relaxed font-medium">تمكين الجيل القادم من الصحفيين اليمنيين بأحدث الأدوات والمهارات المهنية بمعايير دولية.</p>
            <div className="flex gap-4 mt-8">
               <button className="bg-[#00338d] hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl transition-all">استكشاف الدورات</button>
               <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black hover:bg-white/10 transition-all">كن مدرباً معنا</button>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 text-center space-y-2">
               <p className="text-3xl font-black text-[#e1b000]">1.2k</p>
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">خريج معتمد</p>
            </div>
            <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 text-center space-y-2">
               <p className="text-3xl font-black text-blue-500">24</p>
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">دورة نشطة</p>
            </div>
         </div>
      </div>

      <div className="space-y-8">
         <div className="flex justify-between items-center px-4">
            <h2 className="text-2xl font-black text-white">الدورات التدريبية المتاحة</h2>
            <button className="text-blue-500 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">عرض الكل <ArrowLeft size={14}/></button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
               <div key={course.id} className="glass-morphism rounded-[3rem] overflow-hidden border border-slate-800 group hover:border-[#00338d]/40 transition-all shadow-2xl flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                     <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white font-black uppercase">{course.level}</div>
                  </div>
                  <div className="p-8 space-y-4 flex-1 flex flex-col">
                     <h3 className="text-xl font-bold text-white group-hover:text-[#e1b000] transition-colors">{course.title}</h3>
                     <p className="text-xs text-slate-500 font-bold">المدرب: {course.trainer}</p>
                     <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-800 mt-auto">
                        <div className="flex items-center gap-2"><Clock size={14}/> {course.duration}</div>
                        <div className="flex items-center gap-2"><Users size={14}/> {course.enrolled} طالب</div>
                     </div>
                     <button className="w-full mt-6 py-4 bg-[#00338d] hover:bg-blue-600 text-white rounded-2xl font-black text-xs shadow-xl transition-all">سجل الآن</button>
                  </div>
               </div>
            ))}
         </div>
      </div>

      <div className="glass-morphism p-12 rounded-[4rem] border border-slate-800 flex flex-col lg:flex-row justify-between items-center gap-12 bg-slate-900/40">
         <div className="text-right space-y-4 max-w-xl">
            <h3 className="text-2xl font-black text-white">مكتبة موارد الأكاديمية</h3>
            <p className="text-slate-400 font-medium">آلاف الوثائق، الأدلة التدريبية، والدروس المسجلة متاحة مجاناً للصحفيين المستقلين.</p>
            <button className="bg-slate-800 hover:bg-white hover:text-black text-slate-400 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">دخول المكتبة</button>
         </div>
         <div className="p-10 bg-[#00338d]/10 rounded-full text-[#00338d] border border-[#00338d]/20 animate-pulse">
            <BookOpen size={64} />
         </div>
      </div>
    </div>
  );
};

export default AcademyPage;
