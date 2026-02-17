import eslint from '@eslint/js'
import react from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
  //{ files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'], languageOptions: { globals: globals.browser } },
  eslint.configs.recommended, // javascript recommended - why not
  tseslint.configs.recommendedTypeChecked, // instead of recommended - we are going to go hard and use recommended type checked
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked, // one more set of "stylistic" rules, also type checked
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'], // this one to get rid of not needed `import React from 'react'` - if tsconfig.json has jsx-runtime - this import is not needed
  { languageOptions: { parserOptions: { projectService: true } } }, // this one is needed for type checked rules above
  { settings: { react: { version: 'detect' } } }, // fixes: Warning: React version not specified in eslint-plugin-react settings. See https://github.com/jsx-eslint/eslint-plugin-react#configuration
  // disable few rules
  {
    rules: {
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
])

// eslint, @eslint/js, globals, typescript-eslint, eslint-plugin-react
