export class NoteIndexer {
    async upsertNote(note) {
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            tags: note.tags,
            links: note.links,
            source: note.source,
            updatedAt: note.updatedAt
        };
    }
    async indexNote(note, store) {
        const record = await this.upsertNote(note);
        if (store) {
            await store.indexNote(record);
        }
        return record;
    }
}
//# sourceMappingURL=note-indexer.js.map