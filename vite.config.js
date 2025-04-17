import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';
import { BASE_URL } from './src/baseUrl';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: BASE_URL + '/index.basic.html',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.basic.html'),
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
  },
});
