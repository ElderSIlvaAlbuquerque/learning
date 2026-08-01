import { computeSimilarityScore } from '../ranking/index.js';
export class SimilarNotesService {
    async findSimilar(note, candidates, store) {
        const indexedCandidates = store ? await store.listNotes() : candidates;
        return indexedCandidates
            .filter((candidate) => candidate.id !== note.id)
            .map((candidate) => ({
            id: candidate.id,
            score: computeSimilarityScore(note.content, candidate.content),
            title: candidate.title
        }))
            .sort((left, right) => right.score - left.score);
    }
}
//# sourceMappingURL=similar-notes.js.map