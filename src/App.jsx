import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CRM from './pages/CRM';
import Audience from './pages/Audience';
import Settings from './pages/Settings';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout container routing */}
        <Route path="/" element={<Layout />}>
          {/* Index redirect to /dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Page views */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="crm" element={<CRM />} />
          <Route path="audience" element={<Audience />} />
          <Route path="settings" element={<Settings />} />

          {/* Placeholder views for other navigation items */}
          <Route 
            path="integrations" 
            element={<PlaceholderPage title="Integrations & Triggers" description="Configure automation streams, webhooks, and third-party APIs." />} 
          />
          <Route 
            path="reports" 
            element={<PlaceholderPage title="Financial Reports" description="Generate and export system audit trail spreadsheets." />} 
          />
          <Route 
            path="connections" 
            element={<PlaceholderPage title="Connections & Node Maps" description="Manage network bridges, cluster relays, and system share status." />} 
          />
          <Route 
            path="logout" 
            element={<PlaceholderPage title="Logged Out" description="Session closed successfully. Click any tab in the sidebar to sign in again." />} 
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;