import { describe, expect, it } from 'vitest';
import type { Note } from '@nextread/shared';
import { NextStepService } from '../src/services/next-step.js';

describe('next step service', () => {
  it('selects the best candidate that is not the current note', () => {
    const service = new NextStepService();
    const note: Note = {
      id: 'n1',
      title: 'GraphQL basics',
      content: 'GraphQL queries and mutations',
      tags: ['graphql'],
      links: ['n2'],
      source: 'other',
      updatedAt: '2026-08-01T00:00:00.000Z'
    };

    const candidates = [
      {
        id: 'n2',
        title: 'GraphQL advanced',
        content: 'GraphQL queries and mutations for production systems',
        tags: ['graphql'],
        links: ['n1'],
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

    const result = service.recommend(note, candidates);

    expect(result?.id).toBe('n2');
    expect(result?.id).not.toBe(note.id);
  });
});
