# Setup Bot Auto-Reply Google Maps Review — Koneo Indonesia

Panduan ini ditulis untuk yang **belum pernah pakai Google Apps Script atau
Google Cloud sama sekali**. Ikuti urut dari atas ke bawah, jangan lompat
tahap. Kerjakan sambil buka browser, jangan cuma dibaca.

Semua API key dan credential diisi langsung di Apps Script (Script
Properties) oleh Bapak Dirut sendiri — jangan pernah dikirim lewat chat ke
siapapun, termasuk ke Claude Code.

## Ringkasan: apa yang akan terjadi

- Engine bot: **Google Apps Script** — gratis, jalan otomatis di server
  Google, tidak perlu install apapun di komputer/HP.
- Tiap 1 jam, bot cek: ada review baru di Google Maps Koneo?
- Kalau ada, bot minta Claude (AI dari Anthropic) buatkan draft balasan.
- Draft + data review dicatat di Google Sheet "Review Log".
- Bapak Dirut dapat **email** ke `koneo.ind@gmail.com` berisi draft itu +
  satu link.
- Klik link itu, ada tombol **Setujui & Posting** atau bisa diedit dulu
  baru posting.

**Perkiraan waktu total:** 30–60 menit kerja aktif, TAPI ada satu tahap
(Tahap 2, aktivasi API Google) yang kadang butuh **menunggu approval dari
Google beberapa hari**. Karena itu, kerjakan Tahap 2 duluan, baru lanjut
tahap lain sambil menunggu.

---

## TAHAP 1 — Siapkan project Google Apps Script

Ini seperti membuat "wadah" tempat kode bot akan ditaruh.

1. Buka browser, kunjungi **script.google.com**.
2. Login pakai **akun Google yang punya akses admin ke Google Business
   Profile / Google Maps Koneo** (akun ini penting — pastikan benar akun
   yang sama dengan yang biasa dipakai untuk kelola profil Koneo di Google
   Maps, bukan akun pribadi lain).
3. Klik tombol **"New project"** (biasanya tombol besar di kiri atas atau di
   tengah halaman).
4. Akan terbuka editor kosong dengan satu file bernama `Code.gs` yang isinya
   cuma `function myFunction() {}`.
5. Ganti nama project: klik tulisan **"Untitled project"** di pojok kiri
   atas, ganti jadi `Koneo Review Bot`, lalu klik **Rename**.
6. Klik di area kode file `Code.gs`, tekan **Ctrl+A** (pilih semua) lalu
   **Delete** untuk mengosongkan isinya.
7. Buka file `google-review-bot/Code.gs` di repo GitHub ini, **select all**
   isinya, **copy**.
8. Kembali ke tab Apps Script, **paste** ke editor `Code.gs` yang tadi
   dikosongkan.
9. Tekan **Ctrl+S** (atau klik ikon disket di toolbar) untuk simpan.
10. Tambah file HTML baru: di sidebar kiri, cari bagian **"Files"**, klik
    ikon **"+"** di sebelahnya, pilih **HTML**.
11. Akan muncul kotak isian nama file — ketik **persis**: `Approval` (huruf
    besar-kecil harus sama, tanpa tambahan apapun). Ini **wajib** persis
    karena kode di `Code.gs` memanggil file ini dengan nama itu.
12. Tekan Enter. File `Approval.html` akan terbuka berisi template HTML
    bawaan.
13. Kosongkan isinya (Ctrl+A, Delete), lalu copy-paste isi dari
    `google-review-bot/Approval.html` di repo ini. Simpan (Ctrl+S).
14. Klik ikon **gerigi (⚙️)** di sidebar kiri — ini halaman **Project
    Settings**.
15. Cari dan **centang** kotak **"Show 'appsscript.json' manifest file in
    editor"**.
16. Klik kembali ikon **`<>`** di sidebar kiri (kembali ke editor kode) —
    sekarang akan ada file baru bernama `appsscript.json` di daftar file.
17. Klik file itu, kosongkan isinya, copy-paste isi dari
    `google-review-bot/appsscript.json` di repo ini. Simpan.

