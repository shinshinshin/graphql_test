module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  globals: {
    fetch: false,
  },
  extends: ['plugin:prettier/recommended'],
  plugins: [],
  // ここにカスタムルールを追加します。
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'comma-dangle': ['error', 'never'],
  },
}
