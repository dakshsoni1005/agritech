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
    <div className="space-y-10 max-w-6xl mx-auto animate-fade-in">
      
      {/* Premium Hero Section (30% secondary structural glass panel) */}
      <div className="bg-slate-900/70 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* Glow Details */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none select-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none select-none" />
 
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="flex items-center space-x-2.5">
            <span className="bg-emerald-500/10 backdrop-blur-md text-emerald-400 text-[10px] uppercase font-black tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-500/25">
              {lang === 'gu' ? 'ગુજરાત કૃષિ એઆઈ પ્લેટફોર્મ' : 'Gujarat Agro AI Platform'}
            </span>
          </div>
 
          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight sm:leading-none">
            {lang === 'gu' ? (
              <>
                એઆઈ તકનીક દ્વારા <span className="text-emerald-400">કૃષિ અને ખેડૂતોનું</span> સશક્તિકરણ
              </>
            ) : (
              <>
                Empowering <span className="text-emerald-400">Agriculture</span> with Smart AI Technology
              </>
            )}
          </h1>
 
          <p className="text-sm sm:text-base text-slate-300 font-semibold leading-relaxed max-w-2xl">
            {lang === 'gu'
              ? 'તમારી જમીનનો રિપોર્ટ અને પ્રદેશ પસંદ કરો, સ્માર્ટ પાક ભલામણો મેળવો, નફાની ગણતરી કરો અને તમામ મુખ્ય સરકારી યોજનાઓનો સીધો લાભ લો.'
              : 'Analyze soil variables, receive regional crop recommendations, calculate custom NPK fertilizer demands, and access official state subsidies.'}
          </p>
 
          <div className="pt-3 flex flex-wrap gap-4">
            {/* Primary CTA Sowing Wizard - Accent Color (10%) */}
            <button
              onClick={() => onNavigate('recommendation')}
              className="flex items-center space-x-2 px-6.5 py-4 rounded-2xl bg-emerald-550 hover:bg-emerald-500 text-white font-black text-sm tracking-wide shadow-lg shadow-emerald-500/20 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <span>{lang === 'gu' ? 'એઆઈ પાક સલાહ મેળવો' : 'Get AI Sowing Advice'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
 
            {/* Secondary CTA Database - Translucent Glass */}
            <button
              onClick={() => onNavigate('database')}
              className="flex items-center space-x-2 px-6.5 py-4 rounded-2xl bg-slate-950/60 backdrop-blur-md hover:bg-slate-950/80 border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-400 font-black text-sm tracking-wide transition-all duration-300 cursor-pointer shadow-md"
            >
              <span>{lang === 'gu' ? 'પાક માહિતી કોષ જુઓ' : 'Explore Crop Profiles'}</span>
            </button>
          </div>
        </div>
 
      </div>
 
      {/* Grid: Core Modules & Quick Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Main Services Grid */}
        <div className="lg:col-span-2 space-y-5">
          <h3 className="text-base sm:text-lg font-black text-slate-100 tracking-tight flex items-center space-x-2 px-1">
            <Sprout className="w-5 h-5 text-emerald-450" />
            <span>{lang === 'gu' ? 'કૃષિ સેવાઓ અને સાધનો' : 'Available Services & Advisors'}</span>
          </h3>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feat) => (
              <div
                key={feat.id}
                onClick={() => onNavigate(feat.id)}
                className="bg-slate-900/70 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 rounded-3xl p-6.5 shadow-lg hover:shadow-2xl hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-4.5">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-emerald-500/10 text-emerald-450 rounded-2xl border border-emerald-500/20 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/15 transition-all duration-300">
                      {feat.icon}
                    </div>
                    <span className="bg-slate-950/60 text-emerald-405 border border-white/10 text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full whitespace-nowrap">
                      {lang === 'gu' ? feat.badgeGu : feat.badgeEn}
                    </span>
                  </div>
 
                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-black text-slate-100 group-hover:text-emerald-400 transition-colors duration-300">
                      {lang === 'gu' ? feat.titleGu : feat.titleEn}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-semibold leading-relaxed">
                      {lang === 'gu' ? feat.descGu : feat.descEn}
                    </p>
                  </div>
                </div>
 
                {/* Arrow Go CTA - Glass Button Sub-element */}
                <div className="pt-4 mt-5 border-t border-white/5 text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center justify-between">
                  <span>{lang === 'gu' ? 'મોડ્યુલ ઓપન કરો' : 'Launch Module'}</span>
                  <div className="w-8 h-8 rounded-xl bg-slate-950/60 border border-white/5 group-hover:border-emerald-500/30 flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
 
        {/* Right 1 Col: Seasonal Farming Tips & Advisories */}
        <div className="space-y-5">
          <h3 className="text-base sm:text-lg font-black text-slate-100 tracking-tight flex items-center space-x-2 px-1">
            <CloudSun className="w-5 h-5 text-amber-500" />
            <span>{lang === 'gu' ? 'ચાલુ માસની કૃષિ સલાહ' : 'Monthly Crop Advisories'}</span>
          </h3>
 
          <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-5.5 shadow-lg space-y-4">
            
            {/* Header Tip badge */}
            <div className="flex items-center space-x-2.5 bg-slate-950/60 border border-white/10 p-3 rounded-2xl">
              <Award className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Farming Tip</span>
                <span className="text-xs font-black text-slate-100 block">October - November 2026</span>
              </div>
            </div>
 
            {/* List of Tips */}
            <div className="space-y-4 pt-2">
              {seasonalTips.map((tip, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-xs font-black text-slate-150 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{tip.title}</span>
                  </h4>
                  <p className="text-xs text-slate-350 font-medium leading-relaxed pl-3">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>
 
          </div>
        </div>
 
      </div>
    </div>
  );
}
