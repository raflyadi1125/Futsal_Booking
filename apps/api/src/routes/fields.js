import { authRequired, adminOnly } from "../middleware/auth.js";
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

// GET /api/fields/admin
router.get("/admin", authRequired, adminOnly, async (req, res) => {
  try {
    const fields = await prisma.field.findMany({
      include: {
        venue: {
          include: {
            operatingHours: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(fields);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data lapangan." });
  }
});

// POST /api/fields

router.post("/", authRequired, adminOnly, async (req, res) => {
  try {
    const {
      name,
      surfaceType,
      pricePerHour,
      venueId,
      capacity,
      facilities,
      openingTime,
      closingTime,
    } = req.body;

    const price = Number(pricePerHour);
    const capacityNumber = Number(capacity ?? 10);

    if (
      typeof name !== "string" ||
      !name.trim() ||
      !venueId ||
      !Number.isInteger(price) ||
      price <= 0
    ) {
      return res.status(400).json({
        message: "Nama, venue, dan harga lapangan wajib valid.",
      });
    }

    if (
      !Number.isInteger(capacityNumber) ||
      capacityNumber <= 0
    ) {
      return res.status(400).json({
        message: "Kapasitas harus berupa bilangan bulat positif.",
      });
    }

    const open = openingTime ?? "08:00";
    const close = closingTime ?? "23:00";

    if (
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(open) ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(close)
    ) {
      return res.status(400).json({
        message: "Format jam harus HH:mm.",
      });
    }

    if (
      facilities !== undefined &&
      typeof facilities !== "string"
    ) {
      return res.status(400).json({
        message: "Format fasilitas tidak valid.",
      });
    }

    const venue = await prisma.venue.findUnique({
      where: { id: venueId },
    });

    if (!venue) {
      return res.status(400).json({
        message: "Venue tidak ditemukan.",
      });
    }

    const field = await prisma.field.create({
      data: {
        name: name.trim(),
        surfaceType: surfaceType || "Vinyl",
        pricePerHour: price,
        venueId,
        capacity: capacityNumber,
        facilities: facilities ?? "",
        openingTime: open,
        closingTime: close,
      },
      include: {
        venue: {
          include: {
            operatingHours: true,
          },
        },
      },
    });

    res.status(201).json(field);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Gagal menambahkan lapangan.",
    });
  }
});



router.put("/:id", authRequired, adminOnly, async (req, res) => {
  try {
    const {
      name,
      surfaceType,
      pricePerHour,
      isActive,
      capacity,
      facilities,
      openingTime,
      closingTime,
    } = req.body;

    const data = {};

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          message: "Nama lapangan wajib diisi.",
        });
      }
      data.name = name.trim();
    }

    if (surfaceType !== undefined) {
      data.surfaceType = surfaceType || null;
    }

    if (pricePerHour !== undefined) {
      const price = Number(pricePerHour);

      if (!Number.isInteger(price) || price <= 0) {
        return res.status(400).json({
          message: "Harga tidak valid.",
        });
      }

      data.pricePerHour = price;
    }

    if (isActive !== undefined) {
      if (typeof isActive !== "boolean") {
        return res.status(400).json({
          message: "Status tidak valid.",
        });
      }

      data.isActive = isActive;
    }

    if (capacity !== undefined) {
      const capacityNumber = Number(capacity);

      if (!Number.isInteger(capacityNumber) || capacityNumber <= 0) {
        return res.status(400).json({
          message: "Kapasitas harus berupa bilangan bulat positif.",
        });
      }

      data.capacity = capacityNumber;
    }

    if (facilities !== undefined) {
      if (typeof facilities !== "string") {
        return res.status(400).json({
          message: "Format fasilitas tidak valid.",
        });
      }

      data.facilities = facilities;
    }

    if (openingTime !== undefined) {
      if (
        typeof openingTime !== "string" ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(openingTime)
      ) {
        return res.status(400).json({
          message: "Format jam buka harus HH:mm.",
        });
      }

      data.openingTime = openingTime;
    }

    if (closingTime !== undefined) {
      if (
        typeof closingTime !== "string" ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(closingTime)
      ) {
        return res.status(400).json({
          message: "Format jam tutup harus HH:mm.",
        });
      }

      data.closingTime = closingTime;
    }

    const field = await prisma.field.update({
      where: { id: req.params.id },
      data,
      include: {
        venue: {
          include: {
            operatingHours: true,
          },
        },
      },
    });

    res.json(field);
  } catch (err) {
    console.error(err);

    if (err.code === "P2025") {
      return res.status(404).json({
        message: "Lapangan tidak ditemukan.",
      });
    }

    res.status(500).json({
      message: "Gagal memperbarui lapangan.",
    });
  }
});

// PATCH /api/fields/:id/status
router.patch("/:id/status", authRequired, adminOnly, async (req, res) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({ message: "Status tidak valid." });
    }

    const field = await prisma.field.update({
      where: { id: req.params.id },
      data: { isActive },
    });

    res.json(field);
  } catch (err) {
    console.error(err);

    if (err.code === "P2025") {
      return res.status(404).json({ message: "Lapangan tidak ditemukan." });
    }

    res.status(500).json({ message: "Gagal mengubah status lapangan." });
  }
});

// DELETE /api/fields/:id
router.delete("/:id", authRequired, adminOnly, async (req, res) => {
  try {
    await prisma.field.delete({
      where: { id: req.params.id },
    });

    res.json({ message: "Lapangan berhasil dihapus." });
  } catch (err) {
    console.error(err);

    if (err.code === "P2025") {
      return res.status(404).json({ message: "Lapangan tidak ditemukan." });
    }

    if (err.code === "P2003") {
      return res.status(409).json({
        message:
          "Lapangan tidak dapat dihapus karena masih memiliki data terkait, seperti booking.",
      });
    }

    res.status(500).json({ message: "Gagal menghapus lapangan." });
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