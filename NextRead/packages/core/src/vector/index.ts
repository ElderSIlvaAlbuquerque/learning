import { QdrantClient } from '@qdrant/js-client-rest';
import type { NoteRecord } from '../models/index.js';

export interface VectorStoreOptions {
  url?: string;
  apiKey?: string;
}

export class VectorStore {
  private readonly notes: NoteRecord[] = [];

  constructor(private readonly options: VectorStoreOptions = {}) {}

  createClient(): QdrantClient {
    return new QdrantClient({
      url: this.options.url ?? 'http://localhost:6333'
    });
  }

  async ensureCollection(name: string): Promise<void> {
    const client = this.createClient();
    try {
      await client.getCollection(name);
    } catch {
      await client.createCollection(name, {
        vectors: {
          size: 3,
          distance: 'Cosine'
        }
      });
    }
  }

  async indexNote(note: NoteRecord): Promise<void> {
    this.notes.push(note);
  }

  async listNotes(): Promise<NoteRecord[]> {
    return this.notes;
  }
}
