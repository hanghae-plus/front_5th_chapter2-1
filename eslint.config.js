// eslint.config.js
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      sourceType: 'module',
      globals: globals.browser, // 브라우저 환경 지원 (window, document 등)
      parserOptions: {
        ecmaVersion: 2022, // 최신 JS 지원
      },
    },
    plugins: {
      js,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,

      // 커스텀 룰
      'no-unused-vars': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-undef': 'error',
      // Prettier 포맷 오류를 ESLint 에러로
      'prettier/prettier': 'error',
    },
  },

  // Prettier와 충돌하는 ESLint 룰 제거
  prettierConfig,
]);
