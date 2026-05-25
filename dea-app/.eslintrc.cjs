module.exports = {
  root: true,
  extends: ['expo', 'eslint:recommended'],
  ignorePatterns: ['node_modules/', '.expo/', 'dist/'],
  globals: {
    Blob: 'readonly',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.{js,jsx,ts,tsx}', '**/*.{test,spec}.{js,jsx,ts,tsx}'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
