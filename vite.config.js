import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SERVER_URL } from './src/constants/webConst'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window'  // ← 이거 추가!
  },
  server:{
    proxy: {
      '/api': {
        target: `${SERVER_URL}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})