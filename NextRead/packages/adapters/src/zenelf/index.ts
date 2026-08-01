import type { Note } from '@nextread/shared';
import { NoteIndexer } from '../../../core/src/services/note-indexer.js';
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

export class ZenElfAdapter {
  mapNote(payload: ZenElfNotePayload): Note {
    return {
      id: payload.id,
      title: payload.title,
      content: payload.content ?? '',
      tags: payload.tags ?? [],
      links: payload.links ?? [],
      source: (payload.source as Note['source']) ?? 'zenelf',
      updatedAt: payload.updatedAt ?? new Date().toISOString()
    };
  }

  listNotes(payloads: ZenElfNotePayload[]): Note[] {
    return payloads.map((payload) => this.mapNote(payload));
  }

  async fetchNotes(payloads: ZenElfNotePayload[], store?: VectorStore): Promise<Note[]> {
    const notes = this.listNotes(payloads);

    if (store) {
      const indexer = new NoteIndexer();
      for (const note of notes) {
        await indexer.indexNote(note, store);
      }
    }

    return notes;
  }

  async upsertNote(payload: ZenElfNotePayload, store?: VectorStore): Promise<Note> {
    const note = this.mapNote(payload);

    if (store) {
      const indexer = new NoteIndexer();
      await indexer.indexNote(note, store);
    }

    return note;
  }
}
