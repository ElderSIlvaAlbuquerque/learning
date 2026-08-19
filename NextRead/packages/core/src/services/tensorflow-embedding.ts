import * as use from '@tensorflow-models/universal-sentence-encoder';

export interface EmbeddingProvider {
  createEmbedding(text: string): Promise<number[]>;
}

export class TensorFlowEmbeddingService implements EmbeddingProvider {
  private modelPromise?: Promise<use.UniversalSentenceEncoder>;

  private loadModel(): Promise<use.UniversalSentenceEncoder> {
    if (!this.modelPromise) {
      this.modelPromise = use.load();
    }
    return this.modelPromise;
  }

  async createEmbedding(text: string): Promise<number[]> {
    const model = await this.loadModel();
    const embeddings = await model.embed([text]);

    try {
      const [vector] = await embeddings.array();
      return vector;
    } finally {
      embeddings.dispose();
    }
  }
}
