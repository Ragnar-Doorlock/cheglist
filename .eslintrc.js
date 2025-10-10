module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/ban-ts-comment": 0,

    "arrow-parens": 0,
    "arrow-body-style": 0,

    "import/no-extraneous-dependencies" : "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "import/no-named-as-default": "off",
    "import/no-mutable-exports": "off",
    "import/no-cycle": "off",

    "max-classes-per-file": "off",
    "no-useless-constructor": "off",
    "no-undef": "off",
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "no-continue": "off",
    "no-cond-assign": "error",
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "no-implicit-coercion": ["error", {"boolean":  true, "number":  true, "string":  true}],
    "no-return-assign": "error",
    "no-self-compare": "error",
    "no-async-promise-executor": "error",
    "no-restricted-syntax": 0,
    "no-await-in-loop": 0,
    "new-cap": "off",
    "eol-last": 0,
    "implicit-arrow-linebreak": 0,
    "object-curly-spacing": 0,
    "object-curly-newline":0,
    "operator-linebreak": 0,
    "class-methods-use-this": 0,
    "consistent-return": 0,
    "camelcase": 0,
    "curly": ["error", "all"],
    "func-names": 0,
    "linebreak-style": 0,
    "quotes": 0,
    "indent": ["error", 4, { "SwitchCase": 1, "ignoredNodes": ["PropertyDefinition"] }],
    "no-trailing-spaces": 1,

    "prettier/prettier": [
      "error",
      {
        "trailingComma": "all",
        "tabWidth": 4,
        "semi": true,
        "singleQuote": true,
        "bracketSpacing": false,
        "printWidth": 120
      }
    ],
    "require-await": 0,
    "@typescript-eslint/ban-ts-ignore": 0
  }
};
