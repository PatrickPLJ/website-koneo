import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base harus = "/<nama-repo>/" supaya aset benar saat di-host di GitHub Pages
export default defineConfig({
  base: '/website-koneo/',
  plugins: [react()],
})
