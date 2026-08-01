import type { Note } from '@nextread/shared';
import type { NoteRecord } from '../models/index.js';
import type { VectorStore } from '../vector/index.js';
export interface SimilarNoteResult {
    id: string;
    score: number;
    title: string;
}
export declare class SimilarNotesService {
    findSimilar(note: Note, candidates: NoteRecord[], store?: VectorStore): Promise<SimilarNoteResult[]>;
}
//# sourceMappingURL=similar-notes.d.ts.map