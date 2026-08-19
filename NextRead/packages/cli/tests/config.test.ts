import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { resolveBooksFile, resolveNotesDir } from '../src/config.js';

describe('resolveNotesDir', () => {
  let dir: string;

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true });
  });

  it('prefers an explicit cli dir over the config file', () => {
    dir = mkdtempSync(join(tmpdir(), 'nextread-config-'));
    writeFileSync(join(dir, 'nextread.config.json'), JSON.stringify({ notesDir: 'from-config' }));

    expect(resolveNotesDir('from-cli', dir)).toBe('from-cli');
  });

  it('falls back to the config file notesDir when no cli dir is given', () => {
    dir = mkdtempSync(join(tmpdir(), 'nextread-config-'));
    writeFileSync(join(dir, 'nextread.config.json'), JSON.stringify({ notesDir: 'from-config' }));

    expect(resolveNotesDir(undefined, dir)).toBe('from-config');
  });

  it('defaults to samples/notes when there is no cli dir or config file', () => {
    dir = mkdtempSync(join(tmpdir(), 'nextread-config-'));

    expect(resolveNotesDir(undefined, dir)).toBe('samples/notes');
  });
});

describe('resolveBooksFile', () => {
  let dir: string;

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true });
  });

  it('prefers an explicit cli path over the config file', () => {
    dir = mkdtempSync(join(tmpdir(), 'nextread-config-'));
    writeFileSync(join(dir, 'nextread.config.json'), JSON.stringify({ booksFile: 'from-config.json' }));

    expect(resolveBooksFile('from-cli.json', dir)).toBe('from-cli.json');
  });

  it('falls back to the config file booksFile when no cli path is given', () => {
    dir = mkdtempSync(join(tmpdir(), 'nextread-config-'));
    writeFileSync(join(dir, 'nextread.config.json'), JSON.stringify({ booksFile: 'from-config.json' }));

    expect(resolveBooksFile(undefined, dir)).toBe('from-config.json');
  });

  it('defaults to samples/books/books.json when there is no cli path or config file', () => {
    dir = mkdtempSync(join(tmpdir(), 'nextread-config-'));

    expect(resolveBooksFile(undefined, dir)).toBe('samples/books/books.json');
  });
});
