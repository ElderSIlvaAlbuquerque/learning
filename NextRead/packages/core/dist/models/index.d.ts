export interface NoteRecord {
    id: string;
    title: string;
    content: string;
    tags: string[];
    links: string[];
    path?: string;
    source: string;
    updatedAt: string;
}
export interface BookRecord {
    id: string;
    title: string;
    authors: string[];
    description: string;
    categories: string[];
    rating: number;
}
//# sourceMappingURL=index.d.ts.map