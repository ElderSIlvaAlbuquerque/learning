import { describe, expect, it } from 'vitest';
import { ObsidianAdapter } from '../src/obsidian/index.js';
import { NoteIndexer } from '../../core/src/services/note-indexer.js';
import { VectorStore } from '../../core/src/vector/index.js';

describe('obsidian adapter integration', () => {
  it('indexes an obsidian note through the core indexing flow', async () => {
    const adapter = new ObsidianAdapter();
    const indexer = new NoteIndexer();
    const store = new VectorStore();

    const mapped = adapter.mapNote({
      id: 'o6',
      title: 'Obsidian import',
      content: 'A note imported from Obsidian, linked to [[Rust Basics]].',
      path: 'vault/o6.md',
      tags: ['obsidian'],
      updatedAt: '2026-08-01T00:00:00.000Z'
    });

    await indexer.indexNote(mapped, store);

    expect(mapped.id).toBe('o6');
    expect(mapped.source).toBe('obsidian');
    expect(mapped.links).toContain('Rust Basics');
    expect(mapped.path).toBe('vault/o6.md');
  });
});
