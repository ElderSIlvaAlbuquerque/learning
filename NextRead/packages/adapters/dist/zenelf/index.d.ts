import type { Note } from '@nextread/shared';
import { VectorStore } from '../../../core/src/vector/index.js';
export interface ZenElfNotePayload {
    id: string;
    title: string;
    content?: string;
    tags?: string[];
    links?: string[];
    source?: string;
    updatedAt?: string;
}
export declare class ZenElfAdapter {
    mapNote(payload: ZenElfNotePayload): Note;
    listNotes(payloads: ZenElfNotePayload[]): Note[];
    fetchNotes(payloads: ZenElfNotePayload[], store?: VectorStore): Promise<Note[]>;
    upsertNote(payload: ZenElfNotePayload, store?: VectorStore): Promise<Note>;
}
//# sourceMappingURL=index.d.ts.map