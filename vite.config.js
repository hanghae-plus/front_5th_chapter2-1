import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/hanghae99-chap4/', // 깃헙배포경로
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'basic/index.html'),  // index.html 경로 알려주기
    },
    outDir: 'docs',  // 빌드된 파일들이 docs/basic 폴더에 저장되게끔
    emptyOutDir: true,     // 빌드 전에 기존 파일들 삭제
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js'
  },
});