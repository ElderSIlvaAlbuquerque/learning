import type { Note, RecommendationExplanation, TopicCluster } from '@nextread/shared';
import {
  assignCluster,
  buildExplanation,
  computeHybridScore,
  groupByCluster,
  JaccardSimilarityScorer,
  sharedTags,
  tagOverlapScore,
  type SimilarityScorer
} from '../ranking/index.js';
import type { NoteRecord } from '../models/index.js';
import type { VectorStore } from '../vector/index.js';

export type SimilarNoteResult = RecommendationExplanation;

export class SimilarNotesService {
  constructor(private readonly scorer: SimilarityScorer = new JaccardSimilarityScorer()) {}

  async findSimilar(note: Note, candidates: NoteRecord[], store?: VectorStore): Promise<SimilarNoteResult[]> {
    const indexedCandidates = store ? await store.listNotes() : candidates;

    const scored = await Promise.all(
      indexedCandidates
        .filter((candidate) => candidate.id !== note.id)
        .map(async (candidate) => {
          const similarity = await this.scorer.score(note.content, candidate.content);
          const shared = sharedTags(note.tags, candidate.tags);
          const metadataScore = tagOverlapScore(note.tags, candidate.tags);

          return {
            id: candidate.id,
            score: computeHybridScore(similarity, metadataScore),
            title: candidate.title,
            explanation: buildExplanation(shared, similarity),
            cluster: assignCluster(shared.length > 0 ? shared : candidate.tags)
          };
        })
    );

    return scored.sort((left, right) => right.score - left.score);
  }

  clusters(results: SimilarNoteResult[]): TopicCluster[] {
    return groupByCluster(results);
  }
}