Sampai sini, kode sudah "ada", tapi belum bisa jalan karena belum
tersambung ke API Google dan Claude.

---

## TAHAP 2 — Aktifkan Google Business Profile API (kerjakan paling awal)

Ini tahap yang paling berpotensi memakan waktu, karena kadang Google minta
proses approval dulu. Mulai dari sini duluan.

1. Buka tab baru, kunjungi **console.cloud.google.com**.
2. Login pakai **akun Google yang sama** seperti di Tahap 1.
3. Kalau ini pertama kali pakai Google Cloud, akan muncul halaman
   persetujuan (Terms of Service) — centang kotak persetujuan, klik
   **Agree and Continue**.
4. Di bagian atas halaman ada dropdown nama project (tulisan seperti
   "Select a project"). Klik dropdown itu.
5. Klik **"New Project"**. Isi nama misalnya `Koneo Review Bot`, klik
   **Create**. Tunggu beberapa detik.
6. Pastikan project baru ini yang sedang "aktif" — cek lagi dropdown nama
   project di atas, harus menunjukkan `Koneo Review Bot`.
7. Di sidebar kiri (kalau tidak kelihatan, klik ikon **garis tiga (☰)** di
   pojok kiri atas), cari menu **"APIs & Services"** → klik **"Library"**.
8. Di kotak pencarian, ketik: `Google My Business API`, tekan Enter.
9. Klik hasil yang muncul, lalu klik tombol biru **"Enable"**.
10. Ulangi langkah 8–9 untuk 2 API tambahan (dibutuhkan supaya nanti bisa
    cari Account ID/Location ID otomatis lewat fungsi bantuan di kode):
    - `My Business Account Management API`
    - `My Business Business Information API`
11. **Kalau muncul halaman yang bilang API ini butuh permintaan akses**
    (biasanya ada tombol/link "Request Access" atau form terpisah): isi
    form itu dengan data bisnis Koneo (nama usaha, website, alamat, dsb).
    Proses persetujuan dari pihak Google bisa memakan **beberapa hari
    sampai 1–2 minggu**. Sambil menunggu, lanjut saja ke Tahap 3 dan 4 di
    bawah — tidak saling menghalangi.
12. Sambungkan project Google Cloud ini ke project Apps Script: kembali ke
    tab Apps Script (Tahap 1), klik ikon gerigi **Project Settings**,
    scroll ke bagian **"Google Cloud Platform (GCP) Project"**, klik tombol
    **"Change project"**.
13. Balik ke tab Google Cloud Console, buka halaman **Dashboard** project
    ini (klik nama project di dropdown atas kalau belum di sana). Cari
    kartu **"Project info"**, di situ ada angka **"Project number"** (bukan
    "Project ID" — pastikan ambil yang **number**, bukan yang ID berupa
    huruf-angka).
14. Copy angka Project Number itu, paste ke kotak di Apps Script tadi, klik
    **"Set Project"**.

---

## TAHAP 3 — Buat API key Anthropic (untuk Claude bikin draft balasan)

1. Buka **platform.claude.com** di tab baru.
2. Login atau daftar akun baru kalau belum punya.
3. Cari menu **"API Keys"** di sidebar/menu akun.
4. Klik **"Create Key"**, beri nama misalnya `koneo-review-bot`.
5. **Copy dan simpan** key yang muncul (diawali `sk-ant-...`) — key ini
   cuma ditampilkan sekali, kalau hilang harus buat baru.
6. Cek juga menu **Billing** — pastikan sudah ada metode pembayaran aktif
   (isi saldo/kartu), karena tanpa itu panggilan API akan gagal walau key
   sudah benar.

---

## TAHAP 4 — Isi Script Properties (tempat menyimpan semua kunci rahasia)

Kembali ke tab Apps Script (Tahap 1).

1. Klik ikon gerigi **Project Settings** di sidebar kiri.
2. Scroll ke bawah, cari bagian **"Script Properties"**.
3. Klik **"Add script property"**, lalu isi satu-satu baris berikut (klik
   "Add script property" lagi tiap mau tambah baris baru):

