import React, { useState } from 'react';
import { Coins, Plus, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Calendar, Filter } from 'lucide-react';

const DUMMY_EXPENSES = [
  { id: 1, category: 'Transportation', amount: 350.00, date: '2026-06-11', note: 'Uber for client meeting', type: 'debit', status: 'Approved' },
  { id: 2, category: 'Facilities', amount: 890.00, date: '2026-06-10', note: 'Office cleaning services', type: 'debit', status: 'Pending' },
  { id: 3, category: 'Software Subs', amount: 120.00, date: '2026-06-08', note: 'Figma professional subscription', type: 'debit', status: 'Approved' },
  { id: 4, category: 'Marketing', amount: 1500.00, date: '2026-06-05', note: 'Social ads campaign', type: 'debit', status: 'Approved' },
  { id: 5, category: 'Hardware', amount: 2400.00, date: '2026-06-01', note: 'MacBook Air M3 for designer', type: 'debit', status: 'Approved' },
];

function Expenses() {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-8 py-5 rounded-[2rem] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Office Expenses</h1>
          <p className="text-slate-400 text-sm mt-0.5">Track, audit, and approve corporate outflows</p>
        </div>
        <button className="bg-brand-indigo hover:bg-brand-indigo/90 text-white font-medium py-3 px-5 rounded-2xl flex items-center gap-2 shadow-lg shadow-brand-indigo/35 transition-all hover:translate-y-[-1px]">
          <Plus className="w-5 h-5" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 p-6 rounded-[2rem] shadow-sm border border-white/20 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Expensed</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-1">$5,260.00</h2>
            <div className="flex items-center text-rose-500 text-xs font-medium mt-1">
              <TrendingUp className="w-4 h-4 mr-0.5" />
              <span>+12.4% from last month</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-rose-500/10 flex items-center justify-center rounded-2xl text-rose-500">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/80 p-6 rounded-[2rem] shadow-sm border border-white/20 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Remaining Budget</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-1">$14,740.00</h2>
            <div className="flex items-center text-emerald-500 text-xs font-medium mt-1">
              <TrendingDown className="w-4 h-4 mr-0.5" />
              <span>Spent 26.3% of $20K allocation</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center rounded-2xl text-emerald-500">
            <Coins className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/80 p-6 rounded-[2rem] shadow-sm border border-white/20 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pending Approvals</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-1">1 Request</h2>
            <div className="flex items-center text-amber-500 text-xs font-medium mt-1">
              <Calendar className="w-4 h-4 mr-0.5" />
              <span>Awaiting finance manager action</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-amber-500/10 flex items-center justify-center rounded-2xl text-amber-500">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Expense Table Card */}
      <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-sm border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Recent Outflows</h2>
          <button className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium border border-slate-100 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-xl transition-all">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="pb-4 pl-4">Category</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Description</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 pr-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 text-sm font-medium">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 pl-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      exp.category === 'Transportation' ? 'bg-brand-green/20 text-emerald-800' :
                      exp.category === 'Facilities' ? 'bg-brand-purple/20 text-brand-purple' :
                      exp.category === 'Software Subs' ? 'bg-sky-100 text-sky-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-4 text-slate-400 font-normal">{exp.date}</td>
                  <td className="py-4 text-slate-700 font-semibold">{exp.note}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      exp.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        exp.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`} />
                      {exp.status}
                    </span>
                  </td>
                  <td className={`py-4 pr-4 text-right font-bold ${
                    exp.status === 'Approved' ? 'text-slate-800' : 'text-slate-400'
                  }`}>
                    -${exp.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
