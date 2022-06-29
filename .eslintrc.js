/* eslint-disable no-undef */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint", "simple-import-sort", "tailwindcss"],
  rules: {
    quotes: ["error", "double"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-console": "error",
  },
  ignorePatterns: ["src/**/*.test.ts"],
};
