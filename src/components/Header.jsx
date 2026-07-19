import React, { useState } from 'react';
import { Globe, Sun, Moon, Menu, Sprout, ArrowLeft } from 'lucide-react';
import Sidebar from './Sidebar';

export default function Header({ activeTab, setActiveTab, lang, setLang, theme, setTheme }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-955/85 backdrop-blur-xl border-b border-slate-900 text-slate-105 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center space-x-3">
            {/* Menu Hamburger Trigger Button (Visible only on Mobile/Tablet: lg:hidden) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-850 hover:border-emerald-500/40 text-slate-200 transition-all duration-300 shadow-md cursor-pointer shrink-0"
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

            {/* Logo & Branding (Hidden on desktop because static left sidebar already shows it) */}
            <div className="lg:hidden flex items-center space-x-2.5 cursor-pointer group" onClick={() => setActiveTab('recommendation')}>
              <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center transition-all duration-300 group-hover:border-emerald-500/40">
                <Sprout className="w-5.5 h-5.5 text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-base sm:text-lg text-slate-100 tracking-tight">
                    {lang === 'gu' ? 'ગુજરાત કૃષિ એઆઈ' : 'Krishi AI'}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Page Title (Shows on desktop next to back button if active) */}
            <div className="hidden lg:block font-black text-slate-100 text-lg tracking-tight">
              {activeTab === 'recommendation' && (lang === 'gu' ? 'મુખ્ય પાક સલાહકાર ડેશબોર્ડ' : 'AI Crop Advisory Dashboard')}
              {activeTab === 'database' && (lang === 'gu' ? 'ગુજરાત પાક માહિતી કોષ' : 'Gujarat Crop Database')}
              {activeTab === 'regions' && (lang === 'gu' ? 'હવામાન અને જમીન માહિતી' : 'Agro-Climatic Soil Guide')}
              {activeTab === 'calculator' && (lang === 'gu' ? 'ઉત્પાદન અને નફો અંદાજક' : 'Yield & Financial Calculator')}
              {activeTab === 'gov' && (lang === 'gu' ? 'સરકારી કૃષિ પોર્ટલ ડાયરેક્ટરી' : 'Government Portals Directory')}
            </div>
          </div>

          {/* Right Header: Theme switch & Language switcher buttons (always visible) */}
          <div className="flex items-center space-x-2">
            
            {/* Active page indicator badge (Shown on mobile for page context) */}
            <span className="lg:hidden bg-slate-900 text-emerald-500 text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-xl border border-slate-850 transition-all duration-300">
              {activeTab === 'recommendation' && (lang === 'gu' ? 'એઆઈ પાક' : 'AI Rec')}
              {activeTab === 'database' && (lang === 'gu' ? 'માહિતી' : 'Database')}
              {activeTab === 'regions' && (lang === 'gu' ? 'જમીન' : 'Insights')}
              {activeTab === 'calculator' && (lang === 'gu' ? 'નફો' : 'Profit')}
              {activeTab === 'gov' && (lang === 'gu' ? 'પોર્ટલ' : 'Gov Links')}
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

      {/* Collapsible Sidebar Drawer Overlay and Panel (Mobile Only) */}
      {isSidebarOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 z-45 bg-slate-955/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar Drawer Panel */}
          <div className="fixed top-0 left-0 h-screen w-80 max-w-[85vw] bg-slate-900 border-r border-slate-800 z-50 shadow-2xl flex flex-col justify-between animate-slide-right overflow-hidden transition-colors duration-300">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              lang={lang}
              onItemClick={() => setIsSidebarOpen(false)}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>
        </>
      )}

    </header>
  );
}
