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
      ...js.configs.recommended.rules, // js 플러그인의 추천 룰 적용
      'prettier/prettier': ['error', prettierConfig], // Prettier 포맷 검사
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
]);

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
// ]);