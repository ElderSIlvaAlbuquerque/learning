import { computeSimilarityScore } from '../ranking/index.js';
export class BookRecommendationsService {
    recommend(note, books) {
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
//# sourceMappingURL=book-recommendations.js.map