import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: 'front_5th_chapter2-1',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'basic/index.html'),
      },
    },
    outDir: 'dist', // 기본값이지만 명시적으로 써도 좋아
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
  },
});
