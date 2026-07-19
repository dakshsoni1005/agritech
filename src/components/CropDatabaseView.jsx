import React, { useState } from 'react';
import { CROP_DATABASE } from '../data/cropDatabase';
import { 
  Search, Sprout, ArrowUpRight, ArrowLeft, ChevronDown, ChevronUp, 
  Coins, GlassWater, Landmark, Leaf, Sparkles, Star, Tag, MapPin 
} from 'lucide-react';

// Structured static database of the requested Gujarat crops
const GUJARAT_MAJOR_CROPS = [
  {
    id: 'cash_oilseeds',
    titleEn: 'Cash Crops & Oilseeds',
    titleGu: 'રોકડિયા પાક અને તેલીબિયાં',
    descEn: 'Gujarat is India\'s leading producer of several commercial crops and oilseeds.',
    descGu: 'ગુજરાત તેલીબિયાં અને રોકડિયા પાકોના વાવેતર અને નિકાસમાં સમગ્ર ભારતમાં મોખરે છે.',
    icon: <Coins className="w-5 h-5 text-amber-500 shrink-0" />,
    colorClass: 'border-amber-500/30 hover:border-amber-500/50',
    crops: [
      {
        name: 'Cotton',
        nameGu: 'કપાસ',
        description: 'Primary commercial crop of Gujarat, majorly grown in rich black soils.',
        regions: 'Kanam Pradesh and Saurashtra',
        tags: ['Kharif', 'Cash Crop', 'Oilseed']
      },
      {
        name: 'Groundnut (Peanut)',
        nameGu: 'મગફળી',
        description: 'Major Kharif and Summer oilseed. Extensively cultivated in Saurashtra region.',
        regions: 'Saurashtra (Rajkot, Junagadh, Amreli)',
        tags: ['Kharif', 'Summer', 'Oilseed']
      },
      {
        name: 'Castor Seed',
        nameGu: 'દિવેલા',
        description: 'Gujarat is India\'s largest producer and a global leader in castor oil production.',
        regions: 'North Gujarat and Saurashtra',
        tags: ['Kharif', 'Cash Crop', 'Oilseed']
      },
      {
        name: 'Sesame (Til)',
        nameGu: 'તલ',
        description: 'Vibrant oilseed grown during multiple seasons including Kharif, Semi-Rabi, and Summer.',
        regions: 'Saurashtra and Kutch',
        tags: ['Kharif', 'Rabi', 'Summer', 'Oilseed']
      },
      {
        name: 'Mustard',
        nameGu: 'રાયડો',
        description: 'Major winter oilseed crop yielding high quality edible oil.',
        regions: 'North Gujarat (Banaskantha, Patan)',
        tags: ['Rabi', 'Oilseed']
      },
      {
        name: 'Sugarcane',
        nameGu: 'શેરડી',
        description: 'Cultivated in well-irrigated rich black soils with high sugar recovery.',
        regions: 'South Gujarat (Surat, Bardoli, Navsari)',
        tags: ['Cash Crop', 'Kharif']
      },
      {
        name: 'Tobacco',
        nameGu: 'તમાકુ',
        description: 'Commercial crop mainly grown in Charotar region with specific curing processes.',
        regions: 'Anand and Kheda districts (Charotar region)',
        tags: ['Cash Crop', 'Rabi']
      }
    ]
  },
  {
    id: 'food_grains',
    titleEn: 'Food Grains (Cereals & Millets)',
    titleGu: 'ધાન્ય પાકો (અનાજ અને કઠોળ)',
    descEn: 'Food grains form the staple diet across Gujarat.',
    descGu: 'ગુજરાતના આબોહવા અને જમીનને અનુકૂળ વિવિધ પ્રકારના ધાન્ય પાકો જે લોકોનો મુખ્ય ખોરાક છે.',
    icon: <Sprout className="w-5 h-5 text-emerald-500 shrink-0" />,
    colorClass: 'border-emerald-500/30 hover:border-emerald-500/50',
    crops: [
      {
        name: 'Wheat',
        nameGu: 'ઘઉં',
        description: 'Dominant Rabi cereal crop. Cultivated extensively under irrigated conditions.',
        regions: 'Ahmedabad (Bhal tract), Saurashtra, North Gujarat',
        tags: ['Rabi', 'Cereal']
      },
      {
        name: 'Paddy (Rice)',
        nameGu: 'ડાંગર',
        description: 'Requires high rainfall and canal irrigated soils for transplantation.',
        regions: 'South and Central Gujarat (Kheda, Anand, Surat)',
        tags: ['Kharif', 'Cereal']
      },
      {
        name: 'Bajra (Pearl Millet)',
        nameGu: 'બાજરી',
        description: 'Drought-resistant nutritious millet crop suitable for sandy and semi-arid soils.',
        regions: 'North Gujarat, Banaskantha, Kutch',
        tags: ['Kharif', 'Summer', 'Cereal']
      },
      {
        name: 'Maize (Corn)',
        nameGu: 'મકાઈ',
        description: 'Staple grain grown extensively across the hilly and tribal belts.',
        regions: 'Eastern Tribal Belt (Dahod, Panchmahal, Sabarkantha)',
        tags: ['Kharif', 'Cereal']
      },
      {
        name: 'Jowar (Sorghum)',
        nameGu: 'જુવાર',
        description: 'Grown for human food grains as well as nutritious green dairy fodder.',
        regions: 'Saurashtra and North Gujarat',
        tags: ['Kharif', 'Cereal']
      }
    ]
  },
  {
    id: 'pulses',
    titleEn: 'Pulses (Kathol)',
    titleGu: 'કઠોળ વર્ગ ના પાકો',
    descEn: 'Pulses are an important protein source in Gujarat.',
    descGu: 'જમીનની ફળદ્રુપતા વધારવા અને પ્રોટીનયુક્ત આહાર મેળવવા માટે વવાતા કઠોળ પાકો.',
    icon: <Leaf className="w-5 h-5 text-yellow-600 shrink-0" />,
    colorClass: 'border-yellow-650/30 hover:border-yellow-600/50',
    crops: [
      {
        name: 'Tur / Arhar (Pigeon Pea)',
        nameGu: 'તુવેર',
        description: 'Major Kharif pulse crop. Essential in daily Gujarati diets.',
        regions: 'Central and Vadodara regions',
        tags: ['Kharif', 'Pulse']
      },
      {
        name: 'Gram / Chana (Chickpea)',
        nameGu: 'ચણા',
        description: 'Major Rabi pulse crop. Highly responsive to residual winter moisture.',
        regions: 'Ahmedabad (Bhal), Saurashtra, Panchmahal',
        tags: ['Rabi', 'Pulse']
      },
      {
        name: 'Moong (Green Gram)',
        nameGu: 'મગ',
        description: 'Short duration crop grown during monsoon and summer seasons.',
        regions: 'Kutch, Saurashtra and Central Gujarat',
        tags: ['Kharif', 'Summer', 'Pulse']
      },
      {
        name: 'Urad (Black Gram)',
        nameGu: 'અડદ',
        description: 'Kharif pulse requiring moderate rainfall and well-drained soils.',
        regions: 'Central and South Gujarat',
        tags: ['Kharif', 'Pulse']
      },
      {
        name: 'Moth Bean',
        nameGu: 'મઠ',
        description: 'Highly drought-tolerant pulse cultivated in extremely arid sandy regions.',
        regions: 'Kutch and Banaskantha',
        tags: ['Kharif', 'Pulse']
      },
      {
        name: 'Cowpea',
        nameGu: 'ચોળા',
        description: 'Nutritious pulse suitable for dry climates with minimal irrigation.',
        regions: 'North Gujarat and Saurashtra',
        tags: ['Kharif', 'Pulse']
      }
    ]
  },
  {
    id: 'spices',
    titleEn: 'Spices & Condiments',
    titleGu: 'મસાલા પાકો (Seed Spices)',
    descEn: 'Gujarat is internationally known for seed spices and exports.',
    descGu: 'ગુજરાતના મસાલા પાકો તેની સુગંધ અને ઉચ્ચ ગુણવત્તા માટે વિશ્વભરમાં પ્રખ્યાત છે.',
    icon: <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />,
    colorClass: 'border-amber-650/30 hover:border-amber-600/50',
    crops: [
      {
        name: 'Cumin (Jeera)',
        nameGu: 'જીરું',
        description: 'Highly valuable winter spice crop requiring dry climates during maturity.',
        regions: 'North Gujarat and Saurashtra (Gondal, Unjha)',
        tags: ['Rabi', 'Spice']
      },
      {
        name: 'Fennel (Variyali)',
        nameGu: 'વરિયાળી',
        description: 'Gujarat leads nationally in fennel yield and aromatic oil content.',
        regions: 'North Gujarat (Mehsana, Patan)',
        tags: ['Rabi', 'Spice']
      },
      {
        name: 'Coriander (Dhana)',
        nameGu: 'ધાણા',
        description: 'Popular winter spice crop cultivated for seeds and green leaves.',
        regions: 'Saurashtra and Central Gujarat',
        tags: ['Rabi', 'Spice']
      },
      {
        name: 'Garlic',
        nameGu: 'લસણ',
        description: 'Major bulb spice crop cultivated commercially under irrigation.',
        regions: 'Saurashtra (Gondal, Rajkot)',
        tags: ['Rabi', 'Spice', 'Vegetable']
      },
      {
        name: 'Onion',
        nameGu: 'ડુંગળી',
        description: 'Cultivated for domestic use and dehydration processing units.',
        regions: 'Bhavnagar (Mahuva), Junagadh, Rajkot',
        tags: ['Rabi', 'Kharif', 'Spice', 'Vegetable']
      },
      {
        name: 'Fenugreek (Methi)',
        nameGu: 'મેથી',
        description: 'Nutritious winter spice crop grown for seed spices and leafy greens.',
        regions: 'North and Central Gujarat',
        tags: ['Rabi', 'Spice']
      },
      {
        name: 'Chillies',
        nameGu: 'મરચાં',
        description: 'Cultivated extensively across multiple climatic zones, yielding high pungency.',
        regions: 'Central and South Gujarat',
        tags: ['Kharif', 'Spice']
      }
    ]
  },
  {
    id: 'horticulture',
    titleEn: 'Horticulture (Fruits & Vegetables)',
    titleGu: 'બાગાયતી પાકો (ફળો અને શાકભાજી)',
    descEn: 'Gujarat produces high-quality fruits and vegetables for domestic consumption and export.',
    descGu: 'ગુજરાતના બાગાયતી પાકો જેવા કે કેસર કેરી અને ઉત્તમ ગુણવત્તાવાળા બટાકા સમગ્ર ભારતમાં મોખરે છે.',
    icon: <Leaf className="w-5 h-5 text-emerald-600 shrink-0" />,
    colorClass: 'border-emerald-600/30 hover:border-emerald-500/50',
    crops: [
      {
        name: 'Mango (Gir Kesar)',
        nameGu: 'કેરી (ગીર કેસર)',
        description: 'World-famous Gir Kesar mango from Junagadh and Alphonso varieties from South Gujarat.',
        regions: 'Junagadh (Talala), Valsad, Navsari',
        tags: ['Fruit', 'Summer']
      },
      {
        name: 'Banana',
        nameGu: 'કેળું',
        description: 'Grown under heavy irrigation and organic fertigation schedules.',
        regions: 'Central and South Gujarat (Anand, Bharuch, Surat)',
        tags: ['Fruit']
      },
      {
        name: 'Sapota (Chikoo)',
        nameGu: 'ચીકુ',
        description: 'Orchard fruit requiring tropical climates and clayey coastal soils.',
        regions: 'Valsad and Navsari (Gandevi)',
        tags: ['Fruit']
      },
      {
        name: 'Papaya',
        nameGu: 'પપૈયા',
        description: 'Fast-growing fruit crop yielding throughout the year under drip systems.',
        regions: 'Central Gujarat',
        tags: ['Fruit']
      },
      {
        name: 'Pomegranate',
        nameGu: 'દાડમ',
        description: 'Cultivated in arid regions using modern micro-irrigation systems.',
        regions: 'Kutch and Banaskantha',
        tags: ['Fruit']
      },
      {
        name: 'Citrus Fruits',
        nameGu: 'લીંબુ / ખાટા ફળો',
        description: 'Commercial cultivation of high acid lemons and acid limes.',
        regions: 'Mehsana and Anand',
        tags: ['Fruit']
      },
      {
        name: 'Potato',
        nameGu: 'બટાટા',
        description: 'Banaskantha (Deesa) is India\'s leading processing potato cultivation district.',
        regions: 'Banaskantha (Deesa), Sabarkantha',
        tags: ['Vegetable', 'Rabi']
      },
      {
        name: 'Tomato',
        nameGu: 'ટમેટા',
        description: 'Popular vegetable crop cultivated across both monsoon and winter cycles.',
        regions: 'Gandhinagar, Kheda, Anand',
        tags: ['Vegetable', 'Rabi', 'Kharif']
      },
      {
        name: 'Brinjal (Eggplant)',
        nameGu: 'રીંગણ',
        description: 'Cultivated in almost all soil conditions throughout the year.',
        regions: 'Central Gujarat',
        tags: ['Vegetable']
      },
      {
        name: 'Okra (Bhindi)',
        nameGu: 'ભીંડા',
        description: 'Cultivated in summer and monsoon seasons, highly demanded in retail markets.',
        regions: 'South Gujarat and Kheda',
        tags: ['Vegetable', 'Summer', 'Kharif']
      }
    ]
  },
  {
    id: 'medicinal_industrial',
    titleEn: 'Medicinal & Industrial Crops',
    titleGu: 'ઔષધીય અને ઔદ્યોગિક પાકો',
    descEn: 'These crops have high pharmaceutical value and industrial gum applications.',
    descGu: 'વિશ્વ બજારમાં ફાર્માસ્યુટિકલ અને ગુંદર ઉદ્યોગો માટે નિકાસ થતા વિશિષ્ટ પાકો.',
    icon: <Landmark className="w-5 h-5 text-amber-500 shrink-0" />,
    colorClass: 'border-amber-500/30 hover:border-amber-500/50',
    crops: [
      {
        name: 'Isabgul (Psyllium Husk)',
        nameGu: 'ઈસબગુલ',
        description: 'Gujarat is the leading global exporter of high-grade Psyllium husk.',
        regions: 'North Gujarat (Mehsana, Patan)',
        tags: ['Medicinal', 'Rabi']
      },
      {
        name: 'Guar Seed',
        nameGu: 'ગુવાર બીજ',
        description: 'Guar gum extracted is used extensively in textile, pharmaceutical, and oil drilling.',
        regions: 'Kutch and Banaskantha',
        tags: ['Cash Crop', 'Industrial', 'Kharif']
      }
    ]
  },
  {
    id: 'floriculture',
    titleEn: 'Floriculture',
    titleGu: 'ફૂલોની ખેતી',
    descEn: 'Commercial flower farming is growing rapidly across Gujarat.',
    descGu: 'તહેવારો, પૂજા અને કમર્શિયલ ડેકોરેશન માટે ફૂલોની અદ્યતન ખેતી.',
    icon: <Star className="w-5 h-5 text-yellow-500 shrink-0" />,
    colorClass: 'border-yellow-500/30 hover:border-yellow-500/50',
    crops: [
      {
        name: 'Marigold',
        nameGu: 'ગલગોટા (હજારી ગલ)',
        description: 'Widely cultivated flower crop used for festive, religious and decorative purposes.',
        regions: 'Central and South Gujarat (Anand, Navsari)',
        tags: ['Floriculture', 'Kharif', 'Rabi']
      }
    ]
  }
];

