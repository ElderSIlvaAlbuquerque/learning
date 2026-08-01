import { NoteIndexer } from '../../../core/src/services/note-indexer.js';
export class ZenElfAdapter {
    mapNote(payload) {
        return {
            id: payload.id,
            title: payload.title,
            content: payload.content ?? '',
            tags: payload.tags ?? [],
            links: payload.links ?? [],
            source: payload.source ?? 'zenelf',
            updatedAt: payload.updatedAt ?? new Date().toISOString()
        };
    }
    listNotes(payloads) {
        return payloads.map((payload) => this.mapNote(payload));
    }
    async fetchNotes(payloads, store) {
        const notes = this.listNotes(payloads);
        if (store) {
            const indexer = new NoteIndexer();
            for (const note of notes) {
                await indexer.indexNote(note, store);
            }
        }
        return notes;
    }
    async upsertNote(payload, store) {
        const note = this.mapNote(payload);
        if (store) {
            const indexer = new NoteIndexer();
            await indexer.indexNote(note, store);
        }
        return note;
    }
}
//# sourceMappingURL=index.js.map