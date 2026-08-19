# NextRead

Recommendation engine for personal notes.

NextRead helps users:

- find similar notes
- get a suggested next note to study
- discover books to go deeper on the same topic

Use it when you have a growing pile of personal notes (e.g. from ZenElf or Obsidian) and want help finding related material, deciding what to study next, or finding a book to go deeper on a topic.

## Quick Start

Prerequisites:

- Node.js 20+
- npm

```bash
npm install
npm run build
```

No external services (Docker, Qdrant) are required — the CLI and web demos below run entirely against sample data. The optional `--engine tensorflow` flag (see [Similarity Engines](#similarity-engines)) downloads a small model from TensorFlow Hub the first time it's used, then runs fully offline afterward; the default `jaccard` engine never needs network access.

## Direct CLI Commands

Run a single recommendation flow against a sample note without any prompts:

```bash
npx tsx packages/cli/src/index.ts similar
npx tsx packages/cli/src/index.ts next
npx tsx packages/cli/src/index.ts books
```

With no note id given, these default to the first note found in the notes directory (see [Notes Directory](#notes-directory) below). Pass a note id as the second argument to run the flow against a different one:

```bash
npx tsx packages/cli/src/index.ts similar note-rust-basics
npx tsx packages/cli/src/index.ts next note-graphql-advanced
```

Each prints JSON results to stdout. After `npm run build`, you can run the compiled version instead:

```bash
node packages/cli/dist/index.js similar note-rust-basics
```

## Similarity Engines

All three flows (`similar`, `next`, `books`) accept an `--engine` flag to pick which similarity algorithm ranks candidates:

```bash
npx tsx packages/cli/src/index.ts similar note-rust-basics --engine jaccard      # default
npx tsx packages/cli/src/index.ts similar note-rust-basics --engine tensorflow
```

- `jaccard` (default): deterministic word-overlap scoring, no dependencies, always offline.
- `tensorflow`: semantic similarity using the Universal Sentence Encoder (`@tensorflow-models/universal-sentence-encoder`) and cosine similarity. Downloads the model from TensorFlow Hub on first use (cached afterward) and is noticeably slower per comparison than `jaccard`.

The interactive form (`npm run manual:test`) prompts for the engine too.

## Notes Directory

The direct CLI commands and manual test form load notes from a directory of Markdown files, resolved in this order:

1. `--dir <path>` passed on the command line:

   ```bash
   npx tsx packages/cli/src/index.ts similar note-only --dir path/to/other-notes
   ```

2. The `notesDir` field in `nextread.config.json` at the repo root.
3. `samples/notes` if neither of the above is set.

Each Markdown file is one note, with metadata in frontmatter:

```markdown
---
id: note-rust-basics
title: Rust Basics
tags: [rust, systems]
links: []
source: obsidian
updatedAt: 2026-08-01T00:00:00.000Z
---

Ownership and borrowing in Rust
```

## Sample Notes

[`samples/notes/`](samples/notes/) is the default notes directory — three ready-to-use Markdown notes you can open, skim, or edit for a quick test:

| id | title |
| --- | --- |
| `note-graphql-intro` | GraphQL Intro |
| `note-graphql-advanced` | GraphQL Advanced |
| `note-rust-basics` | Rust Basics |

Use these ids with the direct CLI commands above to pick which note to run the verification against. The web demo (`npm run manual:web`) still runs against the built-in fixtures in `packages/core/src/fixtures/index.ts`, which mirror the same three notes.

## Book Dataset

The `books` flow (CLI direct command and manual form) reads book records from a JSON file, resolved in the same cascade as the notes directory: `--books-dir`-style config isn't exposed as a CLI flag yet, but you can set `booksFile` in `nextread.config.json`, otherwise it defaults to `samples/books/books.json`.

That file isn't checked in with real data by default. Populate it once with:

```bash
npm run data:books
```

This calls the public [Google Books API](https://developers.google.com/books) (no API key needed) for a handful of topics matching the sample notes (GraphQL, Rust, API design, systems programming, software architecture) and writes the results to `samples/books/books.json`. Re-run it any time to refresh the dataset. It's a one-off local script — it is not run automatically by `npm install`, `npm run build`, or `npm run test`.

## Manual Testing Form

You can run an interactive CLI form to test recommendation flows manually.

1. Run the manual form:

```bash
npm run manual:test
```

1. Choose a flow and fill fields:

- `similar` to get similar notes
- `next` to get the next-step note
- `books` to get book recommendations

Press Enter to keep default sample values.

## Manual Web Form

You can also run a browser-based form so anyone can test visually.

1. Start the web form server:

```bash
npm run manual:web
```

1. Open the app in your browser:

```text
http://localhost:4173
```

1. Fill in note fields, choose flow, and submit to view live JSON results.

## License

TBD
