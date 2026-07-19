# -*- coding: utf-8 -*-
"""
Krishi Mitr AI Chatbot - Python Edition
========================================
This script provides two modes:
1. Interactive CLI Mode: Chat with the agricultural advisor directly in your terminal.
2. Web API Server Mode: Run a local Flask API server to connect with frontends.

Usage:
  Interactive CLI: python krishi_chatbot.py
  Flask API Server: python krishi_chatbot.py --server
"""

import sys
import json
from datetime import datetime

# Localized Crop Knowledge Base
CROP_KNOWLEDGE = {
    'cotton': {
        'gu': 'કપાસ (Bt Cotton) સૌરાષ્ટ્ર અને મધ્ય ગુજરાત માટે બેસ્ટ છે. વાવણી જૂન મહિનામાં થાય છે. મુખ્ય રોગ: ગુલાબી ઈયળ (Pink Bollworm). ખાતર: ૧૬૦:૮૦:૮૦ NPK (કિગ્રા/હેક્ટર). સરેરાશ નફો: ₹૯૫,૦૦૦ - ₹૧,૫૦,૦૦૦/હેક્ટર.',
        'en': 'Cotton (Bt Cotton) is best suited for Saurashtra & Central Gujarat in deep black soils. Sowing: June. Key pest: Pink Bollworm (install pheromone traps). Fertilizer: 160:80:80 NPK. Profit: ₹95,000 - ₹1,50,000 per hectare.'
    },
    'groundnut': {
        'gu': 'મગફળી સૌરાષ્ટ્રનો મુખ્ય ખરીફ પાક છે. વાવણી જૂન/જુલાઈમાં થાય છે. મુખ્ય રોગ: ટિક્કા રોગ (Tikka leaf spot). ખાતર: ૨૫:૫૦:૨૦ NPK + ૫૦૦ કિગ્રા જીપ્સમ/હેક્ટર. સરેરાશ નફો: ₹૮૫,૦૦૦ - ₹૧,૩૦,૦૦૦/હેક્ટર.',
        'en': 'Groundnut (peanut) is the flagship Kharif oilseed of Saurashtra. Sowing: June/July. Key disease: Tikka Leaf Spot (spray Mancozeb). Fertilizer: 25:50:20 NPK + Gypsum 500kg/ha. Profit: ₹85,000 - ₹1,30,000 per hectare.'
    },
    'cumin': {
        'gu': 'જીરું એક ઉચ્ચ મૂલ્યનો શિયાળુ પાક છે, જે ઉત્તર ગુજરાત અને સૌરાષ્ટ્રમાં થાય છે. વાવણી ઓક્ટોબર/નવેમ્બરમાં થાય છે. તેને બિલકુલ ઓછું પાણી જોઈએ છે. ચરમી રોગ (Blight) થી બચાવવા મેન્કોઝેબનો છંટકાવ કરો. નફો: ₹૧,૧૦,૦૦૦ - ₹૨,૨ો,૦૦૦/હેક્ટર.',
        'en': 'Cumin (Jeera) is a high-value Rabi spice crop in North Gujarat & Saurashtra. Sowing: Oct/Nov. Needs very low water. Key disease: Blight (spray Mancozeb). Profit: ₹1,10,000 - ₹2,20,000 per hectare.'
    },
    'wheat': {
        'gu': 'ઘઉં મુખ્ય રવિ પાક છે. ભાલ પ્રદેશના ભાલિયા ઘઉં ખૂબ જ પ્રખ્યાત છે. વાવણી નવેમ્બરમાં થાય છે. સરેરાશ ૫ થી ૬ પિયત (પાણી) આપવા પડે છે. ખાતર: ૧૨૦:૬૦:૪૦ NPK. સરેરાશ નફો: ₹૬૫,૦૦૦ - ₹૧,૦૫,૦૦૦/હેક્ટર.',
        'en': 'Wheat (Ghau) is a major Rabi cereal. Bhalia durum wheat is famous in the Bhal tract. Sowing: November. Requires 5-6 critical irrigations. Fertilizer: 120:60:40 NPK. Profit: ₹65,000 - ₹1,05,000 per hectare.'
    },
    'castor': {
        'gu': 'ગુજરાત એરંડા ઉત્પાદનમાં વિશ્વમાં મોખરે છે. તે રેતાળ અને ગોરાડુ જમીન માટે ઉત્તમ છે. વાવણી જુલાઈ/ઓગસ્ટમાં થાય છે. નફો: ₹૯૦,૦૦૦ - ₹૧,૪૦,૦૦૦/હેક્ટર.',
        'en': 'Castor (Erando) is a highly drought-tolerant industrial oilseed crop. Gujarat is the world leader. Sowing: July/August. Profit: ₹90,000 - ₹1,40,000 per hectare.'
    },
    'mustard': {
        'gu': 'રાયડો ઓછું પાણી અને ઓછો ખર્ચ માગતો શિયાળુ પાક છે, જે ઉત્તર ગુજરાતમાં થાય છે. વાવણી ઓક્ટોબર/નવેમ્બરમાં થાય છે. મુખ્ય જીવાત: મોલો (Aphids). નફો: ₹૬૫,૦૦૦ - ₹૯૮,૦૦૦/હેક્ટર.',
        'en': 'Mustard (Raiyado) is a low-cost, low-water Rabi oilseed crop. Sowing: October/November. Key pest: Aphids (spray Imidacloprid). Profit: ₹65,000 - ₹98,000 per hectare.'
    },
    'sugarcane': {
        'gu': 'શેરડી દક્ષિણ ગુજરાતનો મુખ્ય રોકડીયો પાક છે. તેને વર્ષમાં ૩૦ થી ૩૬ વખત પિયત (વધુ પાણી) આપવું પડે છે. નફો: ₹૧,૮૦,૦૦૦ - ₹૨,૮૦,૦૦૦/હેક્ટર.',
        'en': 'Sugarcane (Sherdi) is a heavy-rainfall crop suited for South & Central Gujarat. Sowing: Oct-Jan. Needs high water (30-36 irrigations). Profit: ₹1,80,000 - ₹2,80,000 per hectare.'
    },
    'mango': {
        'gu': 'ગીર કેસર કેરી ગુજરાતનું ગૌરવ છે, જે ખાસ કરીને ગીર (સૌરાષ્ટ્ર) માં ઉગાડવામાં આવે છે. સ્થાપિત બગીચાઓ હેક્ટરે વાર્ષિક ₹૩.૫ થી ૭ લાખનો નફો આપે છે.',
        'en': 'Gir Kesar Mango is a GI-tagged pride fruit of Gujarat (especially Saurashtra). Established orchards yield high annual profits of ₹3.5L - ₹7L per hectare.'
    },
    'potato': {
        'gu': 'બટાકા માટે બનાસકાંઠાનું ડીસા શહેર સમગ્ર ગુજરાતમાં પ્રખ્યાત છે. ગોરાડુ અને રેતાળ જમીન અનુકૂળ આવે છે. સરેરાશ નફો: ₹૧,૫૦,૦૦૦ - ₹૨,૮૦,૦૦૦/હેક્ટર.',
        'en': 'Potato (Batata) is the specialty crop of Deesa (Banaskantha) in North Gujarat. Sown in Oct/Nov. Yield: 30-45 tons/ha. Profit: ₹1,50,000 - ₹2,80,000 per hectare.'
    },
    'rice': {
        'gu': 'ડાંગર (ચોખા) દક્ષિણ અને મધ્ય ગુજરાતની કાળી અને ચીકણી જમીનમાં ઉગાડાય છે. તેને પુષ્કળ ઊભું પાણી જોઈએ છે. નફો: ₹૭૦,૦૦૦ - ₹૧,૨૦,૦૦૦/હેક્ટર.',
        'en': 'Paddy/Rice (Danghar) is grown in heavy rainfall areas of South & Central Gujarat. Sown in June/July (transplanted). Profit: ₹70,000 - ₹1,20,000 per hectare.'
    },
    'chana': {
        'gu': 'ચણા મુખ્ય શિયાળુ કઠોળ પાક છે. જમીનમાં નાઇટ્રોજન ઉમેરે છે તેથી પાક ફેરબદલી માટે શ્રેષ્ઠ છે. વાવણી નવેમ્બરમાં થાય છે. નફો: ₹૬૫,૦૦૦ - ₹૧,૦૫,૦૦૦/હેક્ટર.',
        'en': 'Chickpea (Chana) is a major Rabi pulse. Fixes atmospheric nitrogen, making it great for crop rotation. Sowing: Oct/Nov. Profit: ₹65,000 - ₹1,05,000 per hectare.'
    },
    'kharek': {
        'gu': 'ખજૂર (કચ્છ ખારેક) એ કચ્છ વિસ્તારનો સુવર્ણ પાક છે. ટિશ્યૂ કલ્ચર બારહી જાત ખૂબ નફાકારક છે. સરેરાશ નફો: ₹૬,૦૦,૦૦૦ - ₹૧૨,૦૦,૦૦૦/હેક્ટર!',
        'en': 'Date Palm (Kachchhi Kharek) is a high-value arid fruit crop of Kachchh. Elite tissue culture Barhee variety gives profits up to ₹6,00,000 - ₹12,00,000 per hectare!'
    },
    'til': {
        'gu': 'તલ એ ટૂંકા ગાળાનો તેલીબિયાં પાક છે. ઉનાળુ તલની ખેતી સૌરાષ્ટ્રમાં ખૂબ નફાકારક છે. સરેરાશ નફો: ₹૭૫,૦૦૦ - ₹૧,૨૦,૦૦૦/હેક્ટર.',
        'en': 'Sesame (Til) is a short-duration oilseed crop. Summer sesame is highly profitable in Saurashtra. Profit: ₹75,000 - ₹1,20,000 per hectare.'
    }
}

