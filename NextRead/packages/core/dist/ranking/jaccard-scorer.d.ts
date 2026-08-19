import type { SimilarityScorer } from './scorer.js';
export declare class JaccardSimilarityScorer implements SimilarityScorer {
    score(a: string, b: string): Promise<number>;
}
//# sourceMappingURL=jaccard-scorer.d.ts.map