export const DEFAULT_HYBRID_WEIGHTS = { similarity: 0.7, metadata: 0.3 };
export function computeHybridScore(similarity, metadataScore, weights = DEFAULT_HYBRID_WEIGHTS) {
    return similarity * weights.similarity + metadataScore * weights.metadata;
}
//# sourceMappingURL=hybrid-score.js.map