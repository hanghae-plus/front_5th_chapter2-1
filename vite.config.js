import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
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