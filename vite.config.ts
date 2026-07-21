import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    pool: 'threads',
    // The W1-06 complete-corpus diagnostic intentionally runs 24+ deterministic cases.
    // Keep a bounded allowance while preserving failure for genuinely stalled tests.
    testTimeout: 10_000,
  },
})
