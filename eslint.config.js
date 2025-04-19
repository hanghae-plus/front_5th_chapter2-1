import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      'no-var': 'error',
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      ...pluginReact.configs.recommended.rules,
    },
  },
]);