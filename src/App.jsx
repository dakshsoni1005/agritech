import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RecommendationWizard from './components/RecommendationWizard';
import RecommendationResults from './components/RecommendationResults';
import CropDatabaseView from './components/CropDatabaseView';
import CropDetailModal from './components/CropDetailModal';
import RegionalInsights from './components/RegionalInsights';
import ProfitCalculator from './components/ProfitCalculator';
import GovLinksView from './components/GovLinksView';
import HomeView from './components/HomeView';
import AuthView from './components/AuthView';
import Footer from './components/Footer';
import { recommendCrops } from './utils/recommendationEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState('gu'); // Default to Gujarati
  const [recommendationResult, setRecommendationResult] = useState(null);
  const [selectedModalCrop, setSelectedModalCrop] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  
  // Auth state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ks_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authMode, setAuthMode] = useState('login');

  // Side effect to sync theme status with html node classes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const handleWizardSubmit = (inputs) => {
    const result = recommendCrops(inputs);
    setRecommendationResult(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetRecommendation = () => {
    setRecommendationResult(null);
  };

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    setActiveTab('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('ks_current_user');
    setUser(null);
    setActiveTab('home');
  };

  return (
    <div 
      className="min-h-screen text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white antialiased transition-colors duration-300"
    >
      
      {/* Main Column (holds header and main container layout) */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Navigation Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          user={user}
          onLogout={handleLogout}
          setAuthMode={setAuthMode}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {activeTab === 'home' && (
            <HomeView 
              lang={lang}
              onNavigate={(tab) => {
                setActiveTab(tab);
                if (tab === 'recommendation') {
                  setRecommendationResult(null);
                }
              }}
            />
          )}

          {activeTab === 'recommendation' && (
            <div>
              {!recommendationResult ? (
                <RecommendationWizard
                  onSubmit={handleWizardSubmit}
                  lang={lang}
                />
              ) : (
                <RecommendationResults
                  result={recommendationResult}
                  onReset={handleResetRecommendation}
                  onViewCropDetails={(crop) => setSelectedModalCrop(crop)}
                  lang={lang}
                />
              )}
            </div>
          )}

          {activeTab === 'database' && (
            <CropDatabaseView
              onSelectCrop={(crop) => setSelectedModalCrop(crop)}
              lang={lang}
              onBack={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'regions' && (
            <RegionalInsights 
              lang={lang} 
              onBack={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'calculator' && (
            <ProfitCalculator 
              lang={lang} 
              onBack={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'gov' && (
            <GovLinksView 
              lang={lang} 
              onBack={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'auth' && (
            <AuthView
              lang={lang}
              initialMode={authMode}
              onAuthSuccess={handleAuthSuccess}
              onBack={() => setActiveTab('home')}
            />
          )}

        </main>

        {/* 18-Field Detailed Advisory Modal */}
        <CropDetailModal
          crop={selectedModalCrop}
          onClose={() => setSelectedModalCrop(null)}
          lang={lang}
        />

        {/* Footer */}
        <Footer lang={lang} />

      </div>

    </div>
  );
}
