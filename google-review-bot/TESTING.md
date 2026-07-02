# Testing Checklist — Bot Auto-Reply Google Maps Review

Jalankan urutan ini sebelum bot dianggap siap dipakai di production.
Semua fungsi test ada di `Code.gs`, jalankan langsung dari editor Apps
Script (pilih nama fungsi di dropdown toolbar → Run).

## 1. Draft balasan (Anthropic API)

- [ ] `testGenerateDraftReplyPositif()` — jalankan, cek **Log** (Ctrl+Enter
      atau View → Logs). Draft harus:
  - Tidak menyebut "es serut" sama sekali, selalu "bingsoo".
  - Menyebut detail spesifik dari review contoh (mangga, estetik).
  - 2–4 kalimat, bahasa Indonesia santai tapi sopan.
- [ ] `testGenerateDraftReplyNegatif()` — draft harus minta maaf tanpa
      defensif, menawarkan dihubungi langsung, tidak janji berlebihan.
- [ ] `testGenerateDraftReplyTanpaTeks()` — review tanpa komentar (hanya
      bintang) tetap menghasilkan balasan singkat yang wajar.
- [ ] Jalankan salah satu fungsi di atas 2× berturut-turut dengan input
      sama — pastikan hasilnya **tidak identik** (tidak template sama
      persis), sesuai aturan prompt.
- [ ] Simulasikan kegagalan: ganti `ANTHROPIC_API_KEY` jadi string acak yang
      salah sementara, jalankan `testGenerateDraftReplyPositif()` lagi —
      harus muncul error yang jelas di log (bukan crash diam-diam).
      **Kembalikan API key yang benar setelah tes ini.**

## 2. Ambil review dari Google Business Profile

- [ ] `testFetchGoogleReviews()` — cek log berisi daftar review (JSON) dari
      akun Google Business Profile Koneo. Kalau error 403/404, cek lagi
      Account ID / Location ID dan status akses API di SETUP.md langkah 1.

## 3. Sheet "Review Log"

- [ ] `testCreateSheet()` — sheet "Review Log" muncul dengan 9 kolom header
      yang benar (lihat SETUP.md langkah 7).
- [ ] Jalankan `checkNewReviews()` sekali secara manual (bukan lewat
      trigger). Pastikan:
  - Review baru masuk sebagai baris baru dengan `Status = Pending`.
  - `Review_ID` terisi dan tidak kosong.
  - `Draft_Balasan` terisi (atau `Status = Error - Perlu Balas Manual` kalau
    Anthropic API gagal).
- [ ] Jalankan `checkNewReviews()` **lagi** tanpa ada review baru masuk —
      pastikan **tidak ada baris duplikat** untuk review yang sama (dedupe
      lewat `Review_ID` bekerja).

## 4. Notifikasi admin

- [ ] Set `NOTIFICATION_METHOD` sesuai pilihan, lalu jalankan
      `checkNewReviews()` dengan minimal satu review baru (bisa tunggu
      review asli, atau sementara hapus satu baris terakhir di Sheet supaya
      review itu "dianggap baru" lagi khusus untuk tes ini).
  - **WhatsApp**: pesan masuk ke nomor admin, berisi nama reviewer, rating,
    isi review, draft balasan, dan link approval.
  - **Email**: email masuk ke `ADMIN_EMAIL`, format HTML rapi, tombol/link
    "Buka untuk Approve / Edit" bisa diklik.
- [ ] Klik link dari notifikasi di HP — halaman approval terbuka dan bisa
      dibaca dengan baik di layar kecil (mobile-friendly).

## 5. Approve & posting ke Google Maps

- [ ] Dari halaman approval, klik **"Setujui & Posting"** tanpa mengubah
      teks draft.
  - Halaman konfirmasi "Berhasil diposting" muncul.
  - Buka Google Maps / Google Business Profile — balasan benar-benar
    muncul di bawah review yang bersangkutan.
  - Di Sheet, baris review tersebut: `Status = Approved`,
    `Timestamp_Dipost` terisi.
- [ ] Untuk review lain, klik link approval, **ubah teks draft** di text
      field, lalu klik **"Simpan Perubahan & Posting"**.
  - Balasan yang terpost ke Google Maps sesuai teks yang **sudah diedit**,
    bukan draft asli.
  - Di Sheet: `Status = Edited`, `Draft_Balasan` terupdate jadi teks final.
- [ ] Coba buka ulang link approval yang **sudah** diproses (Approved/
      Edited) — harus muncul pesan "sudah diproses", tidak bisa posting
      dobel.
- [ ] Coba akses web app dengan `token` yang diubah-ubah manual di URL —
      harus ditolak ("Link tidak valid").

## 6. Trigger otomatis

- [ ] Jalankan `createHourlyTrigger()`, cek di menu **Triggers** muncul
      jadwal "Every hour" untuk `checkNewReviews`.
- [ ] Biarkan berjalan otomatis minimal 1–2 siklus jam berjalan, cek
      **Executions** (sidebar kiri editor Apps Script) untuk memastikan
      tidak ada error yang berulang.

## 7. End-to-end (ringkasan alur brief)

- [ ] Review baru masuk di Google Maps →
- [ ] Terdeteksi otomatis dalam ≤ 1 jam →
- [ ] Draft balasan sesuai tone Koneo & jenis review otomatis terbuat →
- [ ] Notifikasi terkirim ke admin (WhatsApp atau email) →
- [ ] Admin approve/edit lewat satu klik →
- [ ] Balasan benar-benar terpost di Google Maps →
- [ ] Semua tercatat rapi di Sheet "Review Log" dengan status & timestamp
      yang benar.

Kalau semua kotak di atas sudah tercentang, bot siap dipakai untuk
operasional harian.
