import type { Note } from '@nextread/shared';
import { NoteIndexer } from '../../../core/src/services/note-indexer.js';
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

const INLINE_TAG_PATTERN = /(?:^|\s)#([a-zA-Z0-9_/-]+)/g;
const WIKILINK_PATTERN = /\[\[([^\]|#]+)(?:[#|][^\]]*)?\]\]/g;

function extractInlineTags(content: string): string[] {
  return [...content.matchAll(INLINE_TAG_PATTERN)].map((match) => match[1]);
}

function extractWikilinks(content: string): string[] {
  return [...content.matchAll(WIKILINK_PATTERN)].map((match) => match[1].trim());
}

function uniq(values: string[]): string[] {
  return [...new Set(values)];
}

export class ObsidianAdapter {
  mapNote(payload: ObsidianNotePayload): Note {
    if (!payload.title) {
      throw new Error(`Obsidian note "${payload.id}" is missing a required title.`);
    }

    const content = payload.content ?? '';
    if (!content) {
      throw new Error(`Obsidian note "${payload.id}" is missing content.`);
    }

    if (payload.frontmatter !== undefined && typeof payload.frontmatter !== 'object') {
      throw new Error(`Obsidian note "${payload.id}" has malformed frontmatter.`);
    }

    const frontmatterTags = payload.frontmatter?.tags;
    const tags = uniq([
      ...(payload.tags ?? []),
      ...(Array.isArray(frontmatterTags) ? frontmatterTags : []),
      ...extractInlineTags(content)
    ]);

    const links = uniq([...(payload.links ?? []), ...extractWikilinks(content)]);

    return {
      id: payload.id,
      title: payload.title,
      content,
      tags,
      links,
      path: payload.path,
      source: 'obsidian',
      updatedAt: payload.updatedAt ?? new Date().toISOString()
    };
  }

  listNotes(payloads: ObsidianNotePayload[]): Note[] {
    const seenIds = new Set<string>();
    const notes: Note[] = [];

    for (const payload of payloads) {
      if (seenIds.has(payload.id)) {
        throw new Error(`Duplicate Obsidian note id "${payload.id}".`);
      }
      seenIds.add(payload.id);
      notes.push(this.mapNote(payload));
    }

    return notes;
  }

  async fetchNotes(payloads: ObsidianNotePayload[], store?: VectorStore): Promise<Note[]> {
    const notes = this.listNotes(payloads);

    if (store) {
      const indexer = new NoteIndexer();
      for (const note of notes) {
        await indexer.indexNote(note, store);
      }
    }

    return notes;
  }

  async upsertNote(payload: ObsidianNotePayload, store?: VectorStore): Promise<Note> {
    const note = this.mapNote(payload);

    if (store) {
      const indexer = new NoteIndexer();
      await indexer.indexNote(note, store);
    }

    return note;
  }
}
