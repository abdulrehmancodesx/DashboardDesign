import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Height and composition of all 18 thin pillars
// type: 'blue' (all blue), 'stacked' (green bottom + blue top), 'green' (all green)
const BARS_DATA = [
  { type: 'blue', total: 32 },
  { type: 'blue', total: 58 },
  { type: 'blue', total: 82 },
  { type: 'blue', total: 98 }, // Jan group
  { type: 'blue', total: 132 }, // Feb Peak
  { type: 'stacked', total: 62, green: 38 },
  { type: 'green', total: 42 }, // Feb group
  { type: 'stacked', total: 76, green: 48 },
  { type: 'stacked', total: 68, green: 42 },
  { type: 'stacked', total: 80, green: 50 },
  { type: 'stacked', total: 78, green: 48 }, // Mar group
  { type: 'stacked', total: 52, green: 32 },
  { type: 'green', total: 38 },
  { type: 'stacked', total: 72, green: 45 },
  { type: 'stacked', total: 68, green: 42 }, // Apr group
  { type: 'stacked', total: 74, green: 46 },
  { type: 'stacked', total: 55, green: 35 },
  { type: 'green', total: 45 }, // May group
];

function CustomBarChart() {
  const [selectedMetric, setSelectedMetric] = useState('cpa'); // 'cpa', 'cpc', 'cpm'
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const METRICS = {
    cpa: { label: 'Average CPA', value: '3.53', prefix: '$', suffix: '' },
    cpc: { label: 'Average CPC', value: '0.48', prefix: '$', suffix: '' },
    cpm: { label: 'Average CPM', value: '12.80', prefix: '$', suffix: '' }
  };

  const currentMetric = METRICS[selectedMetric];
  const multiplier = selectedMetric === 'cpa' ? 1.0 : selectedMetric === 'cpc' ? 0.4 : 0.7;

  const sizeX = 350;
  const sizeY = 200;
  const axisY = 160;
  const barWidth = 8;
  const spacing = 18;
  const startX = 18;
  const r = barWidth / 2; // 4px

  return (
    <div className="bg-white p-5 md:p-6 rounded-[2rem] shadow-sm flex flex-col justify-between h-full relative overflow-hidden border border-white/20 transition-all hover:shadow-md select-none">
      
      {/* Top Header Metrics */}
      <div className="flex justify-between items-start mb-4 relative">
        <span className="inline-flex items-center bg-[#5D4DFF] text-white text-[11px] font-semibold px-3 py-1 rounded-full tracking-normal">
          Live
        </span>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <div className="text-[1.85rem] font-bold text-slate-900 tracking-tight flex items-baseline leading-none">
              {currentMetric.prefix && <span className="text-lg font-semibold text-slate-900 mr-0.5">{currentMetric.prefix}</span>}
              {currentMetric.value}
              {currentMetric.suffix && <span className="text-lg font-semibold text-slate-900 ml-0.5">{currentMetric.suffix}</span>}
            </div>
            <div className="text-[11px] text-slate-400 font-semibold mt-1 tracking-normal">{currentMetric.label}</div>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200/40 flex items-center justify-center transition-all shadow-sm active:scale-95"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 12h4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <>
                  {/* Overlay to close dropdown when clicking outside */}
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 mt-2 bg-[#12131a] border border-slate-800 rounded-xl shadow-xl py-1 w-44 z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        setSelectedMetric('cpa');
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold transition-all flex items-center justify-between ${
                        selectedMetric === 'cpa' 
                          ? 'bg-white/5 text-white font-bold border-l-2 border-[#5D4DFF]' 
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      Average CPA
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMetric('cpc');
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold transition-all flex items-center justify-between ${
                        selectedMetric === 'cpc' 
                          ? 'bg-white/5 text-white font-bold border-l-2 border-[#5D4DFF]' 
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      Average CPC
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMetric('cpm');
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold transition-all flex items-center justify-between ${
                        selectedMetric === 'cpm' 
                          ? 'bg-white/5 text-white font-bold border-l-2 border-[#5D4DFF]' 
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      Average CPM
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* SVG Canvas holding the thin pillars */}
      <div className="flex-1 w-full flex items-end min-h-[120px]">
        <svg 
          viewBox={`0 0 ${sizeX} ${sizeY}`} 
          className="w-full h-auto overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Render 18 Capsule Bars */}
          {BARS_DATA.map((bar, idx) => {
            const x = startX + idx * spacing;
            const duration = 0.8;
            const delay = idx * 0.03;

            const totalH = bar.total * multiplier;
            const greenH = (bar.green || 0) * multiplier;
            const blueH = totalH - greenH;

            // Render using motion.g for vertical scaling transition from baseline axisY
            return (
              <motion.g
                key={idx}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration, ease: "easeOut", delay }}
                style={{ transformOrigin: `${x + r}px ${axisY}px` }}
              >
                {bar.type === 'blue' ? (
                  // Solid Blue/Purple capsule
                  <rect
                    x={x}
                    y={axisY - totalH}
                    width={barWidth}
                    height={totalH}
                    rx={r}
                    fill="#5D4DFF"
                  />
                ) : bar.type === 'green' ? (
                  // Solid Sage Green capsule
                  <rect
                    x={x}
                    y={axisY - totalH}
                    width={barWidth}
                    height={totalH}
                    rx={r}
                    fill="#A1D0B6"
                  />
                ) : (
                  // Stacked capsule: Green bottom with rounded-bottom/flat-top, Purple top with flat-bottom/rounded-top
                  <g>
                    {/* Green bottom segment */}
                    <path
                      d={`M ${x} ${axisY - greenH} h ${barWidth} v ${greenH - r} a ${r} ${r} 0 0 1 -${barWidth} 0 Z`}
                      fill="#A1D0B6"
                    />
                    {/* Purple top segment */}
                    <path
                      d={`M ${x} ${axisY - greenH} v -${blueH - r} a ${r} ${r} 0 0 1 ${barWidth} 0 v ${blueH - r} Z`}
                      fill="#5D4DFF"
                    />
                  </g>
                )}
              </motion.g>
            );
          })}

          {/* Month labels positioned along the x-axis */}
          <text x="49" y="182" textAnchor="middle" className="text-[11px] font-semibold fill-slate-400 select-none">Jan</text>
          <text x="112" y="182" textAnchor="middle" className="text-[11px] font-semibold fill-slate-400 select-none">Feb</text>
          <text x="175" y="182" textAnchor="middle" className="text-[11px] font-semibold fill-slate-400 select-none">Mar</text>
          <text x="247" y="182" textAnchor="middle" className="text-[11px] font-semibold fill-slate-400 select-none">Apr</text>
          <text x="310" y="182" textAnchor="middle" className="text-[11px] font-semibold fill-slate-400 select-none">May</text>
        </svg>
      </div>
    </div>
  );
}

export default CustomBarChart;
