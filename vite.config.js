import path from 'path';

import { defineConfig } from 'vite';

export default defineConfig({
    base: '/front_5th_chapter2-1/',
    build: {
        rollupOptions: {
            input: {
                // eslint-disable-next-line no-undef
                main: path.resolve(__dirname, 'index.basic.html'),
            },
        },
    },
});
