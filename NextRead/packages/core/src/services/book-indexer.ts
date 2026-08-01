import type { Book } from '@nextread/shared';
import type { BookRecord } from '../models/index.js';

export class BookIndexer {
  async upsertBook(book: Book): Promise<BookRecord> {
    return {
      id: book.id,
      title: book.title,
      authors: book.authors,
      description: book.description,
      categories: book.categories,
      rating: book.rating
    };
  }
}
