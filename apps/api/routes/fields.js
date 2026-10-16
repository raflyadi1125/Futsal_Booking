import { Router } from "express";
import { prisma } from "@futsalbook/database";

const router = Router();

// GET /api/fields?city=Bandung&maxPrice=200000
router.get("/", async (req, res) => {
  try {
    const { city, maxPrice } = req.query;

    const lapangan = await prisma.field.findMany({
      where: {
        isActive: true,
        ...(city && { venue: { city: { contains: city, mode: "insensitive" } } }),
        ...(maxPrice && { pricePerHour: { lte: Number(maxPrice) } }),
      },
      include: { venue: true },
      orderBy: { pricePerHour: "asc" },
    });

    res.json(lapangan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// GET /api/fields/:id
router.get("/:id", async (req, res) => {
  try {
    const field = await prisma.field.findUnique({
      where: { id: req.params.id },
      include: { venue: { include: { operatingHours: true } } },
    });
    if (!field) return res.status(404).json({ message: "Lapangan tidak ditemukan" });
    res.json(field);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

export default router;