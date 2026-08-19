import { JaccardSimilarityScorer } from '../ranking/index.js';
export class BookRecommendationsService {
    scorer;
    constructor(scorer = new JaccardSimilarityScorer()) {
        this.scorer = scorer;
    }
    async recommend(note, books) {
        const scored = await Promise.all(books.map(async (book) => ({
            id: book.id,
            score: await this.scorer.score(note.content, `${book.title} ${book.description}`),
            title: book.title,
            authors: book.authors,
            rating: book.rating
        })));
        return scored.sort((left, right) => right.score - left.score);
    }
}
//# sourceMappingURL=book-recommendations.js.map