# Tasks: MVP Foundation

**Input**: Design documents from `/specs/001-mvp-foundation/`

**Prerequisites**: plan.md, problem.md, research.md, data-model.md, contracts.md, adapter-zenelf.md, test-plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the TypeScript monorepo and shared tooling.

- [x] T001 Create monorepo package structure for packages/core, packages/adapters, packages/cli, and packages/shared
- [x] T002 Initialize TypeScript, Vitest, Zod, and Qdrant client dependencies in the workspace
- [x] T003 [P] Configure TypeScript compiler settings, linting, and formatting for the monorepo

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared contracts, schema validation, and storage abstractions required by all user stories.

- [x] T004 Create shared note and book contract schemas with Zod in packages/shared/src/contracts.ts
- [x] T005 Create core domain types and normalization helpers in packages/core/src/models/
- [x] T006 Implement a vector store abstraction and bootstrap logic for Qdrant in packages/core/src/vector/
- [x] T007 Implement embedding and indexing helpers for notes and books in packages/core/src/services/
- [x] T008 Create deterministic ranking utilities for similarity and next-step selection in packages/core/src/ranking/
- [x] T009 Implement clear validation and adapter error handling for unsupported sources in packages/core/src/services/

---

## Phase 3: User Story 1 - Similar Notes Retrieval (Priority: P1) 🎯 MVP

**Goal**: Index notes and retrieve ranked similar-note results for a given note.

**Independent Test**: A sample note can be indexed and a similar-note query returns ranked results without requiring the adapter layer.

### Tests for User Story 1

- [x] T010 [P] [US1] Add unit tests for note contract validation in packages/shared/tests/contracts.test.ts
- [x] T011 [P] [US1] Add integration tests for note indexing and similar-note retrieval in packages/core/tests/similar-notes.test.ts

### Implementation for User Story 1

- [x] T012 [P] [US1] Implement note indexing and upsert flows in packages/core/src/services/note-indexer.ts
- [x] T013 [P] [US1] Implement similar-note query logic in packages/core/src/services/similar-notes.ts
- [x] T014 [US1] Wire the similarity service to the Qdrant-backed vector store in packages/core/src/services/
- [x] T015 [US1] Add CLI entry points for indexing a note and running a similar-note query in packages/cli/src/

---

## Phase 4: User Story 2 - Next-Step Recommendation (Priority: P2)

**Goal**: Recommend the best next note to study based on the current note and ranking rules.

**Independent Test**: Given a note, the system returns a different note as the recommended next step when a match exists.

### Tests for User Story 2

- [x] T016 [P] [US2] Add unit tests for next-step ranking fallback logic in packages/core/tests/next-step.test.ts
- [x] T017 [P] [US2] Add integration tests for next-step recommendation end to end in packages/core/tests/next-step.integration.test.ts

### Implementation for User Story 2

- [x] T018 [P] [US2] Implement next-step selection logic in packages/core/src/services/next-step.ts
- [x] T019 [US2] Integrate the next-step service with the similarity results and fallback rules in packages/core/src/services/
- [x] T020 [US2] Expose a CLI command for next-step recommendations in packages/cli/src/

---

## Phase 5: User Story 3 - Book Recommendations (Priority: P3)

**Goal**: Recommend books based on a note’s content and return metadata with the results.

**Independent Test**: A note can produce ranked book recommendations with title, authors, and score information.

### Tests for User Story 3

- [x] T021 [P] [US3] Add unit tests for book contract validation and ranking behavior in packages/shared/tests/books.test.ts
- [x] T022 [P] [US3] Add integration tests for book recommendation queries in packages/core/tests/books.test.ts

### Implementation for User Story 3

- [x] T023 [P] [US3] Implement book indexing and retrieval flows in packages/core/src/services/book-indexer.ts
- [x] T024 [US3] Implement book recommendation query logic in packages/core/src/services/book-recommendations.ts
- [x] T025 [US3] Expose a CLI command for book recommendations in packages/cli/src/

---

## Phase 6: User Story 4 - ZenElf Adapter (Priority: P2)

**Goal**: Translate ZenElf note data into the shared NextRead contract and feed the core services.

**Independent Test**: A ZenElf-style note payload can be mapped into the shared Note contract and accepted by the indexing flow.

### Tests for User Story 4

- [x] T026 [P] [US4] Add adapter contract tests for source mapping and validation in packages/adapters/tests/zenelf.test.ts
- [x] T027 [P] [US4] Add integration tests for adapter-driven indexing in packages/adapters/tests/zenelf.integration.test.ts

### Implementation for User Story 4

- [x] T028 [P] [US4] Implement the ZenElf adapter mapper in packages/adapters/src/zenelf/mapper.ts
- [x] T029 [US4] Implement the adapter interface methods for listing, fetching, and upserting notes in packages/adapters/src/zenelf/index.ts
- [x] T030 [US4] Wire the adapter into the core indexing pipeline in packages/adapters/src/zenelf/

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Strengthen the MVP experience and ensure the quickstart path works end to end.

- [x] T031 [P] Document the local setup flow and sample commands in README.md
- [x] T032 [P] Add fixture data and sample note/book seed scripts in packages/core/src/fixtures/
- [x] T033 Run the full test suite and validate the quickstart flow from the spec
