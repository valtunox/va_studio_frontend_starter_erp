<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
  },
  // Browser loads the app on `server.port` (Studio may override via CLI --port).
  // JSON/fetch calls to `/api/*` are forwarded to FastAPI — NOT to the Vite port.
  server: {
    port: 3011,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 300,
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5112',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 3011,
  },
})
=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
  },
  // Browser loads the app on `server.port` (Studio may override via CLI --port).
  // JSON/fetch calls to `/api/*` are forwarded to FastAPI — NOT to the Vite port.
  server: {
    port: 3011,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5112',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 3011,
  },
})
>>>>>>> 22b0267a21511be5230e2e8a7fbb8f3f2d788d52
