import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
            ['@components', './src/components'],
            ['@utils', './src/utils'],
            ['@pages', './src/pages'],
            ['@assets', './src/assets'],
          ],
          extensions: ['.js', '.ts', '.jsx', '.tsx'], // 확장자도 인식시킴
        },
      },
    },
    rules: {
      'prettier/prettier': 'warn',
      'import/no-unresolved': 'warn',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Node built-ins
            'external', // 외부 라이브러리
            'internal', // alias 경로 등
            ['parent', 'sibling', 'index'], // 상대 경로
            'object', // import * as X from '...'
            'type', // 타입 전용 import
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always', // 그룹 사이에 줄바꿈 추가
          alphabetize: {
            order: 'asc', // 알파벳순 정렬
            caseInsensitive: true,
          },
        },
      ],
      semi: ['warn', 'always'],
    },
  },
  prettier,
];
