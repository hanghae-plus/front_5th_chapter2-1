import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
        },
      ],
      'no-var': 'warn',
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 빈 줄 최대 1개로 제한
      'prefer-template': 'warn', // 문자열 연결은 템플릿 리터럴 사용
      'prefer-arrow-callback': 'warn', // 콜백함수는 화살표 함수 사용
      'no-param-reassign': 'warn', // 매개변수 재할당 금지
      'no-global-assign': 'warn', // 전역 변수 수정 금지
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
]);
