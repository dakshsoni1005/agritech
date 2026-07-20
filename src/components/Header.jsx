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
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding - "Cultivo" style */}
          <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="w-8 h-8 flex items-center justify-center text-black dark:text-white">
              <svg className="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                {/* 4 dots/leaves cluster representing Cultivo logo */}
                <circle cx="7" cy="8" r="2.5" />
                <circle cx="17" cy="8" r="2.5" />
                <circle cx="7" cy="16" r="2.5" />
                <circle cx="17" cy="16" r="2.5" />
                <path d="M9.5 8H14.5V16H9.5V8Z" fill="currentColor" fillOpacity="0.3" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-black dark:text-white font-sans">
                Cultivo
              </span>
            </div>
          </div>

          {/* Centered Pill Navigation (matches the black pill nav in reference image) */}
          <nav className="hidden lg:flex items-center bg-black dark:bg-slate-900 rounded-full p-1.5 border border-white/10 shadow-lg">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-full font-bold text-xs tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white text-black shadow-sm'
                      : 'text-slate-400 hover:text-white bg-transparent'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  <span>{lang === 'gu' ? item.labelGu : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls (Sign in / Sign up Free & settings) */}
          <div className="flex items-center space-x-3.5">
            
            {/* Lang & Theme Switcher (Mini / Minimalist) */}
            <div className="flex items-center space-x-1 bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5 dark:border-white/5">
              {/* Language Switch */}
              <button
                onClick={() => setLang(lang === 'gu' ? 'en' : 'gu')}
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                title="Toggle Language / ભાષા બદલો"
              >
                <Globe className="w-3.5 h-3.5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                )}
              </button>
            </div>

            {/* Auth Buttons matching the reference image ("Sign In", "Sign up Free") */}
            <div className="hidden sm:flex items-center space-x-3 text-xs font-semibold">
              <button className="text-slate-600 dark:text-slate-350 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
                Sign In
              </button>
              <button 
                onClick={() => setActiveTab('recommendation')}
                className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white px-4 py-2 rounded-full hover:bg-black/80 dark:hover:bg-white/90 transition-all shadow-sm cursor-pointer"
              >
                Sign up Free
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-slate-700 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-950/95 border-b border-black/5 dark:border-white/5 px-4 py-4 space-y-1.5 backdrop-blur-lg animate-fade-in">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span>{lang === 'gu' ? item.labelGu : item.labelEn}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
