import React, { useState } from 'react';
import { 
  Globe, Sun, Moon, Sprout, ArrowLeft, Menu, X, 
  Home, Sparkles, Database, MapPin, Calculator, Link2 
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, lang, setLang, theme, setTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelGu: 'હોમ પેજ', icon: Home },
    { id: 'recommendation', labelEn: 'AI Advice', labelGu: 'એઆઈ ભલામણ', icon: Sparkles },
    { id: 'database', labelEn: 'Crops', labelGu: 'પાક માહિતી', icon: Database },
    { id: 'regions', labelEn: 'Soil Guide', labelGu: 'જમીન માર્ગદર્શિકા', icon: MapPin },
    { id: 'calculator', labelEn: 'Calculator', labelGu: 'નફો & ખાતર', icon: Calculator },
    { id: 'gov', labelEn: 'Portals', labelGu: 'સરકારી લિંક્સ', icon: Link2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-955/60 backdrop-blur-md border-b border-slate-900/80 text-slate-105 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3.5 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center transition-all duration-300 group-hover:border-emerald-500/40">
              <Sprout className="w-5.5 h-5.5 text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-black text-slate-100 text-sm sm:text-base tracking-tight block">
                {lang === 'gu' ? 'કૃષિ માર્ગદર્શિકા' : 'Krishi AI'}
              </span>
              <span className="text-[9px] text-slate-450 uppercase font-black tracking-widest block mt-0.5">
                Gujarat Soil Info
              </span>
            </div>
          </div>

          {/* Desktop Horizontal Menu Bar (60:30:10 rule: 30% structural menu) */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600/20 border border-emerald-500/50 text-emerald-450 shadow-md shadow-emerald-950/10'
                      : 'text-slate-350 hover:text-emerald-500 bg-transparent border border-transparent hover:bg-slate-900/30'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{lang === 'gu' ? item.labelGu : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls (Theme switch, Language switcher, Mobile Menu button) */}
          <div className="flex items-center space-x-2">
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-855 border border-slate-800 hover:border-emerald-500/40 text-slate-200 transition-all duration-300 shadow-md cursor-pointer shrink-0"
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
              className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 text-xs font-black text-slate-200 hover:text-emerald-400 transition-all duration-300 shadow-md cursor-pointer shrink-0"
              title="Toggle Language / ભાષા બદલો"
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'gu' ? 'English' : 'ગુજરાતી'}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-355 hover:text-emerald-500 transition-all duration-300 shadow-md cursor-pointer shrink-0"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-900 px-4 py-4 space-y-2 backdrop-blur-lg animate-slide-down">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3.5 px-4.5 py-3.5 rounded-xl font-black text-sm tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-350 hover:text-emerald-500 bg-slate-900/40 border border-slate-850/40 hover:border-emerald-500/20'
                }`}
              >
                <Icon className="w-4.5 h-4.5 text-emerald-500" />
                <span>{lang === 'gu' ? item.labelGu : item.labelEn}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
