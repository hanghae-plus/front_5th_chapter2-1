module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended', // Prettier와 연동
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        // 필요에 따라 룰 추가
    },
};

// extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:prettier/recommended',
// ],
//     parser: '@typescript-eslint/parser',
//         plugins: ['react', '@typescript-eslint'],
