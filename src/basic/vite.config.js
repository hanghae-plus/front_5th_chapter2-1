import { defineConfig } from 'vite';

export default defineConfig({
  base: '/hanghae99-chap4/',
  build: {
    rollupOptions: {
      input: 'src/basic/index.basic.html', // 진입점
    },
    outDir: 'docs/basic',
  }
});