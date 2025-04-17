import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    // 적용될 파일 타입 지정 (JavaScript, TypeScript, React 파일)
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],

    // 언어 환경 설정
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    // 사용할 ESLint 플러그인 지정
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },

    // 개별 규칙 설정
    rules: {
      // TypeScript 관련 규칙
      '@typescript-eslint/no-unused-vars': 'warn', // 사용하지 않는 변수 경고
      '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 명시 강제 해제

      // React 관련 규칙
      'react/prop-types': 'off', // PropTypes 검사 비활성화
      'react/react-in-jsx-scope': 'off', // React import 강제 해제
      'react-hooks/rules-of-hooks': 'error', // Hooks 규칙 위반 시 에러
      'react-hooks/exhaustive-deps': 'warn', // Hooks 의존성 배열 누락 경고

      // 일반 규칙
      'no-unused-vars': 'warn', // 기본 미사용 변수 규칙 비활성화 (TypeScript 규칙 사용)
      'no-console': 'warn', // 콘솔 로그 사용 경고
    },

    // 추가 설정
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