REGIONAL_KNOWLEDGE = {
    'saurashtra': {
        'gu': 'સૌરાષ્ટ્ર પ્રદેશ મધ્યમ કાળી જમીન ધરાવે છે. ઉત્તમ પાકો: મગફળી, કપાસ, જીરું, તલ, કેસર કેરી અને ચણા છે.',
        'en': 'Saurashtra has medium black clayey soil. Best suited crops are Groundnut, Cotton, Cumin, Sesame, Gir Kesar Mango, and Chickpea.'
    },
    'north': {
        'gu': 'ઉત્તર ગુજરાતમાં રેતાળ અને ગોરાડુ જમીન આવેલી છે. બેસ્ટ પાકો: એરંડા, જીરું, બટાટા, વરિયાળી અને બાજરી છે.',
        'en': 'North Gujarat features sandy loam and Goradu soils. Best crops are Castor, Cumin, Potato, Fennel, Bajra, and Mustard.'
    },
    'south': {
        'gu': 'દક્ષિણ ગુજરાતમાં ભારે કાળી જમીન અને ઊંચો વરસાદ છે. બેસ્ટ પાકો: શેરડી, ડાંગર અને કેસર કેરી છે.',
        'en': 'South Gujarat has heavy black soil and high rainfall. Best suited crops are Sugarcane, Paddy (Rice), and Mango orchards.'
    },
    'central': {
        'gu': 'મધ્ય ગુજરાત ફળદ્રુપ ગોરાડુ જમીન ધરાવે છે. બેસ્ટ પાકો: કપાસ, ઘઉં, ડાંગર, બટાટા અને વરિયાળી છે.',
        'en': 'Central Gujarat has rich Goradu/Alluvial soil. Recommended crops: Cotton, Wheat, Paddy, Potato, and Fennel.'
    },
    'kachchh': {
        'gu': 'કચ્છ પ્રદેશમાં ખારાશવાળી અને રેતાળ જમીન છે. બેસ્ટ પાકો: કચ્છ ખારેક (ખજૂર), એરંડા, બાજરી અને ગવાર ગુંદર છે.',
        'en': 'Kachchh has sandy/coastal saline soil. Best crops: Date Palm (Kachchhi Kharek), Castor, Bajra, and Guar.'
    }
}

