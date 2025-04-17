import { defineConfig } from 'vitest/config';
import { resolve } from 'path'

export default defineConfig({
  root: 'src/basic',
  base: '/hanghae99-chap4/basic/',
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html'), // 기본 진입점
    },
    outDir: '../../../docs/basic', // 빌드 결과를 docs/basic에 저장
    emptyOutDir: true,
  },
})