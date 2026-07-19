import React, { useState } from 'react';
import { CROP_DATABASE } from '../data/cropDatabase';
import { GUJARAT_REGIONS } from '../data/gujaratRegions';
import { Search, Sprout, ArrowUpRight, ArrowLeft, SlidersHorizontal } from 'lucide-react';

export default function CropDatabaseView({ onSelectCrop, lang, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Oilseed', 'Commercial / Fibre', 'Spice / Cash Crop', 'Cereal Grain', 'Horticulture Fruit', 'Vegetable / Tuber', 'Pulse'];

  const filteredCrops = CROP_DATABASE.filter((crop) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      crop.cropName.toLowerCase().includes(query) ||
      crop.gujaratiName.toLowerCase().includes(query) ||
      crop.category.toLowerCase().includes(query);

    const matchesRegion =
      selectedRegionFilter === 'All' ||
      crop.suitableRegions.includes(selectedRegionFilter);

    const matchesCategory =
      selectedCategoryFilter === 'All' ||
      crop.category.includes(selectedCategoryFilter);

    return matchesSearch && matchesRegion && matchesCategory;
  });

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

      {/* Top Control Panel (30% secondary card background) */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              {lang === 'gu' ? 'ગુજરાત પાક માહિતી કોષ' : 'Gujarat Smart Crop Database'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold">
              {lang === 'gu'
                ? 'દરેક પાકની ૧૮ વિશિષ્ટ તકનીકી વિગતો, રોગ-જીવાત નિયંત્રણ, ખાતર ડોઝ અને નફાનું માર્ગદર્શિકા.'
                : 'Complete database containing 18 technical parameters per crop tailored for Gujarat regions.'}
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-850 px-4 py-2 rounded-2xl text-xs font-black text-emerald-500 shadow-inner select-none shrink-0">
            {filteredCrops.length} {lang === 'gu' ? 'પાક ઉપલબ્ધ' : 'Crops Available'}
          </div>
        </div>

        {/* Search & Filter Bar (Nested Inputs use 60% dominant color to pop) */}
        <div className="flex flex-col sm:flex-row gap-3.5 mt-6 pt-6 border-t border-slate-855">
          
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-emerald-555 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'gu' ? 'પાકનું નામ અથવા ગુજરાતી નામ શોધો (મગફળી, જીરું, Wheat)...' : 'Search by crop name or Gujarati name...'}
              className="w-full bg-slate-955 border border-slate-850 rounded-2xl pl-12 pr-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-semibold transition-all duration-300"
            />
          </div>

          {/* Filter Trigger Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center space-x-2 px-5.5 py-3.5 rounded-2xl border transition-all duration-300 font-extrabold text-sm cursor-pointer shadow-md shrink-0 ${
              showFilters 
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-emerald-950/20' 
                : 'bg-slate-955 border-slate-850 text-slate-200 hover:text-emerald-500 hover:border-emerald-500/40'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'gu' ? 'ફિલ્ટર્સ' : 'Filters'}</span>
          </button>

        </div>

        {/* Expanded Recessed Filters Panel */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4 p-5 bg-slate-955 rounded-2xl border border-slate-850 animate-scale-up">
            
            {/* Region Selector */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-450">
                {lang === 'gu' ? 'જિલ્લા પ્રદેશ ફિલ્ટર (Agro-Region)' : 'Agro-Region Filter'}
              </label>
              <select
                value={selectedRegionFilter}
                onChange={(e) => setSelectedRegionFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs font-semibold cursor-pointer"
              >
                <option value="All" className="bg-slate-950">{lang === 'gu' ? 'બધા પ્રદેશો (All Regions)' : 'All Regions'}</option>
                {GUJARAT_REGIONS.map((r) => (
                  <option key={r.id} value={r.name} className="bg-slate-950">
                    {r.nameGu} ({r.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Category Selector */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-450">
                {lang === 'gu' ? 'પાક વર્ગ ફિલ્ટર (Crop Category)' : 'Crop Category Filter'}
              </label>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs font-semibold cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-slate-950">
                    {c === 'All' ? (lang === 'gu' ? 'બધા પાકના પ્રકારો' : 'All Categories') : c}
                  </option>
                ))}
              </select>
            </div>

          </div>
        )}

      </div>

      {/* Crop Cards Grid */}
      {filteredCrops.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-16 text-center text-slate-400 space-y-4">
          <Sprout className="w-16 h-16 text-slate-700 mx-auto animate-pulse" />
          <h3 className="text-lg font-black text-slate-100">{lang === 'gu' ? 'કોઈ પાક મળ્યો નહીં' : 'No Crops Found'}</h3>
          <p className="text-xs text-slate-500 font-bold">{lang === 'gu' ? 'તમારા સર્ચ અથવા ફિલ્ટર સુધારીને ફરી પ્રયાસ કરો.' : 'Please refine your search parameters and try again.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              onClick={() => onSelectCrop(crop)}
              className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500 rounded-3xl overflow-hidden shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col group"
            >
              
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={crop.imageUrl}
                  alt={crop.cropName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-955/60 to-transparent opacity-90" />

                <span className="absolute top-3.5 left-3.5 bg-slate-950 border border-slate-850 text-emerald-500 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  {crop.category}
                </span>

                <div className="absolute bottom-3.5 left-3.5 right-3.5">
                  <h3 className="text-xl font-black text-slate-100 drop-shadow-md">
                    {crop.cropName} <span className="text-amber-500 font-extrabold text-base">({crop.gujaratiName})</span>
                  </h3>
                </div>
              </div>

              {/* Specs */}
              <div className="p-5.5 space-y-4 flex-1 flex flex-col justify-between">
                
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {crop.suitableRegions.slice(0, 3).map((r, i) => (
                      <span key={i} className="text-[10px] font-bold text-slate-300 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-850">
                        {r}
                      </span>
                    ))}
                    {crop.suitableRegions.length > 3 && (
                      <span className="text-[10px] font-bold text-emerald-500 bg-slate-950 px-1.5 py-0.5 rounded-lg border border-slate-850">
                        +{crop.suitableRegions.length - 3}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-405 font-bold">
                    <span className="text-slate-355">{lang === 'gu' ? 'જમીન: ' : 'Soil: '}</span> {crop.suitableSoilTypes.join(', ')}
                  </p>
                </div>

                {/* Recessed Yield & Profit cards */}
                <div className="pt-3.5 border-t border-slate-855 grid grid-cols-2 gap-3">
                  <div className="bg-slate-955 p-2 rounded-xl border border-slate-850 text-center">
                    <span className="text-[10px] text-slate-455 block font-bold uppercase">{lang === 'gu' ? 'સરેરાશ ઉત્પાદન' : 'Average Yield'}</span>
                    <span className="text-xs font-black text-slate-100 block mt-0.5">{crop.averageYield}</span>
                  </div>
                  <div className="bg-slate-955 p-2 rounded-xl border border-slate-850 text-center">
                    <span className="text-[10px] text-slate-455 block font-bold uppercase">{lang === 'gu' ? 'નફો/હેક્ટર' : 'Profit/Ha'}</span>
                    <span className="text-xs font-black text-amber-500 block mt-0.5">{crop.estimatedProfitRange}</span>
                  </div>
                </div>

                {/* Advisory Modal CTA */}
                <div className="pt-2 text-[11px] font-black text-emerald-500 group-hover:text-emerald-450 flex items-center justify-between transition-colors duration-300">
                  <span className="uppercase tracking-wider">{lang === 'gu' ? '૧૮ તકનીકી વિગતો જુઓ' : 'View 18-Field Specs'}</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
