import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["node_modules", "dist", "README.md", "package.json", "pnpm-lock.yaml", ".github/"],
    plugins: { prettier: eslintPluginPrettier },
    extends: ["js/recommended"],
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
]);
