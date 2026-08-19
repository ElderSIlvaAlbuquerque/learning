#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { BookRecord } from '@nextread/core';

const TOPICS = ['graphql', 'rust programming language', 'api design', 'systems programming', 'software architecture'];
const RESULTS_PER_TOPIC = 20;
const OUTPUT_FILE = join(process.cwd(), 'samples', 'books', 'books.json');

interface GoogleBooksVolume {
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    description?: string;
    categories?: string[];
    averageRating?: number;
  };
}

interface GoogleBooksResponse {
  items?: GoogleBooksVolume[];
}

function toBookRecord(volume: GoogleBooksVolume): BookRecord | null {
  const info = volume.volumeInfo;

  if (!info?.title || !info.description) {
    return null;
  }

  return {
    id: `book-${volume.id}`,
    title: info.title,
    authors: info.authors ?? [],
    description: info.description,
    categories: info.categories ?? [],
    rating: info.averageRating ?? 0
  };
}

async function fetchTopic(topic: string): Promise<BookRecord[]> {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(topic)}&maxResults=${RESULTS_PER_TOPIC}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Google Books API request failed for topic "${topic}": ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as GoogleBooksResponse;
  return (data.items ?? []).map(toBookRecord).filter((book): book is BookRecord => book !== null);
}

async function main(): Promise<void> {
  const booksById = new Map<string, BookRecord>();

  for (const topic of TOPICS) {
    console.log(`Fetching books for topic "${topic}"...`);
    const books = await fetchTopic(topic);

    for (const book of books) {
      booksById.set(book.id, book);
    }
  }

  const books = [...booksById.values()];
  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, `${JSON.stringify(books, null, 2)}\n`, 'utf-8');

  console.log(`Wrote ${books.length} books to ${OUTPUT_FILE}`);
}

void main().catch((error: unknown) => {
  console.error('Failed to fetch books:', error);
  process.exitCode = 1;
});
