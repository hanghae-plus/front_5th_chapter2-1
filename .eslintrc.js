export default {
  rules: {
    "no-var": "error",
    "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    "prefer-const": ["error", { destructuring: "all", ignoreReadBeforeAssign: false }],
  },
};
