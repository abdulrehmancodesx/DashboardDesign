import React, { useState } from 'react';
import { 
  Database, 
  Link, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  Play, 
  Save, 
  HelpCircle, 
  ShieldCheck, 
  Copy, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock synced transactions loaded on click
const CRM_TRANSACTIONS = [
  { orderId: 'ord_99015A7', date: '2026-06-12 18:24', campaign: 'ca_multi25_111025_en_ar_ml', platform: 'Meta', value: 'AED 1,124.08', status: 'SUCCESS' },
  { orderId: 'ord_99015A8', date: '2026-06-12 17:10', campaign: 'ca_leads_web_uae_310126_en', platform: 'Meta', value: 'AED 679.28', status: 'SUCCESS' },
  { orderId: 'ord_99015A9', date: '2026-06-12 15:45', campaign: 'ca_google_conversions_uae_brand', platform: 'Google', value: 'AED 2,450.00', status: 'SUCCESS' },
  { orderId: 'ord_99015B0', date: '2026-06-12 14:02', campaign: 'ca_tiktok_app_installs_lifestyle', platform: 'TikTok', value: 'AED 1,280.00', status: 'SUCCESS' },
  { orderId: 'ord_99015B1', date: '2026-06-11 22:15', campaign: 'ca_multi25_111025_ar', platform: 'Meta', value: 'AED 342.51', status: 'SUCCESS' }
];

// Platform Logo Renderers
const MetaLogo = () => (
  <svg className="w-3.5 h-3.5 text-[#0064E0] fill-current" viewBox="0 0 24 24">
    <path d="M22.227 9.467a5.53 5.53 0 0 0-4.307-2.043c-2.316 0-4.316 1.431-5.92 3.62C10.396 8.855 8.396 7.424 6.08 7.424A5.53 5.53 0 0 0 1.773 9.467 6.136 6.136 0 0 0 1.76 14.54a5.524 5.524 0 0 0 4.313 2.036c2.316 0 4.316-1.43 5.927-3.62 1.603 2.19 3.603 3.62 5.92 3.62a5.531 5.531 0 0 0 4.313-2.036 6.136 6.136 0 0 0-.006-5.073zm-16.14 5.48c-.91 0-1.688-.344-2.189-.97a2.53 2.53 0 0 1-.502-1.623c0-.623.167-1.182.502-1.636.501-.632 1.28-.976 2.19-.976.91 0 1.677.344 2.17.962.335.454.502 1.013.502 1.65 0 .636-.167 1.19-.502 1.636-.493.618-1.26.957-2.17.957zm12.14 0c-.91 0-1.677-.339-2.17-.957a2.52 2.52 0 0 1-.502-1.636c0-.637.167-1.196.502-1.65.493-.618 1.26-.962 2.17-.962.91 0 1.689.344 2.19.976.335.454.502 1.013.502 1.636 0 .63-.167 1.189-.502 1.623-.501.626-1.28.97-2.19.97z" />
  </svg>
);

const GoogleLogo = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.84 14.9 1 12 1 7.35 1 3.39 3.67 1.46 7.56l3.86 3C6.23 7.56 8.89 5.04 12 5.04z" />
    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.11 2.73-2.37 3.58l3.68 2.85c2.16-1.99 3.4-4.91 3.4-8.58z" />
    <path fill="#FBBC05" d="M5.32 14.56a6.97 6.97 0 0 1 0-4.47L1.46 7.09C.53 8.94 0 10.97 0 13c0 2.03.53 4.06 1.46 5.91l3.86-2.97-.08-.38z" />
    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.68-2.85c-1.02.68-2.33 1.09-3.96 1.09-3.11 0-5.77-2.02-6.68-5.02l-3.86 3C3.39 20.33 7.35 23 12 23z" />
  </svg>
);

const TikTokLogo = () => (
  <svg className="w-3.5 h-3.5 text-black fill-current" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.66 4.13 1.13 1.2 2.69 1.93 4.31 2.05v3.91a8.94 8.94 0 0 1-5.59-1.98v6.78c.07 2.09-.73 4.19-2.27 5.61A8.25 8.25 0 0 1 8.7 22.8c-2.45-.19-4.8-1.74-5.91-3.97a8.5 8.5 0 0 1 .49-8.7c1.37-2.18 3.86-3.51 6.42-3.32v3.98a4.3 4.3 0 0 0-2.6 1.3 4.4 4.4 0 0 0-1 3.4 4.5 4.5 0 0 0 2.9 3.5 4.3 4.3 0 0 0 5.4-2.2c.16-.36.23-.76.22-1.15V.02h.005z"/>
  </svg>
);

