module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    'airbnb-base', 
    "eslint:recommended",
    "node"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "class-methods-use-this": 0,
    "no-underscore-dangle": 0,
    "global-require": 'off',
    "camelcase": 0,
    "quotes": ["error", "single"],
    "no-use-before-define": ["error", { "functions": true, "classes": true, "variables": false }],
    "import/prefer-default-export": 0,
    "no-console": 1,
    "consistent-return": "off",
  }
};