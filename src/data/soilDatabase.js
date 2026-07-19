// Gujarat Soil Intelligence Database - Geographically Accurate GIS Boundaries
// Color Codes Mapping for UI Legends:
// Black Cotton Soil -> '#1e293b' (Dark Black)
// Alluvial Soil -> '#eab308' (Yellow)
// Red Soil -> '#ef4444' (Red)
// Clay Soil -> '#78350f' (Brown)
// Sandy Soil -> '#f97316' (Light Orange)
// Saline Soil -> '#8b5cf6' (Purple)
// Loamy Soil -> '#10b981' (Green)

export const SOIL_TYPES = {
  black: { nameEn: 'Black Cotton Soil', nameGu: 'કાળી જમીન', color: '#1e293b', desc: 'Deep clayey rich in calcium carbonates, high organic carbon, high moisture retention. Best for cotton.' },
  alluvial: { nameEn: 'Alluvial Soil', nameGu: 'ગોરાડુ / કાંપની જમીન', color: '#eab308', desc: 'Fertile loam deposited by river basins. Rich in potash, responsive to balanced NPK.' },
  red: { nameEn: 'Red Soil', nameGu: 'રાતી જમીન', color: '#ef4444', desc: 'Sandy clay loam containing high iron oxides. Excellent for horticulture and pulses.' },
  clay: { nameEn: 'Clay Soil', nameGu: 'ચીકણી જમીન', color: '#78350f', desc: 'Fine textured soil with very high water retention. Tends to crack when dry. Ideal for paddy.' },
  sandy: { nameEn: 'Sandy Soil', nameGu: 'રેતાળ જમીન', color: '#f97316', desc: 'Coarse texture, low moisture retention, high aeration. Highly suitable for potatoes.' },
  saline: { nameEn: 'Saline Soil', nameGu: 'ખારાશવાળી જમીન', color: '#8b5cf6', desc: 'Contains high soluble sodium and chloride salts. Suitable for date palm and halophytes.' },
  loamy: { nameEn: 'Loamy Soil', nameGu: 'ગોરાડુ લોમી જમીન', color: '#10b981', desc: 'Balanced sand, silt, and clay mix. Excellent drainage and moisture balance.' }
};

