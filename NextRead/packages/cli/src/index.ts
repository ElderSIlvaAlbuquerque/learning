#!/usr/bin/env node
import { BookRecommendationsService, NextStepService, SimilarNotesService, sampleBooks, sampleNotes } from '@nextread/core';

const args = process.argv.slice(2);
const mode = args[0] ?? 'similar';

const note = sampleNotes[0];

if (mode === 'similar') {
  const service = new SimilarNotesService();
  const results = await service.findSimilar({
    id: note.id,
    title: note.title,
    content: note.content,
    tags: note.tags,
    links: note.links,
    source: note.source as 'zenelf' | 'obsidian' | 'other',
    updatedAt: note.updatedAt
  }, sampleNotes);
  console.log(JSON.stringify(results, null, 2));
} else if (mode === 'next') {
  const service = new NextStepService();
  const result = service.recommend({
    id: note.id,
    title: note.title,
    content: note.content,
    tags: note.tags,
    links: note.links,
    source: note.source as 'zenelf' | 'obsidian' | 'other',
    updatedAt: note.updatedAt
  }, sampleNotes);
  console.log(JSON.stringify(result, null, 2));
} else if (mode === 'books') {
  const service = new BookRecommendationsService();
  const results = service.recommend({
    id: note.id,
    title: note.title,
    content: note.content,
    tags: note.tags,
    links: note.links,
    source: note.source as 'zenelf' | 'obsidian' | 'other',
    updatedAt: note.updatedAt
  }, sampleBooks);
  console.log(JSON.stringify(results, null, 2));
} else {
  console.log('Unknown mode. Use similar, next, or books.');
}
