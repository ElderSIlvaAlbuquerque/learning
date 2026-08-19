import { computeNextStepBonus, JaccardSimilarityScorer } from '../ranking/index.js';
export class NextStepService {
    scorer;
    constructor(scorer = new JaccardSimilarityScorer()) {
        this.scorer = scorer;
    }
    async recommend(note, candidates) {
        const ranked = await Promise.all(candidates
            .filter((candidate) => candidate.id !== note.id)
            .map(async (candidate) => ({
            id: candidate.id,
            score: (await this.scorer.score(note.content, candidate.content)) + computeNextStepBonus(note, candidate),
            title: candidate.title
        })));
        ranked.sort((left, right) => right.score - left.score);
        return ranked[0] ?? null;
    }
}
//# sourceMappingURL=next-step.js.map