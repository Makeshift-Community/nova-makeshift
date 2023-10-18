/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  root: true,
};
