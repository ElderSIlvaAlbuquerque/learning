import { describe, expect, it } from 'vitest';
import { TensorFlowSimilarityScorer } from '../src/ranking/tensorflow-scorer.js';
import type { EmbeddingProvider } from '../src/services/tensorflow-embedding.js';

class FakeEmbeddingProvider implements EmbeddingProvider {
  constructor(private readonly vectors: Record<string, number[]>) {}

  async createEmbedding(text: string): Promise<number[]> {
    const vector = this.vectors[text];
    if (!vector) {
      throw new Error(`No fake embedding configured for "${text}"`);
    }
    return vector;
  }
}

describe('TensorFlowSimilarityScorer', () => {
  it('scores similarity as the cosine similarity of the embedded texts', async () => {
    const provider = new FakeEmbeddingProvider({
      a: [1, 0],
      b: [1, 0],
      c: [0, 1]
    });
    const scorer = new TensorFlowSimilarityScorer(provider);

    await expect(scorer.score('a', 'b')).resolves.toBeCloseTo(1);
    await expect(scorer.score('a', 'c')).resolves.toBe(0);
  });
});
