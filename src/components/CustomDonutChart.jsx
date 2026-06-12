import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

function CustomDonutChart() {
  const [selectedMetric, setSelectedMetric] = useState('ctr'); // 'roas', 'conversion', 'ctr'
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [hoveredMetric, setHoveredMetric] = useState(null);
  
  const containerRef = useRef(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  const getMetricKeyForTick = (i) => {
    if (i <= 5) return 'ctr';
    if (i <= 8) return 'conversion';
    return 'roas';
  };

  // Metrics dataset mapping your exact dashboard values
  const METRICS = {
    roas: {
      name: 'Average ROAS',
      value: '4.7x',
      percentage: 47,
      color: '#5D4DFF',
      liveDetail1: {
        label: 'Meta Ad Spend',
        value: '$1,329',
      },
      liveDetail2: {
        label: 'Meta Ad Revenue',
        value: '$6,246',
      }
    },
    conversion: {
      name: 'Conversion Rate',
      value: '27.0%',
      percentage: 27,
      color: '#A1D0B6',
      liveDetail1: {
        label: 'Meta Conversions',
        value: '707',
      },
      liveDetail2: {
        label: 'Cost Per Conversion',
        value: '$1.88',
      }
    },
    ctr: {
      name: 'Click-Through Rate',
      value: '81.1%',
      percentage: 81,
      color: '#8BC5F4',
      liveDetail1: {
        label: 'Meta Clicks',
        value: '15,000',
      },
      liveDetail2: {
        label: 'Cost Per Click (CPC)',
        value: '$0.09',
      }
    }
  };

  const activeMetric = METRICS[selectedMetric];

  // SVG Gauge calculations
  const sizeX = 400;
  const sizeY = 240;
  const cx = 200;
  const cy = 200;
  const radius = 170;

  const totalTicks = 14;
  const startAngle = 185; // Left horizontal start
  const endAngle = 355;   // Right horizontal end
  const angleStep = (endAngle - startAngle) / (totalTicks - 1);

  /* =========================================================================
     PREVIOUS DONUT CHART DESIGN CODE (COMMENTED OUT AS REQUESTED BY USER)
     =========================================================================
     
     const [hoveredIndex, setHoveredIndex] = useState(null);
     const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
     const containerRef = useRef(null);

     const sizeX_old = 300;
     const sizeY_old = 220;
     const radius_old = 90;
     const circumference = 2 * Math.PI * radius_old; // 565.487

     const greenLength = (71.2 / 360) * circumference; // 111.82 (27%)
     const blueLength = (67.6 / 360) * circumference; // 106.17 (26%)
     const purpleLength = (143.2 / 360) * circumference; // 225.01 (47%)

     const SEGMENTS = [
       {
         name: 'Conversion Rate',
         percentage: 27,
         value: '27.0%',
         color: '#A1D0B6',
         length: greenLength,
         transform: "rotate(-90 150 110)",
         textX: 202.4,
         textY: 36.8,
         textLight: false
       },
       {
         name: 'Click-Through Rate',
         percentage: 26,
         value: '26.0%',
         color: '#8BC5F4',
         length: blueLength,
         transform: "rotate(7.2 150 110)",
         textX: 217.9,
         textY: 169.1,
         textLight: false
       },
       {
         name: 'Average ROAS',
         percentage: 47,
         value: '4.7x',
         color: '#5D4DFF',
         length: purpleLength,
         transform: "rotate(100.8 150 110)",
         textX: 60.8,
         textY: 121.9,
         textLight: true
       }
     ];

     const handleMouseMove = (e) => {
       if (!containerRef.current) return;
       const rect = containerRef.current.getBoundingClientRect();
       const x = e.clientX - rect.left;
       const y = e.clientY - rect.top;
       setTooltipPos({ x, y });
     };

     // Inside return structure of the old layout:
     <svg viewBox={`0 0 300 220`}>
       <circle cx="150" cy="110" r="90" fill="none" stroke="#1e293b" strokeWidth="32" className="opacity-15" />
       {SEGMENTS.map((seg, idx) => (
         <motion.circle cx="150" cy="110" r="90" fill="none" stroke={seg.color} strokeWidth={32} strokeDasharray={`${seg.length} ${circumference}`} transform={seg.transform} />
       ))}
     </svg>
     ========================================================================= */

  return (
    <div className="bg-[#0c0d12] text-white p-5 md:p-6 rounded-[2rem] shadow-sm flex flex-col justify-between h-full relative overflow-hidden transition-all hover:shadow-lg select-none">
      
      {/* Card Header & Switcher Dropdown */}
      <div className="flex justify-between items-center mb-4 z-10">
        <h3 className="text-lg font-bold tracking-tight text-slate-100">Performance Analysis</h3>
        
        {/* Interactive Dropdown Switcher matching your other filters */}
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-slate-400 hover:text-white text-xs font-semibold px-4 py-2 rounded-full border border-slate-800 hover:border-slate-700 bg-slate-900/40 transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>Filter</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 mt-2 bg-[#12131a] border border-slate-800 rounded-xl shadow-xl py-1 w-44 z-50 overflow-hidden"
                >
                  {[
                    { key: 'roas', label: 'Average ROAS' },
                    { key: 'conversion', label: 'Conversion Rate' },
                    { key: 'ctr', label: 'Click-Through Rate' }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        setSelectedMetric(item.key);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold transition-all flex items-center justify-between ${
                        selectedMetric === item.key 
                          ? 'bg-white/5 text-white font-bold border-l-2 border-[#5D4DFF]' 
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {selectedMetric === item.key && <Check className="w-3 h-3 text-[#5D4DFF]" />}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* SVG Container: Gauge Speedometer matching the first reference image */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative flex-1 flex items-center justify-center py-1"
      >
        <svg 
          viewBox={`0 0 ${sizeX} ${sizeY}`} 
          className="w-full max-w-[400px] h-auto overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Radial Ticks representing CTR (0-5), Conversion (6-8), and ROAS (9-13) */}
          <g>
            {Array.from({ length: totalTicks }).map((_, i) => {
              const angle = startAngle + i * angleStep;
              const metricKey = getMetricKeyForTick(i);
              const isSelected = selectedMetric === metricKey;
              const isHovered = hoveredMetric === metricKey;
              
              const tickColor = METRICS[metricKey].color;
              
              // Active metric is fully lit; inactive is dimmed; hovered glows
              let tickOpacity = 0.25;
              if (isSelected) {
                tickOpacity = 1.0;
              } else if (isHovered) {
                tickOpacity = 0.65;
              }

              return (
                <motion.path
                  key={i}
                  d="M 193.1 80.2 L 186.7 30.5 A 170 170 0 0 1 213.3 30.5 L 206.9 80.2 A 120 120 0 0 0 193.1 80.2 Z"
                  fill={tickColor}
                  stroke={tickColor}
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  transform={`rotate(${angle - 270} ${cx} ${cy})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: tickOpacity }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedMetric(metricKey)}
                  onMouseEnter={() => setHoveredMetric(metricKey)}
                  onMouseLeave={() => setHoveredMetric(null)}
                  className="cursor-pointer hover:brightness-110 transition-all"
                />
              );
            })}
          </g>

          {/* Center texts: Value and Subtext */}
          <g className="pointer-events-none">
            <text 
              x="200" 
              y="140" 
              textAnchor="middle" 
              className="text-4xl font-extrabold fill-white tracking-tight"
            >
              {activeMetric.value}
            </text>
            <text 
              x="200" 
              y="168" 
              textAnchor="middle" 
              className="text-[11px] font-bold fill-slate-400 uppercase tracking-widest"
            >
              {activeMetric.name}
            </text>
          </g>
        </svg>

        {/* Hover Tooltip Popup */}
        <AnimatePresence>
          {hoveredMetric && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              style={{
                position: 'absolute',
                left: tooltipPos.x + 12,
                top: tooltipPos.y - 35,
                pointerEvents: 'none',
                zIndex: 50,
              }}
              className="bg-[#4856f0] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5"
            >
              <span 
                className="w-1.5 h-1.5 rounded-full border border-white/40 shadow-sm" 
                style={{ backgroundColor: METRICS[hoveredMetric].color }} 
              />
              <span>{METRICS[hoveredMetric].name}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Meta Ads Live Integration Footer */}
      <div className="mt-4 space-y-3 z-10 w-full px-1">
        
        {/* Meta Ads Account status bar */}
        <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-2xl px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            {/* Meta infinity logo */}
            <svg className="w-4.5 h-4.5 text-[#0064E0]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.9 7.4c-1.2 0-2.3.5-3.2 1.5-.9-1-2-1.5-3.2-1.5C8 7.4 6 9.4 6 12s2 4.6 4.5 4.6c1.2 0 2.3-.5 3.2-1.5.9 1 2 1.5 3.2 1.5 2.5 0 4.5-2 4.5-4.6s-2-4.6-4.5-4.6zm0 7.4c-1.4 0-2.5-1.1-2.5-2.8s1.1-2.8 2.5-2.8 2.5 1.1 2.5 2.8-1.1 2.8-2.5 2.8zm-6.4 0c-1.4 0-2.5-1.1-2.5-2.8s1.1-2.8 2.5-2.8 2.5 1.1 2.5 2.8-1.1 2.8-2.5 2.8z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 leading-none">Meta Ads API</span>
              <span className="text-white text-xs font-semibold mt-0.5 truncate max-w-[130px] md:max-w-[150px]">
                Hint Media Ad-Account
              </span>
            </div>
          </div>

          {/* Live Syncing Button */}
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 text-[10px] font-bold text-slate-300 hover:text-white transition-all cursor-pointer border border-white/5 disabled:opacity-50"
          >
            {isSyncing ? (
              <>
                <motion.svg 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-3 h-3 text-[#8BC5F4]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                </motion.svg>
                <span>Syncing...</span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Synced</span>
              </>
            )}
          </button>
        </div>

        {/* Live Meta Ad Account Metrics breakdown */}
        <div className="grid grid-cols-2 gap-2 bg-[#12131a]/60 border border-slate-800 rounded-2xl p-3">
          <div className="border-r border-slate-800/80 pr-1">
            <span className="text-slate-500 text-[9px] font-black uppercase tracking-wider block">
              {activeMetric.liveDetail1.label}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-white text-base font-extrabold tracking-tight">
                {activeMetric.liveDetail1.value}
              </span>
            </div>
          </div>
          <div className="pl-2">
            <span className="text-slate-500 text-[9px] font-black uppercase tracking-wider block">
              {activeMetric.liveDetail2.label}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-white text-base font-extrabold tracking-tight">
                {activeMetric.liveDetail2.value}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default CustomDonutChart;
