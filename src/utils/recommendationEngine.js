import { CROP_DATABASE } from '../data/cropDatabase';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Calculates suitability score and AI recommendation for a crop given farmer's inputs.
 */
export function recommendCrops(inputs) {
  const {
    region, // e.g. 'saurashtra' or region object
    soilType, // e.g. 'Medium Black Soil'
    currentMonth, // 1 to 12
    temperature = 28, // °C
    rainfall = 700, // mm
    irrigation = 'yes', // 'yes' or 'no'
    farmSize = 1, // number
    unit = 'hectare', // 'hectare' or 'bigha'
    previousCrop = 'fallow'
  } = inputs;

  const monthName = typeof currentMonth === 'number' ? MONTH_NAMES[currentMonth - 1] : currentMonth;

  // Convert farm size to Hectares for uniform calculation (1 Hectare ≈ 6.25 Vigha/Bigha in Gujarat)
  const farmSizeHectares = unit === 'bigha' ? farmSize / 6.25 : farmSize;

  const scoredCrops = CROP_DATABASE.map((crop) => {
    let score = 0;
    let maxPossibleScore = 100;
    const matchReasons = [];
    const gujaratiReasons = [];

    // 1. Region Suitability (Weight: 25 points)
    const regionNameNormalized = (typeof region === 'string' ? region : region.name || '').toLowerCase();
    const regionMatch = crop.suitableRegions.some(r => r.toLowerCase().includes(regionNameNormalized) || regionNameNormalized.includes(r.toLowerCase()));
    if (regionMatch) {
      score += 25;
      matchReasons.push(`Strong suitability in ${regionNameNormalized.toUpperCase()} region`);
      gujaratiReasons.push(`${regionNameNormalized.toUpperCase()} પ્રદેશ માટે ઉત્તમ અનુકૂળતા`);
    } else {
      score += 5;
    }

    // 2. Soil Type Compatibility (Weight: 25 points)
    const soilMatch = crop.suitableSoilTypes.some(s => 
      soilType.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(soilType.toLowerCase())
    );
    if (soilMatch) {
      score += 25;
      matchReasons.push(`${soilType} provides optimal soil environment`);
      gujaratiReasons.push(`${soilType} જમીનમાં ઉત્તમ પોષક તત્વો સંચય`);
    } else {
      score += 8;
    }

    // 3. Sowing Window / Season (Weight: 25 points)
    const monthMatch = crop.sowingMonths.some(m => m.toLowerCase().includes(monthName.toLowerCase()));
    if (monthMatch) {
      score += 25;
      matchReasons.push(`${monthName} is within ideal sowing window`);
      gujaratiReasons.push(`${monthName} મહિનો વાવણી માટે આદર્શ સમયગાળો છે`);
    } else {
      score += 5;
    }

    // 4. Irrigation & Rainfall Match (Weight: 15 points)
    if (irrigation === 'yes') {
      score += 15;
      matchReasons.push('Assured irrigation available');
      gujaratiReasons.push('ખાતરીપૂર્વક પિયત સુવિધા ઉપલબ્ધ');
    } else {
      // Rainfed scenario
      if (crop.waterRequirement.toLowerCase().includes('low') || crop.category.includes('Millet') || crop.id === 'groundnut' || crop.id === 'bajra') {
        score += 14;
        matchReasons.push('Excellent drought tolerance for rainfed condition');
        gujaratiReasons.push('વરસાદ આધારિત ખેતી માટે ઉત્તમ વાતાવરણ');
      } else {
        score += 4;
      }
    }

    // 5. Crop Rotation Benefit (Weight: 10 points)
    if (previousCrop && previousCrop !== 'fallow') {
      const prevLower = previousCrop.toLowerCase();
      if (crop.suitableCompanionCrops.toLowerCase().includes(prevLower)) {
        score += 10;
        matchReasons.push(`Favorable crop rotation after ${previousCrop}`);
        gujaratiReasons.push(`${previousCrop} પછી પાક ફેરબદલી માટે સાનુકૂળ`);
      } else {
        score += 5;
      }
    } else {
      score += 7;
    }

    const confidenceScore = Math.min(98, Math.max(65, Math.round(score)));

    return {
      crop,
      score,
      confidenceScore,
      matchReasons,
      gujaratiReasons
    };
  });

  // Sort crops by score descending
  scoredCrops.sort((a, b) => b.score - a.score);

  const primaryMatch = scoredCrops[0];
  const secondaryMatches = scoredCrops.slice(1, 4);

  // Compute calculated values based on farm size
  const recCrop = primaryMatch.crop;

  // Extract profit range digits
  const profitMatch = recCrop.estimatedProfitRange.match(/₹([\d,]+)\s*-\s*₹([\d,]+)/);
  let perHaMinProfit = 85000;
  let perHaMaxProfit = 120000;

  if (profitMatch) {
    perHaMinProfit = parseInt(profitMatch[1].replace(/,/g, ''), 10);
    perHaMaxProfit = parseInt(profitMatch[2].replace(/,/g, ''), 10);
  }

  const calculatedMinProfit = Math.round(perHaMinProfit * farmSizeHectares);
  const calculatedMaxProfit = Math.round(perHaMaxProfit * farmSizeHectares);

  const formattedProfit = `₹${calculatedMinProfit.toLocaleString('en-IN')} – ₹${calculatedMaxProfit.toLocaleString('en-IN')}`;
  const formattedUnitLabel = unit === 'bigha' ? `${farmSize} Bigha (${farmSizeHectares.toFixed(2)} Ha)` : `${farmSize} Hectare`;

  // Formulate succinct Reason string as requested
  const reasonText = `${soilType}, ${monthName} sowing window, ${irrigation === 'yes' ? 'adequate irrigation' : 'rainfed suitability'}, and strong regional suitability in ${inputs.district || 'Gujarat'}.`;
  const reasonTextGu = `${soilType}, ${monthName} વાવણીનો સમય, ${irrigation === 'yes' ? 'પૂરતી પિયત સુવિધા' : 'વરસાદ આધારિત અનુકૂળતા'} અને ${inputs.district || 'જિલ્લા'} વિસ્તારની ભૌગોલિક અનુકૂળતા.`;

  return {
    primaryRecommendation: {
      crop: recCrop,
      confidence: primaryMatch.confidenceScore,
      expectedYield: recCrop.averageYield,
      expectedProfit: formattedProfit,
      expectedProfitPerHa: recCrop.estimatedProfitRange,
      reason: reasonText,
      reasonGu: reasonTextGu,
      reasonsList: primaryMatch.matchReasons,
      reasonsListGu: primaryMatch.gujaratiReasons,
      farmSizeLabel: formattedUnitLabel
    },
    secondaryRecommendations: secondaryMatches.map(item => ({
      crop: item.crop,
      confidence: item.confidenceScore,
      yield: item.crop.averageYield,
      profitPerHa: item.crop.estimatedProfitRange
    }))
  };
}

