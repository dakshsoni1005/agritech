import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RecommendationWizard from './components/RecommendationWizard';
import RecommendationResults from './components/RecommendationResults';
import CropDatabaseView from './components/CropDatabaseView';
import CropDetailModal from './components/CropDetailModal';
import RegionalInsights from './components/RegionalInsights';
import ProfitCalculator from './components/ProfitCalculator';
import GovLinksView from './components/GovLinksView';
import HomeView from './components/HomeView';
import Footer from './components/Footer';
import { recommendCrops } from './utils/recommendationEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState('gu'); // Default to Gujarati
  const [recommendationResult, setRecommendationResult] = useState(null);
  const [selectedModalCrop, setSelectedModalCrop] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

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

  return (
    <div 
      className="min-h-screen text-slate-100 flex font-sans selection:bg-emerald-500 selection:text-white antialiased transition-colors duration-300"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.96)), url('/farmer-hero-bg.jpg')",
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center'
      }}
    >
      
      {/* Persistent Left Sidebar (Icon dock on Mobile/Tablet, Full list on Desktop) */}
      <aside className="flex w-16 lg:w-80 h-screen sticky top-0 border-r border-slate-900/60 bg-slate-900/40 backdrop-blur-md flex-col shrink-0 transition-all duration-300 z-30">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          lang={lang} 
        />
      </aside>

      {/* Main Right Column (holds header and main container layout) */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Navigation Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
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
