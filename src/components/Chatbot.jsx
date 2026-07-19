import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, User } from 'lucide-react';

export default function Chatbot({ lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: lang === 'gu' 
        ? 'નમસ્તે! હું કૃષિ મિત્ર છું. મને ગુજરાતની જમીન, પાકની વાવણી, ખાતર ડોઝ, રોગ નિયંત્રણ અથવા નફા વિશે પૂછો!' 
        : 'Hello! I am Krishi Mitr. Ask me anything about Gujarat soils, crop sowing, fertilizer doses, pest control, or profits!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Adjust welcome message language dynamically if updated
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 1) {
        return [{
          id: 1,
          sender: 'bot',
          text: lang === 'gu'
            ? 'નમસ્તે! હું કૃષિ મિત્ર છું. મને ગુજરાતની જમીન, પાકની વાવણી, ખાતર ડોઝ, રોગ નિયંત્રણ અથવા નફા વિશે પૂછો!'
            : 'Hello! I am Krishi Mitr. Ask me anything about Gujarat soils, crop sowing, fertilizer doses, pest control, or profits!',
          time: prev[0].time
        }];
      }
      return prev;
    });
  }, [lang]);

  const getChatResponse = (input) => {
    const text = input.toLowerCase();

    // Multilingual AI Keyword responder logic
    if (text.includes('cotton') || text.includes('કપાસ')) {
      return lang === 'gu'
        ? 'કપાસ (Bt Cotton) સૌરાષ્ટ્ર અને મધ્ય ગુજરાત માટે બેસ્ટ છે. વાવણી જૂન મહિનામાં થાય છે. મુખ્ય રોગ: ગુલાબી ઈયળ (Pink Bollworm). ખાતર: ૧૬૦:૮૦:૮૦ NPK (કિગ્રા/હેક્ટર). સરેરાશ નફો: ₹૯૫,૦૦૦ - ₹૧,૫૦,૦૦૦/હેક્ટર.'
        : 'Cotton (Bt Cotton) is best suited for Saurashtra & Central Gujarat in deep black soils. Sowing: June. Key pest: Pink Bollworm (install pheromone traps). Fertilizer: 160:80:80 NPK. Profit: ₹95,000 - ₹1,50,000 per hectare.';
    }

    if (text.includes('groundnut') || text.includes('peanut') || text.includes('મગફળી')) {
      return lang === 'gu'
        ? 'મગફળી સૌરાષ્ટ્રનો મુખ્ય ખરીફ પાક છે. વાવણી જૂન/જુલાઈમાં થાય છે. મુખ્ય રોગ: ટિક્કા રોગ (Tikka leaf spot). ખાતર: ૨૫:૫૦:૨૦ NPK + ૫૦૦ કિગ્રા જીપ્સમ/હેક્ટર. સરેરાશ નફો: ₹૮૫,૦૦૦ - ₹૧,૩૦,૦૦૦/હેક્ટર.'
        : 'Groundnut (peanut) is the flagship Kharif oilseed of Saurashtra. Sowing: June/July. Key disease: Tikka Leaf Spot (spray Mancozeb). Fertilizer: 25:50:20 NPK + Gypsum 500kg/ha. Profit: ₹85,000 - ₹1,30,000 per hectare.';
    }

    if (text.includes('cumin') || text.includes('jeera') || text.includes('જીરું')) {
      return lang === 'gu'
        ? 'જીરું એક ઉચ્ચ મૂલ્યનો શિયાળુ પાક છે, જે ઉત્તર ગુજરાત અને સૌરાષ્ટ્રમાં થાય છે. વાવણી ઓક્ટોબર/નવેમ્બરમાં થાય છે. તેને બિલકુલ ઓછું પાણી જોઈએ છે. ચરમી રોગ (Blight) થી બચાવવા મેન્કોઝેબનો છંટકાવ કરો. નફો: ₹૧,૧૦,૦૦૦ - ₹૨,૨૦,૦૦૦/હેક્ટર.'
        : 'Cumin (Jeera) is a high-value Rabi spice crop in North Gujarat & Saurashtra. Sowing: Oct/Nov. Needs very low water. Key disease: Blight (spray Mancozeb). Profit: ₹1,10,000 - ₹2,20,000 per hectare.';
    }

    if (text.includes('wheat') || text.includes('ghau') || text.includes('ઘઉં')) {
      return lang === 'gu'
        ? 'ઘઉં મુખ્ય રવિ પાક છે. ભાલ પ્રદેશના ભાલિયા ઘઉં ખૂબ જ પ્રખ્યાત છે. વાવણી નવેમ્બરમાં થાય છે. સરેરાશ ૫ થી ૬ પિયત (પાણી) આપવા પડે છે. ખાતર: ૧૨૦:૬૦:૪૦ NPK. સરેરાશ નફો: ₹૬૫,૦૦૦ - ₹૧,૦૫,૦૦૦/હેક્ટર.'
        : 'Wheat (Ghau) is a major Rabi cereal. Bhalia durum wheat is famous in the Bhal tract. Sowing: November. Requires 5-6 critical irrigations. Fertilizer: 120:60:40 NPK. Profit: ₹65,000 - ₹1,05,000 per hectare.';
    }

    if (text.includes('castor') || text.includes('erando') || text.includes('એરંડા')) {
      return lang === 'gu'
        ? 'ગુજરાત એરંડા ઉત્પાદનમાં વિશ્વમાં મોખરે છે. તે રેતાળ અને ગોરાડુ જમીન માટે ઉત્તમ છે. વાવણી જુલાઈ/ઓગસ્ટમાં થાય છે. નફો: ₹૯૦,૦૦૦ - ₹૧,૪૦,૦૦૦/હેક્ટર.'
        : 'Castor (Erando) is a highly drought-tolerant industrial oilseed crop. Gujarat is the world leader. Sowing: July/August. Profit: ₹90,000 - ₹1,40,000 per hectare.';
    }

    if (text.includes('mustard') || text.includes('rai') || text.includes('રાયડો') || text.includes('રાઈ')) {
      return lang === 'gu'
        ? 'રાયડો ઓછું પાણી અને ઓછો ખર્ચ માગતો શિયાળુ પાક છે, જે ઉત્તર ગુજરાતમાં થાય છે. વાવણી ઓક્ટોબર/નવેમ્બરમાં થાય છે. મુખ્ય જીવાત: મોલો (Aphids). નફો: ₹૬૫,૦૦૦ - ₹૯૮,૦૦૦/હેક્ટર.'
        : 'Mustard (Raiyado) is a low-cost, low-water Rabi oilseed crop. Sowing: October/November. Key pest: Aphids (spray Imidacloprid). Profit: ₹65,000 - ₹98,000 per hectare.';
    }

    if (text.includes('sugarcane') || text.includes('sherdi') || text.includes('શેરડી')) {
      return lang === 'gu'
        ? 'શેરડી દક્ષિણ ગુજરાતનો મુખ્ય રોકડીયો પાક છે. તેને વર્ષમાં ૩૦ થી ૩૬ વખત પિયત (વધુ પાણી) આપવું પડે છે. નફો: ₹૧,૮૦,૦૦૦ - ₹૨,૮૦,૦૦૦/હેક્ટર.'
        : 'Sugarcane (Sherdi) is a heavy-rainfall crop suited for South & Central Gujarat. Sowing: Oct-Jan. Needs high water (30-36 irrigations). Profit: ₹1,80,000 - ₹2,80,000 per hectare.';
    }

    if (text.includes('mango') || text.includes('kesar') || text.includes('કેરી')) {
      return lang === 'gu'
        ? 'ગીર કેસર કેરી ગુજરાતનું ગૌરવ છે, જે ખાસ કરીને ગીર (સૌરાષ્ટ્ર) માં ઉગાડવામાં આવે છે. સ્થાપિત બગીચાઓ હેક્ટરે વાર્ષિક ₹૩.૫ થી ૭ લાખનો નફો આપે છે.'
        : 'Gir Kesar Mango is a GI-tagged pride fruit of Gujarat (especially Saurashtra). Established orchards yield high annual profits of ₹3.5L - ₹7L per hectare.';
    }

    if (text.includes('potato') || text.includes('batata') || text.includes('બટાટા')) {
      return lang === 'gu'
        ? 'બટાકા માટે બનાસકાંઠાનું ડીસા શહેર સમગ્ર ગુજરાતમાં પ્રખ્યાત છે. ગોરાડુ અને રેતાળ જમીન અનુકૂળ આવે છે. સરેરાશ નફો: ₹૧,૫૦,૦૦૦ - ₹૨,૮૦,૦૦૦/હેક્ટર.'
        : 'Potato (Batata) is the specialty crop of Deesa (Banaskantha) in North Gujarat. Sown in Oct/Nov. Yield: 30-45 tons/ha. Profit: ₹1,50,000 - ₹2,80,000 per hectare.';
    }

    if (text.includes('rice') || text.includes('paddy') || text.includes('ડાંગર')) {
      return lang === 'gu'
        ? 'ડાંગર (ચોખા) દક્ષિણ અને મધ્ય ગુજરાતની કાળી અને ચીકણી જમીનમાં ઉગાડાય છે. તેને પુષ્કળ ઊભું પાણી જોઈએ છે. નફો: ₹૭૦,૦૦૦ - ₹૧,૨૦,૦૦૦/હેક્ટર.'
        : 'Paddy/Rice (Danghar) is grown in high rainfall areas of South & Central Gujarat. Sown in June/July (transplanted). Profit: ₹70,000 - ₹1,20,000 per hectare.';
    }

    if (text.includes('chana') || text.includes('chickpea') || text.includes('ચણા')) {
      return lang === 'gu'
        ? 'ચણા મુખ્ય શિયાળુ કઠોળ પાક છે. જમીનમાં નાઇટ્રોજન ઉમેરે છે તેથી પાક ફેરબદલી માટે શ્રેષ્ઠ છે. વાવણી નવેમ્બરમાં થાય છે. નફો: ₹૬૫,૦૦૦ - ₹૧,૦૫,૦૦૦/હેક્ટર.'
        : 'Chickpea (Chana) is a major Rabi pulse. Fixes atmospheric nitrogen, making it great for crop rotation. Sowing: Oct/Nov. Profit: ₹65,000 - ₹1,05,000 per hectare.';
    }

    if (text.includes('kharek') || text.includes('date') || text.includes('ખજૂર')) {
      return lang === 'gu'
        ? 'ખજૂર (કચ્છ ખારેક) એ કચ્છ વિસ્તારનો સુવર્ણ પાક છે. ટિશ્યૂ કલ્ચર બારહી જાત ખૂબ નફાકારક છે. સરેરાશ નફો: ₹૬,૦૦,૦૦૦ - ₹૧૨,૦૦,૦૦૦/હેક્ટર!'
        : 'Date Palm (Kachchhi Kharek) is a high-value arid fruit crop of Kachchh. Elite tissue culture Barhee variety gives profits up to ₹6,00,000 - ₹12,00,000 per hectare!';
    }

    if (text.includes('til') || text.includes('sesame') || text.includes('તલ')) {
      return lang === 'gu'
        ? 'તલ એ ટૂંકા ગાળાનો તેલીબિયાં પાક છે. ઉનાળુ તલની ખેતી સૌરાષ્ટ્રમાં ખૂબ નફાકારક છે. સરેરાશ નફો: ₹૭૫,૦૦૦ - ₹૧,૨૦,૦૦૦/હેક્ટર.'
        : 'Sesame (Til) is a short-duration oilseed crop. Summer sesame is highly profitable in Saurashtra. Profit: ₹75,000 - ₹1,20,000 per hectare.';
    }

    if (text.includes('saurashtra') || text.includes('સૌરાષ્ટ્ર')) {
      return lang === 'gu'
        ? 'સૌરાષ્ટ્ર પ્રદેશ મધ્યમ કાળી જમીન ધરાવે છે. ઉત્તમ પાકો: મગફળી, કપાસ, જીરું, તલ, કેસર કેરી અને ચણા છે.'
        : 'Saurashtra has medium black clayey soil. Best suited crops are Groundnut, Cotton, Cumin, Sesame, Gir Kesar Mango, and Chickpea.';
    }

    if (text.includes('north') || text.includes('ઉત્તર')) {
      return lang === 'gu'
        ? 'ઉત્તર ગુજરાતમાં રેતાળ અને ગોરાડુ જમીન આવેલી છે. બેસ્ટ પાકો: એરંડા, જીરું, બટાટા, વરિયાળી અને બાજરી છે.'
        : 'North Gujarat features sandy loam and Goradu soils. Best crops are Castor, Cumin, Potato, Fennel, Bajra, and Mustard.';
    }

    if (text.includes('south') || text.includes('દક્ષિણ')) {
      return lang === 'gu'
        ? 'દક્ષિણ ગુજરાતમાં ભારે કાળી જમીન અને ઊંચો વરસાદ છે. બેસ્ટ પાકો: શેરડી, ડાંગર અને કેસર કેરી છે.'
        : 'South Gujarat has heavy black soil and high rainfall. Best suited crops are Sugarcane, Paddy (Rice), and Mango orchards.';
    }

    if (text.includes('central') || text.includes('મધ્ય')) {
      return lang === 'gu'
        ? 'મધ્ય ગુજરાત ફળદ્રુપ ગોરાડુ જમીન ધરાવે છે. બેસ્ટ પાકો: કપાસ, ઘઉં, ડાંગર, બટાટા અને વરિયાળી છે.'
        : 'Central Gujarat has rich Goradu/Alluvial soil. Recommended crops: Cotton, Wheat, Paddy, Potato, and Fennel.';
    }

    if (text.includes('kutch') || text.includes('kachchh') || text.includes('કચ્છ')) {
      return lang === 'gu'
        ? 'કચ્છ પ્રદેશમાં ખારાશવાળી અને રેતાળ જમીન છે. બેસ્ટ પાકો: કચ્છ ખારેક (ખજૂર), એરંડા, બાજરી અને ગવાર ગુંદર છે.'
        : 'Kachchh has sandy/coastal saline soil. Best crops: Date Palm (Kachchhi Kharek), Castor, Bajra, and Guar.';
    }

    if (text.includes('disease') || text.includes('pest') || text.includes('રોગ') || text.includes('જીવાત')) {
      return lang === 'gu'
        ? 'મુખ્ય રોગ નિયંત્રણ: મગફળીમાં ટિક્કા રોગ (મેન્કોઝેબનો છંટકાવ), કપાસમાં ગુલાબી ઈયળ (ફેરોમોન ટ્રેપ્સ), અને જીરામાં ચરમી રોગ (મેન્કોઝેબ).'
        : 'Disease management: Tikka leaf spot in groundnut (spray Mancozeb), Pink bollworm in cotton (pheromone traps), Blight in cumin (preventive Mancozeb).';
    }

    if (text.includes('fertilizer') || text.includes('npk') || text.includes('ખાતર')) {
      return lang === 'gu'
        ? 'ખાતર ડોઝ (NPK કિગ્રા/હેક્ટર): કપાસ (૧૬૦:૮૦:૮૦), ઘઉં (૧૨૦:૬૦:૪૦), મગફળી (૨૫:૫૦:૨૦ + ૫૦૦ કિગ્રા જીપ્સમ), અને એરંડા (૭૫:૫૦).'
        : 'Fertilizer doses (NPK kg/ha): Cotton (160:80:80), Wheat (120:60:40), Groundnut (25:50:20 + Gypsum 500kg/ha), and Castor (75:50).';
    }

    if (text.includes('profit') || text.includes('નફો') || text.includes('નફા')) {
      return lang === 'gu'
        ? 'સૌથી વધુ નફો આપતા પાકોમાં કચ્છ ખારેક (₹૬-૧૨ લાખ/હેક્ટર), કેસર કેરી (₹૩.૫-૭ લાખ/હેક્ટર), અને મરી-મસાલામાં જીરું (₹૧.૧-૨.૨ લાખ/હેક્ટર) મોખરે છે.'
        : 'Highest profit crops: Date Palm (₹6L - ₹12L/ha), Kesar Mango (₹3.5L - ₹7L/ha), and Cumin (₹1.1L - ₹2.2L/ha).';
    }

    return lang === 'gu'
      ? 'હું સમજી શક્યો નથી. કૃપા કરીને પાકનું નામ (મગફળી, કપાસ, જીરું), પ્રદેશ (સૌરાષ્ટ્ર, કચ્છ) અથવા રોગ/ખાતર લખીને પૂછો.'
      : "I couldn't quite catch that. Please type a crop name (groundnut, cotton, cumin), region (Saurashtra, Kachchh), or keywords like diseases/profit/fertilizer.";
  };

  const handleSendMessage = (textToSend = inputValue) => {
    if (!textToSend.trim()) return;

    // Append User Message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate bot thinking and reply
    setTimeout(() => {
      const replyText = getChatResponse(textToSend);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 450);
  };

  const suggestionChips = lang === 'gu' 
    ? [
        { label: 'સૌરાષ્ટ્ર માટે કયો પાક?', text: 'સૌરાષ્ટ્ર માટે કયો પાક?' },
        { label: 'કપાસમાં રોગ નિયંત્રણ', text: 'કપાસમાં રોગ નિયંત્રણ' },
        { label: 'સૌથી વધુ નફો આપતો પાક?', text: 'સૌથી વધુ નફો આપતો પાક?' },
        { label: 'જીરું ખાતર જરૂરિયાત', text: 'જીરું ખાતર જરૂરિયાત' }
      ]
    : [
        { label: 'Which crop for Saurashtra?', text: 'Which crop is best for Saurashtra?' },
        { label: 'Cotton pest control', text: 'Cotton pest control' },
        { label: 'Highest profit crops?', text: 'Highest profit crops?' },
        { label: 'Wheat fertilizer dose', text: 'Wheat fertilizer dose' }
      ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/30 hover:scale-105 transition-all duration-300 cursor-pointer border border-emerald-500 animate-bounce"
          style={{ animationDuration: '3s' }}
          title={lang === 'gu' ? 'ચેટ સહાયક ઓપન કરો' : 'Open Chat Assistant'}
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="bg-slate-900 border border-slate-800 w-92 max-w-[90vw] h-[480px] max-h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scale-up select-none">
          
          {/* Chat Header */}
          <div className="px-5 py-4 border-b border-slate-850 bg-slate-950 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center">
                <Bot className="w-5.5 h-5.5 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-100 flex items-center space-x-1.5">
                  <span>{lang === 'gu' ? 'કૃષિ મિત્ર એઆઈ' : 'Krishi Mitr AI'}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </h4>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-slate-450 font-bold uppercase">{lang === 'gu' ? 'ઓનલાઇન' : 'Online'}</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-850 hover:border-emerald-500/20 text-slate-350 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scrolling Panel */}
          <div className="flex-1 overflow-y-auto p-4.5 space-y-4 bg-slate-900/40 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Bot Avatar Icon */}
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-emerald-500" />
                  </div>
                )}

                {/* Message Bubble */}
                <div className="max-w-[78%] space-y-1">
                  <div
                    className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed border shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 border-emerald-500 text-white rounded-tr-none'
                        : 'bg-slate-955 border-slate-850 text-slate-205 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="block text-[9px] text-slate-500 font-extrabold text-right px-1">
                    {msg.time}
                  </span>
                </div>

                {/* User Avatar Icon */}
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/10 border border-emerald-600/30 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-emerald-500" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips Box */}
          <div className="px-3.5 py-2.5 border-t border-slate-850 bg-slate-955 flex flex-wrap gap-1.5 shrink-0 overflow-x-auto max-h-[85px]">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.text)}
                className="text-[10px] font-bold text-slate-300 hover:text-emerald-500 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 px-2.5 py-1.5 rounded-xl cursor-pointer transition-all duration-300 shrink-0 whitespace-nowrap"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Sending Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-slate-850 bg-slate-950 flex items-center space-x-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={lang === 'gu' ? 'કૃષિ મિત્રને પૂછો (મગફળી, જીરું)...' : 'Ask Krishi Mitr (cotton, cumin)...'}
              className="flex-1 bg-slate-900 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-semibold"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-555 text-white border border-emerald-500 flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer shrink-0"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
