#!/usr/bin/env node
import {
  BookRecommendationsService,
  JaccardSimilarityScorer,
  NextStepService,
  SimilarNotesService,
  TensorFlowSimilarityScorer,
  type SimilarityScorer
} from '@nextread/core';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { resolveBooksFile, resolveNotesDir } from './config.js';
import { loadBooksFromFile } from './books-loader.js';
import { loadNotesFromDir } from './notes-loader.js';

function extractFlag(rawArgs: string[], name: string): { value?: string; rest: string[] } {
  const rest = [...rawArgs];
  const flagIndex = rest.findIndex((arg) => arg === `--${name}` || arg.startsWith(`--${name}=`));

  if (flagIndex === -1) {
    return { rest };
  }

  const flag = rest[flagIndex];
  if (flag.startsWith(`--${name}=`)) {
    const value = flag.slice(`--${name}=`.length);
    rest.splice(flagIndex, 1);
    return { value, rest };
  }

  const value = rest[flagIndex + 1];
  rest.splice(flagIndex, 2);
  return { value, rest };
}

const FORM_RESULT_LIMIT = 5;

function resolveScorer(engine?: string): SimilarityScorer {
  if (!engine || engine === 'jaccard') {
    return new JaccardSimilarityScorer();
  }

  if (engine === 'tensorflow') {
    return new TensorFlowSimilarityScorer();
  }

  throw new Error(`Unknown engine "${engine}". Use "jaccard" or "tensorflow".`);
}

const { value: dirFlag, rest: afterDir } = extractFlag(process.argv.slice(2), 'dir');
const { value: engineFlag, rest: args } = extractFlag(afterDir, 'engine');
const mode = args[0] ?? 'similar';
const noteIdArg = args[1];

const notesDir = resolveNotesDir(dirFlag);
const notes = loadNotesFromDir(notesDir);
const scorer = resolveScorer(engineFlag);

type Source = 'zenelf' | 'obsidian' | 'other';

function resolveNote() {
  if (!noteIdArg) {
    return notes[0];
  }

  const found = notes.find((note) => note.id === noteIdArg);
  if (!found) {
    const ids = notes.map((note) => note.id).join(', ');
    throw new Error(`Unknown note id "${noteIdArg}". Available ids in ${notesDir}: ${ids}`);
  }

  return found;
}

function toNote(defaultNote = resolveNote()) {
  return {
    id: defaultNote.id,
    title: defaultNote.title,
    content: defaultNote.content,
    tags: defaultNote.tags,
    links: defaultNote.links,
    source: defaultNote.source as Source,
    updatedAt: defaultNote.updatedAt
  };
}

function parseCsv(value: string): string[] {
  return value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

async function runFormMode(): Promise<void> {
  if (!input.isTTY || !output.isTTY) {
    console.log('Form mode requires an interactive terminal. Run this command directly in your shell.');
    return;
  }

  const rl = createInterface({ input, output });

  try {
    const defaultNote = notes[0];
    console.log('NextRead Manual Test Form');
    console.log('Press Enter to keep default values shown in [brackets].\n');

    const flowInput = (await rl.question('Flow (similar|next|books) [similar]: ')).trim().toLowerCase();
    const flow = flowInput === 'next' || flowInput === 'books' ? flowInput : 'similar';

    const engineInput = (await rl.question(`Engine (jaccard|tensorflow) [${engineFlag ?? 'jaccard'}]: `)).trim().toLowerCase();
    const formScorer = resolveScorer(engineInput || engineFlag);

    const id = (await rl.question(`Note id [${defaultNote.id}]: `)).trim() || defaultNote.id;
    const title = (await rl.question(`Title [${defaultNote.title}]: `)).trim() || defaultNote.title;
    const content = (await rl.question(`Content [${defaultNote.content}]: `)).trim() || defaultNote.content;
    const tagsInput = (await rl.question(`Tags (comma separated) [${defaultNote.tags.join(', ')}]: `)).trim();
    const linksInput = (await rl.question(`Links (comma separated) [${defaultNote.links.join(', ')}]: `)).trim();
    const sourceInput = (await rl.question(`Source (zenelf|obsidian|other) [${defaultNote.source}]: `)).trim().toLowerCase();

    const source: Source = sourceInput === 'obsidian' || sourceInput === 'other' ? sourceInput : 'zenelf';

    const note = {
      ...toNote(defaultNote),
      id,
      title,
      content,
      tags: tagsInput ? parseCsv(tagsInput) : defaultNote.tags,
      links: linksInput ? parseCsv(linksInput) : defaultNote.links,
      source,
      updatedAt: new Date().toISOString()
    };

    if (flow === 'similar') {
      const service = new SimilarNotesService(formScorer);
      const results = await service.findSimilar(note, notes);
      console.log('\nResult:');
      console.log(JSON.stringify(results.slice(0, FORM_RESULT_LIMIT), null, 2));
      return;
    }

    if (flow === 'next') {
      const service = new NextStepService(formScorer);
      const result = await service.recommend(note, notes);
      console.log('\nResult:');
      console.log(JSON.stringify(result, null, 2));
      return;
    }

    const service = new BookRecommendationsService(formScorer);
    const results = await service.recommend(note, loadBooksFromFile(resolveBooksFile()));
    console.log('\nResult:');
    console.log(JSON.stringify(results.slice(0, FORM_RESULT_LIMIT), null, 2));
  } finally {
    rl.close();
  }
}

async function main(): Promise<void> {
  const note = toNote();

  if (mode === 'form') {
    await runFormMode();
  } else if (mode === 'similar') {
    const service = new SimilarNotesService(scorer);
    const results = await service.findSimilar(note, notes);
    console.log(JSON.stringify(results, null, 2));
  } else if (mode === 'next') {
    const service = new NextStepService(scorer);
    const result = await service.recommend(note, notes);
    console.log(JSON.stringify(result, null, 2));
  } else if (mode === 'books') {
    const service = new BookRecommendationsService(scorer);
    const results = await service.recommend(note, loadBooksFromFile(resolveBooksFile()));
    console.log(JSON.stringify(results, null, 2));
  } else {
    console.log('Unknown mode. Use form, similar, next, or books.');
  }
}

void main().catch((error: unknown) => {
  console.error('CLI execution failed:', error);
  process.exitCode = 1;
});
