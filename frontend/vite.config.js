import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8081',
      '/products': 'http://localhost:8081',
      '/orders': 'http://localhost:8081',
      '/bills': 'http://localhost:8081'
    }
  }
})
