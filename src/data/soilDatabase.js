// Gujarat Soil Intelligence Database
// Color Codes Mapping for UI Legends:
// Black Soil -> '#1e293b' (Dark Slate)
// Alluvial Soil -> '#eab308' (Amber/Yellow)
// Red Soil -> '#ef4444' (Red)
// Sandy Soil -> '#b45309' (Light Brown)
// Clay Soil -> '#78350f' (Coffee Brown)
// Saline Soil -> '#8b5cf6' (Purple)

export const SOIL_TYPES = {
  black: { nameEn: 'Black Soil', nameGu: 'કાળી જમીન', color: '#1e293b', desc: 'Deep clayey soil, rich in calcium and potash, high water retention. Excellent for cotton and groundnuts.' },
  alluvial: { nameEn: 'Alluvial Soil', nameGu: 'ગોરાડુ / કાંપની જમીન', color: '#eab308', desc: 'Highly fertile river basin deposits. Perfect for cereals, vegetables, and cash crops.' },
  red: { nameEn: 'Red Soil', nameGu: 'રાતી જમીન', color: '#ef4444', desc: 'Formed from crystalline rocks, rich in iron oxide. Good for horticulture, pulses, and mangoes.' },
  sandy: { nameEn: 'Sandy Soil', nameGu: 'રેતાળ જમીન', color: '#b45309', desc: 'Loose coarse texture, high aeration but low water holding capacity. Ideal for potatoes and castor.' },
  clay: { nameEn: 'Clay Soil', nameGu: 'ચીકણી જમીન', color: '#78350f', desc: 'Fine particles, high nutrients, tends to become waterlogged. Suitable for paddy and wheat.' },
  saline: { nameEn: 'Saline Soil', nameGu: 'ખારાશવાળી જમીન', color: '#8b5cf6', desc: 'Contains high soluble salts due to coastal proximity or dry climate. Best for date palm and tolerant grasses.' }
};

