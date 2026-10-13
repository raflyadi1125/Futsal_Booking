
export const stats = [
  {
    title: 'Total Booking',
    value: '128',
    description: 'Booking bulan ini',
    icon: 'calendar',
    color: 'blue',
  },
  {
    title: 'Pendapatan',
    value: 'Rp8,4 jt',
    description: 'Pembayaran terverifikasi',
    icon: 'wallet',
    color: 'green',
  },
  {
    title: 'Menunggu Konfirmasi',
    value: '12',
    description: 'Perlu ditinjau',
    icon: 'clock',
    color: 'yellow',
  },
  {
    title: 'Lapangan Aktif',
    value: '4',
    description: 'Siap untuk disewa',
    icon: 'trophy',
    color: 'purple',
  },
];

export const weeklyBookings = [
  { day: 'Sen', bookings: 12 },
  { day: 'Sel', bookings: 19 },
  { day: 'Rab', bookings: 15 },
  { day: 'Kam', bookings: 24 },
  { day: 'Jum', bookings: 30 },
  { day: 'Sab', bookings: 38 },
  { day: 'Min', bookings: 28 },
];

export const recentBookings = [
  {
    id: 'FB-001',
    customer: 'Andi Pratama',
    field: 'Lapangan A',
    date: '12 Okt 2026',
    time: '19.00–20.00',
    amount: 150000,
    status: 'Menunggu',
  },
  {
    id: 'FB-002',
    customer: 'Budi Santoso',
    field: 'Lapangan B',
    date: '12 Okt 2026',
    time: '20.00–21.00',
    amount: 175000,
    status: 'Dikonfirmasi',
  },
  {
    id: 'FB-003',
    customer: 'Dimas Saputra',
    field: 'Lapangan C',
    date: '13 Okt 2026',
    time: '18.00–19.00',
    amount: 150000,
    status: 'Menunggu',
  },
  {
    id: 'FB-004',
    customer: 'Rizky Ramadhan',
    field: 'Lapangan A',
    date: '13 Okt 2026',
    time: '20.00–21.00',
    amount: 150000,
    status: 'Selesai',
  },
  {
    id: 'FB-005',
    customer: 'Fajar Maulana',
    field: 'Lapangan D',
    date: '14 Okt 2026',
    time: '19.00–20.00',
    amount: 200000,
    status: 'Dibatalkan',
  },
];

export const formatRupiah = (amount) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);


export const initialFields = [
  {
    id: 1,
    name: 'Lapangan A',
    type: 'Vinyl',
    price: 150000,
    capacity: 10,
    openingTime: '08:00',
    closingTime: '23:00',
    facilities: 'Toilet, Parkir, Mushola',
    status: 'Aktif',
  },
  {
    id: 2,
    name: 'Lapangan B',
    type: 'Rumput Sintetis',
    price: 175000,
    capacity: 10,
    openingTime: '08:00',
    closingTime: '23:00',
    facilities: 'Toilet, Parkir, Tribun',
    status: 'Aktif',
  },
  {
    id: 3,
    name: 'Lapangan C',
    type: 'Vinyl',
    price: 150000,
    capacity: 10,
    openingTime: '09:00',
    closingTime: '22:00',
    facilities: 'Toilet, Mushola',
    status: 'Nonaktif',
  },
  {
    id: 4,
    name: 'Lapangan D',
    type: 'Rumput Sintetis',
    price: 200000,
    capacity: 10,
    openingTime: '08:00',
    closingTime: '23:00',
    facilities: 'Toilet, Parkir, Kantin, Tribun',
    status: 'Aktif',
  },
];


export const initialPayments = [
  {
    id: 'PAY-001',
    bookingId: 'FB-001',
    customer: 'Andi Pratama',
    field: 'Lapangan A',
    date: '12 Okt 2026',
    method: 'QRIS',
    amount: 150000,
    status: 'Menunggu Verifikasi',
  },
  {
    id: 'PAY-002',
    bookingId: 'FB-002',
    customer: 'Budi Santoso',
    field: 'Lapangan B',
    date: '12 Okt 2026',
    method: 'Transfer Bank',
    amount: 175000,
    status: 'Terverifikasi',
  },
  {
    id: 'PAY-003',
    bookingId: 'FB-003',
    customer: 'Dimas Saputra',
    field: 'Lapangan C',
    date: '13 Okt 2026',
    method: 'E-Wallet',
    amount: 150000,
    status: 'Menunggu Verifikasi',
  },
  {
    id: 'PAY-004',
    bookingId: 'FB-004',
    customer: 'Rizky Ramadhan',
    field: 'Lapangan A',
    date: '13 Okt 2026',
    method: 'QRIS',
    amount: 150000,
    status: 'Terverifikasi',
  },
  {
    id: 'PAY-005',
    bookingId: 'FB-005',
    customer: 'Fajar Maulana',
    field: 'Lapangan D',
    date: '14 Okt 2026',
    method: 'Transfer Bank',
    amount: 200000,
    status: 'Ditolak',
  },
];