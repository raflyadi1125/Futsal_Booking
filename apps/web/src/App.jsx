import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  initialFields,
  recentBookings,
  initialPayments,
} from "./data/mockData";

import PublicLayout from "./components/layout/PublicLayout";

import Login from "./auth/Login";

import Home from "./pages/Home";
import PublicFields from "./pages/Fields";
import UserBooking from "./pages/public/Booking";

import MyBookings from "./pages/public/MyBookings";
import UserPayment from "./pages/public/Payment";
import NotFound from "./pages/public/NotFound";

import AdminLayout from "./components/layout/AdminLayout";

import Dashboard from "./pages/admin/Dashboard";
import Fields from "./pages/admin/Fields";
import Booking from "./pages/admin/Booking";
import Payments from "./pages/admin/Payments";
import Reports from "./pages/admin/Reports";

import Settings from "./pages/admin/Settings";
import Help from "./pages/admin/Help";

function readSession(key) {
  try {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

// Simpan nilai ke sesi; kalau null, hapus dari sesi
function writeSession(key, value) {
  try {
    if (value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.removeItem(key);
    }
  } catch {
    // abaikan jika storage tidak tersedia
  }
}

// Hanya terima tujuan internal (diawali "/") dari parameter ?next=
function getSafeNext(value) {
  return value && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "";
}

function RequireUser({ user, children }) {
  const location = useLocation();

  if (!user) {
    const next = `${location.pathname}${location.search}`;

    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(next)}`}
        replace
      />
    );
  }

  return children;
}

function RequireAdmin({ admin, children }) {
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

// Halaman /login: kalau sudah login, arahkan sesuai peran
function LoginRoute({ user, admin, onLogin }) {
  const [searchParams] = useSearchParams();

  if (admin) {
    return <Navigate to="/admin" replace />;
  }

  if (user) {
    return (
      <Navigate
        to={getSafeNext(searchParams.get("next")) || "/"}
        replace
      />
    );
  }

  return <Login onLogin={onLogin} />;
}

function AdminPanel({
  admin,
  setAdmin,
  fields,
  setFields,
  bookings,
  setBookings,
  payments,
  setPayments,
}) {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <AdminLayout
      activePage={activePage}
      onNavigate={setActivePage}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          Login sebagai{" "}
          <span className="font-semibold text-slate-200">
            {admin.name}
          </span>
        </p>

        <button
          type="button"
          onClick={() => {
            setAdmin(null);
            navigate("/admin/login", { replace: true });
          }}
          className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800"
        >
          Keluar dari Admin
        </button>
      </div>

      {activePage === "Dashboard" ? (
        <Dashboard fields={fields} />
      ) : activePage === "Manajemen Lapangan" ? (
        <Fields
          fields={fields}
          setFields={setFields}
        />
      ) : activePage === "Manajemen Booking" ? (
        <Booking
          bookings={bookings}
          setBookings={setBookings}
        />
      ) : activePage === "Pembayaran" ? (
        <Payments
          payments={payments}
          setPayments={setPayments}
        />
      ) : activePage === "Laporan" ? (
        <Reports
          bookings={bookings}
          payments={payments}
          fields={fields}
        />
      ) : (
        <p className="text-slate-400">
          Halaman tidak ditemukan.
        </p>
      )}
    </AdminLayout>
  );
}

export default function App() {
  const [user, setUser] = useState(() =>
    readSession("futsal_user")
  );

  const [admin, setAdmin] = useState(() =>
    readSession("futsal_admin")
  );

  const [fields, setFields] = useState(initialFields);
  const [bookings, setBookings] = useState(recentBookings);
  const [payments, setPayments] = useState(initialPayments);

  // Sesi login tetap tersimpan saat halaman di-refresh
  useEffect(() => {
    writeSession("futsal_user", user);
  }, [user]);

  useEffect(() => {
    writeSession("futsal_admin", admin);
  }, [admin]);


  // Satu pintu login: simpan sesuai role
  const handleLogin = (account) => {
    const normalizedAccount = {
      ...account,
      role: String(account.role).toLowerCase(),
    };

    if (normalizedAccount.role === "admin") {
      sessionStorage.removeItem("futsal_user");
      setUser(null);
      setAdmin(normalizedAccount);
    } else {
      sessionStorage.removeItem("futsal_admin");
      setAdmin(null);
      setUser(normalizedAccount);
    }
  };

  // Logout admin dan kembali ke beranda publik
  const handleAdminLogout = () => {
    sessionStorage.removeItem("futsal_admin");
    setAdmin(null);
    window.location.href = "/";
  };

  return (
    <Routes>
      {/* Halaman publik */}
      
        <Route
          element={
             <PublicLayout
              user={user}
              onLogout={() => {
                sessionStorage.removeItem("futsal_user");
                setUser(null);
                window.location.href = "/";
              }}
            />
          }
        >

        <Route
          index
          element={<Home />}
        />

        <Route
          path="fields"
          element={<PublicFields />}
        />

        <Route
          path="login"
          element={
            <LoginRoute
              user={user}
              admin={admin}
              onLogin={handleLogin}
            />
          }
        />

        <Route
          path="booking"
          element={
            <RequireUser user={user}>
              <UserBooking
                user={user}
                bookings={bookings}
                setBookings={setBookings}
              />
            </RequireUser>
          }
        />

        <Route
          path="bookings"
          element={
            <RequireUser user={user}>
              <MyBookings
                user={user}
                bookings={bookings}
                payments={payments}
              />
            </RequireUser>
          }
        />

        <Route
          path="payment/:bookingId"
          element={
            <RequireUser user={user}>
              <UserPayment
                user={user}
                bookings={bookings}
                payments={payments}
                setPayments={setPayments}
              />
            </RequireUser>
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>

      {/* Login admin terpisah (tab Admin terpilih otomatis) */}
      <Route
        path="/admin/login"
        element={
          admin ? (
            <Navigate to="/admin" replace />
          ) : (
            <Login onLogin={handleLogin} defaultRole="admin" />
          )
        }
      />

      {/* Semua halaman admin wajib login */}
      <Route
        path="/admin"
        element={
          <RequireAdmin admin={admin}>
            <AdminLayout
              admin={admin}
              onLogout={handleAdminLogout}
              setAdmin={setAdmin}
              fields={fields}
              setFields={setFields}
              bookings={bookings}
              setBookings={setBookings}
              payments={payments}
              setPayments={setPayments}
            />
          </RequireAdmin>
        }
      >
        <Route
          index
          element={<Dashboard fields={fields} />}
        />

        <Route
          path="fields"
          element={
            <Fields
              fields={fields}
              setFields={setFields}
            />
          }
        />

        <Route
          path="bookings"
          element={
            <Booking
              bookings={bookings}
              setBookings={setBookings}
            />
          }
        />

        <Route
          path="payments"
          element={
            <Payments
              payments={payments}
              setPayments={setPayments}
            />
          }
        />

        <Route
          path="reports"
          element={
            <Reports
              bookings={bookings}
              payments={payments}
              fields={fields}
            />
          }
        />

        <Route
          path="settings"
          element={<Settings />}
        />

        <Route
          path="help"
          element={<Help />}
        />

        <Route
          path="*"
          element={<NotFound admin />}
        />
      </Route>
    </Routes>
  );
}