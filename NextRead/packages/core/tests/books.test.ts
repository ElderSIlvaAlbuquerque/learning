import { describe, expect, it } from 'vitest';
import type { Note } from '@nextread/shared';
import { BookRecommendationsService } from '../src/services/book-recommendations.js';

describe('book recommendations service', () => {
  it('returns ranked books with metadata', async () => {
    const service = new BookRecommendationsService();
    const note: Note = {
      id: 'n1',
      title: 'GraphQL basics',
      content: 'Query language for APIs',
      tags: ['graphql'],
      links: [],
      source: 'other',
      updatedAt: '2026-08-01T00:00:00.000Z'
    };

    const books = [
      {
        id: 'b1',
        title: 'Learning GraphQL',
        authors: ['A. Author'],
        description: 'A book about GraphQL query language for APIs',
        categories: ['tech'],
        rating: 4.5
      }
    ];

    const results = await service.recommend(note, books);

    expect(results[0]?.title).toBe('Learning GraphQL');
    expect(results[0]?.authors).toContain('A. Author');
  });
});
