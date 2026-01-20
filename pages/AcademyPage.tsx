
import React, { useState } from 'react';
import { GraduationCap, Play, Calendar, Users, BookOpen, Clock, Star, ArrowLeft, Award, CheckCircle, UserPlus, Send, X } from 'lucide-react';
import { Course } from '../types';

const AcademyPage: React.FC = () => {
  const [showTrainerModal, setShowTrainerModal] = useState(false);
  const courses: Course[] = [
    { id: '1', title: 'أساسيات الصحافة الاستقصائية الرقمية', trainer: 'أحمد صالح', duration: '12 ساعة', level: 'متوسط', enrolled: 45, image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400', hasCertificate: true },
    { id: '2', title: 'الأمن الرقمي وحماية المصادر', trainer: 'سارة اليماني', duration: '8 ساعات', level: 'متقدم', enrolled: 120, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400', hasCertificate: true },
    { id: '3', title: 'التحقق من المحتوى في مناطق النزاع', trainer: 'محمد عبده', duration: '10 ساعات', level: 'مبتدئ', enrolled: 85, image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=400', hasCertificate: true },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 text-right font-ar" dir="rtl">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 bg-gradient-to-br from-[#00338d]/20 to-transparent p-12 rounded-[4rem] border border-[#00338d]/20 shadow-2xl">
         <div className="max-w-2xl">
            <h1 className="text-4xl font-black text-white tracking-tight flex flex-row-reverse items-center gap-4">
               <GraduationCap size={48} className="text-[#e1b000]" /> أكاديمية YemenJPT الرقمية
            </h1>
            <p className="text-slate-300 mt-4 text-lg leading-relaxed font-medium">المركز الوطني المعتمد لتمكين الصحفيين اليمنيين بأدوات المستقبل ومهارات التحقيق الرقمي والسيادي.</p>
            <div className="flex flex-row-reverse gap-4 mt-8">
               <button className="bg-[#00338d] hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl transition-all">استكشاف المسارات التعليمية</button>
               <button onClick={() => setShowTrainerModal(true)} className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black hover:bg-white/10 transition-all flex items-center gap-3">
                 <UserPlus size={20}/> كن مدرباً معنا
               </button>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 text-center space-y-2">
               <Award size={32} className="text-[#e1b000] mx-auto mb-2" />
               <p className="text-3xl font-black text-white">1.2k</p>
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">شهادة معتمدة</p>
            </div>
            <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 text-center space-y-2">
               <Users size={32} className="text-blue-500 mx-auto mb-2" />
               <p className="text-3xl font-black text-white">24</p>
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">خبير مدرب</p>
            </div>
         </div>
      </div>

      <div className="space-y-8">
         <div className="flex justify-between items-center px-4">
            <h2 className="text-2xl font-black text-white">الدورات التدريبية والشهادات</h2>
            <button className="text-blue-500 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">عرض كافة المسارات <ArrowLeft size={14}/></button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
               <div key={course.id} className="glass-morphism rounded-[3rem] overflow-hidden border border-slate-800 group hover:border-[#00338d]/40 transition-all shadow-2xl flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                     <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute top-4 left-4 bg-[#00338d] text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase flex items-center gap-2">
                        <Award size={12}/> شهادة معتمدة
                     </div>
                  </div>
                  <div className="p-8 space-y-4 flex-1 flex flex-col">
                     <h3 className="text-xl font-bold text-white group-hover:text-[#e1b000] transition-colors">{course.title}</h3>
                     <p className="text-xs text-slate-500 font-bold">الخبير المدرب: {course.trainer}</p>
                     <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-800 mt-auto">
                        <div className="flex items-center gap-2"><Clock size={14}/> {course.duration}</div>
                        <div className="flex items-center gap-2"><Users size={14}/> {course.enrolled} زميل</div>
                     </div>
                     <button className="w-full mt-6 py-4 bg-[#00338d] hover:bg-blue-600 text-white rounded-2xl font-black text-xs shadow-xl transition-all">الالتحاق بالدورة</button>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Become a Trainer Modal */}
      {showTrainerModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in">
           <div className="w-full max-w-2xl glass-morphism border border-slate-800 rounded-[4rem] p-12 overflow-hidden animate-in zoom-in-95 shadow-3xl">
              <div className="flex justify-between items-center mb-10">
                 <button onClick={() => setShowTrainerModal(false)} className="text-slate-500 hover:text-white"><X size={24}/></button>
                 <h2 className="text-3xl font-black text-white">طلب الانضمام للهيئة التدريبية</h2>
              </div>
              <form className="space-y-6 text-right">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] text-slate-500 font-black uppercase pr-4">الاسم الكامل</label>
                       <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#e1b000]" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] text-slate-500 font-black uppercase pr-4">مجال الخبرة الرئيسية</label>
                       <input type="text" placeholder="مثلاً: التحقق الرقمي" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#e1b000]" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase pr-4">نبذة مهنية (Bio)</label>
                    <textarea className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-6 py-4 text-white outline-none focus:border-[#e1b000] min-h-[120px]" />
                 </div>
                 <button className="w-full py-6 bg-[#e1b000] text-[#00338d] rounded-[2rem] font-black text-lg shadow-3xl flex items-center justify-center gap-4 hover:bg-yellow-500 transition-all">
                    إرسال الملف المهني <Send size={20} className="rotate-180" />
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AcademyPage;