TOPIC_KNOWLEDGE = {
    'disease': {
        'gu': 'મુખ્ય રોગ નિયંત્રણ: મગફળીમાં ટિક્કા રોગ (મેન્કોઝેબનો છંટકાવ), કપાસમાં ગુલાબી ઈયળ (ફેરોમોન ટ્રેપ્સ), અને જીરામાં ચરમી રોગ (મેન્કોઝેબ).',
        'en': 'Disease management: Tikka leaf spot in groundnut (spray Mancozeb), Pink bollworm in cotton (pheromone traps), Blight in cumin (preventive Mancozeb).'
    },
    'fertilizer': {
        'gu': 'ખાતર ડોઝ (NPK કિગ્રા/હેક્ટર): કપાસ (૧૬૦:૮૦:૮૦), ઘઉં (૧૨૦:૬૦:૪૦), મગફળી (૨૫:૫૦:૨૦ + ૫૦૦ કિગ્રા જીપ્સમ), અને એરંડા (૭૫:૫૦).',
        'en': 'Fertilizer doses (NPK kg/ha): Cotton (160:80:80), Wheat (120:60:40), Groundnut (25:50:20 + Gypsum 500kg/ha), and Castor (75:50).'
    },
    'profit': {
        'gu': 'સૌથી વધુ નફો આપતા પાકોમાં કચ્છ ખારેક (₹૬-૧૨ લાખ/હેક્ટર), કેસર કેરી (₹૩.૫-૭ લાખ/હેક્ટર), અને મરી-મસાલામાં જીરું (₹૧.૧-૨.૨ લાખ/હેક્ટર) મોખરે છે.',
        'en': 'Highest profit crops: Date Palm (₹6L - ₹12L/ha), Kesar Mango (₹3.5L - ₹7L/ha), and Cumin (₹1.1L - ₹2.2L/ha).'
    }
}