| Property (kolom kiri, ketik persis) | Value (kolom kanan, isi dengan) |
|---|---|
| `ANTHROPIC_API_KEY` | Key dari Tahap 3 (`sk-ant-...`) |
| `GMB_ACCOUNT_ID` | Diisi setelah Tahap 5 di bawah |
| `GMB_LOCATION_ID` | Diisi setelah Tahap 5 di bawah |
| `NOTIFICATION_METHOD` | `email` |
| `ADMIN_EMAIL` | `koneo.ind@gmail.com` |
| `TOKEN_SECRET` | String acak bebas, minimal 20 karakter, contoh: `koneo-bingsoo-rahasia-2026-xyz123` (boleh ganti sendiri, yang penting jangan ditebak orang) |
| `SPREADSHEET_ID` | Boleh dikosongkan dulu — lihat catatan di bawah |

4. Klik **Save** setelah semua terisi.

> Kalau mau Google Sheet log-nya ditaruh di folder Drive yang sama dengan
> Sheet member yang sudah ada: buka Sheet member itu di Google Drive, buat
> Sheet baru kosong di folder yang sama, beri nama bebas, lalu copy ID-nya
> dari URL (bagian antara `/d/` dan `/edit`, contoh:
> `docs.google.com/spreadsheets/d/`**`INI_ID_NYA`**`/edit`). Paste ID itu ke
> `SPREADSHEET_ID`. Kalau dikosongkan, sheet "Review Log" akan otomatis
> dibuat di dalam spreadsheet yang terikat ke project Apps Script ini
> sendiri — tetap jalan, hanya lokasinya tidak sejajar dengan Sheet member.

---

## TAHAP 5 — Cari Account ID dan Location ID Koneo (otomatis, tidak perlu cari manual)

Ini bagian yang biasanya paling membingungkan kalau dicari manual lewat
URL. Karena itu sudah saya buatkan fungsi bantu di kode.

1. Kembali ke editor Apps Script, buka file `Code.gs`.
2. Di toolbar atas ada dropdown pilihan fungsi (biasanya bertuliskan nama
   fungsi seperti `checkNewReviews`). Klik dropdown itu, pilih
   **`listAccountsAndLocationsForSetup`**.
3. Klik tombol **"Run"** (ikon segitiga/play) di sebelah dropdown itu.
4. **Pertama kali run, akan muncul jendela minta izin (Authorize access)**:
   - Klik **"Review permissions"**.
   - Pilih akun Google yang sama seperti di Tahap 1–2.
   - Kalau muncul peringatan "Google hasn't verified this app" — ini
     **normal** untuk script buatan sendiri, klik **"Advanced"** lalu
     **"Go to Koneo Review Bot (unsafe)"**.
   - Klik **"Allow"** di halaman izin akses (Business Profile, Sheets,
     Gmail, dll).
5. Setelah authorize selesai, klik **Run** sekali lagi kalau belum otomatis
   jalan.
6. Buka **View → Logs** (atau tekan **Ctrl+Enter**) untuk lihat hasilnya.
   Akan muncul tulisan seperti:
   ```
   === Akun: Koneo Indonesia | GMB_ACCOUNT_ID = 123456789012 ===
     -> Cabang: Koneo Denpasar | GMB_LOCATION_ID = 987654321098
   ```
7. Copy angka setelah `GMB_ACCOUNT_ID =` dan `GMB_LOCATION_ID =` itu.
8. Kembali ke **Project Settings → Script Properties**, isi/update
   `GMB_ACCOUNT_ID` dan `GMB_LOCATION_ID` dengan angka tadi. Save.

**Kalau di Log muncul error** ("Gagal ambil daftar akun..."): kemungkinan
besar API di Tahap 2 belum selesai di-approve Google, atau belum semua
3 API di-enable. Tunggu proses approval, coba lagi nanti.

---

## TAHAP 6 — Deploy sebagai Web App (supaya link approval bisa dibuka)

1. Di editor Apps Script, klik tombol **"Deploy"** di pojok kanan atas →
   **"New deployment"**.
