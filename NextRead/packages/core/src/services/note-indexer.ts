import type { Note } from '@nextread/shared';
import type { NoteRecord } from '../models/index.js';
import type { VectorStore } from '../vector/index.js';

export class NoteIndexer {
  async upsertNote(note: Note): Promise<NoteRecord> {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      tags: note.tags,
      links: note.links,
      source: note.source,
      updatedAt: note.updatedAt
    };
  }

  async indexNote(note: Note, store?: VectorStore): Promise<NoteRecord> {
    const record = await this.upsertNote(note);

    if (store) {
      await store.indexNote(record);
    }

    return record;
  }
}
