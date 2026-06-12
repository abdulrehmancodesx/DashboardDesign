import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Lock, Shield, CreditCard, Save } from 'lucide-react';

function Settings() {
  const [budgetLimit, setBudgetLimit] = useState(20000);
  const [notifications, setNotifications] = useState({
    onThreshold: true,
    weeklyReport: false,
    approvalsRequired: true,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-8 py-5 rounded-[2rem] shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Configuration Settings</h1>
        <p className="text-slate-400 text-sm mt-0.5">Adjust dashboard preferences and budget boundaries</p>
      </div>

      {/* Grid Settings */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation / Cards list */}
        <div className="bg-white/80 p-6 rounded-[2rem] shadow-sm border border-slate-200/50 h-fit space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#4856f0] text-white font-medium text-left transition-all shadow-md shadow-[#4856f0]/15">
            <SettingsIcon className="w-5 h-5" />
            <span>General Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 font-medium text-left transition-all">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 font-medium text-left transition-all">
            <Lock className="w-5 h-5" />
            <span>Security & Roles</span>
          </button>
        </div>

        {/* Setting Panel */}
        <div className="md:col-span-3 bg-white/90 p-8 rounded-[2rem] shadow-sm border border-slate-200/50 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-6">General Preferences</h2>
            
            <div className="space-y-6">
              {/* Budget Limit Setting */}
              <div>
                <label className="block text-slate-500 text-sm font-semibold mb-2">Monthly Spending Limit ($)</label>
                <input 
                  type="number" 
                  value={budgetLimit} 
                  onChange={(e) => setBudgetLimit(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-100 focus:border-brand-indigo focus:bg-white rounded-2xl px-4 py-3 text-slate-800 font-semibold focus:outline-none transition-all"
                />
                <span className="text-xs text-slate-400 block mt-1">Alerts are sent to moderators when spending exceeds this amount.</span>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-4 border-t border-slate-50">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Automated Alerts</h3>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-slate-700 font-semibold block text-sm">Alert on 90% Threshold</span>
                    <span className="text-slate-400 text-xs">Notify when expenses near monthly cap</span>
                  </div>
                  <input 
                    type="checkbox"
                    checked={notifications.onThreshold}
                    onChange={(e) => setNotifications({...notifications, onThreshold: e.target.checked})}
                    className="w-5 h-5 rounded accent-brand-indigo"
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-slate-700 font-semibold block text-sm">Weekly Audit Reports</span>
                    <span className="text-slate-400 text-xs">Send spreadsheet digest every Monday</span>
                  </div>
                  <input 
                    type="checkbox"
                    checked={notifications.weeklyReport}
                    onChange={(e) => setNotifications({...notifications, weeklyReport: e.target.checked})}
                    className="w-5 h-5 rounded accent-brand-indigo"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button className="bg-brand-indigo hover:bg-brand-indigo/90 text-white font-medium py-3 px-6 rounded-2xl flex items-center gap-2 shadow-lg shadow-brand-indigo/35 transition-all hover:translate-y-[-1px]">
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
