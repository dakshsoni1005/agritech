import React from 'react';
import { 
  X, MapPin, Layers, Thermometer, CloudRain, Calendar, Clock, 
  Droplets, FlaskConical, Sprout, TrendingUp, Bug, ShieldCheck, 
  DollarSign, Tag, Award, RotateCcw 
} from 'lucide-react';

export default function CropDetailModal({ crop, onClose, lang }) {
  if (!crop) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      {/* 30% secondary background container */}
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-scale-up">
        
        {/* Modal Header */}
        <div className="relative h-48 sm:h-64 shrink-0">
          <img
            src={crop.imageUrl}
            alt={crop.cropName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/90 border border-slate-850 text-slate-350 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="bg-slate-950/90 text-emerald-500 border border-slate-850 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-2">
              {crop.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
              {crop.cropName} <span className="text-emerald-500 font-extrabold">({crop.gujaratiName})</span>
            </h2>
          </div>
        </div>

        {/* Modal Body - 18 Field Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 scrollbar-thin">
          
          {/* Recessed description (60% dominant) */}
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
            {crop.description}
          </p>

          {/* Section 1: Geographic & Environmental Suitability */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-black text-slate-350 flex items-center space-x-2 border-b border-slate-850 pb-2.5">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'gu' ? '૧. પ્રાદેશિક અને વાતાવરણ અનુકૂળતા' : '1. Regional & Climate Suitability'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Field 3: Suitable Regions */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block mb-2">
                  Field 3 • Suitable Regions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {crop.suitableRegions.map((r, i) => (
                    <span key={i} className="bg-slate-900 text-slate-300 border border-slate-800 text-xs font-bold px-2.5 py-1 rounded-xl">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Field 4: Suitable Soil Types */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-455 font-bold uppercase tracking-wider block mb-2">
                  Field 4 • Suitable Soils
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {crop.suitableSoilTypes.map((s, i) => (
                    <span key={i} className="bg-slate-900 text-slate-300 border border-slate-800 text-xs font-bold px-2.5 py-1 rounded-xl">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Field 5: Ideal Temperature Range */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850 flex items-center space-x-3.5">
                <div className="p-3 bg-slate-900 rounded-xl text-amber-500 border border-slate-800">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-455 font-bold uppercase block">
                    Field 5 • Ideal Temp (તાપમાન)
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-100">{crop.idealTempRange}</span>
                </div>
              </div>

              {/* Field 6: Ideal Rainfall Range */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850 flex items-center space-x-3.5">
                <div className="p-3 bg-slate-900 rounded-xl text-emerald-500 border border-slate-800">
                  <CloudRain className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-455 font-bold uppercase block">
                    Field 6 • Ideal Rainfall (વરસાદ દર)
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-100">{crop.idealRainfallRange}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Section 2: Cultivation Specifications & Timeline */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-black text-slate-350 flex items-center space-x-2 border-b border-slate-855 pb-2.5">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'gu' ? '૨. વાવેતર સમયપત્રક અને કૃષિ વિગતો' : '2. Sowing Timeline & Farming Specs'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* Field 7: Sowing Months */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-455 font-bold uppercase block mb-1.5">
                  Field 7 • Sowing Months
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-200 block">{crop.sowingMonths.join(', ')}</span>
              </div>

              {/* Field 8: Harvest Months */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-455 font-bold uppercase block mb-1.5">
                  Field 8 • Harvest Months
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-200 block">{crop.harvestMonths.join(', ')}</span>
              </div>

              {/* Field 9: Water Requirement */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-455 font-bold uppercase block mb-1.5">
                  Field 9 • Irrigation (પિયત)
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-200 block">{crop.waterRequirement}</span>
              </div>

              {/* Field 11: Seed Rate */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-455 font-bold uppercase block mb-1.5">
                  Field 11 • Seed Rate (બિયારણ)
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-200 block">{crop.seedRate}</span>
              </div>

            </div>

            {/* Field 10: Fertilizer Recommendation */}
            <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
              <span className="text-[10px] text-slate-455 font-bold uppercase tracking-wider block mb-2 flex items-center space-x-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-emerald-500" />
                <span>Field 10 • Fertilizer (NPK) Dosage (ખાતર ભલામણ)</span>
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-emerald-500 leading-relaxed">{crop.fertilizerRecommendation}</p>
            </div>
          </div>

          {/* Section 3: Yield, Cost & Market Economics */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-black text-slate-355 flex items-center space-x-2 border-b border-slate-855 pb-2.5">
              <DollarSign className="w-4 h-4 text-amber-500" />
              <span>{lang === 'gu' ? '૩. ઉત્પાદન, ખર્ચ અને બજાર ભાવ' : '3. Yield & Financial Estimates'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Field 12: Average Yield */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-455 font-bold uppercase block mb-1">
                  Field 12 • Average Yield
                </span>
                <span className="text-base sm:text-lg font-black text-slate-100">{crop.averageYield}</span>
              </div>

              {/* Field 15: Estimated Cultivation Cost */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-455 font-bold uppercase block mb-1">
                  Field 15 • Cultivation Cost
                </span>
                <span className="text-base sm:text-lg font-black text-slate-200">{crop.estimatedCultivationCost}</span>
              </div>

              {/* Field 16: Expected Market Price */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-455 font-bold uppercase block mb-1">
                  Field 16 • Market Price
                </span>
                <span className="text-base sm:text-lg font-black text-slate-200">{crop.expectedMarketPrice}</span>
              </div>

            </div>

            {/* Field 17: Estimated Profit Range (10% Accent Gold focus) */}
            <div className="bg-slate-955 p-5 rounded-2xl border border-slate-850 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider block mb-0.5">
                  Field 17 • Estimated Net Profit Range
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-500">{crop.estimatedProfitRange}</span>
              </div>
              <Award className="w-8 h-8 text-amber-500 hidden sm:block shrink-0 animate-bounce" style={{ animationDuration: '4s' }} />
            </div>
          </div>

          {/* Section 4: Pest Management & Companion Rotation */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-black text-slate-355 flex items-center space-x-2 border-b border-slate-855 pb-2.5">
              <Bug className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'gu' ? '૪. રોગ નિયંત્રણ અને આંતરપાક' : '4. Pest Management & Crop Rotation'}</span>
            </h3>

            <div className="space-y-4">
              
              {/* Field 13: Common Diseases & Pests */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-emerald-500 font-extrabold uppercase block mb-1">
                  Field 13 • Common Pests & Diseases
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-relaxed">{crop.commonDiseasesAndPests}</p>
              </div>

              {/* Field 14: Prevention Methods */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-emerald-500 font-extrabold uppercase block mb-1">
                  Field 14 • Control & Prevention Methods
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-relaxed">{crop.preventionMethods}</p>
              </div>

              {/* Field 18: Companion & Rotation Crops */}
              <div className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-emerald-500 font-extrabold uppercase block mb-1">
                  Field 18 • Companion & Rotation Advice
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-relaxed">{crop.suitableCompanionCrops}</p>
              </div>

            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4.5 bg-slate-950 border-t border-slate-850 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-extrabold text-xs tracking-wider uppercase border border-slate-850 hover:border-slate-800 transition-all duration-300 cursor-pointer"
          >
            {lang === 'gu' ? 'બંધ કરો (Close)' : 'Close Advisory'}
          </button>
        </div>

      </div>
    </div>
  );
}
