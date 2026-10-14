/**
 * Membuat nilai CSS background-image berlapis.
 * Jika file gambar belum ada, gradient fallback yang tampil.
 */
export const withFallback = (src, fallback) => `url(${src}), ${fallback}`;