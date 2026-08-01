import { QdrantClient } from '@qdrant/js-client-rest';
import type { NoteRecord } from '../models/index.js';
export interface VectorStoreOptions {
    url?: string;
    apiKey?: string;
}
export declare class VectorStore {
    private readonly options;
    private readonly notes;
    constructor(options?: VectorStoreOptions);
    createClient(): QdrantClient;
    ensureCollection(name: string): Promise<void>;
    indexNote(note: NoteRecord): Promise<void>;
    listNotes(): Promise<NoteRecord[]>;
}
//# sourceMappingURL=index.d.ts.map