2. Kalau diminta pilih tipe, klik ikon **gerigi** di sebelah "Select type",
   pilih **"Web app"**.
3. Isi:
   - **Description**: bebas, misal `v1`.
   - **Execute as**: `Me` (akun Bapak Dirut).
   - **Who has access**: `Anyone`.
4. Klik **"Deploy"**.
5. Kalau diminta authorize lagi, ulangi seperti Tahap 5 langkah 4.
6. Setelah deploy selesai, akan muncul **"Web app URL"** — copy URL ini.
7. Di dropdown fungsi (toolbar atas), pilih fungsi yang bernama
   `saveWebAppUrl`. **Sebelum di-Run**, kita perlu isi dulu URL-nya ke
   dalam kode sementara — cara termudah: klik ikon **titik tiga (⋮)** di
   sebelah nama fungsi tidak tersedia untuk isi argumen di UI Apps Script,
   jadi lakukan cara ini saja: buka **Project Settings → Script
   Properties**, klik **Add script property**, isi Property = `WEB_APP_URL`,
   Value = (paste URL yang dicopy tadi). Save.

> Setiap kali membuat **"New deployment"** lagi (bukan "Manage deployments
> → Edit"), URL akan berubah — jangan lupa update lagi `WEB_APP_URL` di
> Script Properties dengan URL yang baru.

---

## TAHAP 7 — Nyalakan trigger otomatis tiap 1 jam

1. Di dropdown fungsi (toolbar atas editor), pilih **`createHourlyTrigger`**.
2. Klik **Run**.
3. Kalau diminta authorize, ikuti seperti Tahap 5 langkah 4.
4. Untuk memastikan berhasil: klik ikon **jam ⏰ (Triggers)** di sidebar
   kiri. Harus muncul satu baris trigger untuk fungsi `checkNewReviews`
   dengan jadwal **"Every hour"**.

Selesai — mulai dari sini, bot akan cek review baru setiap jam secara
otomatis, tanpa perlu dibuka-buka lagi manual.

---

## TAHAP 8 — Pastikan Google Sheet "Review Log" sudah benar

1. Di dropdown fungsi, pilih **`testCreateSheet`**, klik **Run**.
2. Buka Google Sheet yang terkait (kalau `SPREADSHEET_ID` dikosongkan di
   Tahap 4: klik ikon file/Sheet di sidebar Apps Script, atau cari
   spreadsheet dengan nama sama seperti project di Google Drive).
3. Harus ada tab/sheet bernama **"Review Log"** dengan baris header:
   `Timestamp_Masuk | Review_ID | Nama_Reviewer | Rating | Isi_Review | Draft_Balasan | Status | Timestamp_Dipost | Catatan_Admin`

---

## TAHAP 9 — Testing sebelum dipakai beneran

Jangan langsung dipakai untuk review asli sebelum dites. Buka file
`google-review-bot/TESTING.md` di repo ini dan ikuti checklist-nya satu per
satu — isinya cara jalankan fungsi test, cek email masuk, coba tombol
approve/edit, sampai memastikan balasan betul-betul muncul di Google Maps.

---

## Kalau macet di tengah jalan

Kirim saja **pesan error lengkap** yang muncul (dari Logs Apps Script atau
dari email notifikasi) — sertakan di tahap berapa macetnya, nanti saya bantu
diagnosa penyebabnya.

## Catatan keamanan

- **Jangan pernah** taruh `ANTHROPIC_API_KEY`, credential Google Business
  Profile, atau `TOKEN_SECRET` di kode yang dikirim ke chat manapun. Semua
  diisi langsung di Script Properties oleh Bapak Dirut.
- Link approval punya token unik per baris (tidak bisa ditebak) dan
  otomatis dianggap tidak berlaku lagi setelah status menjadi
  Approved/Edited — link lama tidak bisa dipakai untuk posting ulang.
- Web app di-set "Anyone" bisa akses supaya admin tidak perlu login Google
  saat buka link dari email — kalau ingin lebih ketat, bisa ganti ke
  "Anyone within [domain Google Workspace]" kalau Koneo pakai Google
  Workspace.
