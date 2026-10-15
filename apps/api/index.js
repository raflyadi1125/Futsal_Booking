import express from "express";
import { prisma } from "@futsalbook/database";

const app = express();
app.use(express.json());

// Daftar lapangan aktif beserta venue-nya
app.get("/api/fields", async (req, res) => {
  try {
    const lapangan = await prisma.field.findMany({
      where: { isActive: true },
      include: { venue: true },
    });
    res.json(lapangan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "FutsalBook API berjalan" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API berjalan di http://localhost:${PORT}`);
});