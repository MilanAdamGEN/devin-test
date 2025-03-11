module.exports = {
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
    jest: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:jest/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    // Add custom rules here
  },
};
