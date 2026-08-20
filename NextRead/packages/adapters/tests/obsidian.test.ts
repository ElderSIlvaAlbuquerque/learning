import { describe, expect, it } from 'vitest';
import { ObsidianAdapter } from '../src/obsidian/index.js';

describe('obsidian adapter', () => {
  it('maps obsidian payloads to the shared note contract', () => {
    const adapter = new ObsidianAdapter();
    const note = adapter.mapNote({
      id: 'o1',
      title: 'Obsidian note',
      content: 'Links to [[Other Note]] and is tagged #systems inline.',
      path: 'vault/o1.md',
      tags: ['obsidian'],
      links: [],
      updatedAt: '2026-08-01T00:00:00.000Z'
    });

    expect(note.id).toBe('o1');
    expect(note.source).toBe('obsidian');
    expect(note.tags).toContain('obsidian');
    expect(note.tags).toContain('systems');
    expect(note.links).toContain('Other Note');
    expect(note.path).toBe('vault/o1.md');
  });

  it('merges frontmatter tags with explicit and inline tags', () => {
    const adapter = new ObsidianAdapter();
    const note = adapter.mapNote({
      id: 'o2',
      title: 'Frontmatter tags',
      content: 'Body content without inline tags.',
      frontmatter: { tags: ['rust', 'systems'] }
    });

    expect(note.tags).toEqual(expect.arrayContaining(['rust', 'systems']));
  });

  it('leaves path undefined when the payload does not provide one', () => {
    const adapter = new ObsidianAdapter();
    const note = adapter.mapNote({ id: 'o7', title: 'No path', content: 'content' });

    expect(note.path).toBeUndefined();
  });

  it('throws for missing title', () => {
    const adapter = new ObsidianAdapter();
    expect(() => adapter.mapNote({ id: 'o3', title: '', content: 'content' })).toThrow(/title/);
  });

  it('throws for missing content', () => {
    const adapter = new ObsidianAdapter();
    expect(() => adapter.mapNote({ id: 'o4', title: 'No content' })).toThrow(/content/);
  });

  it('throws for malformed frontmatter', () => {
    const adapter = new ObsidianAdapter();
    expect(() =>
      adapter.mapNote({
        id: 'o5',
        title: 'Bad frontmatter',
        content: 'content',
        // @ts-expect-error intentionally malformed for the error-path test
        frontmatter: 'not-an-object'
      })
    ).toThrow(/frontmatter/);
  });

  it('throws for duplicate note ids in a batch', () => {
    const adapter = new ObsidianAdapter();
    expect(() =>
      adapter.listNotes([
        { id: 'dup', title: 'First', content: 'a' },
        { id: 'dup', title: 'Second', content: 'b' }
      ])
    ).toThrow(/Duplicate/);
  });
});
