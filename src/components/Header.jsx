import React from 'react';
import { Sprout, Database, MapPin, Calculator, Globe, Sparkles } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, lang, setLang }) {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-emerald-800/30 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('recommendation')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sprout className="w-7 h-7 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent tracking-tight">
                  {lang === 'gu' ? 'ગુજરાત કૃષિ એઆઈ' : 'Krishi Advisory AI'}
                </span>
                <span className="bg-emerald-900/80 text-emerald-300 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-emerald-700/50 hidden sm:inline-block">
                  Smart Gujarat
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {lang === 'gu' ? 'જમીન પ્રદેશ આધારિત સ્માર્ટ પાક સલાહકાર પ્લેટફોર્મ' : 'AI Crop Recommendation & Advisory Portal'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-800/60 p-1.5 rounded-2xl border border-slate-700/50">
            <button
              onClick={() => setActiveTab('recommendation')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'recommendation'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'gu' ? 'એઆઈ પાક ભલામણ' : 'AI Recommendation'}</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'database'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Database className="w-4 h-4 text-teal-400" />
              <span>{lang === 'gu' ? 'સંપૂર્ણ પાક માહિતી' : 'Crop Database'}</span>
            </button>

            <button
              onClick={() => setActiveTab('regions')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'regions'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{lang === 'gu' ? 'પ્રાદેશિક જમીન માર્ગદર્શિકા' : 'Soil Insights'}</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Calculator className="w-4 h-4 text-sky-400" />
              <span>{lang === 'gu' ? 'નફો & ખાતર ગણતરી' : 'Yield & Profit'}</span>
            </button>
          </nav>

          {/* Controls: Language Selector */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLang(lang === 'gu' ? 'en' : 'gu')}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-xs sm:text-sm font-semibold text-slate-200 hover:text-emerald-400 transition-all shadow-inner"
              title="Toggle Language / ભાષા બદલો"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'gu' ? 'English' : 'ગુજરાતી'}</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-2 border-t border-slate-800 no-scrollbar">
          <button
            onClick={() => setActiveTab('recommendation')}
            className={`flex items-center space-x-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === 'recommendation' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? 'એઆઈ પાક ભલામણ' : 'AI Advisor'}</span>
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center space-x-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === 'database' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? 'પાક માહિતી' : 'Database'}</span>
          </button>
          <button
            onClick={() => setActiveTab('regions')}
            className={`flex items-center space-x-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === 'regions' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? 'જમીન પ્રદેશ' : 'Regions'}</span>
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center space-x-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === 'calculator' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
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
