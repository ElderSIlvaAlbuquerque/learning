import { describe, expect, it } from 'vitest';
import { NoteIndexer, NextStepService, SimilarNotesService, VectorStore } from '../src/index.js';

describe('next-step integration', () => {
  it('uses indexed notes to produce a recommendation', async () => {
    const store = new VectorStore();
    const indexer = new NoteIndexer();
    const note = {
      id: 'n1',
      title: 'GraphQL basics',
      content: 'GraphQL queries and mutations',
      tags: ['graphql'],
      links: ['n2'],
      source: 'other' as const,
      updatedAt: '2026-08-01T00:00:00.000Z'
    };

    const candidate = {
      id: 'n2',
      title: 'GraphQL advanced',
      content: 'GraphQL queries and mutations for production systems',
      tags: ['graphql'],
      links: ['n1'],
      source: 'other' as const,
      updatedAt: '2026-08-01T00:00:00.000Z'
    };

    await indexer.indexNote(note, store);
    await indexer.indexNote(candidate, store);

    const similarService = new SimilarNotesService();
    const similar = await similarService.findSimilar(note, [candidate], store);
    const nextStepService = new NextStepService();
    const nextStep = await nextStepService.recommend(note, [candidate]);

    expect(similar[0]?.id).toBe(candidate.id);
    expect(nextStep?.id).toBe(candidate.id);
  });
});
