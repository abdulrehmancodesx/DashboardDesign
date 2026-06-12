import React, { useState } from 'react';

function CampaignsTableSection() {
  const [searchQuery, setSearchQuery] = useState('');

  // 4 rows from the reference image + 3 custom ones added by us
  const CAMPAIGNS = [
    { id: '1', name: 'ca_multi25_111025_en_ar_ml', platform: 'Meta', spend: 'AED 1,124.08', cpa: 'AED 2.96', ctr: '2.71%', status: 'ACTIVE' },
    { id: '2', name: 'ca_leads_web_uae_310126_leads', platform: 'Meta', spend: 'AED 679.28', cpa: 'AED 5.57', ctr: '2.35%', status: 'ACTIVE' },
    { id: '3', name: 'ca_mtcrpgwlp_060925_ml', platform: 'Meta', spend: 'AED 348.21', cpa: 'AED 2.68', ctr: '1.80%', status: 'ACTIVE' },
    { id: '4', name: 'ca_multi25_111025_ar', platform: 'Meta', spend: 'AED 342.51', cpa: 'AED 4.57', ctr: '2.15%', status: 'ACTIVE' },
    { id: '5', name: 'ca_search_conversions_google_v2', platform: 'Google', spend: 'AED 845.50', cpa: 'AED 3.12', ctr: '3.45%', status: 'ACTIVE' },
    { id: '6', name: 'ca_retargeting_purchase_tiktok_ml', platform: 'TikTok', spend: 'AED 420.00', cpa: 'AED 1.95', ctr: '4.10%', status: 'ACTIVE' },
    { id: '7', name: 'ca_brand_reach_meta_paused_09', platform: 'Meta', spend: 'AED 280.40', cpa: 'AED 0.00', ctr: '1.15%', status: 'PAUSED' }
  ];

  const filteredCampaigns = CAMPAIGNS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-200/50 p-5 md:p-6 rounded-[2.5rem] shadow-sm flex flex-col transition-all hover:shadow-md select-none">
      
      {/* Header Block with Search and Filters (Recent Sales layout style) */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Recent Campaigns</h3>
          <p className="text-slate-400 text-xs font-semibold mt-0.5">Manage and monitor marketing performance</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200/60 focus:border-[#5D4DFF] focus:ring-1 focus:ring-[#5D4DFF] rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-slate-700 outline-none transition-all placeholder-slate-400 w-44 md:w-56"
            />
          </div>

          {/* Platforms Filter */}
          <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200/60 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 flex items-center gap-1.5 transition-all cursor-pointer">
            <span>All Platforms</span>
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Filter Button */}
          <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200/60 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 flex items-center gap-1.5 transition-all cursor-pointer">
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Campaigns Table Area */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-slate-100 text-left">
          <thead>
            <tr className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Campaign Name</th>
              <th className="py-3 px-4">Platform</th>
              <th className="py-3 px-4 text-right">Spend</th>
              <th className="py-3 px-4 text-right">CPA</th>
              <th className="py-3 px-4 text-right">CTR</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-semibold">
            {filteredCampaigns.map((c) => {
              // Custom colors for tags based on platforms
              let platformBadge = "bg-slate-100 text-slate-800";
              if (c.platform === 'Meta') {
                platformBadge = "bg-[#5D4DFF]/10 text-[#5D4DFF]";
              } else if (c.platform === 'Google') {
                platformBadge = "bg-[#8BC5F4]/15 text-[#3b82f6]";
              } else if (c.platform === 'TikTok') {
                platformBadge = "bg-emerald-500/10 text-emerald-700";
              }

              return (
                <tr 
                  key={c.id} 
                  className="hover:bg-slate-50/60 transition-all"
                >
                  <td className="py-3.5 px-4 text-slate-800 font-extrabold max-w-[220px] truncate" title={c.name}>
                    {c.name}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide ${platformBadge}`}>
                      {c.platform}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-900 font-black">
                    {c.spend}
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-600 font-bold">
                    {c.cpa}
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-600 font-bold">
                    {c.ctr}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {c.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase w-20 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-400 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase w-20 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Paused</span>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CampaignsTableSection;
