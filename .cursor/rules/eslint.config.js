import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // JS/TS/React 설정
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      js,
      prettier: pluginPrettier,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // 변수 선언 다음 줄 띄우기
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: 'if' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: 'return' },
        // const 다음에 return 전에 줄바꿈
        { blankLine: 'always', prev: 'const', next: 'return' },
        { blankLine: 'always', prev: '*', next: 'block-like' }, // function, if, for 등
      ],
      // 주석 앞에 공백
      'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }],

      // 여러 줄 공백 금지
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],

      // 마지막 줄 줄바꿈
      'eol-last': ['error', 'always'],

      // prettier 규칙과 충돌 방지
      'prettier/prettier': 'error',
    },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended', // Prettier와 함께 쓰기
      prettier,
    ],
  },

  // TypeScript 설정
  tseslint.configs.recommended,

  // React 설정
  pluginReact.configs.flat.recommended,
]);
