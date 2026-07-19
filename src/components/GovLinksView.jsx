import React from 'react';
import { ArrowLeft, ExternalLink, Link2, ShieldCheck, FileText, CloudSun, HelpCircle, Landmark } from 'lucide-react';

export default function GovLinksView({ lang, onBack }) {
  
  const categories = [
    {
      id: 'schemes',
      titleEn: 'Agriculture Schemes & Subsidies',
      titleGu: 'સરકારી યોજનાઓ & સબસિડીઓ',
      icon: <Landmark className="w-5.5 h-5.5 text-emerald-500" />,
      items: [
        {
          nameEn: 'i-Khedut Portal',
          nameGu: 'આઇ-ખેડૂત પોર્ટલ',
          descEn: 'Apply for agricultural machinery, tractors, drip irrigation systems, and inputs subsidies in Gujarat.',
          descGu: 'ટ્રેક્ટર, પિયત સાધનો, દવા પંપ, અને વિવિધ કૃષિ સબસિડીઓ માટે ઓનલાઇન અરજી કરવાનું ગુજરાત સરકારનું સત્તાવાર પોર્ટલ.',
          url: 'https://ikhedut.gujarat.gov.in/',
          badge: 'Gujarat Gov'
        },
        {
          nameEn: 'PM-Kisan Samman Nidhi',
          nameGu: 'પીએમ-કિસાન યોજના',
          descEn: 'Check enrollment status, beneficiary list, and direct DBT installment updates (₹6,000 yearly).',
          descGu: 'વર્ષે ₹૬,૦૦૦ની સીધી આર્થિક સહાય મેળવતી કેન્દ્ર સરકારની સ્કીમની અરજી અને હપ્તાની સ્થિતિ ચેક કરો.',
          url: 'https://pmkisan.gov.in/',
          badge: 'Central Gov'
        }
      ]
    },
    {
      id: 'market_insurance',
      titleEn: 'Market Rates (APMC) & Insurance',
      titleGu: 'બજાર ભાવો & પાક વીમો',
      icon: <FileText className="w-5.5 h-5.5 text-amber-500" />,
      items: [
        {
          nameEn: 'AGMARKNET Mandi Prices',
          nameGu: 'એગમાર્કનેટ બજાર ભાવ',
          descEn: 'Check daily real-time market rates and APMC commodity prices across Gujarat and India.',
          descGu: 'ગુજરાત અને ભારતના જુદા-જુદા ખેતીવાડી ઉત્પન્ન બજાર સમિતિ (APMC) ના દૈનિક પાક બજાર ભાવો જુઓ.',
          url: 'https://agmarknet.gov.in/',
          badge: 'All India Rates'
        },
        {
          nameEn: 'PM Fasal Bima Yojana (PMFBY)',
          nameGu: 'પીએમ પાક વીમા યોજના',
          descEn: 'Calculate crop insurance premium, apply online, and report crop damages due to weather.',
          descGu: 'પાક વીમાનું પ્રીમિયમ ગણો, યોજનામાં જોડાઓ અને કમોસમી વરસાદ કે આફતથી થયેલ નુકસાનની ફરિયાદ નોંધાવો.',
          url: 'https://pmfby.gov.in/',
          badge: 'Crop Insurance'
        }
      ]
    },
    {
      id: 'land_soil',
      titleEn: 'Soil Cards & Land Records',
      titleGu: 'જમીન રેકોર્ડ & સોઇલ હેલ્થ',
      icon: <ShieldCheck className="w-5.5 h-5.5 text-emerald-500" />,
      items: [
        {
          nameEn: 'AnyROR @ Anywhere',
          nameGu: 'AnyROR ગામના નમૂના ૭/૧૨',
          descEn: 'Official land records portal of Gujarat. View and download 7/12, 8A, and official land maps.',
          descGu: 'જમીનના ગામ નમૂના નંબર ૭/૧૨, ૮-અ ની નકલ અને જમીનના હક્ક પત્રકો ઓનલાઇન મેળવવાનું પોર્ટલ.',
          url: 'https://anyror.gujarat.gov.in/',
          badge: 'Gujarat Land Records'
        },
        {
          nameEn: 'Soil Health Card Portal',
          nameGu: 'સોઇલ હેલ્થ કાર્ડ પોર્ટલ',
          descEn: 'Track soil testing status, find regional testing labs, and download your soil test report.',
          descGu: 'જમીનની ફળદ્રુપતા ચકાસણીની સ્થિતિ જાણો અને તમારી જમીનનું સોઇલ હેલ્થ રિપોર્ટ કાર્ડ ડાઉનલોડ કરો.',
          url: 'https://soilhealth.dac.gov.in/',
          badge: 'Soil Testing'
        }
      ]
    },
    {
      id: 'weather_advice',
      titleEn: 'Weather & Extension Advisories',
      titleGu: 'હવામાન & કૃષિ સલાહ સેવાઓ',
      icon: <CloudSun className="w-5.5 h-5.5 text-amber-500" />,
      items: [
        {
          nameEn: 'IMD Gujarat (Mausam)',
          nameGu: 'IMD ગુજરાત હવામાન વિભાગ',
          descEn: 'Access daily weather updates, regional rainfall maps, and warnings for storms or dry spells.',
          descGu: 'ભારતીય હવામાન વિભાગની સત્તાવાર વેબસાઇટ. વરસાદની આગાહી અને વાવાઝોડા કે આફતની માહિતી મેળવો.',
          url: 'https://mausam.imd.gov.in/',
          badge: 'IMD Mausam'
        },
        {
          nameEn: 'Kisan Suvidha Portal',
          nameGu: 'કિસાન સુવિધા પોર્ટલ',
          descEn: 'Unified portal connecting farmers to weather, market dealers, crop advice, and scientists.',
          descGu: 'હવામાન, બજાર ભાવો, ખાતર વિક્રેતાઓ, કૃષિ સલાહ અને વૈજ્ઞાનિકો સાથે જોડતું સંયુક્ત સરકારી પોર્ટલ.',
          url: 'https://kisansuvidha.gov.in/',
          badge: 'Unified Portal'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      
      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-emerald-500 transition-all duration-300 font-extrabold text-xs tracking-wider uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-500" />
          <span>{lang === 'gu' ? 'પાછા જાઓ (Back)' : 'Back'}</span>
        </button>
      </div>

      {/* Main Header Card */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center space-x-3.5 mb-2">
          <div className="p-2.5 bg-slate-950 rounded-xl text-emerald-500 border border-slate-850">
            <Link2 className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            {lang === 'gu' ? 'સરકારી કૃષિ યોજનાઓ & ઉપયોગી લિંક્સ' : 'Useful Government Portals Directory'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 font-semibold ml-1">
          {lang === 'gu'
            ? 'ગુજરાત સરકાર અને ભારત સરકારના સત્તાવાર પોર્ટલ્સ. સબસિડી અરજી, બજાર ભાવો, જમીનના રેકોર્ડ્સ અને હવામાનની માહિતી એક જ જગ્યાએ.'
            : 'Official Central & State Government portals. Access subsidies, mandi prices, 7/12 land records, and weather advisories instantly.'}
        </p>
      </div>

      {/* Categorized Portals Layout */}
      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-4">
            
            {/* Category Header */}
            <div className="flex items-center space-x-3 px-1">
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-850">
                {cat.icon}
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-100 tracking-tight">
                {lang === 'gu' ? cat.titleGu : cat.titleEn}
              </h3>
            </div>

            {/* Portal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.items.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/80 rounded-3xl p-6 shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    
                    {/* Card Header & Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-lg font-black text-slate-100 group-hover:text-emerald-450 transition-colors duration-300">
                        {lang === 'gu' ? item.nameGu : item.nameEn}
                      </h4>
                      <span className="bg-slate-955 text-emerald-500 border border-slate-850 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap">
                        {item.badge}
                      </span>
                    </div>

                    {/* Card Description */}
                    <p className="text-xs sm:text-sm text-slate-350 font-medium leading-relaxed">
                      {lang === 'gu' ? item.descGu : item.descEn}
                    </p>
                  </div>

                  {/* Visit Link Button */}
                  <div className="pt-5 mt-5 border-t border-slate-855 flex justify-end">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 px-4.5 py-2.5 rounded-xl bg-slate-955 hover:bg-slate-950 border border-slate-850 hover:border-emerald-500/40 text-xs font-black text-slate-205 hover:text-emerald-500 transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      <span>{lang === 'gu' ? 'વેબસાઇટની મુલાકાત લો' : 'Visit Portal'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
