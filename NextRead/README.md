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

## Spec Folder Layout

```text
/specs
  /001-mvp-foundation
    problem.md
    contracts.md
    ranking.md
    adapter-zenelf.md
    test-plan.md
  /002-obsidian-adapter
    problem.md
    contracts.md
    adapter-obsidian.md
    test-plan.md
```

## Spec Templates

### 1) problem.md

```md
# Problem

## Context
What user problem are we solving?

## Goals
- G1:
- G2:

## Non-Goals
- NG1:

## Constraints
- C1:

## Acceptance Criteria
- AC1:
- AC2:
```

### 2) contracts.md

```md
# Data Contracts

## Note
{
  "id": "string",
  "title": "string",
  "content": "string",
  "tags": ["string"],
  "links": ["string"],
  "source": "zenelf|obsidian|other",
  "updatedAt": "ISO-8601"
}

## Book
{
  "id": "string",
  "title": "string",
  "authors": ["string"],
  "description": "string",
  "categories": ["string"],
  "rating": 0
}
```

### 3) ranking.md

```md
# Ranking

## Similar Notes Score
score = 0.8 * cosine(note_embedding, candidate_embedding)
      + 0.2 * structural_signal

Where structural_signal can include:
- shared tags
- link proximity
- recency boost (optional)

## Next Step Rule
Pick top similar note with higher depth_score.

depth_score can include:
- outgoing links count
- concept density
- advanced keyword hits
```

### 4) adapter-zenelf.md

```md
# ZenElf Adapter

## Required Methods
- listNotes()
- getNoteById(id)
- upsertNote(note)

## Mapping Rules
- map ZenElf note schema to NextRead Note contract
- preserve original id for traceability

## Error Cases
- missing content
- malformed tags
- duplicate ids
```

### 5) test-plan.md

```md
# Test Plan

## Acceptance Tests
- T1: similar notes returns k items sorted by score
- T2: next-step recommendation is not current note
- T3: books recommendation returns k items with metadata

## Regression Tests
- R1: note with empty tags still indexes
- R2: note with no links still ranks
- R3: unknown source adapter fails with clear error
```

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

## Project Principles

- Keep core independent from adapters.
- Keep contracts explicit and versioned.
- Prefer deterministic heuristics before complex models.
- Ship small slices with measurable outcomes.

## License

TBD
