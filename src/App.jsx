
import { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
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
import MyBookings from "./pages/public/MyBookings";
import UserPayment from "./pages/public/Payment";
import NotFound from "./pages/public/NotFound";
import AdminLogin from "./pages/auth/AdminLogin";

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
              <Navigate to="/bookings" replace />
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
        path="/admin"
        element={
          <RequireAdmin admin={admin}>
            <AdminLayout
              admin={admin}
              onLogout={handleAdminLogout}
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
