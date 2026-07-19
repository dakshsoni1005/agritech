import React, { useState } from 'react';
import Header from './components/Header';
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

  const handleWizardSubmit = (inputs) => {
    const result = recommendCrops(inputs);
    setRecommendationResult(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetRecommendation = () => {
    setRecommendationResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white antialiased">
      
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
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
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
          />
        )}

        {activeTab === 'regions' && (
          <RegionalInsights lang={lang} />
        )}

        {activeTab === 'calculator' && (
          <ProfitCalculator lang={lang} />
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
  );
}
