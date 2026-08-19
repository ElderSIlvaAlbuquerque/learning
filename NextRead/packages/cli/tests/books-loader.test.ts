import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { loadBooksFromFile } from '../src/books-loader.js';

describe('loadBooksFromFile', () => {
  let dir: string;

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true });
  });

  it('parses and validates a books JSON file', () => {
    dir = mkdtempSync(join(tmpdir(), 'nextread-books-'));
    const filePath = join(dir, 'books.json');
    writeFileSync(
      filePath,
      JSON.stringify([
        {
          id: 'book-a',
          title: 'Book A',
          authors: ['Author A'],
          description: 'A book about testing',
          categories: ['tech'],
          rating: 4.1
        }
      ])
    );

    const books = loadBooksFromFile(filePath);

    expect(books).toEqual([
      {
        id: 'book-a',
        title: 'Book A',
        authors: ['Author A'],
        description: 'A book about testing',
        categories: ['tech'],
        rating: 4.1
      }
    ]);
  });

  it('throws when an entry is missing a required title', () => {
    dir = mkdtempSync(join(tmpdir(), 'nextread-books-'));
    const filePath = join(dir, 'books.json');
    writeFileSync(filePath, JSON.stringify([{ id: 'book-a' }]));

    expect(() => loadBooksFromFile(filePath)).toThrow(/does not match the expected book contract/);
  });

  it('throws a clear error when the file does not exist', () => {
    expect(() => loadBooksFromFile(join(tmpdir(), 'nextread-books-missing.json'))).toThrow(
      /Could not read books file/
    );
  });
});
