import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: /\.(advanced\.tsx|advanced\.jsx)$/,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
  },
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    open: '/index.html',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/advanced'),
      '@components': path.resolve(__dirname, './src/advanced/components'),
      '@pages': path.resolve(__dirname, './src/advanced/pages'),
      '@utils': path.resolve(__dirname, './src/advanced/utils'),
      '@data': path.resolve(__dirname, './src/advanced/data'),
      '@types': path.resolve(__dirname, './src/advanced/types'),
    },
  },
});
