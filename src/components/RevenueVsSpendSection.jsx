import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function RevenueVsSpendSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // 12 Months data matching the transactions and revenue vs spend in the reference images
  const MONTHS_DATA = [
    { name: 'Jan', revenue: '$12,450', spend: '$3,200', revenueVal: 12450, spendVal: 3200 },
    { name: 'Feb', revenue: '$9,800', spend: '$2,850', revenueVal: 9800, spendVal: 2850 },
    { name: 'Mar', revenue: '$15,600', spend: '$4,500', revenueVal: 15600, spendVal: 4500 },
    { name: 'Apr', revenue: '$24,156', spend: '$6,200', revenueVal: 24156, spendVal: 6200 }, // April has the hovered $24,156 pin in reference image
    { name: 'May', revenue: '$35,200', spend: '$5,800', revenueVal: 35200, spendVal: 5800 },
    { name: 'Jun', revenue: '$48,900', spend: '$9,500', revenueVal: 48900, spendVal: 9500 },
    { name: 'Jul', revenue: '$42,000', spend: '$8,100', revenueVal: 42000, spendVal: 8100 },
    { name: 'Aug', revenue: '$46,500', spend: '$11,200', revenueVal: 46500, spendVal: 11200 },
    { name: 'Sep', revenue: '$39,800', spend: '$9,000', revenueVal: 39800, spendVal: 9000 },
    { name: 'Oct', revenue: '$45,100', spend: '$10,500', revenueVal: 45100, spendVal: 10500 },
    { name: 'Nov', revenue: '$41,200', spend: '$9,800', revenueVal: 41200, spendVal: 9800 },
    { name: 'Dec', revenue: '$47,800', spend: '$12,400', revenueVal: 47800, spendVal: 12400 }
  ];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTooltipPos({ x, y });
  };

  // SVG Chart Setup
  const sizeX = 520;
  const sizeY = 200;
  
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 35; // Increased top padding to prevent overlap with header text
  const paddingBottom = 25;
  
  const gridWidth = sizeX - paddingLeft - paddingRight; // 460
  const gridHeight = sizeY - paddingTop - paddingBottom; // 140
  const axisY = sizeY - paddingBottom; // 175

  const getX = (i) => paddingLeft + i * (gridWidth / 11);
  const getY = (val) => axisY - (val / 50000) * gridHeight;

  // Generate smooth cubic bezier line path
  const getBezierPath = (points) => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 3;
      const cpY1 = p0.y;
      const cpX2 = p1.x - (p1.x - p0.x) / 3;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  // Generate smooth area path (closed shape to baseline axisY)
  const getAreaPath = (points) => {
    const linePath = getBezierPath(points);
    if (!linePath) return '';
    const first = points[0];
    const last = points[points.length - 1];
    return `${linePath} L ${last.x} ${axisY} L ${first.x} ${axisY} Z`;
  };

  const revenuePoints = MONTHS_DATA.map((d, i) => ({ x: getX(i), y: getY(d.revenueVal) }));
  const spendPoints = MONTHS_DATA.map((d, i) => ({ x: getX(i), y: getY(d.spendVal) }));

  const revenueLine = getBezierPath(revenuePoints);
  const revenueArea = getAreaPath(revenuePoints);
  const spendLine = getBezierPath(spendPoints);
  const spendArea = getAreaPath(spendPoints);

  // Grid levels
  const yLevels = [0, 10000, 20000, 30000, 40000, 50000];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch relative"
    >
      {/* LEFT CARD: Revenue vs Spend Dual Line Area Chart */}
      <div className="lg:col-span-7 bg-white border border-slate-200/50 p-5 md:p-6 rounded-[2.5rem] flex flex-col justify-between h-[360px] transition-all hover:shadow-md relative overflow-hidden select-none">
        
        {/* Header Block arranged horizontally to save vertical space and prevent overlap */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Revenue vs Spend</h3>
            <div className="text-3xl font-black text-slate-800 tracking-tight mt-0.5">$54,763.00</div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Custom Legend matching the second reference image's color mapping */}
            <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5D4DFF]" />
                <span>Revenue</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8BC5F4]" />
                <span>Spend</span>
              </span>
            </div>

            {/* Year Dropdown Filter */}
            <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200/50 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 flex items-center gap-1.5 transition-all cursor-pointer">
              <span>This Year</span>
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* SVG Area Chart Canvas */}
        <div className="flex-1 w-full flex items-end min-h-[180px] mt-2 relative">
          <svg 
            viewBox={`0 0 ${sizeX} ${sizeY}`} 
            className="w-full h-auto overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Purple Area Gradient for Revenue */}
              <linearGradient id="revenue-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5D4DFF" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#5D4DFF" stopOpacity="0.00" />
              </linearGradient>

              {/* Blue Area Gradient for Spend */}
              <linearGradient id="spend-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8BC5F4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#8BC5F4" stopOpacity="0.00" />
              </linearGradient>

              {/* Speech bubble pin shadow */}
              <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#5D4DFF" floodOpacity="0.2" />
              </filter>
            </defs>

            {/* Gridlines and Y Labels */}
            {yLevels.map((level, idx) => {
              const y = getY(level);
              return (
                <g key={idx}>
                  {/* Gridline (omitted for the axis floor line to look clean) */}
                  {level > 0 && (
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={sizeX - paddingRight}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeWidth="1"
                    />
                  )}
                  {/* Label */}
                  <text
                    x={paddingLeft - 8}
                    y={y}
                    textAnchor="end"
                    dominantBaseline="central"
                    className="text-[9px] font-bold fill-slate-400 select-none"
                  >
                    {level === 0 ? '0' : `${level / 1000}k`}
                  </text>
                </g>
              );
            })}

            {/* Area Fills */}
            <path d={revenueArea} fill="url(#revenue-grad)" />
            <path d={spendArea} fill="url(#spend-grad)" />

            {/* Path Lines */}
            <path d={spendLine} fill="none" stroke="#8BC5F4" strokeWidth="2.5" strokeLinecap="round" />
            <path d={revenueLine} fill="none" stroke="#5D4DFF" strokeWidth="2.5" strokeLinecap="round" />

            {/* X-Axis Month Labels */}
            {MONTHS_DATA.map((d, i) => (
              <text
                key={i}
                x={getX(i)}
                y={axisY + 16}
                textAnchor="middle"
                className={`text-[10px] font-bold select-none transition-all duration-200 ${
                  hoveredIndex === i ? 'fill-[#5D4DFF] font-black' : 'fill-slate-400'
                }`}
              >
                {d.name}
              </text>
            ))}

            {/* Interactive Vertical Guide, Dots and Floating Speech Bubble Badge */}
            {hoveredIndex !== null && (
              <g>
                {/* Dashed vertical guide line */}
                <line
                  x1={getX(hoveredIndex)}
                  y1={topTopCoordinateForGuideLine(hoveredIndex)}
                  x2={getX(hoveredIndex)}
                  y2={axisY}
                  stroke="#5D4DFF"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  className="opacity-50"
                />

                {/* Spend dot */}
                <circle
                  cx={getX(hoveredIndex)}
                  cy={spendPoints[hoveredIndex].y}
                  r="5"
                  fill="#8BC5F4"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* Revenue dot */}
                <circle
                  cx={getX(hoveredIndex)}
                  cy={revenuePoints[hoveredIndex].y}
                  r="5.5"
                  fill="#5D4DFF"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* Speech Bubble Pin Badge above Revenue Point */}
                <g 
                  transform={`translate(${getX(hoveredIndex)}, ${revenuePoints[hoveredIndex].y - 24})`}
                  filter="url(#shadow)"
                >
                  {/* Rounded bubble capsule */}
                  <rect
                    x="-32"
                    y="-12"
                    width="64"
                    height="19"
                    rx="5"
                    fill="#5D4DFF"
                  />
                  {/* Downward triangle pointer */}
                  <polygon
                    points="-4,7 4,7 0,11"
                    fill="#5D4DFF"
                  />
                  {/* Indicator Dot inside the bubble */}
                  <circle cx="-22" cy="-2.5" r="2" fill="#ffffff" className="opacity-80" />
                  {/* Text value */}
                  <text
                    x="5"
                    y="-2.5"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[9px] font-black fill-white select-none tracking-tight"
                  >
                    {MONTHS_DATA[hoveredIndex].revenue}
                  </text>
                </g>
              </g>
            )}

            {/* Invisible hover-capture columns */}
            {MONTHS_DATA.map((d, i) => {
              const x = getX(i);
              const colWidth = gridWidth / 11;
              return (
                <rect
                  key={i}
                  x={x - colWidth / 2}
                  y={paddingTop}
                  width={colWidth}
                  height={gridHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* RIGHT CARD: Redesigned AI Performance Report Card on #a9c6f5 background */}
      <div className="lg:col-span-5 bg-[#a9c6f5] p-5 md:p-6 rounded-[2.5rem] flex flex-col justify-between h-[360px] relative overflow-hidden select-none">
        
        {/* Header Block */}
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2 bg-[#5D4DFF] text-white px-3 py-1 rounded-full shadow-sm">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.71h-5.696l.813-5.096L4 15.904h5.813z" />
            </svg>
            <span className="text-[10px] font-extrabold tracking-wider uppercase">AI Report</span>
          </div>
          <span className="text-[11px] text-slate-700 font-bold">Jun 5 – Jun 12, 2026</span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3.5 my-1">
          {/* AVG CTR Stat Tile */}
          <div className="bg-white/60 border border-white/20 hover:bg-white/75 rounded-2xl p-3 flex flex-col gap-0.5 transition-all shadow-sm">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Avg CTR</span>
            <div className="flex items-center gap-1 mt-0.5">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-[1.1rem] font-extrabold text-slate-900 tracking-tight">0.00%</span>
            </div>
          </div>

          {/* AVERAGE CPA Stat Tile */}
          <div className="bg-white/60 border border-white/20 hover:bg-white/75 rounded-2xl p-3 flex flex-col gap-0.5 transition-all shadow-sm">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Average CPA</span>
            <div className="flex items-center gap-1 mt-0.5">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
              <span className="text-[1.1rem] font-extrabold text-slate-900 tracking-tight">AED 0.00</span>
            </div>
          </div>
        </div>

        {/* AI Recommendation Speech Bubble Card */}
        <div className="bg-white border border-white/30 rounded-2xl p-3.5 shadow-sm flex items-start gap-3 my-1">
          {/* AI Sparkle Icon Avatar */}
          <div className="w-7 h-7 rounded-full bg-[#5D4DFF]/15 text-[#5D4DFF] flex items-center justify-center shrink-0 shadow-inner">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.71h-5.696l.813-5.096L4 15.904h5.813z" />
            </svg>
          </div>
          {/* Recommendation Content */}
          <div className="flex-1">
            <span className="text-[9px] font-black text-[#5D4DFF] uppercase tracking-wider">AI Recommendation</span>
            <p className="text-[11px] font-semibold text-slate-700 leading-relaxed mt-0.5">
              Achieved <span className="text-slate-900 font-bold">0.00x ROAS</span> on <span className="text-slate-900 font-bold">AED 0 spend</span>. Average CPA is <span className="text-slate-900 font-bold">AED 0.00</span>. Top performing asset: <span className="text-slate-500 font-bold">N/A</span>.
            </p>
          </div>
        </div>

        {/* Footer action button */}
        <button className="w-full bg-[#5D4DFF] hover:bg-[#4d3dfc] text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#5D4DFF]/15 active:scale-[0.98] cursor-pointer mt-1">
          <span>Read Full Performance Report</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Floating Interactive Detail Tooltip (shown on hover over bottom grid area) */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              left: tooltipPos.x,
              top: tooltipPos.y - 70,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 50,
            }}
            className="bg-white/95 backdrop-blur-md border border-slate-200/80 px-3.5 py-2.5 rounded-xl shadow-xl flex flex-col gap-1 min-w-[150px]"
          >
            <span className="text-[10px] font-bold text-[#5D4DFF] uppercase tracking-wider leading-none">
              {MONTHS_DATA[hoveredIndex].name} Detail
            </span>
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Revenue:</span>
                <span className="text-xs font-extrabold text-slate-800">{MONTHS_DATA[hoveredIndex].revenue}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Spend:</span>
                <span className="text-xs font-extrabold text-slate-800">{MONTHS_DATA[hoveredIndex].spend}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Helper to get vertical guide top line coordinate (clipped to the highest curve dot for aesthetics)
  function topTopCoordinateForGuideLine(idx) {
    const rY = revenuePoints[idx].y;
    const sY = spendPoints[idx].y;
    return Math.min(rY, sY) - 5;
  }
}

export default RevenueVsSpendSection;
