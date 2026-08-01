import { describe, expect, it } from 'vitest';
import { EmbeddingService } from '../src/services/embedding.js';

describe('embedding service', () => {
  it('creates a numeric vector from text', async () => {
    const service = new EmbeddingService();
    const embedding = await service.createEmbedding('GraphQL queries and mutations');

    expect(embedding).toHaveLength(16);
    expect(embedding.every((value) => typeof value === 'number')).toBe(true);
  });
});
