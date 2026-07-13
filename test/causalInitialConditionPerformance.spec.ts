import { describe, expect, it } from 'vitest';
import {
  createGenerationRequest,
  INITIAL_CONDITION_PERFORMANCE_BUDGET_V1,
  measureInitialConditionBundle,
  resolvePlanetInitialConditionBundle,
} from '../src/core/causalGeology';

describe('W1-02A frozen performance and resource budget', () => {
  it('keeps deterministic resolution within bounded candidates, retries, size, time, and heap growth', () => {
    const startHeap = process.memoryUsage().heapUsed;
    const start = performance.now();
    let lastMetrics: ReturnType<typeof measureInitialConditionBundle> | undefined;
    const count = 16;
    for (let index = 0; index < count; index += 1) {
      const request = createGenerationRequest(`performance-${index}`, []);
      const bundle = resolvePlanetInitialConditionBundle(request, { authorityMode: 'CAUSAL_SHADOW' });
      lastMetrics = measureInitialConditionBundle(bundle);
      expect(bundle.retrySummary.retryCount).toBeLessThanOrEqual(INITIAL_CONDITION_PERFORMANCE_BUDGET_V1.maxRetries);
      expect(bundle.retrySummary.backtrackCount).toBeLessThanOrEqual(INITIAL_CONDITION_PERFORMANCE_BUDGET_V1.maxBacktracks);
    }
    const averageMilliseconds = (performance.now() - start) / count;
    const heapDelta = Math.max(0, process.memoryUsage().heapUsed - startHeap);
    expect(lastMetrics).toBeDefined();
    expect(lastMetrics!.candidateFamiliesExamined).toBeLessThanOrEqual(INITIAL_CONDITION_PERFORMANCE_BUDGET_V1.maxCandidateFamilies);
    expect(lastMetrics!.serializedArtifactBytes).toBeLessThanOrEqual(INITIAL_CONDITION_PERFORMANCE_BUDGET_V1.maxSerializedArtifactBytes);
    expect(averageMilliseconds).toBeLessThan(INITIAL_CONDITION_PERFORMANCE_BUDGET_V1.maxWallClockMilliseconds);
    expect(heapDelta).toBeLessThan(INITIAL_CONDITION_PERFORMANCE_BUDGET_V1.maxHeapDeltaBytes);
  });
});
