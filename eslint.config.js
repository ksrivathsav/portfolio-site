import js              from '@eslint/js'
import globals         from 'globals'
import reactPlugin     from 'eslint-plugin-react'
import reactHooks      from 'eslint-plugin-react-hooks'
import reactRefresh    from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  /*
   * ── Base recommended rules (each spread individually to avoid plugin redefinition)
   *    reactHooks and reactRefresh define their own plugins internally,
   *    so we must NOT re-define them in a plugins: {} key in the same config layer.
   */
  js.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,

  /*
   * ── Project-specific overrides for all source files
   *    We add eslint-plugin-react here (separate layer) to get jsx-uses-vars,
   *    which tells no-unused-vars that <Icon /> and <motion.div> count as "used".
   */
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,   // only 'react' — hooks & refresh are already in layers above
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
      /*
       * JSX variable tracking:
       *   react/jsx-uses-vars  — marks <Icon />, <motion.div /> etc. as variable references
       *                          so no-unused-vars doesn't false-positive on them.
       *   react/jsx-uses-react — not needed with the new automatic JSX transform.
       */
      'react/jsx-uses-vars':  'error',
      'react/jsx-uses-react': 'off',

      /*
       * Unused variable detection:
       *   varsIgnorePattern  — allow unused UPPER_CASE / _prefixed top-level vars
       *   argsIgnorePattern  — allow unused uppercase destructured params ({ Icon, href })
       *   caughtErrors       — flag unused catch-block vars (but allow _prefixed ones)
       *   ignoreRestSiblings — allow { used, ...rest } where rest is ignored
       */
      'no-unused-vars': ['error', {
        vars:                      'all',
        varsIgnorePattern:         '^[A-Z_]',
        args:                      'after-used',
        argsIgnorePattern:         '^[A-Z_]|^_',
        caughtErrors:              'all',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings:        true,
      }],

      /* Catch duplicate object keys (e.g. the paddingTop collision we just fixed) */
      'no-dupe-keys':  'error',

      /* Allow console.warn/error in API files; otherwise warn */
      'no-console':    ['warn', { allow: ['warn', 'error'] }],
    },

    settings: {
      react: { version: 'detect' },
    },
  },

  /*
   * ── API / serverless functions run in Node.js, not the browser.
   *    Override globals so process, require, etc. are recognized.
   */
  {
    files: ['api/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        process: 'readonly',
      },
    },
    rules: {
      /* API files legitimately use console.error for server-side logging */
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
    },
  },
])
