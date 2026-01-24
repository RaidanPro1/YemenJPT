
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { MapPin, Layers, Navigation, Plus, Filter, Info, ShieldCheck, Calendar, X } from 'lucide-react';
import { notificationService } from '../services/notifications';
import { GeospatialReport, ViolationCategory } from '../types';
import L from 'leaflet';

const MOCK_REPORTS: GeospatialReport[] = [
  { id: '1', title: 'حادث قصف في الضواحي الغربية', category: ViolationCategory.SHELLING, lat: 15.45, lng: 45.33, date: '2024-05-20', description: 'رصد انفجار ناتج عن قصف مدفعي في منطقة صرواح.', isVerified: true },
  { id: '2', title: 'اشتباكات مسلحة وسط المدينة', category: ViolationCategory.CLASHES, lat: 15.48, lng: 45.35, date: '2024-05-21', description: 'سماع دوي إطلاق نار كثيف في المربع السكني الثالث.', isVerified: false },
  { id: '3', title: 'تجمع مدني للمطالبة بالخدمات', category: ViolationCategory.GATHERING, lat: 15.42, lng: 45.30, date: '2024-05-19', description: 'وقفة احتجاجية سلمية أمام مبنى السلطة المحلية.', isVerified: true },
  { id: '4', title: 'سيول جارفة في وادي عبيدة', category: ViolationCategory.DISASTER, lat: 15.40, lng: 45.45, date: '2024-05-18', description: 'تضرر عدد من المزارع نتيجة السيول الغزيرة.', isVerified: true },
  { id: '5', title: 'حملة اعتقالات تعسفية', category: ViolationCategory.ARREST, lat: 15.47, lng: 45.32, date: '2024-05-22', description: 'قوات أمنية تداهم منازل ناشطين في حي الروضة.', isVerified: false },
];

const CATEGORY_COLORS: Record<ViolationCategory, string> = {
  [ViolationCategory.SHELLING]: '#ef4444', // Red
  [ViolationCategory.CLASHES]: '#f97316', // Orange
  [ViolationCategory.GATHERING]: '#3b82f6', // Blue
  [ViolationCategory.DISASTER]: '#10b981', // Emerald
  [ViolationCategory.ARREST]: '#8b5cf6', // Violet
};

const GeospatialPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  
  const [selectedCategories, setSelectedCategories] = useState<ViolationCategory[]>(Object.values(ViolationCategory));
  const [dateRange, setDateRange] = useState({ start: '2024-05-01', end: '2024-05-31' });
  const [reports] = useState<GeospatialReport[]>(MOCK_REPORTS);

  const filteredReports = useMemo(() => {
    return reports.filter(r => 
      selectedCategories.includes(r.category) &&
      r.date >= dateRange.start &&
      r.date <= dateRange.end
    );
  }, [reports, selectedCategories, dateRange]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [15.45, 45.33], // Center on Marib, Yemen
      zoom: 12,
      zoomControl: false,
    });
    mapRef.current = map;

    // Add sovereign tiles (OSM with dark theme styling via CSS)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors | YemenJPT Sovereign Node',
      className: 'map-tiles-dark'
    }).addTo(map);

    // Add zoom control to top-left
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Initialize markers layer
    const markers = L.layerGroup().addTo(map);
    markersRef.current = markers;

    return () => {
      map.remove();
    };
  }, []);

  // Update markers when filteredReports change
  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;

    markersRef.current.clearLayers();

    filteredReports.forEach(report => {
      const color = CATEGORY_COLORS[report.category];
      const marker = L.circleMarker([report.lat, report.lng], {
        radius: 10,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      });

      const popupContent = `
        <div class="p-2 text-right" dir="rtl">
          <p class="font-black text-sm mb-1">${report.title}</p>
          <p class="text-[10px] text-slate-400 mb-2">${report.date} • ${report.category}</p>
          <p class="text-xs leading-relaxed text-slate-200">${report.description}</p>
          <div class="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
             <span class="text-[9px] font-black ${report.isVerified ? 'text-emerald-400' : 'text-amber-400'} uppercase">
                ${report.isVerified ? '✓ تم التحقق' : '⏳ قيد التحقق'}
             </span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current?.addLayer(marker);
    });
  }, [filteredReports]);

  const toggleCategory = (cat: ViolationCategory) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleAddReport = () => {
    notificationService.notify(`📍 <b>New Geospatial Report Initiated</b>\nUser is drafting a violation report on the map.`);
    alert("سيتم فتح واجهة إضافة بلاغ جغرافي جديد لتحديد الإحداثيات يدوياً.");
  };

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col font-ar animate-in fade-in" dir="rtl">
      <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-6">
        <div className="text-right">
          <h1 className="text-3xl font-black text-white tracking-tight flex flex-row-reverse items-center gap-4">
             <MapPin size={32} className="text-[#e1b000]" /> الرصد الجغرافي التفاعلي
          </h1>
          <p className="text-slate-400 font-medium">نظام "إسطرلاب" لتوثيق وتحليل الانتهاكات مكانياً عبر YemenJPT Grid.</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={handleAddReport}
             className="bg-[#003087] hover:bg-blue-600 text-white px-8 py-3 rounded-2xl text-xs font-black shadow-xl flex items-center gap-3 transition-all active:scale-95"
           >
            <Plus size={18} /> إضافة بلاغ مكاني
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden">
        {/* Map Sidebar / Controls */}
        <div className="w-96 flex flex-col gap-6">
          <div className="glass-morphism p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
            <h3 className="text-sm font-black text-white mb-6 flex flex-row-reverse items-center gap-3">
              <Filter size={18} className="text-[#e1b000]" /> تصفية الخريطة
            </h3>
            
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 text-right">تصنيفات الانتهاكات</p>
              <div className="space-y-3">
                {Object.values(ViolationCategory).map((cat) => (
                  <label key={cat} className="flex flex-row-reverse items-center gap-4 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-lg border-slate-700 bg-slate-800 text-[#003087] focus:ring-[#003087]" 
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span className={`w-3 h-3 rounded-full`} style={{ backgroundColor: CATEGORY_COLORS[cat] }}></span>
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors flex-1 text-right">{cat}</span>
                  </label>
                ))}
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 space-y-4">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 text-right">النطاق الزمني</p>
                 <div className="grid grid-cols-1 gap-3">
                    <div className="relative">
                       <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                       <input 
                         type="date" 
                         value={dateRange.start}
                         onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))}
                         className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-[10px] text-white outline-none focus:border-[#003087] text-right" 
                       />
                    </div>
                    <div className="relative">
                       <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                       <input 
                         type="date" 
                         value={dateRange.end}
                         onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))}
                         className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-[10px] text-white outline-none focus:border-[#003087] text-right" 
                       />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="glass-morphism p-8 rounded-[2.5rem] border border-slate-800 flex-1 overflow-y-auto custom-scrollbar shadow-2xl">
            <h3 className="text-sm font-black text-white mb-6 text-right flex flex-row-reverse items-center gap-3">
              <History size={18} className="text-blue-500" /> البلاغات الأخيرة ({filteredReports.length})
            </h3>
            <div className="space-y-4">
              {filteredReports.map(report => (
                <div 
                  key={report.id} 
                  onClick={() => mapRef.current?.setView([report.lat, report.lng], 15)}
                  className="p-5 bg-slate-950/50 rounded-2xl border border-transparent hover:border-[#003087] cursor-pointer text-right group transition-all"
                >
                  <p className="text-[10px] font-black text-slate-500 mb-1 flex flex-row-reverse items-center justify-between">
                     <span>{report.date}</span>
                     <span className="flex items-center gap-2" style={{ color: CATEGORY_COLORS[report.category] }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[report.category] }}></span>
                        {report.category}
                     </span>
                  </p>
                  <p className="text-sm font-black text-slate-200 mb-2 group-hover:text-white">{report.title}</p>
                  <div className="flex flex-row-reverse items-center gap-2 text-[9px] font-bold text-slate-600">
                    <ShieldCheck size={12} className={report.isVerified ? 'text-emerald-500' : 'text-slate-700'} />
                    {report.isVerified ? 'مصدر موثق سيادياً' : 'بانتظار التحقق'}
                  </div>
                </div>
              ))}
              {filteredReports.length === 0 && (
                <div className="py-10 text-center space-y-4 opacity-30">
                   <Info size={40} className="mx-auto" />
                   <p className="text-xs font-black uppercase tracking-widest">لا توجد بلاغات لهذا النطاق</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Map Area */}
        <div className="flex-1 glass-morphism rounded-[3.5rem] relative overflow-hidden border border-slate-800 shadow-3xl bg-slate-950">
          <div ref={mapContainerRef} className="absolute inset-0 z-0 h-full w-full" />
          
          {/* Map Legend Overlay */}
          <div className="absolute bottom-10 right-10 p-6 glass-morphism rounded-[2.5rem] border border-slate-700 text-right z-10 shadow-3xl pointer-events-none">
            <div className="flex flex-row-reverse items-center gap-4 mb-3">
               <Layers size={16} className="text-[#e1b000]" />
               <p className="text-[10px] uppercase font-black text-white tracking-widest">خريطة YemenJPT الرقمية</p>
            </div>
            <p className="text-xs font-bold text-slate-400">Tile Server: OpenStreetMap (OSM) Yemen Node</p>
            <div className="mt-4 flex flex-row-reverse items-center gap-4">
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-[9px] font-black text-emerald-400 uppercase">Operational</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-[9px] font-black text-blue-400 uppercase">E2EE Stream</span>
               </div>
            </div>
          </div>

          <div className="absolute top-10 right-10 flex flex-col gap-3 z-10">
            <button className="p-4 glass-morphism text-white rounded-2xl border border-slate-800 shadow-2xl hover:bg-[#003087] transition-all"><Plus size={20} /></button>
            <button className="p-4 glass-morphism text-white rounded-2xl border border-slate-800 shadow-2xl hover:bg-[#003087] transition-all"><Navigation size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeospatialPage;
