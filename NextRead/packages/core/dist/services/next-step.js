import { computeNextStepScore } from '../ranking/index.js';
export class NextStepService {
    recommend(note, candidates) {
        const ranked = candidates
            .filter((candidate) => candidate.id !== note.id)
            .map((candidate) => ({
            id: candidate.id,
            score: computeNextStepScore({
                tags: note.tags,
                links: note.links,
                content: note.content
            }, {
                tags: candidate.tags,
                links: candidate.links,
                content: candidate.content
            }),
            title: candidate.title
        }))
            .sort((left, right) => right.score - left.score);
        return ranked[0] ?? null;
    }
}
//# sourceMappingURL=next-step.js.map