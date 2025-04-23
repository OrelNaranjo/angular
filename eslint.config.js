import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/template-parser';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores([
    '**/node_modules/',
    '**/dist/',
    '**/.angular/',
    '**/coverage/',
    '**/.vscode/'
  ]),

  {
    name: 'angular-typescript',
    files: ['src/**/*.ts'],
    plugins: {
      '@typescript-eslint': typescript,
      'prettier': prettier
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        it: 'readonly',
        expect: 'readonly'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      'no-undef': 'error',
      'no-unused-vars': 'warn',
      'no-useless-escape': 'warn',
      'no-cond-assign': ['error', 'except-parens']
    }
  },

  {
    name: 'angular-template',
    files: ['src/**/*.html'],
    plugins: {
      '@angular-eslint': angular
    },
    languageOptions: {
      parser: angularTemplate
    },
    rules: {}
  }
]);