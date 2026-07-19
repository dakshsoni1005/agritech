# Product Requirement Document (PRD)
## Gujarat AI-Based Crop Recommendation & Smart Advisory Platform
**ગુજરાત એઆઈ પાક ભલામણ અને સ્માર્ટ કૃષિ સલાહકાર પ્લેટફોર્મ**

---

## 1. Executive Summary & Vision
The **Gujarat AI Crop Recommendation & Smart Advisory Platform** is an intelligent, region-focused digital agronomy tool designed specifically for farmers across Gujarat's 5 agro-climatic divisions (**North Gujarat, South Gujarat, Central Gujarat, Saurashtra, and Kachchh**). 

By integrating multi-parameter inputs (location, district, taluka, soil profile, season/month, micro-climate factors, irrigation, farm size, and previous crop history), the system delivers real-time AI crop suitability recommendations paired with confidence scores, predicted yields, calculated net profit ranges, and detailed 18-field technical advisories.

---

## 2. Problem Statement & Value Proposition
- **The Challenge**: Farmers frequently make crop selection decisions based on traditional habits rather than data-driven soil compatibility, seasonal sowing windows, or fluctuating market prices. Generic national tools lack Gujarat-specific administrative mappings (districts/talukas) and regional soil variations (e.g., Saurashtra black soil vs. Kachchh arid saline soil).
- **The Solution**: An end-to-end smart advisory platform providing both an **AI Recommendation Engine** and a comprehensive **18-Field Crop Knowledge Database** in Gujarati and English.

---

## 3. User Input & AI Recommendation Engine Specifications

### 3.1 Required Inputs (સલાહકાર ઇનપુટ)
| Parameter | Input Type | Description / Options |
| :--- | :--- | :--- |
| **Region** | Card Select | North Gujarat, South Gujarat, Central Gujarat, Saurashtra, Kachchh |
| **District** | Cascading Dropdown | Filtered based on selected Region (e.g., Rajkot, Junagadh, Banaskantha, Surat, Bhuj) |
| **Taluka** | Cascading Dropdown | Filtered based on selected District (e.g., Palanpur, Gondal, Anand, Deesa) |
| **Soil Type** | Dropdown | Medium Black, Deep Black, Goradu / Red Loamy, Sandy Loam, Alluvial Silt, Coastal Saline, Desert Sand |
| **Current Sowing Month** | Dropdown | January – December (Highlighting Kharif, Rabi, and Summer windows) |
| **Temperature (°C)** | Slider / Range | Expected ambient growth temperature (10°C to 45°C) |
| **Rainfall (mm)** | Slider / Range | Annual/Seasonal rainfall (200mm to 2000mm) |
| **Irrigation Available?** | Toggle (Yes / No) | Canal, Tubewell, Drip, Rainfed |
| **Farm Size** | Number + Unit | Scalable in **Hectare** or **Bigha** (1 Hectare ≈ 6.25 Bigha in Gujarat) |
| **Previous Crop** | Dropdown | Cotton, Groundnut, Wheat, Cumin, Bajra, Castor, Mustard, Paddy, Fallow |

### 3.2 AI Recommendation Outputs (એઆઈ આઉટપુટ)
- **Primary Recommended Crop**: e.g., Groundnut (મગફળી)
- **Confidence Score (%)**: Multi-factor match percentage (e.g., 94%)
- **Expected Yield**: e.g., 2.8 – 3.2 tons/hectare (28–32 Quintal/ha)
- **Calculated Expected Net Profit**: Scaled dynamically to user's farm size in ₹ (e.g., ₹85,000 – ₹1,10,000 for 1 Hectare)
- **AI Reasoning**: Explicit summary explaining soil match, sowing window, rainfall/irrigation, and regional suitability.
- **Secondary Alternatives**: Top 3 runner-up crops with match percentages.
- **Companion & Rotation Advice**: Suitable intercropping and crop rotation guidance.

---

## 4. Comprehensive 18-Field Crop Database Schema
The database maintains granular records for major crops in Gujarat (Groundnut, Cotton, Cumin, Castor, Wheat, Mustard, Sugarcane, Mango, Pearl Millet, Potato, Fennel, Paddy, Chickpea, Date Palm, Sesame, etc.).

