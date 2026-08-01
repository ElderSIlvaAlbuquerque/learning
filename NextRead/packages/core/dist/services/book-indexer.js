export class BookIndexer {
    async upsertBook(book) {
        return {
            id: book.id,
            title: book.title,
            authors: book.authors,
            description: book.description,
            categories: book.categories,
            rating: book.rating
        };
    }
}
//# sourceMappingURL=book-indexer.js.map