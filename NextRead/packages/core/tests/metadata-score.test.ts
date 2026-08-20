import { describe, expect, it } from 'vitest';
import { sharedTags, tagOverlapScore } from '../src/ranking/metadata-score.js';

describe('metadata-score', () => {
  it('returns the tags present in both lists, case-insensitively', () => {
    expect(sharedTags(['Rust', 'systems'], ['rust', 'graphql'])).toEqual(['Rust']);
  });

  it('scores full overlap as 1', () => {
    expect(tagOverlapScore(['rust', 'systems'], ['rust', 'systems'])).toBe(1);
  });

  it('scores no overlap as 0', () => {
    expect(tagOverlapScore(['rust'], ['graphql'])).toBe(0);
  });

  it('scores an empty tag list as 0', () => {
    expect(tagOverlapScore([], ['rust'])).toBe(0);
    expect(tagOverlapScore(['rust'], [])).toBe(0);
  });
});
