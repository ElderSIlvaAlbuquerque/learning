import { describe, expect, it } from 'vitest';
import { buildExplanation } from '../src/ranking/explanation.js';

describe('buildExplanation', () => {
  it('mentions shared topics when tags overlap', () => {
    expect(buildExplanation(['rust', 'systems'], 0.5)).toBe('Shares topics: rust, systems');
  });

  it('falls back to the similarity score when nothing is shared', () => {
    expect(buildExplanation([], 0.5)).toBe('Similar content (score 0.50)');
  });
});
