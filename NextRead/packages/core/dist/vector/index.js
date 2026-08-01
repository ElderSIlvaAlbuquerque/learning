import { QdrantClient } from '@qdrant/js-client-rest';
export class VectorStore {
    options;
    notes = [];
    constructor(options = {}) {
        this.options = options;
    }
    createClient() {
        return new QdrantClient({
            url: this.options.url ?? 'http://localhost:6333'
        });
    }
    async ensureCollection(name) {
        const client = this.createClient();
        try {
            await client.getCollection(name);
        }
        catch {
            await client.createCollection(name, {
                vectors: {
                    size: 3,
                    distance: 'Cosine'
                }
            });
        }
    }
    async indexNote(note) {
        this.notes.push(note);
    }
    async listNotes() {
        return this.notes;
    }
}
//# sourceMappingURL=index.js.map