import type { Note } from '@nextread/shared';
import type { NoteRecord } from '../models/index.js';
export interface NextStepRecommendation {
    id: string;
    score: number;
    title: string;
}
export declare class NextStepService {
    recommend(note: Note, candidates: NoteRecord[]): NextStepRecommendation | null;
}
//# sourceMappingURL=next-step.d.ts.map