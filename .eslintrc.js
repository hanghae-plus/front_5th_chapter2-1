module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-undef': 'error',
    semi: ['error', 'always'],
    quotes: ['error', 'double'],
    indent: ['error', 2],
    'template-curly-spacing': 'off',
    indent: 'off',
    'no-irregular-whitespace': 'off',
  },
};
