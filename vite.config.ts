import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cartographer } from '@replit/vite-plugin-cartographer'
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal'
import path from 'path'

export default defineConfig({
  plugins: [react(), cartographer(), runtimeErrorOverlay()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  base: '/',  // '/PalmReading/'에서 '/'로 변경
  server: {
    host: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
