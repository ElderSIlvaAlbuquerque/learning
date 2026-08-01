import * as tf from '@tensorflow/tfjs';

export class EmbeddingService {
  async createEmbedding(text: string): Promise<number[]> {
    await tf.ready();
    const tokens = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    const vector = Array(16).fill(0);

    for (const token of tokens) {
      const hash = this.hashToken(token);
      vector[hash % vector.length] += 1;
    }

    return vector.map((value) => Number(value));
  }

  private hashToken(token: string): number {
    let hash = 0;
    for (let index = 0; index < token.length; index += 1) {
      hash = (hash << 5) - hash + token.charCodeAt(index);
      hash |= 0;
    }
    return Math.abs(hash);
  }
}
