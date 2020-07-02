module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'no-console': 'off',
    'no-unused-vars': ['warn', {vars: 'local'}],
    quotes: ['error', 'single', { avoidEscape: false, allowTemplateLiterals: true }],
    'comma-dangle': ['error', 'always-multiline']
  }
};