def get_bot_response(user_query, lang='gu'):
    """
    Parses user input for agricultural keywords and returns the appropriate response
    """
    query = user_query.lower()
    
    # 1. Match Crop Keywords
    if 'cotton' in query or 'કપાસ' in query:
        return CROP_KNOWLEDGE['cotton'][lang]
    if 'groundnut' in query or 'peanut' in query or 'મગફળી' in query:
        return CROP_KNOWLEDGE['groundnut'][lang]
    if 'cumin' in query or 'jeera' in query or 'જીરું' in query:
        return CROP_KNOWLEDGE['cumin'][lang]
    if 'wheat' in query or 'ghau' in query or 'ઘઉં' in query:
        return CROP_KNOWLEDGE['wheat'][lang]
    if 'castor' in query or 'erando' in query or 'એરંડા' in query:
        return CROP_KNOWLEDGE['castor'][lang]
    if 'mustard' in query or 'rai' in query or 'રાયડો' in query or 'રાઈ' in query:
        return CROP_KNOWLEDGE['mustard'][lang]
    if 'sugarcane' in query or 'sherdi' in query or 'શેરડી' in query:
        return CROP_KNOWLEDGE['sugarcane'][lang]
    if 'mango' in query or 'kesar' in query or 'કેરી' in query:
        return CROP_KNOWLEDGE['mango'][lang]
    if 'potato' in query or 'batata' in query or 'બટાટા' in query:
        return CROP_KNOWLEDGE['potato'][lang]
    if 'rice' in query or 'paddy' in query or 'ડાંગર' in query:
        return CROP_KNOWLEDGE['rice'][lang]
    if 'chana' in query or 'chickpea' in query or 'ચણા' in query:
        return CROP_KNOWLEDGE['chana'][lang]
    if 'kharek' in query or 'date' in query or 'ખજૂર' in query:
        return CROP_KNOWLEDGE['kharek'][lang]
    if 'til' in query or 'sesame' in query or 'તલ' in query:
        return CROP_KNOWLEDGE['til'][lang]

    # 2. Match Regions
    if 'saurashtra' in query or 'સૌરાષ્ટ્ર' in query:
        return REGIONAL_KNOWLEDGE['saurashtra'][lang]
    if 'north' in query or 'ઉત્તર' in query:
        return REGIONAL_KNOWLEDGE['north'][lang]
    if 'south' in query or 'દક્ષિણ' in query:
        return REGIONAL_KNOWLEDGE['south'][lang]
    if 'central' in query or 'મધ્ય' in query:
        return REGIONAL_KNOWLEDGE['central'][lang]
    if 'kutch' in query or 'kachchh' in query or 'કચ્છ' in query:
        return REGIONAL_KNOWLEDGE['kachchh'][lang]

    # 3. Match general topics
    if 'disease' in query or 'pest' in query or 'રોગ' in query or 'જીવાત' in query:
        return TOPIC_KNOWLEDGE['disease'][lang]
    if 'fertilizer' in query or 'npk' in query or 'ખાતર' in query:
        return TOPIC_KNOWLEDGE['fertilizer'][lang]
    if 'profit' in query or 'money' in query or 'નફો' in query or 'નફા' in query:
        return TOPIC_KNOWLEDGE['profit'][lang]

    # 4. Fallback Default Response
    if lang == 'gu':
        return 'હું સમજી શક્યો નથી. કૃપા કરીને કોઈ પાક (મગફળી, કપાસ), પ્રદેશ (સૌરાષ્ટ્ર, કચ્છ) અથવા વિષય (રોગ, ખાતર, નફો) લખીને પૂછો.'
    else:
        return "I couldn't quite understand that. Please ask about a crop (groundnut, cotton, cumin), region (Saurashtra, Kachchh), or topics like diseases/fertilizers/profits."

