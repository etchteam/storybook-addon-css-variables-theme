module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ["airbnb-typescript", "plugin:storybook/recommended"],
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        "import/no-extraneous-dependencies": ["error", {
          "devDependencies": true
        }],
        "react/jsx-props-no-spreading": "off"
      }
    }
  ]
};