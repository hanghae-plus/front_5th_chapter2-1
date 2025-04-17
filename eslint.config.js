import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import plugImport from 'eslint-plugin-import';
import globals from 'globals';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        plugins: { js, import: plugImport },
        extends: [
            'js/recommended',
            prettier, // Prettier 설정 적용
        ],
        rules: {
            curly: 'error', // 중괄호를 항상 사용하도록 강제
            'prefer-const': 'error', // const 사용하도록 강제
            'no-const-assign': 'warn', // const변수 재할당 금지
            'no-var': 'error', // var 사용하지 못하도록 강제
            'no-nested-ternary': 'warn', // 이중삼항연산자 사용하지 못하도록 강제
            'import/first': 'error', // import가 중간에 있으면 위로 올려줌
            'import/order': [
                'warn',
                {
                    groups: [
                        'builtin', // Node 내장 모듈 (fs, path 등)
                        'external', // 외부 모듈 (react 등)
                        'internal', // 내부 경로 import (예: @/utils)
                        ['parent', 'sibling', 'index'], // 상대경로
                        'object', // object-style imports (ex: import * as foo from...)
                        'type', // 타입 import (TypeScript용)
                    ],
                    'newlines-between': 'always', // 그룹 간 빈 줄 삽입함
                    alphabetize: {
                        order: 'asc', // 알파벳 오름차순 정렬
                        caseInsensitive: true, // 대소문자 구분 없이 정렬
                    },
                },
            ],
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        languageOptions: { globals: globals.browser },
    },
    // prettier가 여기 있으면 린트 설정이 덮어씌워짐
]);
