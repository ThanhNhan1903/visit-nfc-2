import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    }
  },
  server: {
    port: 3000,
    open: true,
    middleware: [
      (req, res, next) => {
        // Xử lý client-side routing
        if (!req.url.includes('.') && req.url !== '/') {
          req.url = '/';
        }
        next();
      },
    ],
  },
  base: '/'
})