function CRM() {
  // Input fields states
  const [crmUrl, setCrmUrl] = useState('wassim.ullah@aol.com');
  const [apiToken, setApiToken] = useState('Bearer xyz123');

  // Interactive Accordions Toggles
  const [jsonMappingsOpen, setJsonMappingsOpen] = useState(false);
  const [attributionOpen, setAttributionOpen] = useState(false);
  const [webhookOpen, setWebhookOpen] = useState(false);

  // Field details states
  const [orderIdPath, setOrderIdPath] = useState('order_id');
  const [orderValuePath, setOrderValuePath] = useState('order_value');
  const [attributionModel, setAttributionModel] = useState('cohort'); // 'cohort', 'transaction'
  
  // Interactive UI Sync state
  const [isSynced, setIsSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toast, setToast] = useState(null);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText('https://api.hint.ai/v1/webhooks/crm/sync_12984');
    triggerToast('Webhook URL copied to clipboard!');
  };

  const handleManualSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    triggerToast('Pulling latest transaction records from CRM...');
    
    setTimeout(() => {
      setIsSyncing(false);
      setIsSynced(true);
      triggerToast('True ROAS CRM Sync Complete! 5 Deals attributed.');
    }, 1500);
  };

  const handleSaveSettings = () => {
    triggerToast('CRM Integration settings saved successfully!');
  };

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
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">CRM Revenue Integration</h1>
          <p className="text-slate-400 text-xs font-semibold mt-1.5 hidden sm:block">Connect your CRM API endpoint to sync revenue values back to ad campaigns and calculate True ROAS.</p>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full text-xs font-bold text-slate-700">
          <span className={`w-2 h-2 rounded-full ${isSynced ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
          <span>{isSynced ? 'True ROAS Live' : 'Pending Sync'}</span>
        </div>
      </header>

      {/* 2. SETTINGS FORM & GUIDE ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: Integration settings card */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-white border border-slate-200/50 p-6 md:p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-between flex-1 gap-6">
            <div className="space-y-6">
              
              {/* Section 1: Endpoint URL and Token */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#4856f0]/10 text-[#4856f0] flex items-center justify-center text-xs font-black">1</span>
                  <h3 className="text-base font-extrabold text-slate-800">CRM API Endpoint Connection</h3>
                </div>

                {/* API Endpoint Input */}
                <div className="space-y-1.5">
                  <label className="block text-slate-400 text-[10px] font-black uppercase tracking-wider">CRM API Endpoint URL</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Link className="h-4 w-4 text-slate-400" strokeWidth={2.5} />
                    </span>
                    <input
                      type="text"
                      placeholder="https://your-crm.com/api/deals"
                      value={crmUrl}
                      onChange={(e) => setCrmUrl(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/60 focus:bg-white focus:border-[#4856f0] focus:ring-1 focus:ring-[#4856f0] rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-700 outline-none transition-all"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block px-1">The JSON/REST endpoint returning your won deals or transaction list.</span>
                </div>

                {/* Token Key Input */}
                <div className="space-y-1.5">
                  <label className="block text-slate-400 text-[10px] font-black uppercase tracking-wider">API Token / Private Key (Optional)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-400" strokeWidth={2.5} />
                    </span>
                    <input
                      type="password"
                      placeholder="••••••••••••••••••••••••••••••••"
                      value={apiToken}
                      onChange={(e) => setApiToken(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/60 focus:bg-white focus:border-[#4856f0] focus:ring-1 focus:ring-[#4856f0] rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold text-slate-700 outline-none transition-all"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block px-1">Sent inside authorization header as Bearer token if configured.</span>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Collapsible Section 2: JSON Mappings Accordion */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
                <button 
                  onClick={() => setJsonMappingsOpen(!jsonMappingsOpen)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5.5 h-5.5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">2</span>
                    <span className="text-sm font-extrabold text-slate-700">JSON Field Mappings (Optional)</span>
                  </div>
                  {jsonMappingsOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                <AnimatePresence>
                  {jsonMappingsOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden border-t border-slate-100 bg-white"
                    >
                      <div className="p-5 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Order / Sale ID Key</label>
                            <input
                              type="text"
                              value={orderIdPath}
                              onChange={(e) => setOrderIdPath(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Order / Sale Value Key</label>
                            <input
                              type="text"
                              value={orderValuePath}
                              onChange={(e) => setOrderValuePath(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                            />
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold">Allows pulling specific inner object keys from your API's JSON response payload.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Collapsible Section 3: Attribution Model Settings */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
                <button 
                  onClick={() => setAttributionOpen(!attributionOpen)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5.5 h-5.5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">3</span>
                    <span className="text-sm font-extrabold text-slate-700">Attribution Model Settings</span>
                  </div>
                  {attributionOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                <AnimatePresence>
                  {attributionOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden border-t border-slate-100 bg-white"
                    >
                      <div className="p-5 space-y-4">
                        <div className="flex flex-col gap-3">
                          <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                            <input 
                              type="radio" 
                              name="attributionModel" 
                              checked={attributionModel === 'cohort'} 
                              onChange={() => setAttributionModel('cohort')}
                              className="w-4 h-4 mt-0.5 accent-[#4856f0]"
                            />
                            <div>
                              <span className="text-xs font-extrabold text-slate-800 block">Cohort Attribution (Recommended / Default)</span>
                              <span className="text-[10px] text-slate-400 font-semibold">Attributes won conversion value back to the click date, matching ad manager data.</span>
                            </div>
                          </label>

                          <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                            <input 
                              type="radio" 
                              name="attributionModel" 
                              checked={attributionModel === 'transaction'} 
                              onChange={() => setAttributionModel('transaction')}
                              className="w-4 h-4 mt-0.5 accent-[#4856f0]"
                            />
                            <div>
                              <span className="text-xs font-extrabold text-slate-800 block">Transactional Attribution</span>
                              <span className="text-[10px] text-slate-400 font-semibold">Attributes won conversion value to the exact timestamp of the sale/won status.</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Collapsible Section 4: Webhook Accordion */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
                <button 
                  onClick={() => setWebhookOpen(!webhookOpen)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5.5 h-5.5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">4</span>
                    <span className="text-sm font-extrabold text-slate-700">Show Inbound Webhook (Alternative Push Method)</span>
                  </div>
                  {webhookOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                <AnimatePresence>
                  {webhookOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden border-t border-slate-100 bg-white"
                    >
                      <div className="p-5 space-y-3">
                        <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                          Instead of the system pulling data from your endpoint, you can push CRM events straight to this unique webhook address:
                        </p>
                        
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4.5 py-2.5 justify-between">
                          <code className="text-[10px] font-mono text-slate-600 font-bold overflow-x-auto">
                            https://api.hint.ai/v1/webhooks/crm/sync_12984
                          </code>
                          <button 
                            onClick={handleCopyWebhook}
                            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/50 transition-all cursor-pointer"
                            title="Copy Webhook Link"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
              <button 
                onClick={handleManualSync}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-5 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer text-xs"
              >
                {isSyncing ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Play className="w-4 h-4 fill-current text-white" />
                )}
                <span>Trigger Manual Sync</span>
              </button>

              <button 
                onClick={handleSaveSettings}
                className="w-full sm:w-auto bg-[#4856f0] hover:bg-[#3b4be0] text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#4856f0]/20 transition-all active:scale-95 cursor-pointer text-xs"
              >
                <Save className="w-4 h-4 text-white" />
                <span>Save Settings</span>
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Guide & Deduplication matching Mockup 3's style */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Card 1: Easy Connection Guide (Purple Indigo Gradient mockup style) */}
          <div className="bg-[#5d4dff] text-white p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-[#5d4dff]/20 flex flex-col gap-5 border border-white/10 relative overflow-hidden transition-all hover:scale-[1.01]">
            {/* Background design elements */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
              <Database className="w-56 h-56" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-2.5 z-10">
              <HelpCircle className="w-5 h-5 text-indigo-200" strokeWidth={2.5} />
              <h3 className="text-lg font-black tracking-tight text-white">Easy Connection Guide</h3>
            </div>

            {/* List items */}
            <div className="space-y-4 text-xs font-semibold leading-relaxed z-10">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-200 block mb-0.5">1. CRM Connection</span>
                <p className="text-indigo-100/90">
                  Paste the won-deals REST API endpoint URL of your CRM. Provide a Bearer Token / API Key if authentication is required.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-indigo-200 block mb-0.5">2. JSON Field Mappings</span>
                <p className="text-indigo-100/90">
                  Enter custom JSON payload paths (e.g., `"deal.value"`). If left empty, the system automatically uses default keys.
                </p>
                {/* mappings details sub-box */}
                <div className="bg-white/10 p-4 rounded-2xl text-[10px] border border-white/5 space-y-2.5 mt-2">
                  <div>
                    <span className="font-extrabold text-white block">Order / Sale ID</span>
                    <span className="text-indigo-200/90 font-medium">Unique transaction key (e.g. order number) to prevent double-counting.</span>
                  </div>
                  <div className="border-t border-white/10 pt-1.5">
                    <span className="font-extrabold text-white block">Order / Sale Value</span>
                    <span className="text-indigo-200/90 font-medium">The monetary revenue amount used directly to calculate your True ROAS.</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-indigo-200 block mb-0.5">3. Attribution Method</span>
                <p className="text-indigo-100/90">
                  Expand the Attribution Model section to select how revenue attributes. Cohort (Default) maps revenue back to click date.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-indigo-200 block mb-0.5">4. Deduplication & Sync Logs</span>
                <p className="text-indigo-100/90">
                  Match status, revenue counts, and any errors appear in the Attribution Log history below.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Deduplication Protection (Sleek Slate Contrast style) */}
          <div className="bg-[#12131a] text-white p-6 md:p-8 rounded-[2.5rem] shadow-xl flex flex-col gap-3.5 border border-slate-800 transition-all hover:scale-[1.01]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-extrabold text-white">Deduplication Protection</h3>
            </div>
            <p className="text-slate-400 text-xs font-semibold leading-relaxed">
              Every order/sale processed must have a unique ID. We record orders and skip duplicates automatically so your revenue metrics are never artificially inflated.
            </p>
          </div>

        </div>

      </div>

      {/* 3. ATTRIBUTION LOG HISTORY (FULL WIDTH BOTTOM CARD) */}
      <div className="bg-white border border-slate-200/50 p-6 md:p-8 rounded-[2.5rem] shadow-sm flex flex-col gap-6">
        
        {/* Table Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Attribution Log History</h3>
            <p className="text-slate-400 text-xs font-semibold mt-0.5">10 most recent transactions pulled or received from CRM webhook.</p>
          </div>

          <button 
            onClick={handleManualSync}
            disabled={isSyncing}
            className="w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            title="Refresh Log"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} strokeWidth={2.5} />
          </button>
        </div>

        {/* Sync state conditional render */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-slate-100 text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 pl-5">Order / Sale ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Campaign Name / ID</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4 text-right">Sale Value</th>
                <th className="py-3 px-4 pr-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 text-xs font-bold">
              {isSynced ? (
                CRM_TRANSACTIONS.map((t) => {
                  let logoComponent = <MetaLogo />;
                  if (t.platform === 'Google') logoComponent = <GoogleLogo />;
                  else if (t.platform === 'TikTok') logoComponent = <TikTokLogo />;

                  return (
                    <tr key={t.orderId} className="hover:bg-slate-50/50 transition-colors">
                      {/* Order ID */}
                      <td className="py-4 px-4 pl-5 font-mono text-slate-800 text-[11px] font-black">
                        {t.orderId}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-slate-400 font-normal">
                        {t.date}
                      </td>

                      {/* Campaign Name */}
                      <td className="py-4 px-4 text-slate-700 font-extrabold max-w-[220px] truncate" title={t.campaign}>
                        {t.campaign}
                      </td>

                      {/* Platform */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          {logoComponent}
                          <span className="text-slate-600 font-bold">{t.platform}</span>
                        </div>
                      </td>

                      {/* Sale value */}
                      <td className="py-4 px-4 text-right text-slate-900 font-black">
                        {t.value}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 pr-5">
                        <div className="flex items-center justify-center">
                          <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-3 py-1 rounded-full text-[9px] font-black tracking-wide uppercase">
                            <Check className="w-2.5 h-2.5 text-emerald-500" strokeWidth={3} />
                            <span>Success</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-400 text-sm font-semibold">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                      <Database className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
                      <p className="text-slate-500 font-extrabold text-xs">No transactions synced yet.</p>
                      <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                        Configure your CRM endpoint connection and save settings, then click <strong className="text-slate-600 font-black">"Trigger Manual Sync"</strong> to fetch attribution records.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* FLOATING ROBOT CHATBOT LAUNCHER (BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50 group">
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-white/10">
          Ask Hint AI
        </span>

        <span className="absolute inset-0 rounded-full bg-emerald-500/35 animate-ping opacity-75 pointer-events-none" />

        <button 
          onClick={() => triggerToast('Hint AI Assistant is launching...')}
          className="relative w-14 h-14 bg-[#059669] hover:bg-[#047857] text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/20"
        >
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

export default CRM;
