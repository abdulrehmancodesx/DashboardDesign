import React, { useState } from 'react';
import { Download, Search, Filter, ChevronDown, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Inline SVGs for Platform Logos
const MetaLogo = () => (
  <svg className="w-4 h-4 text-[#0064E0] fill-current" viewBox="0 0 24 24">
    <path d="M22.227 9.467a5.53 5.53 0 0 0-4.307-2.043c-2.316 0-4.316 1.431-5.92 3.62C10.396 8.855 8.396 7.424 6.08 7.424A5.53 5.53 0 0 0 1.773 9.467 6.136 6.136 0 0 0 1.76 14.54a5.524 5.524 0 0 0 4.313 2.036c2.316 0 4.316-1.43 5.927-3.62 1.603 2.19 3.603 3.62 5.92 3.62a5.531 5.531 0 0 0 4.313-2.036 6.136 6.136 0 0 0-.006-5.073zm-16.14 5.48c-.91 0-1.688-.344-2.189-.97a2.53 2.53 0 0 1-.502-1.623c0-.623.167-1.182.502-1.636.501-.632 1.28-.976 2.19-.976.91 0 1.677.344 2.17.962.335.454.502 1.013.502 1.65 0 .636-.167 1.19-.502 1.636-.493.618-1.26.957-2.17.957zm12.14 0c-.91 0-1.677-.339-2.17-.957a2.52 2.52 0 0 1-.502-1.636c0-.637.167-1.196.502-1.65.493-.618 1.26-.962 2.17-.962.91 0 1.689.344 2.19.976.335.454.502 1.013.502 1.636 0 .63-.167 1.189-.502 1.623-.501.626-1.28.97-2.19.97z" />
  </svg>
);

const GoogleLogo = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.84 14.9 1 12 1 7.35 1 3.39 3.67 1.46 7.56l3.86 3C6.23 7.56 8.89 5.04 12 5.04z" />
    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.11 2.73-2.37 3.58l3.68 2.85c2.16-1.99 3.4-4.91 3.4-8.58z" />
    <path fill="#FBBC05" d="M5.32 14.56a6.97 6.97 0 0 1 0-4.47L1.46 7.09C.53 8.94 0 10.97 0 13c0 2.03.53 4.06 1.46 5.91l3.86-2.97-.08-.38z" />
    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.68-2.85c-1.02.68-2.33 1.09-3.96 1.09-3.11 0-5.77-2.02-6.68-5.02l-3.86 3C3.39 20.33 7.35 23 12 23z" />
  </svg>
);

const TikTokLogo = () => (
  <svg className="w-4 h-4 text-black fill-current" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.66 4.13 1.13 1.2 2.69 1.93 4.31 2.05v3.91a8.94 8.94 0 0 1-5.59-1.98v6.78c.07 2.09-.73 4.19-2.27 5.61A8.25 8.25 0 0 1 8.7 22.8c-2.45-.19-4.8-1.74-5.91-3.97a8.5 8.5 0 0 1 .49-8.7c1.37-2.18 3.86-3.51 6.42-3.32v3.98a4.3 4.3 0 0 0-2.6 1.3 4.4 4.4 0 0 0-1 3.4 4.5 4.5 0 0 0 2.9 3.5 4.3 4.3 0 0 0 5.4-2.2c.16-.36.23-.76.22-1.15V.02h.005z"/>
  </svg>
);

