import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  { ignores: ["**/__test__/**", "**/*.test.js", "**/tests/**"] },
  {
    files: ["src/basic/**/*.js", "src/advanced/**/*.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    ...eslintConfigPrettier,
  },
]);