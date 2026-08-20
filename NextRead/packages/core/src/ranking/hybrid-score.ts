export interface HybridScoreWeights {
  similarity: number;
  metadata: number;
}

export const DEFAULT_HYBRID_WEIGHTS: HybridScoreWeights = { similarity: 0.7, metadata: 0.3 };

export function computeHybridScore(
  similarity: number,
  metadataScore: number,
  weights: HybridScoreWeights = DEFAULT_HYBRID_WEIGHTS
): number {
  return similarity * weights.similarity + metadataScore * weights.metadata;
}
