import type { BookRecord, NoteRecord } from '../models/index.js';

export const sampleNotes: NoteRecord[] = [
  {
    id: 'note-graphql-intro',
    title: 'GraphQL Intro',
    content: 'GraphQL queries and mutations for APIs',
    tags: ['graphql', 'api'],
    links: ['note-graphql-advanced'],
    source: 'zenelf',
    updatedAt: '2026-08-01T00:00:00.000Z'
  },
  {
    id: 'note-graphql-advanced',
    title: 'GraphQL Advanced',
    content: 'Advanced GraphQL schema design and resolver patterns',
    tags: ['graphql', 'schema'],
    links: ['note-graphql-intro'],
    source: 'zenelf',
    updatedAt: '2026-08-01T00:00:00.000Z'
  },
  {
    id: 'note-rust-basics',
    title: 'Rust Basics',
    content: 'Ownership and borrowing in Rust',
    tags: ['rust', 'systems'],
    links: [],
    source: 'obsidian',
    updatedAt: '2026-08-01T00:00:00.000Z'
  }
];

export const sampleBooks: BookRecord[] = [
  {
    id: 'book-graphql',
    title: 'Learning GraphQL',
    authors: ['A. Author'],
    description: 'A book about GraphQL query language for APIs',
    categories: ['tech', 'api'],
    rating: 4.5
  },
  {
    id: 'book-rust',
    title: 'Rust in Action',
    authors: ['B. Author'],
    description: 'Practical Rust for systems programming',
    categories: ['tech', 'systems'],
    rating: 4.2
  }
];
