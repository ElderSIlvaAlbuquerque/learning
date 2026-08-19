import type { Note } from '@nextread/shared';
import type { NoteRecord } from '../models/index.js';
import { type SimilarityScorer } from '../ranking/index.js';
export interface NextStepRecommendation {
    id: string;
    score: number;
    title: string;
}
export declare class NextStepService {
    private readonly scorer;
    constructor(scorer?: SimilarityScorer);
    recommend(note: Note, candidates: NoteRecord[]): Promise<NextStepRecommendation | null>;
}
//# sourceMappingURL=next-step.d.ts.map