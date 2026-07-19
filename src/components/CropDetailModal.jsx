import React from 'react';
import { 
  X, MapPin, Layers, Thermometer, CloudRain, Calendar, 
  FlaskConical, Sprout, Award, Bug, ShieldCheck, DollarSign 
} from 'lucide-react';

export default function CropDetailModal({ crop, onClose, lang }) {
  if (!crop) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-955/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      {/* 30% secondary background container with background image */}
      <div 
        className="w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col animate-scale-up border border-white/10 relative"
        style={{ 
          backgroundImage: 'url(/farmer_map.jpg)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Darkening overlay for readability */}
        <div className="absolute inset-0 bg-slate-955/65 pointer-events-none z-0"></div>
        
        {/* Modal Header */}
        <div className="relative z-10 px-6 py-4.5 border-b border-white/10 bg-slate-950/70 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <Sprout className="w-5.5 h-5.5 text-emerald-500" />
            <span className="font-black text-slate-100 text-base tracking-tight">
              {lang === 'gu' ? 'પાક સલાહ પત્રક' : 'Crop Advisory Specification'}
            </span>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Modal Body - Amazon-style Split Layout */}
        <div className="relative z-10 flex-1 overflow-y-auto min-h-0 lg:flex lg:space-x-0">
          
          {/* Left Column: Image, Title, Description */}
          <div className="lg:w-[38%] p-6 lg:p-8 space-y-5 border-b lg:border-b-0 lg:border-r border-white/10 shrink-0 bg-slate-950/60 backdrop-blur-lg lg:overflow-y-auto scrollbar-thin">
            
            {/* Crop Photo Container */}
            <div className="w-full aspect-[16/10] lg:aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-md relative group select-none">
              <img
                src={crop.imageUrl}
                alt={crop.cropName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3.5 left-3.5 bg-slate-955/90 text-emerald-400 border border-white/10 text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                {crop.category}
              </span>
            </div>

            {/* Brand Title Panel */}
            <div className="space-y-2">
              <h2 className="text-2xl lg:text-3xl font-black text-slate-100 tracking-tight leading-tight">
                {crop.cropName} <span className="text-emerald-400 font-extrabold">({crop.gujaratiName})</span>
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] bg-slate-950/60 text-slate-350 font-black border border-white/10 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  {crop.category}
                </span>
                <span className="text-[10px] bg-slate-950/60 text-emerald-400 font-black border border-white/10 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  Gujarat MSP Suitability
                </span>
              </div>
            </div>

            {/* Overview / Description */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                {lang === 'gu' ? 'પાક પરિચય' : 'Crop Description'}
              </span>
              <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed bg-slate-900/50 backdrop-blur-md p-4.5 rounded-2xl border border-white/5">
                {crop.description}
              </p>
            </div>

          </div>

          {/* Right Column: Dynamic Parameters Grouped in 4 Cards */}
          <div className="lg:w-[62%] p-6 lg:p-8 space-y-6 lg:overflow-y-auto scrollbar-thin bg-slate-955/40 backdrop-blur-md">
            
            {/* CARD 1: Climate & Soil Suitability */}
            <div className="bg-slate-900/65 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-4 shadow-lg">
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center space-x-2 border-b border-white/5 pb-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'gu' ? '૧. પ્રાદેશિક અને વાતાવરણ અનુકૂળતા' : '1. Regional & Climate Suitability'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Suitable Regions */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Suitable Regions</span>
                  <div className="flex flex-wrap gap-1">
                    {crop.suitableRegions.map((r, i) => (
                      <span key={i} className="bg-slate-950/60 border border-white/10 text-slate-200 text-xs font-bold px-2.5 py-0.5 rounded-lg">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Soil Types */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Suitable Soils</span>
                  <div className="flex flex-wrap gap-1">
                    {crop.suitableSoilTypes.map((s, i) => (
                      <span key={i} className="bg-slate-950/60 border border-white/10 text-slate-200 text-xs font-bold px-2.5 py-0.5 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Temp */}
                <div className="flex items-center space-x-3 bg-slate-955/50 p-3 rounded-xl border border-white/5">
                  <Thermometer className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Ideal Temperature</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-100">{crop.idealTempRange}</span>
                  </div>
                </div>

                {/* Rainfall */}
                <div className="flex items-center space-x-3 bg-slate-955/50 p-3 rounded-xl border border-white/5">
                  <CloudRain className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Ideal Rainfall</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-100">{crop.idealRainfallRange}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: Cultivation timeline */}
            <div className="bg-slate-900/65 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-4 shadow-lg">
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center space-x-2 border-b border-white/5 pb-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'gu' ? '૨. વાવેતર વિગતો અને સમયપત્રક' : '2. Cultivation Timeline & Sowing'}</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-955/50 p-3 rounded-xl border border-white/5 text-center">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Sowing Months</span>
                  <span className="text-xs font-extrabold text-slate-200 mt-1 block">{crop.sowingMonths.join(', ')}</span>
                </div>

                <div className="bg-slate-955/50 p-3 rounded-xl border border-white/5 text-center">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Harvest Months</span>
                  <span className="text-xs font-extrabold text-slate-200 mt-1 block">{crop.harvestMonths.join(', ')}</span>
                </div>

                <div className="bg-slate-955/50 p-3 rounded-xl border border-white/5 text-center">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Irrigation</span>
                  <span className="text-xs font-extrabold text-slate-200 mt-1 block">{crop.waterRequirement}</span>
                </div>

                <div className="bg-slate-955/50 p-3 rounded-xl border border-white/5 text-center">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Seed Rate</span>
                  <span className="text-xs font-extrabold text-slate-200 mt-1 block">{crop.seedRate}</span>
                </div>
              </div>

              {/* Fertilizer Recommendation */}
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-300 font-black uppercase flex items-center space-x-1">
                  <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Fertilizer Dosage (ખાતર જરૂરિયાત N-P-K)</span>
                </span>
                <p className="text-xs font-bold text-emerald-400">{crop.fertilizerRecommendation}</p>
              </div>
            </div>

            {/* CARD 3: Market Economics */}
            <div className="bg-slate-900/65 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-4 shadow-lg">
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center space-x-2 border-b border-white/5 pb-2">
                <DollarSign className="w-4 h-4 text-amber-500" />
                <span>{lang === 'gu' ? '૩. ઉત્પાદન અને બજાર કિંમત' : '3. Economics & Market Price'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-955/50 p-3 rounded-xl border border-white/5 text-center">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Average Yield</span>
                  <span className="text-sm font-extrabold text-slate-100 mt-1 block">{crop.averageYield}</span>
                </div>

                <div className="bg-slate-955/50 p-3 rounded-xl border border-white/5 text-center">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Cultivation Cost</span>
                  <span className="text-sm font-extrabold text-slate-200 mt-1 block">{crop.estimatedCultivationCost}</span>
                </div>

                <div className="bg-slate-955/50 p-3 rounded-xl border border-white/5 text-center">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">Expected Price</span>
                  <span className="text-sm font-extrabold text-slate-200 mt-1 block">{crop.expectedMarketPrice}</span>
                </div>
              </div>

              {/* Net Profit Range */}
              <div className="bg-emerald-950/40 backdrop-blur-md p-4 rounded-xl border border-emerald-500/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-400/90 font-black uppercase tracking-wider block">Estimated Profit Range (નફા ગણતરી)</span>
                  <span className="text-lg sm:text-xl font-black text-amber-500 mt-0.5 block">{crop.estimatedProfitRange}</span>
                </div>
                <Award className="w-8 h-8 text-amber-500 shrink-0" />
              </div>
            </div>

            {/* CARD 4: Pest Management */}
            <div className="bg-slate-900/65 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-4 shadow-lg">
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center space-x-2 border-b border-white/5 pb-2">
                <Bug className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'gu' ? '૪. રોગ નિયંત્રણ અને આંતરપાક' : '4. Pest Management & Rotation'}</span>
              </h4>

              <div className="space-y-3.5">
                <div className="space-y-1">
                  <span className="text-[10px] text-emerald-400 font-black uppercase block">Common Pests & Diseases</span>
                  <p className="text-xs font-bold text-slate-300 leading-relaxed bg-slate-955/60 p-3 rounded-xl border border-white/5">
                    {crop.commonDiseasesAndPests}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-emerald-400 font-black uppercase block">Control & Prevention Methods</span>
                  <p className="text-xs font-bold text-slate-300 leading-relaxed bg-slate-955/60 p-3 rounded-xl border border-white/5">
                    {crop.preventionMethods}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-emerald-400 font-black uppercase block">Companion Rotation Crops</span>
                  <p className="text-xs font-bold text-slate-300 leading-relaxed bg-slate-955/60 p-3 rounded-xl border border-white/5">
                    {crop.suitableCompanionCrops}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="relative z-10 p-4.5 bg-slate-950/70 backdrop-blur-md border-t border-white/10 flex justify-end shrink-0 select-none">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 text-slate-100 font-extrabold text-xs tracking-wider uppercase border border-white/10 transition-all duration-300 cursor-pointer"
          >
            {lang === 'gu' ? 'બંધ કરો (Close)' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}
