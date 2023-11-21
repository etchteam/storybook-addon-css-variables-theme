module.exports = {
  extends: ['@etchteam'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
  settings: {
    'import/ignore': ['query-string'],
  },
};
