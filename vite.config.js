// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  // 1. 현재 mode에 맞는 .env 파일을 불러옵니다.
  //    세 번째 인자는 prefix 필터, ''로 두면 VITE_ 로 시작하는 모든 변수를 로드
  const base = mode === "production" ? "/front_5th_chapter2-1/" : "/";
  return {
    // 2. base URL 설정
    base: base,
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.basic.html'),
          advanced: resolve(__dirname, 'index.advanced.html'),
        },
      },
      outDir: 'dist',
    },

    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['/src/setupTests.js'],
      include: [
        'src/basic/**/*.test.js',
        'src/advanced/**/*.test.js',
      ],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  }
})
