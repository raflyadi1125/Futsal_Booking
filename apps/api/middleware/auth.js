import jwt from "jsonwebtoken";

// Wajib login: membaca header "Authorization: Bearer <token>"
export function authRequired(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET); // { id, role }
    next();
  } catch {
    res.status(401).json({ message: "Token tidak valid atau kedaluwarsa" });
  }
}

// Khusus admin (dipakai setelah authRequired)
export function adminOnly(req, res, next) {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ message: "Hanya untuk admin" });
  }
  next();
}