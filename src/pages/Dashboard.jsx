import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomBarChart from '../components/CustomBarChart';
import CustomDonutChart from '../components/CustomDonutChart';
import RevenueVsSpendSection from '../components/RevenueVsSpendSection';
import CampaignsTableSection from '../components/CampaignsTableSection';

function Dashboard() {
  const [selectedMetric, setSelectedMetric] = useState('spend'); // 'spend', 'impressions', 'clicks'
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [selectedAnnualMetric, setSelectedAnnualMetric] = useState('revenue'); // 'revenue', 'conversions', 'reach'
  const [annualDropdownOpen, setAnnualDropdownOpen] = useState(false);

  const METRICS = {
    spend: { label: 'This Month', value: '1,329', suffix: '$' },
    impressions: { label: 'Impressions', value: '84,200', suffix: '' },
    clicks: { label: 'Clicks', value: '15,000', suffix: '' }
  };

  const ANNUAL_METRICS = {
    revenue: { label: 'Projected Annual', value: '59,720', suffix: '$', isPercent: false },
    conversions: { label: 'Total Conversions', value: '707', suffix: '0%', isPercent: true },
    reach: { label: 'Total Reach', value: '142,500', suffix: '', isPercent: false }
  };

  const currentMetric = METRICS[selectedMetric];
  const currentAnnualMetric = ANNUAL_METRICS[selectedAnnualMetric];

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER CAPSULE */}
      <header className="bg-white/95 backdrop-blur-md px-8 py-4.5 rounded-[2rem] shadow-sm border border-slate-200/80 flex flex-row justify-between items-center transition-all select-none">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">Hint.</h1>
          <Link to="/v2" className="bg-[#5D4DFF] hover:bg-[#4d3ee6] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer shadow-sm shadow-[#5D4DFF]/15">
            Go to V2
          </Link>
        </div>
        
        {/* Header Action Tools mapping the second reference image */}
        <div className="flex items-center gap-2.5 md:gap-3">
          {/* All Accounts Dropdown */}
          <button className="hidden sm:flex bg-white hover:bg-slate-50 border border-slate-200 px-4.5 py-2 rounded-full text-sm font-semibold text-slate-800 items-center gap-2 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer">
            <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span>All Accounts</span>
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* AED Currency Badge */}
          <button className="bg-white hover:bg-slate-50 border border-slate-200 px-4.5 py-2 rounded-full text-sm font-semibold text-slate-800 flex items-center gap-1.5 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer">
            <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span>AED</span>
          </button>

          {/* Search circle button */}
          <button className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer">
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Notification bell circle button */}
          <button className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer relative">
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>

          {/* Sun theme circle button */}
          <button className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer">
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </button>

          {/* Profile User avatar circle */}
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User profile avatar" 
            className="w-10 h-10 rounded-full border border-slate-200 shadow-sm shrink-0 object-cover hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          />
        </div>
      </header>

      {/* 2. REVENUE FORECAST & SPENDING BY CATEGORY SIDE-BY-SIDE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch pb-6">
        {/* Revenue Forecast (Light Blue Card) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-brand-light-blue p-5 md:p-6 rounded-[2.5rem] shadow-sm flex flex-col gap-4 h-full transition-all">
            {/* Title and Filter Dropdown */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Revenue Forecast</h2>
              <button className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs font-semibold px-4 py-2 rounded-full bg-white/40 hover:bg-white/60 transition-all border border-white/20">
                <span>Filter</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Inner Cards & Chart Container */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch flex-1">
              {/* Left Summary Cards (This Month & Projected Annual) */}
              <div className="sm:col-span-5 flex flex-col justify-between gap-4">
                {/* This Month Capsule */}
                <div className="bg-white p-5 md:py-7 md:px-6 rounded-[2rem] shadow-sm border border-white/20 flex flex-col justify-between flex-1 transition-all hover:scale-[1.01] relative">
                  <div className="flex justify-between items-center w-full z-10">
                    <span className="text-slate-500 text-xs font-semibold tracking-normal">{currentMetric.label}</span>
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
                                  setSelectedMetric('spend');
                                  setDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-semibold transition-all flex items-center justify-between ${
                                  selectedMetric === 'spend' 
                                    ? 'bg-white/5 text-white font-bold border-l-2 border-[#5D4DFF]' 
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                Total Spend
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedMetric('impressions');
                                  setDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-semibold transition-all flex items-center justify-between ${
                                  selectedMetric === 'impressions' 
                                    ? 'bg-white/5 text-white font-bold border-l-2 border-[#5D4DFF]' 
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                Total Impressions
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedMetric('clicks');
                                  setDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-semibold transition-all flex items-center justify-between ${
                                  selectedMetric === 'clicks' 
                                    ? 'bg-white/5 text-white font-bold border-l-2 border-[#5D4DFF]' 
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                Total Clicks
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <div className="text-[2.5rem] font-bold text-slate-900 tracking-tight mt-1.5 flex items-baseline gap-1 leading-none">
                    {currentMetric.value}
                    {currentMetric.suffix && (
                      <span className="text-xl font-normal text-slate-900">{currentMetric.suffix}</span>
                    )}
                  </div>
                </div>

                {/* Projected Annual Capsule */}
                <div className="bg-[#5D4DFF] text-white p-5 md:py-7 md:px-6 rounded-[2rem] shadow-lg shadow-[#5D4DFF]/20 flex flex-col justify-between flex-1 transition-all hover:scale-[1.01] relative">
                  <div className="flex justify-between items-center w-full z-10">
                    <span className="text-white/80 text-xs font-semibold tracking-normal">{currentAnnualMetric.label}</span>
                    <div className="relative">
                      <button 
                        onClick={() => setAnnualDropdownOpen(!annualDropdownOpen)}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/10 flex items-center justify-center transition-all shadow-sm active:scale-95"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 12h4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {annualDropdownOpen && (
                          <>
                            {/* Overlay to close dropdown when clicking outside */}
                            <div className="fixed inset-0 z-40" onClick={() => setAnnualDropdownOpen(false)} />
                            
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              transition={{ duration: 0.12 }}
                              className="absolute right-0 mt-2 bg-[#12131a] border border-slate-800 rounded-xl shadow-xl py-1 w-44 z-50 overflow-hidden"
                            >
                              <button
                                onClick={() => {
                                  setSelectedAnnualMetric('revenue');
                                  setAnnualDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-semibold transition-all flex items-center justify-between ${
                                  selectedAnnualMetric === 'revenue' 
                                    ? 'bg-white/5 text-white font-bold border-l-2 border-[#5D4DFF]' 
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                Total Revenue
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedAnnualMetric('conversions');
                                  setAnnualDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-semibold transition-all flex items-center justify-between ${
                                  selectedAnnualMetric === 'conversions' 
                                    ? 'bg-white/5 text-white font-bold border-l-2 border-[#5D4DFF]' 
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                Total Conversions
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedAnnualMetric('reach');
                                  setAnnualDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-semibold transition-all flex items-center justify-between ${
                                  selectedAnnualMetric === 'reach' 
                                    ? 'bg-white/5 text-white font-bold border-l-2 border-[#5D4DFF]' 
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                Total Reach
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <div className="text-[2.5rem] font-bold text-white tracking-tight mt-1.5 flex items-baseline gap-1 leading-none">
                    {currentAnnualMetric.value}
                    {currentAnnualMetric.suffix && (
                      <span className={currentAnnualMetric.isPercent ? "text-xl font-semibold text-emerald-300 ml-1.5" : "text-xl font-normal text-white/80"}>
                        {currentAnnualMetric.suffix}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right SVG Chart */}
              <div className="sm:col-span-7">
                <CustomBarChart />
              </div>
            </div>
          </div>
        </div>

        {/* Spending By Category (Dark Card) */}
        <div className="lg:col-span-5">
          <CustomDonutChart />
        </div>
      </section>

      {/* 3. REVENUE VS SPEND & AI INSIGHT SECTION */}
      <section className="pb-6">
        <RevenueVsSpendSection />
      </section>

      {/* 4. RECENT CAMPAIGNS TABLE SECTION */}
      <section className="pb-6">
        <CampaignsTableSection />
      </section>
    </div>
  );
}

export default Dashboard;
