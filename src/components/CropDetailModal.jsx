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
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-scale-up">
        
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
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-2">
              {crop.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {crop.cropName} <span className="text-emerald-400 font-extrabold">({crop.gujaratiName})</span>
            </h2>
          </div>
        </div>

        {/* Modal Body - 18 Field Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          <p className="text-sm text-slate-300 font-medium leading-relaxed bg-slate-800/50 p-4 rounded-2xl border border-slate-700/80">
            {crop.description}
          </p>

          {/* Section 1: Geographic & Environmental Suitability */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-4 flex items-center space-x-2 border-b border-slate-800 pb-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'gu' ? '૧. પ્રાદેશિક અને વાતાવરણ અનુકૂળતા (Regional & Climate)' : '1. Regional & Climate Suitability'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Field 3: Suitable Regions */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                  Field 3 • Suitable Regions (લાયક વિસ્તારો)
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {crop.suitableRegions.map((r, i) => (
                    <span key={i} className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Field 4: Suitable Soil Types */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                  Field 4 • Suitable Soil Types (અનુકૂળ જમીન)
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {crop.suitableSoilTypes.map((s, i) => (
                    <span key={i} className="bg-amber-950/70 text-amber-300 border border-amber-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Field 5: Ideal Temperature Range */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 flex items-center space-x-3">
                <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold uppercase block">
                    Field 5 • Ideal Temperature (તાપમાન)
                  </span>
                  <span className="text-base font-bold text-white">{crop.idealTempRange}</span>
                </div>
              </div>

              {/* Field 6: Ideal Rainfall Range */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 flex items-center space-x-3">
                <div className="p-2.5 bg-sky-500/10 rounded-xl text-sky-400">
                  <CloudRain className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold uppercase block">
                    Field 6 • Ideal Rainfall (વરસાદ દર)
                  </span>
                  <span className="text-base font-bold text-white">{crop.idealRainfallRange}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Section 2: Cultivation Specifications & Timeline */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-teal-400 mb-4 flex items-center space-x-2 border-b border-slate-800 pb-2">
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>{lang === 'gu' ? '૨. વાવેતર સમયપત્રક અને કૃષિ વિગતો (Cultivation Specs)' : '2. Sowing Timeline & Farming Specs'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* Field 7: Sowing Months */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <span className="text-[11px] text-slate-400 font-semibold uppercase block mb-1">
                  Field 7 • Sowing Months (વાવણી)
                </span>
                <span className="text-xs font-bold text-emerald-400 block">{crop.sowingMonths.join(', ')}</span>
              </div>

              {/* Field 8: Harvest Months */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <span className="text-[11px] text-slate-400 font-semibold uppercase block mb-1">
                  Field 8 • Harvest Months (લણણી)
                </span>
                <span className="text-xs font-bold text-amber-400 block">{crop.harvestMonths.join(', ')}</span>
              </div>

              {/* Field 9: Water Requirement */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <span className="text-[11px] text-slate-400 font-semibold uppercase block mb-1">
                  Field 9 • Water Requirement (પિયત)
                </span>
                <span className="text-xs font-bold text-sky-300 block">{crop.waterRequirement}</span>
              </div>

              {/* Field 11: Seed Rate */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <span className="text-[11px] text-slate-400 font-semibold uppercase block mb-1">
                  Field 11 • Seed Rate (બિયારણ)
                </span>
                <span className="text-xs font-bold text-purple-300 block">{crop.seedRate}</span>
              </div>

            </div>

            {/* Field 10: Fertilizer Recommendation */}
            <div className="mt-4 bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1 flex items-center space-x-1">
                <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                <span>Field 10 • Fertilizer (NPK) Recommendation (ખાતર ભલામણ)</span>
              </span>
              <p className="text-sm font-bold text-emerald-300 mt-1">{crop.fertilizerRecommendation}</p>
            </div>
          </div>

          {/* Section 3: Yield, Cost & Market Economics */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-amber-400 mb-4 flex items-center space-x-2 border-b border-slate-800 pb-2">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>{lang === 'gu' ? '૩. ઉત્પાદન, ખર્ચ અને બજાર ભાવ (Yield & Financials)' : '3. Yield & Financial Estimates'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Field 12: Average Yield */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 font-semibold uppercase block mb-1">
                  Field 12 • Average Yield (ઉત્પાદન)
                </span>
                <span className="text-lg font-black text-white">{crop.averageYield}</span>
              </div>

              {/* Field 15: Estimated Cultivation Cost */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 font-semibold uppercase block mb-1">
                  Field 15 • Cultivation Cost (વાવેતર ખર્ચ)
                </span>
                <span className="text-lg font-black text-rose-400">{crop.estimatedCultivationCost}</span>
              </div>

              {/* Field 16: Expected Market Price */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 font-semibold uppercase block mb-1">
                  Field 16 • Market Price (બજાર ભાવ)
                </span>
                <span className="text-lg font-black text-sky-400">{crop.expectedMarketPrice}</span>
              </div>

            </div>

            {/* Field 17: Estimated Profit Range */}
            <div className="mt-4 bg-emerald-950/70 p-4 rounded-2xl border border-emerald-600/50 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block">
                  Field 17 • Estimated Profit Range (અંદાજિત ચોખ્ખો નફો / હેક્ટર)
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-300">{crop.estimatedProfitRange}</span>
              </div>
              <Award className="w-8 h-8 text-amber-400 hidden sm:block" />
            </div>
          </div>

          {/* Section 4: Pest Management & Companion Rotation */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-rose-400 mb-4 flex items-center space-x-2 border-b border-slate-800 pb-2">
              <Bug className="w-4 h-4 text-rose-400" />
              <span>{lang === 'gu' ? '૪. રોગ નિયંત્રણ અને આંતરપાક (Pests & Rotation)' : '4. Pest Management & Crop Rotation'}</span>
            </h3>

            <div className="space-y-4">
              
              {/* Field 13: Common Diseases & Pests */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 font-semibold uppercase block mb-1 text-rose-300">
                  Field 13 • Common Diseases & Pests (મુખ્ય રોગ અને જીવાત)
                </span>
                <p className="text-sm font-medium text-slate-200">{crop.commonDiseasesAndPests}</p>
              </div>

              {/* Field 14: Prevention Methods */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 font-semibold uppercase block mb-1 text-emerald-400">
                  Field 14 • Prevention Methods (રોગ નિયંત્રણ પદ્ધતિઓ)
                </span>
                <p className="text-sm font-medium text-slate-200">{crop.preventionMethods}</p>
              </div>

              {/* Field 18: Companion & Rotation Crops */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 font-semibold uppercase block mb-1 text-amber-400">
                  Field 18 • Suitable Companion/Rotation Crops (પાક ફેરબદલી અને આંતરપાક)
                </span>
                <p className="text-sm font-medium text-slate-200">{crop.suitableCompanionCrops}</p>
              </div>

            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all"
          >
            {lang === 'gu' ? 'બંધ કરો (Close)' : 'Close Advisory'}
          </button>
        </div>

      </div>
    </div>
  );
}
