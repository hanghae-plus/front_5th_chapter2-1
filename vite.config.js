import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/hanghae99-chap4/', // GitHub Pages에서의 배포 경로
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'basic/index.html'),  // index.html 경로 명시
    },
    outDir: 'docs/basic',  // 빌드된 파일들이 docs/basic 폴더에 저장되게끔
    emptyOutDir: true,     // 빌드 전에 기존 파일들 삭제
  },
});