import type { Note } from '@nextread/shared';
import type { BookRecord } from '../models/index.js';
import { computeSimilarityScore } from '../ranking/index.js';

export interface BookRecommendation {
  id: string;
  score: number;
  title: string;
  authors: string[];
  rating: number;
}

export class BookRecommendationsService {
  recommend(note: Note, books: BookRecord[]): BookRecommendation[] {
    return books
      .map((book) => ({
        id: book.id,
        score: computeSimilarityScore(note.content, `${book.title} ${book.description}`),
        title: book.title,
        authors: book.authors,
        rating: book.rating
      }))
      .sort((left, right) => right.score - left.score);
  }
}
