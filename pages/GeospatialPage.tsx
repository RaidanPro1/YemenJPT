
import React from 'react';
import { Map as MapIcon, Layers, Navigation, Plus, Filter, Info } from 'lucide-react';
import { notificationService } from '../services/notifications';

const GeospatialPage: React.FC = () => {
  const handleAddReport = () => {
    notificationService.notify(`📍 <b>New Geospatial Report Initiated</b>\nUser is drafting a violation report on the map.`);
    alert("سيتم فتح واجهة إضافة بلاغ جغرافي جديد.");
  };

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-right">
          <h1 className="text-2xl font-bold text-white">الرصد الجغرافي (Geospatial)</h1>
          <p className="text-slate-400">توثيق الانتهاكات ورصد الأحداث على الخرائط التفاعلية.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={handleAddReport}
             className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
           >
            <Plus size={16} /> إضافة بلاغ جديد
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Map Sidebar */}
        <div className="w-80 flex flex-col gap-4">
          <div className="glass-morphism p-5 rounded-2xl">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Filter size={16} className="text-blue-500" /> تصفية الخريطة
            </h3>
            <div className="space-y-3">
              {[
                { label: 'أحداث قصف', color: 'bg-red-500' },
                { label: 'اشتباكات مسلحة', color: 'bg-orange-500' },
                { label: 'تجمعات مدنية', color: 'bg-blue-500' },
                { label: 'كوارث طبيعية', color: 'bg-emerald-500' },
              ].map((cat, idx) => (
                <label key={idx} className="flex flex-row-reverse items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-600" defaultChecked />
                  <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="glass-morphism p-5 rounded-2xl flex-1 overflow-y-auto custom-scrollbar">
            <h3 className="text-sm font-bold text-white mb-4 text-right">آخر البلاغات (Ushahidi)</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="p-3 bg-slate-800/50 rounded-xl border border-transparent hover:border-slate-700 cursor-pointer text-right">
                  <p className="text-xs text-blue-400 mb-1">قبل 15 دقيقة • مأرب</p>
                  <p className="text-sm font-medium text-slate-200 mb-2">رصد انفجار في الضواحي الغربية للمدينة...</p>
                  <div className="flex flex-row-reverse items-center gap-2 text-[10px] text-slate-500">
                    <Info size={10} /> مصدر موثق
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mock Map Area */}
        <div className="flex-1 glass-morphism rounded-3xl relative overflow-hidden bg-[#1e293b]">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-orange-500 rounded-full opacity-60"></div>
          </div>
          
          {/* Map Controls */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <button className="p-3 bg-slate-900/90 text-white rounded-xl border border-slate-800 shadow-2xl hover:bg-slate-800"><Plus size={20} /></button>
            <button className="p-3 bg-slate-900/90 text-white rounded-xl border border-slate-800 shadow-2xl hover:bg-slate-800"><Layers size={20} /></button>
            <button className="p-3 bg-slate-900/90 text-white rounded-xl border border-slate-800 shadow-2xl hover:bg-slate-800"><Navigation size={20} /></button>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-6 right-6 p-4 glass-morphism rounded-2xl border border-slate-700 text-right">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">خريطة اليمن الرقمية</p>
            <p className="text-sm font-medium text-white">Tile Server: OSM Yemen (Local)</p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-slate-600 flex flex-col items-center">
              <MapIcon size={64} className="mb-4 opacity-20" />
              <p className="font-bold opacity-30 text-xl">Kepler.gl Instance Loaded</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeospatialPage;
