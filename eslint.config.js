import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

export default defineConfig({
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
      plugins: {
        js,
        'react': pluginReact,
        '@typescript-eslint': tseslint,
        'react-hooks': pluginReactHooks,
      },
      extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-max-depth': ['warn', { max: 5 }],
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
});
