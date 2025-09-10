import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup/setupTests.ts',
    exclude: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'src/tests/e2e/**',
      'tests/e2e/**',
    ],
    coverage: {
      provider: 'v8',                
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      thresholds: {                         
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
      exclude: [
        'src/main.tsx',
        'src/App.tsx',
        // top-level config
        'vite.config.*',
        'vitest.config.*',
        'playwright.config.*',
        'eslint.config.*',
        'tailwind.config.*',
        'postcss.config.*',
        'tsconfig.*',
        // env & setup
        'src/**/*.d.ts',
        '**/env.d.ts',
        'tests/setup/**',
        // misc build/infra
        'scripts/**',
        'coverage/**',
        'node_modules/**',
        'node_modules/**',
        'dist/**',
        'src/tests/e2e/**',
      ],
    },
  },
});
