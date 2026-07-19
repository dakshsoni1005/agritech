import React, { useState, useEffect } from 'react';
import { GUJARAT_REGIONS, SOIL_TYPES_LIST, MONTHS_LIST } from '../data/gujaratRegions';
import { Sparkles, MapPin, Thermometer, CloudRain, Droplets, Ruler, RotateCcw, ShieldCheck, ArrowRight } from 'lucide-react';

export default function RecommendationWizard({ onSubmit, lang }) {
  const [selectedRegionId, setSelectedRegionId] = useState('saurashtra');
  const [district, setDistrict] = useState('Rajkot');
  const [taluka, setTaluka] = useState('Gondal');
  const [soilType, setSoilType] = useState('Medium Black Soil');
  const [currentMonth, setCurrentMonth] = useState(7); // July by default
  const [temperature, setTemperature] = useState(30);
  const [rainfall, setRainfall] = useState(750);
  const [irrigation, setIrrigation] = useState('yes');
  const [farmSize, setFarmSize] = useState(2);
  const [unit, setUnit] = useState('hectare');
  const [previousCrop, setPreviousCrop] = useState('Cotton');

  const currentRegion = GUJARAT_REGIONS.find(r => r.id === selectedRegionId) || GUJARAT_REGIONS[3];
  const availableDistricts = currentRegion.districts || [];
  const currentDistrictObj = availableDistricts.find(d => d.name === district) || availableDistricts[0] || {};
  const availableTalukas = currentDistrictObj.talukas || [];

  // Update district when region changes
  useEffect(() => {
    if (availableDistricts.length > 0) {
      setDistrict(availableDistricts[0].name);
      if (availableDistricts[0].talukas && availableDistricts[0].talukas.length > 0) {
        setTaluka(availableDistricts[0].talukas[0]);
      }
    }
  }, [selectedRegionId]);

  // Update taluka when district changes
  useEffect(() => {
    if (availableTalukas.length > 0 && !availableTalukas.includes(taluka)) {
      setTaluka(availableTalukas[0]);
    }
  }, [district]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      region: currentRegion,
      district,
      taluka,
      soilType,
      currentMonth,
      temperature,
      rainfall,
      irrigation,
      farmSize: parseFloat(farmSize) || 1,
      unit,
      previousCrop
    });
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/20 max-w-4xl mx-auto">
      
      {/* Header Badge */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 bg-emerald-500/10 rounded-2xl border border-emerald-500/30">
          <Sparkles className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {lang === 'gu' ? 'એઆઈ પાક ભલામણ સિસ્ટમ (AI Crop Advisory)' : 'AI Crop Recommendation Wizard'}
          </h2>
          <p className="text-sm text-slate-400">
            {lang === 'gu'
              ? 'તમારી જમીન, વાતાવરણ અને વિસ્તારની વિગતો આપો, એઆઈ મહત્તમ ઉત્પાદન આપતો પાક શોધી આપશે.'
              : 'Provide your farm soil, climate & region details to get high-accuracy crop advice.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. Region Selector Cards */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-emerald-400 mb-3 flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? '૧. તમારો વિશિષ્ટ પ્રદેશ પસંદ કરો (Region)' : '1. Select Region'}</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {GUJARAT_REGIONS.map((reg) => (
              <button
                key={reg.id}
                type="button"
                onClick={() => setSelectedRegionId(reg.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  selectedRegionId === reg.id
                    ? 'border-emerald-500 bg-emerald-950/40 text-white ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-900/30'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full mb-2"
                  style={{ backgroundColor: reg.color }}
                />
                <span className="font-bold text-sm sm:text-base text-white block">
                  {lang === 'gu' ? reg.nameGu : reg.name}
                </span>
                <span className="text-[11px] opacity-70 mt-1 block">
                  {reg.districts.length} {lang === 'gu' ? 'જિલ્લાઓ' : 'Districts'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. District & Taluka Cascading Select */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
              {lang === 'gu' ? 'જિલ્લો (District)' : 'District'}
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all font-medium text-sm"
            >
              {availableDistricts.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name} ({d.nameGu})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
              {lang === 'gu' ? 'તાલુકો (Taluka)' : 'Taluka'}
            </label>
            <select
              value={taluka}
              onChange={(e) => setTaluka(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all font-medium text-sm"
            >
              {availableTalukas.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Soil Type & Month */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
              {lang === 'gu' ? 'જમીનનો પ્રકાર (Soil Type)' : 'Soil Type'}
            </label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all font-medium text-sm"
            >
              {SOIL_TYPES_LIST.map((st) => (
                <option key={st.id} value={st.name}>
                  {st.nameGu} ({st.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2">
              {lang === 'gu' ? 'વાવણીનો સમય / મહિનો (Current Month)' : 'Current Month'}
            </label>
            <select
              value={currentMonth}
              onChange={(e) => setCurrentMonth(parseInt(e.target.value, 10))}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all font-medium text-sm"
            >
              {MONTHS_LIST.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. Temperature, Rainfall, & Irrigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2 flex items-center space-x-1">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'gu' ? 'તાપમાન (°C)' : 'Temperature (°C)'}</span>
            </label>
            <div className="flex items-center space-x-3 bg-slate-800 p-2.5 rounded-xl border border-slate-700">
              <input
                type="range"
                min="10"
                max="45"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-sm font-bold text-amber-400 w-12 text-right">{temperature}°C</span>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2 flex items-center space-x-1">
              <CloudRain className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang === 'gu' ? 'વરસાદ (mm/વર્ષ)' : 'Rainfall (mm)'}</span>
            </label>
            <div className="flex items-center space-x-3 bg-slate-800 p-2.5 rounded-xl border border-slate-700">
              <input
                type="range"
                min="200"
                max="2000"
                step="50"
                value={rainfall}
                onChange={(e) => setRainfall(parseInt(e.target.value, 10))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <span className="text-sm font-bold text-sky-400 w-16 text-right">{rainfall}mm</span>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2 flex items-center space-x-1">
              <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'gu' ? 'પિયત ઉપલબ્ધ છે? (Irrigation)' : 'Irrigation Available?'}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIrrigation('yes')}
                className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                  irrigation === 'yes'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                }`}
              >
                {lang === 'gu' ? 'હા (Yes)' : 'Yes'}
              </button>
              <button
                type="button"
                onClick={() => setIrrigation('no')}
                className={`py-2.5 rounded-xl font-bold text-xs transition-all ${
                  irrigation === 'no'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                }`}
              >
                {lang === 'gu' ? 'ના (No)' : 'No'}
              </button>
            </div>
          </div>
        </div>

        {/* 5. Farm Size & Previous Crop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2 flex items-center space-x-1">
              <Ruler className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lang === 'gu' ? 'જમીનનું ક્ષેત્રફળ (Farm Size)' : 'Farm Size'}</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                min="0.25"
                max="100"
                step="0.25"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
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
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2 flex items-center space-x-1">
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'gu' ? 'અગાઉ લીધેલ પાક (Previous Crop)' : 'Previous Crop'}</span>
            </label>
            <select
              value={previousCrop}
              onChange={(e) => setPreviousCrop(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-all font-medium text-sm"
            >
              <option value="Cotton">Cotton (કપાસ)</option>
              <option value="Groundnut">Groundnut (મગફળી)</option>
              <option value="Wheat">Wheat (ઘઉં)</option>
              <option value="Cumin">Cumin (જીરું)</option>
              <option value="Bajra">Bajra (બાજરી)</option>
              <option value="Castor">Castor (એરંડા)</option>
              <option value="Mustard">Mustard (રાયડો)</option>
              <option value="Paddy">Paddy (ડાંગર)</option>
              <option value="fallow">Fallow / પડતર (કોઈ નહીં)</option>
            </select>
          </div>
        </div>

        {/* Submit CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-base sm:text-lg tracking-wide shadow-xl shadow-emerald-950/60 hover:shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-3 group"
          >
            <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>
              {lang === 'gu' ? 'એઆઈ પાક ભલામણ અને અંદાજ મેળવો' : 'Generate AI Crop Recommendation'}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </form>
    </div>
  );
}
