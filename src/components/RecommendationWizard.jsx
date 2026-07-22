import React, { useState, useEffect } from 'react';
import { GUJARAT_REGIONS, SOIL_TYPES_LIST, MONTHS_LIST } from '../data/gujaratRegions';
import { Sparkles, MapPin, Thermometer, CloudRain, Droplets, Ruler, RotateCcw, ArrowRight, Star } from 'lucide-react';

const SOIL_DEFAULTS = {
  'Medium Black Soil': { N: 60, P: 45, K: 50, pH: 7.2 },
  'Deep Black Soil': { N: 70, P: 50, K: 55, pH: 7.4 },
  'Goradu / Red Loamy Soil': { N: 50, P: 40, K: 45, pH: 6.8 },
  'Sandy Loam Soil': { N: 45, P: 35, K: 40, pH: 6.5 },
  'Alluvial Silt Soil': { N: 80, P: 50, K: 60, pH: 7.0 },
  'Coastal Saline & Clay Soil': { N: 30, P: 30, K: 35, pH: 8.0 },
  'Desert Sandy Soil': { N: 25, P: 25, K: 30, pH: 7.8 }
};

const getHumidityDefault = (month) => {
  if (month >= 6 && month <= 9) return 80;
  if (month >= 10 || month <= 2) return 55;
  return 35;
};

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

  // ML model specific parameters state
  const [recommendationMode, setRecommendationMode] = useState('rules'); // 'rules' or 'ml'
  const [n, setN] = useState(60);
  const [p, setP] = useState(45);
  const [k, setK] = useState(50);
  const [ph, setPh] = useState(7.2);
  const [humidity, setHumidity] = useState(80);

  const currentRegion = GUJARAT_REGIONS.find(r => r.id === selectedRegionId) || GUJARAT_REGIONS[3];
  const availableDistricts = currentRegion.districts || [];
  const currentDistrictObj = availableDistricts.find(d => d.name === district) || availableDistricts[0] || {};
  const availableTalukas = currentDistrictObj.talukas || [];

  // Update NPK and pH whenever soilType changes
  useEffect(() => {
    const defaults = SOIL_DEFAULTS[soilType] || { N: 50, P: 40, K: 45, pH: 7.0 };
    setN(defaults.N);
    setP(defaults.P);
    setK(defaults.K);
    setPh(defaults.pH);
  }, [soilType]);

  // Update humidity whenever sowing month changes
  useEffect(() => {
    setHumidity(getHumidityDefault(currentMonth));
  }, [currentMonth]);

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
      mode: recommendationMode,
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
      previousCrop,
      N: n,
      P: p,
      K: k,
      ph,
      humidity
    });
  };

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Premium Hero Banner */}
      <div className="relative text-center max-w-3xl mx-auto space-y-4 pt-4 pb-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 text-xs font-bold tracking-wide uppercase">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{lang === 'gu' ? 'ગુજરાત કૃષિ મિશન ૨૦૨૬' : 'Gujarat Agri Mission 2026'}</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-slate-100">
          {lang === 'gu' ? (
            <>
              ખેતીને બનાવો સ્માર્ટ અને નફાકારક <br />
              <span className="text-emerald-600 dark:text-emerald-450">
                એઆઈ પાક ભલામણ સાથે
              </span>
            </>
          ) : (
            <>
              Empower Your Farming with <br />
              <span className="text-emerald-700 dark:text-emerald-450">
                AI Smart Recommendations
              </span>
            </>
          )}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          {lang === 'gu'
            ? 'ગુજરાતના પ્રાદેશિક ભૌગોલિક હવામાન, જમીનની વિશેષતાઓ અને બજાર કિંમતોનું આધુનિક એઆઈ મોડલ દ્વારા પૃથક્કરણ કરી શ્રેષ્ઠ પાક પસંદગી મેળવો.'
            : 'Get precision crop suitability guidance using multi-regional environmental intelligence, tailored soil profiling, and yield analytics.'}
        </p>

        {/* Info Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] font-bold text-slate-550 dark:text-slate-450">
          <span className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-850">
            🌾 ૫+ કૃષિ પ્રદેશો
          </span>
          <span className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-850">
            🧪 ૧૮+ સલાહ માર્ગદર્શિકા
          </span>
          <span className="bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-850">
            📊 ચોખ્ખો નફો અંદાજ
          </span>
        </div>
      </div>

      {/* Main Wizard Form Container */}
      <div className="relative bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.1)] max-w-4xl mx-auto">
        
        {/* Glowing background highlights in dark mode */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Step Title Badge */}
        <div className="flex items-center space-x-3.5 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800/80">
          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 text-emerald-600 dark:text-emerald-450">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {lang === 'gu' ? 'પાક સલાહ વિઝાર્ડ' : 'Crop Advisory Form'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-bold">
              {lang === 'gu'
                ? 'જમીન, સરનામું, તાપમાન અને પિયતની વિગતો સચોટ પાક પસંદગી માટે ભરો.'
                : 'Please fill in the fields below to trigger the recommendation algorithm.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative">

          {/* Mode Switcher */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4.5 rounded-[2rem] border border-slate-100 dark:border-slate-850/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold text-slate-500 dark:text-slate-400 block mb-0.5">
                {lang === 'gu' ? 'પદ્ધતિ પસંદ કરો (Advisory Mode)' : 'Select Advisory Mode'}
              </span>
              <span className="text-[11px] text-slate-400 font-bold leading-relaxed block">
                {lang === 'gu' 
                  ? 'સ્ટાન્ડર્ડ રૂલ એન્જિન ગણતરી અથવા લાઈવ મશીન લર્નિંગ મોડલ પૂર્વાનુમાન પસંદ કરો.' 
                  : 'Select between standard calculations or live Machine Learning model prediction.'}
              </span>
            </div>
            <div className="flex bg-slate-200/60 dark:bg-slate-900 p-1 rounded-2xl border border-slate-350/40 dark:border-slate-850 shrink-0">
              <button
                type="button"
                onClick={() => setRecommendationMode('rules')}
                className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  recommendationMode === 'rules'
                    ? 'bg-[#0b3c2c] dark:bg-emerald-500 text-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-250'
                }`}
              >
                {lang === 'gu' ? 'રૂલ એન્જિન' : 'Rules Engine'}
              </button>
              <button
                type="button"
                onClick={() => setRecommendationMode('ml')}
                className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  recommendationMode === 'ml'
                    ? 'bg-[#0b3c2c] dark:bg-emerald-500 text-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-250'
                }`}
              >
                {lang === 'gu' ? 'લાઈવ ML મોડલ' : 'Live ML Model'}
              </button>
            </div>
          </div>
          
          {/* 1. Region Selector Cards */}
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-wider font-extrabold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5 pl-1">
              <MapPin className="w-4 h-4 text-emerald-555" />
              <span>{lang === 'gu' ? '૧. કૃષિ ભૌગોલિક પ્રદેશ' : '1. Select Agro-Region'}</span>
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
              {GUJARAT_REGIONS.map((reg) => {
                const isActive = selectedRegionId === reg.id;
                return (
                  <button
                    key={reg.id}
                    type="button"
                    onClick={() => setSelectedRegionId(reg.id)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden flex flex-col justify-between h-[105px] group cursor-pointer ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-950/20 text-emerald-900 dark:text-white ring-2 ring-emerald-500/20 scale-[1.02]'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 hover:border-slate-350 dark:hover:border-slate-700 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                  >
                    {/* Circle Indicator */}
                    <div
                      className="w-2.5 h-2.5 rounded-full mb-3 transition-transform duration-200 group-hover:scale-125"
                      style={{ 
                        backgroundColor: reg.color,
                        boxShadow: isActive ? `0 0 10px ${reg.color}80` : 'none'
                      }}
                    />
                    <div>
                      <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 block tracking-tight leading-tight mb-0.5">
                        {lang === 'gu' ? reg.nameGu : reg.name}
                      </span>
                      <span className="text-[10px] opacity-75 block font-bold text-slate-500 dark:text-slate-450">
                        {reg.districts.length} {lang === 'gu' ? 'જિલ્લાઓ' : 'Districts'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. District & Taluka Cascading Select */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-extrabold text-slate-600 dark:text-slate-400 pl-1">
                {lang === 'gu' ? 'જિલ્લો (District)' : 'District'}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800/80 rounded-2xl px-4 py-3 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-200 font-bold text-sm cursor-pointer"
              >
                {availableDistricts.map((d) => (
                  <option key={d.name} value={d.name} className="bg-white dark:bg-slate-950 text-[#0b3c2c] dark:text-[#10b981]">
                    {d.name} ({d.nameGu})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-extrabold text-slate-600 dark:text-slate-400 pl-1">
                {lang === 'gu' ? 'તાલુકો (Taluka)' : 'Taluka'}
              </label>
              <select
                value={taluka}
                onChange={(e) => setTaluka(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800/80 rounded-2xl px-4 py-3 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-200 font-bold text-sm cursor-pointer"
              >
                {availableTalukas.map((t) => (
                  <option key={t} value={t} className="bg-white dark:bg-slate-955 text-[#0b3c2c] dark:text-[#10b981]">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Soil Type & Sowing Month */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-extrabold text-slate-600 dark:text-slate-400 pl-1">
                {lang === 'gu' ? 'જમીનનો પ્રકાર (Soil Type)' : 'Soil Type'}
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800/80 rounded-2xl px-4 py-3 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-200 font-bold text-sm cursor-pointer"
              >
                {SOIL_TYPES_LIST.map((st) => (
                  <option key={st.id} value={st.name} className="bg-white dark:bg-slate-950 text-[#0b3c2c] dark:text-[#10b981]">
                    {st.nameGu} ({st.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-extrabold text-slate-600 dark:text-slate-400 pl-1">
                {lang === 'gu' ? 'વાવણીનો મહિનો (Sowing Month)' : 'Sowing Month'}
              </label>
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(parseInt(e.target.value, 10))}
                className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800/80 rounded-2xl px-4 py-3 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-200 font-bold text-sm cursor-pointer"
              >
                {MONTHS_LIST.map((m) => (
                  <option key={m.value} value={m.value} className="bg-white dark:bg-slate-950 text-[#0b3c2c] dark:text-[#10b981]">
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Temperature, Rainfall, & Irrigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-extrabold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5 pl-1">
                <Thermometer className="w-4 h-4 text-amber-500" />
                <span>{lang === 'gu' ? 'તાપમાન (°C)' : 'Temperature (°C)'}</span>
              </label>
              <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-955 p-3 rounded-2xl border border-slate-200 dark:border-slate-800/80">
                <input
                  type="range"
                  min="10"
                  max="45"
                  value={temperature}
                  onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
                  className="w-full cursor-pointer accent-emerald-600 dark:accent-emerald-450"
                />
                <span className="text-sm font-black text-amber-600 dark:text-amber-500 w-12 text-right">{temperature}°C</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-extrabold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5 pl-1">
                <CloudRain className="w-4 h-4 text-sky-500" />
                <span>{lang === 'gu' ? 'વરસાદ (mm/વર્ષ)' : 'Annual Rainfall (mm)'}</span>
              </label>
              <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-955 p-3 rounded-2xl border border-slate-200 dark:border-slate-800/80">
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="50"
                  value={rainfall}
                  onChange={(e) => setRainfall(parseInt(e.target.value, 10))}
                  className="w-full cursor-pointer accent-sky-550 dark:accent-sky-400"
                />
                <span className="text-sm font-black text-sky-600 dark:text-sky-400 w-16 text-right">{rainfall}mm</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-extrabold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5 pl-1">
                <Droplets className="w-4 h-4 text-emerald-555" />
                <span>{lang === 'gu' ? 'પિયતની સુવિધા? (Irrigation)' : 'Irrigation Facility?'}</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setIrrigation('yes')}
                  className={`py-3.5 rounded-2xl font-black text-xs transition-all duration-200 cursor-pointer ${
                    irrigation === 'yes'
                      ? 'bg-[#0b3c2c] dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md font-extrabold'
                      : 'bg-slate-50 dark:bg-slate-955 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  {lang === 'gu' ? 'હા (Yes)' : 'Yes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIrrigation('no')}
                  className={`py-3.5 rounded-2xl font-black text-xs transition-all duration-200 cursor-pointer ${
                    irrigation === 'no'
                      ? 'bg-[#0b3c2c] dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md font-extrabold'
                      : 'bg-slate-50 dark:bg-slate-955 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  {lang === 'gu' ? 'ના (No)' : 'No'}
                </button>
              </div>
            </div>
          </div>

          {/* 5. Farm Size & Previous Crop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-extrabold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5 pl-1">
                <Ruler className="w-4 h-4 text-indigo-500" />
                <span>{lang === 'gu' ? 'જમીનનું ક્ષેત્રફળ (Farm Size)' : 'Farm Size'}</span>
              </label>
              <div className="flex space-x-3">
                <input
                  type="number"
                  min="0.25"
                  max="100"
                  step="0.25"
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800/80 rounded-2xl px-4 py-3 text-slate-900 dark:text-slate-100 font-extrabold focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-200 text-sm"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-emerald-700 dark:text-emerald-450 font-extrabold text-xs uppercase focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 cursor-pointer"
                >
                  <option value="hectare" className="bg-white dark:bg-slate-955 text-[#0b3c2c] dark:text-[#10b981]">{lang === 'gu' ? 'હેક્ટર (Ha)' : 'Hectare'}</option>
                  <option value="bigha" className="bg-white dark:bg-slate-955 text-[#0b3c2c] dark:text-[#10b981]">{lang === 'gu' ? 'વીઘા (Bigha)' : 'Bigha'}</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-extrabold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5 pl-1">
                <RotateCcw className="w-4 h-4 text-amber-550" />
                <span>{lang === 'gu' ? 'અગાઉ લીધેલ પાક (Previous Crop)' : 'Previous Crop'}</span>
              </label>
              <select
                value={previousCrop}
                onChange={(e) => setPreviousCrop(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800/80 rounded-2xl px-4 py-3 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-200 font-bold text-sm cursor-pointer"
              >
                <option value="Cotton" className="bg-white dark:bg-slate-950 text-[#0b3c2c] dark:text-[#10b981]">Cotton (કપાસ)</option>
                <option value="Groundnut" className="bg-white dark:bg-slate-950 text-[#0b3c2c] dark:text-[#10b981]">Groundnut (મગફળી)</option>
                <option value="Wheat" className="bg-white dark:bg-slate-950 text-[#0b3c2c] dark:text-[#10b981]">Wheat (ઘઉં)</option>
                <option value="Cumin" className="bg-white dark:bg-slate-950 text-[#0b3c2c] dark:text-[#10b981]">Cumin (જીરું)</option>
                <option value="Bajra" className="bg-white dark:bg-slate-950 text-[#0b3c2c] dark:text-[#10b981]">Bajra (બાજરી)</option>
                <option value="Castor" className="bg-white dark:bg-slate-950 text-[#0b3c2c] dark:text-[#10b981]">Castor (એરંડા)</option>
                <option value="Mustard" className="bg-white dark:bg-slate-950 text-[#0b3c2c] dark:text-[#10b981]">Mustard (રાયડો)</option>
                <option value="Paddy" className="bg-white dark:bg-slate-950 text-[#0b3c2c] dark:text-[#10b981]">Paddy (ડાંગર)</option>
                <option value="fallow" className="bg-white dark:bg-slate-950 text-[#0b3c2c] dark:text-[#10b981]">Fallow / પડતર (કોઈ નહીં)</option>
              </select>
            </div>
          </div>

          {/* Advanced ML Model Input Parameters */}
          {recommendationMode === 'ml' && (
            <div className="bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200/60 dark:border-slate-850/80 rounded-3xl p-6 space-y-6 animate-scale-up">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-200/60 dark:border-slate-800/80">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0 animate-pulse" />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    {lang === 'gu' ? 'મશીન લર્નિંગ જમીન પેરામીટર્સ (ML Soil Parameters)' : 'Machine Learning Soil Parameters'}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                    {lang === 'gu' 
                      ? 'જમીનની પ્રયોગશાળાના રીપોર્ટ મુજબ સચોટ આંકડા અથવા આપમેળે ભરેલ કિંમતો વાપરો.' 
                      : 'Customize specific NPK, pH & Humidity values or use the pre-populated values.'}
                  </p>
                </div>
              </div>

              {/* NPK Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Nitrogen */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-slate-650 dark:text-slate-400 pl-1 uppercase tracking-wider">
                    {lang === 'gu' ? 'નાઇટ્રોજન (Nitrogen N)' : 'Nitrogen (N)'}
                  </label>
                  <div className="flex items-center space-x-3 bg-white dark:bg-slate-955 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <input
                      type="range"
                      min="0"
                      max="140"
                      value={n}
                      onChange={(e) => setN(parseInt(e.target.value, 10))}
                      className="w-full cursor-pointer accent-emerald-650 dark:accent-emerald-450"
                    />
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-500 w-16 text-right shrink-0">{n} kg/ha</span>
                  </div>
                </div>

                {/* Phosphorus */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-slate-650 dark:text-slate-400 pl-1 uppercase tracking-wider">
                    {lang === 'gu' ? 'ફોસ્ફરસ (Phosphorus P)' : 'Phosphorus (P)'}
                  </label>
                  <div className="flex items-center space-x-3 bg-white dark:bg-slate-955 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <input
                      type="range"
                      min="5"
                      max="145"
                      value={p}
                      onChange={(e) => setP(parseInt(e.target.value, 10))}
                      className="w-full cursor-pointer accent-emerald-650 dark:accent-emerald-450"
                    />
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-500 w-16 text-right shrink-0">{p} kg/ha</span>
                  </div>
                </div>

                {/* Potassium */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-slate-650 dark:text-slate-400 pl-1 uppercase tracking-wider">
                    {lang === 'gu' ? 'પોટાશ (Potassium K)' : 'Potassium (K)'}
                  </label>
                  <div className="flex items-center space-x-3 bg-white dark:bg-slate-955 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <input
                      type="range"
                      min="5"
                      max="205"
                      value={k}
                      onChange={(e) => setK(parseInt(e.target.value, 10))}
                      className="w-full cursor-pointer accent-emerald-650 dark:accent-emerald-450"
                    />
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-500 w-16 text-right shrink-0">{k} kg/ha</span>
                  </div>
                </div>
              </div>

              {/* pH & Humidity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* pH level */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-slate-650 dark:text-slate-400 pl-1 uppercase tracking-wider">
                    {lang === 'gu' ? 'જમીન પી.એચ. આંક (Soil pH)' : 'Soil pH Level'}
                  </label>
                  <div className="flex items-center space-x-3 bg-white dark:bg-slate-955 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <input
                      type="range"
                      min="4"
                      max="10"
                      step="0.1"
                      value={ph}
                      onChange={(e) => setPh(parseFloat(e.target.value))}
                      className="w-full cursor-pointer accent-amber-500"
                    />
                    <span className="text-xs font-black text-amber-600 dark:text-amber-550 w-12 text-right shrink-0">{ph}</span>
                  </div>
                </div>

                {/* Humidity */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-slate-650 dark:text-slate-400 pl-1 uppercase tracking-wider">
                    {lang === 'gu' ? 'હવાના ભેજનું પ્રમાણ (Humidity %)' : 'Relative Humidity (%)'}
                  </label>
                  <div className="flex items-center space-x-3 bg-white dark:bg-slate-955 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <input
                      type="range"
                      min="15"
                      max="100"
                      value={humidity}
                      onChange={(e) => setHumidity(parseInt(e.target.value, 10))}
                      className="w-full cursor-pointer accent-sky-500"
                    />
                    <span className="text-xs font-black text-sky-600 dark:text-sky-400 w-12 text-right shrink-0">{humidity}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit CTA Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-[#0b3c2c] hover:bg-[#062017] dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 font-black text-base sm:text-lg tracking-wide shadow-lg hover:shadow-emerald-500/10 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-3 group cursor-pointer"
            >
              <Sparkles className="w-5.5 h-5.5 text-white dark:text-slate-950 group-hover:rotate-12 transition-transform duration-300" />
              <span>
                {lang === 'gu' ? 'એઆઈ પાક ભલામણ અને અંદાજ મેળવો' : 'Generate AI Crop Recommendation'}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
