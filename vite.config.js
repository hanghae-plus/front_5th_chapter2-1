import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/front_5th_chapter2-1/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.basic.html'),
        advanced: resolve(__dirname, 'index.advanced.html')
      }
    },
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js'
  },
})
