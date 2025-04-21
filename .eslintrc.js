module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-var': 'error',
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
};

// module.exports = {    // v8 eslint. v8 & v9는 구조자체가 완전히 다르므로 호환하는 플러그인도 각각의 버전에 맞춰서 변경해야 한다.
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: ['eslint:recommended', 'plugin:prettier/recommended'],
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//   },
//   rules: {
//     'prettier/prettier': 'error',
//     'no-var': 'error',
//     'no-unused-vars': 'warn',
//   },
// };

// `__esModule` 오류는 일반적으로 CommonJS와 ES 모듈 시스템이 섞였을 때 발생합니다.