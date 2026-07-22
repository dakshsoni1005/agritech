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
import { recommendCrops, recommendCropsML } from './utils/recommendationEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState('en'); // Default to English
  const [recommendationResult, setRecommendationResult] = useState(null);
  const [selectedModalCrop, setSelectedModalCrop] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  
  // ML Model API loading/error state
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [pendingInputs, setPendingInputs] = useState(null);

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

  const handleWizardSubmit = async (inputs) => {
    setApiError(null);
    setRecommendationResult(null);
    if (inputs.mode === 'ml') {
      setIsLoading(true);
      setPendingInputs(inputs);
      try {
        const result = await recommendCropsML(inputs);
        setRecommendationResult(result);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        setApiError({
          message: lang === 'gu' 
            ? 'કનેક્શન નિષ્ફળ! પાયથોન ML API સર્વર ચાલુ નથી.' 
            : 'Connection Failed! The Python ML API server is not running.',
          details: err.message
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      const result = recommendCrops(inputs);
      setRecommendationResult(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFallbackToRules = () => {
    if (pendingInputs) {
      const fallbackInputs = { ...pendingInputs, mode: 'rules' };
      const result = recommendCrops(fallbackInputs);
      setRecommendationResult(result);
      setApiError(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetRecommendation = () => {
    setRecommendationResult(null);
    setApiError(null);
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
      className="min-h-screen text-[#3d251e] dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white antialiased transition-colors duration-300"
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
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="relative w-20 h-20 flex items-center justify-center mb-2">
                    {/* Glowing outer ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 dark:border-emerald-500/10 animate-ping"></div>
                    {/* Spinning border ring */}
                    <div className="w-16 h-16 border-4 border-emerald-600 dark:border-emerald-450 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-base font-extrabold text-slate-805 dark:text-slate-200">
                    {lang === 'gu' 
                      ? 'મશીન લર્નિંગ મોડલ પૂર્વાનુમાન મેળવી રહ્યું છે...' 
                      : 'Connecting to ML model server and predicting crop...'}
                  </p>
                  <p className="text-xs text-slate-400 font-bold max-w-sm text-center leading-relaxed">
                    {lang === 'gu'
                      ? 'જમીનના સૂક્ષ્મ પોષકતત્ત્વો (N-P-K), pH આંક અને હવામાન પરિબળોનું વિશ્લેષણ મોડલ દ્વારા ચાલુ છે.'
                      : 'Model is analyzing N-P-K ratio, pH level, and climatic variables for optimal recommendation.'}
                  </p>
                </div>
              )}

              {!isLoading && apiError && (
                <div className="relative bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-amber-200 dark:border-amber-900/50 rounded-[2.5rem] p-8 max-w-2xl mx-auto space-y-6 shadow-xl animate-scale-up">
                  <div className="flex items-start space-x-4">
                    <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 text-amber-500 shrink-0">
                      ⚠️
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                        {apiError.message}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                        {lang === 'gu'
                          ? 'કૃપા કરીને ખાતરી કરો કે તમારું પાયથોન બેકએન્ડ સર્વર http://localhost:5000 પર ચાલુ છે. તેને શરૂ કરવા માટે તમારા ટર્મિનલ/પાવરશેલમાં નીચેનો કમાન્ડ રન કરો:'
                          : 'Please ensure your Python backend server is running on http://localhost:5000. Run this command in your terminal/powershell to start it:'}
                      </p>
                      <code className="block bg-slate-950 text-emerald-450 p-4 rounded-2xl text-xs font-mono font-black mt-3 border border-slate-900 select-all cursor-pointer shadow-inner">
                        .venv\Scripts\python api\app.py
                      </code>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 justify-end pt-4.5 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      onClick={() => handleWizardSubmit(pendingInputs)}
                      className="px-6 py-3 rounded-2xl bg-[#0b3c2c] hover:bg-[#062017] dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 font-black text-xs tracking-wider uppercase cursor-pointer transition-all shadow-md active:scale-95"
                    >
                      {lang === 'gu' ? 'ફરીથી પ્રયાસ કરો (Retry)' : 'Retry'}
                    </button>
                    <button
                      onClick={handleFallbackToRules}
                      className="px-6 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-850 font-black text-xs tracking-wider uppercase cursor-pointer transition-all shadow-sm active:scale-95"
                    >
                      {lang === 'gu' ? 'રૂલ એન્જિન વાપરો (Use Rules)' : 'Use Rules Engine'}
                    </button>
                  </div>
                </div>
              )}

              {!isLoading && !apiError && !recommendationResult && (
                <RecommendationWizard
                  onSubmit={handleWizardSubmit}
                  lang={lang}
                />
              )}

              {!isLoading && !apiError && recommendationResult && (
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
