import React, { useState } from 'react';
import { CROP_DATABASE } from '../data/cropDatabase';
import { GUJARAT_REGIONS } from '../data/gujaratRegions';
import { Search, Filter, Layers, Sprout, TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react';

export default function CropDatabaseView({ onSelectCrop, lang }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

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
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'gu' ? 'ગુજરાત પાક માહિતી કોષ (Gujarat Crop Database)' : 'Gujarat Smart Crop Advisory Database'}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {lang === 'gu'
                ? 'દરેક પાકની ૧૮ વિશિષ્ટ તકનીકી વિગતો, રોગ-જીવાત નિયંત્રણ, ખાતર ડોઝ અને નફાનું માર્ગદર્શિકા.'
                : 'Complete database containing 18 technical parameters per crop tailored for Gujarat regions.'}
            </p>
          </div>

          <div className="bg-emerald-950/80 border border-emerald-700/60 px-4 py-2 rounded-2xl text-xs font-bold text-emerald-300 self-start md:self-auto">
            {filteredCrops.length} {lang === 'gu' ? 'પાક ઉપલબ્ધ' : 'Crops Available'}
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-6">
          
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'gu' ? 'પાકનું નામ અથવા ગુજરાતી નામ શોધો (e.g. મગફળી, જીરું, Wheat)...' : 'Search by crop name or Gujarati name...'}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm font-medium"
            />
          </div>

          {/* Region Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedRegionFilter}
              onChange={(e) => setSelectedRegionFilter(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm font-medium"
            >
              <option value="All">{lang === 'gu' ? 'બધા પ્રદેશો (All Regions)' : 'All Regions'}</option>
              {GUJARAT_REGIONS.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.nameGu} ({r.name})
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm font-medium"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? (lang === 'gu' ? 'બધા પાકના પ્રકારો' : 'All Categories') : c}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Crop Cards Grid */}
      {filteredCrops.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
          <Sprout className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">કોઈ પાક મળ્યો નહીં / No crops found</h3>
          <p className="text-sm">તમારી સર્ચ અથવા ફિલ્ટર સુધારીને ફરી પ્રયાસ કરો.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              onClick={() => onSelectCrop(crop)}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-950/40 transition-all duration-300 cursor-pointer flex flex-col group"
            >
              
              {/* Image & Category */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={crop.imageUrl}
                  alt={crop.cropName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-emerald-400 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-700">
                  {crop.category}
                </span>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <h3 className="text-lg font-black text-white drop-shadow-md">
                    {crop.cropName} <span className="text-amber-300 font-bold">({crop.gujaratiName})</span>
                  </h3>
                </div>
              </div>

              {/* Card Specs */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                
                <div className="space-y-2">
                  {/* Regions Badges */}
                  <div className="flex flex-wrap gap-1">
                    {crop.suitableRegions.slice(0, 3).map((r, i) => (
                      <span key={i} className="text-[10px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                        {r}
                      </span>
                    ))}
                    {crop.suitableRegions.length > 3 && (
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">
                        +{crop.suitableRegions.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Soil Types */}
                  <p className="text-xs text-slate-400 line-clamp-1">
                    <span className="font-semibold text-slate-300">Soil:</span> {crop.suitableSoilTypes.join(', ')}
                  </p>
                </div>

                {/* Yield & Profit Brief */}
                <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Average Yield</span>
                    <span className="text-xs font-bold text-white line-clamp-1">{crop.averageYield}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400 block font-semibold uppercase">Est. Profit/Ha</span>
                    <span className="text-xs font-black text-amber-300 line-clamp-1">{crop.estimatedProfitRange}</span>
                  </div>
                </div>

                {/* Advisory Modal CTA */}
                <div className="pt-2 text-xs font-extrabold text-emerald-400 group-hover:text-emerald-300 flex items-center justify-between">
                  <span>{lang === 'gu' ? '૧૮ વિગતો જુઓ' : 'View 18-Field Specs'}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
