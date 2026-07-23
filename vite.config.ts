import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const causalPreviewHarness = 'test/causalShadowPreviewSnapshotsCiHarness.spec.ts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    pool: 'threads',
    // Ordinary unit and contract tests retain the strict ten-second budget.
    testTimeout: 10_000,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit-and-contracts',
          exclude: [causalPreviewHarness],
        },
      },
      {
        extends: true,
        test: {
          name: 'causal-shadow-preview',
          include: [causalPreviewHarness],
          fileParallelism: false,
          // The preview renders two seeds, three views each, and writes review artifacts.
          testTimeout: 30_000,
        },
      },
    ],
  },
})
