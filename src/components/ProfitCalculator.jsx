import React, { useState } from 'react';
import { CROP_DATABASE } from '../data/cropDatabase';
import { Calculator, DollarSign, Sprout, FlaskConical, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';

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
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {lang === 'gu' ? 'નફો અને ખાતર અંદાજક (Yield & Financial Estimator)' : 'Smart Yield & Net Profit Estimator'}
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          {lang === 'gu'
            ? 'તમારી જમીનના કદ મુજબ કોઈપણ પાકના કુલ બિયારણ, ખાતર જરૂરિયાત અને ચોખ્ખા નફાની ગણતરી કરો.'
            : 'Select any crop and adjust your farm size in Bigha or Hectares to calculate seed rate, NPK doses & profit estimates.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Input Form Panel */}
        <div className="md:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'gu' ? '૧. પાક અને જમીન ક્ષેત્રફળ પસંદ કરો' : '1. Choose Crop & Farm Area'}</span>
          </h3>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
              {lang === 'gu' ? 'પાક પસંદ કરો (Select Crop)' : 'Select Crop'}
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-bold text-sm"
            >
              {CROP_DATABASE.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.cropName} ({c.gujaratiName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
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
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-500"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-emerald-400 font-bold text-xs uppercase focus:outline-none"
              >
                <option value="hectare">{lang === 'gu' ? 'હેક્ટર (Hectare)' : 'Hectare'}</option>
                <option value="bigha">{lang === 'gu' ? 'વીઘા (Bigha)' : 'Bigha'}</option>
              </select>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              (Equivalent: {sizeInHa.toFixed(2)} Hectares / {(sizeInHa * 6.25).toFixed(1)} Bigha)
            </p>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/80 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              {lang === 'gu' ? 'બિયારણ જરૂરિયાત (Seed Rate):' : 'Seed Required:'}
            </span>
            <p className="text-sm font-black text-white">
              {selectedCrop.seedRate}
            </p>
          </div>
        </div>

        {/* Financial Calculation Results Panel */}
        <div className="md:col-span-7 space-y-4">
          
          {/* Main Net Profit Card */}
          <div className="bg-gradient-to-br from-slate-900 via-emerald-950/80 to-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Estimated Net Profit ({farmSize} {unit})
              </span>
              <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-700">
                {selectedCrop.cropName}
              </span>
            </div>

            <div className="text-2xl sm:text-4xl font-black text-amber-300">
              ₹{totalMinNetProfit.toLocaleString('en-IN')} – ₹{totalMaxNetProfit.toLocaleString('en-IN')}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Total Cultivation Cost</span>
                <span className="text-sm font-bold text-rose-400">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Est. Gross Returns</span>
                <span className="text-sm font-bold text-emerald-400">₹{totalGrossMin.toLocaleString('en-IN')} - ₹{totalGrossMax.toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>

          {/* Fertilizer Dose Requirement */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
              <FlaskConical className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'gu' ? 'ખાતર ભલામણ (Fertilizer NPK Dosage)' : 'NPK Fertilizer Recommendation'}</span>
            </h4>

            <p className="text-sm font-bold text-white leading-relaxed">
              {selectedCrop.fertilizerRecommendation}
            </p>

            <p className="text-xs text-slate-400">
              Water Requirement: <span className="text-slate-200 font-semibold">{selectedCrop.waterRequirement}</span>
            </p>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start space-x-2 text-[11px] text-slate-400 px-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Values are calculated based on Gujarat Agricultural University benchmarks. Market prices & actual yields vary based on weather and MSP.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
