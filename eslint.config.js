import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended, // eslint 기본 recommended 설정
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-var": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "prefer-const": ["error", { destructuring: "all" }],
      "no-const-assign": "error",
      "no-redeclare": "error",
      "no-use-before-define": "error",
    },
  },
  {
    ignores: ["src/main.original.js"],
  },
];
