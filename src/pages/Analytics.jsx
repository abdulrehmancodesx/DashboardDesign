import React from 'react';
import { BarChart3, TrendingUp, DollarSign, PieChart, ArrowUpRight } from 'lucide-react';

function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-8 py-5 rounded-[2rem] shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Financial Analytics</h1>
        <p className="text-slate-400 text-sm mt-0.5">Deep-dive reports and long-term projections</p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/90 p-8 rounded-[2rem] shadow-sm border border-white/20">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Average Monthly Spending</span>
              <h2 className="text-4xl font-bold text-slate-800 mt-2">$4,820.00</h2>
            </div>
            <div className="w-12 h-12 bg-brand-blue/10 flex items-center justify-center rounded-2xl text-brand-blue">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Software subscriptions</span>
              <span className="font-bold text-slate-800">42%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-brand-blue h-full rounded-full" style={{ width: '42%' }}></div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Facilities & Rent</span>
              <span className="font-bold text-slate-800">35%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-brand-purple h-full rounded-full" style={{ width: '35%' }}></div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Transportation & Travel</span>
              <span className="font-bold text-slate-800">23%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-brand-green h-full rounded-full" style={{ width: '23%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-brand-indigo text-white p-8 rounded-[2rem] shadow-xl shadow-brand-indigo/20 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative SVG shapes */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <PieChart className="w-64 h-64 translate-x-12 translate-y-12" />
          </div>
          
          <div>
            <span className="text-indigo-200 text-xs font-semibold uppercase tracking-wider">Year-to-Date Projection</span>
            <h2 className="text-4xl font-bold mt-2">$62,400.00</h2>
            <p className="text-indigo-100/70 text-sm mt-3 leading-relaxed">
              Based on historical data and current trajectories, annual spending is projected to close 3.2% lower than the initially approved budget cap of $64,500.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-indigo-500/30 flex justify-between items-center">
            <div>
              <span className="text-indigo-200 text-xs font-medium">Forecast Accuracy</span>
              <div className="font-bold text-lg">98.4%</div>
            </div>
            <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 backdrop-blur-sm">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
              <span>Optimized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
