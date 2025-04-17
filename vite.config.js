import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  root: 'src/basic', // Vite의 루트 디렉토리를 src/basic으로 설정
  base: '/hanghae99-chap4/basic/', // GitHub Pages에서의 접근 경로
  build: {
    outDir: '../../../docs/basic', // 루트 기준으로 docs/basic에 빌드 결과 생성
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/basic/index.html'), // 진입점 명시
    },
  },
});
