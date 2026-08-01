import type { Note } from '@nextread/shared';
import { computeSimilarityScore } from '../ranking/index.js';
import type { NoteRecord } from '../models/index.js';
import type { VectorStore } from '../vector/index.js';

export interface SimilarNoteResult {
  id: string;
  score: number;
  title: string;
}

export class SimilarNotesService {
  async findSimilar(note: Note, candidates: NoteRecord[], store?: VectorStore): Promise<SimilarNoteResult[]> {
    const indexedCandidates = store ? await store.listNotes() : candidates;

    return indexedCandidates
      .filter((candidate) => candidate.id !== note.id)
      .map((candidate) => ({
        id: candidate.id,
        score: computeSimilarityScore(note.content, candidate.content),
        title: candidate.title
      }))
      .sort((left, right) => right.score - left.score);
  }
}
