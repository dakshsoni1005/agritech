import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, Award, TrendingUp, DollarSign, Info, ShieldAlert, 
  RotateCcw, ArrowLeft, CheckCircle2, ChevronRight, FileText, Printer
} from 'lucide-react';

export default function RecommendationResults({ result, onReset, onViewCropDetails, lang }) {
  const { primaryRecommendation, secondaryRecommendations } = result;
  const { crop, confidence, expectedYield, expectedProfit, expectedProfitPerHa, reason, reasonGu, reasonsList, reasonsListGu, farmSizeLabel } = primaryRecommendation;

  useEffect(() => {
    // Launch celebratory confetti when results load
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect unavailable');
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center space-x-2 text-sm font-bold text-slate-300 hover:text-emerald-550 bg-slate-900 hover:bg-slate-850 px-4 py-2.5 rounded-xl border border-slate-800 transition-all duration-300 cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'gu' ? 'ફરીથી વિગતો બદલો' : 'Change Inputs'}</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 rounded-xl transition-all duration-300 cursor-pointer shadow-md"
        >
          <Printer className="w-4 h-4 text-white" />
          <span>{lang === 'gu' ? 'સલાહ પ્રિન્ટ કરો' : 'Print / Save PDF'}</span>
        </button>
      </div>

      {/* Main AI Recommended Crop Banner (30% secondary card backdrop) */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        
        {/* Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-850">
          <div className="inline-flex items-center space-x-2 bg-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-emerald-500 border border-slate-850">
            <Sparkles className="w-4 h-4 animate-spin text-amber-500" style={{ animationDuration: '6s' }} />
            <span>{lang === 'gu' ? 'એઆઈ પ્રાથમિક ભલામણ' : 'AI Primary Recommendation'}</span>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 px-4 py-1.5 rounded-2xl border border-slate-850">
            <span className="text-xs text-slate-400 font-bold">{lang === 'gu' ? 'મેચ સચોટતા:' : 'Confidence Score:'}</span>
            
            {/* Visual SVG Progress Gauge */}
            <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-550 transition-all duration-1000 ease-out"
                  strokeDasharray={`${confidence}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-[10px] font-black text-slate-100">{confidence}%</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Crop Info */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-black text-amber-500 uppercase tracking-widest block mb-1">
                {crop.category} • {farmSizeLabel}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight leading-tight">
                {lang === 'gu' ? 'શિફારસ કરેલ પાક: ' : 'Recommended Crop: '}
                <span className="text-emerald-500">{crop.cropName}</span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-500 mt-1">
                ({crop.gujaratiName})
              </h2>
            </div>

            {/* Key AI Output Highlights (Recessed to 60% dominant background) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              
              <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-850">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-450 mb-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>{lang === 'gu' ? 'અંદાજિત ઉત્પાદન' : 'Expected Yield'}</span>
                </div>
                <div className="text-base sm:text-lg font-black text-slate-100">
                  {expectedYield}
                </div>
              </div>

              <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-850">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-455 mb-1.5">
                  <DollarSign className="w-4 h-4 text-amber-500" />
                  <span>{lang === 'gu' ? 'અંદાજિત ચોખ્ખો નફો' : 'Expected Profit'}</span>
                </div>
                <div className="text-base sm:text-lg font-black text-amber-500">
                  {expectedProfit}
                </div>
                <div className="text-[10px] text-slate-450 mt-0.5 font-bold">
                  ({expectedProfitPerHa} per hectare)
                </div>
              </div>

            </div>

            {/* Reason Block */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850">
              <div className="flex items-center space-x-2 text-xs font-black text-amber-550 uppercase tracking-wider mb-1.5">
                <Info className="w-4 h-4 text-amber-500" />
                <span>{lang === 'gu' ? 'એઆઈ ભલામણનું મુખ્ય કારણ:' : 'AI advisory rationale:'}</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-relaxed">
                {lang === 'gu' ? reasonGu : reason}
              </p>
            </div>

          </div>

          {/* Crop Image & Modal Trigger */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-850 shadow-md group">
              <img
                src={crop.imageUrl}
                alt={crop.cropName}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-100 bg-slate-950/80 border border-slate-850 px-2.5 py-1 rounded-lg">
                  {crop.gujaratiName}
                </span>
                <span className="text-[10px] font-bold text-emerald-450 bg-slate-950/80 border border-slate-850 px-2.5 py-1 rounded-lg">
                  18 Fields Advisory
                </span>
              </div>
            </div>

            <button
              onClick={() => onViewCropDetails(crop)}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-950 hover:bg-slate-850 text-slate-100 font-extrabold text-xs tracking-wider uppercase border border-slate-850 hover:border-slate-800 transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'gu' ? 'પાકની ૧૮ તકનીકી વિગતો જુઓ' : 'View Full 18-Field Crop Advisory'}</span>
            </button>
          </div>

        </div>

        {/* Indicative Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-855 flex items-start space-x-2 text-[11px] text-slate-450 font-bold">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span>
            {lang === 'gu'
              ? 'સૂચના: દર્શાવેલ નફો અને ઉત્પાદન અંદાજિત છે. વાસ્તવિક પરિણામો હવામાન, બજારના ભાવ અને સંચાલન પર આધારિત છે.'
              : 'Indicative estimated yield & profit. Actual results depend on weather conditions, market price fluctuations, and farm management practices.'}
          </span>
        </div>

      </div>

      {/* AI Decision Factor Breakdown */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
        <h3 className="text-base font-black text-slate-100 flex items-center space-x-2 border-b border-slate-850 pb-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span>{lang === 'gu' ? 'એઆઈ વિશ્લેષણના મુખ્ય પાસાઓ' : 'AI Suitability Breakdown'}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {(lang === 'gu' ? reasonsListGu : reasonsList).map((r, idx) => (
            <div key={idx} className="flex items-center space-x-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-850">
              <div className="w-5.5 h-5.5 rounded-full bg-slate-900 text-emerald-500 flex items-center justify-center text-[10px] font-black shrink-0 border border-slate-850">
                ✓
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-350">{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Crop Recommendations & Companion Crops */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Secondary Alternatives */}
        <div className="md:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
          <h3 className="text-base font-black text-slate-100 flex items-center space-x-2 border-b border-slate-850 pb-3">
            <Award className="w-5 h-5 text-amber-500" />
            <span>{lang === 'gu' ? 'વૈકલ્પિક પાક ભલામણો' : 'Secondary Recommended Alternatives'}</span>
          </h3>

          <div className="space-y-3">
            {secondaryRecommendations.map((item) => (
              <div
                key={item.crop.id}
                onClick={() => onViewCropDetails(item.crop)}
                className="bg-slate-950 hover:bg-slate-850 p-4 rounded-2xl border border-slate-850 hover:border-slate-800 cursor-pointer transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3.5">
                  <img
                    src={item.crop.imageUrl}
                    alt={item.crop.cropName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-850"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-100 group-hover:text-emerald-500 transition-colors duration-300">
                      {item.crop.cropName} ({item.crop.gujaratiName})
                    </h4>
                    <p className="text-[10px] text-slate-455 font-bold">
                      {item.crop.category} • Yield: {item.yield}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <span className="text-[10px] font-black text-emerald-500 bg-slate-900 border border-slate-850 px-2.5 py-1 rounded-full">
                      {item.confidence}% Match
                    </span>
                    <p className="text-[10px] text-slate-455 font-black mt-1">
                      {item.profitPerHa}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Companion & Rotation Advice */}
        <div className="md:col-span-5 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
          <h3 className="text-base font-black text-slate-100 flex items-center space-x-2 border-b border-slate-850 pb-3">
            <RotateCcw className="w-5 h-5 text-sky-400" />
            <span>{lang === 'gu' ? 'પાક ફેરબદલી અને આંતરપાક' : 'Companion & Rotation Crops'}</span>
          </h3>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-2">
            <span className="text-xs font-black text-sky-400 uppercase tracking-wider block">
              {lang === 'gu' ? 'લાયક આંતરપાક (Intercropping):' : 'Suitable Intercropping:'}
            </span>
            <p className="text-xs text-slate-350 font-bold leading-relaxed">
              {crop.suitableCompanionCrops}
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-2">
            <span className="text-xs font-black text-amber-500 uppercase tracking-wider block">
              {lang === 'gu' ? 'ખાતર ભલામણ (NPK Dose):' : 'Fertilizer Recommendation:'}
            </span>
            <p className="text-xs text-slate-350 font-bold leading-relaxed">
              {crop.fertilizerRecommendation}
            </p>
          </div>

          <button
            onClick={() => onViewCropDetails(crop)}
            className="w-full py-3 rounded-2xl border border-slate-850 hover:border-slate-750 bg-slate-950 hover:bg-slate-850 text-slate-200 text-xs font-extrabold transition-all duration-300 text-center block cursor-pointer"
          >
            {lang === 'gu' ? 'રોગ અને દવાઓની માહિતી જુઓ →' : 'View Disease & Prevention Guide →'}
          </button>
        </div>

      </div>

    </div>
  );
}
