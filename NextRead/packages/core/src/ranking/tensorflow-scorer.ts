import { TensorFlowEmbeddingService, type EmbeddingProvider } from '../services/tensorflow-embedding.js';
import { cosineSimilarity } from './cosine-similarity.js';
import type { SimilarityScorer } from './scorer.js';

export class TensorFlowSimilarityScorer implements SimilarityScorer {
  constructor(private readonly embeddings: EmbeddingProvider = new TensorFlowEmbeddingService()) {}

  async score(a: string, b: string): Promise<number> {
    const [vectorA, vectorB] = await Promise.all([
      this.embeddings.createEmbedding(a),
      this.embeddings.createEmbedding(b)
    ]);

    return cosineSimilarity(vectorA, vectorB);
  }
}