export const DISTRICTS_SOIL_DATA = [
  {
    id: 'kachchh',
    name: 'Kachchh',
    nameGu: 'કચ્છ',
    x: 8,
    y: 18,
    dominantSoil: 'saline',
    talukas: [
      {
        name: 'Bhuj',
        nameGu: 'ભુજ',
        // Geographic boundary polygon (lat/lon)
        boundary: [[69.40, 23.10], [69.90, 23.10], [69.80, 23.60], [69.30, 23.50]],
        soilType: 'Sandy Soil',
        soilTexture: 'Sandy Loam',
        pH: '7.8',
        organicCarbon: '0.45% (Low)',
        nitrogen: '110 kg/ha (Low)',
        phosphorus: '18 kg/ha (Medium)',
        potassium: '340 kg/ha (High)',
        waterHoldingCapacity: '25% (Low)',
        drainageQuality: 'Excessively-drained',
        suitableCrops: 'Castor, Bajra, Guar, Fennel',
        recommendedFertilizers: 'Urea (split doses), DAP, Azotobacter culture',
        irrigationSuggestions: 'Drip irrigation system with frequent light cycles (every 5-7 days).'
      },
      {
        name: 'Mundra',
        nameGu: 'મુંદ્રા',
        boundary: [[69.50, 22.70], [69.90, 22.75], [69.85, 23.00], [69.45, 22.95]],
        soilType: 'Saline Soil',
        soilTexture: 'Silty Clay Loam',
        pH: '8.4',
        organicCarbon: '0.35% (Low)',
        nitrogen: '95 kg/ha (Low)',
        phosphorus: '12 kg/ha (Low)',
        potassium: '220 kg/ha (Medium)',
        waterHoldingCapacity: '45% (Medium)',
        drainageQuality: 'Moderately slow drainage',
        suitableCrops: 'Date Palm, Chikoo, Coconut, Halophytic Grass',
        recommendedFertilizers: 'Gypsum (5 tons/ha), MOP, Organic compost',
        irrigationSuggestions: 'Frequent irrigations to leach salts below the root zone. Use drip.'
      }
    ]
  },
  {
    id: 'banaskantha',
    name: 'Banaskantha',
    nameGu: 'બનાસકાંઠા',
    x: 40,
    y: 6,
    dominantSoil: 'sandy',
    talukas: [
      {
        name: 'Deesa',
        nameGu: 'ડીસા',
        boundary: [[72.10, 24.15], [72.35, 24.10], [72.30, 24.35], [72.05, 24.30]],
        soilType: 'Sandy Soil',
        soilTexture: 'Coarse Sand / Loamy Sand',
        pH: '7.6',
        organicCarbon: '0.40% (Low)',
        nitrogen: '120 kg/ha (Low)',
        phosphorus: '15 kg/ha (Low)',
        potassium: '310 kg/ha (High)',
        waterHoldingCapacity: '20% (Low)',
        drainageQuality: 'Excessively-drained',
        suitableCrops: 'Potato, Summer Bajra, Mustard, Groundnut',
        recommendedFertilizers: 'SSP, Ammonium Sulfate, Micro-nutrients (Zinc & Iron)',
        irrigationSuggestions: 'Drip or overhead sprinkler irrigation at early root development stages.'
      },
      {
        name: 'Palanpur',
        nameGu: 'પાલનપુર',
        boundary: [[72.35, 24.10], [72.55, 24.15], [72.50, 24.30], [72.30, 24.35]],
        soilType: 'Alluvial Soil',
        soilTexture: 'Fine Sandy Loam',
        pH: '7.2',
        organicCarbon: '0.58% (Medium)',
        nitrogen: '170 kg/ha (Medium)',
        phosphorus: '26 kg/ha (Medium)',
        potassium: '290 kg/ha (High)',
        waterHoldingCapacity: '35% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Wheat, Mustard, Castor, Tomato',
        recommendedFertilizers: 'Urea, DAP, Zinc Sulfate',
        irrigationSuggestions: 'Standard furrow irrigation at crown root initiation & flowering phases.'
      }
    ]
  },
  {
    id: 'patan',
    name: 'Patan',
    nameGu: 'પાટણ',
    x: 32,
    y: 14,
    dominantSoil: 'sandy',
    talukas: [
      {
        name: 'Patan',
        nameGu: 'પાટણ',
        boundary: [[71.95, 23.70], [72.25, 23.70], [72.20, 23.90], [71.90, 23.90]],
        soilType: 'Sandy Soil',
        soilTexture: 'Sandy Loam',
        pH: '7.7',
        organicCarbon: '0.42% (Low)',
        nitrogen: '130 kg/ha (Low)',
        phosphorus: '20 kg/ha (Medium)',
        potassium: '280 kg/ha (High)',
        waterHoldingCapacity: '22% (Low)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Cumin, Castor, Mustard, Fennel',
        recommendedFertilizers: 'DAP, Urea, Organic Castor Cake',
        irrigationSuggestions: 'Avoid over-irrigation. Sprinklers are recommended for Cumin to avoid damping off.'
      }
    ]
  },
  {
    id: 'sabarkantha',
    name: 'Sabarkantha',
    nameGu: 'સાબરકાંઠા',
    x: 52,
    y: 12,
    dominantSoil: 'red',
    talukas: [
      {
        name: 'Himatnagar',
        nameGu: 'હિંમતનગર',
        boundary: [[72.85, 23.85], [73.15, 23.85], [73.10, 24.05], [72.80, 24.05]],
        soilType: 'Red Soil',
        soilTexture: 'Red Gravelly Clay Loam',
        pH: '6.4',
        organicCarbon: '0.52% (Medium)',
        nitrogen: '160 kg/ha (Medium)',
        phosphorus: '14 kg/ha (Low)',
        potassium: '240 kg/ha (Medium)',
        waterHoldingCapacity: '38% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Groundnut, Maize, Cotton, Mangoes',
        recommendedFertilizers: 'Single Super Phosphate (SSP), Lime, Neem coated Urea',
        irrigationSuggestions: 'Irrigate immediately after sowing and maintain moisture during pod development.'
      }
    ]
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    nameGu: 'અમદાવાદ',
    x: 42,
    y: 35,
    dominantSoil: 'alluvial',
    talukas: [
      {
        name: 'Dhandhuka',
        nameGu: 'ધંધુકા',
        boundary: [[72.00, 22.30], [72.25, 22.30], [72.20, 22.50], [71.95, 22.50]],
        soilType: 'Black Cotton Soil',
        soilTexture: 'Deep Heavy Clay',
        pH: '8.1',
        organicCarbon: '0.62% (Medium)',
        nitrogen: '150 kg/ha (Medium)',
        phosphorus: '24 kg/ha (Medium)',
        potassium: '390 kg/ha (High)',
        waterHoldingCapacity: '65% (Very High)',
        drainageQuality: 'Slowly-drained',
        suitableCrops: 'Bhalia Wheat, Cotton, Chickpea (Gram)',
        recommendedFertilizers: 'DAP, Rhizobium culture inoculants',
        irrigationSuggestions: 'Bhalia Wheat is grown rainfed on conserved residual moisture. Minimal irrigation needed.'
      },
      {
        name: 'Sanand',
        nameGu: 'સાણંદ',
        boundary: [[72.25, 22.90], [72.45, 22.95], [72.40, 23.10], [72.20, 23.05]],
        soilType: 'Alluvial Soil',
        soilTexture: 'Silty Loam',
        pH: '7.4',
        organicCarbon: '0.65% (Medium)',
        nitrogen: '190 kg/ha (Medium)',
        phosphorus: '32 kg/ha (High)',
        potassium: '320 kg/ha (High)',
        waterHoldingCapacity: '40% (Medium)',
        drainageQuality: 'Moderately-drained',
        suitableCrops: 'Paddy, Wheat, Castor',
        recommendedFertilizers: 'Urea, Zinc Sulfate, SSP',
        irrigationSuggestions: 'Maintain submerged water depth in paddy blocks; regular basin irrigation for wheat.'
      }
    ]
  },
  {
    id: 'gandhinagar',
    name: 'Gandhinagar',
    nameGu: 'ગાંધીનગર',
    x: 48,
    y: 25,
    dominantSoil: 'alluvial',
    talukas: [
      {
        name: 'Dehgam',
        nameGu: 'દહેગામ',
        boundary: [[72.75, 23.10], [73.00, 23.10], [72.95, 23.30], [72.70, 23.30]],
        soilType: 'Alluvial Soil',
        soilTexture: 'Sandy Loam (Goradu)',
        pH: '7.3',
        organicCarbon: '0.68% (High)',
        nitrogen: '210 kg/ha (High)',
        phosphorus: '30 kg/ha (High)',
        potassium: '340 kg/ha (High)',
        waterHoldingCapacity: '35% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Wheat, Potato, Tomato, Fennel',
        recommendedFertilizers: 'Balanced NPK (120:60:40), Composted FYM',
        irrigationSuggestions: 'Alternate furrow irrigation. Use drip for horticultural crops.'
      }
    ]
  },
  {
    id: 'kheda',
    name: 'Kheda',
    nameGu: 'ખેડા',
    x: 50,
    y: 35,
    dominantSoil: 'alluvial',
    talukas: [
      {
        name: 'Nadiad',
        nameGu: 'નડિયાદ',
        boundary: [[72.75, 22.65], [72.95, 22.65], [72.90, 22.80], [72.70, 22.80]],
        soilType: 'Alluvial Soil',
        soilTexture: 'Deep Rich Silty Loam',
        pH: '7.1',
        organicCarbon: '0.74% (High)',
        nitrogen: '230 kg/ha (High)',
        phosphorus: '38 kg/ha (High)',
        potassium: '370 kg/ha (High)',
        waterHoldingCapacity: '45% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Tobacco, Paddy, Wheat, Vegetables',
        recommendedFertilizers: 'Ammonium Sulfate, DAP, Vermicompost',
        irrigationSuggestions: 'Regular canal irrigation schedule matching crop tillering stages.'
      }
    ]
  },
  {
    id: 'anand',
    name: 'Anand',
    nameGu: 'આણંદ',
    x: 52,
    y: 42,
    dominantSoil: 'alluvial',
    talukas: [
      {
        name: 'Anand',
        nameGu: 'આણંદ',
        boundary: [[72.85, 22.45], [73.05, 22.45], [73.00, 22.60], [72.80, 22.60]],
        soilType: 'Alluvial Soil',
        soilTexture: 'Silty Loam (Goradu)',
        pH: '7.2',
        organicCarbon: '0.76% (High)',
        nitrogen: '240 kg/ha (High)',
        phosphorus: '42 kg/ha (High)',
        potassium: '390 kg/ha (High)',
        waterHoldingCapacity: '42% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Banana, Paddy, Wheat, Flowers',
        recommendedFertilizers: 'Potassium Sulfate, Urea, Neem Cakes',
        irrigationSuggestions: 'Provide drip irrigation for Banana with liquid fertigation system.'
      }
    ]
  },
  {
    id: 'vadodara',
    name: 'Vadodara',
    nameGu: 'વડોદરા',
    x: 60,
    y: 45,
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Karjan',
        nameGu: 'કરજણ',
        boundary: [[73.05, 22.00], [73.25, 22.00], [73.20, 22.15], [73.00, 22.15]],
        soilType: 'Black Cotton Soil',
        soilTexture: 'Heavy Clay (Regur)',
        pH: '7.8',
        organicCarbon: '0.55% (Medium)',
        nitrogen: '170 kg/ha (Medium)',
        phosphorus: '25 kg/ha (Medium)',
        potassium: '380 kg/ha (High)',
        waterHoldingCapacity: '62% (High)',
        drainageQuality: 'Slowly-drained',
        suitableCrops: 'Cotton, Pigeon Pea (Tuver), Wheat',
        recommendedFertilizers: 'DAP, Gypsum, MOP, Ferrous Sulfate',
        irrigationSuggestions: 'Drip system with alternate row furrow spacing is ideal to prevent root logging.'
      }
    ]
  },
  {
    id: 'bharuch',
    name: 'Bharuch',
    nameGu: 'ભરૂચ',
    x: 52,
    y: 56,
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Jambusar',
        nameGu: 'જંબુસર',
        boundary: [[72.60, 21.90], [72.85, 21.95], [72.80, 22.10], [72.55, 22.05]],
        soilType: 'Black Cotton Soil',
        soilTexture: 'Silty Clay',
        pH: '7.9',
        organicCarbon: '0.52% (Medium)',
        nitrogen: '150 kg/ha (Medium)',
        phosphorus: '22 kg/ha (Medium)',
        potassium: '360 kg/ha (High)',
        waterHoldingCapacity: '60% (High)',
        drainageQuality: 'Slowly-drained',
        suitableCrops: 'Cotton, Gram, Sorghum',
        recommendedFertilizers: 'Urea (split), SSP, Azospirillum',
        irrigationSuggestions: 'Light frequent irrigations. Drip lines at 1.2m spacing.'
      }
    ]
  },
  {
    id: 'surat',
    name: 'Surat',
    nameGu: 'સુરત',
    x: 50,
    y: 66,
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Bardoli',
        nameGu: 'બારડોલી',
        boundary: [[73.00, 21.05], [73.20, 21.05], [73.15, 21.20], [72.95, 21.20]],
        soilType: 'Black Cotton Soil',
        soilTexture: 'Clayey (Montmorillonite)',
        pH: '7.5',
        organicCarbon: '0.72% (High)',
        nitrogen: '230 kg/ha (High)',
        phosphorus: '36 kg/ha (High)',
        potassium: '410 kg/ha (High)',
        waterHoldingCapacity: '68% (Very High)',
        drainageQuality: 'Slowly-drained',
        suitableCrops: 'Sugarcane, Paddy, Banana',
        recommendedFertilizers: 'Urea (split), SSP, Potassium Chloride (MOP)',
        irrigationSuggestions: 'Heavy drip systems with daily irrigation blocks matching sugarcane growth.'
      }
    ]
  },
  {
    id: 'navsari',
    name: 'Navsari',
    nameGu: 'નવસારી',
    x: 48,
    y: 75,
    dominantSoil: 'clay',
    talukas: [
      {
        name: 'Gandevi',
        nameGu: 'ગણદેવી',
        boundary: [[72.90, 20.70], [73.05, 20.70], [73.00, 20.85], [72.85, 20.85]],
        soilType: 'Clay Soil',
        soilTexture: 'Deep Silty Clay (Heavy)',
        pH: '7.0',
        organicCarbon: '0.78% (High)',
        nitrogen: '200 kg/ha (High)',
        phosphorus: '28 kg/ha (Medium)',
        potassium: '360 kg/ha (High)',
        waterHoldingCapacity: '64% (High)',
        drainageQuality: 'Moderately slow drainage',
        suitableCrops: 'Kesar Mango, Chikoo, Sugarcane, Paddy',
        recommendedFertilizers: 'FYM Compost, Urea, DAP, Micronutrient mix',
        irrigationSuggestions: 'Basin system for orchards. Micro-irrigation at root zones.'
      }
    ]
  },
  {
    id: 'valsad',
    name: 'Valsad',
    nameGu: 'વલસાડ',
    x: 46,
    y: 84,
    dominantSoil: 'clay',
    talukas: [
      {
        name: 'Valsad',
        nameGu: 'વલસાડ',
        boundary: [[72.85, 20.50], [73.05, 20.50], [73.00, 20.65], [72.80, 20.65]],
        soilType: 'Clay Soil',
        soilTexture: 'Deep Alluvial Clay',
        pH: '6.7',
        organicCarbon: '0.75% (High)',
        nitrogen: '190 kg/ha (High)',
        phosphorus: '25 kg/ha (Medium)',
        potassium: '370 kg/ha (High)',
        waterHoldingCapacity: '60% (High)',
        drainageQuality: 'Moderately-drained',
        suitableCrops: 'Mango, Paddy, Chikoo, Sugarcane',
        recommendedFertilizers: 'DAP, Urea, Organic Humic Acid',
        irrigationSuggestions: 'Provide drip lines to orchard bases. Keep blocks well aerated.'
      }
    ]
  },
  {
    id: 'surendranagar',
    name: 'Surendranagar',
    nameGu: 'સુરેન્દ્રનગર',
    x: 24,
    y: 30,
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Wadhwan',
        nameGu: 'વઢવાણ',
        boundary: [[71.55, 22.60], [71.75, 22.60], [71.70, 22.75], [71.50, 22.75]],
        soilType: 'Black Cotton Soil',
        soilTexture: 'Sandy Clay Loam',
        pH: '7.8',
        organicCarbon: '0.48% (Medium)',
        nitrogen: '130 kg/ha (Low)',
        phosphorus: '16 kg/ha (Low)',
        potassium: '290 kg/ha (High)',
        waterHoldingCapacity: '50% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Cotton, Sesame, Bajra',
        recommendedFertilizers: 'Neem Urea, DAP, Gypsum',
        irrigationSuggestions: 'Requires light frequent irrigations. Avoid stagnant flooding.'
      }
    ]
  },
  {
    id: 'rajkot',
    name: 'Rajkot',
    nameGu: 'રાજકોટ',
    x: 18,
    y: 42,
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Gondal',
        nameGu: 'ગોંડલ',
        boundary: [[70.65, 21.90], [70.85, 21.95], [70.80, 22.10], [70.60, 22.05]],
        soilType: 'Black Cotton Soil',
        soilTexture: 'Clay Loam (Medium Black)',
        pH: '7.6',
        organicCarbon: '0.58% (Medium)',
        nitrogen: '160 kg/ha (Medium)',
        phosphorus: '22 kg/ha (Medium)',
        potassium: '350 kg/ha (High)',
        waterHoldingCapacity: '55% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Groundnut, Cumin, Bt Cotton, Onion',
        recommendedFertilizers: 'Gypsum (500 kg/ha), DAP, Urea, Sulfur powder',
        irrigationSuggestions: 'Light sprinkler irrigation cycles to preserve flower pegs of groundnuts.'
      }
    ]
  },
  {
    id: 'jamnagar',
    name: 'Jamnagar',
    nameGu: 'જામનગર',
    x: 10,
    y: 40,
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Dhrol',
        nameGu: 'ધ્રોલ',
        boundary: [[70.30, 22.45], [70.50, 22.45], [70.45, 22.60], [70.25, 22.60]],
        soilType: 'Black Cotton Soil',
        soilTexture: 'Clayey Loam',
        pH: '7.8',
        organicCarbon: '0.46% (Medium)',
        nitrogen: '140 kg/ha (Low)',
        phosphorus: '18 kg/ha (Low)',
        potassium: '320 kg/ha (High)',
        waterHoldingCapacity: '52% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Groundnut, Cotton, Sesame, Wheat',
        recommendedFertilizers: 'SSP, Urea, Zinc Sulfate',
        irrigationSuggestions: 'Provide standard sprinkler or furrow checks.'
      }
    ]
  },
  {
    id: 'dwarka',
    name: 'Devbhumi Dwarka',
    nameGu: 'દેવભૂમિ દ્વારકા',
    x: 4,
    y: 42,
    dominantSoil: 'clay',
    talukas: [
      {
        name: 'Kalyanpur',
        nameGu: 'કલ્યાણપુર',
        boundary: [[69.10, 22.05], [69.35, 22.05], [69.30, 22.30], [69.05, 22.25]],
        soilType: 'Clay Soil',
        soilTexture: 'Sandy Clay',
        pH: '7.9',
        organicCarbon: '0.45% (Low)',
        nitrogen: '120 kg/ha (Low)',
        phosphorus: '15 kg/ha (Low)',
        potassium: '310 kg/ha (High)',
        waterHoldingCapacity: '48% (Medium)',
        drainageQuality: 'Moderately slow drainage',
        suitableCrops: 'Groundnut, Bajra, Chickpea',
        recommendedFertilizers: 'DAP, Urea, Organic Castor cakes',
        irrigationSuggestions: 'Maintain drip lines. Use gypsum if saline waters are used.'
      }
    ]
  },
  {
    id: 'junagadh',
    name: 'Junagadh',
    nameGu: 'જુનાગઢ',
    x: 10,
    y: 60,
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Mendarda',
        nameGu: 'મેંદરડા',
        boundary: [[70.35, 21.35], [70.50, 21.35], [70.45, 21.45], [70.30, 21.45]],
        soilType: 'Black Cotton Soil',
        soilTexture: 'Deep Clay Loam (Humus-rich)',
        pH: '7.5',
        organicCarbon: '0.74% (High)',
        nitrogen: '190 kg/ha (High)',
        phosphorus: '26 kg/ha (Medium)',
        potassium: '370 kg/ha (High)',
        waterHoldingCapacity: '62% (High)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Groundnut, Gir Kesar Mango, Gram, Cotton',
        recommendedFertilizers: 'Organic manure (FYM), DAP, Sulfur, Urea',
        irrigationSuggestions: 'Basin system for orchards; micro-sprinklers for oilseeds.'
      }
    ]
  },
  {
    id: 'somnath',
    name: 'Gir Somnath',
    nameGu: 'ગીર સોમનાથ',
    x: 13,
    y: 72,
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Talala',
        nameGu: 'તાલાલા',
        boundary: [[70.50, 20.80], [70.70, 20.80], [70.65, 20.95], [70.45, 20.95]],
        soilType: 'Black Cotton Soil',
        soilTexture: 'Rich Clayey Loam (Forest base)',
        pH: '7.4',
        organicCarbon: '0.78% (High)',
        nitrogen: '200 kg/ha (High)',
        phosphorus: '28 kg/ha (Medium)',
        potassium: '380 kg/ha (High)',
        waterHoldingCapacity: '60% (High)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Gir Kesar Mango, Groundnut, Sugarcane, Wheat',
        recommendedFertilizers: 'Vermicompost, SSP, Potash, Urea',
        irrigationSuggestions: 'Drip lines for mango trees; weekly schedules for sugarcane.'
      }
    ]
  },
  {
    id: 'amreli',
    name: 'Amreli',
    nameGu: 'અમરેલી',
    x: 20,
    y: 60,
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Dhari',
        nameGu: 'ધારી',
        boundary: [[71.05, 21.15], [71.25, 21.15], [71.20, 21.35], [71.00, 21.30]],
        soilType: 'Black Cotton Soil',
        soilTexture: 'Clay Loam (Medium Black)',
        pH: '7.7',
        organicCarbon: '0.52% (Medium)',
        nitrogen: '140 kg/ha (Low)',
        phosphorus: '19 kg/ha (Low)',
        potassium: '330 kg/ha (High)',
        waterHoldingCapacity: '54% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Groundnut, Cotton, Cumin, Sesame',
        recommendedFertilizers: 'Gypsum, Neem Urea, DAP',
        irrigationSuggestions: 'Avoid standing flood water. Sprinklers for cumin.'
      }
    ]
  },
  {
    id: 'bhavnagar',
    name: 'Bhavnagar',
    nameGu: 'ભાવનગર',
    x: 28,
    y: 52,
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Mahuva',
        nameGu: 'મહુવા',
        boundary: [[71.65, 21.00], [71.90, 21.05], [71.85, 21.25], [71.60, 21.20]],
        soilType: 'Loamy Soil',
        soilTexture: 'Alluvial Loamy Sand',
        pH: '7.6',
        organicCarbon: '0.62% (Medium)',
        nitrogen: '160 kg/ha (Medium)',
        phosphorus: '22 kg/ha (Medium)',
        potassium: '340 kg/ha (High)',
        waterHoldingCapacity: '40% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Onion, Cotton, Groundnut, Coconut',
        recommendedFertilizers: 'NPK complex, Organic cakes, Zinc Sulfate',
        irrigationSuggestions: 'Provide regular drip channels for onions.'
      }
    ]
  },
  {
    id: 'morbi',
    name: 'Morbi',
    nameGu: 'મોરબી',
    x: 20,
    y: 30,
    dominantSoil: 'clay',
    talukas: [
      {
        name: 'Morbi',
        nameGu: 'મોરબી',
        boundary: [[70.75, 22.70], [70.95, 22.70], [70.90, 22.90], [70.70, 22.90]],
        soilType: 'Clay Soil',
        soilTexture: 'Sandy Clay Loam',
        pH: '7.8',
        organicCarbon: '0.48% (Medium)',
        nitrogen: '140 kg/ha (Low)',
        phosphorus: '17 kg/ha (Low)',
        potassium: '310 kg/ha (High)',
        waterHoldingCapacity: '50% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Groundnut, Cotton, Sesame, Wheat',
        recommendedFertilizers: 'Neem-coated Urea, DAP, Gypsum',
        irrigationSuggestions: 'Sprinklers for Sesame, regular furrow checks for Wheat.'
      }
    ]
  },
  {
    id: 'botad',
    name: 'Botad',
    nameGu: 'બોટાદ',
    x: 28,
    y: 40,
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Botad',
        nameGu: 'બોટાદ',
        boundary: [[71.55, 22.05], [71.75, 22.05], [71.70, 22.25], [71.50, 22.20]],
        soilType: 'Black Cotton Soil',
        soilTexture: 'Medium Clay Loam',
        pH: '7.7',
        organicCarbon: '0.50% (Medium)',
        nitrogen: '145 kg/ha (Medium)',
        phosphorus: '18 kg/ha (Low)',
        potassium: '320 kg/ha (High)',
        waterHoldingCapacity: '52% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Cotton, Sesame, Groundnut, Gram',
        recommendedFertilizers: 'SSP, DAP, Urea, Gypsum',
        irrigationSuggestions: 'Light furrow irrigation during dry spells.'
      }
    ]
  },
  {
    id: 'tapi',
    name: 'Tapi',
    nameGu: 'તાપી',
    x: 56,
    y: 68,
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Vyara',
        nameGu: 'વ્યારા',
        boundary: [[73.30, 21.00], [73.50, 21.00], [73.45, 21.20], [73.25, 21.20]],
        soilType: 'Black Cotton Soil',
        soilTexture: 'Clayey (Tapi basin)',
        pH: '7.4',
        organicCarbon: '0.70% (High)',
        nitrogen: '210 kg/ha (High)',
        phosphorus: '32 kg/ha (High)',
        potassium: '390 kg/ha (High)',
        waterHoldingCapacity: '65% (Very High)',
        drainageQuality: 'Slowly-drained',
        suitableCrops: 'Sugarcane, Paddy, Sorghum, Banana',
        recommendedFertilizers: 'Urea, SSP, MOP, Organic composts',
        irrigationSuggestions: 'Heavy drip system or furrow schedules.'
      }
    ]
  },
  {
    id: 'dang',
    name: 'Dang',
    nameGu: 'ડાંગ',
    x: 58,
    y: 78,
    dominantSoil: 'red',
    talukas: [
      {
        name: 'Ahwa',
        nameGu: 'આહવા',
        boundary: [[73.55, 20.70], [73.75, 20.70], [73.70, 20.90], [73.50, 20.90]],
        soilType: 'Red Soil',
        soilTexture: 'Red Gravelly Loam (Forest soil)',
        pH: '6.2',
        organicCarbon: '0.80% (High)',
        nitrogen: '180 kg/ha (Medium)',
        phosphorus: '12 kg/ha (Low)',
        potassium: '220 kg/ha (Medium)',
        waterHoldingCapacity: '36% (Medium)',
        drainageQuality: 'Excessively-drained',
        suitableCrops: 'Nagli (Ragi), Rice, Pulses, Fruits',
        recommendedFertilizers: 'Lime, SSP, Vermicompost, Urea',
        irrigationSuggestions: 'Provide check dams water or light sprinklers due to slope runoff.'
      }
    ]
  },
  {
    id: 'narmada',
    name: 'Narmada',
    nameGu: 'નર્મદા',
    x: 58,
    y: 56,
    dominantSoil: 'black',
    talukas: [
      {
        name: 'Rajpipla',
        nameGu: 'રાજપીપલા',
        boundary: [[73.45, 21.70], [73.65, 21.70], [73.60, 21.90], [73.40, 21.90]],
        soilType: 'Black Cotton Soil',
        soilTexture: 'Deep Clay Loam (River basin)',
        pH: '7.5',
        organicCarbon: '0.65% (Medium)',
        nitrogen: '180 kg/ha (Medium)',
        phosphorus: '26 kg/ha (Medium)',
        potassium: '350 kg/ha (High)',
        waterHoldingCapacity: '60% (High)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Cotton, Paddy, Sugarcane, Banana',
        recommendedFertilizers: 'DAP, Urea, Zinc Sulfate',
        irrigationSuggestions: 'Standard furrow or drip lines.'
      }
    ]
  },
  {
    id: 'panchmahal',
    name: 'Panchmahal',
    nameGu: 'પંચમહાલ',
    x: 60,
    y: 35,
    dominantSoil: 'alluvial',
    talukas: [
      {
        name: 'Godhra',
        nameGu: 'ગોધરા',
        boundary: [[73.50, 22.60], [73.70, 22.60], [73.65, 22.80], [73.45, 22.80]],
        soilType: 'Alluvial Soil',
        soilTexture: 'Sandy Clay Loam',
        pH: '7.3',
        organicCarbon: '0.58% (Medium)',
        nitrogen: '170 kg/ha (Medium)',
        phosphorus: '22 kg/ha (Medium)',
        potassium: '300 kg/ha (High)',
        waterHoldingCapacity: '38% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Maize, Paddy, Groundnut, Gram',
        recommendedFertilizers: 'DAP, Urea, Organic cakes',
        irrigationSuggestions: 'Basin system for Paddy, sprinklers for Maize.'
      }
    ]
  },
  {
    id: 'dahod',
    name: 'Dahod',
    nameGu: 'દાહોદ',
    x: 68,
    y: 35,
    dominantSoil: 'red',
    talukas: [
      {
        name: 'Dahod',
        nameGu: 'દાહોદ',
        boundary: [[74.15, 22.75], [74.35, 22.75], [74.30, 22.95], [74.10, 22.95]],
        soilType: 'Red Soil',
        soilTexture: 'Sandy Red Loam',
        pH: '6.5',
        organicCarbon: '0.48% (Medium)',
        nitrogen: '150 kg/ha (Medium)',
        phosphorus: '14 kg/ha (Low)',
        potassium: '240 kg/ha (Medium)',
        waterHoldingCapacity: '32% (Medium)',
        drainageQuality: 'Excessively-drained',
        suitableCrops: 'Maize, Gram, Groundnut, Soybean',
        recommendedFertilizers: 'SSP, Lime, Urea, Composted FYM',
        irrigationSuggestions: 'Provide regular moisture during seed tillering.'
      }
    ]
  },
  {
    id: 'mahisagar',
    name: 'Mahisagar',
    nameGu: 'મહીસાગર',
    x: 58,
    y: 28,
    dominantSoil: 'alluvial',
    talukas: [
      {
        name: 'Lunawada',
        nameGu: 'લુણાવાડા',
        boundary: [[73.40, 23.00], [73.60, 23.00], [73.55, 23.20], [73.35, 23.20]],
        soilType: 'Alluvial Soil',
        soilTexture: 'Silty Loam',
        pH: '7.2',
        organicCarbon: '0.60% (Medium)',
        nitrogen: '175 kg/ha (Medium)',
        phosphorus: '24 kg/ha (Medium)',
        potassium: '310 kg/ha (High)',
        waterHoldingCapacity: '36% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Maize, Paddy, Wheat, Castor',
        recommendedFertilizers: 'DAP, Urea, Zinc Sulfate',
        irrigationSuggestions: 'Canal check lines matching plant vegetative cycles.'
      }
    ]
  },
  {
    id: 'chhotaudepur',
    name: 'Chhota Udepur',
    nameGu: 'છોટાઉદેપુર',
    x: 65,
    y: 50,
    dominantSoil: 'red',
    talukas: [
      {
        name: 'Chhota Udepur',
        nameGu: 'છોટાઉદેપુર',
        boundary: [[73.70, 22.15], [73.90, 22.15], [73.85, 22.40], [73.65, 22.35]],
        soilType: 'Red Soil',
        soilTexture: 'Sandy Clay Loam (Red gravelly)',
        pH: '6.4',
        organicCarbon: '0.52% (Medium)',
        nitrogen: '160 kg/ha (Medium)',
        phosphorus: '15 kg/ha (Low)',
        potassium: '230 kg/ha (Medium)',
        waterHoldingCapacity: '34% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Cotton, Maize, Ragi, Groundnut',
        recommendedFertilizers: 'SSP, Lime, neem coated Urea',
        irrigationSuggestions: 'Ensure check basin watering systems.'
      }
    ]
  },
  {
    id: 'aravalli',
    name: 'Aravalli',
    nameGu: 'અરવલ્લી',
    x: 55,
    y: 22,
    dominantSoil: 'red',
    talukas: [
      {
        name: 'Modasa',
        nameGu: 'મોડાસા',
        boundary: [[73.10, 23.40], [73.30, 23.40], [73.25, 23.60], [73.05, 23.60]],
        soilType: 'Red Soil',
        soilTexture: 'Gravelly Sandy Loam',
        pH: '6.6',
        organicCarbon: '0.50% (Medium)',
        nitrogen: '155 kg/ha (Medium)',
        phosphorus: '16 kg/ha (Low)',
        potassium: '250 kg/ha (Medium)',
        waterHoldingCapacity: '35% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Groundnut, Maize, Castor, Gram',
        recommendedFertilizers: 'SSP, DAP, Urea',
        irrigationSuggestions: 'Provide standard sprinkler spacing.'
      }
    ]
  },
  {
    id: 'porbandar',
    name: 'Porbandar',
    nameGu: 'પોરબંદર',
    x: 4,
    y: 54,
    dominantSoil: 'clay',
    talukas: [
      {
        name: 'Porbandar',
        nameGu: 'પોરબંદર',
        boundary: [[69.45, 21.50], [69.70, 21.50], [69.65, 21.70], [69.40, 21.70]],
        soilType: 'Clay Soil',
        soilTexture: 'Fine Clay (Coastal black soil)',
        pH: '8.0',
        organicCarbon: '0.55% (Medium)',
        nitrogen: '140 kg/ha (Low)',
        phosphorus: '20 kg/ha (Medium)',
        potassium: '350 kg/ha (High)',
        waterHoldingCapacity: '60% (High)',
        drainageQuality: 'Slowly-drained',
        suitableCrops: 'Groundnut, Wheat, Chickpea',
        recommendedFertilizers: 'Gypsum (neutralize soda), DAP, Urea',
        irrigationSuggestions: 'Frequent shallow water cycles. Use micro drip.'
      }
    ]
  },
  {
    id: 'mehsana',
    name: 'Mehsana',
    nameGu: 'મહેસાણા',
    x: 42,
    y: 20,
    dominantSoil: 'alluvial',
    talukas: [
      {
        name: 'Mehsana',
        nameGu: 'મહેસાણા',
        boundary: [[72.25, 23.50], [72.45, 23.50], [72.40, 23.70], [72.20, 23.70]],
        soilType: 'Alluvial Soil',
        soilTexture: 'Sandy Loam',
        pH: '7.4',
        organicCarbon: '0.62% (Medium)',
        nitrogen: '180 kg/ha (Medium)',
        phosphorus: '26 kg/ha (Medium)',
        potassium: '310 kg/ha (High)',
        waterHoldingCapacity: '35% (Medium)',
        drainageQuality: 'Well-drained',
        suitableCrops: 'Mustard, Wheat, Castor, Fennel',
        recommendedFertilizers: 'Urea, DAP, Zinc Sulfate',
        irrigationSuggestions: 'Standard furrow watering schedules.'
      }
    ]
  }
];
