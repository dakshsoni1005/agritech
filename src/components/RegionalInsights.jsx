import React, { useState, useEffect } from 'react';
import { DISTRICTS_SOIL_DATA, SOIL_TYPES } from '../data/soilDatabase';
import { 
  ArrowLeft, ZoomIn, ZoomOut, RotateCcw, Info, CheckCircle2, 
  MapPin, Droplet, Sprout, Wind, Award, AlertCircle, RefreshCw, BarChart2 
} from 'lucide-react';

export default function RegionalInsights({ lang, onBack }) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map viewport settings
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);

  // Fetch actual GIS/GeoJSON district boundary data for Gujarat
  useEffect(() => {
    setLoading(true);
    fetch('https://raw.githubusercontent.com/udit-001/india-maps-data/main/geojson/states/gujarat.geojson')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Gujarat boundaries.');
        return res.json();
      })
      .then((data) => {
        setGeoJsonData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching GIS GeoJSON:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Standard equirectangular projection mapping for Gujarat bounding box
  const projectCoordinate = (lon, lat, width = 800, height = 600) => {
    // Gujarat Bounding Box
    const minLon = 68.0;
    const maxLon = 74.5;
    const minLat = 20.0;
    const maxLat = 24.7;

    const x = ((lon - minLon) / (maxLon - minLon)) * width;
    const y = height - ((lat - minLat) / (maxLat - minLat)) * height;
    return { x, y };
  };

  // Convert GeoJSON geometry arrays to SVG path d-string
  const getSvgPathFromGeometry = (geometry, width = 800, height = 600) => {
    if (!geometry) return '';
    const { type, coordinates } = geometry;
    let paths = [];

    const handleRing = (ring) => {
      let segments = [];
      ring.forEach((coord, idx) => {
        const { x, y } = projectCoordinate(coord[0], coord[1], width, height);
        if (idx === 0) {
          segments.push(`M ${x.toFixed(1)} ${y.toFixed(1)}`);
        } else {
          segments.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`);
        }
      });
      segments.push('Z');
      paths.push(segments.join(' '));
    };

    if (type === 'Polygon') {
      coordinates.forEach(handleRing);
    } else if (type === 'MultiPolygon') {
      coordinates.forEach((polygon) => {
        polygon.forEach(handleRing);
      });
    }
    return paths.join(' ');
  };

  // Clean and map names for matching raw GeoJSON properties
  const cleanName = (name) => {
    if (!name) return '';
    return name.toLowerCase()
      .replace('ahmadabad', 'ahmedabad')
      .replace('dohad', 'dahod')
      .replace('panch mahals', 'panchmahal')
      .replace('panchmahal', 'panchmahal')
      .replace('the dangs', 'dang')
      .replace('dang', 'dang')
      .replace('devbhumi dwarka', 'dwarka')
      .replace('dwarka', 'dwarka')
      .replace('somnath', 'somnath')
      .replace('saber kantha', 'sabarkantha')
      .replace('sabarkantha', 'sabarkantha')
      .replace('banas kantha', 'banaskantha')
      .replace('banaskantha', 'banaskantha')
      .replace('chhotaudepur', 'chhota udepur')
      .replace('chhota udepur', 'chhota udepur')
      .replace('mahisagar', 'mahisagar')
      .replace(/\s+/g, '');
  };

  // Find matching db district for a GeoJSON feature
  const findDbDistrictForFeature = (feature) => {
    const fName = cleanName(feature.properties.district || feature.properties.NAME_2 || '');
    return DISTRICTS_SOIL_DATA.find((d) => cleanName(d.name) === fName);
  };

  // Helpers to fetch soil color
  const getSoilDetailsByTypeName = (typeName) => {
    const name = typeName.toLowerCase();
    if (name.includes('cotton') || name.includes('black')) return SOIL_TYPES.black;
    if (name.includes('alluvial') || name.includes('કાંપ')) return SOIL_TYPES.alluvial;
    if (name.includes('red') || name.includes('રાતી')) return SOIL_TYPES.red;
    if (name.includes('clay') || name.includes('ચીકણી')) return SOIL_TYPES.clay;
    if (name.includes('sandy') || name.includes('રેતાળ')) return SOIL_TYPES.sandy;
    if (name.includes('saline') || name.includes('ખારાશ')) return SOIL_TYPES.saline;
    if (name.includes('loamy') || name.includes('ગોરાડુ')) return SOIL_TYPES.loamy;
    return { nameEn: typeName, nameGu: typeName, color: '#64748b', desc: '' };
  };

  const handleResetMap = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedDistrict(null);
  };

  const handleZoom = (factor) => {
    setZoomLevel((prev) => Math.max(0.8, Math.min(prev * factor, 4)));
  };

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

      {/* Header Banner */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-105 tracking-tight">
          {lang === 'gu' ? 'ગુજરાત સોઇલ ઇન્ટેલિજન્સ જીઆઈએસ મેપ' : 'Gujarat Soil Intelligence GIS Map'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">
          {lang === 'gu'
            ? 'નકશા પરથી કોઈપણ જિલ્લા પર ક્લિક કરો અને તેની જમીનના પ્રકાર, ટેક્સચર, પોષક તત્વોનું સ્તર અને ખાતરની ભલામણો જુઓ.'
            : 'Click on any district from the geographically accurate GIS map to view localized soil data, textures, and sowing advisories.'}
        </p>
      </div>

      {/* Soil Color Legends */}
      <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex flex-wrap gap-4 items-center justify-center">
        <span className="text-[10px] font-black text-slate-455 uppercase tracking-wider">
          {lang === 'gu' ? 'જમીન ના પ્રકારો:' : 'Soil Classification:'}
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

      {/* Dashboard Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Map View */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden flex flex-col h-[520px]">
          
          {/* Controls */}
          <div className="absolute top-4 left-4 z-15 flex flex-col space-y-1.5 bg-slate-955/80 p-2 rounded-2xl border border-slate-850 backdrop-blur-md">
            <button
              onClick={() => handleZoom(1.2)}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-500 flex items-center justify-center transition-all cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(0.8)}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-500 flex items-center justify-center transition-all cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetMap}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-500 flex items-center justify-center transition-all cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Current Drill-down Location Banner */}
          <div className="absolute top-4 right-4 z-15 bg-slate-955/80 p-2.5 px-4 rounded-2xl border border-slate-850 backdrop-blur-md text-right">
            <span className="text-[9px] text-slate-455 font-black uppercase tracking-wider block">
              {lang === 'gu' ? 'જીલ્લાવાર વિશ્લેષણ' : 'District Analysis'}
            </span>
            <span className="text-xs font-black text-slate-105 block mt-0.5">
              {selectedDistrict 
                ? (lang === 'gu' ? selectedDistrict.nameGu : selectedDistrict.name)
                : (lang === 'gu' ? 'જિલ્લા પર ક્લિક કરો' : 'Click on a district to select')}
            </span>
          </div>

          {/* Loading Layer */}
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
              <span className="text-xs text-slate-400 font-bold">
                {lang === 'gu' ? 'જીઆઈએસ નકશો લોડ થઈ રહ્યો છે...' : 'Loading GIS Boundaries from CDN...'}
              </span>
            </div>
          )}

          {/* Error fallback */}
          {error && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <span className="text-xs text-rose-500 font-black">
                {lang === 'gu' ? `ભૂલ: ${error}` : `Error loading GIS dataset: ${error}`}
              </span>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-black text-emerald-500 cursor-pointer"
              >
                Retry Load
              </button>
            </div>
          )}

          {/* Map Area */}
          {!loading && !error && geoJsonData && (
            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
              <svg 
                className="w-full h-full max-h-[460px] transition-transform duration-500 ease-out origin-center"
                viewBox="0 0 800 600"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`
                }}
              >
                {/* Technical grid backdrop */}
                <rect width="800" height="600" fill="url(#soil-grid)" className="pointer-events-none" />

                {/* Draw 33 District Boundaries from GIS GeoJSON */}
                <g>
                  {geoJsonData.features.map((feature, idx) => {
                    const dbDist = findDbDistrictForFeature(feature);
                    const soilColor = dbDist ? getSoilDetailsByTypeName(SOIL_TYPES[dbDist.dominantSoil]?.nameEn).color : '#334155';
                    const pathData = getSvgPathFromGeometry(feature.geometry, 800, 600);
                    const isSelected = selectedDistrict?.id === dbDist?.id;
                    const isHovered = hoveredNode?.id === dbDist?.id;

                    if (!pathData) return null;

                    return (
                      <path
                        key={feature.properties.district_code || idx}
                        d={pathData}
                        fill={soilColor}
                        stroke={isSelected ? "#10b981" : "#0f172a"}
                        strokeWidth={isSelected ? "1.8" : isHovered ? "1.2" : "0.55"}
                        fillOpacity={isSelected ? "1.0" : isHovered ? "0.95" : "0.78"}
                        className="transition-all duration-200 cursor-pointer hover:stroke-emerald-400"
                        onClick={() => {
                          if (dbDist) {
                            setSelectedDistrict(dbDist);
                          }
                        }}
                        onMouseEnter={() => {
                          if (dbDist) {
                            setHoveredNode(dbDist);
                          }
                        }}
                        onMouseLeave={() => setHoveredNode(null)}
                      />
                    );
                  })}
                </g>
              </svg>

              {/* Tooltip Overlay */}
              {hoveredNode && (
                <div 
                  className="absolute bg-slate-955/95 border border-slate-800 p-3.5 rounded-2xl shadow-2xl pointer-events-none z-20 max-w-xs animate-scale-up"
                  style={{
                    top: '12%',
                    left: '6%'
                  }}
                >
                  <div className="space-y-1">
                    <span className="bg-slate-900 border border-slate-850 px-2.5 py-0.5 rounded text-[8px] font-black uppercase text-emerald-500">District Map Info</span>
                    <h5 className="text-sm font-black text-slate-100 flex items-center space-x-1">
                      <span>{hoveredNode.name}</span>
                      <span className="text-xs text-slate-450 font-bold">({hoveredNode.nameGu})</span>
                    </h5>
                    
                    <div className="pt-1.5 border-t border-slate-850 text-xs space-y-1">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: getSoilDetailsByTypeName(hoveredNode.soilType).color }} />
                        <span className="font-bold text-slate-205">
                          {lang === 'gu' ? getSoilDetailsByTypeName(hoveredNode.soilType).nameGu : getSoilDetailsByTypeName(hoveredNode.soilType).nameEn}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold">Click to view full NPK report.</div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Right Soil details tray */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col h-[520px] overflow-y-auto">
          
          <div className="pb-4 border-b border-slate-850 shrink-0 flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base sm:text-lg font-black text-slate-105 tracking-tight">
              {lang === 'gu' ? 'જમીન વિશ્લેષણ પેનલ' : 'Soil Analysis Panel'}
            </h3>
          </div>

          {!selectedDistrict && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-slate-955 border border-slate-850 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-slate-500 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-205">
                  {lang === 'gu' ? 'કોઈપણ જિલ્લો પસંદ કરો' : 'No District Selected'}
                </h4>
                <p className="text-xs text-slate-455 font-bold max-w-xs mt-1.5 leading-relaxed">
                  {lang === 'gu'
                    ? 'નકશામાંથી કોઈપણ જિલ્લાની સીમા પર ક્લિક કરીને NPK પોષક તત્વો, પીએચ આંક, અનુકૂળ પાકો અને ખાતર ભલામણો જુઓ.'
                    : 'Click on any district from the GIS map to retrieve localized chemical properties, texture specs, and fertilizer recommendations.'}
                </p>
              </div>
            </div>
          )}

          {selectedDistrict && (
            <div className="flex-1 space-y-5 py-3 scrollbar-thin overflow-y-auto pr-1">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-lg font-black text-slate-100">
                    {selectedDistrict.name} <span className="text-xs font-bold text-slate-455">({selectedDistrict.nameGu})</span>
                  </h4>
                  <span className="text-[9px] text-slate-455 font-black uppercase tracking-wider block mt-0.5">
                    Gujarat State District
                  </span>
                </div>
                <button
                  onClick={() => setSelectedDistrict(null)}
                  className="text-[10px] text-slate-450 hover:text-white font-extrabold underline cursor-pointer"
                >
                  Clear
                </button>
              </div>

              {/* Chemical Specs Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-955 p-3 rounded-2xl border border-slate-850">
                <div>
                  <span className="text-[8px] text-slate-455 font-black uppercase tracking-wider block">Soil pH</span>
                  <span className="text-xs font-black text-slate-105 block mt-0.5">{selectedDistrict.pH}</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-455 font-black uppercase tracking-wider block">Organic Carbon</span>
                  <span className="text-xs font-black text-slate-105 block mt-0.5">{selectedDistrict.organicCarbon}</span>
                </div>
              </div>

              {/* Dominant type */}
              <div className="space-y-1">
                <span className="text-[9px] font-black text-slate-450 uppercase tracking-widest block flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: getSoilDetailsByTypeName(selectedDistrict.soilType).color }} />
                  <span>{lang === 'gu' ? 'જમીનનો પ્રકાર' : 'Soil Classification'}</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-205 font-bold">
                  {lang === 'gu' ? getSoilDetailsByTypeName(selectedDistrict.soilType).nameGu : getSoilDetailsByTypeName(selectedDistrict.soilType).nameEn}
                </p>
              </div>

              {/* Soil Texture */}
              <div className="space-y-1">
                <span className="text-[9px] font-black text-slate-455 uppercase tracking-widest block">Soil Texture</span>
                <p className="text-xs sm:text-sm text-slate-205 font-bold">{selectedDistrict.soilTexture}</p>
              </div>

              {/* NPK parameters */}
              <div className="space-y-2">
                <span className="text-[9px] font-black text-slate-455 uppercase tracking-widest block">Primary Nutrients Status</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-955 p-2 rounded-xl border border-slate-850 text-center">
                    <span className="text-[8px] text-slate-500 font-black block">Nitrogen (N)</span>
                    <span className="text-[11px] font-black text-emerald-450 mt-0.5 block">{selectedDistrict.nitrogen}</span>
                  </div>
                  <div className="bg-slate-955 p-2 rounded-xl border border-slate-850 text-center">
                    <span className="text-[8px] text-slate-500 font-black block">Phosphorus (P)</span>
                    <span className="text-[11px] font-black text-emerald-450 mt-0.5 block">{selectedDistrict.phosphorus}</span>
                  </div>
                  <div className="bg-slate-955 p-2 rounded-xl border border-slate-850 text-center">
                    <span className="text-[8px] text-slate-500 font-black block">Potassium (K)</span>
                    <span className="text-[11px] font-black text-emerald-450 mt-0.5 block">{selectedDistrict.potassium}</span>
                  </div>
                </div>
              </div>

              {/* Physical Traits */}
              <div className="space-y-3 pt-3.5 border-t border-slate-855">
                <div className="flex items-start space-x-2">
                  <Droplet className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-black text-slate-105 uppercase tracking-wider block">Water Holding Capacity</span>
                    <span className="text-xs text-slate-350 font-bold block mt-0.5">{selectedDistrict.waterHoldingCapacity}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Wind className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-black text-slate-105 uppercase tracking-wider block">Drainage Quality</span>
                    <span className="text-xs text-slate-350 font-bold block mt-0.5">{selectedDistrict.drainageQuality}</span>
                  </div>
                </div>
              </div>

              {/* Suitable Crops */}
              <div className="space-y-1 pt-3 border-t border-slate-855">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block flex items-center space-x-1.5">
                  <Sprout className="w-4 h-4 text-emerald-500" />
                  <span>{lang === 'gu' ? 'અનુકૂળ પાકો' : 'Suitable Crops'}</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed">{selectedDistrict.suitableCrops}</p>
              </div>

              {/* Recommended Fertilizers */}
              <div className="space-y-1 pt-3 border-t border-slate-855">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>{lang === 'gu' ? 'ભલામણ કરેલ ખાતરો' : 'Recommended Fertilizers'}</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed">{selectedDistrict.recommendedFertilizers}</p>
              </div>

              {/* Irrigation Suggestions */}
              <div className="space-y-1 pt-3 border-t border-slate-855">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-emerald-500" />
                  <span>{lang === 'gu' ? 'સિંચાઈ ભલામણ' : 'Irrigation Suggestions'}</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed">{selectedDistrict.irrigationSuggestions}</p>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
