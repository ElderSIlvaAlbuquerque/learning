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

No external services (Docker, Qdrant) are required — the CLI and web demos below run entirely against sample data.

## Direct CLI Commands

Run a single recommendation flow against the sample note without any prompts:

```bash
npx tsx packages/cli/src/index.ts similar
npx tsx packages/cli/src/index.ts next
npx tsx packages/cli/src/index.ts books
```

Each prints JSON results to stdout. After `npm run build`, you can run the compiled version instead:

```bash
node packages/cli/dist/index.js similar
```

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
