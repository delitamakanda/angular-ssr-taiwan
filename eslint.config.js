// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
  {
    ignores: ['dist/', '.angular/', 'node_modules/', 'mock-wp-api/', 'coverage/'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Conventions du dépôt (CLAUDE.md).
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-inject': 'error',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/prefer-signals': 'error',
      '@angular-eslint/prefer-output-emitter-ref': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      // Le projet utilise l'objet `host` du décorateur (règle de recommended désactivée).
      '@angular-eslint/no-host-metadata-property': 'off',
      // `LazyImageDirective` (`img[lazy]`) : le sélecteur est aussi le nom de l'input
      // (`[lazy]="..."`). Le renommer en `appLazy` change l'API de la directive et tous ses
      // usages dans les templates : en `warn` en attendant un ticket de suivi.
      '@angular-eslint/directive-selector': [
        'warn',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'error',
      // Les <img> existants utilisent `LazyImageDirective` (src calculé, sans width/height) :
      // les migrer vers NgOptimizedImage change le rendu. `warn` en attendant un ticket de suivi.
      '@angular-eslint/template/prefer-ngsrc': 'warn',
    },
  },
]);
