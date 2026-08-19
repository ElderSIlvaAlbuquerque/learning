import { TensorFlowEmbeddingService } from '../services/tensorflow-embedding.js';
import { cosineSimilarity } from './cosine-similarity.js';
export class TensorFlowSimilarityScorer {
    embeddings;
    constructor(embeddings = new TensorFlowEmbeddingService()) {
        this.embeddings = embeddings;
    }
    async score(a, b) {
        const [vectorA, vectorB] = await Promise.all([
            this.embeddings.createEmbedding(a),
            this.embeddings.createEmbedding(b)
        ]);
        return cosineSimilarity(vectorA, vectorB);
    }
}
//# sourceMappingURL=tensorflow-scorer.js.map