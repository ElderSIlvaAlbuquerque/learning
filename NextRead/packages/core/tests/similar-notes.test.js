import { describe, expect, it } from 'vitest';
import { SimilarNotesService } from '../src/services/similar-notes.js';
describe('similar notes service', () => {
    it('returns ranked similar notes', async () => {
        const service = new SimilarNotesService();
        const note = {
            id: 'n1',
            title: 'GraphQL basics',
            content: 'GraphQL queries and mutations',
            tags: ['graphql'],
            links: ['n2'],
            source: 'other',
            updatedAt: '2026-08-01T00:00:00.000Z'
        };
        const candidates = [
            {
                id: 'n2',
                title: 'GraphQL advanced',
                content: 'GraphQL queries and mutations for production systems',
                tags: ['graphql'],
                links: ['n1'],
                source: 'other',
                updatedAt: '2026-08-01T00:00:00.000Z'
            },
            {
                id: 'n3',
                title: 'Rust basics',
                content: 'Ownership and borrowing in Rust',
                tags: ['rust'],
                links: [],
                source: 'other',
                updatedAt: '2026-08-01T00:00:00.000Z'
            }
        ];
        const results = await service.findSimilar(note, candidates);
        expect(results[0]?.id).toBe('n2');
        expect(results[0]?.score).toBeGreaterThan(results[1]?.score ?? 0);
    });
});
//# sourceMappingURL=similar-notes.test.js.map