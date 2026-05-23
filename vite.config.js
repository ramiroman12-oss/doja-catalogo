import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Esto debe coincidir con lo que pusiste en Vercel
    emptyOutDir: true,
  },
})
