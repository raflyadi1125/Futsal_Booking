
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AdminLayout({ activePage, onNavigate, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-64">
        <Topbar
          activePage={activePage}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        <footer className="border-t border-slate-800 px-6 py-5 text-center text-xs text-slate-500">
          © 2026 Futsal Booking. Admin Panel.
        </footer>
      </div>
    </div>
  );
}
