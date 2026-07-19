export const GUJARAT_REGIONS = [
  {
    id: 'north',
    name: 'North Gujarat',
    nameGu: 'ઉત્તર ગુજરાત',
    color: '#3b82f6',
    bgLight: '#eff6ff',
    accentColor: '#2563eb',
    description: 'Arid to semi-arid region with sandy loam soils, tubewell irrigation, and major hub for mustard, castor, cumin, & potatoes.',
    descriptionGu: 'ગોરાડુ અને રેતાળ જમીન, ટ્યુબવેલ પિયત અને રાયડો, એરંડા, જીરું તથા બટાટાનું મુખ્ય ઉત્પાદક ક્ષેત્ર.',
    soilTypes: ['Goradu / Red Loamy (ગોરાડુ જમીન)', 'Sandy Loam (રેતાળ જમીન)', 'Alluvial Silt (કાંપની જમીન)'],
    climate: 'Dry & semi-arid; low to moderate rainfall (500-800 mm). Extreme summers (35-44°C) & cool winters (12-28°C).',
    climateGu: 'સૂકું અને અર્ધ-સૂકું વાતાવરણ; સામાન્ય વરસાદ (500-800 મીમી). ઉનાળામાં સખત ગરમી અને શિયાળામાં આહલાદક ઠંડી.',
    districts: [
      {
        name: 'Banaskantha',
        nameGu: 'બનાસકાંઠા',
        talukas: ['Palanpur', 'Dantiwada', 'Deesa', 'Dhanera', 'Kankrej', 'Patan', 'Tharad', 'Vav', 'Bhabhar', 'Shihori']
      },
      {
        name: 'Patan',
        nameGu: 'પાટણ',
        talukas: ['Patan', 'Sidhpur', 'Chanasma', 'Harij', 'Sami', 'Radhanpur', 'Santalpur', 'Saraswati']
      },
      {
        name: 'Mehsana',
        nameGu: 'મહેસાણા',
        talukas: ['Mehsana', 'Unjha', 'Visnagar', 'Vadnagar', 'Kheralu', 'Satlasana', 'Kadi', 'Becharaji', 'Jotana']
      },
      {
        name: 'Sabarkantha',
        nameGu: 'સાબરકાંઠા',
        talukas: ['Himatnagar', 'Idar', 'Khedbrahma', 'Vadali', 'Talod', 'Prantij', 'Vijaynagar']
      },
      {
        name: 'Aravalli',
        nameGu: 'અરવલ્લી',
        talukas: ['Modasa', 'Bhiloda', 'Bayad', 'Dhansura', 'Malpur', 'Meghraj']
      },
      {
        name: 'Gandhinagar',
        nameGu: 'ગાંધીનગર',
        talukas: ['Gandhinagar', 'Kalol', 'Dehgam', 'Mansa']
      }
    ]
  },
  {
    id: 'south',
    name: 'South Gujarat',
    nameGu: 'દક્ષિણ ગુજરાત',
    color: '#10b981',
    bgLight: '#ecfdf5',
    accentColor: '#059669',
    description: 'High rainfall zone with fertile deep black soils, Ukai canal network, famous for Sugarcane, Paddy, Mango, and Banana.',
    descriptionGu: 'ભારે વરસાદી ક્ષેત્ર, ફળદ્રુપ કાળી જમીન, ઉકાઈ કેનાલ પિયત અને શેરડી, ડાંગર, કેરી તથા કેળાનું ઉચ્ચ ઉત્પાદન.',
    soilTypes: ['Deep Black Soil (ઊંડી કાળી જમીન)', 'Coastal Saline Clay (દરિયાકાંઠાની કાળી જમીન)', 'Alluvial Silt (કાંપની જમીન)'],
    climate: 'Humid & tropical high rainfall zone (1200-2500 mm). Moderate temperatures (20-36°C).',
    climateGu: 'ભેજવાળું અને ભારે વરસાદી ક્ષેત્ર (1200-2500 મીમી). અનુકૂળ તાપમાન.',
    districts: [
      {
        name: 'Surat',
        nameGu: 'સુરત',
        talukas: ['Choryasi', 'Olpad', 'Kamrej', 'Mandvi', 'Mangrol', 'Bardoli', 'Mahuva', 'Palsana', 'Umarpada']
      },
      {
        name: 'Navsari',
        nameGu: 'નવસારી',
        talukas: ['Navsari', 'Jalalpore', 'Gandevi', 'Chikhli', 'Bansda', 'Khergam']
      },
      {
        name: 'Valsad',
        nameGu: 'વલસાડ',
        talukas: ['Valsad', 'Pardi', 'Vapi', 'Umbergaon', 'Kaprada', 'Dharampur']
      },
      {
        name: 'Tapi',
        nameGu: 'તાપી',
        talukas: ['Vyara', 'Songadh', 'Valod', 'Uchchhal', 'Nijhar', 'Kukarmunda']
      },
      {
        name: 'Bharuch',
        nameGu: 'ભરૂચ',
        talukas: ['Bharuch', 'Ankleshwar', 'Jambusar', 'Vagra', 'Hansot', 'Jhajhadia', 'Valia']
      },
      {
        name: 'Narmada',
        nameGu: 'નર્મદા',
        talukas: ['Rajpipla', 'Nandod', 'Dediapada', 'Sagbara', 'Garudeshwar', 'Tilakwada']
      },
      {
        name: 'Dang',
        nameGu: 'ડાંગ',
        talukas: ['Ahwa', 'Subir', 'Waghai']
      }
    ]
  },
  {
    id: 'central',
    name: 'Central Gujarat',
    nameGu: 'મધ્ય ગુજરાત',
    color: '#f59e0b',
    bgLight: '#fffbeb',
    accentColor: '#d97706',
    description: 'Charotar golden leaf tobacco belt, Narmada canal command area, rich goradu soil yielding Tobacco, Wheat, Paddy, & Pulses.',
    descriptionGu: 'ચરોતર સોનેરી પત્તી તમાકુ બેલ્ટ, નર્મદા કેનાલ પિયત, ગોરાડુ જમીન અને ઘઉં, ડાંગર, તમાકુ તથા કઠોળનું વાવેતર.',
    soilTypes: ['Goradu / Red Loamy (ગોરાડુ જમીન)', 'Medium Black Soil (મધ્યમ કાળી જમીન)', 'Alluvial Silt (કાંપની જમીન)'],
    climate: 'Moderate rainfall zone (800-1100 mm). Moderate to warm temperatures (18-38°C).',
    climateGu: 'મધ્યમ વરસાદ (800-1100 મીમી). સાનુકૂળ હવામાન અને નર્મદા કેનાલ સુવિધા.',
    districts: [
      {
        name: 'Ahmedabad',
        nameGu: 'અમદાવાદ',
        talukas: ['Daskroi', 'Sanand', 'Bavla', 'Dholka', 'Dhandhuka', 'Viramgam', 'Mandal', 'Detroj']
      },
      {
        name: 'Kheda',
        nameGu: 'ખેડા',
        talukas: ['Nadiad', 'Kheda', 'Matar', 'Mahudha', 'Kapadvanj', 'Thasra', 'Galteshwar', 'Vaso']
      },
      {
        name: 'Anand',
        nameGu: 'આણંદ',
        talukas: ['Anand', 'Petlad', 'Borsad', 'Khambhat', 'Umreth', 'Tarapur', 'Anklav', 'Sojitra']
      },
      {
        name: 'Vadodara',
        nameGu: 'વડોદરા',
        talukas: ['Vadodara', 'Padra', 'Karjan', 'Dabhoi', 'Waghodia', 'Savli', 'Desar']
      },
      {
        name: 'Panchmahal',
        nameGu: 'પંચમહાલ',
        talukas: ['Godhra', 'Halol', 'Kalol', 'Ghoghamba', 'Shehra', 'Morwa Hadaf']
      },
      {
        name: 'Dahod',
        nameGu: 'દાહોદ',
        talukas: ['Dahod', 'Limkheda', 'Jhalod', 'Fatepura', 'Garbada', 'Devgadh Baria', 'Dhanpur']
      },
      {
        name: 'Mahisagar',
        nameGu: 'મહીસાગર',
        talukas: ['Lunawada', 'Santrampur', 'Kadana', 'Virpur', 'Balasinor', 'Khanpur']
      }
    ]
  },
  {
    id: 'saurashtra',
    name: 'Saurashtra',
    nameGu: 'સૌરાષ્ટ્ર',
    color: '#e11d48',
    bgLight: '#fff1f2',
    accentColor: '#be123c',
    description: 'Heartland of Groundnut & Cotton, medium black volcanic soil, SAUNI scheme water, famous for Kesar Mango in Gir.',
    descriptionGu: 'મગફળી અને કપાસનો સુવર્ણ ગઢ, મધ્યમ કાળી જમીન, સોની યોજના પિયત અને ગીરની પ્રખ્યાત કેસર કેરી.',
    soilTypes: ['Medium Black Volcanic (મધ્યમ કાળી જમીન)', 'Shallow Black Soil (છીછરી કાળી જમીન)', 'Coastal Sandy Silt (દરિયાકાંઠાની જમીન)'],
    climate: 'Semi-arid with monsoon variations (600-900 mm). Warm summers (28-42°C), mild winters.',
    climateGu: 'અર્ધ-સૂકું વાતાવરણ (600-900 મીમી). ઉનાળામાં ગરમી અને પિયત સુવિધા આધારિત ખેતી.',
    districts: [
      {
        name: 'Rajkot',
        nameGu: 'રાજકોટ',
        talukas: ['Rajkot', 'Gondal', 'Jetpur', 'Dhoraji', 'Upleta', 'Jasdan', 'Kotda Sangani', 'Lodhika', 'Paddhari']
      },
      {
        name: 'Junagadh',
        nameGu: 'જૂનાગઢ',
        talukas: ['Junagadh', 'Keshod', 'Manavadar', 'Vanthali', 'Mendarda', 'Visavadar', 'Bhesan', 'Malia Hatina']
      },
      {
        name: 'Amreli',
        nameGu: 'અમરેલી',
        talukas: ['Amreli', 'Dhari', 'Babra', 'Savarkundla', 'Lathi', 'Rajula', 'Jafrabad', 'Khambha', 'Kunkavav', 'Lilia']
      },
      {
        name: 'Bhavnagar',
        nameGu: 'ભાવનગર',
        talukas: ['Bhavnagar', 'Palitana', 'Talaja', 'Mahuva', 'Gariadhar', 'Sihor', 'Gadhada', 'Botad', 'Vallabhipur', 'Umapada']
      },
      {
        name: 'Jamnagar',
        nameGu: 'ામનગર',
        talukas: ['Jamnagar', 'Lalpur', 'Jamjodhpur', 'Kalavad', 'Dhrol', 'Jodiya']
      },
      {
        name: 'Devbhumi Dwarka',
        nameGu: 'દેવભૂમિ દ્વારકા',
        talukas: ['Khambhalia', 'Dwarka', 'Kalyanpur', 'Bhanvad']
      },
      {
        name: 'Gir Somnath',
        nameGu: 'ગીર સોમનાથ',
        talukas: ['Veraval', 'Talala', 'Kodinar', 'Una', 'Gir Gadhada', 'Sutrapada']
      },
      {
        name: 'Porbandar',
        nameGu: 'પોરબંદર',
        talukas: ['Porbandar', 'Ranavav', 'Kutiyana']
      },
      {
        name: 'Surendranagar',
        nameGu: 'સુરેન્દ્રનગર',
        talukas: ['Wadhwan', 'Chotila', 'Limbdi', 'Sayla', 'Dhrangadhra', 'Lakhtar', 'Muli', 'Dasada']
      },
      {
        name: 'Morbi',
        nameGu: 'મોરબી',
        talukas: ['Morbi', 'Wankaner', 'Halvad', 'Tankara', 'Maliya Miyana']
      }
    ]
  },
  {
    id: 'kachchh',
    name: 'Kachchh',
    nameGu: 'કચ્છ',
    color: '#8b5cf6',
    bgLight: '#f5f3ff',
    accentColor: '#6d28d9',
    description: 'Arid desert & coastal terrain, drip irrigation pioneer, renowned for high-value Date Palm, Dragon Fruit, Pomegranate & Castor.',
    descriptionGu: 'સૂકો રણ વિસ્તાર, ડ્રીપ ઇરિગેશનનું પ્રણેતા, ખજૂર, ડ્રેગન ફ્રુટ, દાડમ, એરંડા અને ઇસબગુલનું નફાકારક વાવેતર.',
    soilTypes: ['Desert Sandy Soil (રેતાળ જમીન)', 'Coastal Saline Clay (ખારાશવાળી ક્ષારીય જમીન)', 'Sandy Loam (રેતાળ ગોરાડુ જમીન)'],
    climate: 'Extreme arid climate; low rainfall (300-500 mm). High summer heat (32-45°C), cool winters (10-25°C).',
    climateGu: 'સૂકું વાતાવરણ; ઓછો વરસાદ (300-500 મીમી). ઉનાળામાં સખત તાપમાન અને ઠંડો શિયાળો.',
    districts: [
      {
        name: 'Kachchh',
        nameGu: 'કચ્છ',
        talukas: ['Bhuj', 'Anjar', 'Mandvi', 'Mundra', 'Nakhatrana', 'Rapar', 'Lakhpat', 'Abdasa', 'Bhachau', 'Gandhidham']
      }
    ]
  }
];

