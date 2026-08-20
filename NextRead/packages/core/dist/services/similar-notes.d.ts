import type { Note, RecommendationExplanation, TopicCluster } from '@nextread/shared';
import { type SimilarityScorer } from '../ranking/index.js';
import type { NoteRecord } from '../models/index.js';
import type { VectorStore } from '../vector/index.js';
export type SimilarNoteResult = RecommendationExplanation;
export declare class SimilarNotesService {
    private readonly scorer;
    constructor(scorer?: SimilarityScorer);
    findSimilar(note: Note, candidates: NoteRecord[], store?: VectorStore): Promise<SimilarNoteResult[]>;
    clusters(results: SimilarNoteResult[]): TopicCluster[];
}
//# sourceMappingURL=similar-notes.d.ts.map