import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/front_5th_chapter2-1/' : '',
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'src/setupTests.js',
	},
});
