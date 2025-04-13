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
      //'no-var': 'error', // var 사용 금지
    },
  },
]);

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
// ]);