import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/hanghae99-chap4/basic/',
  root: './src/basic',
  build: {
    outDir: '../../../docs/basic', // 👈 완전히 정확한 위치
    emptyOutDir: true,
  },
});