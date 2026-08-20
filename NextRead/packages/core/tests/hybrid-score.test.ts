import { describe, expect, it } from 'vitest';
import { computeHybridScore } from '../src/ranking/hybrid-score.js';

describe('computeHybridScore', () => {
  it('blends similarity and metadata using the default weights', () => {
    expect(computeHybridScore(1, 0)).toBeCloseTo(0.7);
    expect(computeHybridScore(0, 1)).toBeCloseTo(0.3);
    expect(computeHybridScore(1, 1)).toBeCloseTo(1);
  });

  it('accepts custom weights', () => {
    expect(computeHybridScore(1, 0, { similarity: 0.5, metadata: 0.5 })).toBeCloseTo(0.5);
  });

  it('is deterministic across repeated calls', () => {
    const first = computeHybridScore(0.42, 0.17);
    const second = computeHybridScore(0.42, 0.17);
    expect(first).toBe(second);
  });
});
