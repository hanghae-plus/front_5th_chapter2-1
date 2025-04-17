import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/front_5th_chapter2-1/' : '/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                notFound: resolve(__dirname, '404.html'),
            },
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: 'src/setupTests.js',
    },
});
