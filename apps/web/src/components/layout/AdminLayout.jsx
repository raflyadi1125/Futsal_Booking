
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const pageTitles = {
  '/admin': 'Dashboard',
  '/admin/fields': 'Manajemen Lapangan',
  '/admin/bookings': 'Manajemen Booking',
  '/admin/payments': 'Pembayaran',
  '/admin/reports': 'Laporan',
  '/admin/settings': 'Pengaturan',
  '/admin/help': 'Pusat Bantuan',
};

export default function AdminLayout({ admin, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activePage = pageTitles[location.pathname] ?? 'Dashboard';

  function handleLogout() {
    onLogout?.();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-64">
        <Topbar
          activePage={activePage}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-400">
              Login sebagai{' '}
              <span className="font-semibold text-slate-200">
                {admin?.name ?? 'Administrator'}
              </span>
            </p>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              Keluar dari Admin
            </button>
          </div>

          <Outlet />
        </main>

        <footer className="border-t border-slate-800 px-6 py-5 text-center text-xs text-slate-500">
          © 2026 Futsal Booking. Admin Panel.
        </footer>
      </div>
    </div>
  );
}
