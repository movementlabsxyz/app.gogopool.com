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
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-console": "error",
    "tailwindcss/no-custom-classname": "off",
    "@typescript-eslint/no-empty-interface": "off",
  },
  ignorePatterns: ["src/**/*.test.ts"],
};
