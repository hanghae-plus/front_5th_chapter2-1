import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/hanghae99-chap4/',
  build: {
    rollupOptions: {
      input: 'src/basic/index.basic.html', // 진입점
    },
    outDir: 'docs/basic', // 빌드 결과물을 docs/basic 폴더에 생성
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js'
  },
})
