import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js, pluginPrettier, pluginReact },
    extends: ["js/recommended", "plugin:react/recommended"],
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    name: "disable-eslint-style-rules-in-favor-of-prettier",
    rules: {
      ...configPrettier.rules,
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
