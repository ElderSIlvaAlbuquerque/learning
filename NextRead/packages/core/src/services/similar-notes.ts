import type { Note } from '@nextread/shared';
import { JaccardSimilarityScorer, type SimilarityScorer } from '../ranking/index.js';
import type { NoteRecord } from '../models/index.js';
import type { VectorStore } from '../vector/index.js';

export interface SimilarNoteResult {
  id: string;
  score: number;
  title: string;
}

export class SimilarNotesService {
  constructor(private readonly scorer: SimilarityScorer = new JaccardSimilarityScorer()) {}

  async findSimilar(note: Note, candidates: NoteRecord[], store?: VectorStore): Promise<SimilarNoteResult[]> {
    const indexedCandidates = store ? await store.listNotes() : candidates;

    const scored = await Promise.all(
      indexedCandidates
        .filter((candidate) => candidate.id !== note.id)
        .map(async (candidate) => ({
          id: candidate.id,
          score: await this.scorer.score(note.content, candidate.content),
          title: candidate.title
        }))
    );

    return scored.sort((left, right) => right.score - left.score);
  }
}
