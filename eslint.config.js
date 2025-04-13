import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    ignorePatterns: ["package.json", "pnpm-lock.yaml"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "error",
      "no-var": "error",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "error",
      "no-var": "error",
    },
  },
  eslintPluginPrettier,
  eslintConfigPrettier,
]);
