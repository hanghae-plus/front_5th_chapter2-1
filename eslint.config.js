import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-var": "error",
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-var": "error",
    },
  },
]);
