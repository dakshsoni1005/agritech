import React, { useState } from 'react';
import { CROP_DATABASE } from '../data/cropDatabase';
import { Calculator, FlaskConical, ShieldAlert, Sparkles, Receipt, Sprout } from 'lucide-react';

export default function ProfitCalculator({ lang }) {
  const [selectedCropId, setSelectedCropId] = useState('groundnut');
  const [farmSize, setFarmSize] = useState(2);
  const [unit, setUnit] = useState('hectare');

  const selectedCrop = CROP_DATABASE.find((c) => c.id === selectedCropId) || CROP_DATABASE[0];

  // Farm size in Hectares (1 Hectare = 6.25 Bigha)
  const sizeInHa = unit === 'bigha' ? farmSize / 6.25 : farmSize;

  // Extract profit range
  const profitMatch = selectedCrop.estimatedProfitRange.match(/₹([\d,]+)\s*-\s*₹([\d,]+)/);
  const minPerHa = profitMatch ? parseInt(profitMatch[1].replace(/,/g, ''), 10) : 80000;
  const maxPerHa = profitMatch ? parseInt(profitMatch[2].replace(/,/g, ''), 10) : 120000;

  // Cost range
  const costMatch = selectedCrop.estimatedCultivationCost.match(/₹([\d,]+)\s*-\s*₹([\d,]+)/);
  const costPerHa = costMatch ? parseInt(costMatch[1].replace(/,/g, ''), 10) : 35000;

  const totalMinNetProfit = Math.round(minPerHa * sizeInHa);
  const totalMaxNetProfit = Math.round(maxPerHa * sizeInHa);
  const totalCost = Math.round(costPerHa * sizeInHa);
  const totalGrossMin = totalMinNetProfit + totalCost;
  const totalGrossMax = totalMaxNetProfit + totalCost;

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      
      {/* Header Banner (30% secondary card background) */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center space-x-3.5 mb-2">
          <div className="p-2.5 bg-slate-950 rounded-xl text-emerald-500 border border-slate-850">
            <Calculator className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {lang === 'gu' ? 'નફો અને ખાતર અંદાજક' : 'Smart Yield & Financial Estimator'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 font-semibold ml-1">
          {lang === 'gu'
            ? 'તમારી જમીનના કદ મુજબ કોઈપણ પાકના કુલ બિયારણ, ખાતર જરૂરિયાત અને ચોખ્ખા નફાની ગણતરી કરો.'
            : 'Select any crop and adjust your farm size in Bigha or Hectares to calculate seed rate, NPK doses & profit estimates.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Input Form Panel (30% secondary card background) */}
        <div className="md:col-span-5 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-md space-y-6">
          <h3 className="text-base font-black text-white border-b border-slate-850 pb-3.5 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-555" />
            <span>{lang === 'gu' ? '૧. પાક અને જમીન ક્ષેત્રફળ' : '1. Choose Crop & Farm Area'}</span>
          </h3>

          {/* Nested Inputs use 60% dominant color bg-slate-955 for depth */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider font-extrabold text-slate-455">
              {lang === 'gu' ? 'પાક પસંદ કરો (Select Crop)' : 'Select Crop'}
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full bg-slate-955 border border-slate-850 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-bold text-sm cursor-pointer"
            >
              {CROP_DATABASE.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-950">
                  {c.cropName} ({c.gujaratiName})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider font-extrabold text-slate-455">
              {lang === 'gu' ? 'જમીનનું ક્ષેત્રફળ (Farm Size)' : 'Farm Size'}
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                min="0.25"
                max="100"
                step="0.25"
                value={farmSize}
                onChange={(e) => setFarmSize(parseFloat(e.target.value) || 1)}
                className="w-full bg-slate-955 border border-slate-850 rounded-2xl px-4.5 py-3 text-white font-extrabold focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="bg-slate-955 border border-slate-855 rounded-2xl px-4.5 py-3 text-emerald-450 font-extrabold text-xs uppercase focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="hectare">{lang === 'gu' ? 'હેક્ટર (Ha)' : 'Hectare'}</option>
                <option value="bigha">{lang === 'gu' ? 'વીઘા (Bigha)' : 'Bigha'}</option>
              </select>
            </div>
            <p className="text-[10px] text-slate-500 font-bold">
              (Equivalent: {sizeInHa.toFixed(2)} Hectares / {(sizeInHa * 6.25).toFixed(1)} Bigha)
            </p>
          </div>

          {/* Seed Requirement Box */}
          <div className="p-4 bg-slate-955 rounded-2xl border border-slate-850 flex items-center space-x-3.5">
            <div className="p-3 bg-slate-900 border border-slate-800 text-emerald-500 rounded-xl">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-amber-500 uppercase tracking-wider block">
                {lang === 'gu' ? 'બિયારણ જરૂરિયાત:' : 'Seed Required:'}
              </span>
              <p className="text-sm font-black text-white mt-0.5">
                {selectedCrop.seedRate}
              </p>
            </div>
          </div>
        </div>

        {/* Financial Calculation Results Panel */}
        <div className="md:col-span-7 space-y-5">
          
          {/* Main Net Profit Card (uses recessed 60% dominant background to focus contrast) */}
          <div className="bg-slate-955 border border-slate-850 rounded-3xl p-6 shadow-md space-y-5 relative overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500 flex items-center space-x-1.5">
                <Receipt className="w-3.5 h-3.5 text-emerald-555" />
                <span>Estimated Net Profit ({farmSize} {unit})</span>
              </span>
              <span className="bg-slate-900 border border-slate-850 text-slate-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                {selectedCrop.cropName}
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-black text-amber-500 tracking-tight">
              ₹{totalMinNetProfit.toLocaleString('en-IN')} – ₹{totalMaxNetProfit.toLocaleString('en-IN')}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-850">
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-455 font-bold block uppercase tracking-wide">Total Cultivation Cost</span>
                <span className="text-base font-black text-slate-300 mt-1 block">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-850">
                <span className="text-[10px] text-slate-455 font-bold block uppercase tracking-wide">Est. Gross Returns</span>
                <span className="text-base font-black text-emerald-500 mt-1 block">₹{totalGrossMin.toLocaleString('en-IN')} - ₹{totalGrossMax.toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>

          {/* Fertilizer Dose Requirement */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-md space-y-3.5">
            <h4 className="text-xs font-black text-slate-350 uppercase tracking-wider flex items-center space-x-2">
              <FlaskConical className="w-4 h-4 text-emerald-555" />
              <span>{lang === 'gu' ? 'ખાતર ભલામણ (NPK Dosage)' : 'NPK Fertilizer Recommendation'}</span>
            </h4>

            <p className="text-xs sm:text-sm font-extrabold text-emerald-500 leading-relaxed bg-slate-955 p-3 rounded-xl border border-slate-850">
              {selectedCrop.fertilizerRecommendation}
            </p>

            <p className="text-[11px] text-slate-450 font-bold">
              Water Profile: <span className="text-slate-300 font-extrabold ml-1">{selectedCrop.waterRequirement}</span>
            </p>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start space-x-2 text-[11px] text-slate-455 px-2 font-bold">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              Values are calculated based on Gujarat Agricultural University benchmarks. Market prices & actual yields vary based on weather and MSP.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
