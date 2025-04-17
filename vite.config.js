import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js'
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        basic: './index.basic.html',
        advanced: './index.advanced.html'
      }
    }
  }
})
