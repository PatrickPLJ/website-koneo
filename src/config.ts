// ============================================================
//  KONFIGURASI KONEO — ganti nilai di sini sesuai kebutuhan
// ============================================================

// Nomor WhatsApp untuk tombol "Pesan via WhatsApp".
// Format: kode negara TANPA "+" lalu nomor tanpa 0 di depan.
// Contoh 0812-3456-7890  ->  '6281234567890'
export const WA_NUMBER = '6281228827930'

export const WA_TEXT =
  'Halo Koneo! 🍧 Aku mau pesan bingsoo. Boleh info menu & ketersediaannya?'

export const waLink = (text?: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text ?? WA_TEXT)}`

// Tautan resmi
export const LINKS = {
  gofood:
    'https://gofood.co.id/bali/restaurant/koneo-indonesia-jl-nangka-utara-denpasar-feebd509-404d-4667-a50b-c602a3b90839',
  instagram: 'https://www.instagram.com/koneo.ind/',
  tiktok: 'https://www.tiktok.com/@koneoindonesia',
  maps: 'https://www.google.com/maps/search/?api=1&query=Koneo+Indonesia+Jl.+Nangka+Utara+Denpasar',
}
