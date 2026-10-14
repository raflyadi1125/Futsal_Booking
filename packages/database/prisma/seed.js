import pkg from "@prisma/client";
import bcrypt from "bcryptjs";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Gabungkan tanggal + jam dalam zona waktu WIB (UTC+7)
const waktu = (tanggal, jam) => new Date(`${tanggal}T${jam}:00+07:00`);

// ---------- AKUN ----------
const demoAdmin = {
  email: "admin@futsal.test",
  password: "admin123",
  name: "Administrator",
};

const demoUsers = [
  { id: "USR-001", name: "Andi Pratama", email: "andi@futsal.test", password: "user123" },
  { id: "USR-002", name: "Budi Santoso", email: "budi@futsal.test", password: "user123" },
  { id: "USR-003", name: "Dimas Saputra", email: "dimas@futsal.test", password: "user123" },
  // Pemesan di data booking yang tidak ada di demoUsers
  { id: "USR-004", name: "Rizky Ramadhan", email: "rizky@futsal.test", password: "user123" },
  { id: "USR-005", name: "Fajar Maulana", email: "fajar@futsal.test", password: "user123" },
];

// ---------- LAPANGAN ----------
const fieldsData = [
  { name: "Lapangan A", surfaceType: "Vinyl", pricePerHour: 150000, isActive: true },
  { name: "Lapangan B", surfaceType: "Rumput Sintetis", pricePerHour: 175000, isActive: true },
  { name: "Lapangan C", surfaceType: "Vinyl", pricePerHour: 150000, isActive: false },
  { name: "Lapangan D", surfaceType: "Rumput Sintetis", pricePerHour: 200000, isActive: true },
];

// ---------- BOOKING + PEMBAYARAN ----------
const bookingsData = [
  {
    id: "FB-001", email: "andi@futsal.test", field: "Lapangan A",
    date: "2026-10-12", start: "19:00", amount: 150000, status: "PENDING",
    paymentId: "PAY-001", method: "QRIS", paymentStatus: "WAITING_VERIFICATION",
  },
  {
    id: "FB-002", email: "budi@futsal.test", field: "Lapangan B",
    date: "2026-10-12", start: "20:00", amount: 175000, status: "CONFIRMED",
    paymentId: "PAY-002", method: "Transfer Bank", paymentStatus: "PAID",
  },
  {
    id: "FB-003", email: "dimas@futsal.test", field: "Lapangan C",
    date: "2026-10-13", start: "18:00", amount: 150000, status: "PENDING",
    paymentId: "PAY-003", method: "E-Wallet", paymentStatus: "WAITING_VERIFICATION",
  },
  {
    id: "FB-004", email: "rizky@futsal.test", field: "Lapangan A",
    date: "2026-10-13", start: "20:00", amount: 150000, status: "COMPLETED",
    paymentId: "PAY-004", method: "QRIS", paymentStatus: "PAID",
  },
  {
    id: "FB-005", email: "fajar@futsal.test", field: "Lapangan D",
    date: "2026-10-14", start: "19:00", amount: 200000, status: "CANCELLED",
    paymentId: "PAY-005", method: "Transfer Bank", paymentStatus: "REJECTED",
  },
];

async function main() {
  // Bersihkan data lama (urutan penting karena ada relasi)
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.scheduleBlock.deleteMany();
  await prisma.field.deleteMany();
  await prisma.operatingHour.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.user.deleteMany();

  // Admin
  const admin = await prisma.user.create({
    data: {
      name: demoAdmin.name,
      email: demoAdmin.email,
      password: await bcrypt.hash(demoAdmin.password, 10),
      role: "ADMIN",
    },
  });

  // Pengguna
  const users = {};
  for (const u of demoUsers) {
    users[u.email] = await prisma.user.create({
      data: {
        id: u.id,
        name: u.name,
        email: u.email,
        password: await bcrypt.hash(u.password, 10),
        role: "USER",
      },
    });
  }

  // Venue + 4 lapangan + jam operasional
  const venue = await prisma.venue.create({
    data: {
      name: "Arena Futsal Bandung",
      address: "Jl. Contoh No. 10",
      city: "Bandung",
      description: "Lapangan futsal dengan fasilitas lengkap.",
      fields: { create: fieldsData },
      operatingHours: {
        create: [0, 1, 2, 3, 4, 5, 6].map((day) => ({
          dayOfWeek: day,
          openTime: "08:00",
          closeTime: "23:00",
        })),
      },
    },
    include: { fields: true },
  });

  const fieldByName = Object.fromEntries(venue.fields.map((f) => [f.name, f]));

  // Booking + pembayaran
  for (const b of bookingsData) {
    const startTime = waktu(b.date, b.start);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // durasi 1 jam
    const dibatalkan = b.status === "CANCELLED";
    const sudahDiperiksa = ["PAID", "REJECTED"].includes(b.paymentStatus);

    await prisma.booking.create({
      data: {
        id: b.id,
        userId: users[b.email].id,
        fieldId: fieldByName[b.field].id,
        bookingDate: new Date(`${b.date}T00:00:00Z`),
        startTime,
        endTime,
        durationHours: 1,
        totalPrice: b.amount,
        status: b.status,
        cancelledAt: dibatalkan ? new Date() : null,
        cancelReason: dibatalkan ? "Dibatalkan oleh pengguna" : null,
        payment: {
          create: {
            id: b.paymentId,
            amount: b.amount,
            method: b.method,
            status: b.paymentStatus,
            uploadedAt: new Date(),
            verifiedById: sudahDiperiksa ? admin.id : null,
            verifiedAt: sudahDiperiksa ? new Date() : null,
            note: b.paymentStatus === "REJECTED" ? "Bukti pembayaran ditolak" : null,
          },
        },
      },
    });
  }

  console.log("Seed selesai");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());