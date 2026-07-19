import React, { useState } from 'react';
import { GUJARAT_REGIONS } from '../data/gujaratRegions';
import { MapPin, Layers, CloudRain, Thermometer, Sprout, Building2, ChevronRight } from 'lucide-react';

export default function RegionalInsights({ lang }) {
  const [activeRegionId, setActiveRegionId] = useState('saurashtra');
  const activeRegion = GUJARAT_REGIONS.find((r) => r.id === activeRegionId) || GUJARAT_REGIONS[3];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {lang === 'gu' ? 'ગુજરાતના ૫ કૃષિ હવામાન પ્રદેશો અને જમીન માર્ગદર્શિકા' : 'Gujarat 5 Agro-Climatic Regions & Soil Guide'}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          {lang === 'gu'
            ? 'ઉત્તર ગુજરાત, દક્ષિણ ગુજરાત, મધ્ય ગુજરાત, સૌરાષ્ટ્ર અને કચ્છના વિશિષ્ટ જમીનના પ્રકારો અને મુખ્ય પાકોનું વિસ્તૃત વિશ્લેષણ.'
            : 'Explore soil profiles, weather patterns, irrigation channels, and dominant crops across Gujarat 5 agro-climatic zones.'}
        </p>

        {/* Region Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-6">
          {GUJARAT_REGIONS.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setActiveRegionId(reg.id)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                activeRegionId === reg.id
                  ? 'border-emerald-500 bg-emerald-950/80 text-white font-extrabold shadow-lg shadow-emerald-950/50 ring-2 ring-emerald-500/30'
                  : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span className="text-sm block">
                {lang === 'gu' ? reg.nameGu : reg.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Region Full Breakdown */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Title & Description */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: activeRegion.color }}
              />
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {lang === 'gu' ? activeRegion.nameGu : activeRegion.name}
              </h3>
            </div>
            <p className="text-sm font-medium text-slate-300 mt-2">
              {lang === 'gu' ? activeRegion.descriptionGu : activeRegion.description}
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-center shrink-0">
            <span className="text-xs text-slate-400 block font-semibold uppercase">{lang === 'gu' ? 'કુલ જિલ્લાઓ' : 'Total Districts'}</span>
            <span className="text-2xl font-black text-emerald-400">{activeRegion.districts.length}</span>
          </div>
        </div>

        {/* Soil & Climate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Soil Types */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>{lang === 'gu' ? 'જમીનના મુખ્ય પ્રકારો (Soil Profiles)' : 'Soil Types'}</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {activeRegion.soilTypes.map((st, idx) => (
                <span key={idx} className="bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl">
                  {st}
                </span>
              ))}
            </div>
          </div>

          {/* Climate & Rainfall */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
              <CloudRain className="w-4 h-4" />
              <span>{lang === 'gu' ? 'હવામાન & તાપમાન (Climate & Rainfall)' : 'Climate & Water Profile'}</span>
            </div>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              {lang === 'gu' ? activeRegion.climateGu : activeRegion.climate}
            </p>
          </div>

        </div>

        {/* Districts & Talukas List */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'gu' ? 'પ્રદેશના જિલ્લાઓ અને તાલુકાઓ' : 'Districts & Included Talukas'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {activeRegion.districts.map((dist) => (
              <div key={dist.name} className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/80">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-extrabold text-white text-base">
                    {dist.name} <span className="text-amber-300 font-bold">({dist.nameGu})</span>
                  </h5>
                  <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300 font-semibold">
                    {dist.talukas.length} Talukas
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {dist.talukas.map((t) => (
                    <span key={t} className="text-[11px] bg-slate-900/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
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
