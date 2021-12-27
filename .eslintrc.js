module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'jsx-a11y',
    'import',
    'prettier',
    '@typescript-eslint',
    'quick-prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/camelcase': 'off',
    'quick-prettier/prettier': 1,
    'import/no-unresolved': 0,
    'import/order': 'warn',
    '@typescript-eslint/interface-name-prefix': 0,
    'import/no-named-as-default-member': 0,
    'no-prototype-builtins': 0,
    'import/no-named-as-default': 0,
    'import/no-duplicates': 0,
    'no-case-declarations': 0,
    'jsx-a11y/no-autofocus': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react/react-in-jsx-scope': 'off', // React is always in scope with Blitz
    'jsx-a11y/anchor-is-valid': 'off', //Doesn't play well with Blitz/Next <Link> usage
    'jsx-a11y/tabindex-no-positive': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-trailing-spaces': 'error',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  settings: {
    'import/extensions': ['.ts', '.tsx'],
  },
  ignorePatterns: ['.next/**/*', '.blitz/**/*', 'scripts/*'],
  env: {
    jest: true,
    browser: true,
    amd: true,
    node: true,
  },
};
