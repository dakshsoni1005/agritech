import React from 'react';
import { Sprout, Database, MapPin, Calculator, Sparkles, X, Link2, Home } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, lang, onItemClick, onClose }) {
  const handleNavClick = (tab) => {
    setActiveTab(tab);
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div className="h-full flex flex-col justify-between select-none">
      <div>
        {/* Sidebar Header Logo & Branding */}
        <div className="p-6 border-b border-slate-850 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-slate-955 border border-slate-850 flex items-center justify-center">
              <Sprout className="w-5.5 h-5.5 text-emerald-500" />
            </div>
            <div>
              <span className="font-black text-slate-100 text-lg tracking-tight block">
                {lang === 'gu' ? 'કૃષિ નેવિગેશન' : 'Krishi Navigation'}
              </span>
              <span className="text-[9px] text-slate-455 uppercase font-black tracking-widest block mt-0.5">
                Gujarat Soil Info
              </span>
            </div>
          </div>

          {/* Conditional Close Button for Mobile Menu Drawer */}
          {onClose && (
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-slate-955 border border-slate-850 hover:border-emerald-500/40 text-slate-350 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          )}
        </div>

        {/* Sidebar Vertical Tabs */}
        <nav className="p-4 space-y-2.5">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-2xl text-sm font-extrabold transition-all duration-300 group cursor-pointer ${
              activeTab === 'home'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-300 hover:text-emerald-500 bg-slate-955 hover:bg-slate-950 border border-slate-850 hover:border-emerald-555/20'
            }`}
          >
            <Home className="w-4.5 h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span>{lang === 'gu' ? 'હોમ પેજ' : 'Home'}</span>
          </button>

          <button
            onClick={() => handleNavClick('recommendation')}
            className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-2xl text-sm font-extrabold transition-all duration-300 group cursor-pointer ${
              activeTab === 'recommendation'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-300 hover:text-emerald-500 bg-slate-955 hover:bg-slate-950 border border-slate-850 hover:border-emerald-555/20'
            }`}
          >
            <Sparkles className="w-4.5 h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span>{lang === 'gu' ? 'એઆઈ પાક ભલામણ' : 'AI Recommendation'}</span>
          </button>

          <button
            onClick={() => handleNavClick('database')}
            className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-2xl text-sm font-extrabold transition-all duration-300 group cursor-pointer ${
              activeTab === 'database'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-300 hover:text-emerald-500 bg-slate-955 hover:bg-slate-950 border border-slate-850 hover:border-emerald-555/20'
            }`}
          >
            <Database className="w-4.5 h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span>{lang === 'gu' ? 'સંપૂર્ણ પાક માહિતી' : 'Crop Database'}</span>
          </button>

          <button
            onClick={() => handleNavClick('regions')}
            className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-2xl text-sm font-extrabold transition-all duration-300 group cursor-pointer ${
              activeTab === 'regions'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-300 hover:text-emerald-500 bg-slate-955 hover:bg-slate-950 border border-slate-850 hover:border-emerald-555/20'
            }`}
          >
            <MapPin className="w-4.5 h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span>{lang === 'gu' ? 'પ્રાદેશિક જમીન માર્ગદર્શિકા' : 'Soil Insights'}</span>
          </button>

          <button
            onClick={() => handleNavClick('calculator')}
            className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-2xl text-sm font-extrabold transition-all duration-300 group cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-300 hover:text-emerald-500 bg-slate-955 hover:bg-slate-950 border border-slate-850 hover:border-emerald-555/20'
            }`}
          >
            <Calculator className="w-4.5 h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span>{lang === 'gu' ? 'નફો & ખાતર ગણતરી' : 'Yield & Profit'}</span>
          </button>

          <button
            onClick={() => handleNavClick('gov')}
            className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-2xl text-sm font-extrabold transition-all duration-300 group cursor-pointer ${
              activeTab === 'gov'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-300 hover:text-emerald-500 bg-slate-955 hover:bg-slate-950 border border-slate-850 hover:border-emerald-555/20'
            }`}
          >
            <Link2 className="w-4.5 h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span>{lang === 'gu' ? 'સરકારી પોર્ટલ લિંક્સ' : 'Government Portals'}</span>
          </button>
        </nav>
      </div>

      {/* Footer Info inside Sidebar */}
      <div className="p-6 text-[10px] text-slate-500 font-bold border-t border-slate-850 shrink-0">
        © 2026 Krishi AI • Gujarat
      </div>
    </div>
  );
}
