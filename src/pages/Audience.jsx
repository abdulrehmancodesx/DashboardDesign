import React from 'react';
import { Users, Mail, Phone, MapPin, UserPlus } from 'lucide-react';

const TEAM_MEMBERS = [
  { id: 1, name: 'Jessica Vance', role: 'Finance Director', email: 'j.vance@company.com', avatar: 'JV', dept: 'Finance' },
  { id: 2, name: 'Marcus Sterling', role: 'Operations Lead', email: 'm.sterling@company.com', avatar: 'MS', dept: 'Operations' },
  { id: 3, name: 'Dianne Ross', role: 'HR Coordinator', email: 'd.ross@company.com', avatar: 'DR', dept: 'Human Resources' },
  { id: 4, name: 'Andrew Park', role: 'IT Manager', email: 'a.park@company.com', avatar: 'AP', dept: 'Information Tech' },
];

function Audience() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-8 py-5 rounded-[2rem] shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Office Team</h1>
          <p className="text-slate-400 text-sm mt-0.5">Manage expense roles, permissions, and profiles</p>
        </div>
        <button className="bg-brand-indigo hover:bg-brand-indigo/90 text-white font-medium py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all">
          <UserPlus className="w-4 h-4" />
          <span className="text-sm">Invite Member</span>
        </button>
      </div>

      {/* Grid of Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEAM_MEMBERS.map((member) => (
          <div key={member.id} className="bg-white/80 p-6 rounded-[2rem] shadow-sm border border-white/20 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-brand-indigo/10 rounded-full flex items-center justify-center text-brand-indigo text-xl font-bold mb-4">
              {member.avatar}
            </div>
            <h3 className="text-lg font-bold text-slate-800">{member.name}</h3>
            <p className="text-brand-indigo text-xs font-semibold uppercase tracking-wider mt-1">{member.role}</p>
            <span className="text-slate-400 text-xs mt-1">{member.dept}</span>
            
            <div className="mt-6 pt-4 border-t border-slate-50 w-full flex flex-col gap-2 text-slate-500 text-xs">
              <div className="flex items-center justify-center gap-1.5 hover:text-slate-800 transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>{member.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Audience;
