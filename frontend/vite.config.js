import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8081',
      '/products': 'http://127.0.0.1:8081',
      '/orders': 'http://127.0.0.1:8081',
      '/bills': 'http://127.0.0.1:8081'
    }
  }
})
