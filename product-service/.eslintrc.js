module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
    project: "./tsconfig.json",
    // use tsconfig relative to eslintrc file for IDE
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-underscore-dangle': 0,
    'function-paren-newline': 1,
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/*.test.{js,ts}',
        '**/*.builder.{js,ts}',
      ],
    }],
    'max-len': ['warn', { code: 120 }],
  },
  settings: {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "src",
          "node_modules"
        ]
      }
    }
  },
  ignorePatterns: [
    ".eslintrc.js",
    "node_modules",
    "prod_node_modules",
    "dist",
    "webpack.config.js",
    "jest.config.js",
  ],
};
