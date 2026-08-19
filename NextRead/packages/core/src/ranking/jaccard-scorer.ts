import { tokenize } from './tokenize.js';
import type { SimilarityScorer } from './scorer.js';

export class JaccardSimilarityScorer implements SimilarityScorer {
  async score(a: string, b: string): Promise<number> {
    const aTokens = tokenize(a);
    const bTokens = tokenize(b);
    const overlap = new Set(aTokens.filter((word) => bTokens.includes(word)));
    const union = new Set([...aTokens, ...bTokens]);
    return union.size === 0 ? 0 : overlap.size / union.size;
  }
}
