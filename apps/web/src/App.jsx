
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

import { demoUsers } from "./data/authData";

import AdminLayout from "./components/layout/AdminLayout";
import PublicLayout from "./components/layout/PublicLayout";

import Home from "./pages/public/Home";
import PublicFields from "./pages/public/Fields";
import Login from "./pages/public/Login";
import UserBooking from "./pages/public/Booking";
import AdminLogin from "./pages/auth/AdminLogin";

import Dashboard from "./pages/admin/Dashboard";
import Fields from "./pages/admin/Fields";
import Booking from "./pages/admin/Booking";
import Payments from "./pages/admin/Payments";
import Reports from "./pages/admin/Reports";

const adminPages = [
  "Dashboard",
  "Manajemen Lapangan",
  "Manajemen Booking",
  "Pembayaran",
  "Laporan",
];

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
  onLogout,
  fields,
  setFields,
  bookings,
  setBookings,
  payments,
  setPayments,
}) {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Dashboard");

  function handleNavigate(page) {
    if (adminPages.includes(page)) {
      setActivePage(page);
    }
  }

  function handleLogout() {
    onLogout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <AdminLayout
      activePage={activePage}
      onNavigate={handleNavigate}
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
          onClick={handleLogout}
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

  function handleUserLogin(account) {
    const validUser = demoUsers.find(
      (item) => item.id === account.id
    );

    if (!validUser) {
      return;
    }

    const sessionUser = {
      id: validUser.id,
      name: validUser.name,
      email: validUser.email,
    };

    sessionStorage.setItem(
      "futsal_user",
      JSON.stringify(sessionUser)
    );

    setUser(sessionUser);
  }

  function handleAdminLogin(account) {
    const sessionAdmin = {
      name: account.name,
      email: account.email,
    };

    sessionStorage.setItem(
      "futsal_admin",
      JSON.stringify(sessionAdmin)
    );

    setAdmin(sessionAdmin);
  }

  function handleUserLogout() {
    sessionStorage.removeItem("futsal_user");
    setUser(null);
  }

  function handleAdminLogout() {
    sessionStorage.removeItem("futsal_admin");
    setAdmin(null);
  }

  return (
    <Routes>
      {/* Halaman publik */}
      <Route
        element={
          <PublicLayout
            user={user}
            onLogout={handleUserLogout}
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
              <Login onLogin={handleUserLogin} />
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
            <AdminLogin onLogin={handleAdminLogin} />
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
              onLogout={handleAdminLogout}
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
