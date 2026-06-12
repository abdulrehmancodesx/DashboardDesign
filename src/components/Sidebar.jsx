import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Search, 
  LayoutGrid, 
  Megaphone, 
  Database, 
  Users, 
  Sliders, 
  FileText, 
  Network, 
  LogOut, 
  Settings 
} from 'lucide-react';

function Sidebar() {
  const middleRoutes = [
    { path: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { path: '/campaigns', icon: Megaphone, label: 'Campaigns' },
    { path: '/crm', icon: Database, label: 'CRM' },
    { path: '/audience', icon: Users, label: 'Audience' },
    { path: '/integrations', icon: Sliders, label: 'Integrations' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/connections', icon: Network, label: 'Connections' },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR (Floating Pill Layout - Slim & Symmetrical) */}
      <aside className="hidden lg:flex flex-col w-[68px] h-[calc(100vh-40px)] fixed left-5 top-5 rounded-[2.5rem] py-6 bg-white shadow-md border border-white/40 flex-col justify-between items-center z-40 transition-all select-none">
        
        {/* Top: Search Icon inside Blue Circle (Small & Centered) */}
        <div className="w-10 h-10 bg-[#4856f0] hover:bg-[#3d4be0] rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg shadow-[#4856f0]/25 transition-all hover:scale-105 active:scale-95">
          <Search className="w-4 h-4" strokeWidth={2.5} />
        </div>

        {/* Middle: Slim Symmetrical Navigation Capsule Container */}
        <nav className="bg-[#e2e8f5] rounded-[2rem] p-1 flex flex-col gap-[16px] items-center w-12 border border-white/20 shadow-inner">
          {middleRoutes.map((route) => {
            const Icon = route.icon;
            return (
              <NavLink
                key={route.path}
                to={route.path}
                title={route.label}
                className={({ isActive }) =>
                  `w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 relative group ${
                    isActive
                      ? 'bg-[#4856f0] text-white shadow-lg shadow-[#4856f0]/25'
                      : 'text-slate-600 hover:bg-white/40 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                {/* Tooltip */}
                <span className="absolute left-16 bg-slate-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-50">
                  {route.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom: Slim Symmetrical Configurations Capsule Container */}
        <div className="bg-[#e2e8f5] rounded-[2rem] p-1 flex flex-col gap-[16px] items-center w-12 border border-white/20 shadow-inner">
          <NavLink
            to="/logout"
            title="Log Out"
            className={({ isActive }) =>
              `w-10 h-10 flex items-center justify-center rounded-full transition-all group ${
                isActive
                  ? 'bg-slate-800 text-white shadow-lg shadow-slate-800/25'
                  : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
              }`
            }
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-[-1px]" strokeWidth={1.5} />
          </NavLink>

          <NavLink
            to="/settings"
            title="Settings"
            className={({ isActive }) =>
              `w-10 h-10 flex items-center justify-center rounded-full transition-all group ${
                isActive
                  ? 'bg-[#4856f0] text-white shadow-lg shadow-[#4856f0]/25'
                  : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
              }`
            }
          >
            <Settings className="w-4 h-4 transition-transform group-hover:rotate-45 duration-300" strokeWidth={1.5} />
          </NavLink>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] h-16 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-white/50 flex items-center justify-around px-4 z-50 transition-all select-none">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              isActive ? 'bg-[#4856f0] text-white shadow-md' : 'text-slate-400'
            }`
          }
        >
          <LayoutGrid className="w-5 h-5" />
        </NavLink>

        <NavLink
          to="/campaigns"
          className={({ isActive }) =>
            `w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              isActive ? 'bg-[#4856f0] text-white shadow-md' : 'text-slate-400'
            }`
          }
        >
          <Megaphone className="w-5 h-5" />
        </NavLink>

        <NavLink
          to="/crm"
          className={({ isActive }) =>
            `w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              isActive ? 'bg-[#4856f0] text-white shadow-md' : 'text-slate-400'
            }`
          }
        >
          <Database className="w-5 h-5" />
        </NavLink>

        <NavLink
          to="/audience"
          className={({ isActive }) =>
            `w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              isActive ? 'bg-[#4856f0] text-white shadow-md' : 'text-slate-400'
            }`
          }
        >
          <Users className="w-5 h-5" />
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              isActive ? 'bg-[#4856f0] text-white shadow-md' : 'text-slate-400'
            }`
          }
        >
          <Settings className="w-5 h-5" />
        </NavLink>
      </nav>
    </>
  );
}

export default Sidebar;