Each crop record contains the following 18 fields:
1. **Crop Name (English)**: Standard English name.
2. **Gujarati Name (ગુજરાતી નામ)**: Local vernacular name (e.g., મગફળી, જીરું, એરંડા).
3. **Suitable Regions (લાયક વિસ્તારો)**: Gujarat regions suitable for cultivation.
4. **Suitable Soil Types (અનુકૂળ જમીન)**: Soil profiles supporting optimal growth.
5. **Ideal Temperature Range (°C)**: Min & max growth temperature.
6. **Ideal Rainfall Range (mm)**: Moisture and annual rainfall requirement.
7. **Sowing Months (વાવણીનો સમય)**: Optimal planting windows.
8. **Harvest Months (લણણીનો સમય)**: Maturity and harvesting period.
9. **Water Requirement (પિયત જરૂરિયાત)**: Irrigation frequency and drip compatibility.
10. **Fertilizer (NPK) Recommendation (ખાતર ભલામણ)**: Recommended N:P:K kg/ha dosage + Gypsum/FYM.
11. **Seed Rate (બિયારણ દર)**: Recommended seed weight per hectare.
12. **Average Yield (સરેરાશ ઉત્પાદન)**: Expected yield in tons/hectare or quintal/ha.
13. **Common Diseases & Pests (મુખ્ય રોગ અને જીવાત)**: Primary threats (e.g., Tikka, Pink Bollworm, Blight, Aphids).
14. **Prevention & Management Methods (રોગ નિયંત્રણ)**: Bio-pesticides, seed treatment, chemical sprays.
15. **Estimated Cultivation Cost (વાવેતર ખર્ચ)**: Production cost range per hectare.
16. **Expected Market Price (બજાર ભાવ)**: Market rate per quintal or per 20kg (Man).
17. **Estimated Profit Range (અંદાજિત નફો)**: Net profit margin per hectare.
18. **Suitable Companion/Rotation Crops (પાક ફેરબદલી)**: Nitrogen-fixing rotation crops and intercropping options.

---

## 5. Regional Agro-Climatic Insights (5 Divisions)
1. **North Gujarat (ઉત્તર ગુજરાત)**: Banaskantha, Patan, Mehsana, Sabarkantha, Aravalli, Gandhinagar. (Sandy Loam, Goradu soil; Tubewell irrigation; Mustard, Castor, Cumin, Potato).
2. **South Gujarat (દક્ષિણ ગુજરાત)**: Surat, Navsari, Valsad, Tapi, Bharuch, Narmada, Dang. (Deep Black, Alluvial soil; High rainfall & canal network; Sugarcane, Paddy, Mango, Banana).
3. **Central Gujarat (મધ્ય ગુજરાત)**: Ahmedabad, Kheda, Anand, Vadodara, Panchmahal, Dahod, Mahisagar. (Goradu, Medium Black soil; Narmada canal command; Tobacco, Wheat, Paddy, Pulses).
4. **Saurashtra (સૌરાષ્ટ્ર)**: Rajkot, Junagadh, Amreli, Bhavnagar, Jamnagar, Devbhumi Dwarka, Gir Somnath, Porbandar, Surendranagar, Morbi. (Medium Black volcanic soil; Groundnut, Cotton, Cumin, Kesar Mango).
5. **Kachchh (કચ્છ)**: Bhuj, Anjar, Mandvi, Mundra, Nakhatrana, Rapar, Lakhpat, Abdasa, Bhachau, Gandhidham. (Arid desert sand & coastal saline soil; Drip irrigation; Date Palm, Dragon Fruit, Pomegranate, Castor).

---

## 6. Technical Stack & Architecture
- **Frontend**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Glassmorphic UI Aesthetics + Responsive Dark Mode
- **Icons**: Lucide React
- **Language Support**: Dual-mode **Gujarati (ગુજરાતી)** and **English** toggle.
- **Interactivity**: Dynamic profit & fertilizer calculator, printable advisory reports, and search/filter catalog.

---

## 7. Future Enhancements & Roadmap
- **Live APMC Mandi Price API**: Real-time integration with Gujarat e-NAM / APMC market rates.
- **Weather API Integration**: Auto-fetching temperature & rainfall from IMD/OpenWeather based on selected Taluka.
- **Soil Testing Lab Upload**: Ability for farmers to upload NPK soil test PDF for hyper-personalized fertilizer prescription.
