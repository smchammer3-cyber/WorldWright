import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['scripts/run-generate-diagnostics.runner.ts'],
    watch: false,
  },
});
