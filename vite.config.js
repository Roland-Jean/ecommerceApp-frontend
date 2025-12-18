import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // Use root base for Vercel, only use subfolder for GitHub Pages
  base: import.meta.env.GITHUB_PAGES === 'true' ? '/ecommerceApp-frontend/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
