import type { Note } from '@nextread/shared';
import { VectorStore } from '../../../core/src/vector/index.js';
export interface ObsidianNotePayload {
    id: string;
    title: string;
    content?: string;
    path?: string;
    tags?: string[];
    links?: string[];
    frontmatter?: Record<string, unknown>;
    updatedAt?: string;
}
export declare class ObsidianAdapter {
    mapNote(payload: ObsidianNotePayload): Note;
    listNotes(payloads: ObsidianNotePayload[]): Note[];
    fetchNotes(payloads: ObsidianNotePayload[], store?: VectorStore): Promise<Note[]>;
    upsertNote(payload: ObsidianNotePayload, store?: VectorStore): Promise<Note>;
}
//# sourceMappingURL=index.d.ts.map