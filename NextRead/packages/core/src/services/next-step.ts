import type { Note } from '@nextread/shared';
import type { NoteRecord } from '../models/index.js';
import { computeNextStepBonus, JaccardSimilarityScorer, type SimilarityScorer } from '../ranking/index.js';

export interface NextStepRecommendation {
  id: string;
  score: number;
  title: string;
}

export class NextStepService {
  constructor(private readonly scorer: SimilarityScorer = new JaccardSimilarityScorer()) {}

  async recommend(note: Note, candidates: NoteRecord[]): Promise<NextStepRecommendation | null> {
    const ranked = await Promise.all(
      candidates
        .filter((candidate) => candidate.id !== note.id)
        .map(async (candidate) => ({
          id: candidate.id,
          score: (await this.scorer.score(note.content, candidate.content)) + computeNextStepBonus(note, candidate),
          title: candidate.title
        }))
    );

    ranked.sort((left, right) => right.score - left.score);

    return ranked[0] ?? null;
  }
}
