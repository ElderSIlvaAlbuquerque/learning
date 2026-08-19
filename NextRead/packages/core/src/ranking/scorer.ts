export interface SimilarityScorer {
  score(a: string, b: string): Promise<number>;
}
