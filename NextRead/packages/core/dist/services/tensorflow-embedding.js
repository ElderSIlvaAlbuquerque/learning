import * as use from '@tensorflow-models/universal-sentence-encoder';
export class TensorFlowEmbeddingService {
    modelPromise;
    loadModel() {
        if (!this.modelPromise) {
            this.modelPromise = use.load();
        }
        return this.modelPromise;
    }
    async createEmbedding(text) {
        const model = await this.loadModel();
        const embeddings = await model.embed([text]);
        try {
            const [vector] = await embeddings.array();
            return vector;
        }
        finally {
            embeddings.dispose();
        }
    }
}
//# sourceMappingURL=tensorflow-embedding.js.map