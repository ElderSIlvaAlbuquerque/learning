import { assignCluster, buildExplanation, computeHybridScore, groupByCluster, JaccardSimilarityScorer, sharedTags, tagOverlapScore } from '../ranking/index.js';
const MAX_RATING = 5;
export class BookRecommendationsService {
    scorer;
    constructor(scorer = new JaccardSimilarityScorer()) {
        this.scorer = scorer;
    }
    async recommend(note, books) {
        const scored = await Promise.all(books.map(async (book) => {
            const similarity = await this.scorer.score(note.content, `${book.title} ${book.description}`);
            const shared = sharedTags(note.tags, book.categories);
            const metadataScore = (tagOverlapScore(note.tags, book.categories) + book.rating / MAX_RATING) / 2;
            return {
                id: book.id,
                score: computeHybridScore(similarity, metadataScore),
                title: book.title,
                authors: book.authors,
                rating: book.rating,
                explanation: buildExplanation(shared, similarity),
                cluster: assignCluster(shared.length > 0 ? shared : book.categories)
            };
        }));
        return scored.sort((left, right) => right.score - left.score);
    }
    clusters(recommendations) {
        return groupByCluster(recommendations);
    }
}
//# sourceMappingURL=book-recommendations.js.map