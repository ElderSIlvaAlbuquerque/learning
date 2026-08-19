import { tokenize } from './tokenize.js';
export class JaccardSimilarityScorer {
    async score(a, b) {
        const aTokens = tokenize(a);
        const bTokens = tokenize(b);
        const overlap = new Set(aTokens.filter((word) => bTokens.includes(word)));
        const union = new Set([...aTokens, ...bTokens]);
        return union.size === 0 ? 0 : overlap.size / union.size;
    }
}
//# sourceMappingURL=jaccard-scorer.js.map