# NextRead

Spec-Driven recommendation engine for personal notes.

NextRead helps users:

- find similar notes
- get a suggested next note to study
- discover books to go deeper on the same topic

This project is designed to be adapter-based so it can plug into different readers/writers (for example ZenElf and Obsidian) without changing core recommendation logic.

## Why Spec-Driven Development

We use Spec-Driven Development (SDD) to keep velocity high and reduce rework:

- define behavior before implementation
- align data contracts early
- keep adapters and core loosely coupled
- make testing objective and measurable

## Product Scope

### Core outcomes

1. Similar Notes: given a note, return top-k related notes.
2. Next Step Note: suggest the best next note to continue learning.
3. Book Recommendations: suggest top-k books based on note content.

### Non-goals for MVP

- full UI polish
- multi-tenant auth
- advanced reranking models
- distributed infrastructure

## Quick Start

Prerequisites:

- Node.js 20+
- npm

Steps:

```bash
npm install
npm run build
npm test
```

This installs dependencies, compiles all packages, and runs the full test suite. No external services (Docker, Qdrant) are required to build, test, or try the CLI/web demos below — they run entirely against in-memory sample data.

## High-Level Architecture

- nextread-core
  - parsing normalization
  - embedding generation with TensorFlow.js
  - ranking logic
  - vector database client
- nextread-adapters
  - adapter-zenelf
  - adapter-obsidian
- nextread-api (optional in MVP)
  - simple HTTP endpoints for integrations

## Vector Database

Default: Qdrant (local Docker for MVP).

Collections:

- notes_collection
  - payload: id, title, tags, links, source, updatedAt
- books_collection
  - payload: id, title, authors, categories, rating

Distance metric:

- cosine

## SDD Workflow

1. Write Problem Spec
2. Write Data Contract Spec
3. Write Ranking Spec
4. Write Adapter Spec
5. Write Test Spec (acceptance + regression)
6. Implement smallest passing slice
7. Validate against acceptance criteria
8. Iterate

Rule: no feature implementation starts before a spec exists and has acceptance criteria.

## Specs

Each feature has its own folder under [`specs/`](specs/) (e.g. `specs/001-mvp-foundation/`) containing the actual problem statement, data contracts, ranking rules, adapter spec, and test plan for that feature. New features are scaffolded from the templates in [`.specify/templates/`](.specify/templates/) via the spec-kit workflow.

## MVP Plan (<= 8 hours)

1. Create specs for MVP foundation.
2. Implement Note and Book contracts.
3. Add Qdrant client and index bootstrap.
4. Implement note embedding pipeline with TensorFlow.js.
5. Implement similar notes query.
6. Implement next-step heuristic.
7. Import a subset of books dataset and index.
8. Implement book recommendation query.

## Suggested Kaggle Dataset

Primary suggestion:

- [Goodreads-books](https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks/data)

Why:

- good metadata quality
- manageable size for MVP
- easy to subset for fast iteration

MVP import suggestion:

- start with 2,000 books max
- fields: title, authors, tags/categories, average_rating, description (if available)

## Definition of Done (MVP)

- Specs exist for problem, contracts, ranking, and ZenElf adapter.
- Notes can be indexed into vector database.
- Similar notes endpoint or CLI command works.
- Next-step recommendation works with deterministic fallback.
- Book recommendations for a note return top-k with scores.
- Basic acceptance tests pass.

## Future Milestones

- Obsidian adapter
- reranking improvements
- feedback loop from clicks/selections
- lightweight UI plugin
- eval dataset and quality dashboard

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

1. Install dependencies:

```bash
npm install
```

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

## Project Principles

- Keep core independent from adapters.
- Keep contracts explicit and versioned.
- Prefer deterministic heuristics before complex models.
- Ship small slices with measurable outcomes.

## License

TBD
