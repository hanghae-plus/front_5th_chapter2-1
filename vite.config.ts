import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: 'src/setupTests.js',
    },
    base: process.env.NODE_ENV === 'production' ? '/front_5th_chapter2-1/' : '/',
    build: {
        rollupOptions: {
            input: {
                original: resolve(__dirname, 'index.html'),
                basic: resolve(__dirname, 'index.basic.html'),
                advanced: resolve(__dirname, 'index.advanced.html'),
            },
        },
        outDir: 'dist',
    },
    server: {
        // open: '/index.html',
        // open: '/index.basic.html',
        // open: '/index.advanced.html',
    },
});
