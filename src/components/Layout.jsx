import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <div className="min-h-screen w-full flex bg-backdrop p-3 md:p-4 lg:p-5 select-none">
      {/* Sidebar container */}
      <Sidebar />

      {/* Main content viewport */}
      <main className="flex-1 w-full lg:pl-[62px] pb-20 lg:pb-0 max-w-[1400px] mx-auto transition-all animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
