import { describe, expect, it } from 'vitest';
import { ZenElfAdapter } from '../src/zenelf/index.js';

describe('zenelf adapter', () => {
  it('maps zenelf payloads to the shared note contract', () => {
    const adapter = new ZenElfAdapter();
    const note = adapter.mapNote({
      id: 'z1',
      title: 'ZenElf note',
      content: 'A note from ZenElf',
      tags: ['zenelf'],
      links: ['z2'],
      source: 'zenelf',
      updatedAt: '2026-08-01T00:00:00.000Z'
    });

    expect(note.id).toBe('z1');
    expect(note.source).toBe('zenelf');
    expect(note.tags).toContain('zenelf');
  });
});
