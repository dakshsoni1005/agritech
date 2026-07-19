import React, { useState } from 'react';
import { DISTRICTS_SOIL_DATA, SOIL_TYPES } from '../data/soilDatabase';
import { 
  ArrowLeft, ZoomIn, ZoomOut, RotateCcw, Info, CheckCircle2, 
  MapPin, Droplet, Sprout, Wind, ShieldAlert, Award, AlertCircle 
} from 'lucide-react';

export default function RegionalInsights({ lang, onBack }) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluka, setSelectedTaluka] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Reset zoom & pan
  const handleResetMap = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedDistrict(null);
    setSelectedTaluka(null);
  };

  const handleZoom = (factor) => {
    setZoomLevel((prev) => Math.max(0.8, Math.min(prev * factor, 3)));
  };

  // Helper: Get soil localized name & details
  const getSoilDetails = (typeKey) => {
    return SOIL_TYPES[typeKey] || { nameEn: 'Unknown', nameGu: 'અજ્ઞાત', color: '#64748b' };
  };

  // Render District connection lines to make it look like a gorgeous geographic web network
  const connectionLinks = [
    { from: 'kachchh', to: 'patan' },
    { from: 'kachchh', to: 'surendranagar' },
    { from: 'banaskantha', to: 'patan' },
    { from: 'banaskantha', to: 'sabarkantha' },
    { from: 'patan', to: 'gandhinagar' },
    { from: 'sabarkantha', to: 'gandhinagar' },
    { from: 'gandhinagar', to: 'ahmedabad' },
    { from: 'gandhinagar', to: 'kheda' },
    { from: 'ahmedabad', to: 'kheda' },
    { from: 'ahmedabad', to: 'surendranagar' },
    { from: 'kheda', to: 'anand' },
    { from: 'anand', to: 'vadodara' },
    { from: 'vadodara', to: 'bharuch' },
    { from: 'bharuch', to: 'surat' },
    { from: 'surat', to: 'navsari' },
    { from: 'navsari', to: 'valsad' },
    { from: 'surendranagar', to: 'morbi' },
    { from: 'surendranagar', to: 'rajkot' },
    { from: 'surendranagar', to: 'bhavnagar' },
    { from: 'rajkot', to: 'jamnagar' },
    { from: 'rajkot', to: 'amreli' },
    { from: 'rajkot', to: 'junagadh' },
    { from: 'jamnagar', to: 'dwarka' },
    { from: 'junagadh', to: 'somnath' },
    { from: 'junagadh', to: 'amreli' },
    { from: 'amreli', to: 'bhavnagar' }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in select-none">
      
      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-emerald-500 transition-all duration-300 font-extrabold text-xs tracking-wider uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-500" />
          <span>{lang === 'gu' ? 'મુખ્ય પેજ (Home)' : 'Home'}</span>
        </button>
      </div>

      {/* Title Header */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          {lang === 'gu' ? 'ગુજરાત સોઇલ ઇન્ટેલિજન્સ મેપ' : 'Gujarat Soil Intelligence Map'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">
          {lang === 'gu'
            ? 'ગુજરાતના વિવિધ જિલ્લાઓ અને તાલુકાઓની જમીનની ફળદ્રુપતા, પીએચ (pH) આંક, પોષક તત્વોનું સ્તર અને ખાતરની જરૂરિયાતોનો ઇન્ટરેક્ટિવ નકશો.'
            : 'Interactive visual directory of soil fertility, pH ranges, NPK status, and agricultural recommendations for Gujarat districts & talukas.'}
        </p>
      </div>

      {/* Interactive Legend Bar */}
      <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex flex-wrap gap-4 items-center justify-center">
        <span className="text-[10px] font-black text-slate-455 uppercase tracking-wider">
          {lang === 'gu' ? 'જમીન લેજેન્ડ:' : 'Soil Legends:'}
        </span>
        {Object.entries(SOIL_TYPES).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-850 shadow-sm">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: value.color }} />
            <span className="text-xs font-bold text-slate-300">
              {lang === 'gu' ? value.nameGu : value.nameEn}
            </span>
          </div>
        ))}
      </div>

      {/* Main Grid: Interactive Map Canvas + Details Side Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: The Interactive Map View */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden flex flex-col h-[520px]">
          
          {/* Map Controls */}
          <div className="absolute top-4 left-4 z-15 flex flex-col space-y-1.5 bg-slate-950/80 p-2 rounded-2xl border border-slate-850 backdrop-blur-md">
            <button
              onClick={() => handleZoom(1.2)}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-500 hover:border-emerald-500/20 flex items-center justify-center transition-all cursor-pointer shadow-sm"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(0.8)}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-500 hover:border-emerald-500/20 flex items-center justify-center transition-all cursor-pointer shadow-sm"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetMap}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-500 hover:border-emerald-500/20 flex items-center justify-center transition-all cursor-pointer shadow-sm"
              title="Reset Map View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Current Drill-down Header */}
          <div className="absolute top-4 right-4 z-15 bg-slate-950/80 p-2.5 px-4 rounded-2xl border border-slate-850 backdrop-blur-md text-right">
            <span className="text-[9px] text-slate-455 font-black uppercase tracking-wider block">
              {selectedDistrict ? (lang === 'gu' ? 'તાલુકા વ્યૂ' : 'Taluka View') : (lang === 'gu' ? 'ગુજરાત નકશો' : 'District Map')}
            </span>
            <span className="text-xs font-black text-slate-105 block mt-0.5">
              {selectedDistrict 
                ? (lang === 'gu' ? `${selectedDistrict.nameGu} જિલ્લો` : `${selectedDistrict.name} District`)
                : (lang === 'gu' ? 'કોઈપણ જિલ્લા પર ક્લિક કરો' : 'Click on any district to drill down')}
            </span>
          </div>

          {/* Map Vector Canvas */}
          <div className="flex-1 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing relative">
            <svg 
              className="w-full h-full max-h-[460px] transition-transform duration-300 ease-out origin-center"
              viewBox="0 0 100 100"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`
              }}
            >
              {/* SVG Background grids for technical look */}
              <defs>
                <pattern id="soil-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#334155" strokeWidth="0.08" strokeOpacity="0.4" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#soil-grid)" />

              {/* RENDER MODE A: Entire District Map */}
              {!selectedDistrict && (
                <>
                  {/* Connection lines representing agricultural geographic flow network */}
                  {connectionLinks.map((link, idx) => {
                    const fromNode = DISTRICTS_SOIL_DATA.find(d => d.id === link.from);
                    const toNode = DISTRICTS_SOIL_DATA.find(d => d.id === link.to);
                    if (!fromNode || !toNode) return null;
                    return (
                      <line 
                        key={idx}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="#475569"
                        strokeWidth="0.35"
                        strokeDasharray="1.5 1"
                        strokeOpacity="0.65"
                      />
                    );
                  })}

                  {/* Clickable District Nodes */}
                  {DISTRICTS_SOIL_DATA.map((dist) => {
                    const soil = getSoilDetails(dist.dominantSoil);
                    const isHovered = hoveredNode?.id === dist.id;

                    return (
                      <g 
                        key={dist.id} 
                        className="cursor-pointer group"
                        onClick={() => {
                          setSelectedDistrict(dist);
                          setZoomLevel(1.4);
                        }}
                        onMouseEnter={(e) => {
                          setHoveredNode({ ...dist, isTaluka: false });
                        }}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        {/* Glowing Background Pulse */}
                        <circle 
                          cx={dist.x} 
                          cy={dist.y} 
                          r={isHovered ? "6.5" : "4.5"} 
                          fill={soil.color} 
                          fillOpacity={isHovered ? "0.22" : "0.1"} 
                          className="transition-all duration-300 animate-pulse"
                        />
                        {/* Core District Node */}
                        <circle 
                          cx={dist.x} 
                          cy={dist.y} 
                          r={isHovered ? "3.2" : "2.4"} 
                          fill={soil.color} 
                          stroke="#ffffff" 
                          strokeWidth={isHovered ? "0.8" : "0.4"}
                          className="transition-all duration-300 group-hover:scale-110"
                        />
                        {/* District Name Tag */}
                        <text
                          x={dist.x}
                          y={dist.y + 6.5}
                          textAnchor="middle"
                          fill="#f1f5f9"
                          fontSize="2.4"
                          fontWeight="900"
                          className="pointer-events-none select-none transition-all duration-300 font-sans tracking-tight text-shadow"
                          style={{ fillOpacity: isHovered ? 1 : 0.72 }}
                        >
                          {lang === 'gu' ? dist.nameGu : dist.name}
                        </text>
                      </g>
                    );
                  })}
                </>
              )}

              {/* RENDER MODE B: Drill-down Talukas of selected District */}
              {selectedDistrict && (
                <>
                  {/* Central District focal background name */}
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    fill="#1e293b"
                    fontSize="12"
                    fontWeight="900"
                    className="pointer-events-none select-none font-sans uppercase tracking-widest opacity-25"
                  >
                    {selectedDistrict.name}
                  </text>

                  {/* Draw connection lines from center to each taluka */}
                  {selectedDistrict.talukas.map((t, idx) => {
                    // Position talukas in a circular ring layout around center
                    const angle = (idx * 2 * Math.PI) / selectedDistrict.talukas.length;
                    const r = 26; // radius of layout ring
                    const tx = 50 + r * Math.cos(angle);
                    const ty = 50 + r * Math.sin(angle);

                    return (
                      <g key={t.name}>
                        {/* Connection hub line */}
                        <line 
                          x1="50"
                          y1="50"
                          x2={tx}
                          y2={ty}
                          stroke="#334155"
                          strokeWidth="0.4"
                          strokeDasharray="1 1"
                        />
                        {/* Clickable Taluka Node */}
                        <g
                          className="cursor-pointer group"
                          onClick={() => setSelectedTaluka(t)}
                          onMouseEnter={() => {
                            setHoveredNode({ ...t, isTaluka: true, parentDist: selectedDistrict });
                          }}
                          onMouseLeave={() => setHoveredNode(null)}
                        >
                          {/* Outer Glow */}
                          <circle 
                            cx={tx} 
                            cy={ty} 
                            r="5.5" 
                            fill={getSoilDetails(t.soilType).color} 
                            fillOpacity="0.15" 
                            className="group-hover:scale-125 transition-transform"
                          />
                          {/* Core node */}
                          <circle 
                            cx={tx} 
                            cy={ty} 
                            r="2.2" 
                            fill={getSoilDetails(t.soilType).color} 
                            stroke="#ffffff" 
                            strokeWidth="0.5"
                          />
                          {/* Text Label */}
                          <text
                            x={tx}
                            y={ty + 5.5}
                            textAnchor="middle"
                            fill="#f8fafc"
                            fontSize="2.5"
                            fontWeight="900"
                            className="pointer-events-none select-none font-sans"
                          >
                            {lang === 'gu' ? t.nameGu : t.name}
                          </text>
                        </g>
                      </g>
                    );
                  })}

                  {/* Central back to map return node */}
                  <g 
                    className="cursor-pointer group"
                    onClick={() => {
                      setSelectedDistrict(null);
                      setSelectedTaluka(null);
                      setZoomLevel(1);
                    }}
                  >
                    <circle cx="50" cy="50" r="4.5" fill="#0f172a" stroke="#10b981" strokeWidth="0.6" />
                    <text x="50" y="51" textAnchor="middle" fill="#10b981" fontSize="2.8" fontWeight="bold">←</text>
                  </g>
                </>
              )}
            </svg>

            {/* Quick Drill-down Tooltip Layer */}
            {hoveredNode && (
              <div 
                className="absolute bg-slate-950/95 border border-slate-800 p-3.5 rounded-2xl shadow-2xl pointer-events-none z-20 max-w-xs animate-scale-up"
                style={{
                  top: '15%',
                  left: hoveredNode.isTaluka ? '20%' : '10%'
                }}
              >
                {!hoveredNode.isTaluka ? (
                  <div className="space-y-1.5">
                    <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[8px] font-black uppercase text-emerald-500">District</span>
                    <h5 className="text-sm font-black text-slate-100 flex items-center space-x-1">
                      <span>{hoveredNode.name}</span>
                      <span className="text-xs text-slate-400 font-bold">({hoveredNode.nameGu})</span>
                    </h5>
                    <div className="flex items-center space-x-2 text-xs text-slate-350">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: getSoilDetails(hoveredNode.dominantSoil).color }} />
                      <span className="font-bold">
                        {lang === 'gu' ? getSoilDetails(hoveredNode.dominantSoil).nameGu : getSoilDetails(hoveredNode.dominantSoil).nameEn}
                      </span>
                    </div>
                    <span className="block text-[10px] text-slate-455 font-extrabold">{hoveredNode.talukas.length} Talukas included</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span className="bg-emerald-600/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[8px] font-black uppercase text-emerald-450">Taluka</span>
                    <div>
                      <h5 className="text-sm font-black text-slate-100">
                        {hoveredNode.name} <span className="text-xs text-slate-400 font-bold">({hoveredNode.nameGu})</span>
                      </h5>
                      <span className="text-[10px] text-slate-450 font-bold block">District: {hoveredNode.parentDist.name}</span>
                    </div>
                    <div className="pt-1.5 border-t border-slate-850 space-y-1 text-xs">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: getSoilDetails(hoveredNode.soilType).color }} />
                        <span className="font-bold text-slate-205">
                          {lang === 'gu' ? getSoilDetails(hoveredNode.soilType).nameGu : getSoilDetails(hoveredNode.soilType).nameEn}
                        </span>
                      </div>
                      <div className="text-slate-350"><strong className="font-bold text-slate-250">pH Range:</strong> {hoveredNode.pH}</div>
                      <div className="text-slate-350"><strong className="font-bold text-slate-250">Fertility:</strong> {hoveredNode.fertility}</div>
                      <div className="text-[10px] bg-slate-900 p-1.5 rounded-lg border border-slate-850/80 text-emerald-400 font-semibold leading-relaxed mt-1">
                        Crops: {hoveredNode.crops}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Drill-down return manual button */}
          {selectedDistrict && (
            <button
              onClick={() => {
                setSelectedDistrict(null);
                setSelectedTaluka(null);
                setZoomLevel(1);
              }}
              className="mt-3.5 self-start flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-850 text-xs font-black text-emerald-500 cursor-pointer shadow-sm"
            >
              <span>← {lang === 'gu' ? 'સમગ્ર ગુજરાત નકશો' : 'Return to State Map'}</span>
            </button>
          )}

        </div>

        {/* Right Col: Detailed Soil Parameter Panel */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col h-[520px] overflow-y-auto">
          
          {/* Header */}
          <div className="pb-4 border-b border-slate-850 shrink-0">
            <h3 className="text-base sm:text-lg font-black text-slate-105 tracking-tight flex items-center space-x-2">
              <Info className="w-5 h-5 text-emerald-500" />
              <span>{lang === 'gu' ? 'વિગતવાર કૃષિ સલાહ' : 'Soil Analysis Panel'}</span>
            </h3>
          </div>

          {/* Render State 1: No Taluka Selected */}
          {!selectedTaluka && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-slate-500 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-205">
                  {lang === 'gu' ? 'કોઈપણ તાલુકો પસંદ કરો' : 'No Taluka Selected'}
                </h4>
                <p className="text-xs text-slate-450 font-bold max-w-xs mt-1.5 leading-relaxed">
                  {lang === 'gu'
                    ? 'નકશા પર સૌપ્રથમ જિલ્લા પર ક્લિક કરો, ત્યારબાદ ખુલતા પેટા-નકશામાંથી તાલુકા પર ક્લિક કરીને જમીનની સચોટ માહિતી મેળવો.'
                    : 'Click a district node to zoom in, then click any taluka hub node to retrieve localized NPK levels, moisture limits, and sowing advice.'}
                </p>
              </div>
            </div>
          )}

          {/* Render State 2: Taluka Selected - Detail advisory sheet */}
          {selectedTaluka && (
            <div className="flex-1 space-y-5.5 py-4 scrollbar-thin overflow-y-auto pr-1">
              
              {/* Header Title */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xl font-black text-slate-100">
                    {selectedTaluka.name} <span className="text-sm font-bold text-slate-400">({selectedTaluka.nameGu})</span>
                  </h4>
                  <span className="text-[10px] text-slate-455 font-black uppercase tracking-wider block mt-0.5">
                    District: {selectedDistrict?.name}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTaluka(null)}
                  className="text-[10px] text-slate-450 hover:text-white font-extrabold underline cursor-pointer"
                >
                  Clear
                </button>
              </div>

              {/* Key Indicators */}
              <div className="grid grid-cols-2 gap-3.5 bg-slate-955 p-3.5 rounded-2xl border border-slate-850">
                <div>
                  <span className="text-[9px] text-slate-455 font-black uppercase tracking-wider block">pH Range</span>
                  <span className="text-sm font-black text-slate-105 block mt-0.5">{selectedTaluka.pH}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-455 font-black uppercase tracking-wider block">Fertility</span>
                  <span className="text-sm font-black text-slate-105 block mt-0.5">{selectedTaluka.fertility}</span>
                </div>
              </div>

              {/* Soil Profile Description */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: getSoilDetails(selectedTaluka.soilType).color }} />
                  <span>{lang === 'gu' ? 'જમીનનો પ્રકાર' : 'Soil Profile Type'}</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-semibold leading-relaxed">
                  {lang === 'gu' ? getSoilDetails(selectedTaluka.soilType).nameGu : getSoilDetails(selectedTaluka.soilType).nameEn}: {getSoilDetails(selectedTaluka.soilType).desc}
                </p>
              </div>

              {/* Nutrients Status */}
              <div className="space-y-2">
                <span className="text-[10px] font-black text-slate-455 uppercase tracking-widest block">Nutrients Status</span>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="bg-slate-955 p-2 rounded-xl border border-slate-850 text-center">
                    <span className="text-[9px] text-slate-500 font-black block">Nitrogen (N)</span>
                    <span className="text-xs font-black text-emerald-450 mt-0.5 block">{selectedTaluka.nutrientN}</span>
                  </div>
                  <div className="bg-slate-955 p-2 rounded-xl border border-slate-850 text-center">
                    <span className="text-[9px] text-slate-500 font-black block">Phosphorus (P)</span>
                    <span className="text-xs font-black text-emerald-450 mt-0.5 block">{selectedTaluka.nutrientP}</span>
                  </div>
                  <div className="bg-slate-955 p-2 rounded-xl border border-slate-850 text-center">
                    <span className="text-[9px] text-slate-500 font-black block">Potash (K)</span>
                    <span className="text-xs font-black text-emerald-450 mt-0.5 block">{selectedTaluka.nutrientK}</span>
                  </div>
                </div>
              </div>

              {/* Water Retention & Drainage */}
              <div className="space-y-3.5 pt-3.5 border-t border-slate-855">
                <div className="flex items-start space-x-2.5">
                  <Droplet className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-black text-slate-105 uppercase tracking-wider block">Water Retention Capacity</span>
                    <span className="text-xs text-slate-350 font-bold block mt-0.5">{selectedTaluka.waterRetention}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Wind className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-black text-slate-105 uppercase tracking-wider block">Drainage Quality</span>
                    <span className="text-xs text-slate-350 font-bold block mt-0.5">{selectedTaluka.drainage}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Crops */}
              <div className="space-y-1.5 pt-3.5 border-t border-slate-855">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block flex items-center space-x-1.5">
                  <Sprout className="w-4 h-4 text-emerald-500" />
                  <span>{lang === 'gu' ? 'ભલામણ કરેલ પાકો' : 'Recommended Crops'}</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-semibold leading-relaxed">
                  {selectedTaluka.recommendedCrops}
                </p>
              </div>

              {/* Best Farming Practices */}
              <div className="space-y-1.5 pt-3.5 border-t border-slate-855">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>{lang === 'gu' ? 'ઉત્તમ ખેતી પદ્ધતિઓ' : 'Best Farming Practices'}</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-semibold leading-relaxed">
                  {selectedTaluka.practices}
                </p>
              </div>

              {/* Irrigation Advisories */}
              <div className="space-y-1.5 pt-3.5 border-t border-slate-855">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-emerald-500" />
                  <span>{lang === 'gu' ? 'સિંચાઈ માર્ગદર્શિકા' : 'Irrigation Guidelines'}</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-semibold leading-relaxed">
                  {selectedTaluka.irrigation}
                </p>
              </div>

              {/* Fertilizer Suggestions */}
              {selectedTaluka.fertilizer && (
                <div className="space-y-1.5 pt-3.5 border-t border-slate-855">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{lang === 'gu' ? 'ખાતર ડોઝ ભલામણ' : 'Fertilizer Recommendation'}</span>
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 font-semibold leading-relaxed">
                    {selectedTaluka.fertilizer}
                  </p>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
