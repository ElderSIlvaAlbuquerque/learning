#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
const TOPICS = ['graphql', 'rust programming language', 'api design', 'systems programming', 'software architecture'];
const RESULTS_PER_TOPIC = 20;
const OUTPUT_FILE = join(process.cwd(), 'samples', 'books', 'books.json');
const DELAY_BETWEEN_REQUESTS_MS = 1500;
const MAX_RETRIES = 4;
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function toBookRecord(volume) {
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
async function fetchTopic(topic, attempt = 1) {
    const params = new URLSearchParams({ q: topic, maxResults: String(RESULTS_PER_TOPIC) });
    if (API_KEY) {
        params.set('key', API_KEY);
    }
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${params}`);
    if (response.status === 429 && attempt <= MAX_RETRIES) {
        const backoffMs = 2 ** attempt * 1000;
        console.log(`  Rate limited (429), retrying "${topic}" in ${backoffMs}ms (attempt ${attempt}/${MAX_RETRIES})...`);
        await sleep(backoffMs);
        return fetchTopic(topic, attempt + 1);
    }
    if (!response.ok) {
        throw new Error(`Google Books API request failed for topic "${topic}": ${response.status} ${response.statusText}`);
    }
    const data = (await response.json());
    return (data.items ?? []).map(toBookRecord).filter((book) => book !== null);
}
async function main() {
    if (!API_KEY) {
        console.log('No GOOGLE_BOOKS_API_KEY set — using the anonymous quota, which Google throttles aggressively. ' +
            'If this run hits repeated 429s, get a free key (see README) and re-run with GOOGLE_BOOKS_API_KEY set.');
    }
    const booksById = new Map();
    for (const [index, topic] of TOPICS.entries()) {
        console.log(`Fetching books for topic "${topic}"...`);
        const books = await fetchTopic(topic);
        for (const book of books) {
            booksById.set(book.id, book);
        }
        if (index < TOPICS.length - 1) {
            await sleep(DELAY_BETWEEN_REQUESTS_MS);
        }
    }
    const books = [...booksById.values()];
    mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
    writeFileSync(OUTPUT_FILE, `${JSON.stringify(books, null, 2)}\n`, 'utf-8');
    console.log(`Wrote ${books.length} books to ${OUTPUT_FILE}`);
}
void main().catch((error) => {
    console.error('Failed to fetch books:', error);
    process.exitCode = 1;
});
//# sourceMappingURL=fetch-books.js.map