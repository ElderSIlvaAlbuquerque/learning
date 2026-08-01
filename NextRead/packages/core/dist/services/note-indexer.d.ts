import type { Note } from '@nextread/shared';
import type { NoteRecord } from '../models/index.js';
import type { VectorStore } from '../vector/index.js';
export declare class NoteIndexer {
    upsertNote(note: Note): Promise<NoteRecord>;
    indexNote(note: Note, store?: VectorStore): Promise<NoteRecord>;
}
//# sourceMappingURL=note-indexer.d.ts.map