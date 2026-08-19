#!/usr/bin/env node
import { BookRecommendationsService, NextStepService, SimilarNotesService, sampleBooks } from '@nextread/core';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { resolveNotesDir } from './config.js';
import { loadNotesFromDir } from './notes-loader.js';
function extractDirFlag(rawArgs) {
    const rest = [...rawArgs];
    const flagIndex = rest.findIndex((arg) => arg === '--dir' || arg.startsWith('--dir='));
    if (flagIndex === -1) {
        return { rest };
    }
    const flag = rest[flagIndex];
    if (flag.startsWith('--dir=')) {
        const dir = flag.slice('--dir='.length);
        rest.splice(flagIndex, 1);
        return { dir, rest };
    }
    const dir = rest[flagIndex + 1];
    rest.splice(flagIndex, 2);
    return { dir, rest };
}
const { dir: dirFlag, rest: args } = extractDirFlag(process.argv.slice(2));
const mode = args[0] ?? 'similar';
const noteIdArg = args[1];
const notesDir = resolveNotesDir(dirFlag);
const notes = loadNotesFromDir(notesDir);
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
        source: defaultNote.source,
        updatedAt: defaultNote.updatedAt
    };
}
function parseCsv(value) {
    return value
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean);
}
async function runFormMode() {
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
        const id = (await rl.question(`Note id [${defaultNote.id}]: `)).trim() || defaultNote.id;
        const title = (await rl.question(`Title [${defaultNote.title}]: `)).trim() || defaultNote.title;
        const content = (await rl.question(`Content [${defaultNote.content}]: `)).trim() || defaultNote.content;
        const tagsInput = (await rl.question(`Tags (comma separated) [${defaultNote.tags.join(', ')}]: `)).trim();
        const linksInput = (await rl.question(`Links (comma separated) [${defaultNote.links.join(', ')}]: `)).trim();
        const sourceInput = (await rl.question(`Source (zenelf|obsidian|other) [${defaultNote.source}]: `)).trim().toLowerCase();
        const source = sourceInput === 'obsidian' || sourceInput === 'other' ? sourceInput : 'zenelf';
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
            const service = new SimilarNotesService();
            const results = await service.findSimilar(note, notes);
            console.log('\nResult:');
            console.log(JSON.stringify(results, null, 2));
            return;
        }
        if (flow === 'next') {
            const service = new NextStepService();
            const result = service.recommend(note, notes);
            console.log('\nResult:');
            console.log(JSON.stringify(result, null, 2));
            return;
        }
        const service = new BookRecommendationsService();
        const results = service.recommend(note, sampleBooks);
        console.log('\nResult:');
        console.log(JSON.stringify(results, null, 2));
    }
    finally {
        rl.close();
    }
}
async function main() {
    const note = toNote();
    if (mode === 'form') {
        await runFormMode();
    }
    else if (mode === 'similar') {
        const service = new SimilarNotesService();
        const results = await service.findSimilar(note, notes);
        console.log(JSON.stringify(results, null, 2));
    }
    else if (mode === 'next') {
        const service = new NextStepService();
        const result = service.recommend(note, notes);
        console.log(JSON.stringify(result, null, 2));
    }
    else if (mode === 'books') {
        const service = new BookRecommendationsService();
        const results = service.recommend(note, sampleBooks);
        console.log(JSON.stringify(results, null, 2));
    }
    else {
        console.log('Unknown mode. Use form, similar, next, or books.');
    }
}
void main().catch((error) => {
    console.error('CLI execution failed:', error);
    process.exitCode = 1;
});
//# sourceMappingURL=index.js.map