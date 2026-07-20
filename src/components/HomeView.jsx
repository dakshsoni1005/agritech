import React from 'react';
import { Sprout, Sparkles, Database, MapPin, Calculator, Link2, ArrowRight, CloudSun, Award } from 'lucide-react';

export default function HomeView({ lang, onNavigate }) {
  
  const features = [
    {
      id: 'recommendation',
      titleEn: 'AI Crop Recommendation',
      titleGu: 'એઆઈ પાક ભલામણ',
      descEn: 'Input your region, soil type, and weather metrics to find the absolute best crop matches for your farm.',
      descGu: 'તમારા જમીનનો પ્રકાર, પ્રદેશ અને હવામાન નાખીને તમારા ખેતર માટે સૌથી વધુ ફાયદાકારક પાકની ભલામણ મેળવો.',
      icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
      color: 'border-emerald-500/30 hover:border-emerald-500',
      badgeEn: 'Best AI Tool',
      badgeGu: 'ખાસ એઆઈ સાધન'
    },
    {
      id: 'database',
      titleEn: 'Crop Information Database',
      titleGu: 'સંપૂર્ણ પાક માહિતી કોષ',
      descEn: 'Explore 18-parameter technical specifications, seed rates, and pest solutions for all Gujarat crops.',
      descGu: 'ગુજરાતના તમામ મુખ્ય પાકોની ૧૮ તકનીકી વિગતો, બિયારણ દર, અને રોગ નિયંત્રણના અસલી નુસખાઓ શોધો.',
      icon: <Database className="w-6 h-6 text-emerald-500" />,
      color: 'border-slate-800 hover:border-emerald-500/60',
      badgeEn: '18 Parameters',
      badgeGu: '૧૮ પરામીટર્સ'
    },
    {
      id: 'regions',
      titleEn: 'Agro-Climatic Soil Guide',
      titleGu: 'પ્રાદેશિક જમીન માર્ગદર્શિકા',
      descEn: 'Understand Gujarat\'s 5 major climatic regions, soil compositions, and seasonal crop cycles.',
      descGu: 'ગુજરાતના ૫ પ્રમુખ હવામાન પ્રદેશો, જમીનની લાક્ષણિકતાઓ અને મોસમી પાકોના ચક્ર વિશે વિગતવાર જાણો.',
      icon: <MapPin className="w-6 h-6 text-emerald-500" />,
      color: 'border-slate-800 hover:border-emerald-500/60',
      badgeEn: 'Soil Mapping',
      badgeGu: 'જમીન નકશા'
    },
    {
      id: 'calculator',
      titleEn: 'Yield & Financial Calculator',
      titleGu: 'ખાતર & નફો અંદાજક',
      descEn: 'Calculate seed requirement, exact NPK fertilizer bags, total cultivation cost, and net income profit.',
      descGu: 'તમારા ખેતરના કદ મુજબ બિયારણ, એનપીકે ખાતરની થેલીઓ, અંદાજિત ખર્ચ અને ચોખ્ખા નફાની ગણતરી કરો.',
      icon: <Calculator className="w-6 h-6 text-emerald-500" />,
      color: 'border-slate-800 hover:border-emerald-500/60',
      badgeEn: 'Cost Estimator',
      badgeGu: 'નફા ગણતરી'
    },
    {
      id: 'gov',
      titleEn: 'Government Portals Directory',
      titleGu: 'સરકારી પોર્ટલ લિંક્સ',
      descEn: 'Direct links to official resources like i-Khedut, AnyROR land records, PM-Kisan, and weather reports.',
      descGu: 'આઇ-ખેડૂત સબસિડી, AnyROR ગામના ૭/૧૨ નકશા અને પીએમ-કિસાન હપ્તા ચેક કરવા માટેની સરકારી વેબસાઇટ્સ.',
      icon: <Link2 className="w-6 h-6 text-amber-500" />,
      color: 'border-slate-800 hover:border-emerald-500/60',
      badgeEn: 'Official Sites',
      badgeGu: 'સરકારી લિંક્સ'
    }
  ];

  const seasonalTips = lang === 'gu'
    ? [
        {
          title: 'શિયાળુ વાવણી (Rabi Sowing)',
          desc: 'નવેમ્બર મહિનો ઘઉં અને જીરાની વાવણી માટે ઉત્તમ સમય છે. વાવણી પહેલા જમીનમાં કંપોસ્ટ ખાતર નાખો.'
        },
        {
          title: 'ખાતર વ્યવસ્થાપન (NPK Ratio)',
          desc: 'ઘઉંમાં ૧૨૦:૬૦:૪૦ અને જીરામાં ૩૦:૨૦ ગુણોત્તરમાં નાઇટ્રોજન અને ફોસ્ફરસ આપવું. વધારે નાઇટ્રોજનથી બચવું.'
        },
        {
          title: 'પાક સંરક્ષણ (Pest Alerts)',
          desc: 'મગફળીમાં ટિક્કા રોગ અને કપાસમાં ગુલાબી ઈયળ માટે ફેરોમોન ટ્રેપ્સ લગાવો અથવા જરૂર મુજબ દવા છાંટો.'
        }
      ]
    : [
        {
          title: 'Rabi Sowing Window',
          desc: 'November is the peak sowing window for Wheat and Cumin. Ensure proper soil tilting before sowing.'
        },
        {
          title: 'NPK Fertilizer Ratios',
          desc: 'For Wheat, use 120:60:40 NPK kg/ha. For Cumin, stick to 30:20 and avoid excessive Nitrogen application.'
        },
        {
          title: 'Pest Protection Alerts',
          desc: 'Watch out for Tikka leaf spot in late groundnuts. Install pheromone traps for cotton Pink Bollworm.'
        }
      ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto animate-fade-in text-slate-900 dark:text-slate-100">
      
      {/* 1. Hero Content Section */}
      <div className="text-center space-y-6 pt-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-center space-x-1.5 text-emerald-600 dark:text-emerald-450 font-bold text-xs uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
          <span>Top Notch Agri-Tech Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-black dark:text-white">
          Bring Fresh Growth<br />To Agriculture.
        </h1>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl mx-auto">
          Experience the ultimate agricultural journey with expert tips, scientific advice, and customized soil insights.
        </p>

        <div className="pt-2">
          <button
            onClick={() => onNavigate('recommendation')}
            className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs tracking-wider uppercase hover:bg-black/90 dark:hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 shadow-md cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Premium Landscape Card (with overlays) */}
      <div className="relative rounded-[32px] overflow-hidden shadow-xl aspect-[16/10] sm:aspect-[21/9] border border-black/5 dark:border-white/5 group">
        <img 
          src="/cultivo_hero_bg.png" 
          alt="Lush Agricultural Hill Landscape" 
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        {/* Ambient Dark Gradient Bottom Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Left Bottom Overlay Text */}
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 text-white max-w-xs sm:max-w-md">
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            The Journey to a<br />Perfection.
          </h2>
        </div>

        {/* Right Bottom Overlay Link */}
        <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 text-white/90">
          <button 
            onClick={() => onNavigate('recommendation')}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black font-semibold text-xs tracking-wide transition-all cursor-pointer"
          >
            <span>Book a Sowing Advice</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 3. Stats Section (4 Columns with separator lines) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-black/5 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl px-6">
        <div className="text-center space-y-1.5 border-r border-black/5 dark:border-white/5 last:border-r-0">
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white">50+</div>
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Year Of Experience</div>
        </div>
        <div className="text-center space-y-1.5 md:border-r border-black/5 dark:border-white/5 last:border-r-0">
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white">200+</div>
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Field In Progress</div>
        </div>
        <div className="text-center space-y-1.5 border-r border-black/5 dark:border-white/5 last:border-r-0">
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white">120,000+</div>
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Farmer Around World</div>
        </div>
        <div className="text-center space-y-1.5">
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white">$15 Billion</div>
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Agricultural Product</div>
        </div>
      </div>

      {/* 4. bottom Section: Categories list & Inefficiency Statement */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
        {/* Left Column: Categories List */}
        <div className="md:col-span-4 space-y-6">
          <div className="text-2xl font-extrabold text-slate-400 dark:text-slate-600">2026</div>
          <div className="flex flex-col space-y-3.5 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <button onClick={() => onNavigate('database')} className="text-left hover:text-black dark:hover:text-white transition-colors cursor-pointer flex items-center space-x-2">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              <span>Organic farm</span>
            </button>
            <button onClick={() => onNavigate('regions')} className="text-left hover:text-black dark:hover:text-white transition-colors cursor-pointer flex items-center space-x-2">
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span>Automation farm</span>
            </button>
            <button onClick={() => onNavigate('calculator')} className="text-left hover:text-black dark:hover:text-white transition-colors cursor-pointer flex items-center space-x-2">
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span>Bio-medical farm</span>
            </button>
          </div>
        </div>

        {/* Right Column: Large Statement */}
        <div className="md:col-span-8">
          <p className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-800 dark:text-slate-200 leading-[1.25]">
            Despite Advances In Agri-Tech, Traditional Labor-Intensive Farming Highlights Ongoing Inefficiencies.
          </p>
        </div>
      </div>

      {/* 5. Integrated Services Drawer (So user can still access all interactive features from the redesigned home layout) */}
      <div className="pt-10 border-t border-black/5 dark:border-white/5 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Interactive Advisors & Tools
          </h3>
          <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
            Smart Features
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <div
              key={feat.id}
              onClick={() => onNavigate(feat.id)}
              className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-3xl p-6 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-black/5 dark:bg-white/5 text-slate-800 dark:text-white rounded-2xl">
                    {feat.icon}
                  </div>
                  <span className="bg-black/5 dark:bg-white/5 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-slate-500 dark:text-slate-400">
                    {lang === 'gu' ? feat.badgeGu : feat.badgeEn}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-base font-extrabold text-black dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {lang === 'gu' ? feat.titleGu : feat.titleEn}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {lang === 'gu' ? feat.descGu : feat.descEn}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/5 text-[9px] font-extrabold uppercase tracking-widest flex items-center justify-between text-slate-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                <span>Launch Advisor</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
