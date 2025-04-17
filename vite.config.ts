import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        basic: path.resolve(__dirname, 'index.basic.html'),
        advanced: path.resolve(__dirname, 'index.advanced.html'),
      },
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/front_5th_chapter2-1/' : '/',
});
