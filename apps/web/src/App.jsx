import { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
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
import AdminLayout from "./components/layout/AdminLayout";

import Dashboard from "./pages/admin/Dashboard";
import Fields from "./pages/admin/Fields";
import Booking from "./pages/admin/Booking";
import Payments from "./pages/admin/Payments";
import Reports from "./pages/admin/Reports";

function readSession(key) {
  try {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
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

  return (
    <Routes>
      {/* Halaman publik */}
      <Route
        element={
          <PublicLayout
            user={user}
            onLogout={() => setUser(null)}
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
            user ? (
              <Navigate to="/booking" replace />
            ) : (
              <Login onLogin={setUser} />
            )
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
      </Route>

      {/* Login admin terpisah */}
      <Route
        path="/admin/login"
        element={
          admin ? (
            <Navigate to="/admin" replace />
          ) : (
            <Login onLogin={setAdmin} />
          )
        }
      />

      {/* Semua halaman admin wajib login */}
      <Route
        path="/admin/*"
        element={
          <RequireAdmin admin={admin}>
            <AdminPanel
              admin={admin}
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
      />

      {/* Halaman yang tidak ditemukan */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}