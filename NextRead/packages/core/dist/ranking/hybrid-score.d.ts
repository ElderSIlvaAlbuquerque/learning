export interface HybridScoreWeights {
    similarity: number;
    metadata: number;
}
export declare const DEFAULT_HYBRID_WEIGHTS: HybridScoreWeights;
export declare function computeHybridScore(similarity: number, metadataScore: number, weights?: HybridScoreWeights): number;
//# sourceMappingURL=hybrid-score.d.ts.map