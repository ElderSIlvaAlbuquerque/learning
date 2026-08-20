import type { Note, RecommendationExplanation, TopicCluster } from '@nextread/shared';
import type { BookRecord } from '../models/index.js';
import { type SimilarityScorer } from '../ranking/index.js';
export interface BookRecommendation extends RecommendationExplanation {
    authors: string[];
    rating: number;
}
export declare class BookRecommendationsService {
    private readonly scorer;
    constructor(scorer?: SimilarityScorer);
    recommend(note: Note, books: BookRecord[]): Promise<BookRecommendation[]>;
    clusters(recommendations: BookRecommendation[]): TopicCluster[];
}
//# sourceMappingURL=book-recommendations.d.ts.map