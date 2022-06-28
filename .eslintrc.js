/* eslint-disable no-undef */
module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint", "simple-import-sort"],
  rules: {
    quotes: ["error", "double"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  ignorePatterns: ["src/**/*.test.ts"],
};
