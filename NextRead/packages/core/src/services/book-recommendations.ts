import type { Note } from '@nextread/shared';
import type { BookRecord } from '../models/index.js';
import { JaccardSimilarityScorer, type SimilarityScorer } from '../ranking/index.js';

export interface BookRecommendation {
  id: string;
  score: number;
  title: string;
  authors: string[];
  rating: number;
}

export class BookRecommendationsService {
  constructor(private readonly scorer: SimilarityScorer = new JaccardSimilarityScorer()) {}

  async recommend(note: Note, books: BookRecord[]): Promise<BookRecommendation[]> {
    const scored = await Promise.all(
      books.map(async (book) => ({
        id: book.id,
        score: await this.scorer.score(note.content, `${book.title} ${book.description}`),
        title: book.title,
        authors: book.authors,
        rating: book.rating
      }))
    );

    return scored.sort((left, right) => right.score - left.score);
  }
}
