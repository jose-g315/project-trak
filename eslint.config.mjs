// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      '*.log',
      '.DS_Store',
      'Thumbs.db',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      '.env',
      '.env.*',
    ],
  },
  {
    files: ['src/**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules, // brings in ESLint recommended rules
      ...eslintConfigPrettier.rules, // disables conflicting rules
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'prettier/prettier': 'warn', // run Prettier as an ESLint rule
    },
  },
]);
