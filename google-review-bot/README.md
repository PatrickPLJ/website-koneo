# Bot Auto-Reply Google Maps Review — Koneo Indonesia

Sistem semi-otomatis untuk menjaga rating Google Maps Koneo (4.7 dari 497+
review): bot mendeteksi review baru, generate draft balasan sesuai tone
brand Koneo, lalu menunggu satu klik admin sebelum benar-benar terpost.
Bot yang kerja keras, manusia yang memutuskan final — bukan autopilot penuh.

Sistem ini berdiri sendiri (tidak terhubung ke dashboard atau QR member),
tapi Google Sheet log-nya sebaiknya ditaruh di folder Google Drive yang sama
dengan Sheet member yang sudah ada, supaya semua data operasional Koneo ada
di satu tempat.

## Isi folder ini

| File               | Fungsi                                                                 |
|---------------------|-------------------------------------------------------------------------|
| `Code.gs`           | Seluruh logic bot: trigger, panggil Google Business Profile API & Anthropic API, tulis ke Sheet, kirim notifikasi, web app approval. |
| `Approval.html`     | Halaman yang dibuka admin dari link notifikasi — lihat review + draft, tombol Approve atau Edit. |
| `appsscript.json`   | Manifest project (scope OAuth, konfigurasi web app).                    |
| `SETUP.md`          | Instruksi setup lengkap, langkah demi langkah, dari nol sampai jalan.   |
| `TESTING.md`        | Checklist testing sebelum dipakai di production.                       |

## Alur singkat

```
Review baru masuk di Google Maps
        v
Google Business Profile API cek review baru (trigger tiap 1 jam)
        v
Anthropic API (claude-sonnet-4-6) generate draft balasan
sesuai tone Koneo & jenis review (positif/negatif/netral)
        v
Notifikasi ke admin (WhatsApp via Fonnte, atau email)
berisi: isi review, rating, draft balasan, link approve/edit
        v
Admin klik link -> buka halaman approval
        v
Klik "Setujui & Posting"  ->  draft asli terpost apa adanya
Klik "Simpan Perubahan & Posting"  ->  admin edit dulu, baru terpost
```

Semua panggilan API (Anthropic, Google Business Profile, Fonnte) memakai
`UrlFetchApp` — standar untuk Google Apps Script (server-side, jadi CORS
tidak relevan).

## Mulai dari mana?

1. Baca `SETUP.md` untuk instruksi setup lengkap (aktivasi API, deploy web
   app, isi credential, pasang trigger).
2. Setelah setup selesai, jalankan checklist di `TESTING.md` sebelum bot
   dipakai untuk membalas review asli.

## Kredensial

Semua API key (Anthropic) dan credential Google Business Profile diisi
langsung oleh Bapak Dirut di **Script Properties** pada Apps Script editor
— tidak pernah ditulis di kode atau dikirim lewat chat manapun. Lihat
bagian "Catatan keamanan" di `SETUP.md`.
