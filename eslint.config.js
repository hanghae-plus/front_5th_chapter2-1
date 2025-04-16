
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        plugins: { js, prettier: eslintPluginPrettier },
        extends: ['js/recommended'],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: { globals: globals.browser },
    },
    {
        rules: {
            'no-unused-vars': 'error',
            'no-undef': 'error',
            'no-var': 'error',
            'no-console': 'warn',
            'prefer-const': 'error',

            'prettier/prettier': 'error',
            'react/jsx-uses-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    eslintConfigPrettier,
]);