export default function CropDatabaseView({ onSelectCrop, lang, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({
    cash_oilseeds: true, // Default open the first category
  });

  const toggleCategory = (catId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  // Safe callback mapping to trigger detailed 18-parameter modal
  const handleCropClick = (cropName) => {
    // Attempt to match the exact name in CROP_DATABASE to load NPK & chemical stats
    const matchedCrop = CROP_DATABASE.find(
      (c) => c.cropName.toLowerCase() === cropName.toLowerCase() || 
             c.cropName.toLowerCase().includes(cropName.toLowerCase()) ||
             cropName.toLowerCase().includes(c.cropName.toLowerCase())
    );

    if (matchedCrop) {
      onSelectCrop(matchedCrop);
    } else {
      // Fallback object so modal doesn't crash on floriculture/medicinal crops
      const fallbackCrop = {
        cropName: cropName,
        gujaratiName: cropName,
        category: 'Specialty Crop',
        suitableSoilTypes: ['Loamy', 'Silty Loam'],
        suitableRegions: ['Central Gujarat', 'North Gujarat'],
        averageYield: 'Moderate',
        estimatedProfitRange: 'High Margin',
        imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80',
        nitrogenReq: 'Medium',
        phosphorusReq: 'Medium',
        potashReq: 'High',
        seedRate: 'Varies',
        irrigationCycles: '5-6 Cycles',
        commonPests: 'Aphids, Whiteflies',
        organicPractices: 'Add FYM organic compost at soil preparation.'
      };
      onSelectCrop(fallbackCrop);
    }
  };

  // Flattened crop search list
  const getSearchMatches = () => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    
    let matches = [];
    GUJARAT_MAJOR_CROPS.forEach((category) => {
      category.crops.forEach((crop) => {
        if (
          crop.name.toLowerCase().includes(query) ||
          crop.nameGu.toLowerCase().includes(query) ||
          crop.description.toLowerCase().includes(query) ||
          crop.tags.some(t => t.toLowerCase().includes(query)) ||
          crop.regions.toLowerCase().includes(query)
        ) {
          matches.push({ ...crop, categoryId: category.id, categoryName: category.titleEn });
        }
      });
    });
    return matches;
  };

  const matches = getSearchMatches();
  const isSearching = searchQuery.length > 0;

  // Custom season badge renderer
  const renderTagBadge = (tag) => {
    let style = 'bg-slate-900 text-slate-350 border-slate-850';
    if (tag === 'Kharif') style = 'bg-emerald-950/40 text-emerald-450 border-emerald-500/20';
    if (tag === 'Rabi') style = 'bg-amber-950/40 text-amber-450 border-amber-500/20';
    if (tag === 'Summer') style = 'bg-orange-955/40 text-orange-450 border-orange-500/20';

    return (
      <span key={tag} className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border ${style}`}>
        {tag}
      </span>
    );
  };

  const getCropImage = (cropName) => {
    const matched = CROP_DATABASE.find(
      (c) => c.cropName.toLowerCase() === cropName.toLowerCase() || 
             c.cropName.toLowerCase().includes(cropName.toLowerCase()) ||
             cropName.toLowerCase().includes(c.cropName.toLowerCase())
    );
    return matched ? matched.imageUrl : 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80';
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in select-none">
      
      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-emerald-500 transition-all duration-300 font-extrabold text-xs tracking-wider uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-500" />
          <span>{lang === 'gu' ? 'મુખ્ય પેજ (Home)' : 'Home'}</span>
        </button>
      </div>

      {/* Header Introduction Card & Compact Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-md border border-slate-805/80 rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight flex items-center space-x-2">
            <span>{lang === 'gu' ? 'ગુજરાતના મુખ્ય પાકો' : 'Major Crops of Gujarat'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-semibold leading-relaxed max-w-xl">
            {lang === 'gu'
              ? 'ગુજરાતના વિવિધ કૃષિ-હવામાન ઝોનના અતિ મહત્વના રોકડિયા, તેલીબિયાં, અનાજ અને બાગાયતી પાકોનો ડેટાબેઝ.'
              : 'Complete database of cash, grain, pulse, spice, and horticulture crops across Gujarat.'}
          </p>
        </div>

        {/* Compact Professional Search Input (60:30:10 rule) */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="w-4.5 h-4.5 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'gu' ? 'પાકનું નામ અથવા ઋતુ સર્ચ કરો...' : 'Search crop by name, season...'}
            className="w-full bg-slate-955 border border-slate-850 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300 shadow-inner"
          />
        </div>
      </div>

      {/* RENDER VIEW A: Search active (live grid search results) */}
      {isSearching && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-black text-slate-455 uppercase tracking-wider">
              {lang === 'gu' ? 'શોધ પરિણામો' : 'Search Results Matches'}
            </span>
            <span className="text-xs font-black text-emerald-500 bg-slate-950 border border-slate-850 px-3 py-1 rounded-xl">
              {matches.length} {lang === 'gu' ? 'પાક મળ્યા' : 'Crops Match'}
            </span>
          </div>

          {matches.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-16 text-center text-slate-400 space-y-4 shadow-xl">
              <Sprout className="w-14 h-14 text-slate-700 mx-auto animate-pulse" />
              <h4 className="text-base font-black text-slate-205">{lang === 'gu' ? 'કોઈ પરિણામ મળ્યા નથી' : 'No Matching Crops Found'}</h4>
              <p className="text-xs text-slate-500 font-bold">{lang === 'gu' ? 'તમારા સ્પેલિંગ અથવા સર્ચ ટેગ્સ તપાસો.' : 'Refine your query terms and check spelling.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((crop) => {
                const cropImage = getCropImage(crop.name);
                return (
                  <div
                    key={crop.name}
                    onClick={() => handleCropClick(crop.name)}
                    className="bg-slate-900/60 border border-slate-850/60 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="relative h-32 w-full overflow-hidden">
                      <img
                        src={cropImage}
                        alt={crop.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-black text-slate-100 text-base leading-tight">
                            {crop.name} <span className="text-amber-500 font-bold text-sm">({crop.nameGu})</span>
                          </h4>
                          <span className="text-[8px] bg-slate-955 border border-slate-850 px-2 py-0.5 rounded text-slate-455 font-bold uppercase tracking-wider shrink-0">
                            {crop.categoryName}
                          </span>
                        </div>
                        <p className="text-xs text-slate-350 leading-relaxed font-semibold line-clamp-2">
                          {crop.description}
                        </p>
                      </div>
                      <div className="space-y-3 pt-3 border-t border-slate-855/60">
                        <div className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{crop.regions}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {crop.tags.map(t => renderTagBadge(t))}
                        </div>
                        <div className="text-[10px] font-black text-emerald-500 group-hover:text-emerald-400 flex items-center justify-between mt-1">
                          <span className="uppercase tracking-wider">{lang === 'gu' ? '૧૮ વિગતવાર ગણતરી જુઓ' : 'View Advisory Specs'}</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* RENDER VIEW B: Normal view (7-category expandable accordion menu) */}
      {!isSearching && (
        <div className="space-y-5">
          {GUJARAT_MAJOR_CROPS.map((cat) => {
            const isOpen = !!expandedCategories[cat.id];
            
            return (
              <div 
                key={cat.id} 
                className={`bg-slate-900/60 border rounded-3xl overflow-hidden transition-all duration-300 shadow-xl ${
                  isOpen ? 'border-emerald-500/30' : 'border-slate-855'
                }`}
              >
                
                {/* Category Header Card */}
                <div 
                  onClick={() => toggleCategory(cat.id)}
                  className="p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-slate-850/50 transition-colors select-none"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-950/60 border border-slate-850 flex items-center justify-center shadow-md">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-101 tracking-tight flex items-center space-x-2">
                        <span>{lang === 'gu' ? cat.titleGu : cat.titleEn}</span>
                      </h3>
                      <span className="hidden sm:block text-[10px] text-slate-455 font-bold mt-0.5">
                        {lang === 'gu' ? cat.descGu : cat.descEn}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] bg-slate-950 border border-slate-850 px-2.5 py-1 rounded-xl text-emerald-500 font-black uppercase tracking-wider">
                      {cat.crops.length} {lang === 'gu' ? 'પાકો' : 'Crops'}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Collapsible Accordion Content */}
                {isOpen && (
                  <div className="p-5 sm:p-6 border-t border-slate-855/80 bg-slate-955/20 animate-slide-down space-y-4">
                    
                    {/* Compact description for mobile views */}
                    <p className="sm:hidden text-xs text-slate-400 font-semibold leading-relaxed">
                      {lang === 'gu' ? cat.descGu : cat.descEn}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cat.crops.map((crop) => {
                        const cropImage = getCropImage(crop.name);
                        return (
                          <div
                            key={crop.name}
                            onClick={() => handleCropClick(crop.name)}
                            className="bg-slate-900/60 border border-slate-855 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                          >
                            <div className="relative h-32 w-full overflow-hidden">
                              <img
                                src={cropImage}
                                alt={crop.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-955/40 to-transparent" />
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                              <div className="space-y-2">
                                <h4 className="font-black text-slate-100 text-base leading-tight">
                                  {crop.name} <span className="text-amber-500 font-bold text-sm">({crop.nameGu})</span>
                                </h4>
                                <p className="text-xs text-slate-350 leading-relaxed font-semibold line-clamp-2">
                                  {crop.description}
                                </p>
                              </div>
                              <div className="space-y-3 pt-3 border-t border-slate-855/60">
                                <div className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-300">
                                  <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  <span className="truncate">{crop.regions}</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {crop.tags.map(t => renderTagBadge(t))}
                                </div>
                                <div className="text-[10px] font-black text-emerald-500 group-hover:text-emerald-400 flex items-center justify-between mt-1">
                                  <span className="uppercase tracking-wider">{lang === 'gu' ? '૧૮ વિગતવાર ગણતરી જુઓ' : 'View Advisory Specs'}</span>
                                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