def run_cli_chatbot():
    """
    Spins up an interactive terminal shell interface for the chatbot
    """
    print("=" * 60)
    print("      KRISHI MITR AI CHATBOT (કૃષિ મિત્ર ચેટબોટ)")
    print("=" * 60)
    print("System Language / ભાષા સેટિંગ: Gujarati ('gu') & English ('en') supported.")
    print("Type 'exit' or 'બહાર' to quit the chat.")
    print("-" * 60)

    # Ask for language preference
    lang_pref = input("Select Language / ભાષા પસંદ કરો (gu/en) [Default: gu]: ").strip().lower()
    lang = 'en' if lang_pref == 'en' else 'gu'

    greeting = (
        "નમસ્તે! હું કૃષિ મિત્ર એઆઈ ચેટબોટ છું. જમીન, પાક વાવણી, ખાતર કે નફા વિશે પૂછો!" 
        if lang == 'gu' else 
        "Hello! I am Krishi Mitr AI Chatbot. Ask me about soils, crop sowing, fertilizers, or profits!"
    )
    print(f"\n[Krishi Mitr AI]: {greeting}")

    while True:
        try:
            user_input = input("\n[Farmer / યુઝર]: ").strip()
            if not user_input:
                continue

            if user_input.lower() in ['exit', 'quit', 'બહાર', 'બંધ']:
                farewell = "આવજો! ખેતી ફળદાયી રહે." if lang == 'gu' else "Goodbye! Have a fruitful farming season."
                print(f"\n[Krishi Mitr AI]: {farewell}")
                break

            response = get_bot_response(user_input, lang)
            print(f"[Krishi Mitr AI]: {response}")

        except (KeyboardInterrupt, EOFError):
            print("\nExiting chat...")
            break

def run_flask_server():
    """
    Starts a local Flask microservice API endpoint
    """
    try:
        from flask import Flask, request, jsonify
        from flask_cors import CORS
    except ImportError:
        print("\n[Error] Flask and Flask-CORS are required to run in server mode.")
        print("Please run: pip install flask flask-cors")
        return

    app = Flask(__name__)
    CORS(app) # Enable Cross-Origin Resource Sharing

    @app.route('/api/chat', methods=['POST'])
    def chat_endpoint():
        data = request.get_json() or {}
        message = data.get('message', '')
        lang = data.get('lang', 'gu')
        if lang not in ['gu', 'en']:
            lang = 'gu'
        
        reply = get_bot_response(message, lang)
        
        return jsonify({
            'reply': reply,
            'timestamp': datetime.now().isoformat()
        })

    print("=" * 60)
    print("      KRISHI CHATBOT FLASK API SERVER STARTING")
    print("=" * 60)
    print("Server running locally on: http://127.0.0.1:5000")
    print("POST Endpoint available:   http://127.0.0.1:5000/api/chat")
    print("Payload JSON format:       {\"message\": \"કપાસ\", \"lang\": \"gu\"}")
    print("=" * 60)
    app.run(host='127.0.0.1', port=5000, debug=False)

if __name__ == '__main__':
    # Check arguments
    if len(sys.argv) > 1 and sys.argv[1] == '--server':
        run_flask_server()
    else:
        run_cli_chatbot()
