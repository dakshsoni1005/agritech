import React from 'react';
import { Sprout, Database, MapPin, Calculator, Sparkles, Link2, Home } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, lang }) {
  const handleNavClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="h-full flex flex-col justify-between select-none">
      <div>
        
        {/* Sidebar Header Logo & Branding */}
        <div className="p-4 lg:p-6 border-b border-slate-850/60 flex items-center justify-center lg:justify-start shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-slate-950/40 border border-slate-850 flex items-center justify-center shadow-md">
              <Sprout className="w-5 h-5 lg:w-5.5 lg:h-5.5 text-emerald-500" />
            </div>
            {/* Branding names are only visible on large desktop views */}
            <div className="hidden lg:block">
              <span className="font-black text-slate-100 text-base tracking-tight block">
                {lang === 'gu' ? 'કૃષિ માર્ગદર્શિકા' : 'Krishi Navigation'}
              </span>
              <span className="text-[9px] text-slate-450 uppercase font-black tracking-widest block mt-0.5">
                Gujarat Soil Info
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Vertical Tabs */}
        <nav className="p-2 lg:p-4 space-y-2.5">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center justify-center lg:justify-start lg:space-x-3.5 p-3 lg:px-4 lg:py-3.5 rounded-xl lg:rounded-2xl text-sm font-extrabold transition-all duration-300 group cursor-pointer ${
              activeTab === 'home'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-300 hover:text-emerald-500 bg-slate-950/20 hover:bg-slate-950/60 border border-slate-850/40 hover:border-emerald-500/20'
            }`}
            title={lang === 'gu' ? 'હોમ પેજ' : 'Home'}
          >
            <Home className="w-5 h-5 lg:w-4.5 lg:h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="hidden lg:block">{lang === 'gu' ? 'હોમ પેજ' : 'Home'}</span>
          </button>

          <button
            onClick={() => handleNavClick('recommendation')}
            className={`w-full flex items-center justify-center lg:justify-start lg:space-x-3.5 p-3 lg:px-4 lg:py-3.5 rounded-xl lg:rounded-2xl text-sm font-extrabold transition-all duration-300 group cursor-pointer ${
              activeTab === 'recommendation'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-300 hover:text-emerald-500 bg-slate-950/20 hover:bg-slate-950/60 border border-slate-850/40 hover:border-emerald-500/20'
            }`}
            title={lang === 'gu' ? 'એઆઈ પાક ભલામણ' : 'AI Recommendation'}
          >
            <Sparkles className="w-5 h-5 lg:w-4.5 lg:h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="hidden lg:block">{lang === 'gu' ? 'એઆઈ પાક ભલામણ' : 'AI Recommendation'}</span>
          </button>

          <button
            onClick={() => handleNavClick('database')}
            className={`w-full flex items-center justify-center lg:justify-start lg:space-x-3.5 p-3 lg:px-4 lg:py-3.5 rounded-xl lg:rounded-2xl text-sm font-extrabold transition-all duration-300 group cursor-pointer ${
              activeTab === 'database'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-300 hover:text-emerald-500 bg-slate-955/20 hover:bg-slate-950/60 border border-slate-850/40 hover:border-emerald-500/20'
            }`}
            title={lang === 'gu' ? 'સંપૂર્ણ પાક માહિતી' : 'Crop Database'}
          >
            <Database className="w-5 h-5 lg:w-4.5 lg:h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="hidden lg:block">{lang === 'gu' ? 'સંપૂર્ણ પાક માહિતી' : 'Crop Database'}</span>
          </button>

          <button
            onClick={() => handleNavClick('regions')}
            className={`w-full flex items-center justify-center lg:justify-start lg:space-x-3.5 p-3 lg:px-4 lg:py-3.5 rounded-xl lg:rounded-2xl text-sm font-extrabold transition-all duration-300 group cursor-pointer ${
              activeTab === 'regions'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-300 hover:text-emerald-500 bg-slate-955/20 hover:bg-slate-950/60 border border-slate-850/40 hover:border-emerald-500/20'
            }`}
            title={lang === 'gu' ? 'પ્રાદેશિક જમીન માર્ગદર્શિકા' : 'Soil Insights'}
          >
            <MapPin className="w-5 h-5 lg:w-4.5 lg:h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="hidden lg:block">{lang === 'gu' ? 'પ્રાદેશિક જમીન માર્ગદર્શિકા' : 'Soil Insights'}</span>
          </button>

          <button
            onClick={() => handleNavClick('calculator')}
            className={`w-full flex items-center justify-center lg:justify-start lg:space-x-3.5 p-3 lg:px-4 lg:py-3.5 rounded-xl lg:rounded-2xl text-sm font-extrabold transition-all duration-300 group cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-300 hover:text-emerald-500 bg-slate-955/20 hover:bg-slate-950/60 border border-slate-850/40 hover:border-emerald-500/20'
            }`}
            title={lang === 'gu' ? 'નફો & ખાતર ગણતરી' : 'Yield & Profit'}
          >
            <Calculator className="w-5 h-5 lg:w-4.5 lg:h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="hidden lg:block">{lang === 'gu' ? 'નફો & ખાતર ગણતરી' : 'Yield & Profit'}</span>
          </button>

          <button
            onClick={() => handleNavClick('gov')}
            className={`w-full flex items-center justify-center lg:justify-start lg:space-x-3.5 p-3 lg:px-4 lg:py-3.5 rounded-xl lg:rounded-2xl text-sm font-extrabold transition-all duration-300 group cursor-pointer ${
              activeTab === 'gov'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                : 'text-slate-300 hover:text-emerald-500 bg-slate-955/20 hover:bg-slate-950/60 border border-slate-850/40 hover:border-emerald-500/20'
            }`}
            title={lang === 'gu' ? 'સરકારી પોર્ટલ લિંક્સ' : 'Government Portals'}
          >
            <Link2 className="w-5 h-5 lg:w-4.5 lg:h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="hidden lg:block">{lang === 'gu' ? 'સરકારી પોર્ટલ લિંક્સ' : 'Government Portals'}</span>
          </button>
        </nav>
      </div>

      {/* Footer Info (Hidden on mobile docks) */}
      <div className="hidden lg:block p-6 text-[10px] text-slate-500 font-bold border-t border-slate-850 shrink-0">
        © 2026 Krishi AI • Gujarat
      </div>
    </div>
  );
}
