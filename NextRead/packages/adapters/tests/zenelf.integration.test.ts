import { describe, expect, it } from 'vitest';
import { ZenElfAdapter } from '../src/zenelf/index.js';
import { NoteIndexer } from '../../core/src/services/note-indexer.js';
import { VectorStore } from '../../core/src/vector/index.js';

describe('zenelf adapter integration', () => {
  it('indexes a zenelf note through the core indexing flow', async () => {
    const adapter = new ZenElfAdapter();
    const indexer = new NoteIndexer();
    const store = new VectorStore();

    const mapped = adapter.mapNote({
      id: 'z3',
      title: 'ZenElf import',
      content: 'A note from ZenElf',
      tags: ['zenelf'],
      links: [],
      source: 'zenelf',
      updatedAt: '2026-08-01T00:00:00.000Z'
    });

    await indexer.indexNote(mapped, store);

    expect(mapped.id).toBe('z3');
    expect(mapped.source).toBe('zenelf');
  });
});
