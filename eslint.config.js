import js              from '@eslint/js'
import globals         from 'globals'
import reactPlugin     from 'eslint-plugin-react'
import reactHooks      from 'eslint-plugin-react-hooks'
import reactRefresh    from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  js.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion:    'latest',
        ecmaFeatures:   { jsx: true },
        sourceType:     'module',
      },
    },
    rules: {
      'react/jsx-uses-vars':  'error',
      'react/jsx-uses-react': 'off',
      'no-unused-vars': ['error', {
        vars:                      'all',
        varsIgnorePattern:         '^[A-Z_]',
        args:                      'after-used',
        argsIgnorePattern:         '^[A-Z_]|^_',
        caughtErrors:              'all',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings:        true,
      }],
      'no-dupe-keys':  'error',
      'no-console':    ['warn', { allow: ['warn', 'error'] }],
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  {
    files: ['api/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        process: 'readonly',
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
    },
  },
])
