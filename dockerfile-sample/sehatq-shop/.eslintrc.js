module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'react/prop-types': 'off',
    'import/prefer-default-export': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/require-default-props': 'off',
  },
};