// Campaigns dataset matching Mockup 3
const INITIAL_CAMPAIGNS = [
  { id: '1', name: 'ca_multi25_111025_en_ar_ml', platform: 'Meta', status: 'ACTIVE', spend: 'AED 1,124.08', impr: '35.6K', conv: 380, cpa: 'AED 2.96', roas: '0.00x', date: '6/1/2026' },
  { id: '2', name: 'ca_leads_web_uae_310126_en', platform: 'Meta', status: 'ACTIVE', spend: 'AED 679.28', impr: '33.7K', conv: 122, cpa: 'AED 5.57', roas: '0.00x', date: '6/1/2026' },
  { id: '3', name: 'ca_multi25_111025_ar', platform: 'Meta', status: 'ACTIVE', spend: 'AED 342.51', impr: '14.2K', conv: 75, cpa: 'AED 4.57', roas: '0.00x', date: '6/1/2026' },
  { id: '4', name: 'ca_mtcrpgwlp_060925_ml', platform: 'Meta', status: 'ACTIVE', spend: 'AED 348.21', impr: '33.6K', conv: 130, cpa: 'AED 2.68', roas: '0.00x', date: '6/1/2026' },
  { id: '5', name: 'ca_multi25_111025_en_ar_ml', platform: 'Meta', status: 'ACTIVE', spend: 'AED 3,090.31', impr: '98.6K', conv: 983, cpa: 'AED 3.14', roas: '0.00x', date: '5/1/2026' },
  { id: '6', name: 'ca_leads_web_uae_310126_en', platform: 'Meta', status: 'ACTIVE', spend: 'AED 1,834.16', impr: '72.3K', conv: 283, cpa: 'AED 6.48', roas: '0.00x', date: '5/1/2026' },
  { id: '7', name: 'ca_multi25_111025_ar', platform: 'Meta', status: 'ACTIVE', spend: 'AED 921.19', impr: '38.8K', conv: 256, cpa: 'AED 3.60', roas: '0.00x', date: '5/1/2026' },
  { id: '8', name: 'ca_mtcrpgwlp_060925_ml', platform: 'Meta', status: 'ACTIVE', spend: 'AED 926.87', impr: '83.9K', conv: 230, cpa: 'AED 4.03', roas: '0.00x', date: '5/1/2026' },
  // Google and TikTok entries to showcase full system integration and colors
  { id: '9', name: 'ca_google_brand_search_uae_2026', platform: 'Google', status: 'ACTIVE', spend: 'AED 2,450.00', impr: '120.4K', conv: 1450, cpa: 'AED 1.69', roas: '4.80x', date: '6/2/2026' },
  { id: '10', name: 'ca_tiktok_conversions_uae_lifestyle', platform: 'TikTok', status: 'ACTIVE', spend: 'AED 1,280.00', impr: '94.2K', conv: 640, cpa: 'AED 2.00', roas: '3.20x', date: '6/2/2026' },
  { id: '11', name: 'ca_meta_retargeting_purchase_paused', platform: 'Meta', status: 'PAUSED', spend: 'AED 450.00', impr: '18.5K', conv: 85, cpa: 'AED 5.29', roas: '0.00x', date: '5/28/2026' },
  { id: '12', name: 'ca_google_performance_max_shopping', platform: 'Google', status: 'PAUSED', spend: 'AED 3,890.00', impr: '145.8K', conv: 1920, cpa: 'AED 2.02', roas: '3.50x', date: '5/15/2026' }
];

