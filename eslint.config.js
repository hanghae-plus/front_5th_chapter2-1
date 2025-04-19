import eslint from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettier from "eslint-config-prettier";

export default [
  eslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    globals: {
      document: "readonly",
      window: "readonly"
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "warn",
      "no-debugger": "warn",
      "no-var": "error",
      "no-undef": "error",
      "prefer-spread": "error",
      "prefer-const": "error"
    }
  },
  {
    files: ["**/*.test.js", "**/*.test.ts", "**/*.spec.js", "**/*.spec.ts"],
    rules: {
      "no-console": "off"
    }
  },
  prettier // ESLint와 Prettier 충돌 방지 (항상 마지막에 위치)
];