export const SOIL_TYPES_LIST = [
  { id: 'medium_black', name: 'Medium Black Soil', nameGu: 'મધ્યમ કાળી જમીન', description: 'Rich in moisture retention, ideal for Groundnut, Cotton, Wheat.' },
  { id: 'deep_black', name: 'Deep Black Soil', nameGu: 'ઊંડી કાળી જમીન', description: 'High clay content, fertile, excellent for Sugarcane, Paddy, Cotton.' },
  { id: 'goradu', name: 'Goradu / Red Loamy Soil', nameGu: 'ગોરાડુ / લાલ ડોળિયાવાળી જમીન', description: 'Well drained loamy soil, ideal for Tobacco, Vegetables, Pulses, Wheat.' },
  { id: 'sandy_loam', name: 'Sandy Loam Soil', nameGu: 'રેતાળ ગોરાડુ જમીન', description: 'Light textured, ideal for Castor, Cumin, Mustard, Fennel, Bajra.' },
  { id: 'alluvial', name: 'Alluvial Silt Soil', nameGu: 'કાંપની ફળદ્રુપ જમીન', description: 'River basin deposit soil, highly fertile for Wheat, Paddy, Potato, Maize.' },
  { id: 'coastal_saline', name: 'Coastal Saline & Clay Soil', nameGu: 'દરિયાકાંઠાની ક્ષારીય જમીન', description: 'Saline tolerant crops like Dates, Coconut, Bajra, Cotton.' },
  { id: 'desert_sand', name: 'Desert Sandy Soil', nameGu: 'રણ પ્રદેશની રેતાળ જમીન', description: 'Porous sand, requires drip irrigation; perfect for Dates, Pomegranate, Dragon Fruit.' }
];

export const MONTHS_LIST = [
  { value: 1, name: 'January (જાન્યુઆરી)' },
  { value: 2, name: 'February (ફેબ્રુઆરી)' },
  { value: 3, name: 'March (માર્ચ)' },
  { value: 4, name: 'April (એપ્રિલ)' },
  { value: 5, name: 'May (મે)' },
  { value: 6, name: 'June (જૂન - ચોમાસુ વાવણી)' },
  { value: 7, name: 'July (જુલાઈ - મુખ્ય વાવણી)' },
  { value: 8, name: 'August (ઓગસ્ટ)' },
  { value: 9, name: 'September (સપ્ટેમ્બર)' },
  { value: 10, name: 'October (ઓક્ટોબર - શિયાળુ વાવણી)' },
  { value: 11, name: 'November (નવેમ્બર - રવિ પાક)' },
  { value: 12, name: 'December (ડિસેમ્બર)' }
];
