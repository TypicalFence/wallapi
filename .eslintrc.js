module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 11
  },
    rules: {
        indent: [2, 4, { SwitchCase: 1 }],
        quotes: [2, "double"],
        semi: ["error", "always"],
        "space-before-function-paren": ["error", "never"],
  }
}
