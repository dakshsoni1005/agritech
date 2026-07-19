import React, { useState } from 'react';
import { Sprout, Database, MapPin, Calculator, Globe, Sparkles, Sun, Moon, Menu, X, ArrowLeft } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, lang, setLang, theme, setTheme }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-955/85 backdrop-blur-xl border-b border-slate-900 text-slate-100 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center space-x-3">
            {/* Menu Hamburger Trigger Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-850 hover:border-emerald-500/40 text-slate-200 transition-all duration-300 shadow-md cursor-pointer shrink-0"
              title="Open Menu / મેનૂ ખોલો"
            >
              <Menu className="w-5.5 h-5.5 text-emerald-500" />
            </button>

            {/* Back Button (Only visible if NOT on home page / recommendation tab) */}
            {activeTab !== 'recommendation' && (
              <button
                onClick={() => setActiveTab('recommendation')}
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-850 hover:border-emerald-500/40 text-slate-200 transition-all duration-300 shadow-md cursor-pointer shrink-0 animate-scale-up"
                title="Go Back / પાછા જાઓ"
              >
                <ArrowLeft className="w-5.5 h-5.5 text-amber-500" />
              </button>
            )}

            {/* Logo & Branding */}
            <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={() => setActiveTab('recommendation')}>
              <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center transition-all duration-300 group-hover:border-emerald-500/40">
                <Sprout className="w-5.5 h-5.5 text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="hidden xs:block">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-base sm:text-lg text-slate-100 tracking-tight">
                    {lang === 'gu' ? 'ગુજરાત કૃષિ એઆઈ' : 'Krishi AI'}
                  </span>
                </div>
                <p className="text-[9px] text-slate-450 font-semibold tracking-wide hidden md:block">
                  {lang === 'gu' ? 'જમીન પ્રદેશ આધારિત સ્માર્ટ પાક સલાહકાર' : 'Agro Crop Advisory Portal'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Header: Theme switch & Language switcher buttons (always visible) */}
          <div className="flex items-center space-x-2">
            
            {/* Active page indicator (Hidden on mobile) */}
            <span className="hidden lg:inline-block bg-slate-900 text-emerald-500 text-[10px] uppercase font-black tracking-widest px-3.5 py-1.5 rounded-xl border border-slate-850 transition-all duration-300">
              {activeTab === 'recommendation' && (lang === 'gu' ? 'એઆઈ પાક ભલામણ' : 'AI Recommendation')}
              {activeTab === 'database' && (lang === 'gu' ? 'પાક માહિતી કોષ' : 'Crop Database')}
              {activeTab === 'regions' && (lang === 'gu' ? 'જમીન માર્ગદર્શિકા' : 'Soil Insights')}
              {activeTab === 'calculator' && (lang === 'gu' ? 'નફો & ખાતર ગણતરી' : 'Yield & Profit')}
            </span>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-850 hover:border-emerald-500/40 text-slate-200 transition-all duration-300 shadow-md cursor-pointer shrink-0"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '12s' }} />
                  <span className="text-xs font-black hidden sm:inline-block">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-black hidden sm:inline-block">Dark</span>
                </>
              )}
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={() => setLang(lang === 'gu' ? 'en' : 'gu')}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-850 hover:border-emerald-505/40 text-xs font-black text-slate-200 hover:text-emerald-400 transition-all duration-300 shadow-md cursor-pointer shrink-0"
              title="Toggle Language / ભાષા બદલો"
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'gu' ? 'English' : 'ગુજરાતી'}</span>
            </button>

          </div>

        </div>
      </div>

      {/* Collapsible Sidebar Drawer Overlay and Panel */}
      {isSidebarOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 z-45 bg-slate-955/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar Drawer Panel */}
          <div className="fixed top-0 left-0 h-screen w-80 max-w-[85vw] bg-slate-900 border-r border-slate-800 z-50 shadow-2xl flex flex-col justify-between animate-slide-right overflow-hidden transition-colors duration-300">
            
            <div>
              {/* Sidebar Header */}
              <div className="p-5.5 border-b border-slate-850 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Sprout className="w-5.5 h-5.5 text-emerald-500" />
                  <span className="font-black text-slate-100 text-lg tracking-tight">
                    {lang === 'gu' ? 'મુખ્ય મેનૂ' : 'Krishi Navigation'}
                  </span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-850 hover:border-emerald-500/40 text-slate-350 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Sidebar Navigation Items */}
              <nav className="p-4 space-y-2.5">
                <button
                  onClick={() => {
                    setActiveTab('recommendation');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-2xl text-sm font-extrabold transition-all duration-350 group cursor-pointer ${
                    activeTab === 'recommendation'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                      : 'text-slate-300 hover:text-emerald-500 bg-slate-955 hover:bg-slate-950 border border-slate-850 hover:border-emerald-555/20'
                  }`}
                >
                  <Sparkles className="w-4.5 h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <span>{lang === 'gu' ? 'એઆઈ પાક ભલામણ' : 'AI Recommendation'}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('database');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-2xl text-sm font-extrabold transition-all duration-350 group cursor-pointer ${
                    activeTab === 'database'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                      : 'text-slate-300 hover:text-emerald-500 bg-slate-955 hover:bg-slate-950 border border-slate-850 hover:border-emerald-555/20'
                  }`}
                >
                  <Database className="w-4.5 h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <span>{lang === 'gu' ? 'સંપૂર્ણ પાક માહિતી' : 'Crop Database'}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('regions');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-2xl text-sm font-extrabold transition-all duration-350 group cursor-pointer ${
                    activeTab === 'regions'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                      : 'text-slate-300 hover:text-emerald-500 bg-slate-955 hover:bg-slate-950 border border-slate-850 hover:border-emerald-555/20'
                  }`}
                >
                  <MapPin className="w-4.5 h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <span>{lang === 'gu' ? 'પ્રાદેશિક જમીન માર્ગદર્શિકા' : 'Soil Insights'}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('calculator');
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-2xl text-sm font-extrabold transition-all duration-350 group cursor-pointer ${
                    activeTab === 'calculator'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                      : 'text-slate-300 hover:text-emerald-500 bg-slate-955 hover:bg-slate-950 border border-slate-850 hover:border-emerald-555/20'
                  }`}
                >
                  <Calculator className="w-4.5 h-4.5 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <span>{lang === 'gu' ? 'નફો & ખાતર ગણતરી' : 'Yield & Profit'}</span>
                </button>
              </nav>
            </div>

            {/* Sidebar Controls (Theme selector & Language switcher duplicate backup in drawer) */}
            <div className="p-5.5 border-t border-slate-850 bg-slate-955 flex items-center justify-between gap-4">
              
              {/* Theme toggle option */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex-1 flex items-center justify-center space-x-2 px-3.5 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 text-slate-200 transition-all duration-300 shadow-md cursor-pointer"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
                    <span className="text-xs font-extrabold">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-extrabold">Dark</span>
                  </>
                )}
              </button>

              {/* Language switcher option */}
              <button
                onClick={() => setLang(lang === 'gu' ? 'en' : 'gu')}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-550/40 text-xs font-extrabold text-slate-200 hover:text-emerald-400 transition-all duration-300 shadow-md cursor-pointer"
                title="Toggle Language / ભાષા બદલો"
              >
                <Globe className="w-4 h-4 text-emerald-500" />
                <span>{lang === 'gu' ? 'English' : 'ગુજરાતી'}</span>
              </button>

            </div>

          </div>
        </>
      )}

    </header>
  );
}
