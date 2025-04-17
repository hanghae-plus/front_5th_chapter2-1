import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/front_5th_chapter2-1/' : '',
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src/advanced/src'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'src/setupTests.js',
	},
});
