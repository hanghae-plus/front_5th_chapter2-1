// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  // 1. 현재 mode에 맞는 .env 파일을 불러옵니다.
  //    세 번째 인자는 prefix 필터, ''로 두면 VITE_ 로 시작하는 모든 변수를 로드
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // 2. base URL 설정
    base: env.VITE_BASE_URL,

    plugins: [react()],
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: resolve(process.cwd(), 'index.html'),
          advanced: resolve(process.cwd(), 'index.advanced.html'),
        },
      },
    },

    server: {
      open: '/index.advanced.html',
      // 3. 로컬 개발 중 API 프록시
      proxy: {
        '/api': {
          target: env.VITE_API_ENDPOINT,
          changeOrigin: true,
        },
      },
    },

    define: {
      // 필요한 경우
      'process.env.NODE_ENV': JSON.stringify(mode),
    },

    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['/src/setupTests.js'],
      include: [
        'src/basic/**/*.test.js',
        'src/advanced/**/*.{test,spec}.{ts,tsx}',
      ],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  }
})
