import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ user, children }) {
  const location = useLocation();

  if (!user) {
    // Simpan halaman tujuan (termasuk ?fieldId=...) untuk kembali setelah login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}