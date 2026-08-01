import type { Note } from '@nextread/shared';
import type { BookRecord } from '../models/index.js';
export interface BookRecommendation {
    id: string;
    score: number;
    title: string;
    authors: string[];
    rating: number;
}
export declare class BookRecommendationsService {
    recommend(note: Note, books: BookRecord[]): BookRecommendation[];
}
//# sourceMappingURL=book-recommendations.d.ts.map