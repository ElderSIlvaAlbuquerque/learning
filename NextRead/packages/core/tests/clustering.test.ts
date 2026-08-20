import { describe, expect, it } from 'vitest';
import { assignCluster, groupByCluster } from '../src/ranking/clustering.js';

describe('assignCluster', () => {
  it('uses the first tag, lowercased, as the cluster name', () => {
    expect(assignCluster(['Rust', 'systems'])).toBe('rust');
  });

  it('falls back to "general" when no tags are present', () => {
    expect(assignCluster([])).toBe('general');
  });
});

describe('groupByCluster', () => {
  it('groups items by cluster name in a deterministic, sorted order', () => {
    const clusters = groupByCluster([
      { id: 'a', cluster: 'rust' },
      { id: 'b', cluster: 'graphql' },
      { id: 'c', cluster: 'rust' }
    ]);

    expect(clusters).toEqual([
      { id: 'cluster-graphql', name: 'graphql', items: ['b'] },
      { id: 'cluster-rust', name: 'rust', items: ['a', 'c'] }
    ]);
  });
});
