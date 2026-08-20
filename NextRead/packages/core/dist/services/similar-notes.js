import { assignCluster, buildExplanation, computeHybridScore, groupByCluster, JaccardSimilarityScorer, sharedTags, tagOverlapScore } from '../ranking/index.js';
export class SimilarNotesService {
    scorer;
    constructor(scorer = new JaccardSimilarityScorer()) {
        this.scorer = scorer;
    }
    async findSimilar(note, candidates, store) {
        const indexedCandidates = store ? await store.listNotes() : candidates;
        const scored = await Promise.all(indexedCandidates
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
        }));
        return scored.sort((left, right) => right.score - left.score);
    }
    clusters(results) {
        return groupByCluster(results);
    }
}
//# sourceMappingURL=similar-notes.js.map