import type { Note } from '@nextread/shared';
import type { BookRecord } from '../models/index.js';
import { type SimilarityScorer } from '../ranking/index.js';
export interface BookRecommendation {
    id: string;
    score: number;
    title: string;
    authors: string[];
    rating: number;
}
export declare class BookRecommendationsService {
    private readonly scorer;
    constructor(scorer?: SimilarityScorer);
    recommend(note: Note, books: BookRecord[]): Promise<BookRecommendation[]>;
}
//# sourceMappingURL=book-recommendations.d.ts.map