export const DISTRICTS_SOIL_DATA = [
  {
    id: 'kachchh',
    name: 'Kachchh',
    nameGu: 'કચ્છ',
    x: 8,
    y: 18,
    color: '#8b5cf6', // Saline Soil predominant
    dominantSoil: 'saline',
    talukas: [
      {
        name: 'Bhuj',
        nameGu: 'ભુજ',
        soilType: 'sandy',
        pH: '7.8 - 8.4',
        fertility: 'Low to Medium',
        crops: 'Castor, Bajra, Guar, Fennel',
        nutrientN: 'Low (110 kg/ha)',
        nutrientP: 'Medium (22 kg/ha)',
        nutrientK: 'High (320 kg/ha)',
        waterRetention: 'Low (Needs organic manure additions)',
        drainage: 'Well-drained sandy loam',
        recommendedCrops: 'Castor, Bajra, Mustard, Cumin',
        practices: 'Use plastic mulching to conserve moisture. Apply organic compost.',
        irrigation: 'Drip irrigation with low-salinity water at critical stages.',
        fertilizer: 'Apply nitrogen in 3 split doses. Inoculate with Azotobacter.'
      },
      {
        name: 'Mundra',
        nameGu: 'મુંદ્રા',
        soilType: 'saline',
        pH: '8.2 - 8.8',
        fertility: 'Low',
        crops: 'Date Palm, Chikoo, Coconut',
        nutrientN: 'Very Low (90 kg/ha)',
        nutrientP: 'Low (12 kg/ha)',
        nutrientK: 'Medium (200 kg/ha)',
        waterRetention: 'Medium (Coastal salt marshes nearby)',
        drainage: 'Poor to moderate drainage',
        recommendedCrops: 'Date Palm (Barhee), Saline-tolerant grasses, Coconut',
        practices: 'Gypsum application to neutralize salinity. Create deep drainage channels.',
        irrigation: 'Frequent light irrigations. Drip is highly recommended to leach salts.',
        fertilizer: 'Apply extra Potassium to counter Sodium toxicity.'
      }
    ]
  },
  {
    id: 'banaskantha',
    name: 'Banaskantha',
    nameGu: 'બનાસકાંઠા',
    x: 40,
    y: 6,
    color: '#b45309', // Sandy Soil predominant
    dominantSoil: 'sandy',
    talukas: [
      {
        name: 'Deesa',
        nameGu: 'ડીસા',
        soilType: 'sandy',
        pH: '7.2 - 7.9',
        fertility: 'Medium',
        crops: 'Potato, Groundnut, Bajra, Fennel',
        nutrientN: 'Medium (150 kg/ha)',
        nutrientP: 'Low (18 kg/ha)',
        nutrientK: 'High (310 kg/ha)',
        waterRetention: 'Low (Loose sandy texture)',
        drainage: 'Excessively-drained sandy loam',
        recommendedCrops: 'Potato, Mustard, Summer Bajra, Castor',
        practices: 'Incorporate farmyard manure (FYM) to improve water holding. Deep sowing.',
        irrigation: 'Frequent light furrow or sprinkler irrigation every 7-10 days.',
        fertilizer: 'Apply 220 kg Nitrogen per hectare, split into 3 doses. Add sulfur.'
      },
      {
        name: 'Palanpur',
        nameGu: 'પાલનપુર',
        soilType: 'alluvial',
        pH: '7.0 - 7.6',
        fertility: 'High',
        crops: 'Wheat, Mustard, Castor, Vegetables',
        nutrientN: 'Medium (190 kg/ha)',
        nutrientP: 'Medium (28 kg/ha)',
        nutrientK: 'High (340 kg/ha)',
        waterRetention: 'Medium-High',
        drainage: 'Well-drained loam',
        recommendedCrops: 'Wheat, Mustard, Castor, Groundnut',
        practices: 'Crop rotation with pulses to restore nitrogen levels.',
        irrigation: 'Irrigate at 5 critical growth stages (crown root initiation in wheat).',
        fertilizer: 'Apply NPK in 120:60:40 ratio. Supplement with zinc sulfate.'
      }
    ]
  },
  {
    id: 'patan',
    name: 'Patan',
    nameGu: 'પાટણ',
    x: 32,
    y: 14,
    color: '#b45309',
    dominantSoil: 'sandy',
    talukas: [
      {
        name: 'Patan',
        nameGu: 'પાટણ',
        soilType: 'sandy',
        pH: '7.5 - 8.2',
        fertility: 'Medium',
        crops: 'Cumin, Castor, Bajra, Mustard',
        nutrientN: 'Low (120 kg/ha)',
        nutrientP: 'Medium (20 kg/ha)',
        nutrientK: 'High (290 kg/ha)',
        waterRetention: 'Low to Medium',
        drainage: 'Well-drained loamy sand',
        recommendedCrops: 'Cumin, Castor, Mustard, Fennel',
        practices: 'Use line sowing. Treat seeds with Trichoderma to avoid wilt.',
        irrigation: 'Requires light sprinkler irrigation. Avoid water logging in cumin.',
        fertilizer: 'Apply organic neem cake + NPK.'
      }
    ]
  },
  {
    id: 'sabarkantha',
    name: 'Sabarkantha',
    nameGu: 'સાબરકાંઠા',
    x: 52,
    y: 12,
    color: '#ef4444', // Red Soil predominant
    dominantSoil: 'red',
    talukas: [
      {
        name: 'Himatnagar',
        nameGu: 'હિંમતનગર',
        soilType: 'red',
        pH: '6.2 - 6.9',
        fertility: 'Medium',
        crops: 'Groundnut, Wheat, Maize, Cotton',
        nutrientN: 'Medium (180 kg/ha)',
        nutrientP: 'Low (15 kg/ha)',
        nutrientK: 'Medium (240 kg/ha)',
        waterRetention: 'Medium',
        drainage: 'Well-drained red gravelly loam',
        recommendedCrops: 'Groundnut, Maize, Pulses, Mangoes',
        practices: 'Apply lime to correct slight acidity. Prevent soil erosion on slopes.',
        irrigation: 'Supplemental irrigation during critical dry spells.',
        fertilizer: 'Apply extra Single Super Phosphate (SSP) to correct Phosphorus deficiency.'
      }
    ]
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    nameGu: 'અમદાવાદ',
    x: 42,
    y: 35,
    color: '#eab308', // Alluvial Soil
    dominantSoil: 'alluvial',
    talukas: [
      {
        name: 'Dhandhuka',
        nameGu: 'ધંધુકા',
        soilType: 'black',
        pH: '7.8 - 8.3',
        fertility: 'High',
        crops: 'Bhalia Wheat, Cotton, Gram',
        nutrientN: 'Medium (170 kg/ha)',
        nutrientP: 'Medium (25 kg/ha)',
        nutrientK: 'High (380 kg/ha)',
        waterRetention: 'High (Clay-rich black soil of Bhal tract)',
        drainage: 'Slow drainage',
        recommendedCrops: 'Bhalia Wheat (rainfed), Cotton, Chickpea',
        practices: 'Conserve moisture by harrowing. Grow rainfed wheat on residual soil moisture.',
        irrigation: 'Minimal irrigation needed. Avoid over-watering.',
        fertilizer: 'Rhizobium seed culture inoculation for Gram.'
      },
      {
        name: 'Sanand',
        nameGu: 'સાણંદ',
        soilType: 'alluvial',
        pH: '7.2 - 7.8',
        fertility: 'High',
        crops: 'Paddy, Wheat, Castor',
        nutrientN: 'High (210 kg/ha)',
        nutrientP: 'Medium (30 kg/ha)',
        nutrientK: 'High (330 kg/ha)',
        waterRetention: 'Medium-High',
        drainage: 'Moderately-drained clay loam',
        recommendedCrops: 'Paddy, Wheat, Vegetables',
        practices: 'Incorporate rice residues. Practice organic composting.',
        irrigation: 'Continuous standing water for paddy during early tillering.',
        fertilizer: 'Apply balanced NPK + Zinc Sulfate (25 kg/ha) for paddy.'
      }
    ]
  },
  {
    id: 'gandhinagar',
    name: 'Gandhinagar',
    nameGu: 'ગાંધીનગર',
    x: 48,
    y: 25,
    color: '#eab308',
    dominantSoil: 'alluvial',
    talukas: [
      {
        name: 'Dehgam',
        nameGu: 'દહેગામ',
        soilType: 'alluvial',
        pH: '7.1 - 7.7',
        fertility: 'High',
        crops: 'Wheat, Paddy, Potato, Bajra',
        nutrientN: 'High (220 kg/ha)',
        nutrientP: 'Medium (32 kg/ha)',
        nutrientK: 'High (350 kg/ha)',
        waterRetention: 'High',
        drainage: 'Well-drained silty loam',
        recommendedCrops: 'Wheat, Summer Bajra, Fennel, Vegetables',
        practices: 'Use vermicompost. Crop rotation to maintain soil structure.',
        irrigation: 'Regular check-basin or sprinkler irrigation.',
        fertilizer: 'Standard NPK (120:60:40) with micro-nutrients.'
      }
    ]
  },
  {
    id: 'kheda',
    name: 'Kheda',
    nameGu: 'ખેડા',
    x: 50,
    y: 35,
    color: '#eab308',
    dominantSoil: 'alluvial',
    talukas: [
      {
        name: 'Nadiad',
        nameGu: 'નડિયાદ',
        soilType: 'alluvial',
        pH: '7.0 - 7.6',
        fertility: 'Very High',
        crops: 'Tobacco, Paddy, Wheat, Fennel',
        nutrientN: 'High (230 kg/ha)',
        nutrientP: 'High (40 kg/ha)',
        nutrientK: 'High (360 kg/ha)',
        waterRetention: 'High (Rich Goradu soil)',
        drainage: 'Well-drained deep alluvial loam',
        recommendedCrops: 'Fennel, Paddy, Wheat, Tobacco',
        practices: 'Practice green manuring (dhaincha) before rice transplanting.',
        irrigation: 'Ensure timely water channels during crop growth stages.',
        fertilizer: 'Add compost + Nitrogen split doses.'
      }
    ]
  },
  {
    id: 'anand',
    name: 'Anand',
    nameGu: 'આણંદ',
    x: 52,
    y: 42,
    color: '#eab308',
    dominantSoil: 'alluvial',
    talukas: [
      {
        name: 'Anand',
        nameGu: 'આણંદ',
        soilType: 'alluvial',
        pH: '7.2 - 7.7',
        fertility: 'Very High',
        crops: 'Paddy, Wheat, Banana, Vegetables',
        nutrientN: 'High (240 kg/ha)',
        nutrientP: 'High (45 kg/ha)',
        nutrientK: 'High (380 kg/ha)',
        waterRetention: 'High',
        drainage: 'Well-drained deep silty loam',
        recommendedCrops: 'Banana, Paddy, Wheat, Mustard',
        practices: 'Use crop cover mulches for banana plantations.',
        irrigation: 'Drip system for banana; flood basin for paddy.',
        fertilizer: 'Apply organic compost + potash for banana sugar quality.'
      }
    ]
  },
  {
    id: 'vadodara',
    name: 'Vadodara',
    nameGu: 'વડોદરા',
    x: 60,
    y: 45,
    color: '#1e293b', // Black Soil Predominant
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Karjan',
        nameGu: 'કરજણ',
        soilType: 'black',
        pH: '7.6 - 8.2',
        fertility: 'High',
        crops: 'Cotton, Pigeon Pea (Tuver), Wheat',
        nutrientN: 'Medium (180 kg/ha)',
        nutrientP: 'Medium (26 kg/ha)',
        nutrientK: 'High (390 kg/ha)',
        waterRetention: 'Very High (Deep black cotton soil)',
        drainage: 'Slowly-drained clay',
        recommendedCrops: 'Bt Cotton, Pigeon Pea, Sugarcane',
        practices: 'Implement deep plowing in summer. Intercropping Tuver with Cotton.',
        irrigation: 'Avoid heavy flood irrigation. Use drip system to prevent root rot.',
        fertilizer: 'Apply NPK (160:80:80). Supplement with sulfur.'
      }
    ]
  },
  {
    id: 'bharuch',
    name: 'Bharuch',
    nameGu: 'ભરૂચ',
    x: 52,
    y: 56,
    color: '#1e293b',
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Jambusar',
        nameGu: 'જંબુસર',
        soilType: 'black',
        pH: '7.8 - 8.4',
        fertility: 'High',
        crops: 'Cotton, Wheat, Gram',
        nutrientN: 'Medium (160 kg/ha)',
        nutrientP: 'Medium (22 kg/ha)',
        nutrientK: 'High (360 kg/ha)',
        waterRetention: 'High',
        drainage: 'Moderately slow drainage',
        recommendedCrops: 'Cotton, Gram, Sorghum',
        practices: 'Practice crop rotation with pulses to maintain soil health.',
        irrigation: 'Furrow irrigation. Drip is highly effective.',
        fertilizer: 'Apply Nitrogen in splits + Zinc sulfate.'
      }
    ]
  },
  {
    id: 'surat',
    name: 'Surat',
    nameGu: 'સુરત',
    x: 50,
    y: 66,
    color: '#1e293b',
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Bardoli',
        nameGu: 'બારડોલી',
        soilType: 'black',
        pH: '7.4 - 8.0',
        fertility: 'Very High',
        crops: 'Sugarcane, Paddy, Banana',
        nutrientN: 'High (240 kg/ha)',
        nutrientP: 'High (38 kg/ha)',
        nutrientK: 'High (400 kg/ha)',
        waterRetention: 'Very High (Heavy black soils of Tapi basin)',
        drainage: 'Slow drainage',
        recommendedCrops: 'Sugarcane, Paddy, Banana',
        practices: 'Use green manuring. Practice trash mulching in sugarcane.',
        irrigation: 'Frequent high-volume furrow irrigations or drip channels.',
        fertilizer: 'Apply NPK (250:125:125) for high sugarcane tonnage.'
      }
    ]
  },
  {
    id: 'navsari',
    name: 'Navsari',
    nameGu: 'નવસારી',
    x: 48,
    y: 75,
    color: '#78350f', // Clay Soil predominant
    dominantSoil: 'clay',
    talukas: [
      {
        name: 'Gandevi',
        nameGu: 'ગણદેવી',
        soilType: 'clay',
        pH: '6.8 - 7.5',
        fertility: 'High',
        crops: 'Mango, Chikoo, Sugarcane, Paddy',
        nutrientN: 'Medium (190 kg/ha)',
        nutrientP: 'Medium (28 kg/ha)',
        nutrientK: 'High (350 kg/ha)',
        waterRetention: 'High (Heavy alluvial clay)',
        drainage: 'Moderate drainage',
        recommendedCrops: 'Kesar Mango, Chikoo, Paddy',
        practices: 'Regular organic composting. Prune mango trees annually.',
        irrigation: 'Micro-sprinklers for orchards; submergence for paddy.',
        fertilizer: 'Apply 1.5 kg N, 0.75 kg P, 1.5 kg K per bearing mango tree annually.'
      }
    ]
  },
  {
    id: 'valsad',
    name: 'Valsad',
    nameGu: 'વલસાડ',
    x: 46,
    y: 84,
    color: '#78350f',
    dominantSoil: 'clay',
    talukas: [
      {
        name: 'Valsad',
        nameGu: 'વલસાડ',
        soilType: 'clay',
        pH: '6.5 - 7.2',
        fertility: 'High',
        crops: 'Alphonso Mango, Paddy, Sugarcane',
        nutrientN: 'Medium (170 kg/ha)',
        nutrientP: 'Medium (24 kg/ha)',
        nutrientK: 'High (380 kg/ha)',
        waterRetention: 'High',
        drainage: 'Moderate to slow drainage',
        recommendedCrops: 'Mango, Paddy, Chikoo',
        practices: 'Use crop ring basins. Apply organic mulches.',
        irrigation: 'Drip system for orchards.'
      }
    ]
  },
  {
    id: 'surendranagar',
    name: 'Surendranagar',
    nameGu: 'સુરેન્દ્રનગર',
    x: 24,
    y: 30,
    color: '#1e293b',
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Wadhwan',
        nameGu: 'વઢવાણ',
        soilType: 'black',
        pH: '7.5 - 8.2',
        fertility: 'Medium',
        crops: 'Cotton, Sesame, Bajra',
        nutrientN: 'Medium (140 kg/ha)',
        nutrientP: 'Low (16 kg/ha)',
        nutrientK: 'High (300 kg/ha)',
        waterRetention: 'High',
        drainage: 'Moderately-drained clay',
        recommendedCrops: 'Cotton, Sesame, Summer Til',
        practices: 'Use crop spacing. Clean cultivation.',
        irrigation: 'Furrow irrigation at critical vegetative phase.'
      }
    ]
  },
  {
    id: 'rajkot',
    name: 'Rajkot',
    nameGu: 'રાજકોટ',
    x: 18,
    y: 42,
    color: '#1e293b',
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Gondal',
        nameGu: 'ગોંડલ',
        soilType: 'black',
        pH: '7.4 - 8.1',
        fertility: 'High',
        crops: 'Groundnut, Cotton, Cumin, Onion',
        nutrientN: 'Medium (160 kg/ha)',
        nutrientP: 'Medium (22 kg/ha)',
        nutrientK: 'High (340 kg/ha)',
        waterRetention: 'High (Medium black loam)',
        drainage: 'Well-drained clay loam',
        recommendedCrops: 'Groundnut, Cumin, Cotton, Onion',
        practices: 'Deep plowing. Trichoderma seed treatments. Pheromone traps.',
        irrigation: 'Drip or light sprinklers. Low water logging tolerance for Cumin.',
        fertilizer: 'Apply 25:50:20 NPK + Gypsum (500 kg/ha) for high groundnut oil yield.'
      }
    ]
  },
  {
    id: 'jamnagar',
    name: 'Jamnagar',
    nameGu: 'જામનગર',
    x: 10,
    y: 40,
    color: '#1e293b',
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Dhrol',
        nameGu: 'ધ્રોલ',
        soilType: 'black',
        pH: '7.5 - 8.2',
        fertility: 'Medium',
        crops: 'Groundnut, Cotton, Sesame, Wheat',
        nutrientN: 'Medium (140 kg/ha)',
        nutrientP: 'Low (18 kg/ha)',
        nutrientK: 'High (310 kg/ha)',
        waterRetention: 'High',
        drainage: 'Well-drained clay loam',
        recommendedCrops: 'Groundnut, Cotton, Sesame',
        practices: 'Use line sowing. Rotate with chickpea/pulse crops.',
        irrigation: 'Sprinkler systems.'
      }
    ]
  },
  {
    id: 'dwarka',
    name: 'Devbhumi Dwarka',
    nameGu: 'દેવભૂમિ દ્વારકા',
    x: 4,
    y: 42,
    color: '#78350f',
    dominantSoil: 'clay',
    talukas: [
      {
        name: 'Kalyanpur',
        nameGu: 'કલ્યાણપુર',
        soilType: 'clay',
        pH: '7.6 - 8.3',
        fertility: 'Medium',
        crops: 'Groundnut, Bajra, Wheat',
        nutrientN: 'Low (130 kg/ha)',
        nutrientP: 'Low (16 kg/ha)',
        nutrientK: 'High (320 kg/ha)',
        waterRetention: 'Medium-High',
        drainage: 'Moderately slow drainage',
        recommendedCrops: 'Groundnut, Bajra, Chickpea',
        practices: 'Add organic matter to improve soil structure.',
        irrigation: 'Drip system with brackish-water tolerance.'
      }
    ]
  },
  {
    id: 'junagadh',
    name: 'Junagadh',
    nameGu: 'જુનાગઢ',
    x: 10,
    y: 60,
    color: '#1e293b',
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Mendarda',
        nameGu: 'મેંદરડા',
        soilType: 'black',
        pH: '7.2 - 7.9',
        fertility: 'Very High',
        crops: 'Groundnut, Kesar Mango, Wheat, Cotton',
        nutrientN: 'High (190 kg/ha)',
        nutrientP: 'Medium (26 kg/ha)',
        nutrientK: 'High (360 kg/ha)',
        waterRetention: 'High (Fertile black loam near Gir forest)',
        drainage: 'Well-drained deep clay loam',
        recommendedCrops: 'Groundnut, Gir Kesar Mango, Gram',
        practices: 'Intercrop mango orchards. Grow cover crops in monsoon.',
        irrigation: 'Drip or micro-sprinkler systems. Critical dry-spell irrigation.',
        fertilizer: 'Apply 20:40:20 NPK + sulfur for groundnuts.'
      }
    ]
  },
  {
    id: 'somnath',
    name: 'Gir Somnath',
    nameGu: 'ગીર સોમનાથ',
    x: 13,
    y: 72,
    color: '#1e293b',
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Talala',
        nameGu: 'તાલાલા',
        soilType: 'black',
        pH: '7.3 - 7.9',
        fertility: 'Very High',
        crops: 'Kesar Mango, Groundnut, Sugarcane, Wheat',
        nutrientN: 'High (200 kg/ha)',
        nutrientP: 'Medium (28 kg/ha)',
        nutrientK: 'High (380 kg/ha)',
        waterRetention: 'High',
        drainage: 'Well-drained deep clay loam',
        recommendedCrops: 'Gir Kesar Mango, Groundnut, Sugarcane',
        practices: 'Orchard mulching. Organic compost application.',
        irrigation: 'Drip irrigation for mangoes; micro-sprinklers for groundnut.'
      }
    ]
  },
  {
    id: 'amreli',
    name: 'Amreli',
    nameGu: 'અમરેલી',
    x: 20,
    y: 60,
    color: '#1e293b',
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Dhari',
        nameGu: 'ધારી',
        soilType: 'black',
        pH: '7.5 - 8.1',
        fertility: 'High',
        crops: 'Groundnut, Cotton, Cumin, Sesame',
        nutrientN: 'Medium (150 kg/ha)',
        nutrientP: 'Medium (20 kg/ha)',
        nutrientK: 'High (330 kg/ha)',
        waterRetention: 'High',
        drainage: 'Well-drained clay loam',
        recommendedCrops: 'Groundnut, Cotton, Cumin',
        practices: 'Trichoderma seed treatments. Deep furrow preparation.',
        irrigation: 'Drip systems for cotton; sprinklers for cumin.'
      }
    ]
  },
  {
    id: 'bhavnagar',
    name: 'Bhavnagar',
    nameGu: 'ભાવનગર',
    x: 28,
    y: 52,
    color: '#1e293b',
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Mahuva',
        nameGu: 'મહુવા',
        soilType: 'alluvial',
        pH: '7.4 - 8.0',
        fertility: 'High',
        crops: 'Onion, Cotton, Groundnut, Coconut',
        nutrientN: 'Medium (170 kg/ha)',
        nutrientP: 'Medium (24 kg/ha)',
        nutrientK: 'High (350 kg/ha)',
        waterRetention: 'High',
        drainage: 'Well-drained sandy loam / alluvial deposits',
        recommendedCrops: 'Onion, Cotton, Groundnut, Coconut',
        practices: 'Use plastic mulching. Grow onion in raised beds.',
        irrigation: 'Drip system for onions; flood/basin for coconut.'
      }
    ]
  }
];
