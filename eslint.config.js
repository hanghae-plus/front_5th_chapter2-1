import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }], // console.log에 대한 경고
      "no-unused-vars": "warn" // 선언했지만 사용하지 않은 변수 경고
    }
  },
  pluginJs.configs.recommended,
  eslintPluginPrettier,
  eslintConfigPrettier
];
