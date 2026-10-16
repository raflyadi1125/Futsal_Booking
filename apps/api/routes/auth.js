import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@futsalbook/database";
import { authRequired } from "../middleware/auth.js";

const router = Router();

const buatToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || "7d",
  });

// Data user yang aman dikirim ke frontend (tanpa password)
const publik = (u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  phone: u.phone,
  role: u.role,
});

// POST /api/auth/register  (hanya untuk Pengguna)
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Nama, email, dan password wajib diisi" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password minimal 6 karakter" });
    }

    const sudahAda = await prisma.user.findUnique({ where: { email } });
    if (sudahAda) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: await bcrypt.hash(password, 10),
        role: "USER", // role selalu USER, tidak boleh dikirim dari client
      },
    });

    res.status(201).json({ user: publik(user), token: buatToken(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// POST /api/auth/login  (Pengguna dan Admin)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    const cocok = user && (await bcrypt.compare(password, user.password));

    if (!cocok) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    res.json({ user: publik(user), token: buatToken(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// GET /api/auth/me  (cek siapa yang sedang login)
router.get("/me", authRequired, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  res.json({ user: publik(user) });
});

export default router;