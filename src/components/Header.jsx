import React from 'react';
import { Globe, Sun, Moon, Sprout, ArrowLeft } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, lang, setLang, theme, setTheme }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-955/40 backdrop-blur-md border-b border-slate-900 text-slate-105 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center space-x-3">
            {/* Back Button (Only visible if NOT on home page) */}
            {activeTab !== 'home' && (
              <button
                onClick={() => setActiveTab('home')}
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-850 hover:border-emerald-500/40 text-slate-200 transition-all duration-300 shadow-md cursor-pointer shrink-0 animate-scale-up"
                title="Go Back / પાછા જાઓ"
              >
                <ArrowLeft className="w-5.5 h-5.5 text-amber-500" />
              </button>
            )}

            {/* Logo & Branding (Hidden on desktop because sidebar shows it) */}
            <div className="lg:hidden flex items-center space-x-2.5 cursor-pointer group" onClick={() => setActiveTab('home')}>
              <div className="w-10 h-10 rounded-xl bg-slate-900/60 border border-slate-850 flex items-center justify-center transition-all duration-300 group-hover:border-emerald-500/40">
                <Sprout className="w-5 h-5 text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="font-extrabold text-sm sm:text-base text-slate-100 tracking-tight">
                {lang === 'gu' ? 'કૃષિ એઆઈ' : 'Krishi AI'}
              </span>
            </div>

            {/* Page Title (Shows on desktop next to back button if active) */}
            <div className="hidden lg:block font-black text-slate-100 text-lg tracking-tight">
              {activeTab === 'home' && (lang === 'gu' ? 'મુખ્ય કૃષિ એઆઈ પોર્ટલ' : 'Krishi AI Portal')}
              {activeTab === 'recommendation' && (lang === 'gu' ? 'મુખ્ય પાક સલાહકાર ડેશબોર્ડ' : 'AI Crop Advisory Dashboard')}
              {activeTab === 'database' && (lang === 'gu' ? 'ગુજરાત પાક માહિતી કોષ' : 'Gujarat Crop Database')}
              {activeTab === 'regions' && (lang === 'gu' ? 'હવામાન અને જમીન માહિતી' : 'Agro-Climatic Soil Guide')}
              {activeTab === 'calculator' && (lang === 'gu' ? 'ઉત્પાદન અને નફો અંદાજક' : 'Yield & Financial Calculator')}
              {activeTab === 'gov' && (lang === 'gu' ? 'સરકારી કૃષિ પોર્ટલ ડાયરેક્ટરી' : 'Government Portals Directory')}
            </div>
          </div>

          {/* Right Header: Theme switch & Language switcher buttons */}
          <div className="flex items-center space-x-2">
            
            {/* Active page indicator badge (Shown on mobile for page context) */}
            <span className="lg:hidden bg-slate-900/60 text-emerald-500 text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-xl border border-slate-850 transition-all duration-300">
              {activeTab === 'home' && (lang === 'gu' ? 'હોમ' : 'Home')}
              {activeTab === 'recommendation' && (lang === 'gu' ? 'એઆઈ પાક' : 'AI Rec')}
              {activeTab === 'database' && (lang === 'gu' ? 'માહિતી' : 'Database')}
              {activeTab === 'regions' && (lang === 'gu' ? 'જમીન' : 'Insights')}
              {activeTab === 'calculator' && (lang === 'gu' ? 'નફો' : 'Profit')}
              {activeTab === 'gov' && (lang === 'gu' ? 'પોર્ટલ' : 'Gov Links')}
            </span>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-850 hover:border-emerald-500/40 text-slate-200 transition-all duration-300 shadow-md cursor-pointer shrink-0"
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
              className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-850 hover:border-emerald-505/40 text-xs font-black text-slate-200 hover:text-emerald-400 transition-all duration-300 shadow-md cursor-pointer shrink-0"
              title="Toggle Language / ભાષા બદલો"
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'gu' ? 'English' : 'ગુજરાતી'}</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
