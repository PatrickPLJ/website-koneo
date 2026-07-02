# Setup Bot Auto-Reply Google Maps Review — Koneo Indonesia

Panduan ini untuk **Bapak Dirut / admin yang pegang akses Google Business
Profile Koneo**. Semua API key dan credential diisi langsung di Apps Script
(Script Properties) — jangan pernah dikirim lewat chat ke siapapun, termasuk
ke Claude Code.

## Ringkasan arsitektur

- Engine: **Google Apps Script** (gratis, tidak perlu server eksternal) —
  konsisten dengan sistem QR member yang sudah ada.
- Data review baru dicek **tiap 1 jam** lewat trigger otomatis.
- Draft balasan dibuat oleh **Anthropic API** (model `claude-sonnet-4-6`).
- Admin dapat notifikasi email, buka link, approve atau edit draft, baru
  terpost ke Google Maps.
- Semua review yang masuk & statusnya tercatat di Google Sheet **"Review
  Log"**.

## 0. Siapkan folder & file di Apps Script

1. Buka [script.google.com](https://script.google.com) → **New project**.
2. Beri nama project, misalnya `Koneo Review Bot`.
3. Buat 2 file di project ini:
   - `Code.gs` → copy-paste isi dari `google-review-bot/Code.gs` di repo ini.
   - `Approval.html` (File → New → HTML file, beri nama persis `Approval`)
     → copy-paste isi dari `google-review-bot/Approval.html`.
4. Buka **Project Settings** (ikon gerigi) → centang **"Show appsscript.json
   manifest file in editor"**. Buka file `appsscript.json` yang muncul, ganti
   isinya dengan isi `google-review-bot/appsscript.json` di repo ini.
5. Simpan (biar rapi, sebaiknya taruh Google Sheet log-nya di folder Google
   Drive yang sama dengan Sheet member yang sudah ada, supaya semua data
   operasional Koneo ada di satu tempat).

## 1. Aktifkan Google Business Profile API (Google My Business API)

1. Buka [Google Cloud Console](https://console.cloud.google.com).
2. Buat project baru atau pakai project yang sudah ada untuk Koneo.
3. Menu **APIs & Services → Library**, cari **"Google My Business API"**
   (kadang muncul sebagai bagian dari "Business Profile APIs") lalu klik
   **Enable**.
   - Catatan: Google membatasi akses API ini. Kalau saat enable diminta
     mengisi form akses (Business Profile API access request), isi form
     tersebut dengan data bisnis Koneo — proses approval dari Google bisa
     memakan beberapa hari.
4. Di Apps Script, buka **Project Settings → Google Cloud Platform (GCP)
   Project** → hubungkan ke project GCP yang barusan dibuat/dipakai (klik
   "Change project", masukkan Project Number dari GCP Console).
5. Dapatkan **Account ID** dan **Location ID** Koneo:
   - Cara termudah: dari [business.google.com](https://business.google.com),
     buka profil Koneo, Account ID & Location ID biasanya terlihat di URL
     dashboard.
   - Alternatif: jalankan fungsi `testFetchGoogleReviews()` setelah Account
     ID & Location ID sementara diisi manual, sambil cek log error untuk
     validasi.

## 2. Dapatkan API key Anthropic (Claude)

1. Buka [platform.claude.com](https://platform.claude.com) (Anthropic
   Console) dan login/daftar.
2. Menu **API Keys** → **Create Key**. Beri nama misalnya `koneo-review-bot`.
3. Simpan key ini (`sk-ant-...`) — akan diisi ke Script Properties di langkah
   4.
4. Pastikan akun Anthropic Bapak/Ibu punya saldo/billing aktif supaya
   panggilan API tidak gagal karena kuota habis.

## 3. Isi Script Properties

Di editor Apps Script: **Project Settings → Script Properties → Add script
property**. Isi baris berikut satu-satu:

| Property               | Isi                                                                 |
|-------------------------|----------------------------------------------------------------------|
| `ANTHROPIC_API_KEY`     | API key dari langkah 2                                              |
| `GMB_ACCOUNT_ID`        | Account ID Google Business Profile Koneo                            |
| `GMB_LOCATION_ID`       | Location ID Google Business Profile Koneo                           |
| `NOTIFICATION_METHOD`   | `email` (gratis, tidak perlu layanan pihak ketiga, lihat langkah 5)  |
| `ADMIN_EMAIL`           | `koneo.ind@gmail.com`                                                |
| `TOKEN_SECRET`          | String acak panjang bebas, contoh: hasil `openssl rand -hex 32`      |
| `SPREADSHEET_ID`        | (Opsional) ID Google Sheet log, kalau mau taruh di Sheet yang sudah ada di folder Drive member. Kosongkan untuk pakai spreadsheet aktif/bound. |

`FONNTE_API_KEY` dan `ADMIN_WHATSAPP_NUMBER` **tidak perlu diisi** — dua
property itu hanya dipakai kalau `NOTIFICATION_METHOD` di-set ke
`whatsapp`.

`WEB_APP_URL` **belum diisi di sini** — akan diisi otomatis di langkah 4
setelah web app di-deploy.

## 4. Deploy sebagai Web App

1. Di editor Apps Script: **Deploy → New deployment**.
2. Pilih tipe **Web app**.
3. **Execute as**: `Me` (akun Bapak Dirut yang punya akses Google Business
   Profile).
4. **Who has access**: `Anyone` — supaya admin bisa buka link approval dari
   email tanpa perlu login Google. Keamanan link dijaga lewat token rahasia
   (`TOKEN_SECRET`) yang unik per review, bukan lewat login.
5. Klik **Deploy**, lalu **Authorize access** — izinkan semua scope yang
   diminta (Business Profile, Sheets, Gmail, dll).
6. Copy **Web app URL** yang muncul.
7. Kembali ke editor, jalankan fungsi `saveWebAppUrl('URL_YANG_DICOPY')` sekali
   (ganti isi argumennya dengan URL asli) supaya link di notifikasi mengarah
   ke web app yang benar. Atau, isi manual sebagai Script Property
   `WEB_APP_URL`.

> Setiap kali Bapak/Ibu melakukan **New deployment** lagi (bukan "Manage
> deployments → Edit"), URL web app akan berubah — jangan lupa jalankan
> ulang `saveWebAppUrl()`.

## 5. Setup notifikasi admin — Email (gratis)

Notifikasi dikirim ke **koneo.ind@gmail.com**.

1. Pastikan Script Property `ADMIN_EMAIL` = `koneo.ind@gmail.com` (sudah
   diisikan di tabel langkah 3 di atas).
2. Pastikan Script Property `NOTIFICATION_METHOD` = `email`.
3. Tidak perlu daftar layanan pihak ketiga apapun — script memakai
   `GmailApp` bawaan Apps Script, dikirim dari akun Google yang menjalankan
   script ini (akun yang sama dengan `Execute as` di langkah 4). Gratis,
   tanpa batas biaya, hanya kena kuota harian Gmail (100 email/hari untuk
   akun Gmail biasa) yang jauh lebih dari cukup untuk kebutuhan ini.

Kalau suatu saat mau pindah ke notifikasi WhatsApp (misal pakai Fonnte),
tinggal isi `FONNTE_API_KEY` + `ADMIN_WHATSAPP_NUMBER` dan ganti
`NOTIFICATION_METHOD` jadi `whatsapp` — tidak perlu ubah kode, karena
`Code.gs` sudah mendukung dua-duanya lewat `sendWhatsAppNotification_()`.

## 6. Aktifkan trigger otomatis tiap 1 jam

1. Di editor Apps Script, pilih fungsi `createHourlyTrigger` dari dropdown
   fungsi di toolbar.
2. Klik **Run**. Izinkan permission kalau diminta.
3. Cek di menu **Triggers** (ikon jam di sidebar kiri) — harus muncul trigger
   `checkNewReviews` dengan jadwal "Every hour".

Kalau perlu ganti jadwal atau reset, cukup jalankan `createHourlyTrigger()`
lagi — trigger lama untuk fungsi yang sama otomatis dihapus dulu supaya
tidak dobel jalan.

## 7. Verifikasi Google Sheet "Review Log"

1. Jalankan fungsi `testCreateSheet` sekali dari editor untuk memastikan
   sheet "Review Log" dengan header yang benar sudah terbuat di spreadsheet
   (aktif, atau `SPREADSHEET_ID` yang diisi di langkah 3).
2. Header yang seharusnya muncul di baris 1:
   `Timestamp_Masuk | Review_ID | Nama_Reviewer | Rating | Isi_Review | Draft_Balasan | Status | Timestamp_Dipost | Catatan_Admin`
3. Kolom `Review_ID` ditambahkan di luar daftar header awal di brief karena
   dibutuhkan untuk syarat "jangan generate draft dua kali untuk review yang
   sama" — dedupe dilakukan dengan mencocokkan Review ID dari Google, bukan
   nama/isi review yang bisa mirip-mirip.

## 8. Testing

Lanjut ke `TESTING.md` untuk checklist simulasi end-to-end sebelum bot ini
dianggap siap pakai di production.

## Catatan keamanan

- **Jangan pernah** taruh `ANTHROPIC_API_KEY`, credential Google Business
  Profile, atau `TOKEN_SECRET` di kode yang dikirim ke chat manapun. Semua
  diisi langsung di Script Properties oleh Bapak Dirut.
- Link approval punya token unik per baris (HMAC, bukan bisa ditebak) dan
  otomatis dianggap tidak berlaku lagi setelah status menjadi
  Approved/Edited — link lama tidak bisa dipakai untuk posting ulang.
- Web app di-set "Anyone" bisa akses supaya admin tidak perlu login Google
  di HP saat buka link dari WhatsApp — kalau ingin lebih ketat, bisa ganti
  ke "Anyone within [domain Google Workspace]" kalau Koneo pakai Google
  Workspace.
