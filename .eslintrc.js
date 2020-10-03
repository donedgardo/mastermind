module.exports = {
  env: {
    jest: true,
    browser: true,
  },
  extends: ['prettier', 'prettier/@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
};
