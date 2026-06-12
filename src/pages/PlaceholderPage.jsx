import React from 'react';
import { Construction } from 'lucide-react';

function PlaceholderPage({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
      <div className="bg-white/60 backdrop-blur-md p-10 rounded-[2rem] border border-white/40 shadow-xl max-w-md w-full transition-all hover:shadow-2xl">
        <div className="mx-auto w-16 h-16 bg-brand-indigo/10 flex items-center justify-center rounded-2xl text-brand-indigo mb-6 animate-pulse">
          <Construction className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">{title || "Page is Ready"}</h1>
        <p className="text-slate-500 mb-6 text-sm">
          {description || "This section is wired up in the sidebar routing and uses the React Router Outlet."}
        </p>
        <div className="text-xs font-semibold px-4 py-2 bg-slate-100 rounded-full inline-block text-slate-600">
          Route Active • Rendered inside Outlet
        </div>
      </div>
    </div>
  );
}

export default PlaceholderPage;
