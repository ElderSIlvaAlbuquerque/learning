import { describe, expect, it } from 'vitest';
import { NoteSchema, BookSchema } from '../src/contracts.js';

describe('shared contracts', () => {
  it('validates a note payload', () => {
    const note = NoteSchema.parse({
      id: 'n1',
      title: 'Test Note',
      content: 'Some content',
      tags: ['tag-a'],
      links: ['n2'],
      source: 'zenelf',
      updatedAt: '2026-08-01T00:00:00.000Z'
    });

    expect(note.tags).toEqual(['tag-a']);
  });

  it('validates a book payload', () => {
    const book = BookSchema.parse({
      id: 'b1',
      title: 'The Book',
      authors: ['Jane Doe'],
      description: 'A useful book',
      categories: ['tech'],
      rating: 4.5
    });

    expect(book.title).toBe('The Book');
  });
});
