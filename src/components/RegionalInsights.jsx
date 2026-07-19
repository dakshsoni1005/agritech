import React, { useState } from 'react';
import { GUJARAT_REGIONS } from '../data/gujaratRegions';
import { MapPin, Layers, CloudRain, Building2, ArrowLeft } from 'lucide-react';

export default function RegionalInsights({ lang, onBack }) {
  const [activeRegionId, setActiveRegionId] = useState('saurashtra');
  const activeRegion = GUJARAT_REGIONS.find((r) => r.id === activeRegionId) || GUJARAT_REGIONS[3];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      
      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-emerald-500 transition-all duration-300 font-extrabold text-xs tracking-wider uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-500" />
          <span>{lang === 'gu' ? 'પાછા જાઓ (Back)' : 'Back'}</span>
        </button>
      </div>

      {/* Header Banner (30% secondary card background) */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          {lang === 'gu' ? 'કૃષિ હવામાન પ્રદેશો અને જમીન માર્ગદર્શિકા' : 'Gujarat Agro-Climatic Regions & Soil Guide'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">
          {lang === 'gu'
            ? 'ઉત્તર ગુજરાત, દક્ષિણ ગુજરાત, મધ્ય ગુજરાત, સૌરાષ્ટ્ર અને કચ્છના વિશિષ્ટ જમીનના પ્રકારો અને મુખ્ય પાકોનું વિસ્તૃત વિશ્લેષણ.'
            : 'Explore soil profiles, weather patterns, irrigation channels, and dominant crops across Gujarat 5 agro-climatic zones.'}
        </p>

        {/* Region Selector Tabs (recessed into 60% dominant background) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-850">
          {GUJARAT_REGIONS.map((reg) => {
            const isActive = activeRegionId === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => setActiveRegionId(reg.id)}
                className={`p-3.5 rounded-2xl border text-center transition-all duration-300 font-extrabold text-sm cursor-pointer ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-600 text-white shadow-md'
                    : 'border-slate-850 bg-slate-950 text-slate-405 hover:text-slate-205'
                }`}
              >
                <span>
                  {lang === 'gu' ? reg.nameGu : reg.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Region Full Breakdown (30% secondary card background) */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Title & Description */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-850 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div
                className="w-3.5 h-3.5 rounded-full"
                style={{ 
                  backgroundColor: activeRegion.color,
                  boxShadow: `0 0 10px ${activeRegion.color}60`
                }}
              />
              <h3 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
                {lang === 'gu' ? activeRegion.nameGu : activeRegion.name}
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-350 leading-relaxed max-w-3xl">
              {lang === 'gu' ? activeRegion.descriptionGu : activeRegion.description}
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 text-center shrink-0">
            <span className="text-[10px] text-slate-455 block font-bold uppercase tracking-wider">{lang === 'gu' ? 'કુલ જિલ્લાઓ' : 'Total Districts'}</span>
            <span className="text-2xl font-black text-emerald-500 mt-0.5 block">{activeRegion.districts.length}</span>
          </div>
        </div>

        {/* Soil & Climate Cards (recessed into 60% dominant background) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Soil Types */}
          <div className="bg-slate-955 p-5 rounded-2xl border border-slate-850 space-y-3.5">
            <div className="flex items-center space-x-2 text-xs font-black text-slate-300 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'gu' ? 'જમીનના મુખ્ય પ્રકારો' : 'Soil Profiles'}</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {activeRegion.soilTypes.map((st, idx) => (
                <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-205 text-xs font-bold px-3 py-1.5 rounded-xl">
                  {st}
                </span>
              ))}
            </div>
          </div>

          {/* Climate & Rainfall */}
          <div className="bg-slate-955 p-5 rounded-2xl border border-slate-850 space-y-3.5 flex flex-col justify-between">
            <div className="flex items-center space-x-2 text-xs font-black text-slate-350 uppercase tracking-wider">
              <CloudRain className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'gu' ? 'હવામાન અને સિંચાઈ' : 'Climate & Irrigation'}</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-300 leading-relaxed">
              {lang === 'gu' ? activeRegion.climateGu : activeRegion.climate}
            </p>
          </div>

        </div>

        {/* Districts & Talukas List */}
        <div className="space-y-4 pt-4 border-t border-slate-850">
          <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'gu' ? 'પ્રદેશના જિલ્લાઓ અને તાલુકાઓ' : 'Districts & Included Talukas'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {activeRegion.districts.map((dist) => (
              <div key={dist.name} className="bg-slate-955 p-4.5 rounded-2xl border border-slate-850 flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-extrabold text-slate-100 text-base">
                    {dist.name} <span className="text-amber-500 font-bold text-sm">({dist.nameGu})</span>
                  </h5>
                  <span className="text-[10px] bg-slate-900 border border-slate-850 px-2 py-0.5 rounded text-slate-400 font-bold">
                    {dist.talukas.length} Talukas
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {dist.talukas.map((t) => (
                    <span key={t} className="text-[10px] bg-slate-900/60 text-slate-350 px-2 py-0.5 rounded-lg border border-slate-850/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
