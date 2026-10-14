/* Gambar disimpan di public/images/ */
export const HERO_IMAGE = "/images/hero-futsal.jpg";

export const FALLBACK_BLUE = "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)";
export const FALLBACK_GREEN = "linear-gradient(135deg, #166534 0%, #0f172a 100%)";

export const LOCATIONS = [
  "Bandung Kota",
  "Cimahi",
  "Bandung Barat",
  "Kabupaten Bandung",
];

export const TIME_SLOTS = [
  "08:00 - 09:00",
  "10:00 - 11:00",
  "15:00 - 16:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
  "21:00 - 22:00",
];

export const HIGHLIGHTS = [
  { icon: "zap", title: "Proses Cepat", text: "Booking dalam hitungan menit" },
  { icon: "shield", title: "Aman & Terpercaya", text: "Data dan pembayaran terjamin" },
  { icon: "star", title: "Banyak Pilihan", text: "Tersedia berbagai lokasi dan fasilitas" },
  { icon: "phone", title: "Bisa di Mana Saja", text: "Akses mudah lewat perangkat apa pun" },
];

const GRASS = { icon: "grass", label: "Rumput Sintetis" };
const AIR_CONDITIONER = { icon: "snow", label: "AC" };

export const POPULAR_FIELDS = [
  {
    id: 1,
    name: "Futsal Arena 23",
    address: "Jl. Karya Jaya No.23, Bandung",
    rating: 4.8,
    price: 80000,
    facilities: [GRASS, AIR_CONDITIONER, { icon: "car", label: "Parkir Luas" }],
    image: "/images/court-1.jpg",
    fallback: FALLBACK_BLUE,
  },
  {
    id: 2,
    name: "Sport Center Cibiru",
    address: "Jl. Cibiru Raya No.12, Bandung",
    rating: 4.6,
    price: 75000,
    facilities: [GRASS, AIR_CONDITIONER, { icon: "mosque", label: "Mushola" }],
    image: "/images/court-2.jpg",
    fallback: FALLBACK_GREEN,
  },
  {
    id: 3,
    name: "Futsal Bumi Asri",
    address: "Jl. Bumi Asri No.5, Cimahi",
    rating: 4.7,
    price: 70000,
    facilities: [GRASS, AIR_CONDITIONER, { icon: "car", label: "Parkir Luas" }],
    image: "/images/court-3.jpg",
    fallback: FALLBACK_BLUE,
  },
  {
    id: 4,
    name: "Victory Futsal",
    address: "Jl. Margahayu No.88, Bandung",
    rating: 4.5,
    price: 85000,
    facilities: [GRASS, AIR_CONDITIONER, { icon: "coffee", label: "Café" }],
    image: "/images/court-4.jpg",
    fallback: FALLBACK_GREEN,
  },
];

export const BOOKING_STEPS = [
  {
    icon: "search",
    title: "Cari Lapangan",
    text: "Pilih lokasi, tanggal dan waktu sesuai kebutuhanmu.",
  },
  {
    icon: "calendar",
    title: "Pilih & Booking",
    text: "Lihat detail lapangan lalu lakukan pemesanan.",
  },
  {
    icon: "card",
    title: "Lakukan Pembayaran",
    text: "Bayar dengan metode pembayaran yang tersedia.",
  },
  {
    icon: "ball",
    title: "Siap Bermain!",
    text: "Tunjukkan bukti booking dan nikmati permainanmu.",
  },
];