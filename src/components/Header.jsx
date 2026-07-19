import React from 'react';
import { Sprout, Database, MapPin, Calculator, Globe, Sparkles, Sun, Moon } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, lang, setLang, theme, setTheme }) {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('recommendation')}>
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center transition-all duration-300 group-hover:border-emerald-500/40">
              <Sprout className="w-6 h-6 text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-100 tracking-tight">
                  {lang === 'gu' ? 'ગુજરાત કૃષિ એઆઈ' : 'Krishi Advisory AI'}
                </span>
                <span className="bg-slate-900 text-slate-350 text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full border border-slate-800 hidden sm:inline-block">
                  Smart Gujarat
                </span>
              </div>
              <p className="text-[11px] text-slate-450 font-semibold tracking-wide">
                {lang === 'gu' ? 'જમીન પ્રદેશ આધારિત સ્માર્ટ પાક સલાહકાર પ્લેટફોર્મ' : 'AI Crop Recommendation & Advisory Portal'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-900">
            <button
              onClick={() => setActiveTab('recommendation')}
              className={`flex items-center space-x-2 px-4.5 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300 relative group cursor-pointer ${
                activeTab === 'recommendation'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'text-slate-405 hover:text-emerald-500 bg-slate-900 hover:bg-slate-900/80 border border-slate-850'
              }`}
            >
              <Sparkles className={`w-4 h-4 transition-transform duration-300 group-hover:rotate-12 ${activeTab === 'recommendation' ? 'text-white' : 'text-emerald-500'}`} />
              <span>{lang === 'gu' ? 'એઆઈ પાક ભલામણ' : 'AI Recommendation'}</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center space-x-2 px-4.5 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300 relative group cursor-pointer ${
                activeTab === 'database'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'text-slate-405 hover:text-emerald-500 bg-slate-900 hover:bg-slate-900/80 border border-slate-850'
              }`}
            >
              <Database className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${activeTab === 'database' ? 'text-white' : 'text-emerald-500'}`} />
              <span>{lang === 'gu' ? 'સંપૂર્ણ પાક માહિતી' : 'Crop Database'}</span>
            </button>

            <button
              onClick={() => setActiveTab('regions')}
              className={`flex items-center space-x-2 px-4.5 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300 relative group cursor-pointer ${
                activeTab === 'regions'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'text-slate-405 hover:text-emerald-500 bg-slate-900 hover:bg-slate-900/80 border border-slate-850'
              }`}
            >
              <MapPin className={`w-4 h-4 transition-transform duration-300 group-hover:translate-y-[-1px] ${activeTab === 'regions' ? 'text-white' : 'text-emerald-500'}`} />
              <span>{lang === 'gu' ? 'પ્રાદેશિક જમીન માર્ગદર્શિકા' : 'Soil Insights'}</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center space-x-2 px-4.5 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300 relative group cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'text-slate-405 hover:text-emerald-500 bg-slate-900 hover:bg-slate-900/80 border border-slate-850'
              }`}
            >
              <Calculator className={`w-4 h-4 transition-transform duration-300 group-hover:scale-115 ${activeTab === 'calculator' ? 'text-white' : 'text-emerald-500'}`} />
              <span>{lang === 'gu' ? 'નફો & ખાતર ગણતરી' : 'Yield & Profit'}</span>
            </button>
          </nav>

          {/* Controls: Theme & Language Selectors */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center w-10.5 h-10.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 text-slate-200 transition-all duration-300 shadow-md cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode / લાઈટ મોડ ચાલુ કરો' : 'Switch to Dark Mode / ડાર્ક મોડ ચાલુ કરો'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 text-amber-500 animate-spin" style={{ animationDuration: '12s' }} />
              ) : (
                <Moon className="w-4.5 h-4.5 text-emerald-500" />
              )}
            </button>

            <button
              onClick={() => setLang(lang === 'gu' ? 'en' : 'gu')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 text-xs sm:text-sm font-extrabold text-slate-200 hover:text-emerald-400 transition-all duration-300 shadow-md cursor-pointer"
              title="Toggle Language / ભાષા બદલો"
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'gu' ? 'English' : 'ગુજરાતી'}</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-3 space-x-2 border-t border-slate-900 no-scrollbar">
          <button
            onClick={() => setActiveTab('recommendation')}
            className={`flex items-center space-x-1.5 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${
              activeTab === 'recommendation' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40' : 'bg-slate-900 text-slate-400 border border-slate-850'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? 'એઆઈ પાક ભલામણ' : 'AI Advisor'}</span>
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center space-x-1.5 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${
              activeTab === 'database' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40' : 'bg-slate-900 text-slate-400 border border-slate-850'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? 'પાક માહિતી' : 'Database'}</span>
          </button>
          <button
            onClick={() => setActiveTab('regions')}
            className={`flex items-center space-x-1.5 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${
              activeTab === 'regions' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40' : 'bg-slate-900 text-slate-400 border border-slate-850'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? 'જમીન પ્રદેશ' : 'Regions'}</span>
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center space-x-1.5 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${
              activeTab === 'calculator' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40' : 'bg-slate-900 text-slate-400 border border-slate-850'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? 'નફો ગણતરી' : 'Estimator'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
