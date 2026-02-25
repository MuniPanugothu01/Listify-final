import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Ignore generated files
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**'],
  },

  // Base JS rules
  js.configs.recommended,

  // ✅ React + JSX + Browser environment
  {
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
    },

    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // React 17+
      'react/react-in-jsx-scope': 'off',
      'no-console': 'error',

      // Formatting enforced
      'prettier/prettier': 'error',
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Disable rules that conflict with Prettier
  prettierConfig,
];