function Campaigns() {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All'); // 'All', 'Meta', 'Google', 'TikTok'
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'ACTIVE', 'PAUSED'
  const [periodFilter, setPeriodFilter] = useState('All'); // 'All', 'June 2026', 'May 2026'

  // Dropdown Open/Close states
  const [platformOpen, setPlatformOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [periodOpen, setPeriodOpen] = useState(false);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleExport = () => {
    triggerToast('Report generated! PDF export has started.');
  };

  // Filter campaigns logic
  const filteredCampaigns = INITIAL_CAMPAIGNS.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.platform.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === 'All' || c.platform === platformFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    
    let matchesPeriod = true;
    if (periodFilter === 'June 2026') {
      matchesPeriod = c.date.startsWith('6/');
    } else if (periodFilter === 'May 2026') {
      matchesPeriod = c.date.startsWith('5/');
    }

    return matchesSearch && matchesPlatform && matchesStatus && matchesPeriod;
  });

  return (
    <div className="space-y-6 relative pb-12 select-none">
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-5 py-3 rounded-full shadow-xl z-50 flex items-center gap-2 border border-white/10"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HEADER CAPSULE */}
      <header className="bg-white/95 backdrop-blur-md px-8 py-4.5 rounded-[2rem] shadow-sm border border-slate-200/80 flex flex-row justify-between items-center transition-all">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">Campaigns</h1>
          <p className="text-slate-400 text-xs font-semibold mt-1.5 hidden sm:block">Manage and monitor all your campaigns across platforms.</p>
        </div>
        
        <button 
          onClick={handleExport}
          className="bg-[#4856f0] hover:bg-[#3b4be0] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#4856f0]/20 transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <Download className="w-4 h-4 text-white" strokeWidth={2.5} />
          <span>Export PDF</span>
        </button>
      </header>

      {/* 2. TABLE AND FILTERS MAIN CONTAINER */}
      <div className="bg-white border border-slate-200/50 p-6 md:p-8 rounded-[2.5rem] shadow-sm flex flex-col gap-6">
        
        {/* Filters Top Control Row */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" strokeWidth={2.5} />
            </span>
            <input
              type="text"
              placeholder="Search campaigns by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 hover:bg-slate-100/50 focus:bg-white focus:border-[#5D4DFF] focus:ring-1 focus:ring-[#5D4DFF] rounded-full pl-11 pr-4 py-2.5 text-xs font-semibold text-slate-700 outline-none transition-all placeholder-slate-400"
            />
          </div>

          {/* Filter Pill Capsules Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Clear Filters indicator */}
            {(platformFilter !== 'All' || statusFilter !== 'All' || periodFilter !== 'All' || searchQuery !== '') && (
              <button 
                onClick={() => {
                  setPlatformFilter('All');
                  setStatusFilter('All');
                  setPeriodFilter('All');
                  setSearchQuery('');
                  triggerToast('Filters cleared');
                }}
                className="text-xs font-bold text-[#5D4DFF] hover:underline cursor-pointer px-2"
              >
                Clear Filters
              </button>
            )}

            {/* General Filters Icon Badge */}
            <div className="bg-slate-50 border border-slate-200/60 px-4 py-2.5 rounded-full text-xs font-bold text-slate-600 flex items-center gap-1.5 shadow-sm">
              <Filter className="w-3.5 h-3.5 text-slate-400" strokeWidth={2.5} />
              <span>Filters</span>
            </div>

            {/* Platform Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setPlatformOpen(!platformOpen);
                  setStatusOpen(false);
                  setPeriodOpen(false);
                }}
                className="bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>Platform: <span className="text-[#5D4DFF]">{platformFilter}</span></span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" strokeWidth={2.5} />
              </button>

              <AnimatePresence>
                {platformOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setPlatformOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.1 }}
                      className="absolute right-0 mt-2 bg-[#12131a] border border-slate-800 rounded-2xl shadow-xl py-1.5 w-44 z-50 overflow-hidden"
                    >
                      {['All', 'Meta', 'Google', 'TikTok'].map((plat) => (
                        <button
                          key={plat}
                          onClick={() => {
                            setPlatformFilter(plat);
                            setPlatformOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-bold transition-all flex items-center justify-between ${
                            platformFilter === plat 
                              ? 'bg-white/5 text-white border-l-2 border-[#5D4DFF]' 
                              : 'text-slate-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span>{plat}</span>
                          {platformFilter === plat && <Check className="w-3.5 h-3.5 text-[#5D4DFF]" strokeWidth={2.5} />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setStatusOpen(!statusOpen);
                  setPlatformOpen(false);
                  setPeriodOpen(false);
                }}
                className="bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>Status: <span className="text-[#5D4DFF]">{statusFilter === 'All' ? 'All' : statusFilter === 'ACTIVE' ? 'Active' : 'Paused'}</span></span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" strokeWidth={2.5} />
              </button>

              <AnimatePresence>
                {statusOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setStatusOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.1 }}
                      className="absolute right-0 mt-2 bg-[#12131a] border border-slate-800 rounded-2xl shadow-xl py-1.5 w-44 z-50 overflow-hidden"
                    >
                      {[
                        { val: 'All', lab: 'All' },
                        { val: 'ACTIVE', lab: 'Active' },
                        { val: 'PAUSED', lab: 'Paused' }
                      ].map((item) => (
                        <button
                          key={item.val}
                          onClick={() => {
                            setStatusFilter(item.val);
                            setStatusOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-bold transition-all flex items-center justify-between ${
                            statusFilter === item.val 
                              ? 'bg-white/5 text-white border-l-2 border-[#5D4DFF]' 
                              : 'text-slate-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span>{item.lab}</span>
                          {statusFilter === item.val && <Check className="w-3.5 h-3.5 text-[#5D4DFF]" strokeWidth={2.5} />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Period Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setPeriodOpen(!periodOpen);
                  setPlatformOpen(false);
                  setStatusOpen(false);
                }}
                className="bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>Period: <span className="text-[#5D4DFF]">{periodFilter}</span></span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" strokeWidth={2.5} />
              </button>

              <AnimatePresence>
                {periodOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setPeriodOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.1 }}
                      className="absolute right-0 mt-2 bg-[#12131a] border border-slate-800 rounded-2xl shadow-xl py-1.5 w-44 z-50 overflow-hidden"
                    >
                      {[
                        { val: 'All', lab: 'All' },
                        { val: 'June 2026', lab: 'June 2026' },
                        { val: 'May 2026', lab: 'May 2026' }
                      ].map((item) => (
                        <button
                          key={item.val}
                          onClick={() => {
                            setPeriodFilter(item.val);
                            setPeriodOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-bold transition-all flex items-center justify-between ${
                            periodFilter === item.val 
                              ? 'bg-white/5 text-white border-l-2 border-[#5D4DFF]' 
                              : 'text-slate-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span>{item.lab}</span>
                          {periodFilter === item.val && <Check className="w-3.5 h-3.5 text-[#5D4DFF]" strokeWidth={2.5} />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Campaigns Table Grid view */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-slate-100 text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 pl-5">Campaign Name</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Spend</th>
                <th className="py-3 px-4 text-right">Impr.</th>
                <th className="py-3 px-4 text-right">Conv.</th>
                <th className="py-3 px-4 text-right">CPA</th>
                <th className="py-3 px-4 text-right">ROAS</th>
                <th className="py-3 px-4 pr-5 text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 text-xs font-bold">
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((c) => {
                  // Badges configurations for platforms based on system colors
                  let logoComponent = <MetaLogo />;
                  let platformText = 'Meta';
                  if (c.platform === 'Google') {
                    logoComponent = <GoogleLogo />;
                    platformText = 'Google';
                  } else if (c.platform === 'TikTok') {
                    logoComponent = <TikTokLogo />;
                    platformText = 'TikTok';
                  }

                  return (
                    <tr 
                      key={c.id} 
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Name */}
                      <td className="py-4.5 px-4 pl-5 text-slate-800 font-extrabold max-w-[240px] truncate" title={c.name}>
                        {c.name}
                      </td>
                      
                      {/* Platform badge + logo */}
                      <td className="py-4.5 px-4">
                        <div className="flex items-center gap-1.5">
                          {logoComponent}
                          <span className="text-slate-700 font-bold">{platformText}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4.5 px-4">
                        <div className="flex items-center justify-center">
                          {c.status === 'ACTIVE' ? (
                            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wide">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Active</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-400 border border-slate-200/60 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wide">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                              <span>Paused</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Spend */}
                      <td className="py-4.5 px-4 text-right text-slate-900 font-black tracking-tight">
                        {c.spend}
                      </td>

                      {/* Impressions */}
                      <td className="py-4.5 px-4 text-right text-slate-500 font-semibold">
                        {c.impr}
                      </td>

                      {/* Conversions */}
                      <td className="py-4.5 px-4 text-right text-slate-500 font-semibold">
                        {c.conv.toLocaleString()}
                      </td>

                      {/* CPA */}
                      <td className="py-4.5 px-4 text-right text-slate-900 font-black tracking-tight">
                        {c.cpa}
                      </td>

                      {/* ROAS */}
                      <td className="py-4.5 px-4 text-right text-slate-900 font-black tracking-tight">
                        {c.roas}
                      </td>

                      {/* Updated date */}
                      <td className="py-4.5 px-4 pr-5 text-right text-slate-400 font-normal">
                        {c.date}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 text-sm font-semibold">
                    No campaigns found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. FLOATING ROBOT CHATBOT LAUNCHER (BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50 group">
        {/* Tooltip speech bubble */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-white/10">
          Ask Hint AI
        </span>

        {/* Pulsing visual halo */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/35 animate-ping opacity-75 pointer-events-none" />

        <button 
          onClick={() => triggerToast('Hint AI Assistant is launching...')}
          className="relative w-14 h-14 bg-[#059669] hover:bg-[#047857] text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/20"
        >
          {/* Bot / Robot Head SVG Icon */}
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M9 13h.01" />
            <path d="M15 13h.01" />
            <path d="M9 17h6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Campaigns;
