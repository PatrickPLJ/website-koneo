# Koneo Indonesia — Website

Landing page resmi **Koneo Indonesia**, *First Korean Bingsoo Bar in Bali*.
Dibangun dengan **React + TypeScript + Vite**.

🔗 **Live:** https://patrickplj.github.io/website-koneo/

## Stack
- React 18 + TypeScript
- Vite (build & dev server)
- CSS murni (custom properties) — palet brand navy `#093a72` + cream `#ede6dd`
- Deploy otomatis ke GitHub Pages via GitHub Actions

## Menjalankan secara lokal
```bash
npm install
npm run dev        # buka http://localhost:5173
```

## Build produksi
```bash
npm run build      # output ke /dist
npm run preview    # pratinjau hasil build
```

## Mengganti nomor WhatsApp
Edit satu baris di [`src/config.ts`](src/config.ts):
```ts
export const WA_NUMBER = '6281234567890' // ← ganti dengan nomor WA Koneo
```
Format: kode negara tanpa `+`, lalu nomor tanpa `0` di depan
(contoh `0812-3456-7890` → `6281234567890`). Semua tombol WhatsApp ikut terupdate.

## Struktur
```
src/
  components/   # Nav, Hero, Marquee, Menu, About, Story, Visit, Footer, WhatsAppFab, BingsooBowl
  data/menu.ts  # daftar menu + harga
  hooks/        # animasi scroll-reveal
  config.ts     # nomor WA & tautan resmi
  index.css     # seluruh styling
```

## Deploy
Setiap `git push` ke branch `main` otomatis mem-build dan men-deploy ke GitHub Pages
(lihat [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).
