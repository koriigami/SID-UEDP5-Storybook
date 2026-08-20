/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: 2022, sourceType: "module", ecmaFeatures: { jsx: true } },
  settings: { react: { version: "detect" } },
  env: { browser: true, es2022: true, node: true },
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y", "storybook"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:storybook/recommended",
  ],
  ignorePatterns: [
    "storybook-static",
    "node_modules",
    "src/styles/tokens.*.css",
    "src/tokens/generated.ts",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
