// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 100,
  trailingComma: "all", // 기본값
  tabWidth: 2, // 기본값
  semi: true, // 일부 코드에서 라인의 시작 부분에 세미 콜론 추가
  singleQuote: false,
  bracketSpacing: true, // 기본값. true인 경우 {foo:bar}는 { foo: bar }로 변환됨
  arrowParens: "always", // 기본값
  useTabs: false, // 기본값
};

export default config;
