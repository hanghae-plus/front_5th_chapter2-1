import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/hanghae99-chap4/basic/',
  build: {
    rollupOptions: {
      input: 'src/basic/index.html', // index.html은 src/basic 안에 있어야 함
    },
    outDir: 'basic/dist', // 👈 루트 기준으로 dist 위치 조정
  }
});