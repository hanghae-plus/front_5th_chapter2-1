/* eslint-disable no-undef */
import path from 'path';

import { defineConfig } from 'vite';

export default defineConfig({
    base: '/front_5th_chapter2-1/',
    build: {
        rollupOptions: {
            input: {
                basic: path.resolve(__dirname, 'index.basic.html'),
                main: path.resolve(__dirname, 'index.html'),
            },
        },
    },
});
