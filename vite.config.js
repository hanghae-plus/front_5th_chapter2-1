import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['/src/setupTests.js'],
    include: [
      // 기존 JavaScript 테스트 파일
      'src/basic/**/*.test.js',
      // React/TypeScript 테스트 파일
      'src/advanced/**/*.{test,spec}.{ts,tsx}'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    }
  },
  server: {
    open: '/index.advanced.html'
  }
})