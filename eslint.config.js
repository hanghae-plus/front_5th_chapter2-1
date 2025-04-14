import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from './.prettierrc' assert { type: 'json' };

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      js,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      'prettier/prettier': ['error', prettierConfig],
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-var': 'error', // var 사용 금지
    },
  },
]);

// import globals from "globals";
// import pluginJs from "@eslint/js";
// import eslintConfigPrettier from "eslint-config-prettier";
// import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
//   pluginJs.configs.recommended,
//   eslintPluginPrettier,
//   eslintConfigPrettier,
//   rules: {
//     'no-var': 'error',
//   }
// ];



// https://sung-98.tistory.com/114
// https://velog.io/@nuyhes/Eslint-study-eslint.config.js-%EC%84%B8%ED%8C%85
// https://velog.io/@iberis/%EC%82%AC%EB%82%B4-ESLint-Prettier-%EA%B3%B5%EC%9C%A0-%EC%84%A4%EC%A0%95-%ED%8C%A8%ED%82%A4%EC%A7%80-%EB%A7%8C%EB%93%A4%EA%B8%B0feat.-pnpm-eslint-9