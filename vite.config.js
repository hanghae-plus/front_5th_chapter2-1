import { defineConfig } from 'vite';

export default defineConfig({
  base: '/hanghae99-chap4/basic/', // GitHub Pages에서의 배포 경로
  build: {
    outDir: 'docs/basic',  // 빌드된 파일들이 docs/basic 폴더에 저장되게끔
    emptyOutDir: true,     // 빌드 전에 기존 파일들 삭제
  },
});