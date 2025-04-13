import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,ts}'],
    plugins: { js, prettier: prettierPlugin },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: globals.browser,
    },
    settings: {},
  },
  tseslint.configs.recommended,
  prettierConfig,
]);
