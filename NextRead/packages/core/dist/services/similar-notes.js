import { JaccardSimilarityScorer } from '../ranking/index.js';
export class SimilarNotesService {
    scorer;
    constructor(scorer = new JaccardSimilarityScorer()) {
        this.scorer = scorer;
    }
    async findSimilar(note, candidates, store) {
        const indexedCandidates = store ? await store.listNotes() : candidates;
        const scored = await Promise.all(indexedCandidates
            .filter((candidate) => candidate.id !== note.id)
            .map(async (candidate) => ({
            id: candidate.id,
            score: await this.scorer.score(note.content, candidate.content),
            title: candidate.title
        })));
        return scored.sort((left, right) => right.score - left.score);
    }
}
//# sourceMappingURL=similar-notes.js.map