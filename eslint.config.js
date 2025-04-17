import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";
import plugImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, import: plugImport, react: pluginReact },
    extends: ["js/recommended", "plugin:react/recommended", prettier],
    rules: {
      curly: ["error", "all"],
      "no-console": "warn",
      "no-const-assign": "warn",
      "import/first": "error",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
]);
