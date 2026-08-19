import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { loadNotesFromDir } from '../src/notes-loader.js';

describe('loadNotesFromDir', () => {
  let dir: string;

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true });
  });

  it('parses frontmatter and content from markdown notes', () => {
    dir = mkdtempSync(join(tmpdir(), 'nextread-notes-'));
    writeFileSync(
      join(dir, 'a.md'),
      [
        '---',
        'id: note-a',
        'title: Note A',
        'tags: [x, y]',
        'links: [note-b]',
        'source: obsidian',
        'updatedAt: 2026-01-01T00:00:00.000Z',
        '---',
        '',
        'Body text'
      ].join('\n')
    );

    const notes = loadNotesFromDir(dir);

    expect(notes).toEqual([
      {
        id: 'note-a',
        title: 'Note A',
        content: 'Body text',
        tags: ['x', 'y'],
        links: ['note-b'],
        source: 'obsidian',
        updatedAt: '2026-01-01T00:00:00.000Z'
      }
    ]);
  });

  it('throws when a note is missing a required id', () => {
    dir = mkdtempSync(join(tmpdir(), 'nextread-notes-'));
    writeFileSync(join(dir, 'bad.md'), ['---', 'title: No Id', '---', 'Body'].join('\n'));

    expect(() => loadNotesFromDir(dir)).toThrow(/missing a required "id"/);
  });

  it('throws when the directory has no markdown notes', () => {
    dir = mkdtempSync(join(tmpdir(), 'nextread-notes-'));

    expect(() => loadNotesFromDir(dir)).toThrow(/No Markdown notes found/);
  });

  it('throws a clear error when the directory does not exist', () => {
    expect(() => loadNotesFromDir(join(tmpdir(), 'nextread-notes-missing-dir'))).toThrow(
      /Could not read notes directory/
    );
  });
});
