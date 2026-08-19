import { type EmbeddingProvider } from '../services/tensorflow-embedding.js';
import type { SimilarityScorer } from './scorer.js';
export declare class TensorFlowSimilarityScorer implements SimilarityScorer {
    private readonly embeddings;
    constructor(embeddings?: EmbeddingProvider);
    score(a: string, b: string): Promise<number>;
}
//# sourceMappingURL=tensorflow-scorer.d.ts.map