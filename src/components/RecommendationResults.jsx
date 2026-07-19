import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, Award, TrendingUp, DollarSign, Info, ShieldAlert, 
  RotateCcw, ArrowLeft, CheckCircle2, ChevronRight, FileText, Printer, Sprout 
} from 'lucide-react';

export default function RecommendationResults({ result, onReset, onViewCropDetails, lang }) {
  const { primaryRecommendation, secondaryRecommendations } = result;
  const { crop, confidence, expectedYield, expectedProfit, expectedProfitPerHa, reason, reasonGu, reasonsList, reasonsListGu, farmSizeLabel } = primaryRecommendation;

  useEffect(() => {
    // Launch celebratory confetti when results load
    try {
      confetti({
        particleCount: 70,
        spread: 60,
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
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      
      {/* Top Controls: Back Button & Print */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center space-x-2 text-sm font-bold text-slate-400 hover:text-emerald-400 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'gu' ? 'ફરીથી વિગતો બદલો' : 'Change Inputs'}</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 text-sm font-bold text-slate-200 hover:text-white bg-emerald-800/50 hover:bg-emerald-700/60 px-4 py-2 rounded-xl border border-emerald-600/50 transition-all shadow-md"
        >
          <Printer className="w-4 h-4 text-emerald-300" />
          <span>{lang === 'gu' ? 'સલાહ પ્રિન્ટ કરો' : 'Print / Save PDF'}</span>
        </button>
      </div>

      {/* Main AI Recommended Crop Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950/80 to-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Background Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-900/60 border border-emerald-600/40 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-emerald-300">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{lang === 'gu' ? 'એઆઈ પ્રાથમિક ભલામણ' : 'AI Primary Recommendation'}</span>
          </div>

          <div className="flex items-center space-x-2 bg-slate-800/90 border border-emerald-500/30 px-4 py-1.5 rounded-full">
            <span className="text-xs text-slate-300 font-semibold">{lang === 'gu' ? 'વિશ્વાસપાત્રતા Score:' : 'Confidence:'}</span>
            <span className="text-lg font-black text-emerald-400">{confidence}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Crop Info & Gujarati Name */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                {crop.category} • {farmSizeLabel}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Recommended Crop: <span className="text-emerald-400">{crop.cropName}</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1">
                ({crop.gujaratiName})
              </h2>
            </div>

            {/* Key AI Output Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-1">
                  <TrendingUp className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'gu' ? 'અંદાજિત ઉત્પાદન (Yield)' : 'Expected Yield'}</span>
                </div>
                <div className="text-lg font-black text-white">
                  {expectedYield}
                </div>
              </div>

              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-600/40">
                <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-300 mb-1">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'gu' ? 'અંદાજિત ચોખ્ખો નફો (Profit)' : 'Expected Profit'}</span>
                </div>
                <div className="text-lg font-black text-amber-300">
                  {expectedProfit}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  ({expectedProfitPerHa} per hectare)
                </div>
              </div>

            </div>

            {/* Reason Block */}
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/80">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <Info className="w-4 h-4" />
                <span>{lang === 'gu' ? 'એઆઈ ભલામણનું કારણ (AI Reason):' : 'Reason:'}</span>
              </div>
              <p className="text-sm font-medium text-slate-200 leading-relaxed">
                {lang === 'gu' ? reasonGu : reason}
              </p>
            </div>

          </div>

          {/* Crop Image & Modal Trigger */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-xl group">
              <img
                src={crop.imageUrl}
                alt={crop.cropName}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-xs font-bold text-white bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-lg">
                  {crop.gujaratiName}
                </span>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-700 px-2.5 py-1 rounded-lg">
                  18 Fields Advisory Available
                </span>
              </div>
            </div>

            <button
              onClick={() => onViewCropDetails(crop)}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'gu' ? 'પાકની ૧૮ તકનીકી વિગતો જુઓ' : 'View Full 18-Field Crop Advisory'}</span>
            </button>
          </div>

        </div>

        {/* Indicative Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-start space-x-2 text-[11px] text-slate-400">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            {lang === 'gu'
              ? 'સૂચના: દર્શાવેલ નફો અને ઉત્પાદન અંદાજિત (indicative) છે. વાસ્તવિક પરિણામો હવામાન, બજારના ભાવ અને સંચાલન પર આધારિત છે.'
              : 'Indicative estimated yield & profit. Actual results depend on weather conditions, market price fluctuations, and farm management practices.'}
          </span>
        </div>

      </div>

      {/* AI Decision Factor Breakdown */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{lang === 'gu' ? 'એઆઈ વિશ્લેષણના મુખ્ય પાસાઓ (Key Suitability Factors)' : 'AI Suitability Breakdown'}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(lang === 'gu' ? reasonsListGu : reasonsList).map((r, idx) => (
            <div key={idx} className="flex items-center space-x-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                ✓
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-200">{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Crop Recommendations & Companion Crops */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Secondary Alternatives */}
        <div className="md:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>{lang === 'gu' ? 'વૈકલ્પિક પાક ભલામણો (Alternative Crops)' : 'Secondary Recommended Alternatives'}</span>
          </h3>

          <div className="space-y-3">
            {secondaryRecommendations.map((item) => (
              <div
                key={item.crop.id}
                onClick={() => onViewCropDetails(item.crop)}
                className="bg-slate-800/70 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700 hover:border-emerald-500/50 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.crop.imageUrl}
                    alt={item.crop.cropName}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {item.crop.cropName} ({item.crop.gujaratiName})
                    </h4>
                    <p className="text-xs text-slate-400">
                      {item.crop.category} • Yield: {item.yield}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                      {item.confidence}% Match
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {item.profitPerHa}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Companion & Rotation Advice */}
        <div className="md:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <RotateCcw className="w-5 h-5 text-sky-400" />
            <span>{lang === 'gu' ? 'પાક ફેરબદલી અને આંતરપાક' : 'Companion & Rotation Crops'}</span>
          </h3>

          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-2">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
              {lang === 'gu' ? 'લાયક આંતરપાક (Suitable Companion):' : 'Suitable Intercropping:'}
            </span>
            <p className="text-xs text-slate-300 font-medium">
              {crop.suitableCompanionCrops}
            </p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              {lang === 'gu' ? 'ખાતર ભલામણ (NPK Dose):' : 'Fertilizer Recommendation:'}
            </span>
            <p className="text-xs text-slate-300 font-medium">
              {crop.fertilizerRecommendation}
            </p>
          </div>

          <button
            onClick={() => onViewCropDetails(crop)}
            className="w-full py-2.5 rounded-xl border border-slate-700 hover:border-emerald-500/50 bg-slate-800 text-slate-200 text-xs font-bold transition-all text-center block"
          >
            {lang === 'gu' ? 'રોગ અને દવાઓની માહિતી જુઓ →' : 'View Disease & Prevention Guide →'}
          </button>
        </div>

      </div>

    </div>
  );
}
