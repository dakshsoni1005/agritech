import { CROP_DATABASE } from '../data/cropDatabase';


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
