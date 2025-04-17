import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/front_5th_chapter2-1/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        basic: 'index.basic.html',
        advanced: 'index.advanced.html',
      },
      output: {
        entryFileNames: () => {
          return `assets/[name]-[hash].js`;
        },
      },
    },
  },
});
