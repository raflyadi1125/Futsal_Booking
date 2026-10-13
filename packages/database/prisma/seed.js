async function main() {
  // Akun admin
  const password = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@futsalbook.com" },
    update: {},
    create: {
      name: "Admin FutsalBook",
      email: "admin@futsalbook.com",
      password,
      role: "ADMIN",
    },
  });

  // Venue + lapangan + jam operasional (hanya dibuat kalau belum ada)
  const sudahAda = await prisma.venue.count();
  if (sudahAda === 0) {
    await prisma.venue.create({
      data: {
        name: "Arena Futsal Bandung",
        address: "Jl. Contoh No. 10",
        city: "Bandung",
        description: "Lapangan futsal indoor dengan fasilitas lengkap.",
        fields: {
          create: [
            { name: "Lapangan A", surfaceType: "Vinyl", pricePerHour: 100000 },
            { name: "Lapangan B", surfaceType: "Sintetis", pricePerHour: 80000 },
          ],
        },
        operatingHours: {
          create: [0, 1, 2, 3, 4, 5, 6].map((day) => ({
            dayOfWeek: day,
            openTime: "08:00",
            closeTime: "23:00",
          })),
        },
      },
    });
  }

  console.log("Seed selesai");
}