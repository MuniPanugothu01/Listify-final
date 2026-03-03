import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,          // allow external access
    port: 5173,
    strictPort: true,
    allowedHosts: true,  // allow all hosts (important for ngrok)
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // ── Performance optimisations ──
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    // Code splitting: vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          'vendor-ui': ['framer-motion', 'lucide-react', 'react-hot-toast'],
          'vendor-axios': ['axios'],
        },
      },
    },
    // Chunk size warning at 500KB
    chunkSizeWarningLimit: 500,
  },
})
