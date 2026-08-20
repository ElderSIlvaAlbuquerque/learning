import { describe, expect, it } from 'vitest';
import type { Note } from '@nextread/shared';
import { SimilarNotesService } from '../src/services/similar-notes.js';
import { BookRecommendationsService } from '../src/services/book-recommendations.js';

const note: Note = {
  id: 'n1',
  title: 'GraphQL basics',
  content: 'GraphQL queries and mutations for APIs',
  tags: ['graphql', 'api'],
  links: [],
  source: 'other',
  updatedAt: '2026-08-01T00:00:00.000Z'
};

const noteCandidates = [
  {
    id: 'n2',
    title: 'GraphQL advanced',
    content: 'GraphQL schema design and resolvers',
    tags: ['graphql'],
    links: [],
    source: 'other',
    updatedAt: '2026-08-01T00:00:00.000Z'
  },
  {
    id: 'n3',
    title: 'Rust basics',
    content: 'Ownership and borrowing in Rust',
    tags: ['rust'],
    links: [],
    source: 'other',
    updatedAt: '2026-08-01T00:00:00.000Z'
  }
];

const books = [
  {
    id: 'b1',
    title: 'Learning GraphQL',
    authors: ['A. Author'],
    description: 'A book about GraphQL for APIs',
    categories: ['graphql'],
    rating: 4.5
  },
  {
    id: 'b2',
    title: 'Rust in Action',
    authors: ['B. Author'],
    description: 'Practical Rust for systems programming',
    categories: ['rust'],
    rating: 4.2
  }
];

describe('grouped recommendations', () => {
  it('groups similar notes into topic clusters', async () => {
    const service = new SimilarNotesService();
    const results = await service.findSimilar(note, noteCandidates);
    const clusters = service.clusters(results);

    const graphqlCluster = clusters.find((cluster) => cluster.name === 'graphql');
    expect(graphqlCluster?.items).toContain('n2');
  });

  it('groups book recommendations into topic clusters', async () => {
    const service = new BookRecommendationsService();
    const results = await service.recommend(note, books);
    const clusters = service.clusters(results);

    const graphqlCluster = clusters.find((cluster) => cluster.name === 'graphql');
    expect(graphqlCluster?.items).toContain('b1');
  });

  it('produces deterministic scores and clusters across repeated runs', async () => {
    const service = new SimilarNotesService();
    const first = await service.findSimilar(note, noteCandidates);
    const second = await service.findSimilar(note, noteCandidates);

    expect(first).toEqual(second);
  });
});
