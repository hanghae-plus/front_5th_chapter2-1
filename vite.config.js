import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: '**/src/advanced/**',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
  },
});