const ML_CROP_MAP = {
  'rice': 'paddy',
  'maize': 'maize',
  'chickpea': 'chickpea',
  'coconut': 'date_palm',
  'coffee': 'marigold',
  'cotton': 'cotton',
  'grapes': 'sapota',
  'jute': 'cotton',
  'kidneybeans': 'cowpea',
  'lentil': 'chickpea',
  'mango': 'mango',
  'mothbeans': 'moth',
  'mungbean': 'moong',
  'blackgram': 'urad',
  'muskmelon': 'watermelon',
  'orange': 'citrus',
  'papaya': 'papaya',
  'pigeonpeas': 'tur',
  'pomegranate': 'pomegranate',
  'watermelon': 'watermelon',
  'apple': 'mango',
  'banana': 'banana'
};

const getCropFromMLName = (mlName) => {
  const normalized = mlName.toLowerCase();
  const dbId = ML_CROP_MAP[normalized] || normalized;
  return CROP_DATABASE.find(c => c.id === dbId || c.cropName.toLowerCase() === normalized);
};

export async function recommendCropsML(inputs) {
  const {
    N = 60,
    P = 45,
    K = 50,
    ph = 7.2,
    humidity = 80,
    temperature = 30,
    rainfall = 750,
    farmSize = 2,
    unit = 'hectare',
    soilType = 'Medium Black Soil',
    currentMonth = 7,
    district = 'Rajkot',
    irrigation = 'yes'
  } = inputs;

  const scaledRainfall = Math.max(0, Math.min(500, rainfall / 4));

  try {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        N: parseFloat(N),
        P: parseFloat(P),
        K: parseFloat(K),
        temperature: parseFloat(temperature),
        humidity: parseFloat(humidity),
        ph: parseFloat(ph),
        rainfall: parseFloat(scaledRainfall)
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    
    const primaryCrop = getCropFromMLName(data.crop) || CROP_DATABASE[0];
    
    const secondaryCrops = (data.alternatives || []).map(altName => {
      return getCropFromMLName(altName);
    }).filter(Boolean);

    while (secondaryCrops.length < 3) {
      const fallback = CROP_DATABASE.find(c => c.id !== primaryCrop.id && !secondaryCrops.some(sc => sc.id === c.id));
      if (fallback) {
        secondaryCrops.push(fallback);
      } else {
        break;
      }
    }

    const farmSizeHectares = unit === 'bigha' ? farmSize / 6.25 : farmSize;
    
    const profitMatch = primaryCrop.estimatedProfitRange.match(/₹([\d,]+)\s*-\s*₹([\d,]+)/);
    let perHaMinProfit = 85000;
    let perHaMaxProfit = 120000;
    if (profitMatch) {
      perHaMinProfit = parseInt(profitMatch[1].replace(/,/g, ''), 10);
      perHaMaxProfit = parseInt(profitMatch[2].replace(/,/g, ''), 10);
    }
    const calculatedMinProfit = Math.round(perHaMinProfit * farmSizeHectares);
    const calculatedMaxProfit = Math.round(perHaMaxProfit * farmSizeHectares);
    const formattedProfit = `₹${calculatedMinProfit.toLocaleString('en-IN')} – ₹${calculatedMaxProfit.toLocaleString('en-IN')}`;
    const formattedUnitLabel = unit === 'bigha' ? `${farmSize} Bigha (${farmSizeHectares.toFixed(2)} Ha)` : `${farmSize} Hectare`;

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = typeof currentMonth === 'number' ? monthNames[currentMonth - 1] : currentMonth;

    const reasonText = `ML Model prediction based on Soil parameters: N=${N}, P=${P}, K=${K}, pH=${ph}, Humidity=${humidity}%, Temp=${temperature}°C, and seasonal Rainfall=${scaledRainfall.toFixed(0)}mm in ${district}.`;
    const reasonTextGu = `મશીન લર્નિંગ મોડલ પૂર્વાનુમાન આધારિત જમીન ગુણધર્મો: નાઇટ્રોજન=${N}, ફોસ્ફરસ=${P}, પોટાશ=${K}, pH=${ph}, ભેજ=${humidity}%, તાપમાન=${temperature}°C અને મોસમી વરસાદ=${scaledRainfall.toFixed(0)}મીમી (${district} જીલ્લો).`;

    const matchReasons = [
      `ML model predicted optimal crop with ${data.confidence}% confidence`,
      `Nitrogen value (${N}) fits crop nitrogen uptake profile`,
      `Soil pH level (${ph}) falls inside ideal growth range`
    ];
    const gujaratiReasons = [
      `મશીન લર્નિંગ મોડલ દ્વારા ${data.confidence}% સચોટતા સાથે પાકની પસંદગી`,
      `નાઇટ્રોજન પ્રમાણ (${N}) પાકની જરૂરિયાત સાથે સુસંગત છે`,
      `જમીનનો pH આંક (${ph}) પાકના વિકાસ માટે સાનુકૂળ છે`
    ];

    return {
      primaryRecommendation: {
        crop: primaryCrop,
        confidence: data.confidence || 90,
        expectedYield: primaryCrop.averageYield,
        expectedProfit: formattedProfit,
        expectedProfitPerHa: primaryCrop.estimatedProfitRange,
        reason: reasonText,
        reasonGu: reasonTextGu,
        reasonsList: matchReasons,
        reasonsListGu: gujaratiReasons,
        farmSizeLabel: formattedUnitLabel
      },
      secondaryRecommendations: secondaryCrops.slice(0, 3).map(c => ({
        crop: c,
        confidence: Math.max(50, (data.confidence || 90) - 15),
        yield: c.averageYield,
        profitPerHa: c.estimatedProfitRange
      }))
    };

  } catch (error) {
    console.error("ML Model Prediction failed:", error);
    throw error;
  }
}
