import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RecommendationWizard from './components/RecommendationWizard';
import RecommendationResults from './components/RecommendationResults';
import CropDatabaseView from './components/CropDatabaseView';
import CropDetailModal from './components/CropDetailModal';
import RegionalInsights from './components/RegionalInsights';
import ProfitCalculator from './components/ProfitCalculator';
import Footer from './components/Footer';
import { recommendCrops } from './utils/recommendationEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('recommendation');
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
    <div className="min-h-screen bg-slate-955 text-slate-100 flex font-sans selection:bg-emerald-500 selection:text-white antialiased transition-colors duration-300">
      
      {/* Permanent Left Sidebar for Desktop (visible on lg screens and up) */}
      <aside className="hidden lg:flex w-80 h-screen sticky top-0 border-r border-slate-900 bg-slate-900 flex-col shrink-0 transition-colors duration-300">
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
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'recommendation') {
              // Keep recommendation results or return to wizard
            }
          }}
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
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
              onBack={() => setActiveTab('recommendation')}
            />
          )}

          {activeTab === 'regions' && (
            <RegionalInsights 
              lang={lang} 
              onBack={() => setActiveTab('recommendation')}
            />
          )}

          {activeTab === 'calculator' && (
            <ProfitCalculator 
              lang={lang} 
              onBack={() => setActiveTab('recommendation')}
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
